"use client";

import React, { useState } from "react";
import { ShoppingCart, Eye, Search, ChevronDown } from "lucide-react";

// 1. IMPORT YOUR ENTIRE MASTER DATA OBJECT FROM YOUR LOCAL JSON FILE
import dbData from "../../../../data/app-db.json"; 

type Product = {
  id: number;
  title: string;
  price: string;
  unit: string;
  description: string;
  image: string;
};

export default function ProductsPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // 2. EXTRACT JUST THE PRODUCTS ARRAY OUT OF THE MASTER DATA FILE safely
  const productsList: Product[] = dbData.products;

  return (
    <div className="w-full bg-[#f6f8fb] min-h-screen p-6">
      
      {/* --- TOPBAR ACTION MENU --- */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-5 mb-6">
        <h1 className="text-xl font-semibold text-slate-700">Store</h1>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative">
            <button className="flex items-center justify-between gap-12 bg-white border border-gray-200 rounded px-3 py-1.5 text-sm text-gray-500 shadow-sm hover:bg-gray-50 transition-colors">
              <span>- Category -</span>
              <ChevronDown size={14} className="text-gray-400" />
            </button>
          </div>

          <div className="relative flex-1 sm:flex-initial">
            <input
              type="text"
              placeholder="Search"
              className="w-full sm:w-56 bg-white border border-gray-200 rounded px-3 py-1.5 pr-8 text-sm focus:outline-none focus:border-blue-400 shadow-sm text-gray-700"
            />
            <Search size={14} className="absolute right-2.5 top-2.5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* --- GRID PRODUCTS CONTAINER --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* 3. LOOP THROUGH THE CORRECT RE-MAPPED ARRAY EXTRACTED ABOVE */}
        {productsList.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm flex flex-col group transition-all duration-200 hover:shadow-md"
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Image Canvas Setup */}
            <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover select-none transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Overlay Actions */}
              <div className={`absolute inset-0 bg-black/10 flex items-center justify-center gap-2 transition-opacity duration-200 ${hoveredId === product.id ? "opacity-100" : "opacity-0"}`}>
                <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs py-2 px-3.5 rounded shadow">
                  <ShoppingCart size={13} /> Add to cart
                </button>
                <button className="bg-white hover:bg-gray-100 text-gray-600 p-2 rounded shadow">
                  <Eye size={13} />
                </button>
              </div>
            </div>

            {/* Typography Content Card Details */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-[15px] font-semibold text-slate-700 mb-1 capitalize group-hover:text-blue-600 transition-colors">
                  {product.title}
                </h3>
                <div className="text-xs font-bold text-red-500 mb-2">
                  <span>${product.price}</span>
                  <span className="text-gray-400 font-medium font-sans">/{product.unit}</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* --- FLOATING CART BADGE ELEMENT --- */}
      <button className="fixed bottom-6 right-6 bg-white border border-gray-200 shadow-xl rounded-full p-3.5 hover:bg-gray-50 group transition-all text-slate-700 z-50 ring-1 ring-black/5">
        <div className="relative">
          <ShoppingCart size={20} className="group-hover:scale-105 transition-transform" />
          <span className="absolute -top-2 -right-2 bg-blue-600 text-white font-bold text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
            0
          </span>
        </div>
      </button>

    </div>
  );
}