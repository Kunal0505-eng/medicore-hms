import { c as createLucideIcon, r as reactExports, u as useAdmitPatient, B as BedStatus, j as jsxRuntimeExports, T as TriangleAlert, a as Button, b as ue, d as useDischargePatient, L as LogOut, S as StatusBadge, P as PatientStatus, e as useUpdatePatient, f as useCreatePatient, g as useTransferPatient, h as useAuth, i as usePatients, k as useWards, l as useBeds, U as UserRole, m as PageHeader, n as Stethoscope, C as ChevronRight } from "./index-BGDDM1OA.js";
import { D as DataTable } from "./DataTable-DahQsLG7.js";
import { M as Modal, X } from "./Modal-aMXHwIme.js";
import { I as Input } from "./input-BH-6abi_.js";
import { L as Label } from "./label-CCf7a3mP.js";
import { T as Textarea } from "./textarea-xzHcrSyh.js";
import { u as useVisitsByPatient } from "./emr-CpFc9EiL.js";
import { U as UserRound, M as MapPin, a as UserPlus } from "./user-round-DB5_cVFE.js";
import { R as RefreshCw } from "./refresh-cw-nljMAkcK.js";
import "./chevron-up-AHw6P28i.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M2 4v16", key: "vw9hq8" }],
  ["path", { d: "M2 8h18a2 2 0 0 1 2 2v10", key: "1dgv2r" }],
  ["path", { d: "M2 17h20", key: "18nfp3" }],
  ["path", { d: "M6 8v9", key: "1yriud" }]
];
const Bed = createLucideIcon("bed", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode);
function AdmitPatientModal({ patient, wards, beds, onClose }) {
  const [wardId, setWardId] = reactExports.useState("");
  const [bedId, setBedId] = reactExports.useState("");
  const [admissionDate, setAdmissionDate] = reactExports.useState(
    (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  );
  const admitPatient = useAdmitPatient();
  const availableBedsInWard = reactExports.useMemo(() => {
    if (!wardId) return [];
    return beds.filter(
      (b) => b.wardId.toString() === wardId && b.status === BedStatus.Available
    );
  }, [beds, wardId]);
  const selectedWard = wards.find((w) => w.id.toString() === wardId);
  const selectedBed = beds.find((b) => b.id.toString() === bedId);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!wardId || !bedId) {
      ue.error("Please select a ward and bed.");
      return;
    }
    const ward = wards.find((w) => w.id.toString() === wardId);
    const bed = beds.find((b) => b.id.toString() === bedId);
    if (!ward || !bed) return;
    if (bed.status !== BedStatus.Available) {
      ue.error("Selected bed is no longer available.");
      return;
    }
    try {
      await admitPatient.mutateAsync({
        patientId: patient.id,
        bedId: bed.id,
        wardId: ward.id
      });
      ue.success(
        `${patient.firstName} ${patient.lastName} admitted to ${ward.name} — Bed ${bed.bedNumber}.`
      );
      onClose();
    } catch (_err) {
      ue.error("Failed to admit patient.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open: true,
      onClose,
      title: "Admit Patient",
      description: `Assign ${patient.firstName} ${patient.lastName} to a ward and bed`,
      size: "md",
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "admit_patient.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            form: "admit-patient-form",
            disabled: admitPatient.isPending || !wardId || !bedId,
            "data-ocid": "admit_patient.submit_button",
            children: admitPatient.isPending ? "Admitting…" : "Admit Patient"
          }
        )
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          id: "admit-patient-form",
          onSubmit: handleSubmit,
          className: "space-y-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bed, { className: "h-5 w-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-foreground", children: [
                  patient.firstName,
                  " ",
                  patient.lastName
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "MRN: ",
                  patient.mrn,
                  " · ",
                  patient.bloodGroup,
                  " · ",
                  patient.gender
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Ward *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  value: wardId,
                  onChange: (e) => {
                    setWardId(e.target.value);
                    setBedId("");
                  },
                  className: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground",
                  required: true,
                  "data-ocid": "admit_patient.ward_select",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select ward…" }),
                    wards.filter((w) => w.isActive).map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: w.id.toString(), children: [
                      w.name,
                      " (",
                      w.wardType,
                      ")"
                    ] }, w.id.toString()))
                  ]
                }
              )
            ] }),
            wardId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs text-muted-foreground", children: [
                "Available Bed * (",
                availableBedsInWard.length,
                " available)"
              ] }),
              availableBedsInWard.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 shrink-0" }),
                "No available beds in ",
                selectedWard == null ? void 0 : selectedWard.name,
                ". Please select another ward."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  value: bedId,
                  onChange: (e) => setBedId(e.target.value),
                  className: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground",
                  required: true,
                  "data-ocid": "admit_patient.bed_select",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select bed…" }),
                    availableBedsInWard.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: b.id.toString(), children: [
                      "Bed ",
                      b.bedNumber
                    ] }, b.id.toString()))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Admission Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "date",
                  value: admissionDate,
                  onChange: (e) => setAdmissionDate(e.target.value),
                  "data-ocid": "admit_patient.admission_date_input"
                }
              )
            ] }),
            selectedBed && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-sm text-green-400", children: [
              "✓ Bed ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: selectedBed.bedNumber }),
              " in",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: selectedWard == null ? void 0 : selectedWard.name }),
              " is available."
            ] })
          ]
        }
      )
    }
  );
}
function DischargePatientModal({ patient, onClose }) {
  const [summary, setSummary] = reactExports.useState("");
  const [confirmed, setConfirmed] = reactExports.useState(false);
  const dischargePatient = useDischargePatient();
  const handleDischarge = async () => {
    if (!confirmed) {
      ue.error("Please confirm the discharge.");
      return;
    }
    try {
      await dischargePatient.mutateAsync(patient.id);
      ue.success(
        `${patient.firstName} ${patient.lastName} has been discharged.`
      );
      onClose();
    } catch (_err) {
      ue.error("Failed to discharge patient.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open: true,
      onClose,
      title: "Discharge Patient",
      description: "This action will free the assigned bed and update patient status",
      size: "md",
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "discharge_patient.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "destructive",
            onClick: handleDischarge,
            disabled: dischargePatient.isPending || !confirmed,
            "data-ocid": "discharge_patient.confirm_button",
            children: dischargePatient.isPending ? "Discharging…" : "Confirm Discharge"
          }
        )
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-5 w-5 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-foreground", children: [
              patient.firstName,
              " ",
              patient.lastName
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "MRN: ",
              patient.mrn,
              " · Status: ",
              patient.status
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Discharge Summary (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: summary,
              onChange: (e) => setSummary(e.target.value),
              placeholder: "Brief summary of the patient's treatment, condition at discharge, follow-up instructions…",
              rows: 4,
              "data-ocid": "discharge_patient.summary_textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-3 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: confirmed,
              onChange: (e) => setConfirmed(e.target.checked),
              className: "mt-0.5 accent-destructive",
              "data-ocid": "discharge_patient.confirm_checkbox"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-foreground", children: [
            "I confirm that",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
              patient.firstName,
              " ",
              patient.lastName
            ] }),
            " ",
            "is ready for discharge and the assigned bed should be freed."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs", children: "⚠ This action cannot be undone. The bed will become available for new admissions." })
      ] })
    }
  );
}
const TABS = [
  "Profile",
  "Medical History",
  "Allergies & Alerts",
  "Admission"
];
function PatientProfileDrawer({
  patient,
  wards,
  beds,
  onClose,
  onAdmit,
  onDischarge,
  onTransfer
}) {
  const [activeTab, setActiveTab] = reactExports.useState("Profile");
  const ward = reactExports.useMemo(
    () => wards.find((w) => {
      var _a;
      return w.id.toString() === ((_a = patient.wardId) == null ? void 0 : _a.toString());
    }),
    [wards, patient.wardId]
  );
  const bed = reactExports.useMemo(
    () => beds.find((b) => {
      var _a;
      return b.id.toString() === ((_a = patient.admittedBedId) == null ? void 0 : _a.toString());
    }),
    [beds, patient.admittedBedId]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "Patient Profile",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex-1 bg-black/50 backdrop-blur-sm",
            onClick: onClose,
            onKeyDown: (e) => e.key === "Escape" && onClose(),
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "w-full max-w-xl bg-card border-l border-border flex flex-col h-full overflow-hidden",
            "data-ocid": "patient_profile.panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 p-6 border-b border-border shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "h-7 w-7 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-foreground truncate", children: [
                    patient.firstName,
                    " ",
                    patient.lastName
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                    "MRN:",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-mono font-medium", children: patient.mrn }),
                    " · ",
                    patient.gender,
                    " · ",
                    patient.bloodGroup
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: patient.status }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
                  patient.status === PatientStatus.OPD && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      variant: "outline",
                      onClick: onAdmit,
                      className: "text-xs text-green-400 border-green-500/30 hover:bg-green-500/10",
                      "data-ocid": "patient_profile.admit_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Bed, { className: "h-3 w-3 mr-1" }),
                        " Admit"
                      ]
                    }
                  ),
                  patient.status === PatientStatus.Admitted && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        size: "sm",
                        variant: "outline",
                        onClick: onTransfer,
                        className: "text-xs text-accent border-accent/30 hover:bg-accent/10",
                        "data-ocid": "patient_profile.transfer_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3 w-3 mr-1" }),
                          " Transfer"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        size: "sm",
                        variant: "outline",
                        onClick: onDischarge,
                        className: "text-xs",
                        "data-ocid": "patient_profile.discharge_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-3 w-3 mr-1" }),
                          " Discharge"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: onClose,
                      className: "p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors ml-1",
                      "aria-label": "Close profile",
                      "data-ocid": "patient_profile.close_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
                    }
                  )
                ] })
              ] }),
              patient.allergies.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "mx-6 mt-4 flex items-start gap-2 px-4 py-3 rounded-lg bg-destructive/10 border border-destructive/30 shrink-0",
                  "data-ocid": "patient_profile.allergy_banner",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-destructive mt-0.5 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-destructive", children: "Allergy Alert" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive/80 mt-0.5", children: patient.allergies.join(", ") })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex border-b border-border px-6 mt-4 shrink-0 overflow-x-auto", children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveTab(tab),
                  "data-ocid": `patient_profile.${tab.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_tab`,
                  className: `px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"}`,
                  children: tab
                },
                tab
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-6", children: [
                activeTab === "Profile" && /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileTab, { patient }),
                activeTab === "Medical History" && /* @__PURE__ */ jsxRuntimeExports.jsx(MedicalHistoryTab, { patient }),
                activeTab === "Allergies & Alerts" && /* @__PURE__ */ jsxRuntimeExports.jsx(AllergiesTab, { patient }),
                activeTab === "Admission" && /* @__PURE__ */ jsxRuntimeExports.jsx(AdmissionTab, { patient, ward, bed })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function ProfileTab({ patient }) {
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const updatePatient = useUpdatePatient();
  const [form, setForm] = reactExports.useState({
    firstName: patient.firstName,
    lastName: patient.lastName,
    phone: patient.phone,
    email: patient.email,
    address: patient.address,
    bloodGroup: patient.bloodGroup
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
        insuranceProvider: patient.insuranceProvider ?? null
      });
      ue.success("Patient profile updated.");
      setIsEditing(false);
    } catch (_err) {
      ue.error("Failed to update patient.");
    }
  };
  const age = reactExports.useMemo(() => {
    if (!patient.dob) return "—";
    const diff = Date.now() - new Date(patient.dob).getTime();
    return `${Math.floor(diff / (365.25 * 24 * 60 * 60 * 1e3))} yrs`;
  }, [patient.dob]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Demographics" }),
      !isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: () => setIsEditing(true),
          "data-ocid": "patient_profile.edit_button",
          children: "Edit"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: () => setIsEditing(false),
            "data-ocid": "patient_profile.cancel_edit_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            size: "sm",
            onClick: handleSave,
            disabled: updatePatient.isPending,
            "data-ocid": "patient_profile.save_button",
            children: updatePatient.isPending ? "Saving…" : "Save"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-x-6 gap-y-4", children: isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EditField,
        {
          label: "First Name",
          value: form.firstName,
          onChange: (v) => setForm((p) => ({ ...p, firstName: v }))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EditField,
        {
          label: "Last Name",
          value: form.lastName,
          onChange: (v) => setForm((p) => ({ ...p, lastName: v }))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EditField,
        {
          label: "Phone",
          value: form.phone,
          onChange: (v) => setForm((p) => ({ ...p, phone: v }))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EditField,
        {
          label: "Email",
          value: form.email,
          onChange: (v) => setForm((p) => ({ ...p, email: v }))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EditField,
        {
          label: "Address",
          value: form.address,
          onChange: (v) => setForm((p) => ({ ...p, address: v }))
        }
      ) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InfoRow,
        {
          label: "Full Name",
          value: `${patient.firstName} ${patient.lastName}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Date of Birth", value: patient.dob }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Age", value: age }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Gender", value: patient.gender }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Blood Group", value: patient.bloodGroup, highlight: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "MRN", value: patient.mrn, mono: true })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-border space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Contact" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { icon: Phone, label: patient.phone }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { icon: Mail, label: patient.email || "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { icon: MapPin, label: patient.address || "—" })
      ] })
    ] }),
    (patient.insuranceProvider || patient.insuranceId) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-border space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-accent" }),
        " Insurance"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            label: "Provider",
            value: patient.insuranceProvider ?? "—"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "ID", value: patient.insuranceId ?? "—", mono: true })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-border space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Emergency Contact" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: patient.emergencyContact || "—" })
    ] })
  ] });
}
function MedicalHistoryTab({ patient }) {
  const { data: visits = [], isLoading } = useVisitsByPatient(patient.id);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["v1", "v2", "v3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 bg-muted/30 rounded-lg animate-pulse" }, k)) });
  }
  if (visits.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-12 text-center",
        "data-ocid": "patient_profile.history_empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardListIcon, { className: "h-10 w-10 text-muted-foreground mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: "No visit history" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This patient has no recorded visits yet." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: visits.map((visit, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-4 rounded-lg border border-border bg-muted/10 hover:bg-muted/20 transition-colors",
      "data-ocid": `patient_profile.visit_item.${i + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: visit.chiefComplaint }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: new Date(
              Number(visit.visitDate) / 1e6
            ).toLocaleDateString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground shrink-0", children: [
            visit.prescriptions.length,
            " Rx"
          ] })
        ] }),
        visit.diagnoses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-1", children: visit.diagnoses.slice(0, 3).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-xs px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30",
            children: d.icd10Code
          },
          d.icd10Code
        )) })
      ]
    },
    visit.id.toString()
  )) });
}
function AllergiesTab({ patient }) {
  const updatePatient = useUpdatePatient();
  const [allergyInput, setAllergyInput] = reactExports.useState("");
  const [localAllergies, setLocalAllergies] = reactExports.useState(
    patient.allergies
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
        insuranceProvider: patient.insuranceProvider ?? null
      });
      ue.success("Allergy added.");
    } catch (_err) {
      ue.error("Failed to save.");
      setLocalAllergies(patient.allergies);
    }
  };
  const removeAllergy = async (a) => {
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
        insuranceProvider: patient.insuranceProvider ?? null
      });
      ue.success("Allergy removed.");
    } catch (_err) {
      ue.error("Failed to save.");
      setLocalAllergies(patient.allergies);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    localAllergies.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-4 rounded-lg bg-destructive/10 border border-destructive/30",
        "data-ocid": "patient_profile.allergy_alert_box",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-destructive" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-destructive", children: [
              "Known Allergies (",
              localAllergies.length,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: localAllergies.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-destructive/15 text-destructive border border-destructive/30",
              children: [
                a,
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => removeAllergy(a),
                    className: "hover:opacity-70 transition-opacity",
                    "aria-label": `Remove ${a} allergy`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
                  }
                )
              ]
            },
            a
          )) })
        ]
      }
    ),
    localAllergies.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-8 text-center",
        "data-ocid": "patient_profile.no_allergies_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-10 w-10 text-green-400 mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: "No Known Allergies" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This patient has no recorded allergies." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-2 block", children: "Add New Allergy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: allergyInput,
            onChange: (e) => setAllergyInput(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addAllergy();
              }
            },
            placeholder: "e.g. Penicillin",
            "data-ocid": "patient_profile.allergy_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: addAllergy,
            disabled: updatePatient.isPending,
            "data-ocid": "patient_profile.add_allergy_button",
            children: "Add"
          }
        )
      ] })
    ] })
  ] });
}
function AdmissionTab({
  patient,
  ward,
  bed
}) {
  if (patient.status !== PatientStatus.Admitted && patient.status !== PatientStatus.Transferred) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-12 text-center",
        "data-ocid": "patient_profile.not_admitted_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bed, { className: "h-10 w-10 text-muted-foreground mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: "Not Currently Admitted" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This patient is an OPD patient or has been discharged." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Status", value: patient.status }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Ward", value: (ward == null ? void 0 : ward.name) ?? "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Ward Type", value: (ward == null ? void 0 : ward.wardType) ?? "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Bed Number", value: (bed == null ? void 0 : bed.bedNumber) ?? "—", highlight: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InfoRow,
        {
          label: "Admitted",
          value: patient.admissionDate ? new Date(
            Number(patient.admissionDate) / 1e6
          ).toLocaleString() : "—"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InfoRow,
        {
          label: "Discharge Date",
          value: patient.dischargeDate ? new Date(
            Number(patient.dischargeDate) / 1e6
          ).toLocaleString() : "—"
        }
      )
    ] }),
    bed && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-lg border border-border bg-muted/10 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bed, { className: "h-4 w-4 text-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Bed Details" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Bed #", value: bed.bedNumber }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Status", value: bed.status }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Housekeeping", value: bed.housekeepingStatus }),
        bed.notes && /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Notes", value: bed.notes })
      ] })
    ] })
  ] });
}
function InfoRow({
  label,
  value,
  highlight,
  mono
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: `text-sm mt-0.5 ${highlight ? "font-bold text-accent" : mono ? "font-mono text-accent" : "text-foreground"}`,
        children: value
      }
    )
  ] });
}
function DetailRow({
  icon: Icon,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground break-all", children: label })
  ] });
}
function EditField({
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value, onChange: (e) => onChange(e.target.value) })
  ] });
}
function ClipboardListIcon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Clipboard list icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 11h4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 16h4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 11h.01" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 16h.01" })
      ]
    }
  );
}
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const GENDERS = ["Male", "Female", "Other"];
const INITIAL = {
  firstName: "",
  lastName: "",
  dob: "",
  gender: "Male",
  bloodGroup: "O+",
  phone: "",
  email: "",
  address: "",
  emergencyContact: "",
  allergies: [],
  allergyInput: "",
  insuranceId: "",
  insuranceProvider: "",
  patientType: "OPD",
  notes: ""
};
function RegisterPatientModal({ open, onClose }) {
  const [form, setForm] = reactExports.useState(INITIAL);
  const createPatient = useCreatePatient();
  const updatePatient = useUpdatePatient();
  const set = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));
  const addAllergy = () => {
    const val = form.allergyInput.trim();
    if (val && !form.allergies.includes(val)) {
      setForm((prev) => ({
        ...prev,
        allergies: [...prev.allergies, val],
        allergyInput: ""
      }));
    }
  };
  const removeAllergy = (a) => setForm((prev) => ({
    ...prev,
    allergies: prev.allergies.filter((x) => x !== a)
  }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim() || !form.phone.trim() || !form.dob) {
      ue.error("Please fill in all required fields.");
      return;
    }
    try {
      const newPatient = await createPatient.mutateAsync({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        dob: form.dob,
        gender: form.gender,
        bloodGroup: form.bloodGroup,
        phone: form.phone.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        emergencyContact: form.emergencyContact.trim()
      });
      if (form.allergies.length > 0 || form.insuranceProvider || form.insuranceId) {
        await updatePatient.mutateAsync({
          id: newPatient.id,
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          address: form.address.trim(),
          bloodGroup: form.bloodGroup,
          allergies: form.allergies,
          insuranceProvider: form.insuranceProvider.trim() || null,
          insuranceId: form.insuranceId.trim() || null
        });
      }
      ue.success(
        `Patient ${form.firstName} ${form.lastName} registered successfully.`
      );
      setForm(INITIAL);
      onClose();
    } catch (_err) {
      ue.error("Failed to register patient. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: "Register New Patient",
      description: "Fill in the patient's personal and medical details",
      size: "xl",
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "register_patient.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            form: "register-patient-form",
            disabled: createPatient.isPending,
            "data-ocid": "register_patient.submit_button",
            children: createPatient.isPending ? "Registering…" : "Register Patient"
          }
        )
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          id: "register-patient-form",
          onSubmit: handleSubmit,
          className: "space-y-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Personal Information", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "First Name *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: form.firstName,
                    onChange: (e) => set("firstName", e.target.value),
                    placeholder: "John",
                    required: true,
                    "data-ocid": "register_patient.first_name_input"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Last Name *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: form.lastName,
                    onChange: (e) => set("lastName", e.target.value),
                    placeholder: "Doe",
                    required: true,
                    "data-ocid": "register_patient.last_name_input"
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Date of Birth *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "date",
                    value: form.dob,
                    onChange: (e) => set("dob", e.target.value),
                    required: true,
                    "data-ocid": "register_patient.dob_input"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Gender", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    value: form.gender,
                    onChange: (e) => set("gender", e.target.value),
                    className: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground",
                    "data-ocid": "register_patient.gender_select",
                    children: GENDERS.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: g, children: g }, g))
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Blood Group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    value: form.bloodGroup,
                    onChange: (e) => set("bloodGroup", e.target.value),
                    className: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground",
                    "data-ocid": "register_patient.blood_group_select",
                    children: BLOOD_GROUPS.map((bg) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: bg, children: bg }, bg))
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Patient Type", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4", children: ["OPD", "IPD"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  className: "flex items-center gap-2 cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "radio",
                        name: "patientType",
                        value: t,
                        checked: form.patientType === t,
                        onChange: () => set("patientType", t),
                        className: "accent-accent",
                        "data-ocid": `register_patient.type_${t.toLowerCase()}_radio`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: t })
                  ]
                },
                t
              )) }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Contact Details", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Phone *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: form.phone,
                    onChange: (e) => set("phone", e.target.value),
                    placeholder: "+1 555 000 0000",
                    required: true,
                    "data-ocid": "register_patient.phone_input"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "email",
                    value: form.email,
                    onChange: (e) => set("email", e.target.value),
                    placeholder: "patient@example.com",
                    "data-ocid": "register_patient.email_input"
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Address", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.address,
                  onChange: (e) => set("address", e.target.value),
                  placeholder: "123 Main St, City, State",
                  "data-ocid": "register_patient.address_input"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Emergency Contact", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.emergencyContact,
                  onChange: (e) => set("emergencyContact", e.target.value),
                  placeholder: "Name: Jane Doe, Phone: +1 555 111 2222",
                  "data-ocid": "register_patient.emergency_contact_input"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Medical Information", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Allergies", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: form.allergyInput,
                      onChange: (e) => set("allergyInput", e.target.value),
                      onKeyDown: (e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addAllergy();
                        }
                      },
                      placeholder: "Type allergy and press Enter or Add",
                      "data-ocid": "register_patient.allergy_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      size: "sm",
                      onClick: addAllergy,
                      "data-ocid": "register_patient.add_allergy_button",
                      children: "Add"
                    }
                  )
                ] }),
                form.allergies.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: form.allergies.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-destructive/15 text-destructive border border-destructive/30",
                    children: [
                      a,
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => removeAllergy(a),
                          className: "hover:text-foreground transition-colors",
                          "aria-label": `Remove ${a}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
                        }
                      )
                    ]
                  },
                  a
                )) })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Notes", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: form.notes,
                  onChange: (e) => set("notes", e.target.value),
                  placeholder: "Additional notes about the patient…",
                  rows: 2,
                  "data-ocid": "register_patient.notes_textarea"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Insurance", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Insurance Provider", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.insuranceProvider,
                  onChange: (e) => set("insuranceProvider", e.target.value),
                  placeholder: "Blue Cross Blue Shield",
                  "data-ocid": "register_patient.insurance_provider_input"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Insurance ID", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.insuranceId,
                  onChange: (e) => set("insuranceId", e.target.value),
                  placeholder: "INS-0000-0000",
                  "data-ocid": "register_patient.insurance_id_input"
                }
              ) })
            ] }) })
          ]
        }
      )
    }
  );
}
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground border-b border-border pb-1", children: title }),
    children
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: label }),
    children
  ] });
}
function TransferPatientModal({ patient, wards, beds, onClose }) {
  const [wardId, setWardId] = reactExports.useState("");
  const [bedId, setBedId] = reactExports.useState("");
  const transferPatient = useTransferPatient();
  const availableBeds = reactExports.useMemo(() => {
    if (!wardId) return [];
    return beds.filter(
      (b) => {
        var _a;
        return b.wardId.toString() === wardId && b.status === BedStatus.Available && b.id.toString() !== ((_a = patient.admittedBedId) == null ? void 0 : _a.toString());
      }
    );
  }, [beds, wardId, patient.admittedBedId]);
  const selectedWard = wards.find((w) => w.id.toString() === wardId);
  const currentWard = wards.find(
    (w) => {
      var _a;
      return w.id.toString() === ((_a = patient.wardId) == null ? void 0 : _a.toString());
    }
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!wardId || !bedId) {
      ue.error("Please select a new ward and bed.");
      return;
    }
    const ward = wards.find((w) => w.id.toString() === wardId);
    const bed = beds.find((b) => b.id.toString() === bedId);
    if (!ward || !bed) return;
    try {
      await transferPatient.mutateAsync({
        patientId: patient.id,
        newWardId: ward.id,
        newBedId: bed.id
      });
      ue.success(
        `${patient.firstName} ${patient.lastName} transferred to ${ward.name} — Bed ${bed.bedNumber}.`
      );
      onClose();
    } catch (_err) {
      ue.error("Failed to transfer patient.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open: true,
      onClose,
      title: "Transfer Patient",
      description: `Move ${patient.firstName} ${patient.lastName} to a new ward`,
      size: "md",
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "transfer_patient.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            form: "transfer-patient-form",
            disabled: transferPatient.isPending || !wardId || !bedId,
            "data-ocid": "transfer_patient.submit_button",
            children: transferPatient.isPending ? "Transferring…" : "Transfer Patient"
          }
        )
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          id: "transfer-patient-form",
          onSubmit: handleSubmit,
          className: "space-y-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-5 w-5 text-accent" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-foreground", children: [
                  patient.firstName,
                  " ",
                  patient.lastName
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Currently in: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: (currentWard == null ? void 0 : currentWard.name) ?? "Unknown" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "New Ward *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  value: wardId,
                  onChange: (e) => {
                    setWardId(e.target.value);
                    setBedId("");
                  },
                  className: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground",
                  required: true,
                  "data-ocid": "transfer_patient.ward_select",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select new ward…" }),
                    wards.filter(
                      (w) => {
                        var _a;
                        return w.isActive && w.id.toString() !== ((_a = patient.wardId) == null ? void 0 : _a.toString());
                      }
                    ).map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: w.id.toString(), children: [
                      w.name,
                      " (",
                      w.wardType,
                      ")"
                    ] }, w.id.toString()))
                  ]
                }
              )
            ] }),
            wardId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs text-muted-foreground", children: [
                "Available Bed * (",
                availableBeds.length,
                " available)"
              ] }),
              availableBeds.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 shrink-0" }),
                "No available beds in ",
                selectedWard == null ? void 0 : selectedWard.name,
                ". Please select another ward."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  value: bedId,
                  onChange: (e) => setBedId(e.target.value),
                  className: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground",
                  required: true,
                  "data-ocid": "transfer_patient.bed_select",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select bed…" }),
                    availableBeds.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: b.id.toString(), children: [
                      "Bed ",
                      b.bedNumber
                    ] }, b.id.toString()))
                  ]
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
const STATUS_FILTERS = [
  "All",
  "OPD",
  "Admitted",
  "Discharged",
  "Transferred"
];
function getStatusVariant(status) {
  switch (status) {
    case PatientStatus.OPD:
      return "info";
    case PatientStatus.Admitted:
      return "success";
    case PatientStatus.Discharged:
      return "neutral";
    case PatientStatus.Transferred:
      return "reserved";
    default:
      return "neutral";
  }
}
function formatDate(ts) {
  if (!ts) return "—";
  return new Date(Number(ts) / 1e6).toLocaleDateString();
}
function PatientRowActions({
  patient,
  canAdmitDischarge,
  onView,
  onAdmit,
  onDischarge,
  onTransfer
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 justify-end", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        type: "button",
        variant: "ghost",
        size: "sm",
        onClick: onView,
        "data-ocid": "patients.view_button",
        className: "text-xs gap-1",
        children: [
          "View ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" })
        ]
      }
    ),
    canAdmitDischarge && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      patient.status === PatientStatus.OPD && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: onAdmit,
          "data-ocid": "patients.admit_button",
          className: "text-xs gap-1 text-green-400 border-green-500/30 hover:bg-green-500/10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bed, { className: "h-3 w-3" }),
            " Admit"
          ]
        }
      ),
      patient.status === PatientStatus.Admitted && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: onTransfer,
            "data-ocid": "patients.transfer_button",
            className: "text-xs gap-1 text-accent border-accent/30 hover:bg-accent/10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3 w-3" }),
              " Transfer"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: onDischarge,
            "data-ocid": "patients.discharge_button",
            className: "text-xs gap-1 text-muted-foreground hover:text-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-3 w-3" }),
              " Discharge"
            ]
          }
        )
      ] })
    ] })
  ] });
}
function PatientsPage() {
  const { user } = useAuth();
  const { data: patients = [], isLoading } = usePatients();
  const { data: wards = [] } = useWards();
  const { data: beds = [] } = useBeds();
  const [statusFilter, setStatusFilter] = reactExports.useState("All");
  const [selectedPatient, setSelectedPatient] = reactExports.useState(null);
  const [showRegister, setShowRegister] = reactExports.useState(false);
  const [admitTarget, setAdmitTarget] = reactExports.useState(null);
  const [dischargeTarget, setDischargeTarget] = reactExports.useState(null);
  const [transferTarget, setTransferTarget] = reactExports.useState(null);
  const canAdmitDischarge = (user == null ? void 0 : user.role) === UserRole.SuperAdmin || (user == null ? void 0 : user.role) === UserRole.Receptionist || (user == null ? void 0 : user.role) === UserRole.Nurse;
  const canRegister = (user == null ? void 0 : user.role) === UserRole.SuperAdmin || (user == null ? void 0 : user.role) === UserRole.Receptionist;
  const filteredData = reactExports.useMemo(() => {
    if (statusFilter === "All") return patients;
    const map = {
      OPD: PatientStatus.OPD,
      Admitted: PatientStatus.Admitted,
      Discharged: PatientStatus.Discharged,
      Transferred: PatientStatus.Transferred
    };
    return patients.filter(
      (p) => p.status === map[statusFilter]
    );
  }, [patients, statusFilter]);
  const wardMap = reactExports.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    for (const w of wards) m.set(w.id.toString(), w.name);
    return m;
  }, [wards]);
  const columns = reactExports.useMemo(
    () => [
      {
        accessorKey: "mrn",
        header: "MRN",
        cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-accent font-medium", children: row.original.mrn })
      },
      {
        id: "name",
        header: "Patient Name",
        accessorFn: (r) => `${r.firstName} ${r.lastName}`,
        cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "h-4 w-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-foreground text-sm truncate", children: [
              row.original.firstName,
              " ",
              row.original.lastName
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: row.original.phone })
          ] })
        ] })
      },
      {
        accessorKey: "gender",
        header: "Gender",
        cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: getValue() })
      },
      {
        accessorKey: "bloodGroup",
        header: "Blood",
        cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-accent", children: getValue() })
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const s = getValue();
          return /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: s, variant: getStatusVariant(s) });
        }
      },
      {
        id: "ward",
        header: "Ward",
        cell: ({ row }) => {
          const wid = row.original.wardId;
          if (!wid)
            return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "—" });
          return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: wardMap.get(wid.toString()) ?? "—" });
        }
      },
      {
        id: "admitted",
        header: "Admitted",
        cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatDate(row.original.admissionDate) })
      },
      {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          PatientRowActions,
          {
            patient: row.original,
            canAdmitDischarge,
            onView: () => setSelectedPatient(row.original),
            onAdmit: () => setAdmitTarget(row.original),
            onDischarge: () => setDischargeTarget(row.original),
            onTransfer: () => setTransferTarget(row.original)
          }
        )
      }
    ],
    [wardMap, canAdmitDischarge]
  );
  const statusCounts = reactExports.useMemo(() => {
    const counts = { All: patients.length };
    for (const p of patients) {
      counts[p.status] = (counts[p.status] ?? 0) + 1;
    }
    return counts;
  }, [patients]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", "data-ocid": "patients.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Patients",
        description: "Register, admit, discharge and manage all patients",
        breadcrumb: ["HMS", "Patients"],
        actions: canRegister ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: () => setShowRegister(true),
            className: "gap-2",
            "data-ocid": "patients.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4" }),
              "Register Patient"
            ]
          }
        ) : void 0
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      {
        label: "Total",
        key: "All",
        icon: UserRound,
        color: "text-foreground"
      },
      {
        label: "OPD",
        key: PatientStatus.OPD,
        icon: Stethoscope,
        color: "text-accent"
      },
      {
        label: "Admitted",
        key: PatientStatus.Admitted,
        icon: Bed,
        color: "text-green-400"
      },
      {
        label: "Discharged",
        key: PatientStatus.Discharged,
        icon: LogOut,
        color: "text-muted-foreground"
      }
    ].map(({ label, key, icon: Icon, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-4 flex items-center gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-lg bg-muted/30 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${color}` }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: statusCounts[key] ?? 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
          ] })
        ]
      },
      key
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 px-4 pt-4 border-b border-border overflow-x-auto", children: STATUS_FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setStatusFilter(f),
          "data-ocid": `patients.filter.${f.toLowerCase()}_tab`,
          className: `px-4 py-2 text-sm font-medium rounded-t-md whitespace-nowrap transition-colors ${statusFilter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/20"}`,
          children: [
            f,
            f !== "All" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5 text-xs opacity-70", children: [
              "(",
              statusCounts[f === "OPD" ? PatientStatus.OPD : f === "Admitted" ? PatientStatus.Admitted : f === "Discharged" ? PatientStatus.Discharged : PatientStatus.Transferred] ?? 0,
              ")"
            ] })
          ]
        },
        f
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        DataTable,
        {
          data: filteredData,
          columns,
          searchPlaceholder: "Search by name, MRN, or phone…",
          isLoading,
          pageSize: 10
        }
      ) })
    ] }),
    showRegister && /* @__PURE__ */ jsxRuntimeExports.jsx(
      RegisterPatientModal,
      {
        open: showRegister,
        onClose: () => setShowRegister(false)
      }
    ),
    admitTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AdmitPatientModal,
      {
        patient: admitTarget,
        wards,
        beds,
        onClose: () => setAdmitTarget(null)
      }
    ),
    dischargeTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DischargePatientModal,
      {
        patient: dischargeTarget,
        onClose: () => setDischargeTarget(null)
      }
    ),
    transferTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
      TransferPatientModal,
      {
        patient: transferTarget,
        wards,
        beds,
        onClose: () => setTransferTarget(null)
      }
    ),
    selectedPatient && /* @__PURE__ */ jsxRuntimeExports.jsx(
      PatientProfileDrawer,
      {
        patient: selectedPatient,
        wards,
        beds,
        onClose: () => setSelectedPatient(null),
        onAdmit: () => {
          setSelectedPatient(null);
          setAdmitTarget(selectedPatient);
        },
        onDischarge: () => {
          setSelectedPatient(null);
          setDischargeTarget(selectedPatient);
        },
        onTransfer: () => {
          setSelectedPatient(null);
          setTransferTarget(selectedPatient);
        }
      }
    )
  ] });
}
export {
  PatientsPage
};
