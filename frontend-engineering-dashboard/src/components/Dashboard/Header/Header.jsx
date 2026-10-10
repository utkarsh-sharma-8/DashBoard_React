import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import {
  CalendarDays,
  ChevronDown,
  IndianRupee,
  Package,
  ShoppingCart,
  User,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import StatCard from "./StatCard";

const stats = [
  {
    label: "Total Revenue",
    value: "₹1,24,580",
    change: 12.5,
    icon: IndianRupee,
    iconClassName: "bg-green-100 text-green-600",
  },
  {
    label: "Total Users",
    value: "10,482",
    change: 8.2,
    icon: User,
    iconClassName: "bg-blue-100 text-blue-600",
  },
  {
    label: "Total Orders",
    value: "2,842",
    change: 15.3,
    icon: ShoppingCart,
    iconClassName: "bg-purple-100 text-purple-600",
  },
  {
    label: "Total Products",
    value: "1,206",
    change: -2.1,
    icon: Package,
    iconClassName: "bg-orange-100 text-orange-500",
  },
];

const formatDate = (date) =>
  date?.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const Header = () => {
  const [dateRange, setDateRange] = useState({
    from: new Date(2024, 3, 24),
    to: new Date(2024, 4, 24),
  });
  const [calendarOpen, setCalendarOpen] = useState(false);
  const { user, isLoading } = useAuth();

  const firstName = user?.name?.split(" ")[0] ?? "Utkarsh";

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="mt-1 text-slate-500">
            Welcome back, {isLoading ? "..." : firstName}! Here's what's
            happening with your business today.
          </p>
        </div>

        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setCalendarOpen((open) => !open)}
            aria-expanded={calendarOpen}
            className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <CalendarDays size={18} className="text-slate-500" />
            <span>
              {formatDate(dateRange.from) ?? "Start date"} -{" "}
              {formatDate(dateRange.to) ?? "End date"}
            </span>
            <ChevronDown size={16} className="text-slate-500" />
          </button>

          {calendarOpen && (
            <>
              <button
                type="button"
                aria-label="Close calendar"
                className="fixed inset-0 z-40 cursor-default"
                onClick={() => setCalendarOpen(false)}
              />
              <div className="absolute right-0 top-full z-50 mt-2 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
                <DayPicker
                  mode="range"
                  selected={dateRange}
                  onSelect={(range) => {
                    setDateRange({ from: range?.from, to: range?.to });
                    if (range?.from && range?.to) {
                      setCalendarOpen(false);
                    }
                  }}
                  defaultMonth={dateRange.from}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
};

export default Header;
