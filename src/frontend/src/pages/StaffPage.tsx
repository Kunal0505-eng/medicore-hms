import { type LeaveStatus, type ShiftType, UserRole } from "@/backend";
import type {
  DoctorProfile,
  DutyRoster,
  LeaveRequest,
  User,
  UserId,
  WorkingHours,
} from "@/backend";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { useUsers } from "@/services/admin";
import {
  useCreateDoctorProfile,
  useCreateDutyRoster,
  useCreateLeaveRequest,
  useDoctors,
  useDutyRoster,
  useLeaveRequests,
  useUpdateLeaveStatus,
} from "@/services/staff";
import type { ColumnDef } from "@tanstack/react-table";
import {
  AlertCircle,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  DollarSign,
  GraduationCap,
  LayoutGrid,
  List,
  MapPin,
  Moon,
  Stethoscope,
  Sun,
  Sunset,
  User2,
  UserCog,
  UserPlus,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// -- Types --
interface TimeSlot {
  startTime: string;
  endTime: string;
  dayOfWeek: number;
  maxPatients: number;
}

interface NewDoctorForm {
  userId: string;
  specialization: string;
  qualifications: string[];
  qualInput: string;
  departmentId: string;
  consultationFee: string;
  slots: TimeSlot[];
}

interface NewRosterForm {
  userId: string;
  date: string;
  shift: "Morning" | "Afternoon" | "Night";
  wardId: string;
}

interface NewLeaveForm {
  userId: string;
  startDate: string;
  endDate: string;
  reason: string;
}

// -- Constants --
const SHIFT_STYLES = {
  Morning: {
    bg: "bg-blue-500/20 border-blue-500/30 text-blue-400",
    icon: Sun,
    label: "Morning",
  },
  Afternoon: {
    bg: "bg-orange-500/20 border-orange-500/30 text-orange-400",
    icon: Sunset,
    label: "Afternoon",
  },
  Night: {
    bg: "bg-purple-500/20 border-purple-500/30 text-purple-400",
    icon: Moon,
    label: "Night",
  },
} as const;

const SPECIALIZATIONS = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Obstetrics & Gynecology",
  "General Surgery",
  "Internal Medicine",
  "Dermatology",
  "Ophthalmology",
  "ENT",
  "Psychiatry",
  "Oncology",
  "Nephrology",
  "Gastroenterology",
  "Pulmonology",
];

const DEPARTMENTS = [
  "General Medicine",
  "Surgery",
  "Pediatrics",
  "Maternity",
  "Emergency",
  "ICU",
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Dermatology",
];

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// -- Doctor Avatar --
function DoctorAvatar({
  name,
  size = "lg",
}: { name: string; size?: "sm" | "lg" }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  const colors = [
    "from-blue-500 to-cyan-500",
    "from-teal-500 to-emerald-500",
    "from-violet-500 to-purple-500",
    "from-rose-500 to-pink-500",
    "from-amber-500 to-orange-500",
  ];
  const colorIdx = name.charCodeAt(0) % colors.length;
  const sizeClass = size === "lg" ? "h-16 w-16 text-xl" : "h-9 w-9 text-sm";
  return (
    <div
      className={`${sizeClass} rounded-full bg-gradient-to-br ${colors[colorIdx]} flex items-center justify-center text-white font-bold shrink-0`}
    >
      {initials || <User2 className="h-5 w-5" />}
    </div>
  );
}

