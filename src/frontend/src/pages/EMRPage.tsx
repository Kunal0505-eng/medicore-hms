import type {
  Diagnosis,
  Patient,
  Prescription,
  SOAPNotes,
  Visit,
  VitalSigns,
} from "@/backend";
import { DiagnosisType, PrescriptionStatus } from "@/backend";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import {
  useCreateVisit,
  usePrescriptionsByPatient,
  useUpdateVisit,
  useVisitsByPatient,
} from "@/services/emr";
import { usePatients } from "@/services/patients";
import { useDrugs } from "@/services/pharmacy";
import { useDoctors } from "@/services/staff";
import {
  Activity,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  FileText,
  Pill,
  Plus,
  Search,
  Stethoscope,
  Trash2,
  User,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// ────────────────────────────────────────────────────────────────
// ICD-10 codes
// ────────────────────────────────────────────────────────────────
const ICD10_CODES = [
  { code: "J00", desc: "Common Cold" },
  { code: "I10", desc: "Essential Hypertension" },
  { code: "E11", desc: "Type 2 Diabetes Mellitus" },
  { code: "J18", desc: "Pneumonia, unspecified" },
  { code: "K21", desc: "Gastro-esophageal Reflux" },
  { code: "M54.5", desc: "Low Back Pain" },
  { code: "J45", desc: "Asthma" },
  { code: "N39.0", desc: "Urinary Tract Infection" },
  { code: "K29", desc: "Gastritis" },
  { code: "A09", desc: "Infectious Diarrhea" },
  { code: "B34", desc: "Viral Infection" },
  { code: "F32", desc: "Depressive Episode" },
  { code: "E78", desc: "Hyperlipidemia" },
  { code: "I25", desc: "Chronic Ischemic Heart Disease" },
  { code: "J06", desc: "Acute Upper Respiratory Infection" },
  { code: "K80", desc: "Cholelithiasis (Gallstones)" },
  { code: "N18", desc: "Chronic Kidney Disease" },
  { code: "I63", desc: "Cerebral Infarction (Stroke)" },
  { code: "C34", desc: "Malignant Neoplasm of Bronchus/Lung" },
  { code: "G43", desc: "Migraine" },
  { code: "E10", desc: "Type 1 Diabetes Mellitus" },
  { code: "H10", desc: "Conjunctivitis" },
  { code: "L50", desc: "Urticaria (Hives)" },
  { code: "M10", desc: "Gout" },
  { code: "J30", desc: "Allergic Rhinitis" },
  { code: "R51", desc: "Headache" },
  { code: "R05", desc: "Cough" },
  { code: "R50", desc: "Fever of Unknown Origin" },
  { code: "K35", desc: "Acute Appendicitis" },
  { code: "S72", desc: "Fracture of Femur" },
  { code: "T14", desc: "Injury of Unspecified Body Region" },
  { code: "Z23", desc: "Immunization Encounter" },
  { code: "O80", desc: "Normal Delivery" },
  { code: "P07", desc: "Disorders Related to Short Gestation" },
  { code: "D50", desc: "Iron Deficiency Anemia" },
  { code: "B01", desc: "Varicella (Chickenpox)" },
  { code: "B06", desc: "Rubella (German Measles)" },
  { code: "A15", desc: "Respiratory Tuberculosis" },
  { code: "B50", desc: "Plasmodium Falciparum Malaria" },
  { code: "J44", desc: "COPD" },
  { code: "I50", desc: "Heart Failure" },
  { code: "G20", desc: "Parkinson's Disease" },
  { code: "G30", desc: "Alzheimer's Disease" },
  { code: "M05", desc: "Rheumatoid Arthritis" },
  { code: "K50", desc: "Crohn's Disease" },
  { code: "K51", desc: "Ulcerative Colitis" },
  { code: "E03", desc: "Hypothyroidism" },
  { code: "E05", desc: "Hyperthyroidism" },
  { code: "C18", desc: "Malignant Neoplasm of Colon" },
  { code: "C50", desc: "Malignant Neoplasm of Breast" },
];

const FREQUENCIES = [
  "OD",
  "BD",
  "TDS",
  "QID",
  "SOS",
  "Stat",
  "Weekly",
  "Fortnightly",
];

// ────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────
function calcAge(dob: string) {
  if (!dob) return "?";
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
}

function formatDate(ts: bigint) {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ────────────────────────────────────────────────────────────────
// PatientBanner
// ────────────────────────────────────────────────────────────────
function PatientBanner({ patient }: { patient: Patient }) {
  const age = calcAge(patient.dob);
  return (
    <div className="bg-card border border-border rounded-xl p-5 mb-5">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/30 shrink-0">
          <User className="h-7 w-7 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-bold text-foreground font-display">
              {patient.firstName} {patient.lastName}
            </h2>
            <span className="text-xs font-mono bg-muted/40 border border-border px-2 py-0.5 rounded text-muted-foreground">
              MRN: {patient.mrn}
            </span>
            <StatusBadge status={patient.status} />
          </div>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
            <span>
              <span className="font-medium text-foreground">Age:</span> {age}{" "}
              yrs
            </span>
            <span>
              <span className="font-medium text-foreground">Gender:</span>{" "}
              {patient.gender}
            </span>
            <span>
              <span className="font-medium text-foreground">Blood Group:</span>{" "}
              <span className="text-red-400 font-semibold">
                {patient.bloodGroup}
              </span>
            </span>
            <span>
              <span className="font-medium text-foreground">DOB:</span>{" "}
              {patient.dob}
            </span>
            {patient.insuranceProvider && (
              <span>
                <span className="font-medium text-foreground">Insurance:</span>{" "}
                {patient.insuranceProvider}
              </span>
            )}
          </div>
          {/* Allergy badges */}
          {patient.allergies.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1.5 mt-3">
              <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
              <span className="text-xs font-semibold text-red-500">
                ALLERGIES:
              </span>
              {patient.allergies.map((a) => (
                <Badge
                  key={a}
                  className="bg-red-500/15 text-red-400 border-red-500/40 text-xs"
                  variant="outline"
                >
                  {a}
                </Badge>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-xs text-muted-foreground">
                No known drug allergies
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// VisitCard
// ────────────────────────────────────────────────────────────────
function VisitCard({
  visit,
  doctorName,
  canEdit,
  onEdit,
}: {
  visit: Visit;
  doctorName: string;
  canEdit: boolean;
  onEdit: (v: Visit) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card/50">
      <button
        type="button"
        className="w-full flex items-center justify-between p-4 hover:bg-muted/20 transition-colors text-left"
        onClick={() => setExpanded((x) => !x)}
        data-ocid="emr.visit_row.toggle"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 min-w-0">
          <span className="text-xs font-mono text-muted-foreground shrink-0">
            {formatDate(visit.visitDate)}
          </span>
          <span className="font-medium text-foreground truncate">
            {visit.chiefComplaint}
          </span>
          <div className="flex flex-wrap gap-1">
            {visit.diagnoses.slice(0, 2).map((d) => (
              <Badge
                key={`${d.icd10Code}-${d.description}`}
                variant="outline"
                className="text-xs bg-accent/10 border-accent/30 text-accent"
              >
                {d.icd10Code}
              </Badge>
            ))}
            {visit.diagnoses.length > 2 && (
              <Badge
                variant="outline"
                className="text-xs text-muted-foreground"
              >
                +{visit.diagnoses.length - 2}
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:block text-xs text-muted-foreground">
            {doctorName}
          </span>
          {expanded ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* SOAP Notes */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              SOAP Notes
            </h4>
            {(
              [
                ["S", "Subjective", visit.soapNotes.subjective],
                ["O", "Objective", visit.soapNotes.objective],
                ["A", "Assessment", visit.soapNotes.assessment],
                ["P", "Plan", visit.soapNotes.plan],
              ] as [string, string, string][]
            ).map(([code, label, text]) => (
              <div key={code} className="mb-2.5">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="w-5 h-5 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                    {code}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {label}
                  </span>
                </div>
                <p className="text-sm text-foreground pl-6 leading-relaxed">
                  {text || (
                    <span className="text-muted-foreground italic">
                      Not recorded
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>

          {/* Diagnoses */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Diagnoses
            </h4>
            {visit.diagnoses.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">
                No diagnoses recorded
              </p>
            ) : (
              <ul className="space-y-1.5">
                {visit.diagnoses.map((d) => (
                  <li
                    key={`${d.icd10Code}-${d.diagnosisType}`}
                    className="flex items-center gap-2 text-sm"
                  >
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        d.diagnosisType === DiagnosisType.Primary
                          ? "bg-accent/15 text-accent border-accent/40"
                          : "bg-muted/30 text-muted-foreground border-border"
                      }`}
                    >
                      {d.diagnosisType}
                    </Badge>
                    <span className="font-mono text-xs text-muted-foreground">
                      {d.icd10Code}
                    </span>
                    <span className="text-foreground">{d.description}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Vitals */}
            {visit.vitals && (
              <>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 mt-5">
                  Vital Signs
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      ["BP", visit.vitals.bp],
                      ["Temp", `${visit.vitals.temperature}°C`],
                      ["SpO2", `${visit.vitals.spo2}%`],
                      ["Pulse", `${visit.vitals.pulse} bpm`],
                      ["Weight", `${visit.vitals.weight} kg`],
                      ["Height", `${visit.vitals.height} cm`],
                    ] as [string, string][]
                  ).map(([label, val]) => (
                    <div
                      key={label}
                      className="bg-muted/20 rounded-lg p-2 text-center border border-border/50"
                    >
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="text-sm font-semibold text-foreground">
                        {val}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Prescriptions */}
          {visit.prescriptions.length > 0 && (
            <div className="lg:col-span-2">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                Prescriptions
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      {[
                        "Drug",
                        "Dose",
                        "Form",
                        "Frequency",
                        "Duration",
                        "Status",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left text-xs text-muted-foreground font-medium py-1.5 pr-4"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {visit.prescriptions.map((rx, i) => (
                      <tr
                        key={`rx-${visit.id.toString()}-${i}`}
                        className="border-b border-border/50 last:border-0"
                      >
                        <td className="py-2 pr-4 font-medium text-foreground">
                          {rx.drugName}
                        </td>
                        <td className="py-2 pr-4 text-muted-foreground">
                          {rx.dose}
                        </td>
                        <td className="py-2 pr-4 text-muted-foreground">
                          {rx.dosageForm}
                        </td>
                        <td className="py-2 pr-4 text-muted-foreground">
                          {rx.frequency}
                        </td>
                        <td className="py-2 pr-4 text-muted-foreground">
                          {rx.duration} days
                        </td>
                        <td className="py-2">
                          <StatusBadge status={rx.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {canEdit && (
            <div className="lg:col-span-2 flex justify-end">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => onEdit(visit)}
                data-ocid="emr.visit.edit_button"
              >
                Edit Visit
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// PrescriptionRow builder
// ────────────────────────────────────────────────────────────────
interface RxRow {
  key: string;
  drugName: string;
  dose: string;
  frequency: string;
  duration: string;
  dosageForm: string;
  notes: string;
}

const NEW_RX = (): RxRow => ({
  key: `rx-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  drugName: "",
  dose: "",
  frequency: "OD",
  duration: "5",
  dosageForm: "Tablet",
  notes: "",
});

// ────────────────────────────────────────────────────────────────
// VisitForm (create / edit)
// ────────────────────────────────────────────────────────────────
function VisitForm({
  patientId,
  patientAllergies,
  editVisit,
  onClose,
}: {
  patientId: bigint;
  patientAllergies: string[];
  editVisit: Visit | null;
  onClose: () => void;
}) {
  const { user: _formUser } = useAuth();
  const { data: doctors } = useDoctors();
  const { data: drugs } = useDrugs();

  const createVisit = useCreateVisit();
  const updateVisit = useUpdateVisit();

  const isEdit = !!editVisit;

  // Form state
  const [chiefComplaint, setChiefComplaint] = useState(
    editVisit?.chiefComplaint ?? "",
  );
  const [soap, setSoap] = useState<SOAPNotes>(
    editVisit?.soapNotes ?? {
      subjective: "",
      objective: "",
      assessment: "",
      plan: "",
    },
  );
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>(
    editVisit?.diagnoses ?? [],
  );
  const [rxRows, setRxRows] = useState<RxRow[]>(
    editVisit?.prescriptions.map((p, i) => ({
      key: `existing-${i}`,
      drugName: p.drugName,
      dose: p.dose,
      frequency: p.frequency,
      duration: p.duration,
      dosageForm: p.dosageForm,
      notes: p.notes ?? "",
    })) ?? [NEW_RX()],
  );

  // Vitals
  const [vitals, setVitals] = useState({
    bpSys: editVisit?.vitals?.bp.split("/")[0] ?? "",
    bpDia: editVisit?.vitals?.bp.split("/")[1] ?? "",
    temperature: editVisit?.vitals?.temperature ?? "",
    spo2: editVisit?.vitals?.spo2 ?? "",
    pulse: editVisit?.vitals?.pulse ?? "",
    weight: editVisit?.vitals?.weight ?? "",
    height: editVisit?.vitals?.height ?? "",
  });

  const [selectedDoctor, setSelectedDoctor] = useState<string>(
    editVisit?.doctorId.toString() ?? "",
  );
  const [icdSearch, setIcdSearch] = useState("");

  // Allergy alert
  const allergyAlerts = useMemo(() => {
    if (!patientAllergies.length) return [];
    return rxRows
      .filter((rx) =>
        patientAllergies.some(
          (a) =>
            rx.drugName.toLowerCase().includes(a.toLowerCase()) ||
            a.toLowerCase().includes(rx.drugName.toLowerCase()),
        ),
      )
      .map((rx) => rx.drugName);
  }, [rxRows, patientAllergies]);

  const filteredICD = useMemo(
    () =>
      ICD10_CODES.filter(
        (c) =>
          c.code.toLowerCase().includes(icdSearch.toLowerCase()) ||
          c.desc.toLowerCase().includes(icdSearch.toLowerCase()),
      ).slice(0, 15),
    [icdSearch],
  );

  function addDiagnosis(code: string, desc: string) {
    if (diagnoses.find((d) => d.icd10Code === code)) return;
    const isPrimary = diagnoses.length === 0;
    setDiagnoses((prev) => [
      ...prev,
      {
        icd10Code: code,
        description: desc,
        diagnosisType: isPrimary
          ? DiagnosisType.Primary
          : DiagnosisType.Secondary,
      },
    ]);
    setIcdSearch("");
  }

  function toggleDiagnosisType(idx: number) {
    setDiagnoses((prev) =>
      prev.map((d, i) =>
        i === idx
          ? {
              ...d,
              diagnosisType:
                d.diagnosisType === DiagnosisType.Primary
                  ? DiagnosisType.Secondary
                  : DiagnosisType.Primary,
            }
          : d,
      ),
    );
  }

  function removeDiagnosis(idx: number) {
    setDiagnoses((prev) => prev.filter((_, i) => i !== idx));
  }

  function updateRx(key: string, field: keyof RxRow, value: string) {
    setRxRows((prev) =>
      prev.map((r) => (r.key === key ? { ...r, [field]: value } : r)),
    );
  }

  function removeRx(key: string) {
    setRxRows((prev) => prev.filter((r) => r.key !== key));
  }

  async function handleSubmit() {
    if (!chiefComplaint.trim()) {
      toast.error("Chief complaint is required");
      return;
    }
    const builtVitals: VitalSigns | null =
      vitals.bpSys && vitals.bpDia && vitals.pulse
        ? {
            bp: `${vitals.bpSys}/${vitals.bpDia}`,
            temperature: vitals.temperature,
            spo2: vitals.spo2,
            pulse: vitals.pulse,
            weight: vitals.weight,
            height: vitals.height,
            recordedAt: BigInt(Date.now()),
          }
        : null;

    const prescriptions: Prescription[] = rxRows
      .filter((r) => r.drugName.trim())
      .map((r) => ({
        drugName: r.drugName,
        dose: r.dose,
        frequency: r.frequency,
        duration: r.duration,
        dosageForm: r.dosageForm,
        notes: r.notes || undefined,
        status: PrescriptionStatus.Pending,
        drugId: undefined,
      }));

    try {
      if (isEdit) {
        await updateVisit.mutateAsync({
          id: editVisit.id,
          soapNotes: soap,
          diagnoses,
          prescriptions,
          vitals: builtVitals,
        });
        toast.success("Visit updated successfully");
      } else {
        const doctorId = selectedDoctor ? BigInt(selectedDoctor) : BigInt(1);
        await createVisit.mutateAsync({
          patientId,
          doctorId,
          chiefComplaint,
          soapNotes: soap,
          diagnoses,
          prescriptions,
          vitals: builtVitals,
        });
        toast.success("Visit created successfully");
      }
      onClose();
    } catch (_err) {
      toast.error(isEdit ? "Failed to update visit" : "Failed to create visit");
    }
  }

  const isPending = createVisit.isPending || updateVisit.isPending;

  return (
    <div className="space-y-6">
      {/* Allergy Alert Banner */}
      {allergyAlerts.length > 0 && (
        <div
          className="flex items-start gap-3 bg-red-500/10 border border-red-500/40 rounded-lg p-3"
          data-ocid="emr.allergy_alert"
        >
          <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-red-500">ALLERGY ALERT</p>
            <p className="text-sm text-red-400">
              Patient is allergic to:{" "}
              <strong>{allergyAlerts.join(", ")}</strong>
            </p>
          </div>
        </div>
      )}

      {/* Chief Complaint */}
      {!isEdit && (
        <div className="space-y-1.5">
          <Label htmlFor="chief-complaint">Chief Complaint *</Label>
          <Input
            id="chief-complaint"
            placeholder="e.g. Fever and cough for 3 days"
            value={chiefComplaint}
            onChange={(e) => setChiefComplaint(e.target.value)}
            data-ocid="emr.chief_complaint.input"
          />
        </div>
      )}

      {/* Doctor Selector (create only) */}
      {!isEdit && (
        <div className="space-y-1.5">
          <Label htmlFor="doctor-select">Attending Doctor</Label>
          <select
            id="doctor-select"
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            data-ocid="emr.doctor.select"
          >
            <option value="">-- Select Doctor --</option>
            {doctors?.map((d) => (
              <option key={d.id.toString()} value={d.id.toString()}>
                Dr. {d.specialization} (ID: {d.id.toString()})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* SOAP Notes */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <ClipboardList className="h-4 w-4 text-accent" /> SOAP Notes
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(
            [
              [
                "subjective",
                "S — Subjective",
                "Patient's description of symptoms",
              ],
              ["objective", "O — Objective", "Examination findings"],
              [
                "assessment",
                "A — Assessment",
                "Clinical diagnosis / impression",
              ],
              ["plan", "P — Plan", "Treatment plan"],
            ] as [keyof SOAPNotes, string, string][]
          ).map(([field, label, placeholder]) => (
            <div key={field} className="space-y-1">
              <Label htmlFor={`soap-${field}`} className="text-xs">
                {label}
              </Label>
              <Textarea
                id={`soap-${field}`}
                placeholder={placeholder}
                rows={3}
                value={soap[field]}
                onChange={(e) =>
                  setSoap((s) => ({ ...s, [field]: e.target.value }))
                }
                className="resize-none text-sm"
                data-ocid={`emr.soap_${field}.textarea`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Diagnoses */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Stethoscope className="h-4 w-4 text-accent" /> Diagnoses (ICD-10)
        </h3>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9 text-sm"
            placeholder="Search ICD-10 code or description…"
            value={icdSearch}
            onChange={(e) => setIcdSearch(e.target.value)}
            data-ocid="emr.icd_search.input"
          />
        </div>
        {icdSearch && (
          <div className="border border-border rounded-lg overflow-hidden mb-3 max-h-40 overflow-y-auto">
            {filteredICD.length === 0 ? (
              <p className="text-sm text-muted-foreground p-3">
                No codes found
              </p>
            ) : (
              filteredICD.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  className="w-full text-left px-3 py-2 text-sm hover:bg-accent/10 transition-colors flex items-center gap-2"
                  onClick={() => addDiagnosis(c.code, c.desc)}
                >
                  <span className="font-mono text-xs text-accent font-semibold min-w-[4rem]">
                    {c.code}
                  </span>
                  <span className="text-foreground">{c.desc}</span>
                </button>
              ))
            )}
          </div>
        )}
        {diagnoses.length > 0 && (
          <ul className="space-y-1.5">
            {diagnoses.map((d, i) => (
              <li
                key={`diag-${d.icd10Code}-${i}`}
                className="flex items-center gap-2 text-sm bg-muted/20 rounded-lg px-3 py-2"
                data-ocid={`emr.diagnosis.item.${i + 1}`}
              >
                <button
                  type="button"
                  onClick={() => toggleDiagnosisType(i)}
                  className={`text-xs px-2 py-0.5 rounded-full border font-medium transition-colors ${
                    d.diagnosisType === DiagnosisType.Primary
                      ? "bg-accent/20 text-accent border-accent/40"
                      : "bg-muted/30 text-muted-foreground border-border hover:bg-accent/10"
                  }`}
                >
                  {d.diagnosisType}
                </button>
                <span className="font-mono text-xs text-muted-foreground">
                  {d.icd10Code}
                </span>
                <span className="flex-1 text-foreground">{d.description}</span>
                <button
                  type="button"
                  onClick={() => removeDiagnosis(i)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                  aria-label="Remove diagnosis"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Vital Signs */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Activity className="h-4 w-4 text-accent" /> Vital Signs
          <span className="text-xs font-normal text-muted-foreground">
            (leave blank if not taken)
          </span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="space-y-1 col-span-2">
            <Label className="text-xs">Blood Pressure (mmHg)</Label>
            <div className="flex items-center gap-1">
              <Input
                placeholder="Systolic"
                value={vitals.bpSys}
                onChange={(e) =>
                  setVitals((v) => ({ ...v, bpSys: e.target.value }))
                }
                className="text-sm"
                data-ocid="emr.vitals.bp_sys.input"
              />
              <span className="text-muted-foreground">/</span>
              <Input
                placeholder="Diastolic"
                value={vitals.bpDia}
                onChange={(e) =>
                  setVitals((v) => ({ ...v, bpDia: e.target.value }))
                }
                className="text-sm"
                data-ocid="emr.vitals.bp_dia.input"
              />
            </div>
          </div>
          {(
            [
              ["temperature", "Temperature (°C)", "emr.vitals.temp.input"],
              ["spo2", "SpO2 (%)", "emr.vitals.spo2.input"],
              ["pulse", "Pulse (bpm)", "emr.vitals.pulse.input"],
              ["weight", "Weight (kg)", "emr.vitals.weight.input"],
              ["height", "Height (cm)", "emr.vitals.height.input"],
            ] as [keyof typeof vitals, string, string][]
          ).map(([field, label, ocid]) => (
            <div key={field} className="space-y-1">
              <Label className="text-xs">{label}</Label>
              <Input
                placeholder="—"
                value={vitals[field]}
                onChange={(e) =>
                  setVitals((v) => ({ ...v, [field]: e.target.value }))
                }
                className="text-sm"
                data-ocid={ocid}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Prescriptions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Pill className="h-4 w-4 text-accent" /> Prescriptions
          </h3>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setRxRows((prev) => [...prev, NEW_RX()])}
            data-ocid="emr.add_rx.button"
          >
            <Plus className="h-3.5 w-3.5 mr-1" /> Add Drug
          </Button>
        </div>
        <div className="space-y-3">
          {rxRows.map((rx, i) => (
            <div
              key={rx.key}
              className="bg-muted/20 border border-border/60 rounded-lg p-3"
              data-ocid={`emr.rx.item.${i + 1}`}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <Label className="text-xs">Drug Name *</Label>
                  <div className="relative">
                    <Input
                      list={`drugs-list-${rx.key}`}
                      placeholder="Start typing…"
                      value={rx.drugName}
                      onChange={(e) =>
                        updateRx(rx.key, "drugName", e.target.value)
                      }
                      className="text-sm"
                      data-ocid={`emr.rx.drug_name.${i + 1}`}
                    />
                    <datalist id={`drugs-list-${rx.key}`}>
                      {drugs?.map((d) => (
                        <option key={d.id.toString()} value={d.name} />
                      ))}
                    </datalist>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Dose</Label>
                  <Input
                    placeholder="e.g. 500mg"
                    value={rx.dose}
                    onChange={(e) => updateRx(rx.key, "dose", e.target.value)}
                    className="text-sm"
                    data-ocid={`emr.rx.dose.${i + 1}`}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Dosage Form</Label>
                  <select
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                    value={rx.dosageForm}
                    onChange={(e) =>
                      updateRx(rx.key, "dosageForm", e.target.value)
                    }
                    data-ocid={`emr.rx.form.${i + 1}`}
                  >
                    {[
                      "Tablet",
                      "Capsule",
                      "Injection",
                      "Syrup",
                      "Drops",
                      "Cream",
                      "Inhaler",
                      "Patch",
                    ].map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Frequency</Label>
                  <select
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                    value={rx.frequency}
                    onChange={(e) =>
                      updateRx(rx.key, "frequency", e.target.value)
                    }
                    data-ocid={`emr.rx.freq.${i + 1}`}
                  >
                    {FREQUENCIES.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Duration (days)</Label>
                  <Input
                    placeholder="7"
                    value={rx.duration}
                    onChange={(e) =>
                      updateRx(rx.key, "duration", e.target.value)
                    }
                    className="text-sm"
                    data-ocid={`emr.rx.duration.${i + 1}`}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Notes</Label>
                  <Input
                    placeholder="Take after meals"
                    value={rx.notes}
                    onChange={(e) => updateRx(rx.key, "notes", e.target.value)}
                    className="text-sm"
                    data-ocid={`emr.rx.notes.${i + 1}`}
                  />
                </div>
              </div>
              {rxRows.length > 1 && (
                <button
                  type="button"
                  className="mt-2 text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
                  onClick={() => removeRx(rx.key)}
                  data-ocid={`emr.rx.delete_button.${i + 1}`}
                >
                  <Trash2 className="h-3 w-3" /> Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-3 pt-2 border-t border-border">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          data-ocid="emr.visit_form.cancel_button"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isPending}
          data-ocid="emr.visit_form.submit_button"
        >
          {isPending ? "Saving…" : isEdit ? "Update Visit" : "Create Visit"}
        </Button>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// PastPrescriptions tab
// ────────────────────────────────────────────────────────────────
function PastPrescriptionsTab({ patientId }: { patientId: bigint }) {
  const { data: allRx, isLoading } = usePrescriptionsByPatient(patientId);
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      (allRx ?? []).filter((rx) =>
        rx.drugName.toLowerCase().includes(search.toLowerCase()),
      ),
    [allRx, search],
  );

  if (isLoading) {
    return (
      <div className="space-y-2">
        {["s-p-1", "s-p-2", "s-p-3"].map((k) => (
          <Skeleton key={k} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Search prescriptions by drug name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-ocid="emr.rx_search.input"
        />
      </div>
      {filtered.length === 0 ? (
        <div
          className="text-center py-10 text-muted-foreground"
          data-ocid="emr.rx.empty_state"
        >
          <Pill className="h-8 w-8 mx-auto mb-2 opacity-40" />
          <p>No prescriptions found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {[
                  "Drug",
                  "Dose",
                  "Form",
                  "Frequency",
                  "Duration",
                  "Status",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs text-muted-foreground font-medium py-2 pr-4"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((rx, i) => (
                <tr
                  key={`all-rx-${rx.drugName}-${rx.frequency}`}
                  className="border-b border-border/50 last:border-0 hover:bg-muted/10"
                  data-ocid={`emr.all_rx.item.${i + 1}`}
                >
                  <td className="py-2.5 pr-4 font-medium text-foreground">
                    {rx.drugName}
                  </td>
                  <td className="py-2.5 pr-4 text-muted-foreground">
                    {rx.dose}
                  </td>
                  <td className="py-2.5 pr-4 text-muted-foreground">
                    {rx.dosageForm}
                  </td>
                  <td className="py-2.5 pr-4 text-muted-foreground">
                    {rx.frequency}
                  </td>
                  <td className="py-2.5 pr-4 text-muted-foreground">
                    {rx.duration} days
                  </td>
                  <td className="py-2.5">
                    <StatusBadge status={rx.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// Main EMRPage
// ────────────────────────────────────────────────────────────────
export function EMRPage() {
  const { user } = useAuth();
  const { data: patients, isLoading: patientsLoading } = usePatients();
  const { data: doctors } = useDoctors();

  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState<bigint | null>(
    null,
  );
  const [showVisitForm, setShowVisitForm] = useState(false);
  const [editVisit, setEditVisit] = useState<Visit | null>(null);

  const canWrite = user?.role === "Doctor" || user?.role === "SuperAdmin";

  const selectedPatient =
    patients?.find((p) => p.id === selectedPatientId) ?? null;

  const { data: visits, isLoading: visitsLoading } = useVisitsByPatient(
    selectedPatientId ?? BigInt(0),
  );

  const filteredPatients = useMemo(
    () =>
      (patients ?? []).filter((p) => {
        const q = patientSearch.toLowerCase();
        return (
          p.firstName.toLowerCase().includes(q) ||
          p.lastName.toLowerCase().includes(q) ||
          p.mrn.toLowerCase().includes(q)
        );
      }),
    [patients, patientSearch],
  );

  function getDoctorName(doctorId: bigint) {
    const doc = doctors?.find((d) => d.id === doctorId);
    return doc ? `Dr. ${doc.specialization}` : `Dr. #${doctorId}`;
  }

  function openEditVisit(v: Visit) {
    setEditVisit(v);
    setShowVisitForm(true);
  }

  function closeVisitForm() {
    setShowVisitForm(false);
    setEditVisit(null);
  }

  const sortedVisits = useMemo(
    () =>
      [...(visits ?? [])].sort(
        (a, b) => Number(b.visitDate) - Number(a.visitDate),
      ),
    [visits],
  );

  return (
    <div data-ocid="emr.page" className="space-y-0">
      <PageHeader
        title="Electronic Medical Records"
        description="SOAP notes, ICD-10 diagnoses, prescriptions, vital signs"
        breadcrumb={["Clinical", "EMR"]}
        actions={
          canWrite && selectedPatient ? (
            <Button
              type="button"
              onClick={() => setShowVisitForm(true)}
              data-ocid="emr.new_visit.button"
            >
              <Plus className="h-4 w-4 mr-1" /> New Visit
            </Button>
          ) : undefined
        }
      />

      {/* Patient Selector */}
      <div className="bg-card border border-border rounded-xl p-5 mb-5">
        <div className="flex items-center gap-2 mb-1">
          <Search className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold text-foreground">
            Select Patient
          </h2>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Search by patient name or MRN to load their EMR
        </p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search by name or MRN…"
            value={patientSearch}
            onChange={(e) => setPatientSearch(e.target.value)}
            data-ocid="emr.patient_search.input"
          />
        </div>
        {patientSearch && (
          <div className="mt-2 border border-border rounded-lg overflow-hidden max-h-56 overflow-y-auto">
            {patientsLoading ? (
              <div className="p-3 space-y-2">
                {["sl-1", "sl-2", "sl-3"].map((k) => (
                  <Skeleton key={k} className="h-8 w-full" />
                ))}
              </div>
            ) : filteredPatients.length === 0 ? (
              <div
                className="p-4 text-center text-sm text-muted-foreground"
                data-ocid="emr.search.empty_state"
              >
                No patients found
              </div>
            ) : (
              filteredPatients.slice(0, 10).map((p) => (
                <button
                  key={p.id.toString()}
                  type="button"
                  className={`w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-accent/10 transition-colors ${
                    selectedPatientId === p.id ? "bg-accent/15" : ""
                  }`}
                  onClick={() => {
                    setSelectedPatientId(p.id);
                    setPatientSearch(`${p.firstName} ${p.lastName}`);
                  }}
                  data-ocid={`emr.patient_option.item.${p.id.toString()}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {p.firstName} {p.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        MRN: {p.mrn}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {p.allergies.length > 0 && (
                      <span className="text-xs text-red-500 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        {p.allergies.length} allerg.
                      </span>
                    )}
                    <StatusBadge status={p.status} />
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* EMR content */}
      {!selectedPatient ? (
        <div
          className="bg-card border border-border rounded-xl p-12 text-center"
          data-ocid="emr.no_patient.empty_state"
        >
          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-40" />
          <h3 className="text-base font-semibold text-foreground mb-1">
            No patient selected
          </h3>
          <p className="text-sm text-muted-foreground">
            Search for a patient above to view their electronic medical record.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Patient banner */}
          <PatientBanner patient={selectedPatient} />

          {/* Main Tabs */}
          <Tabs defaultValue="visits">
            <TabsList className="mb-4">
              <TabsTrigger value="visits" data-ocid="emr.visits.tab">
                Visit History
              </TabsTrigger>
              <TabsTrigger
                value="prescriptions"
                data-ocid="emr.prescriptions.tab"
              >
                All Prescriptions
              </TabsTrigger>
            </TabsList>

            {/* Visit History Tab */}
            <TabsContent value="visits">
              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-foreground">
                    Visit History
                    {sortedVisits.length > 0 && (
                      <span className="ml-2 text-xs font-normal text-muted-foreground">
                        ({sortedVisits.length} visit
                        {sortedVisits.length !== 1 ? "s" : ""})
                      </span>
                    )}
                  </h3>
                  {canWrite && (
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => setShowVisitForm(true)}
                      data-ocid="emr.new_visit_tab.button"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" /> New Visit
                    </Button>
                  )}
                </div>

                {visitsLoading ? (
                  <div className="space-y-3">
                    {["sv-1", "sv-2", "sv-3"].map((k) => (
                      <Skeleton key={k} className="h-14 w-full" />
                    ))}
                  </div>
                ) : sortedVisits.length === 0 ? (
                  <div
                    className="text-center py-10 text-muted-foreground"
                    data-ocid="emr.visits.empty_state"
                  >
                    <Stethoscope className="h-8 w-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm">No visits recorded yet</p>
                    {canWrite && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={() => setShowVisitForm(true)}
                        data-ocid="emr.create_first_visit.button"
                      >
                        Create first visit
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sortedVisits.map((visit) => (
                      <VisitCard
                        key={visit.id.toString()}
                        visit={visit}
                        doctorName={getDoctorName(visit.doctorId)}
                        canEdit={canWrite}
                        onEdit={openEditVisit}
                      />
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Prescriptions Tab */}
            <TabsContent value="prescriptions">
              <div className="bg-card border border-border rounded-xl p-5">
                <PastPrescriptionsTab patientId={selectedPatient.id} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Visit Form Modal */}
      <Modal
        open={showVisitForm}
        onClose={closeVisitForm}
        title={editVisit ? "Edit Visit" : "New Visit"}
        description={
          editVisit
            ? `Editing visit from ${formatDate(editVisit.visitDate)}`
            : selectedPatient
              ? `Patient: ${selectedPatient.firstName} ${selectedPatient.lastName} · MRN: ${selectedPatient.mrn}`
              : ""
        }
        size="xl"
        data-ocid="emr.visit_form.dialog"
      >
        {selectedPatient && showVisitForm && (
          <VisitForm
            patientId={selectedPatient.id}
            patientAllergies={selectedPatient.allergies}
            editVisit={editVisit}
            onClose={closeVisitForm}
          />
        )}
      </Modal>
    </div>
  );
}
