import { c as createLucideIcon, r as reactExports, a5 as WardType, k as useWards, i as usePatients, j as jsxRuntimeExports, m as PageHeader, T as TriangleAlert, a3 as cn, a6 as Skeleton, D as BedDouble, S as StatusBadge, a7 as useBedsByWard, a8 as useUpdateBedStatus, a as Button, h as useAuth, C as ChevronRight, B as BedStatus, a9 as HousekeepingStatus, b as ue, aa as useCreateBed, ab as useCreateWard, u as useAdmitPatient } from "./index-DZPPfMmg.js";
import { M as Modal } from "./Modal-BHmlK1FU.js";
import { I as Input } from "./input-Clo9Nqqp.js";
import { L as Label } from "./label-DqZ3T788.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BTTMIgyw.js";
import { R as RefreshCw } from "./refresh-cw-BQBoPnDy.js";
import { P as Plus } from "./plus-CgeKf2CL.js";
import { C as CircleCheckBig } from "./circle-check-big-D_Mpxmxn.js";
import { W as Wrench } from "./wrench-L7jRLAAA.js";
import "./chevron-up-Cdh06Vhn.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z", key: "sobvz5" }],
  ["path", { d: "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z", key: "11i496" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 22v-2", key: "1osdcq" }],
  ["path", { d: "m17 20.66-1-1.73", key: "eq3orb" }],
  ["path", { d: "M11 10.27 7 3.34", key: "16pf9h" }],
  ["path", { d: "m20.66 17-1.73-1", key: "sg0v6f" }],
  ["path", { d: "m3.34 7 1.73 1", key: "1ulond" }],
  ["path", { d: "M14 12h8", key: "4f43i9" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "m20.66 7-1.73 1", key: "1ow05n" }],
  ["path", { d: "m3.34 17 1.73-1", key: "nuk764" }],
  ["path", { d: "m17 3.34-1 1.73", key: "2wel8s" }],
  ["path", { d: "m11 13.73-4 6.93", key: "794ttg" }]
];
const Cog = createLucideIcon("cog", __iconNode);
const ESI_COLORS = {
  1: "ring-2 ring-red-500",
  2: "ring-2 ring-orange-500",
  3: "ring-2 ring-yellow-500",
  4: "ring-2 ring-green-500",
  5: "ring-2 ring-blue-500"
};
const BED_BG = {
  Available: "bg-green-500/10 border-green-500/30 hover:bg-green-500/20",
  Occupied: "bg-red-500/10 border-red-500/30 hover:bg-red-500/20",
  Maintenance: "bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20",
  Reserved: "bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20"
};
const BED_STATUS_ICON = {
  Available: "text-green-400",
  Occupied: "text-red-400",
  Maintenance: "text-amber-400",
  Reserved: "text-blue-400"
};
const WARD_TYPE_TABS = [
  WardType.ICU,
  WardType.General,
  WardType.Private,
  WardType.Maternity,
  WardType.Emergency
];
const WARD_TYPE_LABELS = {
  [WardType.ICU]: "🏥 ICU",
  [WardType.General]: "🛏️ General",
  [WardType.Private]: "🚪 Private",
  [WardType.Maternity]: "👶 Maternity",
  [WardType.Emergency]: "🚑 Emergency"
};
function BedCard({
  bed,
  patientName,
  esiLevel,
  onClick
}) {
  const bgClass = BED_BG[bed.status] ?? "bg-muted/20 border-border";
  const iconClass = BED_STATUS_ICON[bed.status] ?? "text-muted-foreground";
  const esiRing = esiLevel ? ESI_COLORS[esiLevel] ?? "" : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      "data-ocid": `ward.bed.${bed.bedNumber}`,
      className: cn(
        "relative border rounded-xl p-3 text-left cursor-pointer transition-smooth group min-h-[88px] flex flex-col justify-between",
        bgClass,
        esiRing
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-foreground truncate", children: bed.bedNumber }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { className: cn("h-3.5 w-3.5 shrink-0", iconClass) })
        ] }),
        bed.status === BedStatus.Occupied && patientName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate mt-1 leading-tight", children: patientName }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto pt-1 flex items-center justify-between gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "text-[9px] font-semibold uppercase tracking-wide",
                iconClass
              ),
              children: bed.status
            }
          ),
          bed.housekeepingStatus === HousekeepingStatus.Dirty && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-amber-400", title: "Dirty", children: "🧹" }),
          esiLevel && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] font-bold text-orange-400", children: [
            "ESI ",
            esiLevel
          ] })
        ] })
      ]
    }
  );
}
function WardStatsBar({ beds }) {
  const stats = [
    { label: "Total", count: beds.length, color: "text-foreground" },
    {
      label: "Occupied",
      count: beds.filter((b) => b.status === BedStatus.Occupied).length,
      color: "text-red-400"
    },
    {
      label: "Available",
      count: beds.filter((b) => b.status === BedStatus.Available).length,
      color: "text-green-400"
    },
    {
      label: "Reserved",
      count: beds.filter((b) => b.status === BedStatus.Reserved).length,
      color: "text-blue-400"
    },
    {
      label: "Maintenance",
      count: beds.filter((b) => b.status === BedStatus.Maintenance).length,
      color: "text-amber-400"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-3 mb-5", "data-ocid": "ward.stats_bar", children: stats.map(({ label, count, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-lg px-3 py-2 text-center",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-xl font-bold", color), children: count }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: label })
      ]
    },
    label
  )) });
}
function BedDetailPanel({
  bed,
  patientName,
  onClose,
  onStatusChange,
  onAssignPatient,
  isPending
}) {
  const [notes, setNotes] = reactExports.useState(bed.notes ?? "");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open: true,
      onClose,
      title: `Bed ${bed.bedNumber}`,
      description: `Status: ${bed.status} · Housekeeping: ${bed.housekeepingStatus}`,
      size: "md",
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            type: "button",
            onClick: onClose,
            "data-ocid": "ward.bed_detail.cancel_button",
            children: "Close"
          }
        ),
        bed.status !== BedStatus.Occupied && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            type: "button",
            disabled: isPending,
            onClick: () => onAssignPatient(bed),
            "data-ocid": "ward.bed_detail.assign_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5 mr-1" }),
              " Assign Patient"
            ]
          }
        ),
        bed.status !== BedStatus.Available && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            type: "button",
            disabled: isPending,
            className: "text-green-400 border-green-500/30 hover:bg-green-500/10",
            onClick: () => onStatusChange(
              bed.id,
              BedStatus.Available,
              bed.housekeepingStatus
            ),
            "data-ocid": "ward.bed_detail.mark_available_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3.5 w-3.5 mr-1" }),
              " Mark Available"
            ]
          }
        ),
        bed.status !== BedStatus.Maintenance && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            type: "button",
            disabled: isPending,
            className: "text-amber-400 border-amber-500/30 hover:bg-amber-500/10",
            onClick: () => onStatusChange(
              bed.id,
              BedStatus.Maintenance,
              bed.housekeepingStatus
            ),
            "data-ocid": "ward.bed_detail.mark_maintenance_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-3.5 w-3.5 mr-1" }),
              " Mark Maintenance"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            type: "button",
            disabled: isPending,
            className: bed.housekeepingStatus === HousekeepingStatus.Clean ? "text-amber-400 border-amber-500/30 hover:bg-amber-500/10" : "text-green-400 border-green-500/30 hover:bg-green-500/10",
            onClick: () => onStatusChange(
              bed.id,
              bed.status,
              bed.housekeepingStatus === HousekeepingStatus.Clean ? HousekeepingStatus.Dirty : HousekeepingStatus.Clean
            ),
            "data-ocid": "ward.bed_detail.toggle_hk_button",
            children: [
              "🧹",
              " ",
              bed.housekeepingStatus === HousekeepingStatus.Clean ? "Mark Dirty" : "Mark Clean"
            ]
          }
        )
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-lg p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Bed Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mt-0.5", children: bed.bedNumber })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-lg p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: bed.status, className: "mt-1" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-lg p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Housekeeping" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: bed.housekeepingStatus, className: "mt-1" })
          ] }),
          bed.status === BedStatus.Occupied && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-lg p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Patient" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mt-0.5 truncate", children: patientName ?? "—" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Notes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              className: "w-full mt-1 bg-input border border-border rounded-lg p-2 text-sm text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-ring",
              rows: 3,
              value: notes,
              onChange: (e) => setNotes(e.target.value),
              placeholder: "Add notes about this bed...",
              "data-ocid": "ward.bed_detail.notes_textarea"
            }
          )
        ] })
      ] })
    }
  );
}
function AddBedModal({
  open,
  onClose,
  wardId,
  wardName
}) {
  const [bedNumber, setBedNumber] = reactExports.useState("");
  const { mutateAsync, isPending } = useCreateBed();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bedNumber.trim()) return;
    try {
      await mutateAsync({ wardId, bedNumber: bedNumber.trim() });
      ue.success(`Bed ${bedNumber} added to ${wardName}`);
      setBedNumber("");
      onClose();
    } catch {
      ue.error("Failed to add bed");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: "Add Bed",
      description: `Adding bed to ${wardName}`,
      size: "sm",
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            type: "button",
            onClick: onClose,
            "data-ocid": "add_bed.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            type: "submit",
            form: "add-bed-form",
            disabled: isPending,
            "data-ocid": "add_bed.submit_button",
            children: isPending ? "Adding..." : "Add Bed"
          }
        )
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { id: "add-bed-form", onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bed-number", children: "Bed Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "bed-number",
              className: "mt-1",
              placeholder: "e.g. ICU-01, G-102",
              value: bedNumber,
              onChange: (e) => setBedNumber(e.target.value),
              required: true,
              "data-ocid": "add_bed.bed_number_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Ward" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 px-3 py-2 bg-muted/20 border border-border rounded-lg text-sm text-muted-foreground", children: [
            wardName,
            " (auto-assigned)"
          ] })
        ] })
      ] })
    }
  );
}
function WardConfigModal({
  open,
  onClose,
  ward
}) {
  const [name, setName] = reactExports.useState(ward.name);
  const { mutateAsync: createWard, isPending } = useCreateWard();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createWard({
        name,
        wardType: ward.wardType,
        totalBeds: ward.totalBeds,
        inchargeNurseId: ward.inchargeNurseId ?? null
      });
      ue.success(`Ward ${name} updated`);
      onClose();
    } catch {
      ue.error("Failed to update ward");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: "Ward Configuration",
      description: `Editing: ${ward.name}`,
      size: "sm",
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            type: "button",
            onClick: onClose,
            "data-ocid": "ward_config.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            type: "submit",
            form: "ward-config-form",
            disabled: isPending,
            "data-ocid": "ward_config.save_button",
            children: isPending ? "Saving..." : "Save Changes"
          }
        )
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { id: "ward-config-form", onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ward-name", children: "Ward Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "ward-name",
              className: "mt-1",
              value: name,
              onChange: (e) => setName(e.target.value),
              required: true,
              "data-ocid": "ward_config.name_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Ward Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 px-3 py-2 bg-muted/20 border border-border rounded-lg text-sm text-muted-foreground", children: ward.wardType })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Total Beds" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 px-3 py-2 bg-muted/20 border border-border rounded-lg text-sm text-muted-foreground", children: String(ward.totalBeds) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: ward.isActive ? "Active" : "Inactive" }) })
        ] })
      ] })
    }
  );
}
function AssignPatientModal({
  open,
  onClose,
  bed,
  wardId
}) {
  const { data: patients } = usePatients();
  const { mutateAsync: admitPatient, isPending } = useAdmitPatient();
  const [selectedPatientId, setSelectedPatientId] = reactExports.useState("");
  const unassignedPatients = (patients == null ? void 0 : patients.filter(
    (p) => p.status !== "Admitted" && p.status !== "Transferred"
  )) ?? [];
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatientId) return;
    try {
      await admitPatient({
        patientId: BigInt(selectedPatientId),
        bedId: bed.id,
        wardId
      });
      ue.success(`Patient assigned to Bed ${bed.bedNumber}`);
      onClose();
    } catch {
      ue.error("Failed to assign patient");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: "Assign Patient to Bed",
      description: `Bed ${bed.bedNumber}`,
      size: "sm",
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            type: "button",
            onClick: onClose,
            "data-ocid": "assign_patient.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            type: "submit",
            form: "assign-patient-form",
            disabled: isPending || !selectedPatientId,
            "data-ocid": "assign_patient.submit_button",
            children: isPending ? "Assigning..." : "Assign"
          }
        )
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "form",
        {
          id: "assign-patient-form",
          onSubmit: handleSubmit,
          className: "space-y-4",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "patient-select", children: "Select Patient" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: selectedPatientId,
                onValueChange: setSelectedPatientId,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      id: "patient-select",
                      className: "mt-1",
                      "data-ocid": "assign_patient.patient_select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choose a patient..." })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: unassignedPatients.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", disabled: true, children: "No available patients" }) : unassignedPatients.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(p.id), children: [
                    p.firstName,
                    " ",
                    p.lastName,
                    " — ",
                    p.mrn
                  ] }, String(p.id))) })
                ]
              }
            )
          ] })
        }
      )
    }
  );
}
function BedGrid({
  ward,
  patients,
  erTriages
}) {
  const { data: beds, isLoading } = useBedsByWard(ward.id);
  const { mutateAsync: updateBedStatus, isPending } = useUpdateBedStatus();
  const [selectedBed, setSelectedBed] = reactExports.useState(null);
  const [addBedOpen, setAddBedOpen] = reactExports.useState(false);
  const [wardConfigOpen, setWardConfigOpen] = reactExports.useState(false);
  const [assignPatientBed, setAssignPatientBed] = reactExports.useState(null);
  const getPatientForBed = (bed) => {
    if (!bed.patientId) return void 0;
    const p = patients.find((pt) => pt.id === bed.patientId);
    return p ? `${p.firstName} ${p.lastName}` : void 0;
  };
  const getEsiForBed = (bed) => {
    const triage = erTriages.find(
      (t) => t.bedId !== void 0 && t.bedId === bed.id
    );
    return triage ? Number(triage.esiLevel) : void 0;
  };
  const handleStatusChange = async (bedId, status, hk) => {
    try {
      await updateBedStatus({
        bedId,
        status,
        housekeepingStatus: hk,
        notes: null
      });
      ue.success(`Bed status updated to ${status}`);
      setSelectedBed(null);
    } catch {
      ue.error("Failed to update bed status");
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2", children: ["s0", "s1", "s2", "s3", "s4", "s5", "s6", "s7"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[88px] rounded-xl" }, k)) });
  }
  if (!beds || beds.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-10 text-center",
        "data-ocid": "ward.beds.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { className: "h-10 w-10 text-muted-foreground/40 mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No beds in this ward yet." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "mt-3",
              type: "button",
              onClick: () => setAddBedOpen(true),
              "data-ocid": "ward.beds.add_first_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5 mr-1" }),
                " Add First Bed"
              ]
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(WardStatsBar, { beds }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        beds.length,
        " beds — click a bed to manage"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            type: "button",
            onClick: () => setWardConfigOpen(true),
            "data-ocid": `ward.config_button.${ward.wardType}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Cog, { className: "h-3.5 w-3.5 mr-1" }),
              " Configure"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            type: "button",
            onClick: () => setAddBedOpen(true),
            "data-ocid": `ward.add_bed_button.${ward.wardType}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5 mr-1" }),
              " Add Bed"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-12 gap-2", children: beds.map((bed) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      BedCard,
      {
        bed,
        patientName: getPatientForBed(bed),
        esiLevel: getEsiForBed(bed),
        onClick: () => setSelectedBed(bed)
      },
      String(bed.id)
    )) }),
    selectedBed && /* @__PURE__ */ jsxRuntimeExports.jsx(
      BedDetailPanel,
      {
        bed: selectedBed,
        patientName: getPatientForBed(selectedBed),
        onClose: () => setSelectedBed(null),
        onStatusChange: handleStatusChange,
        onAssignPatient: (b) => {
          setSelectedBed(null);
          setAssignPatientBed(b);
        },
        isPending
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddBedModal,
      {
        open: addBedOpen,
        onClose: () => setAddBedOpen(false),
        wardId: ward.id,
        wardName: ward.name
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      WardConfigModal,
      {
        open: wardConfigOpen,
        onClose: () => setWardConfigOpen(false),
        ward
      }
    ),
    assignPatientBed && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AssignPatientModal,
      {
        open: !!assignPatientBed,
        onClose: () => setAssignPatientBed(null),
        bed: assignPatientBed,
        wardId: ward.id
      }
    )
  ] });
}
const MOCK_TRANSFERS = [
  {
    id: "t1",
    patient: "Arun Mehta",
    from: "G-201",
    to: "ICU-03",
    requester: "Dr. Sharma",
    status: "Pending"
  },
  {
    id: "t2",
    patient: "Priya Kapoor",
    from: "M-101",
    to: "P-02",
    requester: "Dr. Rajan",
    status: "Pending"
  }
];
function TransferRequestsTable() {
  const [transfers, setTransfers] = reactExports.useState(MOCK_TRANSFERS);
  const { user } = useAuth();
  const isAdmin = (user == null ? void 0 : user.role) === "SuperAdmin" || (user == null ? void 0 : user.role) === "Nurse";
  const handleAction = (id, action) => {
    setTransfers(
      (prev) => prev.map(
        (t) => t.id === id ? { ...t, status: action === "approve" ? "Approved" : "Rejected" } : t
      )
    );
    ue.success(
      `Transfer request ${action === "approve" ? "approved" : "rejected"}`
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-5",
      "data-ocid": "ward.transfer_requests.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Transfer Requests" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Pending bed transfer approvals" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatusBadge,
            {
              status: `${transfers.filter((t) => t.status === "Pending").length} Pending`,
              variant: "warning"
            }
          )
        ] }),
        transfers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-sm text-muted-foreground text-center py-6",
            "data-ocid": "ward.transfer_requests.empty_state",
            children: "No pending transfer requests"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: [
            "Patient",
            "From Bed",
            "To Bed",
            "Requester",
            "Status",
            "Actions"
          ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: "text-left text-xs text-muted-foreground font-medium py-2 px-3",
              children: h
            },
            h
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: transfers.map((t, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-b border-border/50 hover:bg-muted/10 transition-colors",
              "data-ocid": `ward.transfer.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 font-medium text-foreground", children: t.patient }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-muted-foreground", children: t.from }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t.from }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-medium", children: t.to })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-muted-foreground", children: t.requester }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: t.status }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: t.status === "Pending" && isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      type: "button",
                      className: "h-6 text-xs",
                      onClick: () => handleAction(t.id, "approve"),
                      "data-ocid": `ward.transfer.approve_button.${idx + 1}`,
                      children: "Approve"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      type: "button",
                      className: "h-6 text-xs text-red-400 border-red-500/30 hover:bg-red-500/10",
                      onClick: () => handleAction(t.id, "reject"),
                      "data-ocid": `ward.transfer.reject_button.${idx + 1}`,
                      children: "Reject"
                    }
                  )
                ] }) })
              ]
            },
            t.id
          )) })
        ] }) })
      ]
    }
  );
}
function WardPage() {
  const [activeTab, setActiveTab] = reactExports.useState(WardType.General);
  const { data: wards, isLoading: wardsLoading } = useWards();
  const { data: patients } = usePatients();
  const erTriages = [];
  const activeWard = wards == null ? void 0 : wards.find((w) => w.wardType === activeTab);
  const patientList = (patients ?? []).map((p) => ({
    id: p.id,
    firstName: p.firstName,
    lastName: p.lastName,
    admittedBedId: p.admittedBedId
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "ward.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Ward & Bed Management",
        description: "Visual bed map, occupancy tracking, and real-time ER monitoring",
        breadcrumb: ["Clinical", "Ward & Beds"],
        actions: activeTab === WardType.Emergency ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/30 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            RefreshCw,
            {
              className: "h-3.5 w-3.5 text-red-400 animate-spin",
              style: { animationDuration: "3s" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-red-400 font-medium", children: "Live · 5s" })
        ] }) : void 0
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-1 bg-muted/30 border border-border rounded-xl p-1 mb-6 overflow-x-auto",
        "data-ocid": "ward.tab_bar",
        children: WARD_TYPE_TABS.map((wt) => {
          const isActive = activeTab === wt;
          const wardExists = wards == null ? void 0 : wards.some((w) => w.wardType === wt);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setActiveTab(wt),
              "data-ocid": `ward.tab.${wt.toLowerCase()}`,
              className: cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth flex-1 justify-center",
                isActive ? wt === WardType.Emergency ? "bg-red-500/20 text-red-300 shadow-sm" : "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-card/50"
              ),
              children: [
                WARD_TYPE_LABELS[wt],
                !wardExists && !wardsLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] bg-muted/40 text-muted-foreground px-1 rounded", children: "setup" }),
                wt === WardType.Emergency && isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3 text-red-400" })
              ]
            },
            wt
          );
        })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-5",
        "data-ocid": "ward.ward_panel",
        children: wardsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded-lg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-3", children: ["s0", "s1", "s2", "s3", "s4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-lg" }, k)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2", children: ["b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[88px] rounded-xl" }, k)) })
        ] }) : !activeWard ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-16 text-center",
            "data-ocid": "ward.no_ward_empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { className: "h-14 w-14 text-muted-foreground/30 mb-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-base font-semibold text-foreground mb-1", children: [
                activeTab,
                " Ward Not Configured"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "This ward type has not been created yet. Use System Administration to configure wards." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center text-lg",
                  activeTab === WardType.Emergency ? "bg-red-500/20" : "bg-accent/15"
                ),
                children: activeTab === WardType.ICU ? "🏥" : activeTab === WardType.Emergency ? "🚑" : activeTab === WardType.Maternity ? "👶" : activeTab === WardType.Private ? "🚪" : "🛏️"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: activeWard.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                activeWard.wardType,
                " · Capacity:",
                " ",
                String(activeWard.totalBeds),
                " beds",
                activeTab === WardType.Emergency && " · Polling every 5s"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatusBadge,
              {
                status: activeWard.isActive ? "Active" : "Inactive"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            BedGrid,
            {
              ward: activeWard,
              patients: patientList,
              erTriages
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TransferRequestsTable, {}) })
  ] });
}
export {
  WardPage
};
