import type { AuditLog, HospitalProfile, User } from "@/backend";
import { UserRole, UserStatus } from "@/backend";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import {
  useAuditLogs,
  useCreateUser,
  useHospitalProfile,
  useInitSampleData,
  useUpdateHospitalProfile,
  useUpdateUserStatus,
  useUsers,
} from "@/services/admin";
import type { ColumnDef } from "@tanstack/react-table";
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Database,
  Globe,
  HardDrive,
  Lock,
  LogIn,
  Moon,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Shield,
  Sun,
  UserCog,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Types ───────────────────────────────────────────────────────────────────

type SortDir = "asc" | "desc" | null;
type Tab =
  | "profile"
  | "users"
  | "departments"
  | "audit"
  | "settings"
  | "permissions";

interface Department {
  id: string;
  name: string;
  headDoctor: string;
  wardCount: number;
  staffCount: number;
}

const SAMPLE_DEPARTMENTS: Department[] = [
  {
    id: "d1",
    name: "Cardiology",
    headDoctor: "Dr. Rohan Mehta",
    wardCount: 2,
    staffCount: 12,
  },
  {
    id: "d2",
    name: "Neurology",
    headDoctor: "Dr. Priya Sharma",
    wardCount: 1,
    staffCount: 8,
  },
  {
    id: "d3",
    name: "Orthopedics",
    headDoctor: "Dr. Arjun Patel",
    wardCount: 2,
    staffCount: 15,
  },
  {
    id: "d4",
    name: "Pediatrics",
    headDoctor: "Dr. Anita Nair",
    wardCount: 1,
    staffCount: 10,
  },
  {
    id: "d5",
    name: "Emergency Medicine",
    headDoctor: "Dr. Vikram Singh",
    wardCount: 1,
    staffCount: 20,
  },
];

const ALL_ROLES = Object.values(UserRole);
const ALL_STATUSES = Object.values(UserStatus);

const ROLE_LABELS: Record<string, string> = {
  SuperAdmin: "Super Admin",
  Doctor: "Doctor",
  Nurse: "Nurse",
  Receptionist: "Receptionist",
  Pharmacist: "Pharmacist",
  LabTechnician: "Lab Technician",
  Patient: "Patient",
};

const ROLE_COLORS: Record<string, string> = {
  SuperAdmin: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  Doctor: "bg-accent/15 text-accent border-accent/30",
  Nurse: "bg-green-500/15 text-green-400 border-green-500/30",
  Receptionist: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Pharmacist: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  LabTechnician: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Patient: "bg-muted/30 text-muted-foreground border-border",
};

type PermModule =
  | "Patients"
  | "Appointments"
  | "EMR"
  | "Lab"
  | "Pharmacy"
  | "Ward"
  | "Billing"
  | "Radiology"
  | "Emergency"
  | "Inventory"
  | "Reports"
  | "Admin";

const PERM_MODULES: PermModule[] = [
  "Patients",
  "Appointments",
  "EMR",
  "Lab",
  "Pharmacy",
  "Ward",
  "Billing",
  "Radiology",
  "Emergency",
  "Inventory",
  "Reports",
  "Admin",
];

const ROLE_PERMS: Record<string, PermModule[]> = {
  SuperAdmin: [
    "Patients",
    "Appointments",
    "EMR",
    "Lab",
    "Pharmacy",
    "Ward",
    "Billing",
    "Radiology",
    "Emergency",
    "Inventory",
    "Reports",
    "Admin",
  ],
  Doctor: ["Patients", "Appointments", "EMR", "Lab", "Radiology", "Reports"],
  Nurse: ["Patients", "EMR", "Ward", "Emergency"],
  Receptionist: ["Patients", "Appointments", "Billing"],
  Pharmacist: ["Pharmacy", "Inventory"],
  LabTechnician: ["Lab"],
  Patient: ["Appointments"],
};

const TIMEZONES = [
  "Asia/Kolkata",
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Dubai",
  "Asia/Singapore",
  "Australia/Sydney",
];

