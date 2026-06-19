"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  FolderKanban,
  CheckSquare,
  Target,
  CreditCard,
  ShoppingCart,
  FileText,
  FileBarChart,
  StickyNote,
  MessageSquare,
  UsersRound,
  Ticket,
  BookOpen,
  FolderOpen,
  IndianRupee,
  BarChart3,
  Settings,
  ChevronDown,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  children?: Array<{ label: string; href: string }>;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Events", href: "/events", icon: CalendarDays },
  { label: "Clients", href: "/clients", icon: Users },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Tasks", href: "/tasks", icon: CheckSquare },
  { label: "Leads", href: "/leads", icon: Target },
  { label: "Subscriptions", href: "/subscriptions", icon: CreditCard },
  {
    label: "Sales",
    href: "/sales/invoices",
    icon: ShoppingCart,
    children: [
      { label: "Invoices", href: "/sales/invoices" },
      { label: "Orders list", href: "/sales/orders-list" },
      { label: "Store", href: "/sales/store" },
      { label: "Payments", href: "/sales/payments" },
      { label: "Items", href: "/sales/items" },
      { label: "Contracts", href: "/sales/contracts" },
    ],
  },
  { label: "Estimates", href: "/estimates", icon: FileText },
  { label: "Proposals", href: "/proposals", icon: FileBarChart },
  { label: "Notes", href: "/notes", icon: StickyNote },
  { label: "Messages", href: "/messages", icon: MessageSquare },
  { label: "Team", href: "/team", icon: UsersRound },
  { label: "Tickets", href: "/tickets", icon: Ticket, badge: 21 },
  { label: "Knowledge base", href: "/knowledge", icon: BookOpen },
  { label: "Files", href: "/files", icon: FolderOpen },
  { label: "Expenses", href: "/expenses", icon: IndianRupee },
  { label: "Reports", href: "/reports", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar({ isopen = true }: { isopen?: boolean }) {
  const pathname = usePathname();

  return (
    <aside
      style={{ width: "var(--sidebar-width)" }}
      className={`fixed left-0 top-16 z-40 h-[calc(100vh-64px)] overflow-y-auto border-r border-[#223044] bg-[var(--bg-sidebar)] transition-transform duration-200 ease-in-out ${
        isopen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* ===== NAVIGATION ===== */}
      <nav className="px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          const hasChildren = item.children && item.children.length > 0;
          const expanded = hasChildren && pathname.startsWith("/sales");

          return (
            <div key={item.label}>
              <Link
                href={item.href}
                className={`sidebar-link ${isActive ? "active" : ""}`}
              >
                <Icon size={16} />
                <span className="flex-1 text-sm">{item.label}</span>

                {item.badge && (
                  <span className="text-xs font-semibold text-[#d5deea]">
                    {item.badge}
                  </span>
                )}

                {hasChildren && (
                  <ChevronDown
                    size={12}
                    className={`text-[#7f90a4] transition-transform ${
                      expanded ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Link>

              {expanded && hasChildren && (
                <div className="ml-6 mt-1 border-l border-[#33445a] pl-3">
                  {item.children!.map((child) => {
                    const childActive = pathname === child.href;

                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block py-1.5 text-sm transition-colors ${
                          childActive
                            ? "text-white"
                            : "text-[#a5b3c3] hover:text-white"
                        }`}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}