function ShiftBadge({ shift }: { shift: string }) {
  const key = shift as keyof typeof SHIFT_STYLES;
  const cfg = SHIFT_STYLES[key];
  if (!cfg) return <StatusBadge status={shift} />;
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${cfg.bg}`}
    >
      <Icon className="h-3 w-3" />
      {cfg.label}
    </span>
  );
}

// -- Doctor Card --
function DoctorCard({
  doctor,
  users,
  onClick,
}: {
  doctor: DoctorProfile;
  users: User[];
  onClick: (d: DoctorProfile) => void;
}) {
  const user = users.find((u) => u.id === doctor.userId);
  const name = user?.name ?? `Doctor #${String(doctor.id)}`;
  return (
    <button
      type="button"
      onClick={() => onClick(doctor)}
      className="group bg-card border border-border rounded-xl p-5 hover:border-accent/50 hover:shadow-lg transition-all duration-200 text-left w-full"
      data-ocid={`staff.doctor.card.${String(doctor.id)}`}
    >
      <div className="flex items-start gap-4">
        <DoctorAvatar name={name} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground truncate">{name}</h3>
            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 group-hover:text-accent transition-colors" />
          </div>
          <span className="inline-flex items-center px-2 py-0.5 mt-1 rounded-full text-xs font-medium bg-accent/15 text-accent border border-accent/30">
            <Stethoscope className="h-3 w-3 mr-1" />
            {doctor.specialization}
          </span>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {doctor.departmentId && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Briefcase className="h-3 w-3" />
            <span>{doctor.departmentId}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <DollarSign className="h-3 w-3" />
          <span>
            Consultation: ${(Number(doctor.consultationFee) / 100).toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{doctor.schedule.length} schedule slots</span>
        </div>
        {doctor.qualifications.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <GraduationCap className="h-3 w-3" />
            <span className="truncate">
              {doctor.qualifications.slice(0, 2).join(", ")}
            </span>
          </div>
        )}
      </div>
    </button>
  );
}

// -- Doctor Profile Panel --
function DoctorProfilePanel({
  doctor,
  users,
  onClose,
}: { doctor: DoctorProfile; users: User[]; onClose: () => void }) {
  const user = users.find((u) => u.id === doctor.userId);
  const name = user?.name ?? `Doctor #${String(doctor.id)}`;
  return (
    <Modal
      open
      onClose={onClose}
      title="Doctor Profile"
      description="Full professional profile and schedule"
      size="lg"
    >
      <div className="space-y-6" data-ocid="staff.doctor.profile.panel">
        <div className="flex items-start gap-5 p-4 bg-muted/20 rounded-xl">
          <DoctorAvatar name={name} size="lg" />
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-foreground">{name}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/15 text-accent border border-accent/30">
                <Stethoscope className="h-3 w-3 mr-1" />
                {doctor.specialization}
              </span>
              {user && <StatusBadge status={String(user.status)} />}
            </div>
            {user?.email && (
              <p className="text-xs text-muted-foreground mt-2">{user.email}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/10 rounded-lg p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Briefcase className="h-3.5 w-3.5" /> Department
            </div>
            <p className="font-medium text-foreground text-sm">
              {doctor.departmentId ?? "—"}
            </p>
          </div>
          <div className="bg-muted/10 rounded-lg p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <DollarSign className="h-3.5 w-3.5" /> Consultation Fee
            </div>
            <p className="font-medium text-foreground text-sm">
              ${(Number(doctor.consultationFee) / 100).toFixed(2)}
            </p>
          </div>
        </div>
        {doctor.wardIds.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" /> Ward Assignments
            </h4>
            <div className="flex flex-wrap gap-2">
              {doctor.wardIds.map((wId) => (
                <span
                  key={wId}
                  className="px-2.5 py-1 rounded-lg text-xs bg-muted/30 border border-border text-muted-foreground"
                >
                  Ward {wId}
                </span>
              ))}
            </div>
          </div>
        )}
        {doctor.qualifications.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-accent" /> Qualifications
            </h4>
            <ul className="space-y-1">
              {doctor.qualifications.map((q) => (
                <li
                  key={q}
                  className="flex items-center gap-2 text-sm text-foreground"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  {q}
                </li>
              ))}
            </ul>
          </div>
        )}
        {doctor.schedule.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-accent" /> Working Schedule
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {doctor.schedule.map((slot, _i) => (
                <div
                  key={`slot-${String(slot.dayOfWeek)}-${slot.startTime}`}
                  className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-border"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-accent w-8">
                      {DAYS_OF_WEEK[Number(slot.dayOfWeek)] ??
                        `Day ${String(slot.dayOfWeek)}`}
                    </span>
                    <span className="text-sm text-foreground">
                      {slot.startTime} – {slot.endTime}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Max {String(slot.maxPatients)} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

// -- Add Doctor Modal --
function AddDoctorModal({
  open,
  onClose,
  users,
}: { open: boolean; onClose: () => void; users: User[] }) {
  const createDoctor = useCreateDoctorProfile();
  const [form, setForm] = useState<NewDoctorForm>({
    userId: "",
    specialization: "",
    qualifications: [],
    qualInput: "",
    departmentId: "",
    consultationFee: "",
    slots: [],
  });

  const addQualification = () => {
    if (form.qualInput.trim()) {
      setForm((f) => ({
        ...f,
        qualifications: [...f.qualifications, f.qualInput.trim()],
        qualInput: "",
      }));
    }
  };

  const addSlot = () => {
    setForm((f) => ({
      ...f,
      slots: [
        ...f.slots,
        { startTime: "09:00", endTime: "17:00", dayOfWeek: 1, maxPatients: 20 },
      ],
    }));
  };

  const updateSlot = (
    idx: number,
    key: keyof TimeSlot,
    value: string | number,
  ) => {
    setForm((f) => ({
      ...f,
      slots: f.slots.map((s, i) => (i === idx ? { ...s, [key]: value } : s)),
    }));
  };

  const handleSubmit = async () => {
    if (!form.userId || !form.specialization || !form.consultationFee) {
      toast.error("Please fill all required fields");
      return;
    }
    const schedule: WorkingHours[] = form.slots.map((s) => ({
      startTime: s.startTime,
      endTime: s.endTime,
      dayOfWeek: BigInt(s.dayOfWeek),
      maxPatients: BigInt(s.maxPatients),
    }));
    try {
      await createDoctor.mutateAsync({
        userId: BigInt(form.userId) as UserId,
        specialization: form.specialization,
        qualifications: form.qualifications,
        departmentId: form.departmentId || null,
        consultationFee: BigInt(
          Math.round(Number.parseFloat(form.consultationFee) * 100),
        ),
        schedule,
      });
      toast.success("Doctor profile created successfully");
      onClose();
    } catch {
      toast.error("Failed to create doctor profile");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Doctor Profile"
      description="Create a new doctor profile with schedule and qualifications"
      size="xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-ocid="staff.add_doctor.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={createDoctor.isPending}
            data-ocid="staff.add_doctor.submit_button"
          >
            {createDoctor.isPending ? "Creating..." : "Create Profile"}
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="space-y-1.5">
          <label
            className="text-sm font-medium text-foreground"
            htmlFor="doctor-user-select"
          >
            Select User <span className="text-destructive">*</span>
          </label>
          <select
            id="doctor-user-select"
            value={form.userId}
            onChange={(e) => setForm((f) => ({ ...f, userId: e.target.value }))}
            className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            data-ocid="staff.add_doctor.user_select"
          >
            <option value="">Select a user...</option>
            {users.map((u) => (
              <option key={String(u.id)} value={String(u.id)}>
                {u.name} ({String(u.role)})
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label
            className="text-sm font-medium text-foreground"
            htmlFor="doctor-specialization"
          >
            Specialization <span className="text-destructive">*</span>
          </label>
          <select
            id="doctor-specialization"
            value={form.specialization}
            onChange={(e) =>
              setForm((f) => ({ ...f, specialization: e.target.value }))
            }
            className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            data-ocid="staff.add_doctor.specialization_select"
          >
            <option value="">Select specialization...</option>
            {SPECIALIZATIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="doctor-dept"
            >
              Department
            </label>
            <select
              id="doctor-dept"
              value={form.departmentId}
              onChange={(e) =>
                setForm((f) => ({ ...f, departmentId: e.target.value }))
              }
              className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="staff.add_doctor.department_select"
            >
              <option value="">Select department...</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="doctor-fee"
            >
              Consultation Fee ($) <span className="text-destructive">*</span>
            </label>
            <input
              id="doctor-fee"
              type="number"
              min="0"
              step="0.01"
              value={form.consultationFee}
              onChange={(e) =>
                setForm((f) => ({ ...f, consultationFee: e.target.value }))
              }
              placeholder="50.00"
              className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="staff.add_doctor.fee_input"
            />
          </div>
        </div>
        <div className="space-y-2">
          <span className="text-sm font-medium text-foreground">
            Qualifications
          </span>
          <div className="flex gap-2">
            <input
              type="text"
              value={form.qualInput}
              onChange={(e) =>
                setForm((f) => ({ ...f, qualInput: e.target.value }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addQualification();
                }
              }}
              placeholder="e.g. MBBS, MD, FRCS..."
              className="flex-1 h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="staff.add_doctor.qual_input"
            />
            <Button
              type="button"
              variant="outline"
              onClick={addQualification}
              size="sm"
              data-ocid="staff.add_doctor.add_qual_button"
            >
              Add
            </Button>
          </div>
          {form.qualifications.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {form.qualifications.map((q) => (
                <span
                  key={q}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-accent/15 text-accent border border-accent/30"
                >
                  {q}
                  <button
                    type="button"
                    onClick={() =>
                      setForm((f) => ({
                        ...f,
                        qualifications: f.qualifications.filter((x) => x !== q),
                      }))
                    }
                    className="hover:text-destructive"
                    aria-label={`Remove ${q}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              Working Hours
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addSlot}
              data-ocid="staff.add_doctor.add_slot_button"
            >
              + Add Slot
            </Button>
          </div>
          {form.slots.length === 0 && (
            <p className="text-xs text-muted-foreground">
              No schedule slots added yet.
            </p>
          )}
          {form.slots.map((slot, i) => (
            <div
              key={`new-slot-${slot.dayOfWeek}-${slot.startTime}`}
              className="grid grid-cols-4 gap-2 p-3 bg-muted/10 rounded-lg border border-border"
            >
              <div className="space-y-1">
                <label
                  className="text-xs text-muted-foreground"
                  htmlFor={`slot-day-${i}`}
                >
                  Day
                </label>
                <select
                  id={`slot-day-${i}`}
                  value={slot.dayOfWeek}
                  onChange={(e) =>
                    updateSlot(i, "dayOfWeek", Number(e.target.value))
                  }
                  className="w-full h-8 px-2 rounded border border-input bg-background text-foreground text-xs focus:outline-none"
                >
                  {DAYS_OF_WEEK.map((d, idx) => (
                    <option key={d} value={idx}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label
                  className="text-xs text-muted-foreground"
                  htmlFor={`slot-start-${i}`}
                >
                  Start
                </label>
                <input
                  id={`slot-start-${i}`}
                  type="time"
                  value={slot.startTime}
                  onChange={(e) => updateSlot(i, "startTime", e.target.value)}
                  className="w-full h-8 px-2 rounded border border-input bg-background text-foreground text-xs focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label
                  className="text-xs text-muted-foreground"
                  htmlFor={`slot-end-${i}`}
                >
                  End
                </label>
                <input
                  id={`slot-end-${i}`}
                  type="time"
                  value={slot.endTime}
                  onChange={(e) => updateSlot(i, "endTime", e.target.value)}
                  className="w-full h-8 px-2 rounded border border-input bg-background text-foreground text-xs focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label
                  className="text-xs text-muted-foreground"
                  htmlFor={`slot-max-${i}`}
                >
                  Max Pts
                </label>
                <input
                  id={`slot-max-${i}`}
                  type="number"
                  min="1"
                  value={slot.maxPatients}
                  onChange={(e) =>
                    updateSlot(i, "maxPatients", Number(e.target.value))
                  }
                  className="w-full h-8 px-2 rounded border border-input bg-background text-foreground text-xs focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

// -- Duty Roster Week View --
function DutyRosterTab({
  roster,
  users,
  isLoading,
}: { roster: DutyRoster[]; users: User[]; isLoading: boolean }) {
  const [showAddRoster, setShowAddRoster] = useState(false);
  const createRoster = useCreateDutyRoster();
  const today = new Date();
  const [weekOffset, setWeekOffset] = useState(0);
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay() + weekOffset * 7);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });
  const [rosterForm, setRosterForm] = useState<NewRosterForm>({
    userId: "",
    date: today.toISOString().split("T")[0],
    shift: "Morning",
    wardId: "",
  });

  const handleAddRoster = async () => {
    if (!rosterForm.userId || !rosterForm.date) {
      toast.error("User and date are required");
      return;
    }
    try {
      await createRoster.mutateAsync({
        userId: BigInt(rosterForm.userId) as UserId,
        date: rosterForm.date,
        shift: rosterForm.shift as ShiftType,
        wardId: rosterForm.wardId
          ? (BigInt(rosterForm.wardId) as Parameters<
              typeof createRoster.mutateAsync
            >[0]["wardId"])
          : null,
      });
      toast.success("Roster entry added");
      setShowAddRoster(false);
    } catch {
      toast.error("Failed to add roster entry");
    }
  };

  const getEntriesForDay = (day: Date) =>
    roster.filter((r) => r.date === day.toISOString().split("T")[0]);

  const shiftKey = (shift: unknown): keyof typeof SHIFT_STYLES => {
    if (typeof shift === "object" && shift !== null) {
      const k = Object.keys(shift as Record<string, unknown>)[0];
      return (k as keyof typeof SHIFT_STYLES) || "Morning";
    }
    return (String(shift) as keyof typeof SHIFT_STYLES) || "Morning";
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-7 gap-2">
        {["d0", "d1", "d2", "d3", "d4", "d5", "d6"].map((dk) => (
          <div key={dk} className="h-40 bg-muted/20 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4" data-ocid="staff.roster.section">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setWeekOffset((o) => o - 1)}
            data-ocid="staff.roster.prev_week"
          >
            ← Prev
          </Button>
          <span className="text-sm font-medium text-foreground">
            {weekDays[0].toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
            {" – "}
            {weekDays[6].toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setWeekOffset((o) => o + 1)}
            data-ocid="staff.roster.next_week"
          >
            Next →
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setWeekOffset(0)}
          >
            Today
          </Button>
        </div>
        <Button
          type="button"
          size="sm"
          onClick={() => setShowAddRoster(true)}
          data-ocid="staff.roster.add_button"
        >
          <Calendar className="h-4 w-4 mr-1.5" /> Add Entry
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {weekDays.map((day) => {
          const entries = getEntriesForDay(day);
          const isToday = day.toDateString() === today.toDateString();
          return (
            <div
              key={day.toISOString()}
              className={`min-h-[160px] rounded-xl border p-2 ${isToday ? "border-accent/60 bg-accent/5" : "border-border bg-card"}`}
            >
              <div className="text-center mb-2">
                <p className="text-xs text-muted-foreground">
                  {day.toLocaleDateString("en-US", { weekday: "short" })}
                </p>
                <p
                  className={`text-sm font-bold ${isToday ? "bg-accent text-card w-6 h-6 rounded-full flex items-center justify-center mx-auto" : "text-foreground"}`}
                >
                  {day.getDate()}
                </p>
              </div>
              <div className="space-y-1">
                {entries.map((entry) => {
                  const sk = shiftKey(entry.shift);
                  const cfg = SHIFT_STYLES[sk];
                  const entryUser = users.find((u) => u.id === entry.userId);
                  const Icon = cfg?.icon ?? Sun;
                  return (
                    <div
                      key={String(entry.id)}
                      className={`p-1.5 rounded-lg border text-xs ${cfg?.bg ?? "bg-muted/30 border-border text-muted-foreground"}`}
                    >
                      <div className="flex items-center gap-1">
                        <Icon className="h-2.5 w-2.5 shrink-0" />
                        <span className="font-medium truncate">{sk}</span>
                      </div>
                      <p className="truncate text-xs opacity-80 mt-0.5">
                        {entryUser?.name ?? `#${String(entry.userId)}`}
                      </p>
                    </div>
                  );
                })}
                {entries.length === 0 && (
                  <p className="text-xs text-muted-foreground/40 text-center pt-4">
                    —
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4 text-xs">
        {Object.entries(SHIFT_STYLES).map(([key, cfg]) => {
          const Icon = cfg.icon;
          return (
            <span
              key={key}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${cfg.bg}`}
            >
              <Icon className="h-3 w-3" />
              {cfg.label}
            </span>
          );
        })}
      </div>

      <Modal
        open={showAddRoster}
        onClose={() => setShowAddRoster(false)}
        title="Add Roster Entry"
        description="Assign a shift to a staff member"
        size="sm"
        footer={
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddRoster(false)}
              data-ocid="staff.roster.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAddRoster}
              disabled={createRoster.isPending}
              data-ocid="staff.roster.confirm_button"
            >
              {createRoster.isPending ? "Adding..." : "Add Entry"}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="roster-user"
            >
              Staff Member
            </label>
            <select
              id="roster-user"
              value={rosterForm.userId}
              onChange={(e) =>
                setRosterForm((f) => ({ ...f, userId: e.target.value }))
              }
              className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="staff.roster.user_select"
            >
              <option value="">Select staff...</option>
              {users.map((u) => (
                <option key={String(u.id)} value={String(u.id)}>
                  {u.name} ({String(u.role)})
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="roster-date"
            >
              Date
            </label>
            <input
              id="roster-date"
              type="date"
              value={rosterForm.date}
              onChange={(e) =>
                setRosterForm((f) => ({ ...f, date: e.target.value }))
              }
              className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="staff.roster.date_input"
            />
          </div>
          <div className="space-y-1.5">
            <span className="text-sm font-medium text-foreground">Shift</span>
            <div className="flex gap-2">
              {(["Morning", "Afternoon", "Night"] as const).map((s) => {
                const cfg = SHIFT_STYLES[s];
                const Icon = cfg.icon;
                return (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setRosterForm((f) => ({ ...f, shift: s }))}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${rosterForm.shift === s ? cfg.bg : "bg-muted/10 border-border text-muted-foreground"}`}
                    data-ocid={`staff.roster.shift_${s.toLowerCase()}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// -- Nursing Staff Tab --
function NursingStaffTab({
  users,
  isLoading,
}: { users: User[]; isLoading: boolean }) {
  const nurses = users.filter((u) => {
    const role =
      typeof u.role === "object"
        ? Object.keys(u.role as Record<string, unknown>)[0]
        : String(u.role);
    return role.toLowerCase() === "nurse";
  });

  const nurseColumns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ getValue, row }) => (
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-teal-500/20 flex items-center justify-center">
            <User2 className="h-4 w-4 text-accent" />
          </div>
          <div>
            <p className="font-medium text-sm">{String(getValue())}</p>
            <p className="text-xs text-muted-foreground">
              {row.original.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "department",
      header: "Department",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.departmentId ?? "—"}
        </span>
      ),
    },
    {
      id: "ward",
      header: "Ward Assignment",
      cell: () => (
        <span className="text-sm text-muted-foreground">General Ward</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const s = getValue();
        const key =
          typeof s === "object"
            ? Object.keys(s as Record<string, unknown>)[0]
            : String(s);
        return <StatusBadge status={key} />;
      },
    },
    {
      id: "shift",
      header: "Shift",
      cell: () => <ShiftBadge shift="Morning" />,
    },
  ];

  if (nurses.length === 0 && !isLoading) {
    return (
      <EmptyState
        icon={<UserCog className="h-8 w-8" />}
        title="No nursing staff found"
        description="Nursing staff profiles will appear here once users with the Nurse role are created."
      />
    );
  }

  return (
    <div data-ocid="staff.nurses.section">
      <DataTable
        data={nurses}
        columns={nurseColumns}
        isLoading={isLoading}
        searchPlaceholder="Search nursing staff..."
      />
    </div>
  );
}

// -- Leave Requests Tab --
function LeaveRequestsTab({
  leaves,
  users,
  isLoading,
  canManage,
}: {
  leaves: LeaveRequest[];
  users: User[];
  isLoading: boolean;
  canManage: boolean;
}) {
  const [showAddLeave, setShowAddLeave] = useState(false);
  const [approveComment, setApproveComment] = useState("");
  const [selectedLeaveId, setSelectedLeaveId] = useState<bigint | null>(null);
  const [commentAction, setCommentAction] = useState<
    "approve" | "reject" | null
  >(null);
  const createLeave = useCreateLeaveRequest();
  const updateStatus = useUpdateLeaveStatus();
  const [leaveForm, setLeaveForm] = useState<NewLeaveForm>({
    userId: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleAddLeave = async () => {
    if (
      !leaveForm.userId ||
      !leaveForm.startDate ||
      !leaveForm.endDate ||
      !leaveForm.reason
    ) {
      toast.error("All fields are required");
      return;
    }
    try {
      await createLeave.mutateAsync({
        userId: BigInt(leaveForm.userId) as UserId,
        startDate: leaveForm.startDate,
        endDate: leaveForm.endDate,
        reason: leaveForm.reason,
      });
      toast.success("Leave request submitted");
      setShowAddLeave(false);
      setLeaveForm({ userId: "", startDate: "", endDate: "", reason: "" });
    } catch {
      toast.error("Failed to submit leave request");
    }
  };

  const handleUpdateStatus = async (
    id: bigint,
    status: "Approved" | "Rejected",
  ) => {
    try {
      await updateStatus.mutateAsync({
        id: id as Parameters<typeof updateStatus.mutateAsync>[0]["id"],
        status: status as LeaveStatus,
      });
      toast.success(`Leave request ${status.toLowerCase()}`);
      setSelectedLeaveId(null);
      setCommentAction(null);
      setApproveComment("");
    } catch {
      toast.error("Failed to update leave status");
    }
  };

  const leaveColumns: ColumnDef<LeaveRequest>[] = [
    {
      id: "requester",
      header: "Requester",
      cell: ({ row }) => {
        const u = users.find((x) => x.id === row.original.userId);
        return (
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-muted/30 flex items-center justify-center">
              <User2 className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-sm">
                {u?.name ?? `#${String(row.original.userId)}`}
              </p>
              <p className="text-xs text-muted-foreground">
                {u?.role ? String(u.role) : ""}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      id: "dates",
      header: "Leave Period",
      cell: ({ row }) => (
        <div>
          <p className="text-sm font-medium">
            {row.original.startDate} → {row.original.endDate}
          </p>
          <p className="text-xs text-muted-foreground">
            {Math.ceil(
              (new Date(row.original.endDate).getTime() -
                new Date(row.original.startDate).getTime()) /
                (1000 * 60 * 60 * 24) +
                1,
            )}{" "}
            days
          </p>
        </div>
      ),
    },
    {
      accessorKey: "reason",
      header: "Reason",
      cell: ({ getValue }) => (
        <p className="text-sm text-muted-foreground max-w-[200px] truncate">
          {String(getValue())}
        </p>
      ),
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        const s = row.original.status;
        const key =
          typeof s === "object"
            ? Object.keys(s as Record<string, unknown>)[0]
            : String(s);
        return <StatusBadge status={key} />;
      },
    },
    ...(canManage
      ? [
          {
            id: "actions",
            header: "Actions",
            cell: ({ row }: { row: { original: LeaveRequest } }) => {
              const s = row.original.status;
              const key =
                typeof s === "object"
                  ? Object.keys(s as Record<string, unknown>)[0]
                  : String(s);
              if (key.toLowerCase() !== "pending")
                return <span className="text-xs text-muted-foreground">—</span>;
              return (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedLeaveId(row.original.id);
                      setCommentAction("approve");
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-green-500/15 text-green-400 border border-green-500/30 hover:bg-green-500/25 transition-colors"
                    data-ocid={`staff.leave.approve_button.${String(row.original.id)}`}
                  >
                    <CheckCircle2 className="h-3 w-3" /> Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedLeaveId(row.original.id);
                      setCommentAction("reject");
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25 transition-colors"
                    data-ocid={`staff.leave.reject_button.${String(row.original.id)}`}
                  >
                    <XCircle className="h-3 w-3" /> Reject
                  </button>
                </div>
              );
            },
          } as ColumnDef<LeaveRequest>,
        ]
      : []),
  ];

  return (
    <div className="space-y-4" data-ocid="staff.leaves.section">
      <div className="flex justify-end">
        <Button
          type="button"
          size="sm"
          onClick={() => setShowAddLeave(true)}
          data-ocid="staff.leaves.add_button"
        >
          + Request Leave
        </Button>
      </div>
      {leaves.length === 0 && !isLoading ? (
        <EmptyState
          icon={<AlertCircle className="h-8 w-8" />}
          title="No leave requests"
          description="Leave requests submitted by staff will appear here."
          action={{
            label: "Request Leave",
            onClick: () => setShowAddLeave(true),
          }}
        />
      ) : (
        <DataTable
          data={leaves}
          columns={leaveColumns}
          isLoading={isLoading}
          searchPlaceholder="Search leave requests..."
        />
      )}

      {/* Request Leave Modal */}
      <Modal
        open={showAddLeave}
        onClose={() => setShowAddLeave(false)}
        title="Request Leave"
        description="Submit a leave request for a staff member"
        size="sm"
        footer={
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddLeave(false)}
              data-ocid="staff.leave.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAddLeave}
              disabled={createLeave.isPending}
              data-ocid="staff.leave.submit_button"
            >
              {createLeave.isPending ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="leave-user"
            >
              Staff Member
            </label>
            <select
              id="leave-user"
              value={leaveForm.userId}
              onChange={(e) =>
                setLeaveForm((f) => ({ ...f, userId: e.target.value }))
              }
              className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="staff.leave.user_select"
            >
              <option value="">Select staff member...</option>
              {users.map((u) => (
                <option key={String(u.id)} value={String(u.id)}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="leave-start"
              >
                Start Date
              </label>
              <input
                id="leave-start"
                type="date"
                value={leaveForm.startDate}
                onChange={(e) =>
                  setLeaveForm((f) => ({ ...f, startDate: e.target.value }))
                }
                className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="staff.leave.start_date_input"
              />
            </div>
            <div className="space-y-1.5">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="leave-end"
              >
                End Date
              </label>
              <input
                id="leave-end"
                type="date"
                value={leaveForm.endDate}
                onChange={(e) =>
                  setLeaveForm((f) => ({ ...f, endDate: e.target.value }))
                }
                className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="staff.leave.end_date_input"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="leave-reason"
            >
              Reason
            </label>
            <textarea
              id="leave-reason"
              value={leaveForm.reason}
              onChange={(e) =>
                setLeaveForm((f) => ({ ...f, reason: e.target.value }))
              }
              rows={3}
              placeholder="Reason for leave..."
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              data-ocid="staff.leave.reason_textarea"
            />
          </div>
        </div>
      </Modal>

      {/* Approve/Reject Comment Modal */}
      <Modal
        open={!!selectedLeaveId && !!commentAction}
        onClose={() => {
          setSelectedLeaveId(null);
          setCommentAction(null);
          setApproveComment("");
        }}
        title={
          commentAction === "approve"
            ? "Approve Leave Request"
            : "Reject Leave Request"
        }
        description="Add an optional comment with your decision"
        size="sm"
        footer={
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setSelectedLeaveId(null);
                setCommentAction(null);
              }}
              data-ocid="staff.leave.decision.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant={commentAction === "approve" ? "default" : "destructive"}
              onClick={() => {
                if (selectedLeaveId && commentAction)
                  handleUpdateStatus(
                    selectedLeaveId,
                    commentAction === "approve" ? "Approved" : "Rejected",
                  );
              }}
              disabled={updateStatus.isPending}
              data-ocid="staff.leave.decision.confirm_button"
            >
              {updateStatus.isPending
                ? "Saving..."
                : commentAction === "approve"
                  ? "Approve"
                  : "Reject"}
            </Button>
          </div>
        }
      >
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {commentAction === "approve"
              ? "Are you sure you want to approve this leave request?"
              : "Are you sure you want to reject this leave request?"}
          </p>
          <div className="space-y-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="leave-comment"
            >
              Comment (optional)
            </label>
            <textarea
              id="leave-comment"
              value={approveComment}
              onChange={(e) => setApproveComment(e.target.value)}
              rows={2}
              placeholder="Add a comment..."
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              data-ocid="staff.leave.comment_textarea"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

// -- Main StaffPage --
export function StaffPage() {
  const { user } = useAuth();
  const { data: doctors = [], isLoading: dLoading } = useDoctors();
  const { data: users = [], isLoading: uLoading } = useUsers();
  const { data: roster = [], isLoading: rLoading } = useDutyRoster();
  const { data: leaves = [], isLoading: lLoading } = useLeaveRequests();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorProfile | null>(
    null,
  );
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [deptFilter, setDeptFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const canManageLeave =
    user?.role === UserRole.SuperAdmin || user?.role === UserRole.Receptionist;

  const filteredDoctors = doctors.filter((d) => {
    const u = users.find((x) => x.id === d.userId);
    const name = u?.name ?? "";
    const matchesSearch =
      !searchQuery ||
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = deptFilter === "all" || d.departmentId === deptFilter;
    return matchesSearch && matchesDept;
  });

  const doctorListColumns: ColumnDef<DoctorProfile>[] = [
    {
      id: "doctor",
      header: "Doctor",
      cell: ({ row }) => {
        const u = users.find((x) => x.id === row.original.userId);
        const name = u?.name ?? `Doctor #${String(row.original.id)}`;
        return (
          <div className="flex items-center gap-3">
            <DoctorAvatar name={name} size="sm" />
            <div>
              <p className="font-medium text-sm">{name}</p>
              <p className="text-xs text-muted-foreground">{u?.email ?? ""}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "specialization",
      header: "Specialization",
      cell: ({ getValue }) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-accent/15 text-accent border border-accent/30">
          {String(getValue())}
        </span>
      ),
    },
    {
      id: "department",
      header: "Department",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.departmentId ?? "—"}
        </span>
      ),
    },
    {
      accessorKey: "consultationFee",
      header: "Fee",
      cell: ({ getValue }) => (
        <span className="tabular-nums text-sm">
          ${(Number(getValue() as bigint) / 100).toFixed(2)}
        </span>
      ),
    },
    {
      id: "schedule",
      header: "Slots",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.schedule.length} slots
        </span>
      ),
    },
    {
      id: "view",
      header: "",
      cell: ({ row }) => (
        <button
          type="button"
          onClick={() => setSelectedDoctor(row.original)}
          className="text-xs text-accent hover:underline font-medium"
          data-ocid={`staff.doctor.view_button.${String(row.original.id)}`}
        >
          View Profile
        </button>
      ),
    },
  ];

  const nurseCount = users.filter((u) => {
    const r =
      typeof u.role === "object"
        ? Object.keys(u.role as Record<string, unknown>)[0]
        : String(u.role);
    return r.toLowerCase() === "nurse";
  }).length;

  return (
    <div data-ocid="staff.page">
      <PageHeader
        title="Doctors & Staff"
        description="Manage doctor profiles, nursing staff, duty rosters, and leave requests"
        breadcrumb={["Staff", "Management"]}
        actions={
          <div className="flex items-center gap-2">
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="h-9 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none"
              data-ocid="staff.department_filter"
            >
              <option value="all">All Departments</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <Button
              type="button"
              size="sm"
              onClick={() => setShowAddDoctor(true)}
              data-ocid="staff.add_doctor_button"
            >
              <UserPlus className="h-4 w-4 mr-1.5" /> Add Doctor
            </Button>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {(
          [
            {
              label: "Total Doctors",
              value: doctors.length,
              icon: Stethoscope,
              color: "text-accent",
            },
            {
              label: "Nursing Staff",
              value: nurseCount,
              icon: User2,
              color: "text-green-400",
            },
            {
              label: "Roster Entries",
              value: roster.length,
              icon: Calendar,
              color: "text-blue-400",
            },
            {
              label: "Leave Requests",
              value: leaves.length,
              icon: AlertCircle,
              color: "text-amber-400",
            },
          ] as const
        ).map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-card border border-border rounded-xl p-4 flex items-center gap-3"
          >
            <div className="p-2.5 rounded-lg bg-muted/20">
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="doctors" data-ocid="staff.tabs">
        <TabsList className="mb-6">
          <TabsTrigger value="doctors" data-ocid="staff.doctors.tab">
            <Stethoscope className="h-3.5 w-3.5 mr-1.5" /> Doctors (
            {doctors.length})
          </TabsTrigger>
          <TabsTrigger value="nurses" data-ocid="staff.nurses.tab">
            <User2 className="h-3.5 w-3.5 mr-1.5" /> Nursing Staff
          </TabsTrigger>
          <TabsTrigger value="roster" data-ocid="staff.roster.tab">
            <Calendar className="h-3.5 w-3.5 mr-1.5" /> Duty Roster
          </TabsTrigger>
          <TabsTrigger value="leaves" data-ocid="staff.leaves.tab">
            <AlertCircle className="h-3.5 w-3.5 mr-1.5" /> Leave Requests (
            {leaves.length})
          </TabsTrigger>
        </TabsList>

        {/* Doctors Tab */}
        <TabsContent value="doctors">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
              <div className="relative flex-1 max-w-xs">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search doctors..."
                  data-ocid="staff.doctors.search_input"
                  className="w-full h-9 pl-9 pr-3 rounded-lg border border-input bg-muted/20 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${viewMode === "grid" ? "bg-accent text-card" : "text-muted-foreground hover:bg-muted/20"}`}
                  aria-label="Grid view"
                  data-ocid="staff.doctors.grid_toggle"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${viewMode === "list" ? "bg-accent text-card" : "text-muted-foreground hover:bg-muted/20"}`}
                  aria-label="List view"
                  data-ocid="staff.doctors.list_toggle"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            {dLoading ? (
              viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {["sk-0", "sk-1", "sk-2", "sk-3", "sk-4", "sk-5"].map(
                    (sk) => (
                      <div
                        key={sk}
                        className="h-44 rounded-xl bg-muted/20 animate-pulse"
                      />
                    ),
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  {["sl-0", "sl-1", "sl-2", "sl-3"].map((sl) => (
                    <div
                      key={sl}
                      className="h-12 rounded-lg bg-muted/20 animate-pulse"
                    />
                  ))}
                </div>
              )
            ) : filteredDoctors.length === 0 ? (
              <EmptyState
                icon={<Stethoscope className="h-8 w-8" />}
                title="No doctors found"
                description="Add doctor profiles to get started or adjust your filters."
                action={{
                  label: "Add Doctor",
                  onClick: () => setShowAddDoctor(true),
                }}
              />
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDoctors.map((d) => (
                  <DoctorCard
                    key={String(d.id)}
                    doctor={d}
                    users={users}
                    onClick={setSelectedDoctor}
                  />
                ))}
              </div>
            ) : (
              <DataTable
                data={filteredDoctors}
                columns={doctorListColumns}
                searchPlaceholder="Search doctors..."
              />
            )}
          </div>
        </TabsContent>

        {/* Nursing Staff Tab */}
        <TabsContent value="nurses">
          <div className="bg-card border border-border rounded-xl p-6">
            <NursingStaffTab users={users} isLoading={uLoading} />
          </div>
        </TabsContent>

        {/* Duty Roster Tab */}
        <TabsContent value="roster">
          <div className="bg-card border border-border rounded-xl p-6">
            <DutyRosterTab roster={roster} users={users} isLoading={rLoading} />
          </div>
        </TabsContent>

        {/* Leave Requests Tab */}
        <TabsContent value="leaves">
          <div className="bg-card border border-border rounded-xl p-6">
            <LeaveRequestsTab
              leaves={leaves}
              users={users}
              isLoading={lLoading}
              canManage={!!canManageLeave}
            />
          </div>
        </TabsContent>
      </Tabs>

      {selectedDoctor && (
        <DoctorProfilePanel
          doctor={selectedDoctor}
          users={users}
          onClose={() => setSelectedDoctor(null)}
        />
      )}

      <AddDoctorModal
        open={showAddDoctor}
        onClose={() => setShowAddDoctor(false)}
        users={users}
      />
    </div>
  );
}
