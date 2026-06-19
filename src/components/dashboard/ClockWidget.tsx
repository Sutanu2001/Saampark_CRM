"use client";

import { Clock3, LogIn } from "lucide-react";

export default function ClockWidget() {
  return (
    <div className="card flex items-center justify-between p-4 !bg-gradient-to-r !from-blue-100 !to-blue-800 text-white">
      <div className="flex h-10 w-10 items-center justify-center rounded bg-[#ef3d7a]">
        <Clock3 size={18} className="text-white" />
      </div>
      <div className="text-right">
        <button className="inline-flex items-center gap-1 rounded border border-white/30 bg-white/20 px-2 py-1 text-xs text-white">
          <LogIn size={12} /> Clock In
        </button>
        <p className="mt-2 text-sm text-white/100">You are currently clocked out</p>
      </div>
    </div>
  );
}
