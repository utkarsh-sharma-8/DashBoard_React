import { ArrowDown, ArrowUp } from "lucide-react";

const StatCard = ({ icon: Icon, iconClassName, label, value, change }) => {
  const isPositive = change >= 0;

  return (
    <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}>
        <Icon size={24} />
      </div>

      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
        <p className="mt-2 flex items-center gap-1 text-sm text-slate-500">
          {isPositive ? (
            <ArrowUp size={14} className="text-green-600" />
          ) : (
            <ArrowDown size={14} className="text-red-600" />
          )}
          <span className={isPositive ? "font-medium text-green-600" : "font-medium text-red-600"}>
            {Math.abs(change)}%
          </span>
          from last month
        </p>
      </div>
    </div>
  );
};

export default StatCard;
