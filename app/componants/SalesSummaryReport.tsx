"use client";
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import SalesReportByStatus from './SaleReportByStatus';

const SalesSummaryReport = () => {
  const [salesSummary, setSalesSummary] = useState<any>(null);

  useEffect(() => {
    const fetchSalesSummary = async () => {
      const response = await fetch('/api/reports/sales-summary');
      const data = await response.json();
      setSalesSummary(data);
    };

    fetchSalesSummary();
  }, []);

  if (!salesSummary) {
    return <div>Loading...</div>;
  }

  // Data for the Bar chart (Top 5 Selling Products by Quantity)
  const topSellingProductsByQuantityData = salesSummary.topSellingProductsByQuantity.map((item: any) => ({
    name: item.name,
    quantitySold: item.quantitySold,
  }));

  // Data for the Pie chart (Sales by Status)
  const salesByStatusData = [
    { name: 'Pending', value: salesSummary.salesByStatus.pending },
    { name: 'Completed', value: salesSummary.salesByStatus.completed },
    { name: 'Cancelled', value: salesSummary.salesByStatus.cancelled },
  ];

  const COLORS = ['#FF8042', '#00C49F', '#FFBB28'];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Sales Summary Report</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Total Orders</h3>
        <p>{salesSummary.totalOrders}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Total Sales Amount</h3>
        <p>${salesSummary.totalSalesAmount}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Top 5 Selling Products by Quantity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topSellingProductsByQuantityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantitySold" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Sales by Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={salesByStatusData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              fill="#8884d8"
            >
              {salesByStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Top 5 Selling Products by Revenue</h3>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Product</th>
              <th className="px-4 py-2 border">Revenue Generated</th>
            </tr>
          </thead>
          <tbody>
            {salesSummary.topSellingProductsByRevenue.map((item: any) => (
              <tr key={item.productId}>
                <td className="px-4 py-2 border">{item.name}</td>
                <td className="px-4 py-2 border">${item.revenueGenerated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <SalesReportByStatus />
      
    </div>
  );
};

export default SalesSummaryReport;


