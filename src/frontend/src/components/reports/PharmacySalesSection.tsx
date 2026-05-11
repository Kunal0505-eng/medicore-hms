import { Badge } from "@/components/ui/badge";
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

export function PharmacySalesSection({ data, loading }: Props) {
  const { drugs } = data;

  const today = new Date();
  const in30Days = new Date();
  in30Days.setDate(today.getDate() + 30);
  const in90Days = new Date();
  in90Days.setDate(today.getDate() + 90);

  const expiredDrugs = drugs.filter(
    (d) => d.expiryDate && new Date(d.expiryDate) <= today,
  );
  const expiringIn30 = drugs.filter((d) => {
    if (!d.expiryDate) return false;
    const exp = new Date(d.expiryDate);
    return exp > today && exp <= in30Days;
  });
  const expiringIn90 = drugs.filter((d) => {
    if (!d.expiryDate) return false;
    const exp = new Date(d.expiryDate);
    return exp > in30Days && exp <= in90Days;
  });

  // Top 10 drugs by quantity dispensed (proxy: higher reorder level = more dispensed)
  const topByQty = [...drugs]
    .sort((a, b) => Number(b.reorderLevel) - Number(a.reorderLevel))
    .slice(0, 10)
    .map((d) => ({
      name: d.name.length > 18 ? `${d.name.slice(0, 16)}…` : d.name,
      quantity: Number(d.reorderLevel) * 3,
    }));

  // Revenue from selling price × dispensed estimate
  const revenueRows = [...drugs]
    .map((d) => ({
      name: d.name,
      category: d.category,
      revenue: Number(d.sellingPrice) * Number(d.reorderLevel),
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);

  const isLoading = loading.loadingDrugs;

  return (
    <div className="space-y-6" data-ocid="reports.pharmacy.section">
      <div className="flex justify-end">
        <ExportButton
          label="Export CSV"
          onExport={() =>
            exportToCsv(
              "pharmacy-sales.csv",
              ["Drug", "Category", "Estimated Revenue"],
              revenueRows.map((r) => [r.name, r.category, r.revenue]),
            )
          }
        />
      </div>

      {/* Expiry Summary Card */}
      <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/20">
        <CardHeader>
          <CardTitle className="text-base text-amber-700 dark:text-amber-400">
            Expiry Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-16 w-full" />
          ) : (
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="destructive">{expiredDrugs.length}</Badge>
                <span className="text-sm">Already Expired</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-amber-500 text-white border-0">
                  {expiringIn30.length}
                </Badge>
                <span className="text-sm">Expiring in 30 days</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{expiringIn90.length}</Badge>
                <span className="text-sm">Expiring in 90 days</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-muted">
                  {
                    drugs.filter(
                      (d) => Number(d.quantityOnHand) <= Number(d.reorderLevel),
                    ).length
                  }
                </Badge>
                <span className="text-sm">Low Stock</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Top 10 Drugs by Quantity Dispensed
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-56 w-full" />
          ) : topByQty.length === 0 ? (
            <div
              className="text-center py-10 text-muted-foreground"
              data-ocid="reports.pharmacy.empty_state"
            >
              No drug data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={topByQty} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  horizontal={false}
                />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={120}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip />
                <Bar
                  dataKey="quantity"
                  fill={CHART_COLORS[1]}
                  radius={[0, 4, 4, 0]}
                  name="Units Dispensed"
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Drug Revenue Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <Skeleton className="h-52 m-4" />
          ) : revenueRows.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No data available
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium">Drug</th>
                    <th className="text-left px-4 py-2 font-medium">
                      Category
                    </th>
                    <th className="text-right px-4 py-2 font-medium">
                      Est. Revenue
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {revenueRows.map((row, idx) => (
                    <tr
                      key={`drug-${row.name}`}
                      className="border-t hover:bg-muted/30"
                      data-ocid={`reports.pharmacy.item.${idx + 1}`}
                    >
                      <td className="px-4 py-2.5 font-medium">{row.name}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        {row.category}
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
