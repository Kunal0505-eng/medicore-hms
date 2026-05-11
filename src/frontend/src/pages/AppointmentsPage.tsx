import type {
  Appointment,
  AppointmentId,
  DoctorProfile,
  Patient,
} from "@/backend";
import { AppointmentStatus, AppointmentType } from "@/backend";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  useAppointments,
  useCancelAppointment,
  useCreateAppointment,
  useUpdateAppointment,
} from "@/services/appointments";
import { usePatients } from "@/services/patients";
import { useDoctors } from "@/services/staff";
import type { ColumnDef } from "@tanstack/react-table";
import {
  CalendarCheck,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  RefreshCw,
  Stethoscope,
  Video,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

// ── Time slot grid ──────────────────────────────────────────────────────────
const ALL_TIME_SLOTS = [
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
];

const DAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// ── Form state ───────────────────────────────────────────────────────────────
const EMPTY_FORM = {
  patientId: "",
  doctorId: "",
  date: "",
  timeSlot: "",
  appointmentType: AppointmentType.OPD as AppointmentType,
  notes: "",
};

function toDateStr(d: Date): string {
  return d.toISOString().split("T")[0];
}

function today(): string {
  return toDateStr(new Date());
}

function startOfWeek(d: Date): Date {
  const day = d.getDay(); // 0=Sun
  const diff = day === 0 ? -6 : 1 - day;
  const mon = new Date(d);
  mon.setDate(d.getDate() + diff);
  return mon;
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function formatDisplayDate(iso: string): string {
  if (!iso) return "";
  const [y, m, day] = iso.split("-");
  return `${day}/${m}/${y}`;
}

// ── Appointment type badge ────────────────────────────────────────────────────
function TypeBadge({ type }: { type: AppointmentType }) {
  return type === AppointmentType.OPD ? (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/15 text-blue-400 border border-blue-500/30">
      <Stethoscope className="h-3 w-3" /> OPD
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-500/15 text-purple-400 border border-purple-500/30">
      <Video className="h-3 w-3" /> Telemedicine
    </span>
  );
}

// ── Token badge ───────────────────────────────────────────────────────────────
function TokenBadge({ token }: { token: bigint }) {
  return (
    <span className="inline-flex items-center justify-center w-12 h-8 rounded-lg font-mono font-bold text-sm bg-accent/15 text-accent border border-accent/40">
      {String(token).padStart(3, "0")}
    </span>
  );
}

// ── Doctor weekly calendar ────────────────────────────────────────────────────
interface DoctorCalendarProps {
  appointments: Appointment[];
  weekStart: Date;
  onPrevWeek: () => void;
  onNextWeek: () => void;
}

function DoctorWeeklyCalendar({
  appointments,
  weekStart,
  onPrevWeek,
  onNextWeek,
}: DoctorCalendarProps) {
  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart],
  );

  const bookedMap = useMemo(() => {
    const m: Record<string, Set<string>> = {};
    for (const appt of appointments) {
      if (appt.status === AppointmentStatus.Cancelled) continue;
      if (!m[appt.date]) m[appt.date] = new Set();
      m[appt.date].add(appt.timeSlot);
    }
    return m;
  }, [appointments]);

  const todayStr = today();

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/20">
        <span className="text-sm font-semibold text-foreground">
          Week of{" "}
          {weekDays[0].toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={onPrevWeek}
            className="p-1 rounded hover:bg-muted/40 transition-colors"
            aria-label="Previous week"
            data-ocid="appointments.calendar.prev_week"
          >
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </button>
          <button
            type="button"
            onClick={onNextWeek}
            className="p-1 rounded hover:bg-muted/40 transition-colors"
            aria-label="Next week"
            data-ocid="appointments.calendar.next_week"
          >
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center">
        {weekDays.map((d, i) => {
          const iso = toDateStr(d);
          const isToday = iso === todayStr;
          const booked = bookedMap[iso]?.size ?? 0;
          const total = ALL_TIME_SLOTS.length;
          const available = total - booked;
          const fillPct = (booked / total) * 100;
          return (
            <div
              key={DAYS_SHORT[i]}
              className={`p-2 border-r border-border last:border-r-0 ${
                isToday ? "bg-accent/10" : ""
              }`}
            >
              <div
                className={`text-xs font-medium mb-1 ${
                  isToday ? "text-accent" : "text-muted-foreground"
                }`}
              >
                {DAYS_SHORT[i]}
              </div>
              <div
                className={`text-sm font-bold mb-1.5 ${
                  isToday ? "text-accent" : "text-foreground"
                }`}
              >
                {d.getDate()}
              </div>
              <div className="relative h-1.5 rounded-full bg-muted/40 overflow-hidden mb-1">
                <div
                  className="absolute left-0 top-0 h-full rounded-full transition-all"
                  style={{
                    width: `${fillPct}%`,
                    backgroundColor:
                      fillPct > 75
                        ? "oklch(var(--destructive))"
                        : fillPct > 40
                          ? "oklch(0.74 0.15 85)"
                          : "oklch(var(--accent))",
                  }}
                />
              </div>
              <div className="text-[10px] text-muted-foreground">
                {available}av
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-4 py-2 border-t border-border bg-muted/10 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-accent inline-block" />{" "}
          Available
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" />{" "}
          Partial
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-destructive inline-block" />{" "}
          Near full
        </span>
      </div>
    </div>
  );
}

// ── Time slot picker ──────────────────────────────────────────────────────────
interface TimeSlotPickerProps {
  date: string;
  doctorId: string;
  appointments: Appointment[];
  selected: string;
  onSelect: (slot: string) => void;
  excludeAppointmentId?: AppointmentId;
}

function TimeSlotPicker({
  date,
  doctorId,
  appointments,
  selected,
  onSelect,
  excludeAppointmentId,
}: TimeSlotPickerProps) {
  const bookedSlots = useMemo(() => {
    if (!date || !doctorId) return new Set<string>();
    return new Set(
      appointments
        .filter(
          (a) =>
            a.date === date &&
            String(a.doctorId) === doctorId &&
            a.status !== AppointmentStatus.Cancelled &&
            (!excludeAppointmentId || a.id !== excludeAppointmentId),
        )
        .map((a) => a.timeSlot),
    );
  }, [date, doctorId, appointments, excludeAppointmentId]);

  if (!date || !doctorId) {
    return (
      <p className="text-xs text-muted-foreground italic">
        Select a doctor and date to see available slots.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {ALL_TIME_SLOTS.map((slot) => {
        const isBooked = bookedSlots.has(slot);
        const isSelected = selected === slot;
        return (
          <button
            key={slot}
            type="button"
            disabled={isBooked}
            onClick={() => onSelect(slot)}
            className={`px-2 py-1.5 rounded-md text-xs font-medium border transition-all ${
              isBooked
                ? "bg-muted/20 text-muted-foreground/40 border-border/30 cursor-not-allowed line-through"
                : isSelected
                  ? "bg-accent text-accent-foreground border-accent shadow-sm"
                  : "bg-background text-foreground border-border hover:border-accent hover:bg-accent/10"
            }`}
            data-ocid={`appointments.slot.${slot.replace(/[:\s]/g, "_")}`}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}

// ── Booking / Reschedule Modal ────────────────────────────────────────────────
interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  patients: Patient[];
  doctors: DoctorProfile[];
  appointments: Appointment[];
  editAppointment?: Appointment | null;
}

function BookingModal({
  open,
  onClose,
  patients,
  doctors,
  appointments,
  editAppointment,
}: BookingModalProps) {
  const isReschedule = !!editAppointment;
  const createAppointment = useCreateAppointment();
  const updateAppointment = useUpdateAppointment();

  const [patientSearch, setPatientSearch] = useState("");
  const [doctorSearch, setDoctorSearch] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);

  // Pre-fill on reschedule
  useEffect(() => {
    if (editAppointment) {
      setForm({
        patientId: String(editAppointment.patientId),
        doctorId: String(editAppointment.doctorId),
        date: editAppointment.date,
        timeSlot: editAppointment.timeSlot,
        appointmentType: editAppointment.appointmentType,
        notes: editAppointment.notes ?? "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [editAppointment]);

  const filteredPatients = useMemo(
    () =>
      patients.filter((p) =>
        `${p.firstName} ${p.lastName} ${p.mrn}`
          .toLowerCase()
          .includes(patientSearch.toLowerCase()),
      ),
    [patients, patientSearch],
  );

  const filteredDoctors = useMemo(
    () =>
      doctors.filter((d) =>
        d.specialization.toLowerCase().includes(doctorSearch.toLowerCase()),
      ),
    [doctors, doctorSearch],
  );

  const selectedPatient = patients.find((p) => String(p.id) === form.patientId);
  const selectedDoctor = doctors.find((d) => String(d.id) === form.doctorId);

  const isPending = createAppointment.isPending || updateAppointment.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.patientId || !form.doctorId) {
      toast.error("Please select a patient and doctor");
      return;
    }
    if (!form.date) {
      toast.error("Please select a date");
      return;
    }
    if (!form.timeSlot) {
      toast.error("Please select a time slot");
      return;
    }
    try {
      if (isReschedule && editAppointment) {
        await updateAppointment.mutateAsync({
          id: editAppointment.id,
          date: form.date,
          timeSlot: form.timeSlot,
          notes: form.notes || null,
        });
        toast.success("Appointment rescheduled successfully");
      } else {
        await createAppointment.mutateAsync({
          patientId: BigInt(form.patientId),
          doctorId: BigInt(form.doctorId),
          date: form.date,
          timeSlot: form.timeSlot,
          appointmentType: form.appointmentType,
          notes: form.notes || null,
        });
        toast.success("Appointment booked successfully");
      }
      onClose();
    } catch {
      toast.error(
        isReschedule ? "Failed to reschedule" : "Failed to book appointment",
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isReschedule ? "Reschedule Appointment" : "Book Appointment"}
      description={
        isReschedule
          ? "Choose a new date and time slot"
          : "Schedule a new OPD or telemedicine appointment"
      }
      size="lg"
      footer={
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isPending}
            data-ocid="appointments.form.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="appt-form"
            disabled={isPending || !form.timeSlot}
            data-ocid="appointments.form.submit_button"
          >
            {isPending
              ? isReschedule
                ? "Rescheduling..."
                : "Booking..."
              : isReschedule
                ? "Reschedule"
                : "Book Appointment"}
          </Button>
        </div>
      }
    >
      <form id="appt-form" onSubmit={handleSubmit} className="space-y-5">
        {/* Patient select */}
        {!isReschedule && (
          <div className="space-y-2">
            <Label>Patient</Label>
            <Input
              placeholder="Search by name or MRN..."
              value={patientSearch}
              onChange={(e) => setPatientSearch(e.target.value)}
              className="bg-muted/30"
              data-ocid="appointments.form.patient_search"
            />
            <div className="max-h-36 overflow-y-auto rounded-md border border-input bg-background divide-y divide-border">
              {filteredPatients.length === 0 ? (
                <p className="px-3 py-2 text-sm text-muted-foreground">
                  No patients found
                </p>
              ) : (
                filteredPatients.slice(0, 20).map((p) => (
                  <button
                    key={String(p.id)}
                    type="button"
                    onClick={() => {
                      setForm({ ...form, patientId: String(p.id) });
                      setPatientSearch(`${p.firstName} ${p.lastName}`);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-muted/30 transition-colors flex justify-between items-center ${
                      form.patientId === String(p.id)
                        ? "bg-accent/10 text-accent"
                        : "text-foreground"
                    }`}
                    data-ocid={`appointments.form.patient_option.${String(p.id)}`}
                  >
                    <span>
                      {p.firstName} {p.lastName}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {p.mrn}
                    </span>
                  </button>
                ))
              )}
            </div>
            {selectedPatient && (
              <p className="text-xs text-accent">
                ✓ Selected: {selectedPatient.firstName}{" "}
                {selectedPatient.lastName} ({selectedPatient.mrn})
              </p>
            )}
          </div>
        )}

        {/* Doctor select */}
        {!isReschedule && (
          <div className="space-y-2">
            <Label>Doctor</Label>
            <Input
              placeholder="Search by specialization..."
              value={doctorSearch}
              onChange={(e) => setDoctorSearch(e.target.value)}
              className="bg-muted/30"
              data-ocid="appointments.form.doctor_search"
            />
            <div className="max-h-36 overflow-y-auto rounded-md border border-input bg-background divide-y divide-border">
              {filteredDoctors.length === 0 ? (
                <p className="px-3 py-2 text-sm text-muted-foreground">
                  No doctors found
                </p>
              ) : (
                filteredDoctors.slice(0, 10).map((d) => (
                  <button
                    key={String(d.id)}
                    type="button"
                    onClick={() =>
                      setForm({ ...form, doctorId: String(d.id), timeSlot: "" })
                    }
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-muted/30 transition-colors flex justify-between items-center ${
                      form.doctorId === String(d.id)
                        ? "bg-accent/10 text-accent"
                        : "text-foreground"
                    }`}
                    data-ocid={`appointments.form.doctor_option.${String(d.id)}`}
                  >
                    <span>Dr. {d.specialization}</span>
                    <span className="text-xs text-muted-foreground">
                      ID: {String(d.id)}
                    </span>
                  </button>
                ))
              )}
            </div>
            {selectedDoctor && (
              <p className="text-xs text-accent">
                ✓ Selected: Dr. {selectedDoctor.specialization} · Fee: ₹
                {String(selectedDoctor.consultationFee)}
              </p>
            )}
          </div>
        )}

        {/* Appointment type toggle (only for new bookings) */}
        {!isReschedule && (
          <div className="space-y-2">
            <Label>Appointment Type</Label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() =>
                  setForm({ ...form, appointmentType: AppointmentType.OPD })
                }
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                  form.appointmentType === AppointmentType.OPD
                    ? "bg-blue-500/15 border-blue-500/40 text-blue-400"
                    : "border-border text-muted-foreground hover:border-blue-500/30"
                }`}
                data-ocid="appointments.form.type_opd"
              >
                <Stethoscope className="h-4 w-4" /> OPD
              </button>
              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    appointmentType: AppointmentType.Telemedicine,
                  })
                }
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                  form.appointmentType === AppointmentType.Telemedicine
                    ? "bg-purple-500/15 border-purple-500/40 text-purple-400"
                    : "border-border text-muted-foreground hover:border-purple-500/30"
                }`}
                data-ocid="appointments.form.type_telemedicine"
              >
                <Video className="h-4 w-4" /> Telemedicine
              </button>
            </div>
          </div>
        )}

        {/* Date picker */}
        <div className="space-y-2">
          <Label>Date</Label>
          <Input
            type="date"
            value={form.date}
            min={isReschedule ? undefined : today()}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value, timeSlot: "" })
            }
            required
            data-ocid="appointments.form.date_input"
          />
        </div>

        {/* Time slot grid */}
        <div className="space-y-2">
          <Label>
            Time Slot
            {form.timeSlot && (
              <span className="ml-2 text-accent font-medium">
                {form.timeSlot}
              </span>
            )}
          </Label>
          <TimeSlotPicker
            date={form.date}
            doctorId={form.doctorId}
            appointments={appointments}
            selected={form.timeSlot}
            onSelect={(slot) => setForm({ ...form, timeSlot: slot })}
            excludeAppointmentId={editAppointment?.id}
          />
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label>Notes (optional)</Label>
          <Textarea
            placeholder="Chief complaint or additional notes..."
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={2}
            className="bg-muted/30 resize-none"
            data-ocid="appointments.form.notes_textarea"
          />
        </div>
      </form>
    </Modal>
  );
}

// ── Cancel Dialog ─────────────────────────────────────────────────────────────
interface CancelDialogProps {
  open: boolean;
  onClose: () => void;
  appointment: Appointment | null;
}

function CancelDialog({ open, onClose, appointment }: CancelDialogProps) {
  const cancelAppointment = useCancelAppointment();
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (open) setReason("");
  }, [open]);

  const handleConfirm = async () => {
    if (!appointment) return;
    try {
      await cancelAppointment.mutateAsync({
        id: appointment.id,
        reason: reason || "Cancelled by user",
      });
      toast.success("Appointment cancelled");
      onClose();
    } catch {
      toast.error("Failed to cancel appointment");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Cancel Appointment"
      description="This action cannot be undone"
      size="sm"
      footer={
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={cancelAppointment.isPending}
            data-ocid="appointments.cancel_dialog.cancel_button"
          >
            Keep Appointment
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={cancelAppointment.isPending}
            data-ocid="appointments.cancel_dialog.confirm_button"
          >
            {cancelAppointment.isPending
              ? "Cancelling..."
              : "Cancel Appointment"}
          </Button>
        </div>
      }
    >
      <div className="space-y-3">
        {appointment && (
          <div className="text-sm text-muted-foreground">
            <p>
              Date:{" "}
              <span className="text-foreground font-medium">
                {formatDisplayDate(appointment.date)}
              </span>
            </p>
            <p>
              Time:{" "}
              <span className="text-foreground font-medium">
                {appointment.timeSlot}
              </span>
            </p>
          </div>
        )}
        <div className="space-y-1">
          <Label>Cancellation Reason</Label>
          <Textarea
            placeholder="Provide a reason for cancellation..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            className="bg-muted/30 resize-none"
            data-ocid="appointments.cancel_dialog.reason_textarea"
          />
        </div>
      </div>
    </Modal>
  );
}

// ── OPD Queue Tab ─────────────────────────────────────────────────────────────
interface OPDQueueProps {
  appointments: Appointment[];
  patients: Patient[];
  doctors: DoctorProfile[];
  isLoading: boolean;
  lastRefreshed: Date;
  onRefresh: () => void;
}

function OPDQueueTab({
  appointments,
  patients,
  doctors,
  isLoading,
  lastRefreshed,
  onRefresh,
}: OPDQueueProps) {
  const todayStr = today();
  const [filterDoctor, setFilterDoctor] = useState("all");

  const patientMap = useMemo(() => {
    const m: Record<string, Patient> = {};
    for (const p of patients) m[String(p.id)] = p;
    return m;
  }, [patients]);

  const doctorMap = useMemo(() => {
    const m: Record<string, DoctorProfile> = {};
    for (const d of doctors) m[String(d.id)] = d;
    return m;
  }, [doctors]);

  const todayQueue = useMemo(() => {
    return appointments
      .filter(
        (a) =>
          a.date === todayStr &&
          a.status !== AppointmentStatus.Cancelled &&
          (filterDoctor === "all" || String(a.doctorId) === filterDoctor),
      )
      .sort((a, b) => Number(a.tokenNumber) - Number(b.tokenNumber));
  }, [appointments, todayStr, filterDoctor]);

  const queueColumns: ColumnDef<Appointment>[] = [
    {
      id: "token",
      header: "Token",
      cell: ({ row }) => <TokenBadge token={row.original.tokenNumber} />,
    },
    {
      id: "patient",
      header: "Patient",
      accessorFn: (r) => {
        const p = patientMap[String(r.patientId)];
        return p ? `${p.firstName} ${p.lastName}` : `ID:${r.patientId}`;
      },
      cell: ({ row }) => {
        const p = patientMap[String(row.original.patientId)];
        return (
          <div>
            <p className="font-medium text-foreground">
              {p
                ? `${p.firstName} ${p.lastName}`
                : `ID:${row.original.patientId}`}
            </p>
            {p && (
              <p className="text-xs text-muted-foreground font-mono">{p.mrn}</p>
            )}
          </div>
        );
      },
    },
    {
      id: "doctor",
      header: "Doctor",
      cell: ({ row }) => {
        const d = doctorMap[String(row.original.doctorId)];
        return (
          <span className="text-sm text-foreground">
            {d ? `Dr. ${d.specialization}` : `ID:${row.original.doctorId}`}
          </span>
        );
      },
    },
    {
      id: "time",
      header: "Time Slot",
      cell: ({ row }) => (
        <span className="flex items-center gap-1 text-sm">
          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
          {row.original.timeSlot}
        </span>
      ),
    },
    {
      id: "type",
      header: "Type",
      cell: ({ row }) => <TypeBadge type={row.original.appointmentType} />,
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-semibold text-foreground">
            Today's OPD Queue
          </h2>
          <Badge variant="secondary" className="font-mono">
            {todayQueue.length} patients
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={filterDoctor}
            onChange={(e) => setFilterDoctor(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-1.5 text-sm min-w-[180px]"
            data-ocid="appointments.queue.doctor_filter"
          >
            <option value="all">All Doctors</option>
            {doctors.map((d) => (
              <option key={String(d.id)} value={String(d.id)}>
                Dr. {d.specialization}
              </option>
            ))}
          </select>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="gap-1.5"
            data-ocid="appointments.queue.refresh_button"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <span className="text-xs text-muted-foreground">
            Updated {lastRefreshed.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          {
            label: "Waiting",
            status: AppointmentStatus.Scheduled,
            color: "text-yellow-400",
          },
          {
            label: "Confirmed",
            status: AppointmentStatus.Confirmed,
            color: "text-accent",
          },
          {
            label: "In Progress",
            status: AppointmentStatus.InProgress,
            color: "text-orange-400",
          },
          {
            label: "Completed",
            status: AppointmentStatus.Completed,
            color: "text-green-400",
          },
        ].map(({ label, status, color }) => {
          const count = todayQueue.filter((a) => a.status === status).length;
          return (
            <div
              key={label}
              className="bg-card border border-border rounded-lg p-3 text-center"
            >
              <p className={`text-2xl font-bold ${color}`}>{count}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
          );
        })}
      </div>

      {/* Queue table */}
      <div className="bg-card border border-border rounded-xl p-4">
        {todayQueue.length === 0 ? (
          <EmptyState
            icon={<CalendarCheck className="h-8 w-8" />}
            title="Queue is empty"
            description={`No appointments scheduled for today${filterDoctor !== "all" ? " for this doctor" : ""}.`}
          />
        ) : (
          <DataTable
            data={todayQueue}
            columns={queueColumns as ColumnDef<Appointment>[]}
            searchPlaceholder="Search patients..."
            isLoading={isLoading}
            pageSize={15}
          />
        )}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export function AppointmentsPage() {
  const { data: appointments, isLoading, refetch } = useAppointments();
  const { data: patients } = usePatients();
  const { data: doctors } = useDoctors();

  const [activeTab, setActiveTab] = useState("list");
  const [showBooking, setShowBooking] = useState(false);
  const [editAppointment, setEditAppointment] = useState<Appointment | null>(
    null,
  );
  const [cancelTarget, setCancelTarget] = useState<Appointment | null>(null);
  const [filterDoctor, setFilterDoctor] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()));
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  const patientMap = useMemo(() => {
    const m: Record<string, Patient> = {};
    for (const p of patients ?? []) m[String(p.id)] = p;
    return m;
  }, [patients]);

  const doctorMap = useMemo(() => {
    const m: Record<string, DoctorProfile> = {};
    for (const d of doctors ?? []) m[String(d.id)] = d;
    return m;
  }, [doctors]);

  // Auto-refresh every 30 seconds on Queue tab
  const refetchRef = useRef(refetch);
  refetchRef.current = refetch;
  useEffect(() => {
    if (activeTab !== "queue") return;
    const id = setInterval(() => {
      refetchRef.current();
      setLastRefreshed(new Date());
    }, 30_000);
    return () => clearInterval(id);
  }, [activeTab]);

  const handleRefresh = useCallback(() => {
    refetch();
    setLastRefreshed(new Date());
  }, [refetch]);

  // Filter appointments for list
  const filteredAppointments = useMemo(() => {
    return (appointments ?? []).filter((a) => {
      if (filterDoctor !== "all" && String(a.doctorId) !== filterDoctor)
        return false;
      if (filterStatus !== "all" && a.status !== filterStatus) return false;
      if (filterDateFrom && a.date < filterDateFrom) return false;
      if (filterDateTo && a.date > filterDateTo) return false;
      return true;
    });
  }, [appointments, filterDoctor, filterStatus, filterDateFrom, filterDateTo]);

  const columns: ColumnDef<Appointment>[] = [
    {
      id: "token",
      header: "Token",
      cell: ({ row }) => <TokenBadge token={row.original.tokenNumber} />,
    },
    {
      id: "patient",
      header: "Patient",
      accessorFn: (r) => {
        const p = patientMap[String(r.patientId)];
        return p ? `${p.firstName} ${p.lastName}` : `ID:${r.patientId}`;
      },
      cell: ({ row }) => {
        const p = patientMap[String(row.original.patientId)];
        return (
          <div>
            <p className="font-medium text-foreground">
              {p
                ? `${p.firstName} ${p.lastName}`
                : `ID:${row.original.patientId}`}
            </p>
            {p && (
              <p className="text-xs text-muted-foreground font-mono">{p.mrn}</p>
            )}
          </div>
        );
      },
    },
    {
      id: "doctor",
      header: "Doctor",
      accessorFn: (r) => {
        const d = doctorMap[String(r.doctorId)];
        return d ? `Dr. ${d.specialization}` : `ID:${r.doctorId}`;
      },
      cell: ({ row }) => {
        const d = doctorMap[String(row.original.doctorId)];
        return (
          <div>
            <p className="text-sm text-foreground">
              {d ? `Dr. ${d.specialization}` : `ID:${row.original.doctorId}`}
            </p>
            {d && (
              <p className="text-xs text-muted-foreground">
                Fee ₹{String(d.consultationFee)}
              </p>
            )}
          </div>
        );
      },
    },
    {
      id: "datetime",
      header: "Date & Time",
      accessorFn: (r) => r.date,
      cell: ({ row }) => (
        <div>
          <p className="text-sm font-medium text-foreground">
            {formatDisplayDate(row.original.date)}
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {row.original.timeSlot}
          </p>
        </div>
      ),
    },
    {
      id: "type",
      header: "Type",
      cell: ({ row }) => <TypeBadge type={row.original.appointmentType} />,
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const a = row.original;
        const canAct =
          a.status !== AppointmentStatus.Cancelled &&
          a.status !== AppointmentStatus.Completed;
        return (
          <div className="flex items-center gap-1">
            {canAct && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditAppointment(a);
                  setShowBooking(true);
                }}
                className="text-xs"
                data-ocid={`appointments.reschedule_button.${row.index + 1}`}
              >
                Reschedule
              </Button>
            )}
            {canAct && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setCancelTarget(a)}
                className="text-destructive hover:text-destructive text-xs"
                data-ocid={`appointments.cancel_button.${row.index + 1}`}
              >
                Cancel
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div data-ocid="appointments.page">
      <PageHeader
        title="Appointments"
        description="OPD scheduling, doctor calendar, and queue management"
        breadcrumb={["Patient Ops", "Appointments"]}
        actions={
          <Button
            type="button"
            onClick={() => {
              setEditAppointment(null);
              setShowBooking(true);
            }}
            data-ocid="appointments.add_button"
          >
            <Plus className="h-4 w-4 mr-2" />
            Book Appointment
          </Button>
        }
      />

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-5"
        data-ocid="appointments.tabs"
      >
        <TabsList className="bg-muted/30 border border-border">
          <TabsTrigger
            value="list"
            className="gap-2"
            data-ocid="appointments.tab.list"
          >
            <CalendarDays className="h-4 w-4" /> Appointments
          </TabsTrigger>
          <TabsTrigger
            value="queue"
            className="gap-2"
            data-ocid="appointments.tab.queue"
          >
            <Clock className="h-4 w-4" /> OPD Queue
          </TabsTrigger>
        </TabsList>

        {/* ── Appointments List Tab ───────────────────────────────────── */}
        <TabsContent value="list" className="space-y-4">
          {/* Doctor calendar */}
          {(appointments?.length ?? 0) > 0 && (
            <DoctorWeeklyCalendar
              appointments={appointments ?? []}
              weekStart={weekStart}
              onPrevWeek={() => setWeekStart((w) => addDays(w, -7))}
              onNextWeek={() => setWeekStart((w) => addDays(w, 7))}
            />
          )}

          {/* Filters */}
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Label className="text-xs whitespace-nowrap">Doctor</Label>
                <select
                  value={filterDoctor}
                  onChange={(e) => setFilterDoctor(e.target.value)}
                  className="rounded-md border border-input bg-background px-2 py-1.5 text-sm"
                  data-ocid="appointments.filter.doctor_select"
                >
                  <option value="all">All Doctors</option>
                  {(doctors ?? []).map((d) => (
                    <option key={String(d.id)} value={String(d.id)}>
                      Dr. {d.specialization}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-xs whitespace-nowrap">Status</Label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="rounded-md border border-input bg-background px-2 py-1.5 text-sm"
                  data-ocid="appointments.filter.status_select"
                >
                  <option value="all">All Statuses</option>
                  {Object.values(AppointmentStatus).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-xs whitespace-nowrap">From</Label>
                <Input
                  type="date"
                  value={filterDateFrom}
                  onChange={(e) => setFilterDateFrom(e.target.value)}
                  className="h-8 text-sm w-36 bg-muted/20"
                  data-ocid="appointments.filter.date_from"
                />
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-xs whitespace-nowrap">To</Label>
                <Input
                  type="date"
                  value={filterDateTo}
                  onChange={(e) => setFilterDateTo(e.target.value)}
                  className="h-8 text-sm w-36 bg-muted/20"
                  data-ocid="appointments.filter.date_to"
                />
              </div>
              {(filterDoctor !== "all" ||
                filterStatus !== "all" ||
                filterDateFrom ||
                filterDateTo) && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setFilterDoctor("all");
                    setFilterStatus("all");
                    setFilterDateFrom("");
                    setFilterDateTo("");
                  }}
                  className="text-xs text-muted-foreground"
                  data-ocid="appointments.filter.clear_button"
                >
                  Clear filters
                </Button>
              )}
            </div>

            {filteredAppointments.length === 0 && !isLoading ? (
              <EmptyState
                icon={<CalendarDays className="h-8 w-8" />}
                title="No appointments found"
                description="Adjust filters or book the first appointment."
                action={{
                  label: "Book Appointment",
                  onClick: () => {
                    setEditAppointment(null);
                    setShowBooking(true);
                  },
                }}
              />
            ) : (
              <DataTable
                data={filteredAppointments}
                columns={columns as ColumnDef<Appointment>[]}
                searchPlaceholder="Search by patient, doctor, date..."
                isLoading={isLoading}
                pageSize={10}
              />
            )}
          </div>
        </TabsContent>

        {/* ── OPD Queue Tab ──────────────────────────────────────────── */}
        <TabsContent value="queue">
          <OPDQueueTab
            appointments={appointments ?? []}
            patients={patients ?? []}
            doctors={doctors ?? []}
            isLoading={isLoading}
            lastRefreshed={lastRefreshed}
            onRefresh={handleRefresh}
          />
        </TabsContent>
      </Tabs>

      {/* Booking / Reschedule Modal */}
      <BookingModal
        open={showBooking}
        onClose={() => {
          setShowBooking(false);
          setEditAppointment(null);
        }}
        patients={patients ?? []}
        doctors={doctors ?? []}
        appointments={appointments ?? []}
        editAppointment={editAppointment}
      />

      {/* Cancel Dialog */}
      <CancelDialog
        open={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        appointment={cancelTarget}
      />
    </div>
  );
}
