import { ERStatus, UserRole } from "@/backend";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import {
  useActiveERTriages,
  useCreateERTriage,
  useUpdateERTriage,
} from "@/services/emergency";
import { usePatients } from "@/services/patients";
import { useDoctors } from "@/services/staff";
import { useBeds, useWards } from "@/services/ward";
import type {
  Bed,
  DoctorProfile,
  ERTriage,
  ERTriageId,
  Patient,
} from "@/types";
import {
  Activity,
  AlertTriangle,
  BedDouble,
  BedSingle,
  CheckCircle,
  Clock,
  HelpCircle,
  Plus,
  RefreshCw,
  Shield,
  Stethoscope,
  UserX,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ────────────────────────────────────────────────────────────
// ESI Level config
// ────────────────────────────────────────────────────────────
const ESI_LEVELS = [
  {
    level: 1,
    label: "Immediate",
    description: "Life-threatening, requires immediate resuscitation",
    bg: "bg-red-600",
    text: "text-white",
    border: "border-red-600",
    ringColor: "ring-red-500",
    dot: "bg-red-500",
    badge: "bg-red-600/20 text-red-400 border-red-600/40",
  },
  {
    level: 2,
    label: "Emergent",
    description: "High risk, severe pain or distress",
    bg: "bg-orange-500",
    text: "text-white",
    border: "border-orange-500",
    ringColor: "ring-orange-500",
    dot: "bg-orange-500",
    badge: "bg-orange-500/20 text-orange-400 border-orange-500/40",
  },
  {
    level: 3,
    label: "Urgent",
    description: "Requires two or more resources, stable vitals",
    bg: "bg-yellow-500",
    text: "text-foreground",
    border: "border-yellow-500",
    ringColor: "ring-yellow-500",
    dot: "bg-yellow-500",
    badge: "bg-yellow-500/20 text-yellow-400 border-yellow-500/40",
  },
  {
    level: 4,
    label: "Less Urgent",
    description: "One resource needed, minor injury or illness",
    bg: "bg-green-600",
    text: "text-white",
    border: "border-green-600",
    ringColor: "ring-green-500",
    dot: "bg-green-500",
    badge: "bg-green-600/20 text-green-400 border-green-600/40",
  },
  {
    level: 5,
    label: "Non-Urgent",
    description: "Non-urgent, chronic or minor, no resources",
    bg: "bg-blue-500",
    text: "text-white",
    border: "border-blue-500",
    ringColor: "ring-blue-500",
    dot: "bg-blue-500",
    badge: "bg-blue-500/20 text-blue-400 border-blue-500/40",
  },
];

function getESI(level: number) {
  return ESI_LEVELS.find((e) => e.level === level) ?? ESI_LEVELS[2];
}

// ────────────────────────────────────────────────────────────
// Quick Triage Registration Modal
// ────────────────────────────────────────────────────────────
interface TriageFormData {
  name: string;
  age: string;
  gender: string;
  esiLevel: number;
  chiefComplaint: string;
  isTraumaCase: boolean;
  isUnknownPatient: boolean;
  patientId: string;
  bedId: string;
}

const DEFAULT_FORM: TriageFormData = {
  name: "",
  age: "",
  gender: "Male",
  esiLevel: 3,
  chiefComplaint: "",
  isTraumaCase: false,
  isUnknownPatient: false,
  patientId: "",
  bedId: "",
};

function TriageModal({
  open,
  onClose,
  patients,
  erBeds,
  isPending,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  patients: Patient[];
  erBeds: Bed[];
  isPending: boolean;
  onSubmit: (form: TriageFormData) => void;
}) {
  const [form, setForm] = useState<TriageFormData>(DEFAULT_FORM);

  const availableBeds = erBeds.filter((b) => b.status === "Available");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.chiefComplaint.trim()) {
      toast.error("Chief complaint is required");
      return;
    }
    onSubmit(form);
    setForm(DEFAULT_FORM);
  }

  function close() {
    setForm(DEFAULT_FORM);
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={close}
      title="Quick Triage Registration"
      description="Register an emergency case with ESI classification"
      size="lg"
      footer={
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={close}
            data-ocid="emergency.form.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="triage-form"
            variant="destructive"
            disabled={isPending}
            data-ocid="emergency.form.submit_button"
          >
            {isPending ? "Registering..." : "Register & Triage"}
          </Button>
        </div>
      }
    >
      <form id="triage-form" onSubmit={handleSubmit} className="space-y-5">
        {/* Unknown patient toggle */}
        <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/20">
          <input
            type="checkbox"
            id="unknown-patient"
            checked={form.isUnknownPatient}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                isUnknownPatient: e.target.checked,
                patientId: e.target.checked ? "" : f.patientId,
              }))
            }
            className="h-4 w-4 rounded"
            data-ocid="emergency.form.unknown_checkbox"
          />
          <label
            htmlFor="unknown-patient"
            className="flex items-center gap-2 text-sm font-medium cursor-pointer"
          >
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
            Unknown / Unconscious Patient
          </label>
        </div>

        {/* Patient identity section */}
        {!form.isUnknownPatient && (
          <div className="grid grid-cols-1 gap-3">
            <div className="space-y-1">
              <Label>Link Existing Patient (optional)</Label>
              <select
                value={form.patientId}
                onChange={(e) =>
                  setForm((f) => ({ ...f, patientId: e.target.value }))
                }
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                data-ocid="emergency.form.patient_select"
              >
                <option value="">— Walk-in / new patient —</option>
                {patients.map((p) => (
                  <option key={String(p.id)} value={String(p.id)}>
                    {p.firstName} {p.lastName} ({p.mrn})
                  </option>
                ))}
              </select>
            </div>
            {!form.patientId && (
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 space-y-1">
                  <Label>Patient Name (optional)</Label>
                  <Input
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="Full name"
                    data-ocid="emergency.form.name_input"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Age</Label>
                  <Input
                    type="number"
                    value={form.age}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, age: e.target.value }))
                    }
                    placeholder="Yrs"
                    min={0}
                    max={150}
                    data-ocid="emergency.form.age_input"
                  />
                </div>
              </div>
            )}
            {!form.patientId && (
              <div className="space-y-1">
                <Label>Gender</Label>
                <select
                  value={form.gender}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, gender: e.target.value }))
                  }
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  data-ocid="emergency.form.gender_select"
                >
                  {["Male", "Female", "Other"].map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* ESI Level Selector */}
        <div className="space-y-2">
          <Label>
            ESI Triage Level <span className="text-destructive">*</span>
          </Label>
          <div className="grid grid-cols-5 gap-2">
            {ESI_LEVELS.map((esi) => (
              <button
                key={esi.level}
                type="button"
                onClick={() => setForm((f) => ({ ...f, esiLevel: esi.level }))}
                data-ocid={`emergency.form.esi_${esi.level}`}
                className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all text-center ${
                  form.esiLevel === esi.level
                    ? `${esi.bg} ${esi.text} border-transparent ring-2 ${esi.ringColor} ring-offset-1 ring-offset-card shadow-lg scale-105`
                    : "bg-card border-border hover:border-primary/30 text-foreground"
                }`}
              >
                <span className="text-xl font-black leading-none">
                  {esi.level}
                </span>
                <span className="text-xs font-semibold leading-tight">
                  {esi.label}
                </span>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="font-medium">ESI {form.esiLevel}:</span>{" "}
            {getESI(form.esiLevel).description}
          </p>
        </div>

        {/* Chief Complaint */}
        <div className="space-y-1">
          <Label>
            Chief Complaint <span className="text-destructive">*</span>
          </Label>
          <Input
            value={form.chiefComplaint}
            onChange={(e) =>
              setForm((f) => ({ ...f, chiefComplaint: e.target.value }))
            }
            placeholder="Primary reason for visit (e.g. Chest pain, Head trauma)"
            required
            data-ocid="emergency.form.complaint_input"
          />
        </div>

        {/* Trauma + Bed */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/20">
            <input
              type="checkbox"
              id="trauma-case"
              checked={form.isTraumaCase}
              onChange={(e) =>
                setForm((f) => ({ ...f, isTraumaCase: e.target.checked }))
              }
              className="h-4 w-4 rounded"
              data-ocid="emergency.form.trauma_checkbox"
            />
            <label
              htmlFor="trauma-case"
              className="flex items-center gap-2 text-sm font-medium cursor-pointer"
            >
              <AlertTriangle className="h-4 w-4 text-red-400" />
              Trauma Case
            </label>
          </div>

          <div className="space-y-1">
            <Label>Assign ER Bed (optional)</Label>
            <select
              value={form.bedId}
              onChange={(e) =>
                setForm((f) => ({ ...f, bedId: e.target.value }))
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              data-ocid="emergency.form.bed_select"
            >
              <option value="">— Assign later —</option>
              {availableBeds.map((b) => (
                <option key={String(b.id)} value={String(b.id)}>
                  Bed {b.bedNumber}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </Modal>
  );
}

// ────────────────────────────────────────────────────────────
// Doctor Assignment Modal
// ────────────────────────────────────────────────────────────
function AssignDoctorModal({
  open,
  onClose,
  triage,
  doctors,
  erBeds,
  isPending,
  onAssign,
}: {
  open: boolean;
  onClose: () => void;
  triage: ERTriage | null;
  doctors: DoctorProfile[];
  erBeds: Bed[];
  isPending: boolean;
  onAssign: (doctorId: string, bedId: string) => void;
}) {
  const [doctorId, setDoctorId] = useState("");
  const [bedId, setBedId] = useState("");

  if (!triage) return null;

  const availableBeds = erBeds.filter(
    (b) =>
      b.status === "Available" || String(b.id) === String(triage.bedId ?? ""),
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Assign Doctor & Bed"
      description={`Case #${String(triage.id)} — ESI Level ${String(triage.esiLevel)}`}
      size="sm"
      footer={
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-ocid="emergency.assign.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              onAssign(doctorId, bedId);
              onClose();
            }}
            disabled={isPending}
            data-ocid="emergency.assign.confirm_button"
          >
            {isPending ? "Saving..." : "Assign"}
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="space-y-1">
          <Label>Treating Doctor</Label>
          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            data-ocid="emergency.assign.doctor_select"
          >
            <option value="">— Select doctor —</option>
            {doctors.map((d) => (
              <option key={String(d.id)} value={String(d.userId)}>
                {d.specialization} (ID: {String(d.id)})
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <Label>ER Bed</Label>
          <select
            value={bedId}
            onChange={(e) => setBedId(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            data-ocid="emergency.assign.bed_select"
          >
            <option value="">— Select bed —</option>
            {availableBeds.map((b) => (
              <option key={String(b.id)} value={String(b.id)}>
                Bed {b.bedNumber} — {b.status}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Modal>
  );
}

// ────────────────────────────────────────────────────────────
// ER Bed Card
// ────────────────────────────────────────────────────────────
function BedCard({
  bed,
  triages,
}: {
  bed: Bed;
  triages: ERTriage[];
}) {
  const activeTriage = triages.find(
    (t) => t.bedId && String(t.bedId) === String(bed.id),
  );
  const esi = activeTriage ? getESI(Number(activeTriage.esiLevel)) : null;

  const isOccupied = bed.status === "Occupied";
  const isAvailable = bed.status === "Available";

  return (
    <div
      className={`relative p-3 rounded-xl border-2 transition-smooth ${
        isOccupied
          ? esi
            ? `border-2 ${esi.border} bg-card shadow-sm`
            : "border-red-400/50 bg-card"
          : isAvailable
            ? "border-green-500/40 bg-green-500/5"
            : "border-yellow-500/40 bg-yellow-500/5"
      }`}
      data-ocid={`emergency.bed.${bed.bedNumber}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <BedSingle
            className={`h-3.5 w-3.5 ${isAvailable ? "text-green-400" : isOccupied ? "text-red-400" : "text-yellow-400"}`}
          />
          <span className="text-xs font-bold text-foreground">
            {bed.bedNumber}
          </span>
        </div>
        {esi && activeTriage && (
          <span
            className={`inline-flex items-center justify-center w-5 h-5 rounded text-xs font-black ${esi.bg} ${esi.text}`}
          >
            {esi.level}
          </span>
        )}
      </div>

      {isOccupied && activeTriage ? (
        <div>
          <p className="text-xs font-medium text-foreground truncate">
            {activeTriage.isUnknownPatient
              ? "Unknown Patient"
              : `Case #${String(activeTriage.id)}`}
          </p>
          <p className="text-xs text-muted-foreground truncate mt-0.5 leading-tight">
            {activeTriage.chiefComplaint}
          </p>
          {activeTriage.isTraumaCase && (
            <span className="mt-1 inline-flex items-center gap-0.5 text-xs text-red-400 font-medium">
              <AlertTriangle className="h-2.5 w-2.5" />
              Trauma
            </span>
          )}
        </div>
      ) : (
        <p
          className={`text-xs font-medium mt-1 ${
            isAvailable ? "text-green-400" : "text-yellow-400"
          }`}
        >
          {bed.status}
        </p>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// ER Queue Row
// ────────────────────────────────────────────────────────────
function TriageRow({
  triage,
  index,
  patients,
  doctors,
  erBeds,
  onUpdateStatus,
  onAssign,
  isUpdating,
}: {
  triage: ERTriage;
  index: number;
  patients: Patient[];
  doctors: DoctorProfile[];
  erBeds: Bed[];
  onUpdateStatus: (id: ERTriageId, status: ERStatus) => void;
  onAssign: (triage: ERTriage) => void;
  isUpdating: boolean;
}) {
  const esi = getESI(Number(triage.esiLevel));
  const patient = triage.patientId
    ? patients.find((p) => String(p.id) === String(triage.patientId))
    : null;
  const doctor = triage.treatedByDoctorId
    ? doctors.find((d) => String(d.id) === String(triage.treatedByDoctorId))
    : null;
  const bed = triage.bedId
    ? erBeds.find((b) => String(b.id) === String(triage.bedId))
    : null;

  const arrivalDate = new Date(Number(triage.arrivalTime) / 1_000_000);
  const now = Date.now();
  const waitMins = Math.floor((now - arrivalDate.getTime()) / 60000);

  const isTrauma = triage.isTraumaCase;
  const isUnknown = triage.isUnknownPatient;

  const displayName = isUnknown
    ? "Unknown Patient"
    : patient
      ? `${patient.firstName} ${patient.lastName}`
      : `Case #${String(triage.id)}`;

  return (
    <div
      className={`relative p-4 rounded-xl border transition-smooth ${
        isTrauma
          ? "border-red-500/60 bg-red-500/5 shadow-sm"
          : "border-border bg-card hover:border-accent/30"
      }`}
      data-ocid={`emergency.triage.item.${index + 1}`}
    >
      {isTrauma && (
        <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl bg-red-500" />
      )}

      <div className="flex items-start gap-3">
        {/* ESI badge */}
        <div
          className={`flex-shrink-0 flex flex-col items-center justify-center w-12 h-12 rounded-lg ${esi.bg} ${esi.text} shadow-sm`}
        >
          <span className="text-xl font-black leading-none">{esi.level}</span>
          <span className="text-xs font-semibold opacity-90">ESI</span>
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-foreground text-sm truncate">
              {displayName}
            </span>
            {isUnknown && (
              <span className="inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-md bg-muted/50 text-muted-foreground border border-border">
                <HelpCircle className="h-3 w-3" />
                Unknown
              </span>
            )}
            {isTrauma && (
              <span className="inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-md bg-red-500/15 text-red-400 border border-red-500/30 font-semibold">
                <AlertTriangle className="h-3 w-3" />
                Trauma
              </span>
            )}
          </div>

          <p className="text-sm text-muted-foreground mt-0.5 truncate">
            {triage.chiefComplaint}
          </p>

          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {waitMins < 1 ? "Just arrived" : `${waitMins}m ago`}
            </span>
            {bed && (
              <span className="flex items-center gap-1 text-xs text-accent font-medium">
                <BedDouble className="h-3 w-3" />
                {bed.bedNumber}
              </span>
            )}
            {doctor && (
              <span className="flex items-center gap-1 text-xs text-foreground">
                <Stethoscope className="h-3 w-3" />
                {doctor.specialization}
              </span>
            )}
          </div>
        </div>

        {/* Status + actions */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <StatusBadge status={triage.status} />
          <div className="flex gap-1.5">
            {triage.status === ERStatus.Waiting && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-7 text-xs"
                onClick={() => onAssign(triage)}
                data-ocid={`emergency.assign_button.${index + 1}`}
              >
                <Stethoscope className="h-3 w-3 mr-1" />
                Assign
              </Button>
            )}
            {(triage.status === ERStatus.Waiting ||
              triage.status === ERStatus.InTreatment) && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-7 text-xs border-green-500/40 text-green-400 hover:bg-green-500/10"
                disabled={isUpdating}
                onClick={() =>
                  onUpdateStatus(
                    triage.id,
                    triage.status === ERStatus.Waiting
                      ? ERStatus.InTreatment
                      : ERStatus.Discharged,
                  )
                }
                data-ocid={`emergency.status_button.${index + 1}`}
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                {triage.status === ERStatus.Waiting
                  ? "In Treatment"
                  : "Discharge"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Main Page
// ────────────────────────────────────────────────────────────
export function EmergencyPage() {
  const { user } = useAuth();
  const [showTriageModal, setShowTriageModal] = useState(false);
  const [assignTarget, setAssignTarget] = useState<ERTriage | null>(null);

  const { data: activeTriages, isLoading: loadingTriages } =
    useActiveERTriages();
  const { data: allBeds, isLoading: loadingBeds } = useBeds();
  const { data: wards } = useWards();
  const { data: patients = [] } = usePatients();
  const { data: doctors = [] } = useDoctors();

  const createTriage = useCreateERTriage();
  const updateTriage = useUpdateERTriage();

  // Find the Emergency ward
  const erWard = wards?.find(
    (w) => w.wardType === "Emergency" || w.name.toLowerCase().includes("emerg"),
  );
  const erBeds = erWard
    ? (allBeds?.filter((b) => String(b.wardId) === String(erWard.id)) ?? [])
    : (allBeds ?? []);

  // Stats
  const totalBeds = erBeds.length;
  const availableBeds = erBeds.filter((b) => b.status === "Available").length;
  const occupiedBeds = erBeds.filter((b) => b.status === "Occupied").length;

  const allActive = activeTriages ?? [];
  const sortedTriages = [...allActive].sort((a, b) => {
    const esiDiff = Number(a.esiLevel) - Number(b.esiLevel);
    if (esiDiff !== 0) return esiDiff;
    return Number(a.arrivalTime) - Number(b.arrivalTime);
  });

  // Average wait time (Waiting cases)
  const waitingCases = sortedTriages.filter(
    (t) => t.status === ERStatus.Waiting,
  );
  const avgWait =
    waitingCases.length === 0
      ? 0
      : Math.floor(
          waitingCases.reduce((acc, t) => {
            const arrival = Number(t.arrivalTime) / 1_000_000;
            return acc + (Date.now() - arrival) / 60000;
          }, 0) / waitingCases.length,
        );

  const canTriage =
    user?.role === UserRole.SuperAdmin ||
    user?.role === UserRole.Receptionist ||
    user?.role === UserRole.Nurse ||
    user?.role === UserRole.Doctor;

  async function handleCreateTriage(form: TriageFormData) {
    try {
      await createTriage.mutateAsync({
        patientId: form.patientId ? BigInt(form.patientId) : null,
        esiLevel: BigInt(form.esiLevel),
        chiefComplaint: form.chiefComplaint,
        isTraumaCase: form.isTraumaCase,
        isUnknownPatient: form.isUnknownPatient,
        bedId: form.bedId ? BigInt(form.bedId) : null,
      });
      toast.success(`ESI Level ${form.esiLevel} triage registered`);
      setShowTriageModal(false);
    } catch {
      toast.error("Failed to register triage case");
    }
  }

  async function handleUpdateStatus(id: ERTriageId, status: ERStatus) {
    try {
      const current = sortedTriages.find((t) => t.id === id);
      await updateTriage.mutateAsync({
        id,
        status: status as ERStatus,
        treatedByDoctorId: current?.treatedByDoctorId ?? null,
        bedId: current?.bedId ?? null,
      });
      toast.success(`Case moved to ${status}`);
    } catch {
      toast.error("Failed to update status");
    }
  }

  async function handleAssign(doctorId: string, bedId: string) {
    if (!assignTarget) return;
    try {
      await updateTriage.mutateAsync({
        id: assignTarget.id,
        status: "InTreatment" as ERStatus,
        treatedByDoctorId: doctorId ? BigInt(doctorId) : null,
        bedId: bedId ? BigInt(bedId) : null,
      });
      toast.success("Doctor and bed assigned");
      setAssignTarget(null);
    } catch {
      toast.error("Failed to assign");
    }
  }

  return (
    <div data-ocid="emergency.page" className="space-y-6">
      <PageHeader
        title="Emergency Department"
        description="Real-time ER triage queue, bed map, and critical case management"
        breadcrumb={["Patient Ops", "Emergency"]}
        actions={
          canTriage ? (
            <Button
              type="button"
              variant="destructive"
              onClick={() => setShowTriageModal(true)}
              data-ocid="emergency.add_button"
            >
              <Plus className="h-4 w-4 mr-2" />
              Quick Triage
            </Button>
          ) : undefined
        }
      />

      {/* ── Statistics Bar ── */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        data-ocid="emergency.stats_section"
      >
        {[
          {
            label: "Total ER Beds",
            value: totalBeds,
            icon: BedDouble,
            color: "text-accent",
            bg: "bg-accent/10",
          },
          {
            label: "Available",
            value: availableBeds,
            icon: CheckCircle,
            color: "text-green-400",
            bg: "bg-green-500/10",
          },
          {
            label: "Occupied",
            value: occupiedBeds,
            icon: UserX,
            color: "text-red-400",
            bg: "bg-red-500/10",
          },
          {
            label: "Avg Wait",
            value: `${avgWait}m`,
            icon: Clock,
            color: "text-yellow-400",
            bg: "bg-yellow-500/10",
          },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="bg-card border border-border rounded-xl p-4 flex items-center gap-3"
          >
            <div className={`${bg} p-2 rounded-lg`}>
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground leading-none">
                {value}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Split Layout: Queue | Bed Map ── */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* ─── ER Queue (left / full on mobile) ─── */}
        <div
          className="xl:col-span-3 space-y-3"
          data-ocid="emergency.queue_section"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-foreground">
                Active ER Queue
              </h2>
              <span className="flex items-center gap-1 text-xs text-accent">
                <RefreshCw className="h-3 w-3 animate-spin [animation-duration:8s]" />
                Auto-refresh
              </span>
            </div>
            <div className="flex items-center gap-2">
              {sortedTriages.filter((t) => t.esiLevel === BigInt(1)).length >
                0 && (
                <span className="flex items-center gap-1 text-xs font-bold text-red-400 bg-red-500/15 border border-red-500/30 px-2 py-0.5 rounded-full animate-pulse">
                  <Zap className="h-3 w-3" />
                  {sortedTriages.filter((t) => t.esiLevel === BigInt(1)).length}{" "}
                  Critical
                </span>
              )}
            </div>
          </div>

          {loadingTriages ? (
            <div
              className="space-y-3"
              data-ocid="emergency.queue.loading_state"
            >
              {["sq0", "sq1", "sq2", "sq3"].map((k) => (
                <div
                  key={k}
                  className="p-4 rounded-xl border border-border bg-card"
                >
                  <div className="flex gap-3">
                    <Skeleton className="h-12 w-12 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3 w-60" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : sortedTriages.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 bg-card border border-border rounded-xl text-center"
              data-ocid="emergency.queue.empty_state"
            >
              <div className="h-14 w-14 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                <Activity className="h-7 w-7 text-green-400" />
              </div>
              <p className="font-semibold text-foreground">No Active Cases</p>
              <p className="text-sm text-muted-foreground mt-1">
                The emergency queue is clear
              </p>
              {canTriage && (
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4"
                  onClick={() => setShowTriageModal(true)}
                  data-ocid="emergency.queue.register_button"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Register Triage
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {sortedTriages.map((triage, i) => (
                <TriageRow
                  key={String(triage.id)}
                  triage={triage}
                  index={i}
                  patients={patients}
                  doctors={doctors}
                  erBeds={erBeds}
                  onUpdateStatus={handleUpdateStatus}
                  onAssign={(t) => setAssignTarget(t)}
                  isUpdating={updateTriage.isPending}
                />
              ))}
            </div>
          )}
        </div>

        {/* ─── ER Bed Map (right) ─── */}
        <div className="xl:col-span-2" data-ocid="emergency.bedmap_section">
          <div className="bg-card border border-border rounded-xl p-4 sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BedDouble className="h-4 w-4 text-accent" />
                <h2 className="text-lg font-semibold text-foreground">
                  ER Bed Map
                </h2>
              </div>
              <div className="flex items-center gap-1 text-xs text-accent">
                <RefreshCw className="h-3 w-3 animate-spin [animation-duration:8s]" />
                5s poll
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              {[
                { color: "bg-green-500", label: "Available" },
                { color: "bg-red-500", label: "Occupied" },
                { color: "bg-yellow-500", label: "Maintenance" },
              ].map((l) => (
                <span
                  key={l.label}
                  className="flex items-center gap-1 text-xs text-muted-foreground"
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${l.color}`} />
                  {l.label}
                </span>
              ))}
            </div>

            {loadingBeds ? (
              <div
                className="grid grid-cols-3 gap-2"
                data-ocid="emergency.bedmap.loading_state"
              >
                {[
                  "sb0",
                  "sb1",
                  "sb2",
                  "sb3",
                  "sb4",
                  "sb5",
                  "sb6",
                  "sb7",
                  "sb8",
                ].map((k) => (
                  <Skeleton key={k} className="h-20 rounded-xl" />
                ))}
              </div>
            ) : erBeds.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-10 text-center"
                data-ocid="emergency.bedmap.empty_state"
              >
                <Shield className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  No ER beds configured
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {erBeds.map((bed) => (
                  <BedCard
                    key={String(bed.id)}
                    bed={bed}
                    triages={sortedTriages}
                  />
                ))}
              </div>
            )}

            {/* Summary footer */}
            {erBeds.length > 0 && !loadingBeds && (
              <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 text-center">
                <div>
                  <p className="text-xl font-bold text-green-400">
                    {availableBeds}
                  </p>
                  <p className="text-xs text-muted-foreground">Free</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-red-400">
                    {occupiedBeds}
                  </p>
                  <p className="text-xs text-muted-foreground">Used</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">
                    {totalBeds}
                  </p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      <TriageModal
        open={showTriageModal}
        onClose={() => setShowTriageModal(false)}
        patients={patients}
        erBeds={erBeds}
        isPending={createTriage.isPending}
        onSubmit={handleCreateTriage}
      />

      <AssignDoctorModal
        open={!!assignTarget}
        onClose={() => setAssignTarget(null)}
        triage={assignTarget}
        doctors={doctors}
        erBeds={erBeds}
        isPending={updateTriage.isPending}
        onAssign={handleAssign}
      />
    </div>
  );
}
