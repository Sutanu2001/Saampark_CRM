"use client";

import Image from "next/image";
import { ArrowUp, Filter, PlusCircle, Search } from "lucide-react";

type TaskCard = {
  id: number;
  title: string;
  avatar: string;
  tag?: { label: string; className: string };
};

type Column = {
  id: string;
  title: string;
  count: number;
  borderClass: string;
  tasks: TaskCard[];
};

const columns: Column[] = [
  {
    id: "todo",
    title: "To do",
    count: 20,
    borderClass: "border-[#f0ad2e]",
    tasks: [
      { id: 3435, title: "Measure influencer campaign success", avatar: "https://i.pravatar.cc/60?img=1" },
      { id: 3329, title: "Proofread and edit blog posts", avatar: "https://i.pravatar.cc/60?img=2", tag: { label: "Enhancement", className: "bg-[#4f8ef7] text-white" } },
      { id: 3517, title: "Sketch and outline illustrations", avatar: "https://i.pravatar.cc/60?img=3" },
      { id: 3432, title: "Track influencer performance and reach", avatar: "https://i.pravatar.cc/60?img=4" },
    ],
  },
  {
    id: "in_progress",
    title: "In progress",
    count: 13,
    borderClass: "border-[#3f8cff]",
    tasks: [
      { id: 3290, title: "Submit app to app stores for release", avatar: "https://i.pravatar.cc/60?img=5", tag: { label: "Bug", className: "bg-[#cf2eb3] text-white" } },
      { id: 3546, title: "A/B test ad variations", avatar: "https://i.pravatar.cc/60?img=6" },
      { id: 3623, title: "Use VR for training and simulations", avatar: "https://i.pravatar.cc/60?img=7", tag: { label: "Design", className: "bg-[#79c64b] text-white" } },
      { id: 3319, title: "Design brand packaging and labels", avatar: "https://i.pravatar.cc/60?img=8", tag: { label: "Bug", className: "bg-[#cf2eb3] text-white" } },
    ],
  },
  {
    id: "review",
    title: "Review",
    count: 13,
    borderClass: "border-[#be31be]",
    tasks: [
      { id: 3336, title: "Research and write industry reports and case studies", avatar: "https://i.pravatar.cc/60?img=9" },
      { id: 3326, title: "Write SEO-friendly blog articles", avatar: "https://i.pravatar.cc/60?img=10", tag: { label: "Enhancement", className: "bg-[#4f8ef7] text-white" } },
      { id: 3578, title: "Create data dashboards and reports", avatar: "https://i.pravatar.cc/60?img=11", tag: { label: "Enhancement", className: "bg-[#4f8ef7] text-white" } },
      { id: 3576, title: "Perform data visualization and charts", avatar: "https://i.pravatar.cc/60?img=12" },
    ],
  },
  {
    id: "done",
    title: "Done",
    count: 45,
    borderClass: "border-[#17b893]",
    tasks: [
      { id: 3591, title: "Present data insights through infographics", avatar: "https://i.pravatar.cc/60?img=13", tag: { label: "Feedback", className: "bg-[#25c9c5] text-white" } },
      { id: 3386, title: "Prepare artwork for print production", avatar: "https://i.pravatar.cc/60?img=14" },
      { id: 3305, title: "Write engaging content for posts", avatar: "https://i.pravatar.cc/60?img=15" },
      { id: 3538, title: "Design game splash screen and icons", avatar: "https://i.pravatar.cc/60?img=16", tag: { label: "Enhancement", className: "bg-[#4f8ef7] text-white" } },
    ],
  },
];

export default function KanbanBoard() {
  return (
    <div className="card p-3">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="section-title text-[28px]">Tasks</h1>
          <button className="text-sm text-[#607183]">List</button>
          <button className="border-b-2 border-[#334457] pb-1 text-sm font-semibold text-[#334457]">Kanban</button>
          <button className="text-sm text-[#607183]">Gantt</button>
        </div>
        <div className="flex gap-2">
          <button className="rounded border border-[var(--border)] px-3 py-1.5 text-sm text-[#607183]">Add multiple tasks</button>
          <button className="rounded border border-[var(--border)] px-3 py-1.5 text-sm text-[#607183]">Add task</button>
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between rounded border border-[var(--border)] p-2">
        <div className="flex items-center gap-2 text-sm text-[#607183]">
          <button className="rounded border border-[var(--border)] px-3 py-1">Filters</button>
          <button className="rounded border border-[var(--border)] p-1"><PlusCircle size={14} /></button>
          <button className="rounded-full border border-[var(--border)] px-3 py-1">All tasks</button>
          <button className="rounded-full border border-[var(--border)] px-3 py-1">Bug</button>
          <button className="rounded-full border border-[var(--border)] p-1"><Filter size={13} /></button>
          <button className="rounded-full border border-[var(--border)] p-1"><ArrowUp size={13} /></button>
          <button className="rounded-full border border-[var(--border)] px-3 py-1">My tasks</button>
          <button className="rounded-full border border-[var(--border)] px-3 py-1">Recently updated</button>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-2 top-2 text-[#94a2b3]" />
          <input className="rounded border border-[var(--border)] py-1.5 pl-7 pr-3 text-sm" placeholder="Search" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        {columns.map((column) => (
          <div key={column.id} className="min-h-[400px] rounded border border-[var(--border)] bg-[#f8fafc] p-2">
            <div className={`mb-2 rounded border-t-2 ${column.borderClass} bg-white p-2`}>
              <div className="flex items-center justify-between text-sm font-semibold text-[#5f7082]">
                <span>{column.title}</span>
                <span>{column.count}</span>
              </div>
            </div>
            <div className="space-y-2">
              {column.tasks.map((task) => (
                <div key={task.id} className="rounded border border-[var(--border)] bg-white p-2">
                  <div className="flex items-start gap-2">
                    <Image src={task.avatar} alt="assignee" width={18} height={18} className="rounded-full" />
                    <p className="text-sm text-[#4f6073]">{task.id}. {task.title}</p>
                  </div>
                  {task.tag ? <span className={`mt-2 inline-block rounded px-2 py-0.5 text-[11px] ${task.tag.className}`}>{task.tag.label}</span> : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
