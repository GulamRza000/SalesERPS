"use client";
import { useState, useEffect } from "react";

export default function SalesReportByStatus(){

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


  return (
    <div className='max-w-4xl mx-auto'>
        <h3 className="text-xl font-semibold">Sales by Status</h3>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Order Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border">Pending</td>
              <td className="px-4 py-2 border">{salesSummary.salesByStatus.pending}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Completed</td>
              <td className="px-4 py-2 border">{salesSummary.salesByStatus.completed}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Cancelled</td>
              <td className="px-4 py-2 border">{salesSummary.salesByStatus.cancelled}</td>
            </tr>
          </tbody>
        </table>
      </div>
  )
}
