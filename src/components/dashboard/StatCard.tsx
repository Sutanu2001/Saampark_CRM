import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  icon: LucideIcon;
  value: string | number;
  label: string;
  iconBgClass: string;
};

export default function StatCard({ icon: Icon, value, label, iconBgClass }: StatCardProps) {
  return (
    <div className="card flex items-center justify-between p-4 !bg-gradient-to-r !from-blue-100 !to-blue-800 text-white">
      <div className={`flex h-10 w-10 items-center justify-center rounded ${iconBgClass}`}>
        <Icon size={18} className="text-white" />
      </div>
      <div className="text-right">
        <p className="text-3xl font-semibold leading-none text-white/100">{value}</p>
        <p className="mt-1 text-sm text-white/100">{label}</p>
      </div>
    </div>
  );
}
