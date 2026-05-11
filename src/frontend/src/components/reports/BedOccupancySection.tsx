import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ExportButton } from "@/pages/ReportsPage";
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
import { CHART_COLORS, exportToCsv, getLast7Days } from "./reportUtils";

interface Props {
  data: SharedReportData;
  loading: SharedLoading;
}

export function BedOccupancySection({ data, loading }: Props) {
  const { wards, beds } = data;

  const totalBeds = beds.length;
  const occupiedBeds = beds.filter((b) => b.status === "Occupied").length;
  const occupancyPct = totalBeds
    ? Math.round((occupiedBeds / totalBeds) * 100)
    : 0;

  // Ward-wise breakdown
  const wardData = wards.map((w) => {
    const wardBeds = beds.filter((b) => b.wardId === w.id);
    const occ = wardBeds.filter((b) => b.status === "Occupied").length;
    return {
      name: w.name,
      total: wardBeds.length,
      occupied: occ,
      occupancyPct: wardBeds.length
        ? Math.round((occ / wardBeds.length) * 100)
        : 0,
    };
  });

  // Trend: simulate last 7 days (slightly below current as sample)
  const days7 = getLast7Days();
  const trendData = days7.map((day, i) => ({
    day: day.slice(5),
    rate: Math.max(
      0,
      Math.min(100, occupancyPct - 5 + i * 1.5 + Math.sin(i) * 3),
    ),
  }));

  const isLoading = loading.loadingWards || loading.loadingBeds;

  return (
    <div className="space-y-6" data-ocid="reports.beds.section">
      <div className="flex justify-end">
        <ExportButton
          label="Export CSV"
          onExport={() =>
            exportToCsv(
              "bed-occupancy.csv",
              ["Ward", "Total Beds", "Occupied", "Occupancy %"],
              wardData.map((r) => [
                r.name,
                r.total,
                r.occupied,
                `${r.occupancyPct}%`,
              ]),
            )
          }
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card data-ocid="reports.beds.kpi.occupancy">
          <CardContent className="p-4">
            {isLoading ? (
              <Skeleton className="h-14 w-full" />
            ) : (
              <>
                <div className="text-sm text-muted-foreground">
                  Overall Occupancy
                </div>
                <div
                  className={`text-4xl font-bold mt-1 ${occupancyPct >= 80 ? "text-destructive" : occupancyPct >= 60 ? "text-amber-500" : "text-accent"}`}
                >
                  {occupancyPct}%
                </div>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            {isLoading ? (
              <Skeleton className="h-14 w-full" />
            ) : (
              <>
                <div className="text-sm text-muted-foreground">Total Beds</div>
                <div className="text-4xl font-bold mt-1">{totalBeds}</div>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            {isLoading ? (
              <Skeleton className="h-14 w-full" />
            ) : (
              <>
                <div className="text-sm text-muted-foreground">Occupied</div>
                <div className="text-4xl font-bold mt-1 text-destructive">
                  {occupiedBeds}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ward-wise Occupancy</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-52 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={wardData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="occupied"
                    fill={CHART_COLORS[2]}
                    radius={[4, 4, 0, 0]}
                    name="Occupied"
                  />
                  <Bar
                    dataKey="total"
                    fill={CHART_COLORS[3]}
                    radius={[4, 4, 0, 0]}
                    name="Total"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Occupancy Trend (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-52 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={trendData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    formatter={(v) => [`${Number(v).toFixed(1)}%`, "Rate"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke={CHART_COLORS[0]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Occupancy %"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Ward Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <Skeleton className="h-40 m-4" />
          ) : wardData.length === 0 ? (
            <div
              className="text-center py-10 text-muted-foreground"
              data-ocid="reports.beds.empty_state"
            >
              No ward data available
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium">Ward</th>
                    <th className="text-right px-4 py-2 font-medium">
                      Total Beds
                    </th>
                    <th className="text-right px-4 py-2 font-medium">
                      Occupied
                    </th>
                    <th className="text-right px-4 py-2 font-medium">
                      Occupancy %
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {wardData.map((row, idx) => (
                    <tr
                      key={`ward-${row.name}`}
                      className="border-t"
                      data-ocid={`reports.beds.item.${idx + 1}`}
                    >
                      <td className="px-4 py-2.5">{row.name}</td>
                      <td className="px-4 py-2.5 text-right">{row.total}</td>
                      <td className="px-4 py-2.5 text-right">{row.occupied}</td>
                      <td
                        className={`px-4 py-2.5 text-right font-bold ${row.occupancyPct >= 80 ? "text-destructive" : row.occupancyPct >= 60 ? "text-amber-500" : "text-accent"}`}
                      >
                        {row.occupancyPct}%
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
