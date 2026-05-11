import { AppointmentStatus, BedStatus, PatientStatus } from "@/backend";
import { CardSkeleton } from "@/components/ui/LoadingSkeleton";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/hooks/useNotifications";
import { useAppointments } from "@/services/appointments";
import { useBills } from "@/services/billing";
import { useActiveERTriages } from "@/services/emergency";
import { useLabOrders } from "@/services/lab";
import { usePatients } from "@/services/patients";
import { useBeds } from "@/services/ward";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  BedDouble,
  Bell,
  CalendarDays,
  ChevronRight,
  Clock,
  FlaskConical,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const REVENUE_DATA = [
  { month: "Jan", revenue: 48000, expenses: 32000 },
  { month: "Feb", revenue: 52000, expenses: 35000 },
  { month: "Mar", revenue: 61000, expenses: 38000 },
  { month: "Apr", revenue: 55000, expenses: 36000 },
  { month: "May", revenue: 67000, expenses: 41000 },
  { month: "Jun", revenue: 74000, expenses: 44000 },
];

function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  color,
  onClick,
  isLoading,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  color: string;
  onClick?: () => void;
  isLoading?: boolean;
}) {
  if (isLoading) return <CardSkeleton />;
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-card border border-border rounded-xl p-5 text-left hover:border-accent/30 transition-smooth group w-full"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-lg ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
        {onClick && (
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
        )}
      </div>
      <p className="text-2xl font-bold text-foreground font-display">{value}</p>
      <p className="text-sm text-muted-foreground mt-0.5">{title}</p>
      {trend && <p className="text-xs text-accent mt-2">{trend}</p>}
    </button>
  );
}

