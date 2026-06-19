"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { Bell, LogIn, LogOut, User, Settings as SettingsIcon, Menu, X, Search, Plus, Globe, Clock, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext"; 

interface TopbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export default function Topbar({ isSidebarOpen, setIsSidebarOpen }: TopbarProps) {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
      
      {/* Left Section: Three Bar Toggle + Logo */}
      <div className="flex items-center gap-4">
        {/* Fixed Responsive Class: Matches your 960px CSS variable rule precisely */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors focus:outline-none" 
  aria-label="Toggle Sidebar"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="flex items-center justify-center gap-3">
          <img src="/WhatsApp Image 2026-03-03 at 3.36.25 PM (1).jpeg" alt="Logo" className="h-9 w-9 object-contain" />
          <span className="text-2xl font-bold tracking-wider text-slate-800">SAAMPARK</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100 transition-colors">
          <Search size={20} />
        </button>
        <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100 transition-colors">
          <Plus size={20} />
        </button>
        <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100 transition-colors">
          <Globe size={20} />
        </button>
        <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100 transition-colors">
          <Clock size={20} />
        </button>
        <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100 transition-colors">
          <Mail size={20} />
        </button>
        {isAuthenticated ? (
          <>
            <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100">
              <Bell size={20} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <div className="relative flex items-center gap-3 border-l pl-4 ml-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-800 capitalize">{user?.username}</p>
                <p className="text-[10px] font-medium text-gray-400 uppercase">{user?.role}</p>
              </div>
              
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-sm text-white shadow-sm transition-all hover:bg-blue-700 focus:outline-none ring-2 ring-offset-2 ring-blue-600/20"
              >
                {getInitials(user?.username || "")}
              </button>

              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)}></div>
                  <div className="absolute right-0 top-11 mt-1 w-48 origin-top-right rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <Link
                      href="/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <SettingsIcon size={16} className="text-gray-400" />
                      Settings
                    </Link>

                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                      }}
                      className="flex w-full items-center gap-2.5 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors mt-0.5 border-t border-gray-50"
                    >
                      <LogOut size={16} className="text-red-400" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <button 
            onClick={() => router.push('/login')}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <LogIn size={18} />
            <span>Login</span>
          </button>
        )}
      </div>
    </header>
  );
}