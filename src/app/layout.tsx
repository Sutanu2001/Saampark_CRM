"use client";

import { Inter } from "next/font/google";
// @ts-ignore: global CSS import handled by Next.js
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar"; 
import React, { useState } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // On desktop layouts (>960px) it should remain open by default.
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <html lang="en">
      <body className={`${inter.variable} bg-[#f6f8fb]`}>
        <AuthProvider>
          <Topbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          
          <div className="flex pt-16 min-h-screen">
            {/* FIXED: Passing exactly 'isopen' lowercase to wire it to the component interface */}
            <Sidebar isopen={isSidebarOpen} />
            
            <main
              className="flex-1 p-5 transition-all duration-300 ease-in-out"
              style={{
                /* Calculates structural margins perfectly across layouts */
                marginLeft: isSidebarOpen ? "var(--sidebar-width)" : "0px",
                minHeight: "calc(100vh - var(--topbar-height))",
              }}
            >
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}