export function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const go = (path: string) => () => navigate({ to: path as "/" });

  const { data: patients, isLoading: pLoading } = usePatients();
  const { data: appointments, isLoading: aLoading } = useAppointments();
  const { data: bills, isLoading: bLoading } = useBills();
  const { data: erTriages } = useActiveERTriages();
  const { data: beds } = useBeds();
  const { data: labOrders } = useLabOrders();
  const { data: notifications } = useNotifications();

  const totalPatients = patients?.length ?? 0;
  const admittedPatients =
    patients?.filter((p) => p.status === PatientStatus.Admitted).length ?? 0;
  const todayAppointments =
    appointments?.filter((a) => {
      const today = new Date().toISOString().split("T")[0];
      return a.date === today;
    }).length ?? 0;
  const pendingAppointments =
    appointments?.filter((a) => a.status === AppointmentStatus.Scheduled)
      .length ?? 0;
  const availableBeds =
    beds?.filter((b) => b.status === BedStatus.Available).length ?? 0;
  const totalBeds = beds?.length ?? 0;
  const activeER = erTriages?.length ?? 0;
  const pendingLabOrders =
    labOrders?.filter(
      (l) => l.status === "Ordered" || l.status === "Processing",
    ).length ?? 0;
  const unreadNotifications =
    notifications?.filter((n) => !n.isRead).length ?? 0;

  const totalRevenue =
    bills?.reduce((sum, b) => sum + Number(b.paidAmount), 0) ?? 0;
  const pendingRevenue =
    bills
      ?.filter((b) => b.status === "Pending")
      .reduce((sum, b) => sum + Number(b.totalAmount), 0) ?? 0;

  const bedOccupancyData = [
    {
      name: "Occupied",
      value: totalBeds - availableBeds,
      color: "hsl(var(--destructive))",
    },
    { name: "Available", value: availableBeds, color: "hsl(var(--accent))" },
  ];

  return (
    <div className="space-y-6" data-ocid="dashboard.page">
      <PageHeader
        title={`Good ${new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 17 ? "Afternoon" : "Evening"}, ${user?.name?.split(" ")[0]}`}
        description={`${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} — St. Jude General Hospital`}
      />

      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        data-ocid="dashboard.stats.section"
      >
        <StatCard
          title="Total Patients"
          value={totalPatients}
          icon={Users}
          trend={`${admittedPatients} admitted`}
          color="bg-blue-500/15 text-blue-400"
          onClick={go("/patients")}
          isLoading={pLoading}
        />
        <StatCard
          title="Today's Appointments"
          value={todayAppointments}
          icon={CalendarDays}
          trend={`${pendingAppointments} pending`}
          color="bg-accent/15 text-accent"
          onClick={go("/appointments")}
          isLoading={aLoading}
        />
        <StatCard
          title="Bed Availability"
          value={`${availableBeds}/${totalBeds}`}
          icon={BedDouble}
          trend={`${totalBeds > 0 ? Math.round((availableBeds / totalBeds) * 100) : 0}% available`}
          color="bg-green-500/15 text-green-400"
          onClick={go("/ward")}
        />
        <StatCard
          title="ER Active Cases"
          value={activeER}
          icon={AlertTriangle}
          trend="Real-time updates"
          color="bg-red-500/15 text-red-400"
          onClick={go("/emergency")}
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Revenue Collected"
          value={`$${(totalRevenue / 100).toLocaleString()}`}
          icon={TrendingUp}
          trend={`$${(pendingRevenue / 100).toLocaleString()} pending`}
          color="bg-emerald-500/15 text-emerald-400"
          onClick={go("/billing")}
          isLoading={bLoading}
        />
        <StatCard
          title="Pending Lab Orders"
          value={pendingLabOrders}
          icon={FlaskConical}
          trend="Awaiting results"
          color="bg-purple-500/15 text-purple-400"
          onClick={go("/lab")}
        />
        <StatCard
          title="Notifications"
          value={unreadNotifications}
          icon={Bell}
          trend="Unread alerts"
          color="bg-orange-500/15 text-orange-400"
          onClick={go("/notifications")}
        />
        <StatCard
          title="OPD Queue"
          value={pendingAppointments}
          icon={Clock}
          trend="In queue today"
          color="bg-yellow-500/15 text-yellow-400"
          onClick={go("/appointments")}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-4">
            Revenue Overview
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={REVENUE_DATA}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="oklch(0.72 0.18 200)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="oklch(0.72 0.18 200)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.25 0.02 270)"
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "oklch(0.6 0.01 270)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "oklch(0.6 0.01 270)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  background: "oklch(0.16 0.01 270)",
                  border: "1px solid oklch(0.25 0.02 270)",
                  borderRadius: "8px",
                  color: "oklch(0.95 0.01 270)",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="oklch(0.72 0.18 200)"
                fill="url(#revenueGrad)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-4">Bed Occupancy</h3>
          {totalBeds > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={bedOccupancyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    dataKey="value"
                  >
                    {bedOccupancyData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {bedOccupancyData.map((d) => (
                  <div
                    key={d.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: d.color }}
                      />
                      <span className="text-muted-foreground">{d.name}</span>
                    </div>
                    <span className="font-semibold text-foreground">
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-muted-foreground text-sm">No bed data</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">
              Recent Appointments
            </h3>
            <button
              type="button"
              onClick={go("/appointments")}
              className="text-xs text-accent hover:underline"
            >
              View all
            </button>
          </div>
          {aLoading ? (
            <div className="space-y-3">
              {["a0", "a1", "a2", "a3"].map((k) => (
                <div
                  key={k}
                  className="h-12 bg-muted/20 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : appointments?.slice(0, 5).length === 0 ? (
            <p className="text-muted-foreground text-sm">No appointments yet</p>
          ) : (
            <div className="space-y-2">
              {appointments?.slice(0, 5).map((appt, i) => (
                <div
                  key={String(appt.id)}
                  className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                  data-ocid={`dashboard.appointment.item.${i + 1}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center text-accent text-xs font-bold">
                      {appt.tokenNumber
                        ? String(appt.tokenNumber).padStart(2, "0")
                        : "--"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {appt.date}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {appt.timeSlot} · {appt.appointmentType}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={appt.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Active ER Cases</h3>
            <button
              type="button"
              onClick={go("/emergency")}
              className="text-xs text-accent hover:underline"
            >
              View all
            </button>
          </div>
          {erTriages?.length === 0 ? (
            <p className="text-muted-foreground text-sm">No active ER cases</p>
          ) : (
            <div className="space-y-2">
              {erTriages?.slice(0, 5).map((triage, i) => (
                <div
                  key={String(triage.id)}
                  className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                  data-ocid={`dashboard.er.item.${i + 1}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        Number(triage.esiLevel) <= 2
                          ? "bg-red-500/20 text-red-400"
                          : Number(triage.esiLevel) === 3
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      P{String(triage.esiLevel)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground truncate max-w-[160px]">
                        {triage.chiefComplaint}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {triage.isTraumaCase ? "Trauma" : "Medical"}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={triage.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="text-center py-4 text-xs text-muted-foreground border-t border-border">
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
