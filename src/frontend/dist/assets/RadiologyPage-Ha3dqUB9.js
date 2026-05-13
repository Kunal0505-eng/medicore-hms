import { c as createLucideIcon, Y as useActor, Z as useQuery, _ as useQueryClient, $ as useMutation, a0 as createActor, i as usePatients, r as reactExports, a1 as ImagingType, a2 as RadiologyStatus, j as jsxRuntimeExports, m as PageHeader, a as Button, a3 as cn, a4 as Radiation, C as ChevronRight, b as ue } from "./index-DZPPfMmg.js";
import { D as DataTable } from "./DataTable-AcgTuFIu.js";
import { E as EmptyState } from "./EmptyState-kK5PcP6O.js";
import { M as Modal } from "./Modal-BHmlK1FU.js";
import { I as Input } from "./input-Clo9Nqqp.js";
import { L as Label } from "./label-DqZ3T788.js";
import { T as Textarea } from "./textarea-D_eYIBJX.js";
import { u as useDoctors } from "./staff-DDNDShPh.js";
import { P as Plus } from "./plus-CgeKf2CL.js";
import { U as Upload } from "./upload-ChLO4CTU.js";
import { A as Activity } from "./activity-CMtMSC-q.js";
import "./chevron-up-Cdh06Vhn.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["circle", { cx: "10", cy: "12", r: "2", key: "737tya" }],
  ["path", { d: "m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22", key: "wt3hpn" }]
];
const FileImage = createLucideIcon("file-image", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }],
  ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]
];
const Monitor = createLucideIcon("monitor", __iconNode);
function useRadiologyOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["radiologyOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRadiologyOrders();
    },
    enabled: !!actor && !isFetching
  });
}
function useCreateRadiologyOrder() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args) => {
      if (!actor) throw new Error("No actor");
      return actor.createRadiologyOrder(
        args.patientId,
        args.doctorId,
        args.imagingType,
        args.bodyPart,
        args.clinicalIndication
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["radiologyOrders"] })
  });
}
function useUpdateRadiologyReport() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args) => {
      if (!actor) throw new Error("No actor");
      return actor.updateRadiologyReport(
        args.id,
        args.reportUrl,
        args.findings,
        args.radiologistId,
        args.status
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["radiologyOrders"] })
  });
}
const IMAGING_COLORS = {
  XRay: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  MRI: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  CT: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  Ultrasound: "bg-teal-500/15 text-teal-400 border-teal-500/30",
  Other: "bg-muted/30 text-muted-foreground border-border"
};
const IMAGING_LABELS = {
  XRay: "X-Ray",
  MRI: "MRI",
  CT: "CT Scan",
  Ultrasound: "Ultrasound",
  Other: "Other"
};
function ImagingBadge({ type }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        IMAGING_COLORS[type] ?? IMAGING_COLORS.Other
      ),
      children: IMAGING_LABELS[type] ?? type
    }
  );
}
function RadiologyStatusBadge({ status }) {
  const variants = {
    Ordered: "bg-muted/30 text-muted-foreground border-border",
    ImagingDone: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    ReportReady: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    Reported: "bg-green-500/15 text-green-400 border-green-500/30"
  };
  const labels = {
    Ordered: "Ordered",
    ImagingDone: "Imaging Done",
    ReportReady: "Report Ready",
    Reported: "Reported"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variants[status] ?? variants.Ordered
      ),
      children: labels[status] ?? status
    }
  );
}
const STATUS_NEXT = {
  [RadiologyStatus.Ordered]: RadiologyStatus.ImagingDone,
  [RadiologyStatus.ImagingDone]: RadiologyStatus.ReportReady
};
const STATUS_NEXT_LABEL = {
  [RadiologyStatus.Ordered]: "Mark Imaging Done",
  [RadiologyStatus.ImagingDone]: "Mark Report Ready"
};
function RadiologyPage() {
  const { data: orders, isLoading } = useRadiologyOrders();
  const { data: patients } = usePatients();
  const { data: doctors } = useDoctors();
  const createOrder = useCreateRadiologyOrder();
  const updateReport = useUpdateRadiologyReport();
  const [activeTab, setActiveTab] = reactExports.useState("orders");
  const [filterType, setFilterType] = reactExports.useState("all");
  const [filterStatus, setFilterStatus] = reactExports.useState("all");
  const [filterDateFrom, setFilterDateFrom] = reactExports.useState("");
  const [filterDateTo, setFilterDateTo] = reactExports.useState("");
  const [showForm, setShowForm] = reactExports.useState(false);
  const [uploadModal, setUploadModal] = reactExports.useState(null);
  const [dicomModal, setDicomModal] = reactExports.useState(null);
  const [reportViewModal, setReportViewModal] = reactExports.useState(
    null
  );
  const [form, setForm] = reactExports.useState({
    patientId: "",
    doctorId: "",
    imagingType: ImagingType.XRay,
    bodyPart: "",
    clinicalIndication: ""
  });
  const [reportForm, setReportForm] = reactExports.useState({
    findings: "",
    recommendations: "",
    fileName: ""
  });
  const getPatientName = (id) => {
    const p = patients == null ? void 0 : patients.find((pt) => pt.id === id);
    return p ? `${p.firstName} ${p.lastName}` : `#${id}`;
  };
  const getDoctorName = (id) => {
    const d = doctors == null ? void 0 : doctors.find((dr) => dr.userId === id);
    return d ? `Dr. ${d.specialization}` : `#${id}`;
  };
  const filteredOrders = reactExports.useMemo(() => {
    if (!orders) return [];
    return orders.filter((o) => {
      if (filterType !== "all" && o.imagingType !== filterType) return false;
      if (filterStatus !== "all" && o.status !== filterStatus) return false;
      if (filterDateFrom) {
        const d = new Date(Number(o.createdAt) / 1e6);
        if (d < new Date(filterDateFrom)) return false;
      }
      if (filterDateTo) {
        const d = new Date(Number(o.createdAt) / 1e6);
        if (d > /* @__PURE__ */ new Date(`${filterDateTo}T23:59:59`)) return false;
      }
      return true;
    });
  }, [orders, filterType, filterStatus, filterDateFrom, filterDateTo]);
  const completedOrders = reactExports.useMemo(
    () => (orders ?? []).filter((o) => o.status === RadiologyStatus.Reported),
    [orders]
  );
  const orderColumns = [
    {
      id: "orderId",
      header: "Order ID",
      accessorFn: (r) => `RAD-${String(r.id).padStart(4, "0")}`,
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: String(getValue()) })
    },
    {
      id: "patient",
      header: "Patient",
      accessorFn: (r) => getPatientName(r.patientId),
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: String(getValue()) })
    },
    {
      id: "doctor",
      header: "Ordered By",
      accessorFn: (r) => getDoctorName(r.doctorId)
    },
    {
      accessorKey: "imagingType",
      header: "Imaging Type",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx(ImagingBadge, { type: String(getValue()) })
    },
    { accessorKey: "bodyPart", header: "Body Part" },
    {
      accessorKey: "clinicalIndication",
      header: "Indication",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground line-clamp-1 max-w-[180px] block", children: String(getValue()) })
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx(RadiologyStatusBadge, { status: String(getValue()) })
    },
    {
      id: "date",
      header: "Date",
      accessorFn: (r) => new Date(Number(r.createdAt) / 1e6).toLocaleDateString(),
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: String(getValue()) })
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const order = row.original;
        const nextStatus = STATUS_NEXT[order.status];
        const nextLabel = STATUS_NEXT_LABEL[order.status];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          nextStatus && nextLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "outline",
              onClick: () => updateReport.mutate(
                {
                  id: order.id,
                  reportUrl: order.reportUrl ?? null,
                  findings: order.findings ?? null,
                  radiologistId: order.radiologistId ?? null,
                  status: nextStatus
                },
                { onSuccess: () => ue.success("Status updated") }
              ),
              "data-ocid": `radiology.advance_button.${row.index + 1}`,
              className: "text-xs whitespace-nowrap",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3 mr-1" }),
                nextLabel
              ]
            }
          ),
          order.status === RadiologyStatus.ReportReady && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "sm",
              onClick: () => {
                setUploadModal(order);
                setReportForm({
                  findings: "",
                  recommendations: "",
                  fileName: ""
                });
              },
              "data-ocid": `radiology.upload_button.${row.index + 1}`,
              className: "text-xs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3 w-3 mr-1" }),
                "Upload Report"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "ghost",
              onClick: () => setDicomModal(order),
              "data-ocid": `radiology.dicom_button.${row.index + 1}`,
              className: "text-xs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "h-3 w-3 mr-1" }),
                "View Images"
              ]
            }
          )
        ] });
      }
    }
  ];
  const reportColumns = [
    {
      id: "patient",
      header: "Patient",
      accessorFn: (r) => getPatientName(r.patientId),
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: String(getValue()) })
    },
    {
      accessorKey: "imagingType",
      header: "Imaging Type",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx(ImagingBadge, { type: String(getValue()) })
    },
    { accessorKey: "bodyPart", header: "Body Part" },
    {
      id: "findings",
      header: "Findings (excerpt)",
      accessorFn: (r) => r.findings ?? "—",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground line-clamp-2 max-w-[220px] block", children: String(getValue()) })
    },
    {
      id: "radiologist",
      header: "Radiologist",
      accessorFn: (r) => r.radiologistId ? getDoctorName(r.radiologistId) : "—"
    },
    {
      id: "date",
      header: "Date",
      accessorFn: (r) => new Date(Number(r.createdAt) / 1e6).toLocaleDateString(),
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: String(getValue()) })
    },
    {
      id: "reportActions",
      header: "",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          size: "sm",
          variant: "outline",
          onClick: () => setReportViewModal(row.original),
          "data-ocid": `radiology.view_report_button.${row.index + 1}`,
          children: "View Report"
        }
      )
    }
  ];
  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      await createOrder.mutateAsync({
        patientId: BigInt(form.patientId),
        doctorId: BigInt(form.doctorId),
        imagingType: form.imagingType,
        bodyPart: form.bodyPart,
        clinicalIndication: form.clinicalIndication
      });
      ue.success("Radiology order created");
      setShowForm(false);
      setForm({
        patientId: "",
        doctorId: "",
        imagingType: ImagingType.XRay,
        bodyPart: "",
        clinicalIndication: ""
      });
    } catch {
      ue.error("Failed to create radiology order");
    }
  };
  const handleUploadReport = async (e) => {
    e.preventDefault();
    if (!uploadModal) return;
    const combined = reportForm.recommendations ? `${reportForm.findings}

Recommendations: ${reportForm.recommendations}` : reportForm.findings;
    try {
      await updateReport.mutateAsync({
        id: uploadModal.id,
        reportUrl: reportForm.fileName ? `reports/${reportForm.fileName}` : null,
        findings: combined,
        radiologistId: null,
        status: RadiologyStatus.Reported
      });
      ue.success("Report submitted and marked as Reported");
      setUploadModal(null);
    } catch {
      ue.error("Failed to submit report");
    }
  };
  const hasActiveFilters = filterType !== "all" || filterStatus !== "all" || !!filterDateFrom || !!filterDateTo;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "radiology.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Radiology",
        description: "Imaging orders, DICOM viewer, and radiology reports",
        breadcrumb: ["Clinical", "Radiology"],
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: () => setShowForm(true),
            "data-ocid": "radiology.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
              "New Order"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 mb-6 border-b border-border", children: ["orders", "reports"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setActiveTab(tab),
        className: cn(
          "px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px capitalize",
          activeTab === tab ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"
        ),
        "data-ocid": `radiology.${tab}_tab`,
        children: [
          tab === "orders" ? "Radiology Orders" : "Reports",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs bg-muted/60 px-1.5 py-0.5 rounded-full", children: tab === "orders" ? filteredOrders.length : completedOrders.length })
        ]
      },
      tab
    )) }),
    activeTab === "orders" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 flex flex-wrap gap-3 items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Imaging Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: filterType,
              onChange: (e) => setFilterType(e.target.value),
              className: "rounded-md border border-input bg-background px-3 py-1.5 text-sm min-w-[130px]",
              "data-ocid": "radiology.filter.type_select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Types" }),
                Object.values(ImagingType).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t, children: IMAGING_LABELS[t] ?? t }, t))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: filterStatus,
              onChange: (e) => setFilterStatus(e.target.value),
              className: "rounded-md border border-input bg-background px-3 py-1.5 text-sm min-w-[140px]",
              "data-ocid": "radiology.filter.status_select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Statuses" }),
                Object.values(RadiologyStatus).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "From" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: filterDateFrom,
              onChange: (e) => setFilterDateFrom(e.target.value),
              className: "text-sm py-1.5 h-auto",
              "data-ocid": "radiology.filter.date_from"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "To" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: filterDateTo,
              onChange: (e) => setFilterDateTo(e.target.value),
              className: "text-sm py-1.5 h-auto",
              "data-ocid": "radiology.filter.date_to"
            }
          )
        ] }),
        hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            onClick: () => {
              setFilterType("all");
              setFilterStatus("all");
              setFilterDateFrom("");
              setFilterDateTo("");
            },
            "data-ocid": "radiology.filter.clear_button",
            children: "Clear Filters"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-6", children: filteredOrders.length === 0 && !isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Radiation, { className: "h-8 w-8" }),
          title: "No radiology orders",
          description: "No orders match the current filters. Create a new order to get started.",
          action: {
            label: "New Order",
            onClick: () => setShowForm(true)
          }
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        DataTable,
        {
          data: filteredOrders,
          columns: orderColumns,
          searchPlaceholder: "Search orders by patient, body part...",
          isLoading
        }
      ) })
    ] }),
    activeTab === "reports" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-6", children: completedOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { className: "h-8 w-8" }),
        title: "No completed reports",
        description: "Completed radiology reports will appear here once orders reach the Reported status."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        data: completedOrders,
        columns: reportColumns,
        searchPlaceholder: "Search reports by patient...",
        isLoading
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: showForm,
        onClose: () => setShowForm(false),
        title: "New Radiology Order",
        description: "Order an imaging study for a patient",
        size: "md",
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => setShowForm(false),
              "data-ocid": "radiology.form.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              form: "radiology-order-form",
              disabled: createOrder.isPending,
              "data-ocid": "radiology.form.submit_button",
              children: createOrder.isPending ? "Creating..." : "Create Order"
            }
          )
        ] }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            id: "radiology-order-form",
            onSubmit: handleCreateOrder,
            className: "space-y-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Patient" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: form.patientId,
                    onChange: (e) => setForm({ ...form, patientId: e.target.value }),
                    className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                    required: true,
                    "data-ocid": "radiology.form.patient_select",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select patient..." }),
                      patients == null ? void 0 : patients.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: String(p.id), children: [
                        p.firstName,
                        " ",
                        p.lastName
                      ] }, String(p.id)))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Ordering Doctor" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: form.doctorId,
                    onChange: (e) => setForm({ ...form, doctorId: e.target.value }),
                    className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                    required: true,
                    "data-ocid": "radiology.form.doctor_select",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select doctor..." }),
                      doctors == null ? void 0 : doctors.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: String(d.userId), children: [
                        d.specialization,
                        " — ID #",
                        String(d.userId)
                      ] }, String(d.userId)))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Imaging Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "select",
                    {
                      value: form.imagingType,
                      onChange: (e) => setForm({ ...form, imagingType: e.target.value }),
                      className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                      "data-ocid": "radiology.form.type_select",
                      children: Object.values(ImagingType).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t, children: IMAGING_LABELS[t] ?? t }, t))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Body Part" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: form.bodyPart,
                      onChange: (e) => setForm({ ...form, bodyPart: e.target.value }),
                      required: true,
                      placeholder: "e.g. Chest, Knee, Head",
                      "data-ocid": "radiology.form.bodypart_input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Clinical Indication" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    value: form.clinicalIndication,
                    onChange: (e) => setForm({ ...form, clinicalIndication: e.target.value }),
                    required: true,
                    placeholder: "Describe the clinical reason for this imaging study...",
                    rows: 3,
                    "data-ocid": "radiology.form.indication_textarea"
                  }
                )
              ] })
            ]
          }
        )
      }
    ),
    uploadModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: !!uploadModal,
        onClose: () => setUploadModal(null),
        title: "Upload Radiology Report",
        description: `${IMAGING_LABELS[uploadModal.imagingType] ?? uploadModal.imagingType} — ${uploadModal.bodyPart}`,
        size: "md",
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => setUploadModal(null),
              "data-ocid": "radiology.upload.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              form: "radiology-report-form",
              disabled: updateReport.isPending,
              "data-ocid": "radiology.upload.submit_button",
              children: updateReport.isPending ? "Saving..." : "Submit Report"
            }
          )
        ] }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            id: "radiology-report-form",
            onSubmit: handleUploadReport,
            className: "space-y-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-lg bg-muted/30 border border-border text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Patient: " }),
                getPatientName(uploadModal.patientId),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2", children: "·" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Ordered: " }),
                new Date(
                  Number(uploadModal.createdAt) / 1e6
                ).toLocaleDateString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Findings" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    value: reportForm.findings,
                    onChange: (e) => setReportForm({ ...reportForm, findings: e.target.value }),
                    required: true,
                    placeholder: "Describe imaging findings in detail...",
                    rows: 4,
                    "data-ocid": "radiology.upload.findings_textarea"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Recommendations" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    value: reportForm.recommendations,
                    onChange: (e) => setReportForm({
                      ...reportForm,
                      recommendations: e.target.value
                    }),
                    placeholder: "Clinical recommendations based on findings...",
                    rows: 3,
                    "data-ocid": "radiology.upload.recommendations_textarea"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Report File (PDF / Image)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    className: "flex flex-col items-center justify-center gap-2 w-full h-24 rounded-lg border-2 border-dashed border-border bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer text-sm text-muted-foreground",
                    "data-ocid": "radiology.upload.dropzone",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-5 w-5" }),
                      reportForm.fileName ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: reportForm.fileName }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Click to select file or drag & drop" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "file",
                          accept: ".pdf,image/*",
                          className: "sr-only",
                          onChange: (e) => {
                            var _a, _b;
                            return setReportForm({
                              ...reportForm,
                              fileName: ((_b = (_a = e.target.files) == null ? void 0 : _a[0]) == null ? void 0 : _b.name) ?? ""
                            });
                          },
                          "data-ocid": "radiology.upload.file_input"
                        }
                      )
                    ]
                  }
                )
              ] })
            ]
          }
        )
      }
    ),
    dicomModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: !!dicomModal,
        onClose: () => setDicomModal(null),
        title: "DICOM Image Viewer",
        description: `${IMAGING_LABELS[dicomModal.imagingType] ?? dicomModal.imagingType} — ${getPatientName(dicomModal.patientId)}`,
        size: "lg",
        footer: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setDicomModal(null),
            "data-ocid": "radiology.dicom.close_button",
            children: "Close"
          }
        ) }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "radiology.dicom.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full aspect-video rounded-xl bg-black/60 border border-border flex flex-col items-center justify-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-12 w-12 text-muted-foreground/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "No images loaded" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground/60 text-sm mt-1", children: "DICOM image frames will appear here" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["W/L", "Zoom", "Pan", "Rotate", "Measure"].map((tool) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "px-2 py-1 text-xs rounded bg-muted/30 text-muted-foreground border border-border cursor-not-allowed opacity-50",
                children: tool
              },
              tool
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-lg bg-accent/10 border border-accent/30 flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "h-5 w-5 text-accent shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "DICOM Image Viewer integration coming soon. Images stored in cloud storage." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-0.5", children: "Full DICOM viewer with windowing, zoom, annotations, and multi-series support will be enabled in a future release." })
            ] })
          ] })
        ] })
      }
    ),
    reportViewModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: !!reportViewModal,
        onClose: () => setReportViewModal(null),
        title: "Radiology Report",
        description: `${IMAGING_LABELS[reportViewModal.imagingType] ?? reportViewModal.imagingType} — ${reportViewModal.bodyPart}`,
        size: "md",
        footer: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setReportViewModal(null),
            "data-ocid": "radiology.report_view.close_button",
            children: "Close"
          }
        ) }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "radiology.report_view.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Patient" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: getPatientName(reportViewModal.patientId) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Study Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: new Date(
                Number(reportViewModal.createdAt) / 1e6
              ).toLocaleDateString() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Imaging Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ImagingBadge, { type: reportViewModal.imagingType })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(RadiologyStatusBadge, { status: reportViewModal.status })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Clinical Indication" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm bg-muted/20 rounded-lg p-3 border border-border", children: reportViewModal.clinicalIndication })
          ] }),
          reportViewModal.findings && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Findings & Recommendations" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm bg-muted/20 rounded-lg p-3 border border-border whitespace-pre-line", children: reportViewModal.findings })
          ] }),
          reportViewModal.reportUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Report File" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: reportViewModal.reportUrl,
                className: "text-accent text-sm hover:underline flex items-center gap-1.5",
                target: "_blank",
                rel: "noopener noreferrer",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { className: "h-4 w-4" }),
                  reportViewModal.reportUrl
                ]
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  RadiologyPage
};
