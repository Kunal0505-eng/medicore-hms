import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  BedDouble,
  Calendar,
  DollarSign,
  FileText,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { SharedLoading, SharedReportData } from "./reportUtils";
import { CHART_COLORS, formatCurrency, getLast30Days } from "./reportUtils";

interface Props {
  data: SharedReportData;
  loading: SharedLoading;
}

export function OverviewSection({ data, loading }: Props) {
  const { patients, bills, appointments, beds } = data;
  const totalBeds = beds.length;
  const occupiedBeds = beds.filter((b) => b.status === "Occupied").length;
  const occupancyPct = totalBeds
    ? Math.round((occupiedBeds / totalBeds) * 100)
    : 0;
  const today = new Date().toISOString().slice(0, 10);
  const todayAppts = appointments.filter((a) => a.date === today);
  const paidBills = bills.filter((b) => b.status === "Paid");
  const pendingBills = bills.filter(
    (b) => b.status === "Pending" || b.status === "PartiallyPaid",
  );
  const todayRevenue = paidBills
    .filter((b) => {
      const d = new Date(Number(b.createdAt) / 1_000_000);
      return d.toISOString().slice(0, 10) === today;
    })
    .reduce((sum, b) => sum + Number(b.paidAmount), 0);

  const days30 = getLast30Days();
  const revenueSparkData = days30.map((day) => ({
    day: day.slice(5),
    revenue: paidBills
      .filter((b) => {
        const d = new Date(Number(b.createdAt) / 1_000_000);
        return d.toISOString().slice(0, 10) === day;
      })
      .reduce((sum, b) => sum + Number(b.paidAmount), 0),
  }));

  const kpis = [
    {
      label: "Total Patients",
      value: patients.length,
      icon: Users,
      color: "text-blue-500",
      ocid: "reports.kpi.total_patients",
    },
    {
      label: "Today's OPD",
      value: todayAppts.length,
      icon: Calendar,
      color: "text-accent",
      ocid: "reports.kpi.today_opd",
    },
    {
      label: "IPD Occupancy",
      value: `${occupancyPct}%`,
      icon: BedDouble,
      color: "text-purple-500",
      ocid: "reports.kpi.ipd_occupancy",
    },
    {
      label: "Today's Revenue",
      value: formatCurrency(todayRevenue),
      icon: DollarSign,
      color: "text-green-500",
      ocid: "reports.kpi.today_revenue",
    },
    {
      label: "Pending Bills",
      value: pendingBills.length,
      icon: FileText,
      color: "text-amber-500",
      ocid: "reports.kpi.pending_bills",
    },
    {
      label: "ER Active",
      value: occupiedBeds,
      icon: AlertCircle,
      color: "text-destructive",
      ocid: "reports.kpi.er_active",
    },
  ];

  const isLoading =
    loading.loadingPatients ||
    loading.loadingBills ||
    loading.loadingBeds ||
    loading.loadingAppointments;

  return (
    <div className="space-y-6" data-ocid="reports.overview.section">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} data-ocid={kpi.ocid}>
              <CardContent className="p-4">
                {isLoading ? (
                  <>
                    <Skeleton className="h-8 w-16 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`w-5 h-5 ${kpi.color}`} />
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {kpi.value}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {kpi.label}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Revenue Trend (Last 30 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-52 w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={revenueSparkData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={CHART_COLORS[0]}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={CHART_COLORS[0]}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} interval={4} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${v}`} />
                <Tooltip
                  formatter={(v) => [formatCurrency(Number(v)), "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={CHART_COLORS[0]}
                  fill="url(#revGrad)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
