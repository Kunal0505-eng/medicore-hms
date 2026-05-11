import type { Bed, Patient, Ward } from "@/backend";
import { PatientStatus } from "@/backend";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useVisitsByPatient } from "@/services/emr";
import { useUpdatePatient } from "@/services/patients";
import {
  AlertTriangle,
  Bed as BedIcon,
  CalendarDays,
  LogOut,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  ShieldCheck,
  User2,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const TABS = [
  "Profile",
  "Medical History",
  "Allergies & Alerts",
  "Admission",
] as const;
type Tab = (typeof TABS)[number];

interface Props {
  patient: Patient;
  wards: Ward[];
  beds: Bed[];
  onClose: () => void;
  onAdmit: () => void;
  onDischarge: () => void;
  onTransfer: () => void;
}

export function PatientProfileDrawer({
  patient,
  wards,
  beds,
  onClose,
  onAdmit,
  onDischarge,
  onTransfer,
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("Profile");

  const ward = useMemo(
    () => wards.find((w) => w.id.toString() === patient.wardId?.toString()),
    [wards, patient.wardId],
  );
  const bed = useMemo(
    () =>
      beds.find((b) => b.id.toString() === patient.admittedBedId?.toString()),
    [beds, patient.admittedBedId],
  );

  return (
    <div
      className="fixed inset-0 z-50 flex"
      // biome-ignore lint/a11y/useSemanticElements: div+role drawer pattern
      role="dialog"
      aria-modal="true"
      aria-label="Patient Profile"
    >
      {/* Backdrop */}
      <div
        className="flex-1 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-hidden="true"
      />
      {/* Drawer panel */}
      <div
        className="w-full max-w-xl bg-card border-l border-border flex flex-col h-full overflow-hidden"
        data-ocid="patient_profile.panel"
      >
        {/* Header */}
        <div className="flex items-start gap-4 p-6 border-b border-border shrink-0">
          <div className="h-14 w-14 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center shrink-0">
            <User2 className="h-7 w-7 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-foreground truncate">
              {patient.firstName} {patient.lastName}
            </h2>
            <p className="text-sm text-muted-foreground">
              MRN:{" "}
              <span className="text-accent font-mono font-medium">
                {patient.mrn}
              </span>
              {" · "}
              {patient.gender} · {patient.bloodGroup}
            </p>
            <div className="mt-1.5">
              <StatusBadge status={patient.status} />
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {patient.status === PatientStatus.OPD && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={onAdmit}
                className="text-xs text-green-400 border-green-500/30 hover:bg-green-500/10"
                data-ocid="patient_profile.admit_button"
              >
                <BedIcon className="h-3 w-3 mr-1" /> Admit
              </Button>
            )}
            {patient.status === PatientStatus.Admitted && (
              <>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={onTransfer}
                  className="text-xs text-accent border-accent/30 hover:bg-accent/10"
                  data-ocid="patient_profile.transfer_button"
                >
                  <RefreshCw className="h-3 w-3 mr-1" /> Transfer
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={onDischarge}
                  className="text-xs"
                  data-ocid="patient_profile.discharge_button"
                >
                  <LogOut className="h-3 w-3 mr-1" /> Discharge
                </Button>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors ml-1"
              aria-label="Close profile"
              data-ocid="patient_profile.close_button"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Allergy banner */}
        {patient.allergies.length > 0 && (
          <div
            className="mx-6 mt-4 flex items-start gap-2 px-4 py-3 rounded-lg bg-destructive/10 border border-destructive/30 shrink-0"
            data-ocid="patient_profile.allergy_banner"
          >
            <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-destructive">
                Allergy Alert
              </p>
              <p className="text-xs text-destructive/80 mt-0.5">
                {patient.allergies.join(", ")}
              </p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-border px-6 mt-4 shrink-0 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              data-ocid={`patient_profile.${tab.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_tab`}
              className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "Profile" && <ProfileTab patient={patient} />}
          {activeTab === "Medical History" && (
            <MedicalHistoryTab patient={patient} />
          )}
          {activeTab === "Allergies & Alerts" && (
            <AllergiesTab patient={patient} />
          )}
          {activeTab === "Admission" && (
            <AdmissionTab patient={patient} ward={ward} bed={bed} />
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Profile Tab ──────────────────────────────────────────────────────────────
function ProfileTab({ patient }: { patient: Patient }) {
  const [isEditing, setIsEditing] = useState(false);
  const updatePatient = useUpdatePatient();

  const [form, setForm] = useState({
    firstName: patient.firstName,
    lastName: patient.lastName,
    phone: patient.phone,
    email: patient.email,
    address: patient.address,
    bloodGroup: patient.bloodGroup,
  });

  const handleSave = async () => {
    try {
      await updatePatient.mutateAsync({
        id: patient.id,
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        email: form.email,
        address: form.address,
        allergies: patient.allergies,
        bloodGroup: form.bloodGroup,
        insuranceId: patient.insuranceId ?? null,
        insuranceProvider: patient.insuranceProvider ?? null,
      });
      toast.success("Patient profile updated.");
      setIsEditing(false);
    } catch (_err) {
      toast.error("Failed to update patient.");
    }
  };

  const age = useMemo(() => {
    if (!patient.dob) return "—";
    const diff = Date.now() - new Date(patient.dob).getTime();
    return `${Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000))} yrs`;
  }, [patient.dob]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Demographics</h3>
        {!isEditing ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            data-ocid="patient_profile.edit_button"
          >
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(false)}
              data-ocid="patient_profile.cancel_edit_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleSave}
              disabled={updatePatient.isPending}
              data-ocid="patient_profile.save_button"
            >
              {updatePatient.isPending ? "Saving…" : "Save"}
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        {isEditing ? (
          <>
            <EditField
              label="First Name"
              value={form.firstName}
              onChange={(v) => setForm((p) => ({ ...p, firstName: v }))}
            />
            <EditField
              label="Last Name"
              value={form.lastName}
              onChange={(v) => setForm((p) => ({ ...p, lastName: v }))}
            />
            <EditField
              label="Phone"
              value={form.phone}
              onChange={(v) => setForm((p) => ({ ...p, phone: v }))}
            />
            <EditField
              label="Email"
              value={form.email}
              onChange={(v) => setForm((p) => ({ ...p, email: v }))}
            />
            <div className="col-span-2">
              <EditField
                label="Address"
                value={form.address}
                onChange={(v) => setForm((p) => ({ ...p, address: v }))}
              />
            </div>
          </>
        ) : (
          <>
            <InfoRow
              label="Full Name"
              value={`${patient.firstName} ${patient.lastName}`}
            />
            <InfoRow label="Date of Birth" value={patient.dob} />
            <InfoRow label="Age" value={age} />
            <InfoRow label="Gender" value={patient.gender} />
            <InfoRow label="Blood Group" value={patient.bloodGroup} highlight />
            <InfoRow label="MRN" value={patient.mrn} mono />
          </>
        )}
      </div>

      <div className="pt-4 border-t border-border space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Contact</h3>
        <div className="space-y-2">
          <DetailRow icon={Phone} label={patient.phone} />
          <DetailRow icon={Mail} label={patient.email || "—"} />
          <DetailRow icon={MapPin} label={patient.address || "—"} />
        </div>
      </div>

      {(patient.insuranceProvider || patient.insuranceId) && (
        <div className="pt-4 border-t border-border space-y-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-accent" /> Insurance
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <InfoRow
              label="Provider"
              value={patient.insuranceProvider ?? "—"}
            />
            <InfoRow label="ID" value={patient.insuranceId ?? "—"} mono />
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-border space-y-3">
        <h3 className="text-sm font-semibold text-foreground">
          Emergency Contact
        </h3>
        <p className="text-sm text-foreground">
          {patient.emergencyContact || "—"}
        </p>
      </div>
    </div>
  );
}

// ─── Medical History Tab ─────────────────────────────────────────────────────
function MedicalHistoryTab({ patient }: { patient: Patient }) {
  const { data: visits = [], isLoading } = useVisitsByPatient(patient.id);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {["v1", "v2", "v3"].map((k) => (
          <div key={k} className="h-16 bg-muted/30 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (visits.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-12 text-center"
        data-ocid="patient_profile.history_empty_state"
      >
        <ClipboardListIcon className="h-10 w-10 text-muted-foreground mb-3" />
        <p className="text-foreground font-medium">No visit history</p>
        <p className="text-sm text-muted-foreground">
          This patient has no recorded visits yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {visits.map((visit, i) => (
        <div
          key={visit.id.toString()}
          className="p-4 rounded-lg border border-border bg-muted/10 hover:bg-muted/20 transition-colors"
          data-ocid={`patient_profile.visit_item.${i + 1}`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {visit.chiefComplaint}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {new Date(
                  Number(visit.visitDate) / 1_000_000,
                ).toLocaleDateString()}
              </p>
            </div>
            <span className="text-xs text-muted-foreground shrink-0">
              {visit.prescriptions.length} Rx
            </span>
          </div>
          {visit.diagnoses.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {visit.diagnoses.slice(0, 3).map((d) => (
                <span
                  key={d.icd10Code}
                  className="text-xs px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30"
                >
                  {d.icd10Code}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Allergies & Alerts Tab ───────────────────────────────────────────────────
function AllergiesTab({ patient }: { patient: Patient }) {
  const updatePatient = useUpdatePatient();
  const [allergyInput, setAllergyInput] = useState("");
  const [localAllergies, setLocalAllergies] = useState<string[]>(
    patient.allergies,
  );

  const addAllergy = async () => {
    const val = allergyInput.trim();
    if (!val || localAllergies.includes(val)) return;
    const updated = [...localAllergies, val];
    setLocalAllergies(updated);
    setAllergyInput("");
    try {
      await updatePatient.mutateAsync({
        id: patient.id,
        firstName: patient.firstName,
        lastName: patient.lastName,
        phone: patient.phone,
        email: patient.email,
        address: patient.address,
        allergies: updated,
        bloodGroup: patient.bloodGroup,
        insuranceId: patient.insuranceId ?? null,
        insuranceProvider: patient.insuranceProvider ?? null,
      });
      toast.success("Allergy added.");
    } catch (_err) {
      toast.error("Failed to save.");
      setLocalAllergies(patient.allergies);
    }
  };

  const removeAllergy = async (a: string) => {
    const updated = localAllergies.filter((x) => x !== a);
    setLocalAllergies(updated);
    try {
      await updatePatient.mutateAsync({
        id: patient.id,
        firstName: patient.firstName,
        lastName: patient.lastName,
        phone: patient.phone,
        email: patient.email,
        address: patient.address,
        allergies: updated,
        bloodGroup: patient.bloodGroup,
        insuranceId: patient.insuranceId ?? null,
        insuranceProvider: patient.insuranceProvider ?? null,
      });
      toast.success("Allergy removed.");
    } catch (_err) {
      toast.error("Failed to save.");
      setLocalAllergies(patient.allergies);
    }
  };

  return (
    <div className="space-y-4">
      {localAllergies.length > 0 && (
        <div
          className="p-4 rounded-lg bg-destructive/10 border border-destructive/30"
          data-ocid="patient_profile.allergy_alert_box"
        >
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <span className="text-sm font-semibold text-destructive">
              Known Allergies ({localAllergies.length})
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {localAllergies.map((a) => (
              <span
                key={a}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-destructive/15 text-destructive border border-destructive/30"
              >
                {a}
                <button
                  type="button"
                  onClick={() => removeAllergy(a)}
                  className="hover:opacity-70 transition-opacity"
                  aria-label={`Remove ${a} allergy`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {localAllergies.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-8 text-center"
          data-ocid="patient_profile.no_allergies_state"
        >
          <ShieldCheck className="h-10 w-10 text-green-400 mb-3" />
          <p className="text-foreground font-medium">No Known Allergies</p>
          <p className="text-sm text-muted-foreground">
            This patient has no recorded allergies.
          </p>
        </div>
      )}

      <div className="pt-4 border-t border-border">
        <Label className="text-xs text-muted-foreground mb-2 block">
          Add New Allergy
        </Label>
        <div className="flex gap-2">
          <Input
            value={allergyInput}
            onChange={(e) => setAllergyInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addAllergy();
              }
            }}
            placeholder="e.g. Penicillin"
            data-ocid="patient_profile.allergy_input"
          />
          <Button
            type="button"
            variant="outline"
            onClick={addAllergy}
            disabled={updatePatient.isPending}
            data-ocid="patient_profile.add_allergy_button"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Admission Tab ────────────────────────────────────────────────────────────
function AdmissionTab({
  patient,
  ward,
  bed,
}: { patient: Patient; ward: Ward | undefined; bed: Bed | undefined }) {
  if (
    patient.status !== PatientStatus.Admitted &&
    patient.status !== PatientStatus.Transferred
  ) {
    return (
      <div
        className="flex flex-col items-center justify-center py-12 text-center"
        data-ocid="patient_profile.not_admitted_state"
      >
        <BedIcon className="h-10 w-10 text-muted-foreground mb-3" />
        <p className="text-foreground font-medium">Not Currently Admitted</p>
        <p className="text-sm text-muted-foreground">
          This patient is an OPD patient or has been discharged.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <InfoRow label="Status" value={patient.status} />
        <InfoRow label="Ward" value={ward?.name ?? "—"} />
        <InfoRow label="Ward Type" value={ward?.wardType ?? "—"} />
        <InfoRow label="Bed Number" value={bed?.bedNumber ?? "—"} highlight />
        <InfoRow
          label="Admitted"
          value={
            patient.admissionDate
              ? new Date(
                  Number(patient.admissionDate) / 1_000_000,
                ).toLocaleString()
              : "—"
          }
        />
        <InfoRow
          label="Discharge Date"
          value={
            patient.dischargeDate
              ? new Date(
                  Number(patient.dischargeDate) / 1_000_000,
                ).toLocaleString()
              : "—"
          }
        />
      </div>

      {bed && (
        <div className="p-4 rounded-lg border border-border bg-muted/10 space-y-2">
          <div className="flex items-center gap-2">
            <BedIcon className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-foreground">
              Bed Details
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <InfoRow label="Bed #" value={bed.bedNumber} />
            <InfoRow label="Status" value={bed.status} />
            <InfoRow label="Housekeeping" value={bed.housekeepingStatus} />
            {bed.notes && <InfoRow label="Notes" value={bed.notes} />}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function InfoRow({
  label,
  value,
  highlight,
  mono,
}: { label: string; value: string; highlight?: boolean; mono?: boolean }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className={`text-sm mt-0.5 ${
          highlight
            ? "font-bold text-accent"
            : mono
              ? "font-mono text-accent"
              : "text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
}: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
      <span className="text-sm text-foreground break-all">{label}</span>
    </div>
  );
}

function EditField({
  label,
  value,
  onChange,
}: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function ClipboardListIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>Clipboard list icon</title>
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  );
}
