"use client";

import React from "react";
import { Plus, Download, Search, Edit2, Trash2 } from "lucide-react";

//  live JSON file database
import dbData from "../../../../data/app-db.json";

type Product = {
  id: number;
  title: string;
  price: string;
  unit: string;
  description: string;
  image: string;
};

export default function ItemsPage() {
  // Grab the real data array directly from your master JSON object
  const itemsList: Product[] = dbData.products;

  // Helper mapping function to automatically assign categorizations based on item title
  const inferCategory = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes("hosting") || lower.includes("security") || lower.includes("domain")) return "Services";
    if (lower.includes("development") || lower.includes("optimization") || lower.includes("seo")) return "Development";
    return "Design";
  };

  return (
    <div className="w-full bg-white min-h-screen p-6 text-slate-700">
      
      {/* --- TOP BANNER COMPONENT ROW --- */}
      <div className="flex items-center justify-between pb-6 mb-2">
        <h1 className="text-xl font-medium">Items</h1>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded text-sm hover:bg-gray-50 transition-colors shadow-sm">
            <Download size={14} />
            <span>Import items</span>
          </button>
          <button className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded text-sm hover:bg-gray-50 transition-colors shadow-sm">
            <Plus size={14} />
            <span>Add item</span>
          </button>
        </div>
      </div>

      {/* --- CONTROL BUTTON PANEL FILTERS ROW --- */}
      <div className="flex items-center justify-between gap-4 pb-4 mb-4">
        <div className="flex items-center gap-3">
          {/* Column toggler switch indicator */}
          <button className="p-2 bg-white border border-gray-200 text-gray-400 rounded hover:bg-gray-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>

          {/* Quick Selection Dropdown Category Menu */}
          <select className="bg-white border border-gray-200 text-gray-500 rounded px-3 py-1.5 text-sm focus:outline-none min-w-[140px] shadow-sm appearance-none cursor-pointer">
            <option>- Category -</option>
            <option>Design</option>
            <option>Services</option>
            <option>Development</option>
          </select>
        </div>

        {/* Global Item Directory Filter Input Field */}
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-white border border-gray-200 rounded px-3 py-1.5 pr-8 text-sm focus:outline-none focus:border-blue-400 text-gray-700 placeholder-gray-300 shadow-sm"
          />
          <Search size={14} className="absolute right-2.5 top-2.5 text-gray-300" />
        </div>
      </div>

      {/* --- RESPONSIVE DATA DIRECTORY LAYOUT TABLE --- */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-gray-100 text-[13px] font-semibold text-slate-500 bg-gray-50/40">
              <th className="py-2.5 px-4 w-[25%]">Title</th>
              <th className="py-2.5 px-4 w-[35%]">Description</th>
              <th className="py-2.5 px-4 w-[12%]">Category</th>
              <th className="py-2.5 px-4 w-[12%]">Unit type</th>
              <th className="py-2.5 px-4 text-right w-[10%]">Rate</th>
              <th className="py-2.5 px-4 w-[6%]"></th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-100 text-[13px]">
            {itemsList.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/40 transition-colors group">
                
                {/* Active blue item title link */}
                <td className="py-3 px-4 font-normal text-blue-600 hover:underline cursor-pointer">
                  {item.title}
                </td>
                
                {/* Plain-text item breakdown */}
                <td className="py-3 px-4 text-gray-500 max-w-xs truncate">
                  {item.description}
                </td>
                
                {/* Dynamically grouped filter metrics tags */}
                <td className="py-3 px-4 text-gray-500">
                  {inferCategory(item.title)}
                </td>
                
                {/* Unit identification field metric */}
                <td className="py-3 px-4 text-gray-500">
                  {item.unit}
                </td>
                
                {/* Formatted individual monetary scale value */}
                <td className="py-3 px-4 text-right font-normal text-gray-700">
                  {parseFloat(item.price).toLocaleString("en-US", { minimumFractionDigits: 0 })}
                </td>
                
                {/* Hover contextual mutations drawer elements */}
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-gray-300">
                    <button className="p-1 hover:text-gray-600 transition-colors" aria-label="Edit">
                      <Edit2 size={13} />
                    </button>
                    <button className="p-1 hover:text-red-500 transition-colors" aria-label="Delete">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}