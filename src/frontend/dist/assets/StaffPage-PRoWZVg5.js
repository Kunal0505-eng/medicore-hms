import { c as createLucideIcon, h as useAuth, ac as useUsers, r as reactExports, U as UserRole, j as jsxRuntimeExports, m as PageHeader, a as Button, n as Stethoscope, C as ChevronRight, q as Clock, ad as UserCog, ae as Moon, af as Sun, S as StatusBadge, b as ue } from "./index-BGDDM1OA.js";
import { D as DataTable } from "./DataTable-DahQsLG7.js";
import { E as EmptyState } from "./EmptyState-DazVss1g.js";
import { M as Modal } from "./Modal-aMXHwIme.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-6WdRcw5_.js";
import { u as useDoctors, a as useDutyRoster, b as useLeaveRequests, c as useCreateDutyRoster, d as useCreateLeaveRequest, e as useUpdateLeaveStatus, f as useCreateDoctorProfile } from "./staff-BemJDYos.js";
import { a as UserPlus, U as UserRound, M as MapPin } from "./user-round-DB5_cVFE.js";
import { C as Calendar, D as DollarSign } from "./dollar-sign-5UJNMJBp.js";
import { C as CircleAlert } from "./circle-alert-DhzSXamA.js";
import { C as CircleCheck } from "./circle-check-Cdumymmt.js";
import { C as CircleX } from "./circle-x-BdGmpYec.js";
import "./input-BH-6abi_.js";
import "./chevron-up-AHw6P28i.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
];
const Briefcase = createLucideIcon("briefcase", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
      key: "j76jl0"
    }
  ],
  ["path", { d: "M22 10v6", key: "1lu8f3" }],
  ["path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5", key: "1r8lef" }]
];
const GraduationCap = createLucideIcon("graduation-cap", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]
];
const LayoutGrid = createLucideIcon("layout-grid", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 18h.01", key: "1tta3j" }],
  ["path", { d: "M3 6h.01", key: "1rqtza" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 18h13", key: "1lx6n3" }],
  ["path", { d: "M8 6h13", key: "ik3vkj" }]
];
const List = createLucideIcon("list", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 10V2", key: "16sf7g" }],
  ["path", { d: "m4.93 10.93 1.41 1.41", key: "2a7f42" }],
  ["path", { d: "M2 18h2", key: "j10viu" }],
  ["path", { d: "M20 18h2", key: "wocana" }],
  ["path", { d: "m19.07 10.93-1.41 1.41", key: "15zs5n" }],
  ["path", { d: "M22 22H2", key: "19qnx5" }],
  ["path", { d: "m16 6-4 4-4-4", key: "6wukr" }],
  ["path", { d: "M16 18a4 4 0 0 0-8 0", key: "1lzouq" }]
];
const Sunset = createLucideIcon("sunset", __iconNode);
const SHIFT_STYLES = {
  Morning: {
    bg: "bg-blue-500/20 border-blue-500/30 text-blue-400",
    icon: Sun,
    label: "Morning"
  },
  Afternoon: {
    bg: "bg-orange-500/20 border-orange-500/30 text-orange-400",
    icon: Sunset,
    label: "Afternoon"
  },
  Night: {
    bg: "bg-purple-500/20 border-purple-500/30 text-purple-400",
    icon: Moon,
    label: "Night"
  }
};
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
  "Pulmonology"
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
  "Dermatology"
];
const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function DoctorAvatar({
  name,
  size = "lg"
}) {
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("");
  const colors = [
    "from-blue-500 to-cyan-500",
    "from-teal-500 to-emerald-500",
    "from-violet-500 to-purple-500",
    "from-rose-500 to-pink-500",
    "from-amber-500 to-orange-500"
  ];
  const colorIdx = name.charCodeAt(0) % colors.length;
  const sizeClass = size === "lg" ? "h-16 w-16 text-xl" : "h-9 w-9 text-sm";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `${sizeClass} rounded-full bg-gradient-to-br ${colors[colorIdx]} flex items-center justify-center text-white font-bold shrink-0`,
      children: initials || /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "h-5 w-5" })
    }
  );
}
function ShiftBadge({ shift }) {
  const key = shift;
  const cfg = SHIFT_STYLES[key];
  if (!cfg) return /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: shift });
  const Icon = cfg.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${cfg.bg}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3 w-3" }),
        cfg.label
      ]
    }
  );
}
function DoctorCard({
  doctor,
  users,
  onClick
}) {
  const user = users.find((u) => u.id === doctor.userId);
  const name = (user == null ? void 0 : user.name) ?? `Doctor #${String(doctor.id)}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: () => onClick(doctor),
      className: "group bg-card border border-border rounded-xl p-5 hover:border-accent/50 hover:shadow-lg transition-all duration-200 text-left w-full",
      "data-ocid": `staff.doctor.card.${String(doctor.id)}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DoctorAvatar, { name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground truncate", children: name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground shrink-0 group-hover:text-accent transition-colors" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center px-2 py-0.5 mt-1 rounded-full text-xs font-medium bg-accent/15 text-accent border border-accent/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "h-3 w-3 mr-1" }),
              doctor.specialization
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2", children: [
          doctor.departmentId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-3 w-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: doctor.departmentId })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-3 w-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Consultation: $",
              (Number(doctor.consultationFee) / 100).toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              doctor.schedule.length,
              " schedule slots"
            ] })
          ] }),
          doctor.qualifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-3 w-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: doctor.qualifications.slice(0, 2).join(", ") })
          ] })
        ] })
      ]
    }
  );
}
function DoctorProfilePanel({
  doctor,
  users,
  onClose
}) {
  const user = users.find((u) => u.id === doctor.userId);
  const name = (user == null ? void 0 : user.name) ?? `Doctor #${String(doctor.id)}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open: true,
      onClose,
      title: "Doctor Profile",
      description: "Full professional profile and schedule",
      size: "lg",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "staff.doctor.profile.panel", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-5 p-4 bg-muted/20 rounded-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DoctorAvatar, { name, size: "lg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground", children: name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/15 text-accent border border-accent/30", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "h-3 w-3 mr-1" }),
                doctor.specialization
              ] }),
              user && /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: String(user.status) })
            ] }),
            (user == null ? void 0 : user.email) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: user.email })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/10 rounded-lg p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-3.5 w-3.5" }),
              " Department"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm", children: doctor.departmentId ?? "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/10 rounded-lg p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-3.5 w-3.5" }),
              " Consultation Fee"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-foreground text-sm", children: [
              "$",
              (Number(doctor.consultationFee) / 100).toFixed(2)
            ] })
          ] })
        ] }),
        doctor.wardIds.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-semibold text-foreground mb-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-accent" }),
            " Ward Assignments"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: doctor.wardIds.map((wId) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "px-2.5 py-1 rounded-lg text-xs bg-muted/30 border border-border text-muted-foreground",
              children: [
                "Ward ",
                wId
              ]
            },
            wId
          )) })
        ] }),
        doctor.qualifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-semibold text-foreground mb-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-4 w-4 text-accent" }),
            " Qualifications"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: doctor.qualifications.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: "flex items-center gap-2 text-sm text-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-accent shrink-0" }),
                q
              ]
            },
            q
          )) })
        ] }),
        doctor.schedule.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-accent" }),
            " Working Schedule"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: doctor.schedule.map((slot, _i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-border",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-accent w-8", children: DAYS_OF_WEEK[Number(slot.dayOfWeek)] ?? `Day ${String(slot.dayOfWeek)}` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-foreground", children: [
                    slot.startTime,
                    " – ",
                    slot.endTime
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "Max ",
                  String(slot.maxPatients),
                  " pts"
                ] })
              ]
            },
            `slot-${String(slot.dayOfWeek)}-${slot.startTime}`
          )) })
        ] })
      ] })
    }
  );
}
function AddDoctorModal({
  open,
  onClose,
  users
}) {
  const createDoctor = useCreateDoctorProfile();
  const [form, setForm] = reactExports.useState({
    userId: "",
    specialization: "",
    qualifications: [],
    qualInput: "",
    departmentId: "",
    consultationFee: "",
    slots: []
  });
  const addQualification = () => {
    if (form.qualInput.trim()) {
      setForm((f) => ({
        ...f,
        qualifications: [...f.qualifications, f.qualInput.trim()],
        qualInput: ""
      }));
    }
  };
  const addSlot = () => {
    setForm((f) => ({
      ...f,
      slots: [
        ...f.slots,
        { startTime: "09:00", endTime: "17:00", dayOfWeek: 1, maxPatients: 20 }
      ]
    }));
  };
  const updateSlot = (idx, key, value) => {
    setForm((f) => ({
      ...f,
      slots: f.slots.map((s, i) => i === idx ? { ...s, [key]: value } : s)
    }));
  };
  const handleSubmit = async () => {
    if (!form.userId || !form.specialization || !form.consultationFee) {
      ue.error("Please fill all required fields");
      return;
    }
    const schedule = form.slots.map((s) => ({
      startTime: s.startTime,
      endTime: s.endTime,
      dayOfWeek: BigInt(s.dayOfWeek),
      maxPatients: BigInt(s.maxPatients)
    }));
    try {
      await createDoctor.mutateAsync({
        userId: BigInt(form.userId),
        specialization: form.specialization,
        qualifications: form.qualifications,
        departmentId: form.departmentId || null,
        consultationFee: BigInt(
          Math.round(Number.parseFloat(form.consultationFee) * 100)
        ),
        schedule
      });
      ue.success("Doctor profile created successfully");
      onClose();
    } catch {
      ue.error("Failed to create doctor profile");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: "Add Doctor Profile",
      description: "Create a new doctor profile with schedule and qualifications",
      size: "xl",
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "staff.add_doctor.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: handleSubmit,
            disabled: createDoctor.isPending,
            "data-ocid": "staff.add_doctor.submit_button",
            children: createDoctor.isPending ? "Creating..." : "Create Profile"
          }
        )
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              className: "text-sm font-medium text-foreground",
              htmlFor: "doctor-user-select",
              children: [
                "Select User ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "doctor-user-select",
              value: form.userId,
              onChange: (e) => setForm((f) => ({ ...f, userId: e.target.value })),
              className: "w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring",
              "data-ocid": "staff.add_doctor.user_select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select a user..." }),
                users.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: String(u.id), children: [
                  u.name,
                  " (",
                  String(u.role),
                  ")"
                ] }, String(u.id)))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              className: "text-sm font-medium text-foreground",
              htmlFor: "doctor-specialization",
              children: [
                "Specialization ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "doctor-specialization",
              value: form.specialization,
              onChange: (e) => setForm((f) => ({ ...f, specialization: e.target.value })),
              className: "w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring",
              "data-ocid": "staff.add_doctor.specialization_select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select specialization..." }),
                SPECIALIZATIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                className: "text-sm font-medium text-foreground",
                htmlFor: "doctor-dept",
                children: "Department"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "doctor-dept",
                value: form.departmentId,
                onChange: (e) => setForm((f) => ({ ...f, departmentId: e.target.value })),
                className: "w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                "data-ocid": "staff.add_doctor.department_select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select department..." }),
                  DEPARTMENTS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: d, children: d }, d))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                className: "text-sm font-medium text-foreground",
                htmlFor: "doctor-fee",
                children: [
                  "Consultation Fee ($) ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "doctor-fee",
                type: "number",
                min: "0",
                step: "0.01",
                value: form.consultationFee,
                onChange: (e) => setForm((f) => ({ ...f, consultationFee: e.target.value })),
                placeholder: "50.00",
                className: "w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                "data-ocid": "staff.add_doctor.fee_input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Qualifications" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: form.qualInput,
                onChange: (e) => setForm((f) => ({ ...f, qualInput: e.target.value })),
                onKeyDown: (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addQualification();
                  }
                },
                placeholder: "e.g. MBBS, MD, FRCS...",
                className: "flex-1 h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                "data-ocid": "staff.add_doctor.qual_input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: addQualification,
                size: "sm",
                "data-ocid": "staff.add_doctor.add_qual_button",
                children: "Add"
              }
            )
          ] }),
          form.qualifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: form.qualifications.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-accent/15 text-accent border border-accent/30",
              children: [
                q,
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setForm((f) => ({
                      ...f,
                      qualifications: f.qualifications.filter((x) => x !== q)
                    })),
                    className: "hover:text-destructive",
                    "aria-label": `Remove ${q}`,
                    children: "×"
                  }
                )
              ]
            },
            q
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Working Hours" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: addSlot,
                "data-ocid": "staff.add_doctor.add_slot_button",
                children: "+ Add Slot"
              }
            )
          ] }),
          form.slots.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No schedule slots added yet." }),
          form.slots.map((slot, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "grid grid-cols-4 gap-2 p-3 bg-muted/10 rounded-lg border border-border",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      className: "text-xs text-muted-foreground",
                      htmlFor: `slot-day-${i}`,
                      children: "Day"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "select",
                    {
                      id: `slot-day-${i}`,
                      value: slot.dayOfWeek,
                      onChange: (e) => updateSlot(i, "dayOfWeek", Number(e.target.value)),
                      className: "w-full h-8 px-2 rounded border border-input bg-background text-foreground text-xs focus:outline-none",
                      children: DAYS_OF_WEEK.map((d, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: idx, children: d }, d))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      className: "text-xs text-muted-foreground",
                      htmlFor: `slot-start-${i}`,
                      children: "Start"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: `slot-start-${i}`,
                      type: "time",
                      value: slot.startTime,
                      onChange: (e) => updateSlot(i, "startTime", e.target.value),
                      className: "w-full h-8 px-2 rounded border border-input bg-background text-foreground text-xs focus:outline-none"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      className: "text-xs text-muted-foreground",
                      htmlFor: `slot-end-${i}`,
                      children: "End"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: `slot-end-${i}`,
                      type: "time",
                      value: slot.endTime,
                      onChange: (e) => updateSlot(i, "endTime", e.target.value),
                      className: "w-full h-8 px-2 rounded border border-input bg-background text-foreground text-xs focus:outline-none"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      className: "text-xs text-muted-foreground",
                      htmlFor: `slot-max-${i}`,
                      children: "Max Pts"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: `slot-max-${i}`,
                      type: "number",
                      min: "1",
                      value: slot.maxPatients,
                      onChange: (e) => updateSlot(i, "maxPatients", Number(e.target.value)),
                      className: "w-full h-8 px-2 rounded border border-input bg-background text-foreground text-xs focus:outline-none"
                    }
                  )
                ] })
              ]
            },
            `new-slot-${slot.dayOfWeek}-${slot.startTime}`
          ))
        ] })
      ] })
    }
  );
}
function DutyRosterTab({
  roster,
  users,
  isLoading
}) {
  const [showAddRoster, setShowAddRoster] = reactExports.useState(false);
  const createRoster = useCreateDutyRoster();
  const today = /* @__PURE__ */ new Date();
  const [weekOffset, setWeekOffset] = reactExports.useState(0);
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay() + weekOffset * 7);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });
  const [rosterForm, setRosterForm] = reactExports.useState({
    userId: "",
    date: today.toISOString().split("T")[0],
    shift: "Morning",
    wardId: ""
  });
  const handleAddRoster = async () => {
    if (!rosterForm.userId || !rosterForm.date) {
      ue.error("User and date are required");
      return;
    }
    try {
      await createRoster.mutateAsync({
        userId: BigInt(rosterForm.userId),
        date: rosterForm.date,
        shift: rosterForm.shift,
        wardId: rosterForm.wardId ? BigInt(rosterForm.wardId) : null
      });
      ue.success("Roster entry added");
      setShowAddRoster(false);
    } catch {
      ue.error("Failed to add roster entry");
    }
  };
  const getEntriesForDay = (day) => roster.filter((r) => r.date === day.toISOString().split("T")[0]);
  const shiftKey = (shift) => {
    if (typeof shift === "object" && shift !== null) {
      const k = Object.keys(shift)[0];
      return k || "Morning";
    }
    return String(shift) || "Morning";
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-2", children: ["d0", "d1", "d2", "d3", "d4", "d5", "d6"].map((dk) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 bg-muted/20 rounded-lg animate-pulse" }, dk)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "staff.roster.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: () => setWeekOffset((o) => o - 1),
            "data-ocid": "staff.roster.prev_week",
            children: "← Prev"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground", children: [
          weekDays[0].toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
          }),
          " – ",
          weekDays[6].toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
          })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: () => setWeekOffset((o) => o + 1),
            "data-ocid": "staff.roster.next_week",
            children: "Next →"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            onClick: () => setWeekOffset(0),
            children: "Today"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          size: "sm",
          onClick: () => setShowAddRoster(true),
          "data-ocid": "staff.roster.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 mr-1.5" }),
            " Add Entry"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1.5", children: weekDays.map((day) => {
      const entries = getEntriesForDay(day);
      const isToday = day.toDateString() === today.toDateString();
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `min-h-[160px] rounded-xl border p-2 ${isToday ? "border-accent/60 bg-accent/5" : "border-border bg-card"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: day.toLocaleDateString("en-US", { weekday: "short" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-sm font-bold ${isToday ? "bg-accent text-card w-6 h-6 rounded-full flex items-center justify-center mx-auto" : "text-foreground"}`,
                  children: day.getDate()
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              entries.map((entry) => {
                const sk = shiftKey(entry.shift);
                const cfg = SHIFT_STYLES[sk];
                const entryUser = users.find((u) => u.id === entry.userId);
                const Icon = (cfg == null ? void 0 : cfg.icon) ?? Sun;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `p-1.5 rounded-lg border text-xs ${(cfg == null ? void 0 : cfg.bg) ?? "bg-muted/30 border-border text-muted-foreground"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-2.5 w-2.5 shrink-0" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium truncate", children: sk })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs opacity-80 mt-0.5", children: (entryUser == null ? void 0 : entryUser.name) ?? `#${String(entry.userId)}` })
                    ]
                  },
                  String(entry.id)
                );
              }),
              entries.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/40 text-center pt-4", children: "—" })
            ] })
          ]
        },
        day.toISOString()
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 text-xs", children: Object.entries(SHIFT_STYLES).map(([key, cfg]) => {
      const Icon = cfg.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${cfg.bg}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3 w-3" }),
            cfg.label
          ]
        },
        key
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: showAddRoster,
        onClose: () => setShowAddRoster(false),
        title: "Add Roster Entry",
        description: "Assign a shift to a staff member",
        size: "sm",
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => setShowAddRoster(false),
              "data-ocid": "staff.roster.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: handleAddRoster,
              disabled: createRoster.isPending,
              "data-ocid": "staff.roster.confirm_button",
              children: createRoster.isPending ? "Adding..." : "Add Entry"
            }
          )
        ] }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                className: "text-sm font-medium text-foreground",
                htmlFor: "roster-user",
                children: "Staff Member"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "roster-user",
                value: rosterForm.userId,
                onChange: (e) => setRosterForm((f) => ({ ...f, userId: e.target.value })),
                className: "w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                "data-ocid": "staff.roster.user_select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select staff..." }),
                  users.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: String(u.id), children: [
                    u.name,
                    " (",
                    String(u.role),
                    ")"
                  ] }, String(u.id)))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                className: "text-sm font-medium text-foreground",
                htmlFor: "roster-date",
                children: "Date"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "roster-date",
                type: "date",
                value: rosterForm.date,
                onChange: (e) => setRosterForm((f) => ({ ...f, date: e.target.value })),
                className: "w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                "data-ocid": "staff.roster.date_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Shift" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["Morning", "Afternoon", "Night"].map((s) => {
              const cfg = SHIFT_STYLES[s];
              const Icon = cfg.icon;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setRosterForm((f) => ({ ...f, shift: s })),
                  className: `flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${rosterForm.shift === s ? cfg.bg : "bg-muted/10 border-border text-muted-foreground"}`,
                  "data-ocid": `staff.roster.shift_${s.toLowerCase()}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }),
                    s
                  ]
                },
                s
              );
            }) })
          ] })
        ] })
      }
    )
  ] });
}
function NursingStaffTab({
  users,
  isLoading
}) {
  const nurses = users.filter((u) => {
    const role = typeof u.role === "object" ? Object.keys(u.role)[0] : String(u.role);
    return role.toLowerCase() === "nurse";
  });
  const nurseColumns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ getValue, row }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-full bg-teal-500/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "h-4 w-4 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: String(getValue()) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: row.original.email })
        ] })
      ] })
    },
    {
      id: "department",
      header: "Department",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: row.original.departmentId ?? "—" })
    },
    {
      id: "ward",
      header: "Ward Assignment",
      cell: () => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "General Ward" })
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const s = getValue();
        const key = typeof s === "object" ? Object.keys(s)[0] : String(s);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: key });
      }
    },
    {
      id: "shift",
      header: "Shift",
      cell: () => /* @__PURE__ */ jsxRuntimeExports.jsx(ShiftBadge, { shift: "Morning" })
    }
  ];
  if (nurses.length === 0 && !isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCog, { className: "h-8 w-8" }),
        title: "No nursing staff found",
        description: "Nursing staff profiles will appear here once users with the Nurse role are created."
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "staff.nurses.section", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    DataTable,
    {
      data: nurses,
      columns: nurseColumns,
      isLoading,
      searchPlaceholder: "Search nursing staff..."
    }
  ) });
}
function LeaveRequestsTab({
  leaves,
  users,
  isLoading,
  canManage
}) {
  const [showAddLeave, setShowAddLeave] = reactExports.useState(false);
  const [approveComment, setApproveComment] = reactExports.useState("");
  const [selectedLeaveId, setSelectedLeaveId] = reactExports.useState(null);
  const [commentAction, setCommentAction] = reactExports.useState(null);
  const createLeave = useCreateLeaveRequest();
  const updateStatus = useUpdateLeaveStatus();
  const [leaveForm, setLeaveForm] = reactExports.useState({
    userId: "",
    startDate: "",
    endDate: "",
    reason: ""
  });
  const handleAddLeave = async () => {
    if (!leaveForm.userId || !leaveForm.startDate || !leaveForm.endDate || !leaveForm.reason) {
      ue.error("All fields are required");
      return;
    }
    try {
      await createLeave.mutateAsync({
        userId: BigInt(leaveForm.userId),
        startDate: leaveForm.startDate,
        endDate: leaveForm.endDate,
        reason: leaveForm.reason
      });
      ue.success("Leave request submitted");
      setShowAddLeave(false);
      setLeaveForm({ userId: "", startDate: "", endDate: "", reason: "" });
    } catch {
      ue.error("Failed to submit leave request");
    }
  };
  const handleUpdateStatus = async (id, status) => {
    try {
      await updateStatus.mutateAsync({
        id,
        status
      });
      ue.success(`Leave request ${status.toLowerCase()}`);
      setSelectedLeaveId(null);
      setCommentAction(null);
      setApproveComment("");
    } catch {
      ue.error("Failed to update leave status");
    }
  };
  const leaveColumns = [
    {
      id: "requester",
      header: "Requester",
      cell: ({ row }) => {
        const u = users.find((x) => x.id === row.original.userId);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-full bg-muted/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "h-4 w-4 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: (u == null ? void 0 : u.name) ?? `#${String(row.original.userId)}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: (u == null ? void 0 : u.role) ? String(u.role) : "" })
          ] })
        ] });
      }
    },
    {
      id: "dates",
      header: "Leave Period",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium", children: [
          row.original.startDate,
          " → ",
          row.original.endDate
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          Math.ceil(
            (new Date(row.original.endDate).getTime() - new Date(row.original.startDate).getTime()) / (1e3 * 60 * 60 * 24) + 1
          ),
          " ",
          "days"
        ] })
      ] })
    },
    {
      accessorKey: "reason",
      header: "Reason",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-[200px] truncate", children: String(getValue()) })
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        const s = row.original.status;
        const key = typeof s === "object" ? Object.keys(s)[0] : String(s);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: key });
      }
    },
    ...canManage ? [
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const s = row.original.status;
          const key = typeof s === "object" ? Object.keys(s)[0] : String(s);
          if (key.toLowerCase() !== "pending")
            return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "—" });
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  setSelectedLeaveId(row.original.id);
                  setCommentAction("approve");
                },
                className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-green-500/15 text-green-400 border border-green-500/30 hover:bg-green-500/25 transition-colors",
                "data-ocid": `staff.leave.approve_button.${String(row.original.id)}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
                  " Approve"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  setSelectedLeaveId(row.original.id);
                  setCommentAction("reject");
                },
                className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25 transition-colors",
                "data-ocid": `staff.leave.reject_button.${String(row.original.id)}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3 w-3" }),
                  " Reject"
                ]
              }
            )
          ] });
        }
      }
    ] : []
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "staff.leaves.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        size: "sm",
        onClick: () => setShowAddLeave(true),
        "data-ocid": "staff.leaves.add_button",
        children: "+ Request Leave"
      }
    ) }),
    leaves.length === 0 && !isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-8 w-8" }),
        title: "No leave requests",
        description: "Leave requests submitted by staff will appear here.",
        action: {
          label: "Request Leave",
          onClick: () => setShowAddLeave(true)
        }
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        data: leaves,
        columns: leaveColumns,
        isLoading,
        searchPlaceholder: "Search leave requests..."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: showAddLeave,
        onClose: () => setShowAddLeave(false),
        title: "Request Leave",
        description: "Submit a leave request for a staff member",
        size: "sm",
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => setShowAddLeave(false),
              "data-ocid": "staff.leave.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: handleAddLeave,
              disabled: createLeave.isPending,
              "data-ocid": "staff.leave.submit_button",
              children: createLeave.isPending ? "Submitting..." : "Submit Request"
            }
          )
        ] }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                className: "text-sm font-medium text-foreground",
                htmlFor: "leave-user",
                children: "Staff Member"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "leave-user",
                value: leaveForm.userId,
                onChange: (e) => setLeaveForm((f) => ({ ...f, userId: e.target.value })),
                className: "w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                "data-ocid": "staff.leave.user_select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select staff member..." }),
                  users.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: String(u.id), children: u.name }, String(u.id)))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  className: "text-sm font-medium text-foreground",
                  htmlFor: "leave-start",
                  children: "Start Date"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "leave-start",
                  type: "date",
                  value: leaveForm.startDate,
                  onChange: (e) => setLeaveForm((f) => ({ ...f, startDate: e.target.value })),
                  className: "w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                  "data-ocid": "staff.leave.start_date_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  className: "text-sm font-medium text-foreground",
                  htmlFor: "leave-end",
                  children: "End Date"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "leave-end",
                  type: "date",
                  value: leaveForm.endDate,
                  onChange: (e) => setLeaveForm((f) => ({ ...f, endDate: e.target.value })),
                  className: "w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                  "data-ocid": "staff.leave.end_date_input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                className: "text-sm font-medium text-foreground",
                htmlFor: "leave-reason",
                children: "Reason"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                id: "leave-reason",
                value: leaveForm.reason,
                onChange: (e) => setLeaveForm((f) => ({ ...f, reason: e.target.value })),
                rows: 3,
                placeholder: "Reason for leave...",
                className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none",
                "data-ocid": "staff.leave.reason_textarea"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: !!selectedLeaveId && !!commentAction,
        onClose: () => {
          setSelectedLeaveId(null);
          setCommentAction(null);
          setApproveComment("");
        },
        title: commentAction === "approve" ? "Approve Leave Request" : "Reject Leave Request",
        description: "Add an optional comment with your decision",
        size: "sm",
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => {
                setSelectedLeaveId(null);
                setCommentAction(null);
              },
              "data-ocid": "staff.leave.decision.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: commentAction === "approve" ? "default" : "destructive",
              onClick: () => {
                if (selectedLeaveId && commentAction)
                  handleUpdateStatus(
                    selectedLeaveId,
                    commentAction === "approve" ? "Approved" : "Rejected"
                  );
              },
              disabled: updateStatus.isPending,
              "data-ocid": "staff.leave.decision.confirm_button",
              children: updateStatus.isPending ? "Saving..." : commentAction === "approve" ? "Approve" : "Reject"
            }
          )
        ] }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: commentAction === "approve" ? "Are you sure you want to approve this leave request?" : "Are you sure you want to reject this leave request?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                className: "text-sm font-medium text-foreground",
                htmlFor: "leave-comment",
                children: "Comment (optional)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                id: "leave-comment",
                value: approveComment,
                onChange: (e) => setApproveComment(e.target.value),
                rows: 2,
                placeholder: "Add a comment...",
                className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none",
                "data-ocid": "staff.leave.comment_textarea"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
