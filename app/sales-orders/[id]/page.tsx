"use client";
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { revalidatePath } from 'next/cache';

interface SalesOrderItem {
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

const SalesOrderDetail = () => {
  const id = useParams().id;
  const [salesOrder, setSalesOrder] = useState<any>(null);

  useEffect(() => {
    const fetchSalesOrder = async () => {
      const response = await fetch(`/api/sales-orders/${id}`);
      const data = await response.json();
      setSalesOrder(data);
    };

    if (id) fetchSalesOrder();
  }, [id]);

  const handleStatusUpdate = async (newStatus: string) => {
    const response = await fetch(`/api/sales-orders/${salesOrder.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if(response.ok){
      revalidatePath(`/sales-orders/${id}`)
    }
  }

  if (!salesOrder) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Sales Order Details</h2>
      <div className="space-y-4">
        <div>
          <span className="font-semibold">Customer Name:</span> {salesOrder.customer_name}
        </div>
        <div>
          <span className="font-semibold">Total Amount:</span> ${salesOrder.total_amount}
        </div>
        <div>
          <span className="font-semibold">Status:</span> {salesOrder.status}
        </div>

        <h3 className="text-xl font-semibold mt-4">Order Items</h3>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Unit Price</th>
              <th className="px-4 py-2">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {salesOrder.orderItems.map((item: SalesOrderItem, index: number) => (
              <tr key={index}>
                <td className="px-4 py-2">{item.product_id}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">${item.unit_price}</td>
                <td className="px-4 py-2">${item.total_price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add buttons to update order status */}
        {salesOrder.status === 'pending' && (
          <div className="mt-4">
            <button
              onClick={() => handleStatusUpdate('completed')}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Mark as Completed
            </button>
            <button
              onClick={() => handleStatusUpdate('cancelled')}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel Order
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default SalesOrderDetail;
