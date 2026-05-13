import { c as createLucideIcon, h as useAuth, i as usePatients, r as reactExports, j as jsxRuntimeExports, m as PageHeader, a as Button, G as Search, H as User, T as TriangleAlert, S as StatusBadge, I as FileText, n as Stethoscope, J as ChevronDown, C as ChevronRight, K as DiagnosisType, M as Pill, b as ue, N as PrescriptionStatus } from "./index-DZPPfMmg.js";
import { M as Modal } from "./Modal-BHmlK1FU.js";
import { B as Badge } from "./badge-C5LXUByT.js";
import { I as Input } from "./input-Clo9Nqqp.js";
import { L as Label } from "./label-DqZ3T788.js";
import { S as Skeleton } from "./skeleton-DhSf2wGn.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-9iSmyv76.js";
import { T as Textarea } from "./textarea-D_eYIBJX.js";
import { u as useVisitsByPatient, a as usePrescriptionsByPatient, b as useCreateVisit, c as useUpdateVisit } from "./emr-DTEN1Lsy.js";
import { u as useDrugs } from "./pharmacy-BhOwEyE3.js";
import { u as useDoctors } from "./staff-DDNDShPh.js";
import { P as Plus } from "./plus-CgeKf2CL.js";
import { C as ClipboardList } from "./clipboard-list-B5KKi9nP.js";
import { A as Activity } from "./activity-CMtMSC-q.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
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
  { code: "C50", desc: "Malignant Neoplasm of Breast" }
];
const FREQUENCIES = [
  "OD",
  "BD",
  "TDS",
  "QID",
  "SOS",
  "Stat",
  "Weekly",
  "Fortnightly"
];
function calcAge(dob) {
  if (!dob) return "?";
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1e3));
}
function formatDate(ts) {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function PatientBanner({ patient }) {
  const age = calcAge(patient.dob);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-5 mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/30 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-7 w-7 text-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-bold text-foreground font-display", children: [
          patient.firstName,
          " ",
          patient.lastName
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono bg-muted/40 border border-border px-2 py-0.5 rounded text-muted-foreground", children: [
          "MRN: ",
          patient.mrn
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: patient.status })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Age:" }),
          " ",
          age,
          " ",
          "yrs"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Gender:" }),
          " ",
          patient.gender
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Blood Group:" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400 font-semibold", children: patient.bloodGroup })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "DOB:" }),
          " ",
          patient.dob
        ] }),
        patient.insuranceProvider && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Insurance:" }),
          " ",
          patient.insuranceProvider
        ] })
      ] }),
      patient.allergies.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1.5 mt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-red-500 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-red-500", children: "ALLERGIES:" }),
        patient.allergies.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            className: "bg-red-500/15 text-red-400 border-red-500/40 text-xs",
            variant: "outline",
            children: a
          },
          a
        ))
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "No known drug allergies" }) })
    ] })
  ] }) });
}
function VisitCard({
  visit,
  doctorName,
  canEdit,
  onEdit
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-xl overflow-hidden bg-card/50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "w-full flex items-center justify-between p-4 hover:bg-muted/20 transition-colors text-left",
        onClick: () => setExpanded((x) => !x),
        "data-ocid": "emr.visit_row.toggle",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-2 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground shrink-0", children: formatDate(visit.visitDate) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate", children: visit.chiefComplaint }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
              visit.diagnoses.slice(0, 2).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-xs bg-accent/10 border-accent/30 text-accent",
                  children: d.icd10Code
                },
                `${d.icd10Code}-${d.description}`
              )),
              visit.diagnoses.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "outline",
                  className: "text-xs text-muted-foreground",
                  children: [
                    "+",
                    visit.diagnoses.length - 2
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:block text-xs text-muted-foreground", children: doctorName }),
            expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
          ] })
        ]
      }
    ),
    expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border p-4 grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3", children: "SOAP Notes" }),
        [
          ["S", "Subjective", visit.soapNotes.subjective],
          ["O", "Objective", visit.soapNotes.objective],
          ["A", "Assessment", visit.soapNotes.assessment],
          ["P", "Plan", visit.soapNotes.plan]
        ].map(([code, label, text]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary", children: code }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: label })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground pl-6 leading-relaxed", children: text || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic", children: "Not recorded" }) })
        ] }, code))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3", children: "Diagnoses" }),
        visit.diagnoses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic", children: "No diagnoses recorded" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: visit.diagnoses.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex items-center gap-2 text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: `text-xs ${d.diagnosisType === DiagnosisType.Primary ? "bg-accent/15 text-accent border-accent/40" : "bg-muted/30 text-muted-foreground border-border"}`,
                  children: d.diagnosisType
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: d.icd10Code }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: d.description })
            ]
          },
          `${d.icd10Code}-${d.diagnosisType}`
        )) }),
        visit.vitals && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 mt-5", children: "Vital Signs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: [
            ["BP", visit.vitals.bp],
            ["Temp", `${visit.vitals.temperature}°C`],
            ["SpO2", `${visit.vitals.spo2}%`],
            ["Pulse", `${visit.vitals.pulse} bpm`],
            ["Weight", `${visit.vitals.weight} kg`],
            ["Height", `${visit.vitals.height} cm`]
          ].map(([label, val]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-muted/20 rounded-lg p-2 text-center border border-border/50",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: val })
              ]
            },
            label
          )) })
        ] })
      ] }),
      visit.prescriptions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3", children: "Prescriptions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: [
            "Drug",
            "Dose",
            "Form",
            "Frequency",
            "Duration",
            "Status"
          ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: "text-left text-xs text-muted-foreground font-medium py-1.5 pr-4",
              children: h
            },
            h
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: visit.prescriptions.map((rx, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-b border-border/50 last:border-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 font-medium text-foreground", children: rx.drugName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-muted-foreground", children: rx.dose }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-muted-foreground", children: rx.dosageForm }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-muted-foreground", children: rx.frequency }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 pr-4 text-muted-foreground", children: [
                  rx.duration,
                  " days"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: rx.status }) })
              ]
            },
            `rx-${visit.id.toString()}-${i}`
          )) })
        ] }) })
      ] }),
      canEdit && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          size: "sm",
          variant: "outline",
          onClick: () => onEdit(visit),
          "data-ocid": "emr.visit.edit_button",
          children: "Edit Visit"
        }
      ) })
    ] })
  ] });
}
const NEW_RX = () => ({
  key: `rx-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  drugName: "",
  dose: "",
  frequency: "OD",
  duration: "5",
  dosageForm: "Tablet",
  notes: ""
});
function VisitForm({
  patientId,
  patientAllergies,
  editVisit,
  onClose
}) {
  var _a, _b, _c, _d, _e, _f, _g;
  const { user: _formUser } = useAuth();
  const { data: doctors } = useDoctors();
  const { data: drugs } = useDrugs();
  const createVisit = useCreateVisit();
  const updateVisit = useUpdateVisit();
  const isEdit = !!editVisit;
  const [chiefComplaint, setChiefComplaint] = reactExports.useState(
    (editVisit == null ? void 0 : editVisit.chiefComplaint) ?? ""
  );
  const [soap, setSoap] = reactExports.useState(
    (editVisit == null ? void 0 : editVisit.soapNotes) ?? {
      subjective: "",
      objective: "",
      assessment: "",
      plan: ""
    }
  );
  const [diagnoses, setDiagnoses] = reactExports.useState(
    (editVisit == null ? void 0 : editVisit.diagnoses) ?? []
  );
  const [rxRows, setRxRows] = reactExports.useState(
    (editVisit == null ? void 0 : editVisit.prescriptions.map((p, i) => ({
      key: `existing-${i}`,
      drugName: p.drugName,
      dose: p.dose,
      frequency: p.frequency,
      duration: p.duration,
      dosageForm: p.dosageForm,
      notes: p.notes ?? ""
    }))) ?? [NEW_RX()]
  );
  const [vitals, setVitals] = reactExports.useState({
    bpSys: ((_a = editVisit == null ? void 0 : editVisit.vitals) == null ? void 0 : _a.bp.split("/")[0]) ?? "",
    bpDia: ((_b = editVisit == null ? void 0 : editVisit.vitals) == null ? void 0 : _b.bp.split("/")[1]) ?? "",
    temperature: ((_c = editVisit == null ? void 0 : editVisit.vitals) == null ? void 0 : _c.temperature) ?? "",
    spo2: ((_d = editVisit == null ? void 0 : editVisit.vitals) == null ? void 0 : _d.spo2) ?? "",
    pulse: ((_e = editVisit == null ? void 0 : editVisit.vitals) == null ? void 0 : _e.pulse) ?? "",
    weight: ((_f = editVisit == null ? void 0 : editVisit.vitals) == null ? void 0 : _f.weight) ?? "",
    height: ((_g = editVisit == null ? void 0 : editVisit.vitals) == null ? void 0 : _g.height) ?? ""
  });
  const [selectedDoctor, setSelectedDoctor] = reactExports.useState(
    (editVisit == null ? void 0 : editVisit.doctorId.toString()) ?? ""
  );
  const [icdSearch, setIcdSearch] = reactExports.useState("");
  const allergyAlerts = reactExports.useMemo(() => {
    if (!patientAllergies.length) return [];
    return rxRows.filter(
      (rx) => patientAllergies.some(
        (a) => rx.drugName.toLowerCase().includes(a.toLowerCase()) || a.toLowerCase().includes(rx.drugName.toLowerCase())
      )
    ).map((rx) => rx.drugName);
  }, [rxRows, patientAllergies]);
  const filteredICD = reactExports.useMemo(
    () => ICD10_CODES.filter(
      (c) => c.code.toLowerCase().includes(icdSearch.toLowerCase()) || c.desc.toLowerCase().includes(icdSearch.toLowerCase())
    ).slice(0, 15),
    [icdSearch]
  );
  function addDiagnosis(code, desc) {
    if (diagnoses.find((d) => d.icd10Code === code)) return;
    const isPrimary = diagnoses.length === 0;
    setDiagnoses((prev) => [
      ...prev,
      {
        icd10Code: code,
        description: desc,
        diagnosisType: isPrimary ? DiagnosisType.Primary : DiagnosisType.Secondary
      }
    ]);
    setIcdSearch("");
  }
  function toggleDiagnosisType(idx) {
    setDiagnoses(
      (prev) => prev.map(
        (d, i) => i === idx ? {
          ...d,
          diagnosisType: d.diagnosisType === DiagnosisType.Primary ? DiagnosisType.Secondary : DiagnosisType.Primary
        } : d
      )
    );
  }
  function removeDiagnosis(idx) {
    setDiagnoses((prev) => prev.filter((_, i) => i !== idx));
  }
  function updateRx(key, field, value) {
    setRxRows(
      (prev) => prev.map((r) => r.key === key ? { ...r, [field]: value } : r)
    );
  }
  function removeRx(key) {
    setRxRows((prev) => prev.filter((r) => r.key !== key));
  }
  async function handleSubmit() {
    if (!chiefComplaint.trim()) {
      ue.error("Chief complaint is required");
      return;
    }
    const builtVitals = vitals.bpSys && vitals.bpDia && vitals.pulse ? {
      bp: `${vitals.bpSys}/${vitals.bpDia}`,
      temperature: vitals.temperature,
      spo2: vitals.spo2,
      pulse: vitals.pulse,
      weight: vitals.weight,
      height: vitals.height,
      recordedAt: BigInt(Date.now())
    } : null;
    const prescriptions = rxRows.filter((r) => r.drugName.trim()).map((r) => ({
      drugName: r.drugName,
      dose: r.dose,
      frequency: r.frequency,
      duration: r.duration,
      dosageForm: r.dosageForm,
      notes: r.notes || void 0,
      status: PrescriptionStatus.Pending,
      drugId: void 0
    }));
    try {
      if (isEdit) {
        await updateVisit.mutateAsync({
          id: editVisit.id,
          soapNotes: soap,
          diagnoses,
          prescriptions,
          vitals: builtVitals
        });
        ue.success("Visit updated successfully");
      } else {
        const doctorId = selectedDoctor ? BigInt(selectedDoctor) : BigInt(1);
        await createVisit.mutateAsync({
          patientId,
          doctorId,
          chiefComplaint,
          soapNotes: soap,
          diagnoses,
          prescriptions,
          vitals: builtVitals
        });
        ue.success("Visit created successfully");
      }
      onClose();
    } catch (_err) {
      ue.error(isEdit ? "Failed to update visit" : "Failed to create visit");
    }
  }
  const isPending = createVisit.isPending || updateVisit.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    allergyAlerts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-3 bg-red-500/10 border border-red-500/40 rounded-lg p-3",
        "data-ocid": "emr.allergy_alert",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-red-500 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-red-500", children: "ALLERGY ALERT" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-red-400", children: [
              "Patient is allergic to:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: allergyAlerts.join(", ") })
            ] })
          ] })
        ]
      }
    ),
    !isEdit && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "chief-complaint", children: "Chief Complaint *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "chief-complaint",
          placeholder: "e.g. Fever and cough for 3 days",
          value: chiefComplaint,
          onChange: (e) => setChiefComplaint(e.target.value),
          "data-ocid": "emr.chief_complaint.input"
        }
      )
    ] }),
    !isEdit && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "doctor-select", children: "Attending Doctor" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          id: "doctor-select",
          className: "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring",
          value: selectedDoctor,
          onChange: (e) => setSelectedDoctor(e.target.value),
          "data-ocid": "emr.doctor.select",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "-- Select Doctor --" }),
            doctors == null ? void 0 : doctors.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: d.id.toString(), children: [
              "Dr. ",
              d.specialization,
              " (ID: ",
              d.id.toString(),
              ")"
            ] }, d.id.toString()))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-4 w-4 text-accent" }),
        " SOAP Notes"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
        [
          "subjective",
          "S — Subjective",
          "Patient's description of symptoms"
        ],
        ["objective", "O — Objective", "Examination findings"],
        [
          "assessment",
          "A — Assessment",
          "Clinical diagnosis / impression"
        ],
        ["plan", "P — Plan", "Treatment plan"]
      ].map(([field, label, placeholder]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `soap-${field}`, className: "text-xs", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: `soap-${field}`,
            placeholder,
            rows: 3,
            value: soap[field],
            onChange: (e) => setSoap((s) => ({ ...s, [field]: e.target.value })),
            className: "resize-none text-sm",
            "data-ocid": `emr.soap_${field}.textarea`
          }
        )
      ] }, field)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "h-4 w-4 text-accent" }),
        " Diagnoses (ICD-10)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "pl-9 text-sm",
            placeholder: "Search ICD-10 code or description…",
            value: icdSearch,
            onChange: (e) => setIcdSearch(e.target.value),
            "data-ocid": "emr.icd_search.input"
          }
        )
      ] }),
      icdSearch && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border rounded-lg overflow-hidden mb-3 max-h-40 overflow-y-auto", children: filteredICD.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground p-3", children: "No codes found" }) : filteredICD.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "w-full text-left px-3 py-2 text-sm hover:bg-accent/10 transition-colors flex items-center gap-2",
          onClick: () => addDiagnosis(c.code, c.desc),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-accent font-semibold min-w-[4rem]", children: c.code }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: c.desc })
          ]
        },
        c.code
      )) }),
      diagnoses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: diagnoses.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "li",
        {
          className: "flex items-center gap-2 text-sm bg-muted/20 rounded-lg px-3 py-2",
          "data-ocid": `emr.diagnosis.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => toggleDiagnosisType(i),
                className: `text-xs px-2 py-0.5 rounded-full border font-medium transition-colors ${d.diagnosisType === DiagnosisType.Primary ? "bg-accent/20 text-accent border-accent/40" : "bg-muted/30 text-muted-foreground border-border hover:bg-accent/10"}`,
                children: d.diagnosisType
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: d.icd10Code }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-foreground", children: d.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => removeDiagnosis(i),
                className: "text-muted-foreground hover:text-destructive transition-colors",
                "aria-label": "Remove diagnosis",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
              }
            )
          ]
        },
        `diag-${d.icd10Code}-${i}`
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4 text-accent" }),
        " Vital Signs",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground", children: "(leave blank if not taken)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Blood Pressure (mmHg)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Systolic",
                value: vitals.bpSys,
                onChange: (e) => setVitals((v) => ({ ...v, bpSys: e.target.value })),
                className: "text-sm",
                "data-ocid": "emr.vitals.bp_sys.input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "/" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Diastolic",
                value: vitals.bpDia,
                onChange: (e) => setVitals((v) => ({ ...v, bpDia: e.target.value })),
                className: "text-sm",
                "data-ocid": "emr.vitals.bp_dia.input"
              }
            )
          ] })
        ] }),
        [
          ["temperature", "Temperature (°C)", "emr.vitals.temp.input"],
          ["spo2", "SpO2 (%)", "emr.vitals.spo2.input"],
          ["pulse", "Pulse (bpm)", "emr.vitals.pulse.input"],
          ["weight", "Weight (kg)", "emr.vitals.weight.input"],
          ["height", "Height (cm)", "emr.vitals.height.input"]
        ].map(([field, label, ocid]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "—",
              value: vitals[field],
              onChange: (e) => setVitals((v) => ({ ...v, [field]: e.target.value })),
              className: "text-sm",
              "data-ocid": ocid
            }
          )
        ] }, field))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { className: "h-4 w-4 text-accent" }),
          " Prescriptions"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            variant: "outline",
            onClick: () => setRxRows((prev) => [...prev, NEW_RX()]),
            "data-ocid": "emr.add_rx.button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5 mr-1" }),
              " Add Drug"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: rxRows.map((rx, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-muted/20 border border-border/60 rounded-lg p-3",
          "data-ocid": `emr.rx.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 col-span-2 sm:col-span-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Drug Name *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      list: `drugs-list-${rx.key}`,
                      placeholder: "Start typing…",
                      value: rx.drugName,
                      onChange: (e) => updateRx(rx.key, "drugName", e.target.value),
                      className: "text-sm",
                      "data-ocid": `emr.rx.drug_name.${i + 1}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("datalist", { id: `drugs-list-${rx.key}`, children: drugs == null ? void 0 : drugs.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: d.name }, d.id.toString())) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Dose" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "e.g. 500mg",
                    value: rx.dose,
                    onChange: (e) => updateRx(rx.key, "dose", e.target.value),
                    className: "text-sm",
                    "data-ocid": `emr.rx.dose.${i + 1}`
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Dosage Form" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    className: "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring",
                    value: rx.dosageForm,
                    onChange: (e) => updateRx(rx.key, "dosageForm", e.target.value),
                    "data-ocid": `emr.rx.form.${i + 1}`,
                    children: [
                      "Tablet",
                      "Capsule",
                      "Injection",
                      "Syrup",
                      "Drops",
                      "Cream",
                      "Inhaler",
                      "Patch"
                    ].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: f, children: f }, f))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Frequency" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    className: "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring",
                    value: rx.frequency,
                    onChange: (e) => updateRx(rx.key, "frequency", e.target.value),
                    "data-ocid": `emr.rx.freq.${i + 1}`,
                    children: FREQUENCIES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: f, children: f }, f))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Duration (days)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "7",
                    value: rx.duration,
                    onChange: (e) => updateRx(rx.key, "duration", e.target.value),
                    className: "text-sm",
                    "data-ocid": `emr.rx.duration.${i + 1}`
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Notes" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "Take after meals",
                    value: rx.notes,
                    onChange: (e) => updateRx(rx.key, "notes", e.target.value),
                    className: "text-sm",
                    "data-ocid": `emr.rx.notes.${i + 1}`
                  }
                )
              ] })
            ] }),
            rxRows.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "mt-2 text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors",
                onClick: () => removeRx(rx.key),
                "data-ocid": `emr.rx.delete_button.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }),
                  " Remove"
                ]
              }
            )
          ]
        },
        rx.key
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 pt-2 border-t border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: onClose,
          "data-ocid": "emr.visit_form.cancel_button",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          onClick: handleSubmit,
          disabled: isPending,
          "data-ocid": "emr.visit_form.submit_button",
          children: isPending ? "Saving…" : isEdit ? "Update Visit" : "Create Visit"
        }
      )
    ] })
  ] });
}
function PastPrescriptionsTab({ patientId }) {
  const { data: allRx, isLoading } = usePrescriptionsByPatient(patientId);
  const [search, setSearch] = reactExports.useState("");
  const filtered = reactExports.useMemo(
    () => (allRx ?? []).filter(
      (rx) => rx.drugName.toLowerCase().includes(search.toLowerCase())
    ),
    [allRx, search]
  );
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["s-p-1", "s-p-2", "s-p-3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, k)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          className: "pl-9",
          placeholder: "Search prescriptions by drug name…",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          "data-ocid": "emr.rx_search.input"
        }
      )
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-10 text-muted-foreground",
        "data-ocid": "emr.rx.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { className: "h-8 w-8 mx-auto mb-2 opacity-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No prescriptions found" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: [
        "Drug",
        "Dose",
        "Form",
        "Frequency",
        "Duration",
        "Status"
      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "text-left text-xs text-muted-foreground font-medium py-2 pr-4",
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((rx, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-border/50 last:border-0 hover:bg-muted/10",
          "data-ocid": `emr.all_rx.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-4 font-medium text-foreground", children: rx.drugName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-4 text-muted-foreground", children: rx.dose }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-4 text-muted-foreground", children: rx.dosageForm }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-4 text-muted-foreground", children: rx.frequency }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 pr-4 text-muted-foreground", children: [
              rx.duration,
              " days"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: rx.status }) })
          ]
        },
        `all-rx-${rx.drugName}-${rx.frequency}`
      )) })
    ] }) })
  ] });
}
function EMRPage() {
  const { user } = useAuth();
  const { data: patients, isLoading: patientsLoading } = usePatients();
  const { data: doctors } = useDoctors();
  const [patientSearch, setPatientSearch] = reactExports.useState("");
  const [selectedPatientId, setSelectedPatientId] = reactExports.useState(
    null
  );
  const [showVisitForm, setShowVisitForm] = reactExports.useState(false);
  const [editVisit, setEditVisit] = reactExports.useState(null);
  const canWrite = (user == null ? void 0 : user.role) === "Doctor" || (user == null ? void 0 : user.role) === "SuperAdmin";
  const selectedPatient = (patients == null ? void 0 : patients.find((p) => p.id === selectedPatientId)) ?? null;
  const { data: visits, isLoading: visitsLoading } = useVisitsByPatient(
    selectedPatientId ?? BigInt(0)
  );
  const filteredPatients = reactExports.useMemo(
    () => (patients ?? []).filter((p) => {
      const q = patientSearch.toLowerCase();
      return p.firstName.toLowerCase().includes(q) || p.lastName.toLowerCase().includes(q) || p.mrn.toLowerCase().includes(q);
    }),
    [patients, patientSearch]
  );
  function getDoctorName(doctorId) {
    const doc = doctors == null ? void 0 : doctors.find((d) => d.id === doctorId);
    return doc ? `Dr. ${doc.specialization}` : `Dr. #${doctorId}`;
  }
  function openEditVisit(v) {
    setEditVisit(v);
    setShowVisitForm(true);
  }
  function closeVisitForm() {
    setShowVisitForm(false);
    setEditVisit(null);
  }
  const sortedVisits = reactExports.useMemo(
    () => [...visits ?? []].sort(
      (a, b) => Number(b.visitDate) - Number(a.visitDate)
    ),
    [visits]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "emr.page", className: "space-y-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Electronic Medical Records",
        description: "SOAP notes, ICD-10 diagnoses, prescriptions, vital signs",
        breadcrumb: ["Clinical", "EMR"],
        actions: canWrite && selectedPatient ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: () => setShowVisitForm(true),
            "data-ocid": "emr.new_visit.button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
              " New Visit"
            ]
          }
        ) : void 0
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Select Patient" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3", children: "Search by patient name or MRN to load their EMR" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "pl-9",
            placeholder: "Search by name or MRN…",
            value: patientSearch,
            onChange: (e) => setPatientSearch(e.target.value),
            "data-ocid": "emr.patient_search.input"
          }
        )
      ] }),
      patientSearch && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 border border-border rounded-lg overflow-hidden max-h-56 overflow-y-auto", children: patientsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 space-y-2", children: ["sl-1", "sl-2", "sl-3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full" }, k)) }) : filteredPatients.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "p-4 text-center text-sm text-muted-foreground",
          "data-ocid": "emr.search.empty_state",
          children: "No patients found"
        }
      ) : filteredPatients.slice(0, 10).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: `w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-accent/10 transition-colors ${selectedPatientId === p.id ? "bg-accent/15" : ""}`,
          onClick: () => {
            setSelectedPatientId(p.id);
            setPatientSearch(`${p.firstName} ${p.lastName}`);
          },
          "data-ocid": `emr.patient_option.item.${p.id.toString()}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
                  p.firstName,
                  " ",
                  p.lastName
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "MRN: ",
                  p.mrn
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              p.allergies.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-red-500 flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3" }),
                p.allergies.length,
                " allerg."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: p.status })
            ] })
          ]
        },
        p.id.toString()
      )) })
    ] }),
    !selectedPatient ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-12 text-center",
        "data-ocid": "emr.no_patient.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-foreground mb-1", children: "No patient selected" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Search for a patient above to view their electronic medical record." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PatientBanner, { patient: selectedPatient }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "visits", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "visits", "data-ocid": "emr.visits.tab", children: "Visit History" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TabsTrigger,
            {
              value: "prescriptions",
              "data-ocid": "emr.prescriptions.tab",
              children: "All Prescriptions"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "visits", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground", children: [
              "Visit History",
              sortedVisits.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-xs font-normal text-muted-foreground", children: [
                "(",
                sortedVisits.length,
                " visit",
                sortedVisits.length !== 1 ? "s" : "",
                ")"
              ] })
            ] }),
            canWrite && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                onClick: () => setShowVisitForm(true),
                "data-ocid": "emr.new_visit_tab.button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5 mr-1" }),
                  " New Visit"
                ]
              }
            )
          ] }),
          visitsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["sv-1", "sv-2", "sv-3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full" }, k)) }) : sortedVisits.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-10 text-muted-foreground",
              "data-ocid": "emr.visits.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "h-8 w-8 mx-auto mb-2 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No visits recorded yet" }),
                canWrite && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    className: "mt-3",
                    onClick: () => setShowVisitForm(true),
                    "data-ocid": "emr.create_first_visit.button",
                    children: "Create first visit"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: sortedVisits.map((visit) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            VisitCard,
            {
              visit,
              doctorName: getDoctorName(visit.doctorId),
              canEdit: canWrite,
              onEdit: openEditVisit
            },
            visit.id.toString()
          )) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "prescriptions", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PastPrescriptionsTab, { patientId: selectedPatient.id }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: showVisitForm,
        onClose: closeVisitForm,
        title: editVisit ? "Edit Visit" : "New Visit",
        description: editVisit ? `Editing visit from ${formatDate(editVisit.visitDate)}` : selectedPatient ? `Patient: ${selectedPatient.firstName} ${selectedPatient.lastName} · MRN: ${selectedPatient.mrn}` : "",
        size: "xl",
        "data-ocid": "emr.visit_form.dialog",
        children: selectedPatient && showVisitForm && /* @__PURE__ */ jsxRuntimeExports.jsx(
          VisitForm,
          {
            patientId: selectedPatient.id,
            patientAllergies: selectedPatient.allergies,
            editVisit,
            onClose: closeVisitForm
          }
        )
      }
    )
  ] });
}
export {
  EMRPage
};