function StaffPage() {
  const { user } = useAuth();
  const { data: doctors = [], isLoading: dLoading } = useDoctors();
  const { data: users = [], isLoading: uLoading } = useUsers();
  const { data: roster = [], isLoading: rLoading } = useDutyRoster();
  const { data: leaves = [], isLoading: lLoading } = useLeaveRequests();
  const [viewMode, setViewMode] = reactExports.useState("grid");
  const [selectedDoctor, setSelectedDoctor] = reactExports.useState(
    null
  );
  const [showAddDoctor, setShowAddDoctor] = reactExports.useState(false);
  const [deptFilter, setDeptFilter] = reactExports.useState("all");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const canManageLeave = (user == null ? void 0 : user.role) === UserRole.SuperAdmin || (user == null ? void 0 : user.role) === UserRole.Receptionist;
  const filteredDoctors = doctors.filter((d) => {
    const u = users.find((x) => x.id === d.userId);
    const name = (u == null ? void 0 : u.name) ?? "";
    const matchesSearch = !searchQuery || name.toLowerCase().includes(searchQuery.toLowerCase()) || d.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = deptFilter === "all" || d.departmentId === deptFilter;
    return matchesSearch && matchesDept;
  });
  const doctorListColumns = [
    {
      id: "doctor",
      header: "Doctor",
      cell: ({ row }) => {
        const u = users.find((x) => x.id === row.original.userId);
        const name = (u == null ? void 0 : u.name) ?? `Doctor #${String(row.original.id)}`;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DoctorAvatar, { name, size: "sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: (u == null ? void 0 : u.email) ?? "" })
          ] })
        ] });
      }
    },
    {
      accessorKey: "specialization",
      header: "Specialization",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-accent/15 text-accent border border-accent/30", children: String(getValue()) })
    },
    {
      id: "department",
      header: "Department",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: row.original.departmentId ?? "—" })
    },
    {
      accessorKey: "consultationFee",
      header: "Fee",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums text-sm", children: [
        "$",
        (Number(getValue()) / 100).toFixed(2)
      ] })
    },
    {
      id: "schedule",
      header: "Slots",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
        row.original.schedule.length,
        " slots"
      ] })
    },
    {
      id: "view",
      header: "",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setSelectedDoctor(row.original),
          className: "text-xs text-accent hover:underline font-medium",
          "data-ocid": `staff.doctor.view_button.${String(row.original.id)}`,
          children: "View Profile"
        }
      )
    }
  ];
  const nurseCount = users.filter((u) => {
    const r = typeof u.role === "object" ? Object.keys(u.role)[0] : String(u.role);
    return r.toLowerCase() === "nurse";
  }).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "staff.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Doctors & Staff",
        description: "Manage doctor profiles, nursing staff, duty rosters, and leave requests",
        breadcrumb: ["Staff", "Management"],
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: deptFilter,
              onChange: (e) => setDeptFilter(e.target.value),
              className: "h-9 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none",
              "data-ocid": "staff.department_filter",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Departments" }),
                DEPARTMENTS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: d, children: d }, d))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "sm",
              onClick: () => setShowAddDoctor(true),
              "data-ocid": "staff.add_doctor_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4 mr-1.5" }),
                " Add Doctor"
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6", children: [
      {
        label: "Total Doctors",
        value: doctors.length,
        icon: Stethoscope,
        color: "text-accent"
      },
      {
        label: "Nursing Staff",
        value: nurseCount,
        icon: UserRound,
        color: "text-green-400"
      },
      {
        label: "Roster Entries",
        value: roster.length,
        icon: Calendar,
        color: "text-blue-400"
      },
      {
        label: "Leave Requests",
        value: leaves.length,
        icon: CircleAlert,
        color: "text-amber-400"
      }
    ].map(({ label, value, icon: Icon, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-4 flex items-center gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-lg bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${color}` }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
          ] })
        ]
      },
      label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "doctors", "data-ocid": "staff.tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "doctors", "data-ocid": "staff.doctors.tab", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "h-3.5 w-3.5 mr-1.5" }),
          " Doctors (",
          doctors.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "nurses", "data-ocid": "staff.nurses.tab", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "h-3.5 w-3.5 mr-1.5" }),
          " Nursing Staff"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "roster", "data-ocid": "staff.roster.tab", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5 mr-1.5" }),
          " Duty Roster"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "leaves", "data-ocid": "staff.leaves.tab", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3.5 w-3.5 mr-1.5" }),
          " Leave Requests (",
          leaves.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "doctors", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 mb-5 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "search",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                placeholder: "Search doctors...",
                "data-ocid": "staff.doctors.search_input",
                className: "w-full h-9 pl-9 pr-3 rounded-lg border border-input bg-muted/20 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-border rounded-lg overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setViewMode("grid"),
                className: `p-2 transition-colors ${viewMode === "grid" ? "bg-accent text-card" : "text-muted-foreground hover:bg-muted/20"}`,
                "aria-label": "Grid view",
                "data-ocid": "staff.doctors.grid_toggle",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setViewMode("list"),
                className: `p-2 transition-colors ${viewMode === "list" ? "bg-accent text-card" : "text-muted-foreground hover:bg-muted/20"}`,
                "aria-label": "List view",
                "data-ocid": "staff.doctors.list_toggle",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-4 w-4" })
              }
            )
          ] })
        ] }),
        dLoading ? viewMode === "grid" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: ["sk-0", "sk-1", "sk-2", "sk-3", "sk-4", "sk-5"].map(
          (sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-44 rounded-xl bg-muted/20 animate-pulse"
            },
            sk
          )
        ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["sl-0", "sl-1", "sl-2", "sl-3"].map((sl) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-12 rounded-lg bg-muted/20 animate-pulse"
          },
          sl
        )) }) : filteredDoctors.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "h-8 w-8" }),
            title: "No doctors found",
            description: "Add doctor profiles to get started or adjust your filters.",
            action: {
              label: "Add Doctor",
              onClick: () => setShowAddDoctor(true)
            }
          }
        ) : viewMode === "grid" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: filteredDoctors.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          DoctorCard,
          {
            doctor: d,
            users,
            onClick: setSelectedDoctor
          },
          String(d.id)
        )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          DataTable,
          {
            data: filteredDoctors,
            columns: doctorListColumns,
            searchPlaceholder: "Search doctors..."
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "nurses", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NursingStaffTab, { users, isLoading: uLoading }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "roster", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DutyRosterTab, { roster, users, isLoading: rLoading }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "leaves", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        LeaveRequestsTab,
        {
          leaves,
          users,
          isLoading: lLoading,
          canManage: !!canManageLeave
        }
      ) }) })
    ] }),
    selectedDoctor && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DoctorProfilePanel,
      {
        doctor: selectedDoctor,
        users,
        onClose: () => setSelectedDoctor(null)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddDoctorModal,
      {
        open: showAddDoctor,
        onClose: () => setShowAddDoctor(false),
        users
      }
    )
  ] });
}
export {
  StaffPage
};
