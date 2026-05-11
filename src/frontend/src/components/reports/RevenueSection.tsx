import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ExportButton } from "@/pages/ReportsPage";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { SharedLoading, SharedReportData } from "./reportUtils";
import {
  CHART_COLORS,
  exportToCsv,
  formatCurrency,
  getLast30Days,
} from "./reportUtils";

interface Props {
  data: SharedReportData;
  loading: SharedLoading;
}

const PAYMENT_MODES = ["Cash", "Card", "UPI", "Insurance"];

export function RevenueSection({ data, loading }: Props) {
  const { bills } = data;
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [granularity, setGranularity] = useState("daily");

  const paidBills = bills.filter((b) => {
    if (b.status !== "Paid") return false;
    const d = new Date(Number(b.createdAt) / 1_000_000)
      .toISOString()
      .slice(0, 10);
    if (from && d < from) return false;
    if (to && d > to) return false;
    return true;
  });

  const totalRevenue = paidBills.reduce((s, b) => s + Number(b.paidAmount), 0);
  const days30 = getLast30Days();

  const revenueByDay = days30.map((day) => ({
    label: day.slice(5),
    revenue: paidBills
      .filter(
        (b) =>
          new Date(Number(b.createdAt) / 1_000_000)
            .toISOString()
            .slice(0, 10) === day,
      )
      .reduce((s, b) => s + Number(b.paidAmount), 0),
  }));

  // Monthly grouped
  const monthMap: Record<string, number> = {};
  for (const b of paidBills) {
    const m = new Date(Number(b.createdAt) / 1_000_000)
      .toISOString()
      .slice(0, 7);
    monthMap[m] = (monthMap[m] ?? 0) + Number(b.paidAmount);
  }
  const revenueByMonth = Object.entries(monthMap)
    .sort()
    .map(([m, rev]) => ({ label: m, revenue: rev }));

  const chartData = granularity === "monthly" ? revenueByMonth : revenueByDay;

  // Payment mode split
  const modeMap: Record<string, number> = {};
  for (const mode of PAYMENT_MODES) modeMap[mode] = 0;
  for (const b of paidBills) {
    const m = b.paymentMode ?? "Cash";
    modeMap[m] = (modeMap[m] ?? 0) + Number(b.paidAmount);
  }
  const modeData = PAYMENT_MODES.map((mode) => ({
    name: mode,
    value: modeMap[mode] ?? 0,
  }));

  // Service breakdown
  const svcMap: Record<string, number> = {};
  for (const b of paidBills) {
    for (const item of b.items) {
      const cat = item.serviceName;
      svcMap[cat] = (svcMap[cat] ?? 0) + Number(item.total);
    }
  }
  const svcRows = Object.entries(svcMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const isLoading = loading.loadingBills;

  return (
    <div className="space-y-6" data-ocid="reports.revenue.section">
      <div className="flex flex-wrap items-end gap-4 bg-card border rounded-lg p-4">
        <div className="space-y-1">
          <Label className="text-xs">From</Label>
          <Input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-36 h-8 text-sm"
            data-ocid="reports.revenue.from_input"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">To</Label>
          <Input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-36 h-8 text-sm"
            data-ocid="reports.revenue.to_input"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Granularity</Label>
          <Select value={granularity} onValueChange={setGranularity}>
            <SelectTrigger
              className="w-28 h-8 text-sm"
              data-ocid="reports.revenue.granularity_select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ExportButton
          label="Export CSV"
          onExport={() =>
            exportToCsv(
              "revenue.csv",
              ["Period", "Revenue"],
              chartData.map((d) => [d.label, d.revenue]),
            )
          }
        />
      </div>

      <Card>
        <CardContent className="p-4">
          {isLoading ? (
            <Skeleton className="h-12 w-40" />
          ) : (
            <>
              <div className="text-muted-foreground text-sm">
                Total Revenue (filtered)
              </div>
              <div className="text-4xl font-bold text-foreground mt-1">
                {formatCurrency(totalRevenue)}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Revenue by {granularity === "monthly" ? "Month" : "Day"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-52 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 10 }}
                    interval={granularity === "daily" ? 4 : 0}
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v) => `₹${v / 1000}k`}
                  />
                  <Tooltip
                    formatter={(v) => [formatCurrency(Number(v)), "Revenue"]}
                  />
                  <Bar
                    dataKey="revenue"
                    fill={CHART_COLORS[0]}
                    radius={[4, 4, 0, 0]}
                    name="Revenue"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Payment Mode Split</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-52 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={modeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) =>
                      `${name} ${Math.round((percent ?? 0) * 100)}%`
                    }
                  >
                    {modeData.map((_entry, i) => (
                      <Cell
                        key={PAYMENT_MODES[i]}
                        fill={CHART_COLORS[i % CHART_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v) => [formatCurrency(Number(v)), "Revenue"]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Revenue by Service</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <Skeleton className="h-40 m-4" />
          ) : svcRows.length === 0 ? (
            <div
              className="text-center py-10 text-muted-foreground"
              data-ocid="reports.revenue.empty_state"
            >
              No billing data available
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium">Service</th>
                    <th className="text-right px-4 py-2 font-medium">
                      Revenue
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {svcRows.map(([svc, rev], idx) => (
                    <tr
                      key={`svc-${svc}`}
                      className="border-t"
                      data-ocid={`reports.revenue.item.${idx + 1}`}
                    >
                      <td className="px-4 py-2">{svc}</td>
                      <td className="px-4 py-2 text-right font-medium">
                        {formatCurrency(rev)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
