import { c as createLucideIcon, h as useAuth, r as reactExports, x as useActiveERTriages, l as useBeds, k as useWards, i as usePatients, y as useCreateERTriage, z as useUpdateERTriage, E as ERStatus, U as UserRole, j as jsxRuntimeExports, m as PageHeader, a as Button, D as BedDouble, q as Clock, F as Shield, T as TriangleAlert, n as Stethoscope, S as StatusBadge, b as ue } from "./index-DZPPfMmg.js";
import { M as Modal } from "./Modal-BHmlK1FU.js";
import { I as Input } from "./input-Clo9Nqqp.js";
import { L as Label } from "./label-DqZ3T788.js";
import { S as Skeleton } from "./skeleton-DhSf2wGn.js";
import { u as useDoctors } from "./staff-DDNDShPh.js";
import { P as Plus } from "./plus-CgeKf2CL.js";
import { C as CircleCheckBig } from "./circle-check-big-D_Mpxmxn.js";
import { R as RefreshCw } from "./refresh-cw-BQBoPnDy.js";
import { Z as Zap } from "./zap-zB9614qa.js";
import { A as Activity } from "./activity-CMtMSC-q.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8", key: "1wm6mi" }],
  ["path", { d: "M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4", key: "4k93s5" }],
  ["path", { d: "M3 18h18", key: "1h113x" }]
];
const BedSingle = createLucideIcon("bed-single", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const CircleHelp = createLucideIcon("circle-help", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
  ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }]
];
const UserX = createLucideIcon("user-x", __iconNode);
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
    badge: "bg-red-600/20 text-red-400 border-red-600/40"
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
    badge: "bg-orange-500/20 text-orange-400 border-orange-500/40"
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
    badge: "bg-yellow-500/20 text-yellow-400 border-yellow-500/40"
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
    badge: "bg-green-600/20 text-green-400 border-green-600/40"
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
    badge: "bg-blue-500/20 text-blue-400 border-blue-500/40"
  }
];
function getESI(level) {
  return ESI_LEVELS.find((e) => e.level === level) ?? ESI_LEVELS[2];
}
const DEFAULT_FORM = {
  name: "",
  age: "",
  gender: "Male",
  esiLevel: 3,
  chiefComplaint: "",
  isTraumaCase: false,
  isUnknownPatient: false,
  patientId: "",
  bedId: ""
};
function TriageModal({
  open,
  onClose,
  patients,
  erBeds,
  isPending,
  onSubmit
}) {
  const [form, setForm] = reactExports.useState(DEFAULT_FORM);
  const availableBeds = erBeds.filter((b) => b.status === "Available");
  function handleSubmit(e) {
    e.preventDefault();
    if (!form.chiefComplaint.trim()) {
      ue.error("Chief complaint is required");
      return;
    }
    onSubmit(form);
    setForm(DEFAULT_FORM);
  }
  function close() {
    setForm(DEFAULT_FORM);
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose: close,
      title: "Quick Triage Registration",
      description: "Register an emergency case with ESI classification",
      size: "lg",
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: close,
            "data-ocid": "emergency.form.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            form: "triage-form",
            variant: "destructive",
            disabled: isPending,
            "data-ocid": "emergency.form.submit_button",
            children: isPending ? "Registering..." : "Register & Triage"
          }
        )
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { id: "triage-form", onSubmit: handleSubmit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              id: "unknown-patient",
              checked: form.isUnknownPatient,
              onChange: (e) => setForm((f) => ({
                ...f,
                isUnknownPatient: e.target.checked,
                patientId: e.target.checked ? "" : f.patientId
              })),
              className: "h-4 w-4 rounded",
              "data-ocid": "emergency.form.unknown_checkbox"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: "unknown-patient",
              className: "flex items-center gap-2 text-sm font-medium cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "h-4 w-4 text-muted-foreground" }),
                "Unknown / Unconscious Patient"
              ]
            }
          )
        ] }),
        !form.isUnknownPatient && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Link Existing Patient (optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: form.patientId,
                onChange: (e) => setForm((f) => ({ ...f, patientId: e.target.value })),
                className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                "data-ocid": "emergency.form.patient_select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Walk-in / new patient —" }),
                  patients.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: String(p.id), children: [
                    p.firstName,
                    " ",
                    p.lastName,
                    " (",
                    p.mrn,
                    ")"
                  ] }, String(p.id)))
                ]
              }
            )
          ] }),
          !form.patientId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Patient Name (optional)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.name,
                  onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                  placeholder: "Full name",
                  "data-ocid": "emergency.form.name_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Age" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  value: form.age,
                  onChange: (e) => setForm((f) => ({ ...f, age: e.target.value })),
                  placeholder: "Yrs",
                  min: 0,
                  max: 150,
                  "data-ocid": "emergency.form.age_input"
                }
              )
            ] })
          ] }),
          !form.patientId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Gender" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                value: form.gender,
                onChange: (e) => setForm((f) => ({ ...f, gender: e.target.value })),
                className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                "data-ocid": "emergency.form.gender_select",
                children: ["Male", "Female", "Other"].map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: g, children: g }, g))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
            "ESI Triage Level ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-2", children: ESI_LEVELS.map((esi) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setForm((f) => ({ ...f, esiLevel: esi.level })),
              "data-ocid": `emergency.form.esi_${esi.level}`,
              className: `flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all text-center ${form.esiLevel === esi.level ? `${esi.bg} ${esi.text} border-transparent ring-2 ${esi.ringColor} ring-offset-1 ring-offset-card shadow-lg scale-105` : "bg-card border-border hover:border-primary/30 text-foreground"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-black leading-none", children: esi.level }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold leading-tight", children: esi.label })
              ]
            },
            esi.level
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
              "ESI ",
              form.esiLevel,
              ":"
            ] }),
            " ",
            getESI(form.esiLevel).description
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
            "Chief Complaint ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.chiefComplaint,
              onChange: (e) => setForm((f) => ({ ...f, chiefComplaint: e.target.value })),
              placeholder: "Primary reason for visit (e.g. Chest pain, Head trauma)",
              required: true,
              "data-ocid": "emergency.form.complaint_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                id: "trauma-case",
                checked: form.isTraumaCase,
                onChange: (e) => setForm((f) => ({ ...f, isTraumaCase: e.target.checked })),
                className: "h-4 w-4 rounded",
                "data-ocid": "emergency.form.trauma_checkbox"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                htmlFor: "trauma-case",
                className: "flex items-center gap-2 text-sm font-medium cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-red-400" }),
                  "Trauma Case"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Assign ER Bed (optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: form.bedId,
                onChange: (e) => setForm((f) => ({ ...f, bedId: e.target.value })),
                className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                "data-ocid": "emergency.form.bed_select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Assign later —" }),
                  availableBeds.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: String(b.id), children: [
                    "Bed ",
                    b.bedNumber
                  ] }, String(b.id)))
                ]
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function AssignDoctorModal({
  open,
  onClose,
  triage,
  doctors,
  erBeds,
  isPending,
  onAssign
}) {
  const [doctorId, setDoctorId] = reactExports.useState("");
  const [bedId, setBedId] = reactExports.useState("");
  if (!triage) return null;
  const availableBeds = erBeds.filter(
    (b) => b.status === "Available" || String(b.id) === String(triage.bedId ?? "")
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: "Assign Doctor & Bed",
      description: `Case #${String(triage.id)} — ESI Level ${String(triage.esiLevel)}`,
      size: "sm",
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "emergency.assign.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: () => {
              onAssign(doctorId, bedId);
              onClose();
            },
            disabled: isPending,
            "data-ocid": "emergency.assign.confirm_button",
            children: isPending ? "Saving..." : "Assign"
          }
        )
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Treating Doctor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: doctorId,
              onChange: (e) => setDoctorId(e.target.value),
              className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
              "data-ocid": "emergency.assign.doctor_select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Select doctor —" }),
                doctors.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: String(d.userId), children: [
                  d.specialization,
                  " (ID: ",
                  String(d.id),
                  ")"
                ] }, String(d.id)))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "ER Bed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: bedId,
              onChange: (e) => setBedId(e.target.value),
              className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
              "data-ocid": "emergency.assign.bed_select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Select bed —" }),
                availableBeds.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: String(b.id), children: [
                  "Bed ",
                  b.bedNumber,
                  " — ",
                  b.status
                ] }, String(b.id)))
              ]
            }
          )
        ] })
      ] })
    }
  );
}
function BedCard({
  bed,
  triages
}) {
  const activeTriage = triages.find(
    (t) => t.bedId && String(t.bedId) === String(bed.id)
  );
  const esi = activeTriage ? getESI(Number(activeTriage.esiLevel)) : null;
  const isOccupied = bed.status === "Occupied";
  const isAvailable = bed.status === "Available";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `relative p-3 rounded-xl border-2 transition-smooth ${isOccupied ? esi ? `border-2 ${esi.border} bg-card shadow-sm` : "border-red-400/50 bg-card" : isAvailable ? "border-green-500/40 bg-green-500/5" : "border-yellow-500/40 bg-yellow-500/5"}`,
      "data-ocid": `emergency.bed.${bed.bedNumber}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              BedSingle,
              {
                className: `h-3.5 w-3.5 ${isAvailable ? "text-green-400" : isOccupied ? "text-red-400" : "text-yellow-400"}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-foreground", children: bed.bedNumber })
          ] }),
          esi && activeTriage && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `inline-flex items-center justify-center w-5 h-5 rounded text-xs font-black ${esi.bg} ${esi.text}`,
              children: esi.level
            }
          )
        ] }),
        isOccupied && activeTriage ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: activeTriage.isUnknownPatient ? "Unknown Patient" : `Case #${String(activeTriage.id)}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate mt-0.5 leading-tight", children: activeTriage.chiefComplaint }),
          activeTriage.isTraumaCase && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-1 inline-flex items-center gap-0.5 text-xs text-red-400 font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-2.5 w-2.5" }),
            "Trauma"
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: `text-xs font-medium mt-1 ${isAvailable ? "text-green-400" : "text-yellow-400"}`,
            children: bed.status
          }
        )
      ]
    }
  );
}
function TriageRow({
  triage,
  index,
  patients,
  doctors,
  erBeds,
  onUpdateStatus,
  onAssign,
  isUpdating
}) {
  const esi = getESI(Number(triage.esiLevel));
  const patient = triage.patientId ? patients.find((p) => String(p.id) === String(triage.patientId)) : null;
  const doctor = triage.treatedByDoctorId ? doctors.find((d) => String(d.id) === String(triage.treatedByDoctorId)) : null;
  const bed = triage.bedId ? erBeds.find((b) => String(b.id) === String(triage.bedId)) : null;
  const arrivalDate = new Date(Number(triage.arrivalTime) / 1e6);
  const now = Date.now();
  const waitMins = Math.floor((now - arrivalDate.getTime()) / 6e4);
  const isTrauma = triage.isTraumaCase;
  const isUnknown = triage.isUnknownPatient;
  const displayName = isUnknown ? "Unknown Patient" : patient ? `${patient.firstName} ${patient.lastName}` : `Case #${String(triage.id)}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `relative p-4 rounded-xl border transition-smooth ${isTrauma ? "border-red-500/60 bg-red-500/5 shadow-sm" : "border-border bg-card hover:border-accent/30"}`,
      "data-ocid": `emergency.triage.item.${index + 1}`,
      children: [
        isTrauma && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 h-0.5 rounded-t-xl bg-red-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `flex-shrink-0 flex flex-col items-center justify-center w-12 h-12 rounded-lg ${esi.bg} ${esi.text} shadow-sm`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-black leading-none", children: esi.level }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold opacity-90", children: "ESI" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm truncate", children: displayName }),
              isUnknown && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-md bg-muted/50 text-muted-foreground border border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "h-3 w-3" }),
                "Unknown"
              ] }),
              isTrauma && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-md bg-red-500/15 text-red-400 border border-red-500/30 font-semibold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3" }),
                "Trauma"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5 truncate", children: triage.chiefComplaint }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
                waitMins < 1 ? "Just arrived" : `${waitMins}m ago`
              ] }),
              bed && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-accent font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { className: "h-3 w-3" }),
                bed.bedNumber
              ] }),
              doctor && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "h-3 w-3" }),
                doctor.specialization
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: triage.status }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
              triage.status === ERStatus.Waiting && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "outline",
                  className: "h-7 text-xs",
                  onClick: () => onAssign(triage),
                  "data-ocid": `emergency.assign_button.${index + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "h-3 w-3 mr-1" }),
                    "Assign"
                  ]
                }
              ),
              (triage.status === ERStatus.Waiting || triage.status === ERStatus.InTreatment) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "outline",
                  className: "h-7 text-xs border-green-500/40 text-green-400 hover:bg-green-500/10",
                  disabled: isUpdating,
                  onClick: () => onUpdateStatus(
                    triage.id,
                    triage.status === ERStatus.Waiting ? ERStatus.InTreatment : ERStatus.Discharged
                  ),
                  "data-ocid": `emergency.status_button.${index + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3 w-3 mr-1" }),
                    triage.status === ERStatus.Waiting ? "In Treatment" : "Discharge"
                  ]
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
function EmergencyPage() {
  const { user } = useAuth();
  const [showTriageModal, setShowTriageModal] = reactExports.useState(false);
  const [assignTarget, setAssignTarget] = reactExports.useState(null);
  const { data: activeTriages, isLoading: loadingTriages } = useActiveERTriages();
  const { data: allBeds, isLoading: loadingBeds } = useBeds();
  const { data: wards } = useWards();
  const { data: patients = [] } = usePatients();
  const { data: doctors = [] } = useDoctors();
  const createTriage = useCreateERTriage();
  const updateTriage = useUpdateERTriage();
  const erWard = wards == null ? void 0 : wards.find(
    (w) => w.wardType === "Emergency" || w.name.toLowerCase().includes("emerg")
  );
  const erBeds = erWard ? (allBeds == null ? void 0 : allBeds.filter((b) => String(b.wardId) === String(erWard.id))) ?? [] : allBeds ?? [];
  const totalBeds = erBeds.length;
  const availableBeds = erBeds.filter((b) => b.status === "Available").length;
  const occupiedBeds = erBeds.filter((b) => b.status === "Occupied").length;
  const allActive = activeTriages ?? [];
  const sortedTriages = [...allActive].sort((a, b) => {
    const esiDiff = Number(a.esiLevel) - Number(b.esiLevel);
    if (esiDiff !== 0) return esiDiff;
    return Number(a.arrivalTime) - Number(b.arrivalTime);
  });
  const waitingCases = sortedTriages.filter(
    (t) => t.status === ERStatus.Waiting
  );
  const avgWait = waitingCases.length === 0 ? 0 : Math.floor(
    waitingCases.reduce((acc, t) => {
      const arrival = Number(t.arrivalTime) / 1e6;
      return acc + (Date.now() - arrival) / 6e4;
    }, 0) / waitingCases.length
  );
  const canTriage = (user == null ? void 0 : user.role) === UserRole.SuperAdmin || (user == null ? void 0 : user.role) === UserRole.Receptionist || (user == null ? void 0 : user.role) === UserRole.Nurse || (user == null ? void 0 : user.role) === UserRole.Doctor;
  async function handleCreateTriage(form) {
    try {
      await createTriage.mutateAsync({
        patientId: form.patientId ? BigInt(form.patientId) : null,
        esiLevel: BigInt(form.esiLevel),
        chiefComplaint: form.chiefComplaint,
        isTraumaCase: form.isTraumaCase,
        isUnknownPatient: form.isUnknownPatient,
        bedId: form.bedId ? BigInt(form.bedId) : null
      });
      ue.success(`ESI Level ${form.esiLevel} triage registered`);
      setShowTriageModal(false);
    } catch {
      ue.error("Failed to register triage case");
    }
  }
  async function handleUpdateStatus(id, status) {
    try {
      const current = sortedTriages.find((t) => t.id === id);
      await updateTriage.mutateAsync({
        id,
        status,
        treatedByDoctorId: (current == null ? void 0 : current.treatedByDoctorId) ?? null,
        bedId: (current == null ? void 0 : current.bedId) ?? null
      });
      ue.success(`Case moved to ${status}`);
    } catch {
      ue.error("Failed to update status");
    }
  }
  async function handleAssign(doctorId, bedId) {
    if (!assignTarget) return;
    try {
      await updateTriage.mutateAsync({
        id: assignTarget.id,
        status: "InTreatment",
        treatedByDoctorId: doctorId ? BigInt(doctorId) : null,
        bedId: bedId ? BigInt(bedId) : null
      });
      ue.success("Doctor and bed assigned");
      setAssignTarget(null);
    } catch {
      ue.error("Failed to assign");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "emergency.page", className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Emergency Department",
        description: "Real-time ER triage queue, bed map, and critical case management",
        breadcrumb: ["Patient Ops", "Emergency"],
        actions: canTriage ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "destructive",
            onClick: () => setShowTriageModal(true),
            "data-ocid": "emergency.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
              "Quick Triage"
            ]
          }
        ) : void 0
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
        "data-ocid": "emergency.stats_section",
        children: [
          {
            label: "Total ER Beds",
            value: totalBeds,
            icon: BedDouble,
            color: "text-accent",
            bg: "bg-accent/10"
          },
          {
            label: "Available",
            value: availableBeds,
            icon: CircleCheckBig,
            color: "text-green-400",
            bg: "bg-green-500/10"
          },
          {
            label: "Occupied",
            value: occupiedBeds,
            icon: UserX,
            color: "text-red-400",
            bg: "bg-red-500/10"
          },
          {
            label: "Avg Wait",
            value: `${avgWait}m`,
            icon: Clock,
            color: "text-yellow-400",
            bg: "bg-yellow-500/10"
          }
        ].map(({ label, value, icon: Icon, color, bg }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-4 flex items-center gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${bg} p-2 rounded-lg`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${color}` }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground leading-none", children: value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: label })
              ] })
            ]
          },
          label
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-5 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "xl:col-span-3 space-y-3",
          "data-ocid": "emergency.queue_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground", children: "Active ER Queue" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-accent", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3 w-3 animate-spin [animation-duration:8s]" }),
                  "Auto-refresh"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: sortedTriages.filter((t) => t.esiLevel === BigInt(1)).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs font-bold text-red-400 bg-red-500/15 border border-red-500/30 px-2 py-0.5 rounded-full animate-pulse", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3 w-3" }),
                sortedTriages.filter((t) => t.esiLevel === BigInt(1)).length,
                " ",
                "Critical"
              ] }) })
            ] }),
            loadingTriages ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "space-y-3",
                "data-ocid": "emergency.queue.loading_state",
                children: ["sq0", "sq1", "sq2", "sq3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "p-4 rounded-xl border border-border bg-card",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-12 rounded-lg" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-60" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-32" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20 rounded-full" })
                    ] })
                  },
                  k
                ))
              }
            ) : sortedTriages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center justify-center py-16 bg-card border border-border rounded-xl text-center",
                "data-ocid": "emergency.queue.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-full bg-green-500/10 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-7 w-7 text-green-400" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No Active Cases" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "The emergency queue is clear" }),
                  canTriage && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      className: "mt-4",
                      onClick: () => setShowTriageModal(true),
                      "data-ocid": "emergency.queue.register_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
                        "Register Triage"
                      ]
                    }
                  )
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: sortedTriages.map((triage, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              TriageRow,
              {
                triage,
                index: i,
                patients,
                doctors,
                erBeds,
                onUpdateStatus: handleUpdateStatus,
                onAssign: (t) => setAssignTarget(t),
                isUpdating: updateTriage.isPending
              },
              String(triage.id)
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "xl:col-span-2", "data-ocid": "emergency.bedmap_section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 sticky top-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { className: "h-4 w-4 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground", children: "ER Bed Map" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3 w-3 animate-spin [animation-duration:8s]" }),
            "5s poll"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 mb-4 flex-wrap", children: [
          { color: "bg-green-500", label: "Available" },
          { color: "bg-red-500", label: "Occupied" },
          { color: "bg-yellow-500", label: "Maintenance" }
        ].map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "flex items-center gap-1 text-xs text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2.5 w-2.5 rounded-full ${l.color}` }),
              l.label
            ]
          },
          l.label
        )) }),
        loadingBeds ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-3 gap-2",
            "data-ocid": "emergency.bedmap.loading_state",
            children: [
              "sb0",
              "sb1",
              "sb2",
              "sb3",
              "sb4",
              "sb5",
              "sb6",
              "sb7",
              "sb8"
            ].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, k))
          }
        ) : erBeds.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-10 text-center",
            "data-ocid": "emergency.bedmap.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-8 w-8 text-muted-foreground mb-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No ER beds configured" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: erBeds.map((bed) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          BedCard,
          {
            bed,
            triages: sortedTriages
          },
          String(bed.id)
        )) }),
        erBeds.length > 0 && !loadingBeds && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-border grid grid-cols-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-green-400", children: availableBeds }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Free" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-red-400", children: occupiedBeds }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Used" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground", children: totalBeds }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total" })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TriageModal,
      {
        open: showTriageModal,
        onClose: () => setShowTriageModal(false),
        patients,
        erBeds,
        isPending: createTriage.isPending,
        onSubmit: handleCreateTriage
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AssignDoctorModal,
      {
        open: !!assignTarget,
        onClose: () => setAssignTarget(null),
        triage: assignTarget,
        doctors,
        erBeds,
        isPending: updateTriage.isPending,
        onAssign: handleAssign
      }
    )
  ] });
}
export {
  EmergencyPage
};
