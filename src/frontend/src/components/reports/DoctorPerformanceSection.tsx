import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ExportButton } from "@/pages/ReportsPage";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { SharedLoading, SharedReportData } from "./reportUtils";
import { CHART_COLORS, exportToCsv, formatCurrency } from "./reportUtils";

interface Props {
  data: SharedReportData;
  loading: SharedLoading;
}

export function DoctorPerformanceSection({ data, loading }: Props) {
  const { doctors, appointments } = data;

  const rows = doctors
    .map((doc) => {
      const docAppts = appointments.filter((a) => a.doctorId === doc.id);
      // Approximate revenue: consultation fee × appointments
      const revenue = docAppts.length * Number(doc.consultationFee);
      return {
        id: doc.id,
        name: `Dr. #${doc.userId}`,
        specialization: doc.specialization,
        patientCount: docAppts.length,
        avgConsultTime: 15, // fixed estimate in minutes
        revenue,
      };
    })
    .sort((a, b) => b.revenue - a.revenue);

  const top5 = rows.slice(0, 5);
  const barData = top5.map((r) => ({
    name: r.name.replace("Dr. ", ""),
    revenue: r.revenue,
  }));

  const isLoading =
    loading.loadingDoctors ||
    loading.loadingAppointments ||
    loading.loadingBills;

  return (
    <div className="space-y-6" data-ocid="reports.doctors.section">
      <div className="flex justify-end">
        <ExportButton
          label="Export CSV"
          onExport={() =>
            exportToCsv(
              "doctor-performance.csv",
              [
                "Doctor",
                "Specialization",
                "Patients",
                "Avg Consult (min)",
                "Revenue",
              ],
              rows.map((r) => [
                r.name,
                r.specialization,
                r.patientCount,
                r.avgConsultTime,
                r.revenue,
              ]),
            )
          }
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Top 5 Doctors by Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-52 w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) => `₹${v / 1000}k`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={80}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  formatter={(v) => [formatCurrency(Number(v)), "Revenue"]}
                />
                <Bar
                  dataKey="revenue"
                  fill={CHART_COLORS[0]}
                  radius={[0, 4, 4, 0]}
                  name="Revenue"
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Doctors Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <Skeleton className="h-52 m-4" />
          ) : rows.length === 0 ? (
            <div
              className="text-center py-12 text-muted-foreground"
              data-ocid="reports.doctors.empty_state"
            >
              No doctor data available
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Doctor</th>
                    <th className="text-left px-4 py-3 font-medium">
                      Specialization
                    </th>
                    <th className="text-right px-4 py-3 font-medium">
                      Patients
                    </th>
                    <th className="text-right px-4 py-3 font-medium">
                      Avg Consult
                    </th>
                    <th className="text-right px-4 py-3 font-medium">
                      Revenue
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, idx) => (
                    <tr
                      key={`doc-${row.id}`}
                      className="border-t hover:bg-muted/30"
                      data-ocid={`reports.doctors.item.${idx + 1}`}
                    >
                      <td className="px-4 py-2.5 font-medium">{row.name}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        {row.specialization}
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        {row.patientCount}
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        {row.avgConsultTime} min
                      </td>
                      <td className="px-4 py-2.5 text-right font-medium text-accent">
                        {formatCurrency(row.revenue)}
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