const CURRENCIES = [
  { code: "INR", symbol: "₹", label: "Indian Rupee (₹)" },
  { code: "USD", symbol: "$", label: "US Dollar ($)" },
  { code: "EUR", symbol: "€", label: "Euro (€)" },
  { code: "GBP", symbol: "£", label: "British Pound (£)" },
  { code: "AED", symbol: "د.إ", label: "UAE Dirham (د.إ)" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmtTimestamp(ts: bigint): string {
  const d = new Date(Number(ts) / 1_000_000);
  return d.toLocaleString();
}

function useSortFilter<T extends Record<string, unknown>>(
  data: T[],
  searchKeys: (keyof T)[],
) {
  const [q, setQ] = useState("");
  const [sortCol, setSortCol] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);

  const toggle = (col: keyof T) => {
    if (sortCol === col) {
      setSortDir((d) => (d === "asc" ? "desc" : d === "desc" ? null : "asc"));
      if (sortDir === "desc") setSortCol(null);
    } else {
      setSortCol(col);
      setSortDir("asc");
    }
  };

  const filtered = useMemo(() => {
    let arr = [...data];
    if (q.trim()) {
      const lq = q.toLowerCase();
      arr = arr.filter((row) =>
        searchKeys.some((k) =>
          String(row[k] ?? "")
            .toLowerCase()
            .includes(lq),
        ),
      );
    }
    if (sortCol && sortDir) {
      arr.sort((a, b) => {
        const av = String(a[sortCol] ?? "");
        const bv = String(b[sortCol] ?? "");
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      });
    }
    return arr;
  }, [data, q, sortCol, sortDir, searchKeys]);

  return { q, setQ, sortCol, sortDir, toggle, filtered };
}

function SortIcon({
  col,
  active,
  dir,
}: { col: string; active: string | null; dir: SortDir }) {
  if (active !== col)
    return <ChevronDown className="h-3 w-3 text-muted-foreground/40" />;
  if (dir === "asc") return <ChevronUp className="h-3 w-3 text-accent" />;
  return <ChevronDown className="h-3 w-3 text-accent" />;
}

// ─── ProfileTab ───────────────────────────────────────────────────────────────

function ProfileTab({
  profile,
  isLoading,
}: { profile: HospitalProfile | null | undefined; isLoading: boolean }) {
  const update = useUpdateHospitalProfile();
  const [form, setForm] = useState({
    name: profile?.name ?? "",
    address: profile?.address ?? "",
    phone: profile?.phone ?? "",
    email: profile?.email ?? "",
    registrationNo: profile?.registrationNo ?? "",
    timezone: profile?.timezone ?? "Asia/Kolkata",
    currency: profile?.currency ?? "INR",
  });

  // sync when profile loads
  const [synced, setSynced] = useState(false);
  if (profile && !synced) {
    setForm({
      name: profile.name,
      address: profile.address,
      phone: profile.phone,
      email: profile.email,
      registrationNo: profile.registrationNo,
      timezone: profile.timezone,
      currency: profile.currency,
    });
    setSynced(true);
  }

  function field(k: keyof typeof form) {
    return {
      value: form[k],
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => setForm((f) => ({ ...f, [k]: e.target.value })),
    };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    update.mutate(form, {
      onSuccess: () => toast.success("Hospital profile updated"),
      onError: () => toast.error("Failed to update profile"),
    });
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {["sk-1", "sk-2", "sk-3", "sk-4"].map((k) => (
          <Skeleton key={k} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} data-ocid="admin.profile.form">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="h-name">Hospital Name</Label>
          <Input
            id="h-name"
            placeholder="City General Hospital"
            {...field("name")}
            data-ocid="admin.profile.name_input"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="h-reg">Registration Number</Label>
          <Input
            id="h-reg"
            placeholder="HOS-2024-001"
            {...field("registrationNo")}
            data-ocid="admin.profile.reg_input"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="h-phone">Phone</Label>
          <Input
            id="h-phone"
            placeholder="+91 98765 43210"
            {...field("phone")}
            data-ocid="admin.profile.phone_input"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="h-email">Email</Label>
          <Input
            id="h-email"
            type="email"
            placeholder="admin@hospital.com"
            {...field("email")}
            data-ocid="admin.profile.email_input"
          />
        </div>
        <div className="sm:col-span-2 space-y-2">
          <Label htmlFor="h-address">Address</Label>
          <Textarea
            id="h-address"
            rows={2}
            placeholder="123 Hospital Road, City, State"
            value={form.address}
            onChange={(e) =>
              setForm((f) => ({ ...f, address: e.target.value }))
            }
            data-ocid="admin.profile.address_input"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="h-tz">Timezone</Label>
          <Select
            value={form.timezone}
            onValueChange={(v) => setForm((f) => ({ ...f, timezone: v }))}
          >
            <SelectTrigger id="h-tz" data-ocid="admin.profile.timezone_select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIMEZONES.map((tz) => (
                <SelectItem key={tz} value={tz}>
                  {tz}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="h-cur">Currency</Label>
          <Select
            value={form.currency}
            onValueChange={(v) => setForm((f) => ({ ...f, currency: v }))}
          >
            <SelectTrigger id="h-cur" data-ocid="admin.profile.currency_select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <Button
          type="submit"
          disabled={update.isPending}
          data-ocid="admin.profile.save_button"
        >
          {update.isPending ? "Saving..." : "Save Changes"}
        </Button>
        {update.isSuccess && (
          <span className="flex items-center gap-1 text-sm text-green-400">
            <CheckCircle2 className="h-4 w-4" /> Saved
          </span>
        )}
      </div>
    </form>
  );
}

// ─── Add User Modal ───────────────────────────────────────────────────────────

interface AddUserForm {
  name: string;
  email: string;
  role: string;
  department: string;
  password: string;
}

function AddUserModal({
  open,
  onClose,
}: { open: boolean; onClose: () => void }) {
  const createUser = useCreateUser();
  const [form, setForm] = useState<AddUserForm>({
    name: "",
    email: "",
    role: "Doctor",
    department: "",
    password: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // createUser requires a Principal — in demo we use a placeholder
    // Actual integration requires Internet Identity principal
    toast.info(
      "User creation requires Internet Identity principal. In demo mode, users are pre-seeded via Sample Data.",
    );
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add New User"
      description="Create a system user and assign a role"
      size="md"
      footer={
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-ocid="add-user.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="add-user-form"
            disabled={createUser.isPending}
            data-ocid="add-user.submit_button"
          >
            {createUser.isPending ? "Creating..." : "Create User"}
          </Button>
        </div>
      }
    >
      <form id="add-user-form" onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="u-name">Full Name</Label>
          <Input
            id="u-name"
            required
            placeholder="Dr. Rohan Mehta"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            data-ocid="add-user.name_input"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="u-email">Email</Label>
          <Input
            id="u-email"
            type="email"
            required
            placeholder="user@hospital.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            data-ocid="add-user.email_input"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="u-role">Role</Label>
            <Select
              value={form.role}
              onValueChange={(v) => setForm((f) => ({ ...f, role: v }))}
            >
              <SelectTrigger id="u-role" data-ocid="add-user.role_select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ALL_ROLES.map((r) => (
                  <SelectItem key={r} value={r}>
                    {ROLE_LABELS[r] ?? r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="u-dept">Department</Label>
            <Select
              value={form.department}
              onValueChange={(v) => setForm((f) => ({ ...f, department: v }))}
            >
              <SelectTrigger id="u-dept" data-ocid="add-user.dept_select">
                <SelectValue placeholder="Select dept" />
              </SelectTrigger>
              <SelectContent>
                {SAMPLE_DEPARTMENTS.map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="u-pass">Temporary Password</Label>
          <Input
            id="u-pass"
            type="password"
            required
            placeholder="Min 8 characters"
            value={form.password}
            onChange={(e) =>
              setForm((f) => ({ ...f, password: e.target.value }))
            }
            data-ocid="add-user.password_input"
          />
        </div>
        <div className="rounded-lg bg-muted/30 border border-border p-3 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Note:</span> User will
          receive login credentials via in-app notification. They must change
          their password on first login.
        </div>
      </form>
    </Modal>
  );
}

// ─── Users Tab ────────────────────────────────────────────────────────────────

function UsersTab() {
  const { data: users, isLoading } = useUsers();
  const updateStatus = useUpdateUserStatus();
  const [addOpen, setAddOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;

  const usersArr = useMemo(() => users ?? [], [users]);

  const { q, setQ, sortCol, sortDir, toggle, filtered } = useSortFilter(
    usersArr as unknown as Record<string, unknown>[],
    ["name", "email", "role", "departmentId"],
  );

  const displayed = useMemo(() => {
    let arr = filtered as unknown as User[];
    if (roleFilter !== "all")
      arr = arr.filter((u) => String(u.role) === roleFilter);
    if (statusFilter !== "all")
      arr = arr.filter((u) => String(u.status) === statusFilter);
    return arr;
  }, [filtered, roleFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(displayed.length / PAGE_SIZE));
  const paginated = displayed.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const colKeys = ["name", "email", "role", "departmentId", "status"] as const;

  function handleStatusToggle(user: User) {
    const newStatus =
      String(user.status) === "Active"
        ? UserStatus.Inactive
        : UserStatus.Active;
    updateStatus.mutate(
      { id: user.id, status: newStatus },
      {
        onSuccess: () =>
          toast.success(
            `User ${newStatus === UserStatus.Active ? "activated" : "deactivated"}`,
          ),
        onError: () => toast.error("Failed to update user status"),
      },
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {["s1", "s2", "s3", "s4", "s5"].map((k) => (
          <Skeleton key={k} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div data-ocid="admin.users.section">
      <AddUserModal open={addOpen} onClose={() => setAddOpen(false)} />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users…"
            className="pl-9"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            data-ocid="admin.users.search_input"
          />
        </div>
        <Select
          value={roleFilter}
          onValueChange={(v) => {
            setRoleFilter(v);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-40" data-ocid="admin.users.role_filter">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            {ALL_ROLES.map((r) => (
              <SelectItem key={r} value={r}>
                {ROLE_LABELS[r] ?? r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={statusFilter}
          onValueChange={(v) => {
            setStatusFilter(v);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-36" data-ocid="admin.users.status_filter">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {ALL_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          type="button"
          onClick={() => setAddOpen(true)}
          data-ocid="admin.users.add_button"
        >
          <Plus className="h-4 w-4 mr-1" /> Add User
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/30 border-b border-border">
              {colKeys.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide cursor-pointer select-none"
                  onClick={() => toggle(col as keyof Record<string, unknown>)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    toggle(col as keyof Record<string, unknown>)
                  }
                >
                  <span className="flex items-center gap-1">
                    {
                      {
                        name: "Name",
                        email: "Email",
                        role: "Role",
                        departmentId: "Department",
                        status: "Status",
                      }[col]
                    }
                    <SortIcon
                      col={col}
                      active={sortCol as string | null}
                      dir={sortDir}
                    />
                  </span>
                </th>
              ))}
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Last Login
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-muted-foreground"
                  data-ocid="admin.users.empty_state"
                >
                  <Users className="h-8 w-8 mx-auto mb-2 opacity-40" />
                  <p>No users found</p>
                </td>
              </tr>
            ) : (
              paginated.map((user, idx) => (
                <tr
                  key={String(user.id)}
                  className="border-b border-border/50 hover:bg-muted/10 transition-colors"
                  data-ocid={`admin.users.item.${idx + 1}`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-semibold text-xs shrink-0">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <span className="font-medium text-foreground">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {user.email}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${ROLE_COLORS[String(user.role)] ?? "bg-muted/30 text-muted-foreground border-border"}`}
                    >
                      {ROLE_LABELS[String(user.role)] ?? String(user.role)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {user.departmentId ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={String(user.status)} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">
                    {fmtTimestamp(user.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                        onClick={() => handleStatusToggle(user)}
                        data-ocid={`admin.users.toggle_status.${idx + 1}`}
                      >
                        {String(user.status) === "Active"
                          ? "Deactivate"
                          : "Activate"}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm">
        <p className="text-muted-foreground">
          Showing {Math.min((page - 1) * PAGE_SIZE + 1, displayed.length)}–
          {Math.min(page * PAGE_SIZE, displayed.length)} of {displayed.length}
        </p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            data-ocid="admin.users.pagination_prev"
          >
            Previous
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            data-ocid="admin.users.pagination_next"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Role Permissions Matrix ──────────────────────────────────────────────────

function PermissionsMatrix() {
  return (
    <div className="overflow-x-auto" data-ocid="admin.permissions.section">
      <p className="text-sm text-muted-foreground mb-4">
        Read-only overview of module access per role. Contact a Super Admin to
        modify permissions.
      </p>
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr>
            <th className="px-3 py-2 text-left text-muted-foreground font-semibold bg-muted/20 border border-border rounded-tl-lg">
              Role
            </th>
            {PERM_MODULES.map((m) => (
              <th
                key={m}
                className="px-2 py-2 text-center text-muted-foreground font-semibold bg-muted/20 border border-border min-w-[72px]"
              >
                {m}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(ROLE_PERMS).map(([role, perms], ri) => (
            <tr key={role} className={ri % 2 === 0 ? "bg-card" : "bg-muted/10"}>
              <td className="px-3 py-2 border border-border">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${ROLE_COLORS[role] ?? "bg-muted/30 text-muted-foreground border-border"}`}
                >
                  {ROLE_LABELS[role] ?? role}
                </span>
              </td>
              {PERM_MODULES.map((m) => (
                <td
                  key={m}
                  className="px-2 py-2 text-center border border-border"
                >
                  {perms.includes(m) ? (
                    <CheckCircle2 className="h-4 w-4 text-green-400 mx-auto" />
                  ) : (
                    <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Departments Tab ──────────────────────────────────────────────────────────

interface DeptModalProps {
  open: boolean;
  onClose: () => void;
  dept?: Department | null;
}

function DeptModal({ open, onClose, dept }: DeptModalProps) {
  const [form, setForm] = useState({
    name: dept?.name ?? "",
    headDoctor: dept?.headDoctor ?? "",
    wardCount: String(dept?.wardCount ?? ""),
    staffCount: String(dept?.staffCount ?? ""),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast.success(`Department ${dept ? "updated" : "created"} successfully`);
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={dept ? "Edit Department" : "Add Department"}
      description="Configure department details and assignment"
      footer={
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-ocid="dept-modal.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="dept-form"
            data-ocid="dept-modal.save_button"
          >
            {dept ? "Save Changes" : "Create"}
          </Button>
        </div>
      }
    >
      <form id="dept-form" onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>Department Name</Label>
          <Input
            required
            placeholder="e.g. Cardiology"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            data-ocid="dept-modal.name_input"
          />
        </div>
        <div className="space-y-2">
          <Label>Head Doctor</Label>
          <Input
            placeholder="Dr. Full Name"
            value={form.headDoctor}
            onChange={(e) =>
              setForm((f) => ({ ...f, headDoctor: e.target.value }))
            }
            data-ocid="dept-modal.head_input"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Ward Count</Label>
            <Input
              type="number"
              min="0"
              value={form.wardCount}
              onChange={(e) =>
                setForm((f) => ({ ...f, wardCount: e.target.value }))
              }
              data-ocid="dept-modal.ward_count_input"
            />
          </div>
          <div className="space-y-2">
            <Label>Staff Count</Label>
            <Input
              type="number"
              min="0"
              value={form.staffCount}
              onChange={(e) =>
                setForm((f) => ({ ...f, staffCount: e.target.value }))
              }
              data-ocid="dept-modal.staff_count_input"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}

function DepartmentsTab() {
  const [depts, setDepts] = useState<Department[]>(SAMPLE_DEPARTMENTS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Department | null>(null);
  const { q, setQ, sortCol, sortDir, toggle, filtered } = useSortFilter(
    depts as unknown as Record<string, unknown>[],
    ["name", "headDoctor"],
  );

  const deptColKeys = [
    "name",
    "headDoctor",
    "wardCount",
    "staffCount",
  ] as const;
  const deptColLabels = {
    name: "Department",
    headDoctor: "Head Doctor",
    wardCount: "Wards",
    staffCount: "Staff",
  };

  function handleDelete(id: string) {
    setDepts((d) => d.filter((x) => x.id !== id));
    toast.success("Department removed");
  }

  return (
    <div data-ocid="admin.departments.section">
      <DeptModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        dept={editing}
      />

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search departments…"
            className="pl-9"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            data-ocid="admin.departments.search_input"
          />
        </div>
        <Button
          type="button"
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          data-ocid="admin.departments.add_button"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Department
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/30 border-b border-border">
              {deptColKeys.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide cursor-pointer select-none"
                  onClick={() => toggle(col as keyof Record<string, unknown>)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    toggle(col as keyof Record<string, unknown>)
                  }
                >
                  <span className="flex items-center gap-1">
                    {deptColLabels[col]}
                    <SortIcon
                      col={col}
                      active={sortCol as string | null}
                      dir={sortDir}
                    />
                  </span>
                </th>
              ))}
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {(filtered as unknown as Department[]).length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-12 text-center text-muted-foreground"
                  data-ocid="admin.departments.empty_state"
                >
                  No departments found
                </td>
              </tr>
            ) : (
              (filtered as unknown as Department[]).map((dept, idx) => (
                <tr
                  key={dept.id}
                  className="border-b border-border/50 hover:bg-muted/10 transition-colors"
                  data-ocid={`admin.departments.item.${idx + 1}`}
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {dept.name}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {dept.headDoctor}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary">{dept.wardCount}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary">{dept.staffCount}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditing(dept);
                          setModalOpen(true);
                        }}
                        data-ocid={`admin.departments.edit_button.${idx + 1}`}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(dept.id)}
                        data-ocid={`admin.departments.delete_button.${idx + 1}`}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Audit Logs Tab ───────────────────────────────────────────────────────────

function AuditLogsTab() {
  const { data: logs, isLoading } = useAuditLogs();
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const logsArr = useMemo(() => logs ?? [], [logs]);

  const { q, setQ, sortCol, sortDir, toggle, filtered } = useSortFilter(
    logsArr as unknown as Record<string, unknown>[],
    ["action", "entityType", "details"],
  );

  const uniqueActions = useMemo(
    () => ["all", ...Array.from(new Set(logsArr.map((l) => l.action)))],
    [logsArr],
  );

  const displayed = useMemo(() => {
    let arr = filtered as unknown as AuditLog[];
    if (actionFilter !== "all")
      arr = arr.filter((l) => l.action === actionFilter);
    if (dateFrom)
      arr = arr.filter(
        (l) => Number(l.timestamp) / 1e6 >= new Date(dateFrom).getTime(),
      );
    if (dateTo)
      arr = arr.filter(
        (l) =>
          Number(l.timestamp) / 1e6 <= new Date(dateTo).getTime() + 86400000,
      );
    return arr;
  }, [filtered, actionFilter, dateFrom, dateTo]);

  const totalPages = Math.max(1, Math.ceil(displayed.length / PAGE_SIZE));
  const paginated = displayed.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const auditCols = ["action", "entityType", "entityId"] as const;
  const auditColLabels = {
    action: "Action",
    entityType: "Entity",
    entityId: "Entity ID",
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {["a1", "a2", "a3", "a4", "a5"].map((k) => (
          <Skeleton key={k} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div data-ocid="admin.audit.section">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs…"
            className="pl-9"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            data-ocid="admin.audit.search_input"
          />
        </div>
        <Input
          type="date"
          value={dateFrom}
          onChange={(e) => {
            setDateFrom(e.target.value);
            setPage(1);
          }}
          className="w-36"
          data-ocid="admin.audit.date_from_input"
        />
        <Input
          type="date"
          value={dateTo}
          onChange={(e) => {
            setDateTo(e.target.value);
            setPage(1);
          }}
          className="w-36"
          data-ocid="admin.audit.date_to_input"
        />
        <Select
          value={actionFilter}
          onValueChange={(v) => {
            setActionFilter(v);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-44" data-ocid="admin.audit.action_filter">
            <SelectValue placeholder="All Actions" />
          </SelectTrigger>
          <SelectContent>
            {uniqueActions.map((a) => (
              <SelectItem key={a} value={a}>
                {a === "all" ? "All Actions" : a}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/30 border-b border-border">
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide cursor-pointer select-none"
                onClick={() =>
                  toggle("timestamp" as keyof Record<string, unknown>)
                }
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  toggle("timestamp" as keyof Record<string, unknown>)
                }
              >
                <span className="flex items-center gap-1">
                  Timestamp{" "}
                  <SortIcon
                    col="timestamp"
                    active={sortCol as string | null}
                    dir={sortDir}
                  />
                </span>
              </th>
              {auditCols.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide cursor-pointer select-none"
                  onClick={() => toggle(col as keyof Record<string, unknown>)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    toggle(col as keyof Record<string, unknown>)
                  }
                >
                  <span className="flex items-center gap-1">
                    {auditColLabels[col]}{" "}
                    <SortIcon
                      col={col}
                      active={sortCol as string | null}
                      dir={sortDir}
                    />
                  </span>
                </th>
              ))}
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-12 text-center text-muted-foreground"
                  data-ocid="admin.audit.empty_state"
                >
                  <Shield className="h-8 w-8 mx-auto mb-2 opacity-40" />
                  <p>No audit log entries</p>
                </td>
              </tr>
            ) : (
              paginated.map((log, idx) => (
                <tr
                  key={String(log.id)}
                  className="border-b border-border/50 hover:bg-muted/10 transition-colors"
                  data-ocid={`admin.audit.item.${idx + 1}`}
                >
                  <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                    {fmtTimestamp(log.timestamp)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs bg-muted/30 px-1.5 py-0.5 rounded">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {log.entityType}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {log.entityId}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground max-w-xs truncate">
                    {log.details}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 text-sm">
        <p className="text-muted-foreground">
          Showing {Math.min((page - 1) * PAGE_SIZE + 1, displayed.length)}–
          {Math.min(page * PAGE_SIZE, displayed.length)} of {displayed.length}
        </p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            data-ocid="admin.audit.pagination_prev"
          >
            Previous
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            data-ocid="admin.audit.pagination_next"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── System Settings Tab ──────────────────────────────────────────────────────

function SystemSettingsTab() {
  const [darkMode, setDarkMode] = useState(false);
  const [maintenance, setMaintenance] = useState(false);
  const [currency, setCurrency] = useState("INR");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [backupRunning, setBackupRunning] = useState(false);

  function handleBackup() {
    setBackupRunning(true);
    setTimeout(() => {
      setBackupRunning(false);
      toast.success("System backup completed successfully");
    }, 2500);
  }

  return (
    <div className="space-y-5" data-ocid="admin.settings.section">
      {/* Currency */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-9 w-9 rounded-lg bg-accent/15 flex items-center justify-center">
            <Globe className="h-4 w-4 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-foreground">
              Currency & Locale
            </h3>
            <p className="text-xs text-muted-foreground">
              Set the default currency for billing
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger data-ocid="admin.settings.currency_select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Timezone</Label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger data-ocid="admin.settings.timezone_select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIMEZONES.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          type="button"
          className="mt-4"
          size="sm"
          onClick={() => toast.success("Locale settings saved")}
          data-ocid="admin.settings.locale_save_button"
        >
          Save Locale Settings
        </Button>
      </div>

      {/* Appearance */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-9 w-9 rounded-lg bg-accent/15 flex items-center justify-center">
            {darkMode ? (
              <Moon className="h-4 w-4 text-accent" />
            ) : (
              <Sun className="h-4 w-4 text-accent" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-sm text-foreground">
              Appearance
            </h3>
            <p className="text-xs text-muted-foreground">
              Toggle light/dark mode system-wide
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">
              {darkMode ? "Dark Mode" : "Light Mode"}
            </p>
            <p className="text-xs text-muted-foreground">
              Current display theme
            </p>
          </div>
          <Switch
            checked={darkMode}
            onCheckedChange={setDarkMode}
            data-ocid="admin.settings.dark_mode_toggle"
          />
        </div>
      </div>

      {/* Maintenance */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-9 w-9 rounded-lg bg-yellow-500/15 flex items-center justify-center">
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-foreground">
              Maintenance Mode
            </h3>
            <p className="text-xs text-muted-foreground">
              Temporarily restrict access while performing system maintenance
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">
              {maintenance ? "Maintenance Active" : "System Online"}
            </p>
            <p className="text-xs text-muted-foreground">
              {maintenance
                ? "Non-admin users cannot log in"
                : "All users have normal access"}
            </p>
          </div>
          <Switch
            checked={maintenance}
            onCheckedChange={(v) => {
              setMaintenance(v);
              toast[v ? "warning" : "success"](
                v ? "Maintenance mode enabled" : "System restored to normal",
              );
            }}
            data-ocid="admin.settings.maintenance_toggle"
          />
        </div>
        {maintenance && (
          <div className="mt-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 p-3 text-xs text-yellow-400">
            ⚠️ Maintenance mode is active. Non-admin users will see a maintenance
            page.
          </div>
        )}
      </div>

      {/* Backup */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-9 w-9 rounded-lg bg-accent/15 flex items-center justify-center">
            <HardDrive className="h-4 w-4 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-foreground">
              System Backup
            </h3>
            <p className="text-xs text-muted-foreground">
              Export a full snapshot of hospital data
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={backupRunning}
            onClick={handleBackup}
            data-ocid="admin.settings.backup_button"
          >
            <HardDrive
              className={`h-4 w-4 mr-2 ${backupRunning ? "animate-pulse" : ""}`}
            />
            {backupRunning ? "Running Backup…" : "Run Backup Now"}
          </Button>
          <p className="text-xs text-muted-foreground">
            Last backup: Today at 03:00 AM
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Init Sample Data Dialog ──────────────────────────────────────────────────

function SampleDataDialog({
  open,
  onClose,
  onConfirm,
  isPending,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Load Sample Data"
      description="This will pre-populate the system with demo data"
      size="sm"
      footer={
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-ocid="sample-data.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            data-ocid="sample-data.confirm_button"
          >
            {isPending ? "Loading…" : "Yes, Load Data"}
          </Button>
        </div>
      }
    >
      <div className="space-y-3">
        <div className="rounded-lg bg-accent/10 border border-accent/30 p-4 text-sm">
          <p className="font-medium text-foreground mb-2">
            This will initialize:
          </p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• 10 sample patients with full profiles</li>
            <li>• 5 doctors across specializations</li>
            <li>• 3 wards with bed assignments</li>
            <li>• 20 drugs in pharmacy inventory</li>
            <li>• 10 lab tests and results</li>
            <li>• 5 service types for billing</li>
            <li>• Sample appointments and bills</li>
          </ul>
        </div>
        <p className="text-xs text-muted-foreground">
          ⚠️ Existing data may be overwritten. This action cannot be undone.
        </p>
      </div>
    </Modal>
  );
}

// ─── Main AdminPage ───────────────────────────────────────────────────────────

export function AdminPage() {
  const { user } = useAuth();
  const { data: profile, isLoading: profileLoading } = useHospitalProfile();
  const initSample = useInitSampleData();
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [sampleDialogOpen, setSampleDialogOpen] = useState(false);

  // Access control
  if (!user || String(user.role) !== "SuperAdmin") {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh]"
        data-ocid="admin.access_denied"
      >
        <div className="rounded-xl bg-card border border-border p-10 text-center max-w-md">
          <div className="h-16 w-16 rounded-full bg-destructive/15 flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Access Denied
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            The Administration panel is restricted to{" "}
            <strong>Super Admin</strong> users only. Your current role (
            <strong>{user ? String(user.role) : "Guest"}</strong>) does not have
            permission to access this area.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
            <Shield className="h-3.5 w-3.5" />
            Contact your system administrator to request elevated access.
          </div>
        </div>
      </div>
    );
  }

  function handleSampleDataConfirm() {
    initSample.mutate(undefined, {
      onSuccess: (msg) => {
        toast.success(msg || "Sample data loaded successfully");
        setSampleDialogOpen(false);
      },
      onError: () => {
        toast.error("Failed to initialize sample data");
        setSampleDialogOpen(false);
      },
    });
  }

  return (
    <div data-ocid="admin.page">
      <SampleDataDialog
        open={sampleDialogOpen}
        onClose={() => setSampleDialogOpen(false)}
        onConfirm={handleSampleDataConfirm}
        isPending={initSample.isPending}
      />

      <PageHeader
        title="System Administration"
        description="Hospital profile, user management, departments, audit logs, and system settings"
        breadcrumb={["Administration"]}
        actions={
          <Button
            type="button"
            variant="outline"
            onClick={() => setSampleDialogOpen(true)}
            disabled={initSample.isPending}
            data-ocid="admin.init_sample.button"
          >
            <Database
              className={`h-4 w-4 mr-2 ${initSample.isPending ? "animate-pulse" : ""}`}
            />
            Load Sample Data
          </Button>
        }
      />

      {/* Hospital profile quick-view banner */}
      {profile && (
        <div className="bg-gradient-to-r from-accent/10 to-primary/5 border border-accent/20 rounded-xl p-4 mb-6 flex flex-wrap items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
            <Building2 className="h-6 w-6 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground">{profile.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {profile.address}
            </p>
          </div>
          <div className="hidden md:flex gap-6 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Reg. No</p>
              <p className="font-medium text-foreground">
                {profile.registrationNo}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Timezone</p>
              <p className="font-medium text-foreground">{profile.timezone}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Currency</p>
              <p className="font-medium text-foreground">{profile.currency}</p>
            </div>
          </div>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as Tab)}>
        <TabsList className="mb-6 flex-wrap h-auto gap-1">
          <TabsTrigger value="profile" data-ocid="admin.profile.tab">
            <Building2 className="h-3.5 w-3.5 mr-1.5" /> Hospital Profile
          </TabsTrigger>
          <TabsTrigger value="users" data-ocid="admin.users.tab">
            <Users className="h-3.5 w-3.5 mr-1.5" /> Users
          </TabsTrigger>
          <TabsTrigger value="permissions" data-ocid="admin.permissions.tab">
            <Shield className="h-3.5 w-3.5 mr-1.5" /> Permissions
          </TabsTrigger>
          <TabsTrigger value="departments" data-ocid="admin.departments.tab">
            <UserCog className="h-3.5 w-3.5 mr-1.5" /> Departments
          </TabsTrigger>
          <TabsTrigger value="audit" data-ocid="admin.audit.tab">
            <LogIn className="h-3.5 w-3.5 mr-1.5" /> Audit Logs
          </TabsTrigger>
          <TabsTrigger value="settings" data-ocid="admin.settings.tab">
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> System Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="bg-card border border-border rounded-xl p-6">
            <ProfileTab profile={profile} isLoading={profileLoading} />
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="bg-card border border-border rounded-xl p-6">
            <UsersTab />
          </div>
        </TabsContent>

        <TabsContent value="permissions">
          <div className="bg-card border border-border rounded-xl p-6">
            <PermissionsMatrix />
          </div>
        </TabsContent>

        <TabsContent value="departments">
          <div className="bg-card border border-border rounded-xl p-6">
            <DepartmentsTab />
          </div>
        </TabsContent>

        <TabsContent value="audit">
          <div className="bg-card border border-border rounded-xl p-6">
            <AuditLogsTab />
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <SystemSettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
