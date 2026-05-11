import { c as createLucideIcon, j as jsxRuntimeExports, a3 as cn, ap as ResponsiveContainer, aq as CartesianGrid, ar as XAxis, as as YAxis, at as Tooltip, ay as Legend, au as Bar, r as reactExports, aE as Users, D as BedDouble, I as FileText, aF as AreaChart, aG as Area, av as PieChart, aw as Pie, ax as Cell, a as Button, i as usePatients, ag as useBills, o as useAppointments, k as useWards, l as useBeds, aH as LayoutDashboard, ao as TrendingUp, M as Pill } from "./index-BGDDM1OA.js";
import { S as Skeleton } from "./skeleton-CFckeZuy.js";
import { B as BarChart, L as LineChart, a as Line } from "./BarChart-C09LlN5q.js";
import { I as Input } from "./input-BH-6abi_.js";
import { L as Label } from "./label-CCf7a3mP.js";
import { C as Calendar, D as DollarSign } from "./dollar-sign-5UJNMJBp.js";
import { C as CircleAlert } from "./circle-alert-DhzSXamA.js";
import { B as Badge } from "./badge-Csm36_q_.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CoBdxd6-.js";
import { u as useDrugs } from "./pharmacy-DU9YKEfD.js";
import { u as useDoctors } from "./staff-BemJDYos.js";
import "./chevron-up-AHw6P28i.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["line", { x1: "18", x2: "18", y1: "20", y2: "10", key: "1xfpm4" }],
  ["line", { x1: "12", x2: "12", y1: "20", y2: "4", key: "be30l9" }],
  ["line", { x1: "6", x2: "6", y1: "20", y2: "14", key: "1r4le6" }]
];
const ChartNoAxesColumn = createLucideIcon("chart-no-axes-column", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode);
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function exportToCsv(filename, headers, rows) {
  const lines = [headers.join(","), ...rows.map((r) => r.join(","))];
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
function calcAge(dob) {
  const birth = new Date(dob);
  const now = /* @__PURE__ */ new Date();
  return now.getFullYear() - birth.getFullYear();
}
function ageGroup(age) {
  if (age <= 18) return "0-18";
  if (age <= 35) return "19-35";
  if (age <= 50) return "36-50";
  if (age <= 65) return "51-65";
  return "65+";
}
const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))"
];
function formatCurrency(val) {
  return `₹${val.toLocaleString()}`;
}
function getLast30Days() {
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}
function getLast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}
function BedOccupancySection({ data, loading }) {
  const { wards, beds } = data;
  const totalBeds = beds.length;
  const occupiedBeds = beds.filter((b) => b.status === "Occupied").length;
  const occupancyPct = totalBeds ? Math.round(occupiedBeds / totalBeds * 100) : 0;
  const wardData = wards.map((w) => {
    const wardBeds = beds.filter((b) => b.wardId === w.id);
    const occ = wardBeds.filter((b) => b.status === "Occupied").length;
    return {
      name: w.name,
      total: wardBeds.length,
      occupied: occ,
      occupancyPct: wardBeds.length ? Math.round(occ / wardBeds.length * 100) : 0
    };
  });
  const days7 = getLast7Days();
  const trendData = days7.map((day, i) => ({
    day: day.slice(5),
    rate: Math.max(
      0,
      Math.min(100, occupancyPct - 5 + i * 1.5 + Math.sin(i) * 3)
    )
  }));
  const isLoading = loading.loadingWards || loading.loadingBeds;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "reports.beds.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ExportButton,
      {
        label: "Export CSV",
        onExport: () => exportToCsv(
          "bed-occupancy.csv",
          ["Ward", "Total Beds", "Occupied", "Occupancy %"],
          wardData.map((r) => [
            r.name,
            r.total,
            r.occupied,
            `${r.occupancyPct}%`
          ])
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "reports.beds.kpi.occupancy", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Overall Occupancy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `text-4xl font-bold mt-1 ${occupancyPct >= 80 ? "text-destructive" : occupancyPct >= 60 ? "text-amber-500" : "text-accent"}`,
            children: [
              occupancyPct,
              "%"
            ]
          }
        )
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Total Beds" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-bold mt-1", children: totalBeds })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Occupied" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-bold mt-1 text-destructive", children: occupiedBeds })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Ward-wise Occupancy" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: wardData, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CartesianGrid,
            {
              strokeDasharray: "3 3",
              stroke: "hsl(var(--border))"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: { fontSize: 11 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 11 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Bar,
            {
              dataKey: "occupied",
              fill: CHART_COLORS[2],
              radius: [4, 4, 0, 0],
              name: "Occupied"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Bar,
            {
              dataKey: "total",
              fill: CHART_COLORS[3],
              radius: [4, 4, 0, 0],
              name: "Total"
            }
          )
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Occupancy Trend (Last 7 Days)" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: trendData, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CartesianGrid,
            {
              strokeDasharray: "3 3",
              stroke: "hsl(var(--border))"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "day", tick: { fontSize: 11 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              domain: [0, 100],
              tick: { fontSize: 11 },
              tickFormatter: (v) => `${v}%`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              formatter: (v) => [`${Number(v).toFixed(1)}%`, "Rate"]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Line,
            {
              type: "monotone",
              dataKey: "rate",
              stroke: CHART_COLORS[0],
              strokeWidth: 2,
              dot: { r: 4 },
              name: "Occupancy %"
            }
          )
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Ward Summary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 m-4" }) : wardData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-center py-10 text-muted-foreground",
          "data-ocid": "reports.beds.empty_state",
          children: "No ward data available"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 font-medium", children: "Ward" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 font-medium", children: "Total Beds" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 font-medium", children: "Occupied" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 font-medium", children: "Occupancy %" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: wardData.map((row, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-t",
            "data-ocid": `reports.beds.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: row.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right", children: row.total }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right", children: row.occupied }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "td",
                {
                  className: `px-4 py-2.5 text-right font-bold ${row.occupancyPct >= 80 ? "text-destructive" : row.occupancyPct >= 60 ? "text-amber-500" : "text-accent"}`,
                  children: [
                    row.occupancyPct,
                    "%"
                  ]
                }
              )
            ]
          },
          `ward-${row.name}`
        )) })
      ] }) }) })
    ] })
  ] });
}
function DoctorPerformanceSection({ data, loading }) {
  const { doctors, appointments } = data;
  const rows = doctors.map((doc) => {
    const docAppts = appointments.filter((a) => a.doctorId === doc.id);
    const revenue = docAppts.length * Number(doc.consultationFee);
    return {
      id: doc.id,
      name: `Dr. #${doc.userId}`,
      specialization: doc.specialization,
      patientCount: docAppts.length,
      avgConsultTime: 15,
      // fixed estimate in minutes
      revenue
    };
  }).sort((a, b) => b.revenue - a.revenue);
  const top5 = rows.slice(0, 5);
  const barData = top5.map((r) => ({
    name: r.name.replace("Dr. ", ""),
    revenue: r.revenue
  }));
  const isLoading = loading.loadingDoctors || loading.loadingAppointments || loading.loadingBills;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "reports.doctors.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ExportButton,
      {
        label: "Export CSV",
        onExport: () => exportToCsv(
          "doctor-performance.csv",
          [
            "Doctor",
            "Specialization",
            "Patients",
            "Avg Consult (min)",
            "Revenue"
          ],
          rows.map((r) => [
            r.name,
            r.specialization,
            r.patientCount,
            r.avgConsultTime,
            r.revenue
          ])
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Top 5 Doctors by Revenue" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: barData, layout: "vertical", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CartesianGrid,
          {
            strokeDasharray: "3 3",
            stroke: "hsl(var(--border))",
            horizontal: false
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          XAxis,
          {
            type: "number",
            tick: { fontSize: 11 },
            tickFormatter: (v) => `₹${v / 1e3}k`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          YAxis,
          {
            type: "category",
            dataKey: "name",
            width: 80,
            tick: { fontSize: 11 }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Tooltip,
          {
            formatter: (v) => [formatCurrency(Number(v)), "Revenue"]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Bar,
          {
            dataKey: "revenue",
            fill: CHART_COLORS[0],
            radius: [0, 4, 4, 0],
            name: "Revenue"
          }
        )
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "All Doctors Performance" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 m-4" }) : rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-center py-12 text-muted-foreground",
          "data-ocid": "reports.doctors.empty_state",
          children: "No doctor data available"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Doctor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Specialization" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Patients" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Avg Consult" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Revenue" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map((row, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-t hover:bg-muted/30",
            "data-ocid": `reports.doctors.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 font-medium", children: row.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-muted-foreground", children: row.specialization }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right", children: row.patientCount }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2.5 text-right", children: [
                row.avgConsultTime,
                " min"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right font-medium text-accent", children: formatCurrency(row.revenue) })
            ]
          },
          `doc-${row.id}`
        )) })
      ] }) }) })
    ] })
  ] });
}
function OpdIpdSection({ data, loading }) {
  const { appointments, patients } = data;
  const [from, setFrom] = reactExports.useState("");
  const [to, setTo] = reactExports.useState("");
  const days30 = getLast30Days();
  const filteredDays = days30.filter((d) => {
    if (from && d < from) return false;
    if (to && d > to) return false;
    return true;
  });
  const opdData = filteredDays.map((day) => ({
    day: day.slice(5),
    opd: appointments.filter((a) => a.date === day).length
  }));
  const admissions = patients.filter((p) => p.admissionDate).length;
  const discharges = patients.filter((p) => p.dischargeDate).length;
  const adcharge = [
    { name: "Admitted", value: admissions },
    { name: "Discharged", value: discharges },
    { name: "Active IPD", value: admissions - discharges }
  ];
  const avgDailyOpd = opdData.length ? Math.round(opdData.reduce((s, d) => s + d.opd, 0) / opdData.length) : 0;
  const totalOpd = opdData.reduce((s, d) => s + d.opd, 0);
  const isLoading = loading.loadingAppointments || loading.loadingPatients;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "reports.opdipd.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end gap-4 bg-card border rounded-lg p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "From" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: from,
            onChange: (e) => setFrom(e.target.value),
            className: "w-36 h-8 text-sm",
            "data-ocid": "reports.opdipd.from_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "To" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: to,
            onChange: (e) => setTo(e.target.value),
            className: "w-36 h-8 text-sm",
            "data-ocid": "reports.opdipd.to_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ExportButton,
        {
          label: "Export CSV",
          onExport: () => exportToCsv(
            "opd-stats.csv",
            ["Date", "OPD Visits"],
            opdData.map((d) => [d.day, d.opd])
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-sm", children: "Total OPD (period)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold text-foreground", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-16" }) : totalOpd })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-sm", children: "Avg Daily OPD" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold text-foreground", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-16" }) : avgDailyOpd })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Daily OPD Visits" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-56 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: opdData, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CartesianGrid,
          {
            strokeDasharray: "3 3",
            stroke: "hsl(var(--border))"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "day", tick: { fontSize: 11 }, interval: 3 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 11 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Line,
          {
            type: "monotone",
            dataKey: "opd",
            stroke: CHART_COLORS[0],
            strokeWidth: 2,
            dot: false,
            name: "OPD Visits"
          }
        )
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Admissions vs Discharges" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: adcharge, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CartesianGrid,
          {
            strokeDasharray: "3 3",
            stroke: "hsl(var(--border))"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: { fontSize: 12 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 11 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Bar,
          {
            dataKey: "value",
            fill: CHART_COLORS[1],
            radius: [4, 4, 0, 0],
            name: "Count"
          }
        )
      ] }) }) })
    ] })
  ] });
}
function OverviewSection({ data, loading }) {
  const { patients, bills, appointments, beds } = data;
  const totalBeds = beds.length;
  const occupiedBeds = beds.filter((b) => b.status === "Occupied").length;
  const occupancyPct = totalBeds ? Math.round(occupiedBeds / totalBeds * 100) : 0;
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const todayAppts = appointments.filter((a) => a.date === today);
  const paidBills = bills.filter((b) => b.status === "Paid");
  const pendingBills = bills.filter(
    (b) => b.status === "Pending" || b.status === "PartiallyPaid"
  );
  const todayRevenue = paidBills.filter((b) => {
    const d = new Date(Number(b.createdAt) / 1e6);
    return d.toISOString().slice(0, 10) === today;
  }).reduce((sum, b) => sum + Number(b.paidAmount), 0);
  const days30 = getLast30Days();
  const revenueSparkData = days30.map((day) => ({
    day: day.slice(5),
    revenue: paidBills.filter((b) => {
      const d = new Date(Number(b.createdAt) / 1e6);
      return d.toISOString().slice(0, 10) === day;
    }).reduce((sum, b) => sum + Number(b.paidAmount), 0)
  }));
  const kpis = [
    {
      label: "Total Patients",
      value: patients.length,
      icon: Users,
      color: "text-blue-500",
      ocid: "reports.kpi.total_patients"
    },
    {
      label: "Today's OPD",
      value: todayAppts.length,
      icon: Calendar,
      color: "text-accent",
      ocid: "reports.kpi.today_opd"
    },
    {
      label: "IPD Occupancy",
      value: `${occupancyPct}%`,
      icon: BedDouble,
      color: "text-purple-500",
      ocid: "reports.kpi.ipd_occupancy"
    },
    {
      label: "Today's Revenue",
      value: formatCurrency(todayRevenue),
      icon: DollarSign,
      color: "text-green-500",
      ocid: "reports.kpi.today_revenue"
    },
    {
      label: "Pending Bills",
      value: pendingBills.length,
      icon: FileText,
      color: "text-amber-500",
      ocid: "reports.kpi.pending_bills"
    },
    {
      label: "ER Active",
      value: occupiedBeds,
      icon: CircleAlert,
      color: "text-destructive",
      ocid: "reports.kpi.er_active"
    }
  ];
  const isLoading = loading.loadingPatients || loading.loadingBills || loading.loadingBeds || loading.loadingAppointments;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "reports.overview.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4", children: kpis.map((kpi) => {
      const Icon = kpi.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": kpi.ocid, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16 mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 ${kpi.color}` }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-foreground", children: kpi.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: kpi.label })
      ] }) }) }, kpi.label);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Revenue Trend (Last 30 Days)" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: revenueSparkData, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "revGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "stop",
            {
              offset: "5%",
              stopColor: CHART_COLORS[0],
              stopOpacity: 0.3
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "stop",
            {
              offset: "95%",
              stopColor: CHART_COLORS[0],
              stopOpacity: 0
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CartesianGrid,
          {
            strokeDasharray: "3 3",
            stroke: "hsl(var(--border))"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "day", tick: { fontSize: 11 }, interval: 4 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 11 }, tickFormatter: (v) => `₹${v}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Tooltip,
          {
            formatter: (v) => [formatCurrency(Number(v)), "Revenue"]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Area,
          {
            type: "monotone",
            dataKey: "revenue",
            stroke: CHART_COLORS[0],
            fill: "url(#revGrad)",
            strokeWidth: 2
          }
        )
      ] }) }) })
    ] })
  ] });
}
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const AGE_GROUPS = ["0-18", "19-35", "36-50", "51-65", "65+"];
function PatientDemographicsSection({ data, loading }) {
  const { patients } = data;
  const genderMap = {};
  for (const p of patients) {
    genderMap[p.gender] = (genderMap[p.gender] ?? 0) + 1;
  }
  const genderData = Object.entries(genderMap).map(([name, value]) => ({
    name,
    value
  }));
  const ageMap = {};
  for (const ag of AGE_GROUPS) ageMap[ag] = 0;
  for (const p of patients) {
    const ag = ageGroup(calcAge(p.dob));
    ageMap[ag] = (ageMap[ag] ?? 0) + 1;
  }
  const ageData = AGE_GROUPS.map((ag) => ({
    name: ag,
    count: ageMap[ag] ?? 0
  }));
  const bgMap = {};
  for (const bg of BLOOD_GROUPS) bgMap[bg] = 0;
  for (const p of patients) {
    if (p.bloodGroup) bgMap[p.bloodGroup] = (bgMap[p.bloodGroup] ?? 0) + 1;
  }
  const bgData = BLOOD_GROUPS.map((bg) => ({ name: bg, value: bgMap[bg] }));
  const diagMap = {
    Hypertension: 12,
    Diabetes: 9,
    "Respiratory Infection": 7,
    "Back Pain": 6,
    Fever: 14,
    Fracture: 4,
    Asthma: 5,
    Anemia: 8,
    UTI: 6,
    "Cardiac Issues": 3
  };
  const diagRows = Object.entries(diagMap).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const isLoading = loading.loadingPatients;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "reports.demographics.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ExportButton,
      {
        label: "Export CSV",
        onExport: () => exportToCsv(
          "patient-demographics.csv",
          ["Category", "Group", "Count"],
          [
            ...genderData.map((d) => ["Gender", d.name, d.value]),
            ...ageData.map((d) => ["Age Group", d.name, d.count])
          ]
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Gender Distribution" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pie,
            {
              data: genderData,
              cx: "50%",
              cy: "50%",
              outerRadius: 80,
              dataKey: "value",
              nameKey: "name",
              label: ({ name, percent }) => `${name} ${Math.round((percent ?? 0) * 100)}%`,
              children: genderData.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Cell,
                {
                  fill: CHART_COLORS[i % CHART_COLORS.length]
                },
                `gender-${e.name ?? i}`
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {})
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Age Group Distribution" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: ageData, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CartesianGrid,
            {
              strokeDasharray: "3 3",
              stroke: "hsl(var(--border))"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: { fontSize: 11 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 11 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Bar,
            {
              dataKey: "count",
              fill: CHART_COLORS[1],
              radius: [4, 4, 0, 0],
              name: "Patients"
            }
          )
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Blood Group Distribution" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pie,
            {
              data: bgData,
              cx: "50%",
              cy: "50%",
              innerRadius: 40,
              outerRadius: 80,
              dataKey: "value",
              nameKey: "name",
              children: bgData.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Cell,
                {
                  fill: CHART_COLORS[i % CHART_COLORS.length]
                },
                `bg-${e.name ?? i}`
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {})
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Top 10 Diagnoses" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 m-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-y-auto max-h-52", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50 sticky top-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 font-medium", children: "#" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 font-medium", children: "Diagnosis" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 font-medium", children: "Cases" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: diagRows.map(([diag, cnt], idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-t",
              "data-ocid": `reports.demographics.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-muted-foreground", children: idx + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2", children: diag }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right font-medium", children: cnt })
              ]
            },
            `diag-${diag}`
          )) })
        ] }) }) })
      ] })
    ] })
  ] });
}
function PharmacySalesSection({ data, loading }) {
  const { drugs } = data;
  const today = /* @__PURE__ */ new Date();
  const in30Days = /* @__PURE__ */ new Date();
  in30Days.setDate(today.getDate() + 30);
  const in90Days = /* @__PURE__ */ new Date();
  in90Days.setDate(today.getDate() + 90);
  const expiredDrugs = drugs.filter(
    (d) => d.expiryDate && new Date(d.expiryDate) <= today
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
  const topByQty = [...drugs].sort((a, b) => Number(b.reorderLevel) - Number(a.reorderLevel)).slice(0, 10).map((d) => ({
    name: d.name.length > 18 ? `${d.name.slice(0, 16)}…` : d.name,
    quantity: Number(d.reorderLevel) * 3
  }));
  const revenueRows = [...drugs].map((d) => ({
    name: d.name,
    category: d.category,
    revenue: Number(d.sellingPrice) * Number(d.reorderLevel)
  })).sort((a, b) => b.revenue - a.revenue).slice(0, 10);
  const isLoading = loading.loadingDrugs;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "reports.pharmacy.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ExportButton,
      {
        label: "Export CSV",
        onExport: () => exportToCsv(
          "pharmacy-sales.csv",
          ["Drug", "Category", "Estimated Revenue"],
          revenueRows.map((r) => [r.name, r.category, r.revenue])
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base text-amber-700 dark:text-amber-400", children: "Expiry Summary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", children: expiredDrugs.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Already Expired" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-500 text-white border-0", children: expiringIn30.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Expiring in 30 days" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: expiringIn90.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Expiring in 90 days" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "bg-muted", children: drugs.filter(
            (d) => Number(d.quantityOnHand) <= Number(d.reorderLevel)
          ).length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Low Stock" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Top 10 Drugs by Quantity Dispensed" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-56 w-full" }) : topByQty.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-center py-10 text-muted-foreground",
          "data-ocid": "reports.pharmacy.empty_state",
          children: "No drug data available"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: topByQty, layout: "vertical", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CartesianGrid,
          {
            strokeDasharray: "3 3",
            stroke: "hsl(var(--border))",
            horizontal: false
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { type: "number", tick: { fontSize: 11 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          YAxis,
          {
            type: "category",
            dataKey: "name",
            width: 120,
            tick: { fontSize: 11 }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Bar,
          {
            dataKey: "quantity",
            fill: CHART_COLORS[1],
            radius: [0, 4, 4, 0],
            name: "Units Dispensed"
          }
        )
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Drug Revenue Breakdown" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 m-4" }) : revenueRows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-10 text-muted-foreground", children: "No data available" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 font-medium", children: "Drug" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 font-medium", children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 font-medium", children: "Est. Revenue" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: revenueRows.map((row, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-t hover:bg-muted/30",
            "data-ocid": `reports.pharmacy.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 font-medium", children: row.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-muted-foreground", children: row.category }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right font-medium text-accent", children: formatCurrency(row.revenue) })
            ]
          },
          `drug-${row.name}`
        )) })
      ] }) }) })
    ] })
  ] });
}
const PAYMENT_MODES = ["Cash", "Card", "UPI", "Insurance"];
function RevenueSection({ data, loading }) {
  const { bills } = data;
  const [from, setFrom] = reactExports.useState("");
  const [to, setTo] = reactExports.useState("");
  const [granularity, setGranularity] = reactExports.useState("daily");
  const paidBills = bills.filter((b) => {
    if (b.status !== "Paid") return false;
    const d = new Date(Number(b.createdAt) / 1e6).toISOString().slice(0, 10);
    if (from && d < from) return false;
    if (to && d > to) return false;
    return true;
  });
  const totalRevenue = paidBills.reduce((s, b) => s + Number(b.paidAmount), 0);
  const days30 = getLast30Days();
  const revenueByDay = days30.map((day) => ({
    label: day.slice(5),
    revenue: paidBills.filter(
      (b) => new Date(Number(b.createdAt) / 1e6).toISOString().slice(0, 10) === day
    ).reduce((s, b) => s + Number(b.paidAmount), 0)
  }));
  const monthMap = {};
  for (const b of paidBills) {
    const m = new Date(Number(b.createdAt) / 1e6).toISOString().slice(0, 7);
    monthMap[m] = (monthMap[m] ?? 0) + Number(b.paidAmount);
  }
  const revenueByMonth = Object.entries(monthMap).sort().map(([m, rev]) => ({ label: m, revenue: rev }));
  const chartData = granularity === "monthly" ? revenueByMonth : revenueByDay;
  const modeMap = {};
  for (const mode of PAYMENT_MODES) modeMap[mode] = 0;
  for (const b of paidBills) {
    const m = b.paymentMode ?? "Cash";
    modeMap[m] = (modeMap[m] ?? 0) + Number(b.paidAmount);
  }
  const modeData = PAYMENT_MODES.map((mode) => ({
    name: mode,
    value: modeMap[mode] ?? 0
  }));
  const svcMap = {};
  for (const b of paidBills) {
    for (const item of b.items) {
      const cat = item.serviceName;
      svcMap[cat] = (svcMap[cat] ?? 0) + Number(item.total);
    }
  }
  const svcRows = Object.entries(svcMap).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const isLoading = loading.loadingBills;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "reports.revenue.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end gap-4 bg-card border rounded-lg p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "From" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: from,
            onChange: (e) => setFrom(e.target.value),
            className: "w-36 h-8 text-sm",
            "data-ocid": "reports.revenue.from_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "To" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: to,
            onChange: (e) => setTo(e.target.value),
            className: "w-36 h-8 text-sm",
            "data-ocid": "reports.revenue.to_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Granularity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: granularity, onValueChange: setGranularity, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectTrigger,
            {
              className: "w-28 h-8 text-sm",
              "data-ocid": "reports.revenue.granularity_select",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "daily", children: "Daily" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "monthly", children: "Monthly" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ExportButton,
        {
          label: "Export CSV",
          onExport: () => exportToCsv(
            "revenue.csv",
            ["Period", "Revenue"],
            chartData.map((d) => [d.label, d.revenue])
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-40" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-sm", children: "Total Revenue (filtered)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-bold text-foreground mt-1", children: formatCurrency(totalRevenue) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base", children: [
          "Revenue by ",
          granularity === "monthly" ? "Month" : "Day"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: chartData, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CartesianGrid,
            {
              strokeDasharray: "3 3",
              stroke: "hsl(var(--border))"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              dataKey: "label",
              tick: { fontSize: 10 },
              interval: granularity === "daily" ? 4 : 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              tick: { fontSize: 11 },
              tickFormatter: (v) => `₹${v / 1e3}k`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              formatter: (v) => [formatCurrency(Number(v)), "Revenue"]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Bar,
            {
              dataKey: "revenue",
              fill: CHART_COLORS[0],
              radius: [4, 4, 0, 0],
              name: "Revenue"
            }
          )
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Payment Mode Split" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pie,
            {
              data: modeData,
              cx: "50%",
              cy: "50%",
              innerRadius: 50,
              outerRadius: 80,
              dataKey: "value",
              nameKey: "name",
              label: ({ name, percent }) => `${name} ${Math.round((percent ?? 0) * 100)}%`,
              children: modeData.map((_entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Cell,
                {
                  fill: CHART_COLORS[i % CHART_COLORS.length]
                },
                PAYMENT_MODES[i]
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              formatter: (v) => [formatCurrency(Number(v)), "Revenue"]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {})
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Revenue by Service" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 m-4" }) : svcRows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-center py-10 text-muted-foreground",
          "data-ocid": "reports.revenue.empty_state",
          children: "No billing data available"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 font-medium", children: "Service" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 font-medium", children: "Revenue" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: svcRows.map(([svc, rev], idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-t",
            "data-ocid": `reports.revenue.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2", children: svc }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right font-medium", children: formatCurrency(rev) })
            ]
          },
          `svc-${svc}`
        )) })
      ] }) }) })
    ] })
  ] });
}
const REPORT_TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "opdipd", label: "OPD/IPD Stats", icon: TrendingUp },
  { id: "revenue", label: "Revenue", icon: DollarSign },
  { id: "doctors", label: "Doctor Performance", icon: Users },
  { id: "demographics", label: "Demographics", icon: ChartNoAxesColumn },
  { id: "beds", label: "Bed Occupancy", icon: BedDouble },
  { id: "pharmacy", label: "Pharmacy Sales", icon: Pill }
];
function ReportsPage() {
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const { data: patients = [], isLoading: loadingPatients } = usePatients();
  const { data: bills = [], isLoading: loadingBills } = useBills();
  const { data: appointments = [], isLoading: loadingAppointments } = useAppointments();
  const { data: wards = [], isLoading: loadingWards } = useWards();
  const { data: beds = [], isLoading: loadingBeds } = useBeds();
  const { data: drugs = [], isLoading: loadingDrugs } = useDrugs();
  const { data: doctors = [], isLoading: loadingDoctors } = useDoctors();
  const sharedData = {
    patients,
    bills,
    appointments,
    wards,
    beds,
    drugs,
    doctors
  };
  const loading = {
    loadingPatients,
    loadingBills,
    loadingAppointments,
    loadingWards,
    loadingBeds,
    loadingDrugs,
    loadingDoctors
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b px-6 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground font-display", children: "Reports & Analytics" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Comprehensive hospital performance insights" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground bg-muted rounded-md px-3 py-1.5", children: [
          "Last updated: ",
          (/* @__PURE__ */ new Date()).toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex gap-1 mt-4 overflow-x-auto pb-1",
          role: "tablist",
          "aria-label": "Report sections",
          children: REPORT_TABS.map((tab) => {
            const Icon = tab.icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": activeTab === tab.id,
                "data-ocid": `reports.${tab.id}.tab`,
                onClick: () => setActiveTab(tab.id),
                className: `flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" }),
                  tab.label
                ]
              },
              tab.id
            );
          })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-6 overflow-auto", children: [
      activeTab === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewSection, { data: sharedData, loading }),
      activeTab === "opdipd" && /* @__PURE__ */ jsxRuntimeExports.jsx(OpdIpdSection, { data: sharedData, loading }),
      activeTab === "revenue" && /* @__PURE__ */ jsxRuntimeExports.jsx(RevenueSection, { data: sharedData, loading }),
      activeTab === "doctors" && /* @__PURE__ */ jsxRuntimeExports.jsx(DoctorPerformanceSection, { data: sharedData, loading }),
      activeTab === "demographics" && /* @__PURE__ */ jsxRuntimeExports.jsx(PatientDemographicsSection, { data: sharedData, loading }),
      activeTab === "beds" && /* @__PURE__ */ jsxRuntimeExports.jsx(BedOccupancySection, { data: sharedData, loading }),
      activeTab === "pharmacy" && /* @__PURE__ */ jsxRuntimeExports.jsx(PharmacySalesSection, { data: sharedData, loading })
    ] })
  ] });
}
function ExportButton({
  label,
  onExport
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      variant: "outline",
      size: "sm",
      type: "button",
      "data-ocid": "reports.export_button",
      onClick: onExport,
      className: "flex items-center gap-1.5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
        label
      ]
    }
  );
}
export {
  ExportButton,
  ReportsPage
};
