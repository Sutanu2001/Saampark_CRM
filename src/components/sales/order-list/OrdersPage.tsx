"use client";

import React from "react";
import { Plus, Search, Eye, Edit2, Trash2 } from "lucide-react";

// Mock Orders Data based on your layout image
const ordersData = [
  { id: "ORDER #19", client: "Hauck Ltd", invoices: "-", date: "18-06-2026", amount: "$180.00", status: "Processing" },
  { id: "ORDER #18", client: "Roel Grimes", invoices: "-", date: "10-06-2026", amount: "$80.00", status: "Confirmed" },
  { id: "ORDER #16", client: "O'Reilly, Schuppe and Bartell", invoices: "-", date: "17-06-2026", amount: "$40.00", status: "Processing" },
  { id: "ORDER #3", client: "Corwin-Sporer", invoices: "-", date: "02-06-2026", amount: "$200.00", status: "Confirmed" },
  { id: "ORDER #2", client: "Weissnat, Stark and Ondricka", invoices: "-", date: "08-06-2026", amount: "$600.00", status: "New" },
  { id: "ORDER #1", client: "Adrain Ondricka", invoices: "-", date: "16-06-2026", amount: "$66.00", status: "Processing" },
];

export default function OrdersPage() {
  
  // Helper function to dynamically color status badges
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-[#8ed065] text-white text-[11px] px-2 py-0.5 rounded font-medium";
      case "Processing":
        return "bg-[#22c55e] text-white text-[11px] px-2 py-0.5 rounded font-medium";
      case "New":
        return "bg-[#fbbf24] text-white text-[11px] px-2 py-0.5 rounded font-medium";
      default:
        return "bg-gray-400 text-white text-[11px] px-2 py-0.5 rounded font-medium";
    }
  };

  return (
    <div className="w-full bg-white min-h-screen p-6">
      
      {/* --- TOP HEADER ROW --- */}
      <div className="flex items-center justify-between pb-6 mb-4">
        <h1 className="text-xl font-medium text-slate-700">Orders</h1>
        <button className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded text-sm hover:bg-gray-50 transition-colors shadow-sm">
          <Plus size={16} />
          <span>Add order</span>
        </button>
      </div>

      {/* --- ACTIONS & SEARCH BAR ROW --- */}
      <div className="flex items-center justify-between gap-4 pb-4 mb-2">
        <div className="flex items-center gap-2">
          {/* Layout Columns Toggle Button Indicator */}
          <button className="p-2 bg-white border border-gray-200 text-gray-500 rounded hover:bg-gray-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
        </div>

        {/* Clean Layout Embedded Search Input */}
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-white border border-gray-200 rounded px-3 py-1.5 pr-8 text-sm focus:outline-none focus:border-blue-400 text-gray-700 placeholder-gray-300 shadow-sm"
          />
          <Search size={14} className="absolute right-2.5 top-2.5 text-gray-300" />
        </div>
      </div>

      {/* --- RESPONSIVE DATA TABLE --- */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-100 text-sm font-semibold text-slate-700">
              <th className="py-3 px-4 w-[12%]">Order</th>
              <th className="py-3 px-4 w-[28%]">Client</th>
              <th className="py-3 px-4 w-[12%]">Invoices</th>
              <th className="py-3 px-4 w-[15%]">Order date</th>
              <th className="py-3 px-4 w-[13%]">Amount</th>
              <th className="py-3 px-4 w-[12%]">Status</th>
              <th className="py-3 px-4 text-right w-[8%]"></th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-100 text-[13px]">
            {ordersData.map((order, index) => (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                {/* Order ID Link */}
                <td className="py-3.5 px-4 font-medium text-blue-600 cursor-pointer hover:underline">
                  {order.id}
                </td>
                {/* Client Name Link */}
                <td className="py-3.5 px-4 text-blue-600 cursor-pointer hover:underline">
                  {order.client}
                </td>
                <td className="py-3.5 px-4 text-gray-400">
                  {order.invoices}
                </td>
                <td className="py-3.5 px-4 text-gray-600">
                  {order.date}
                </td>
                <td className="py-3.5 px-4 font-medium text-gray-700">
                  {order.amount}
                </td>
                {/* Status Badges */}
                <td className="py-3.5 px-4">
                  <span className={getStatusStyle(order.status)}>
                    {order.status}
                  </span>
                </td>
                {/* Row Inline Row Actions */}
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2 text-gray-300">
                    <button className="hover:text-gray-600 transition-colors" aria-label="View">
                      <Eye size={15} />
                    </button>
                    <button className="hover:text-gray-600 transition-colors" aria-label="Edit">
                      <Edit2 size={14} />
                    </button>
                    <button className="hover:text-red-500 transition-colors" aria-label="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- BOTTOM CALCULATION SUM SUMMARY ROW --- */}
      <div className="flex justify-between items-center max-w-[92%] ml-auto border-t border-gray-100 pt-4 mt-1 text-sm font-bold text-slate-700">
        <div>Total</div>
        <div className="pr-4 text-right">$1,526.00</div>
      </div>

    </div>
  );
}