import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { ExportButton } from "@/pages/ReportsPage";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { SharedLoading, SharedReportData } from "./reportUtils";
import { CHART_COLORS, exportToCsv, getLast30Days } from "./reportUtils";

interface Props {
  data: SharedReportData;
  loading: SharedLoading;
}

export function OpdIpdSection({ data, loading }: Props) {
  const { appointments, patients } = data;
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const days30 = getLast30Days();
  const filteredDays = days30.filter((d) => {
    if (from && d < from) return false;
    if (to && d > to) return false;
    return true;
  });

  const opdData = filteredDays.map((day) => ({
    day: day.slice(5),
    opd: appointments.filter((a) => a.date === day).length,
  }));

  const admissions = patients.filter((p) => p.admissionDate).length;
  const discharges = patients.filter((p) => p.dischargeDate).length;
  const adcharge = [
    { name: "Admitted", value: admissions },
    { name: "Discharged", value: discharges },
    { name: "Active IPD", value: admissions - discharges },
  ];

  const avgDailyOpd = opdData.length
    ? Math.round(opdData.reduce((s, d) => s + d.opd, 0) / opdData.length)
    : 0;
  const totalOpd = opdData.reduce((s, d) => s + d.opd, 0);

  const isLoading = loading.loadingAppointments || loading.loadingPatients;

  return (
    <div className="space-y-6" data-ocid="reports.opdipd.section">
      <div className="flex flex-wrap items-end gap-4 bg-card border rounded-lg p-4">
        <div className="space-y-1">
          <Label className="text-xs">From</Label>
          <Input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-36 h-8 text-sm"
            data-ocid="reports.opdipd.from_input"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">To</Label>
          <Input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-36 h-8 text-sm"
            data-ocid="reports.opdipd.to_input"
          />
        </div>
        <ExportButton
          label="Export CSV"
          onExport={() =>
            exportToCsv(
              "opd-stats.csv",
              ["Date", "OPD Visits"],
              opdData.map((d) => [d.day, d.opd]),
            )
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col gap-1">
            <div className="text-muted-foreground text-sm">
              Total OPD (period)
            </div>
            <div className="text-3xl font-bold text-foreground">
              {isLoading ? <Skeleton className="h-9 w-16" /> : totalOpd}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col gap-1">
            <div className="text-muted-foreground text-sm">Avg Daily OPD</div>
            <div className="text-3xl font-bold text-foreground">
              {isLoading ? <Skeleton className="h-9 w-16" /> : avgDailyOpd}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Daily OPD Visits</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-56 w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={opdData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} interval={3} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="opd"
                  stroke={CHART_COLORS[0]}
                  strokeWidth={2}
                  dot={false}
                  name="OPD Visits"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Admissions vs Discharges</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-48 w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={adcharge}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="value"
                  fill={CHART_COLORS[1]}
                  radius={[4, 4, 0, 0]}
                  name="Count"
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
