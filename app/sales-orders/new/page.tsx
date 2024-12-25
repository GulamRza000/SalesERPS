"use client";
import React, { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
}

const SalesOrderCreateForm = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Fetch available products from the API
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.products);
    };

    fetchProducts();
  }, []);

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const updatedSelectedProducts = [...selectedProducts];
    updatedSelectedProducts[index].product_id = e.target.value;
    updatedSelectedProducts[index].unit_price = products.find(product => product.id === e.target.value)?.price || 0;
    setSelectedProducts(updatedSelectedProducts);

    calculateTotalAmount(updatedSelectedProducts);

  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedSelectedProducts = [...selectedProducts];
    updatedSelectedProducts[index].quantity = parseInt(e.target.value || '1', 10);
    updatedSelectedProducts[index].total_price = updatedSelectedProducts[index].quantity * updatedSelectedProducts[index].unit_price;
    setSelectedProducts(updatedSelectedProducts);
    calculateTotalAmount(updatedSelectedProducts);
  };

  const calculateTotalAmount = (updatedSelectedProducts: any[]) => {
    const total = updatedSelectedProducts.reduce((sum, item) => sum + item.total_price, 0);
    setTotalAmount(total);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const orderData = {
      order_date: new Date().toISOString(),
      customer_name: customerName,
      total_amount: totalAmount,
      status: 'pending', // Initial status
      items: selectedProducts.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.total_price,
      })),
    };

    try {
      const response = await fetch('/api/sales-orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert('Sales Order created successfully!');
      } else {
        alert('Error creating sales order');
      }
    } catch (error) {
      console.error('Error creating sales order:', error);
      alert('Error creating sales order');
    }
  };

  const addProduct = () => {
    setSelectedProducts([
      ...selectedProducts,
      { product_id: '', quantity: 1, unit_price: 0, total_price: 0 },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create Sales Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold">Customer Name</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        {selectedProducts.map((product, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-semibold">Product</label>
              <select
                value={product.product_id}
                onChange={(e) => handleProductChange(e, index)}
                className="w-full px-4 py-2 border rounded-md"
                required
              >
                <option value="">Select Product</option>
                {products.map((prod) => (
                  <option key={prod.id} value={prod.id}>
                    {prod.name} - ${prod.price}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold">Quantity</label>
              <input
                type="number"
                value={product.quantity}
                onChange={(e) => handleQuantityChange(e, index)}
                className="w-full px-4 py-2 border rounded-md"
                required
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">Total Price</label>
              <input
                type="text"
                value={product.total_price}
                readOnly
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addProduct}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Product
        </button>

        <div className="flex justify-between">
          <span className="font-semibold">Total Amount: ${totalAmount}</span>
          <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-md">
            Create Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default SalesOrderCreateForm;
