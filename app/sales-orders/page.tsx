"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface SalesOrder {
  id: string;
  customer_name: string;
  total_amount: number;
  status: string;
}

const SalesOrderList = () => {
  const [salesOrders, setSalesOrders] = useState<SalesOrder[]>([]);

  useEffect(() => {
    const fetchSalesOrders = async () => {
      const response = await fetch('/api/sales-orders');
      const data = await response.json();
      setSalesOrders(data);
    };

    fetchSalesOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Sales Orders</h2>
      <table className="w-full table-auto mb-6">
        <thead>
          <tr>
            <th className="px-4 py-2">Customer</th>
            <th className="px-4 py-2">Total Amount</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {salesOrders.map((order) => (
            <tr key={order.id}>
              <td className="px-4 py-2">{order.customer_name}</td>
              <td className="px-4 py-2">${order.total_amount}</td>
              <td className="px-4 py-2">{order.status}</td>
              <td className="px-4 py-2">
                <Link
                  href={`/sales-orders/${order.id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href='/sales-orders/new' className='default-button'>Place Order</Link>
    </div>
  );
};

export default SalesOrderList;
