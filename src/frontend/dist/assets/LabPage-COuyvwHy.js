import { c as createLucideIcon, h as useAuth, O as useLabOrders, i as usePatients, Q as useCreateLabOrder, R as useUpdateLabResult, V as useUpdateLabStatus, r as reactExports, U as UserRole, W as LabStatus, j as jsxRuntimeExports, m as PageHeader, a as Button, T as TriangleAlert, X as FlaskConical, S as StatusBadge, b as ue } from "./index-DZPPfMmg.js";
import { D as DataTable } from "./DataTable-AcgTuFIu.js";
import { E as EmptyState } from "./EmptyState-kK5PcP6O.js";
import { M as Modal } from "./Modal-BHmlK1FU.js";
import { I as Input } from "./input-Clo9Nqqp.js";
import { L as Label } from "./label-DqZ3T788.js";
import { S as Skeleton } from "./skeleton-DhSf2wGn.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-9iSmyv76.js";
import { u as useDoctors } from "./staff-DDNDShPh.js";
import { P as Plus } from "./plus-CgeKf2CL.js";
import { C as ClipboardList } from "./clipboard-list-B5KKi9nP.js";
import { C as CircleCheckBig } from "./circle-check-big-D_Mpxmxn.js";
import { U as Upload } from "./upload-ChLO4CTU.js";
import "./chevron-up-Cdh06Vhn.js";
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
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2", key: "125lnx" }],
  ["path", { d: "M8.5 2h7", key: "csnxdl" }],
  ["path", { d: "M14.5 16h-5", key: "1ox875" }]
];
const TestTube = createLucideIcon("test-tube", __iconNode);
const TEST_OPTIONS = [
  { name: "Blood Group", type: "Hematology", refRange: "A/B/AB/O" },
  {
    name: "Complete Blood Count (CBC)",
    type: "Hematology",
    refRange: "RBC: 4.5–5.5, WBC: 4–11 K/uL"
  },
  {
    name: "Thyroid Profile (T3/T4/TSH)",
    type: "Biochemistry",
    refRange: "TSH: 0.4–4.0 mIU/L"
  },
  {
    name: "Lipid Panel",
    type: "Biochemistry",
    refRange: "Total Chol: <200, LDL: <130 mg/dL"
  },
  {
    name: "Kidney Function Test (KFT)",
    type: "Biochemistry",
    refRange: "Creatinine: 0.6–1.2 mg/dL"
  },
  {
    name: "Liver Function Test (LFT)",
    type: "Biochemistry",
    refRange: "ALT: 7–56, AST: 10–40 U/L"
  },
  { name: "X-ray Chest", type: "Radiology", refRange: "N/A" },
  { name: "Ultrasound Abdomen", type: "Radiology", refRange: "N/A" },
  { name: "ECG", type: "Cardiology", refRange: "HR: 60–100 bpm" },
  { name: "CT Head", type: "Radiology", refRange: "N/A" }
];
const STATUS_BADGE_MAP = {
  [LabStatus.Ordered]: { label: "Ordered", variant: "neutral" },
  [LabStatus.SampleCollected]: { label: "Sample Collected", variant: "info" },
  [LabStatus.Processing]: { label: "Processing", variant: "warning" },
  [LabStatus.ResultReady]: { label: "Result Ready", variant: "success" },
  [LabStatus.Reported]: { label: "Reported", variant: "success" }
};
function LabStatusBadge({ status }) {
  const mapped = STATUS_BADGE_MAP[status];
  if (!mapped) return /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: mapped.label, variant: mapped.variant });
}
function CriticalBadge() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3" }),
    "CRITICAL"
  ] });
}
function formatDate(ts) {
  if (!ts) return "—";
  const ms = Number(ts) / 1e6;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function formatDateTime(ts) {
  if (!ts) return "—";
  const ms = Number(ts) / 1e6;
  return new Date(ms).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function LabPage() {
  const { user } = useAuth();
  const { data: orders, isLoading } = useLabOrders();
  const { data: patients } = usePatients();
  const { data: doctors } = useDoctors();
  const createOrder = useCreateLabOrder();
  const updateResult = useUpdateLabResult();
  const updateStatus = useUpdateLabStatus();
  const [showForm, setShowForm] = reactExports.useState(false);
  const [resultModal, setResultModal] = reactExports.useState(null);
  const [viewModal, setViewModal] = reactExports.useState(null);
  const [activeTab, setActiveTab] = reactExports.useState("orders");
  const [orderForm, setOrderForm] = reactExports.useState({
    patientId: "",
    patientSearch: "",
    doctorId: "",
    testName: "",
    testType: "Hematology",
    notes: ""
  });
  const [resultForm, setResultForm] = reactExports.useState({
    resultValue: "",
    referenceRange: "",
    isCritical: false,
    notes: "",
    resultFile: ""
  });
  const role = (user == null ? void 0 : user.role) ?? UserRole.Patient;
  const isLabTech = role === UserRole.LabTechnician;
  const isDoctor = role === UserRole.Doctor;
  const isPatient = role === UserRole.Patient;
  const isAdmin = role === UserRole.SuperAdmin;
  const canOrder = isDoctor || isAdmin;
  const canEnterResult = isLabTech || isAdmin;
  const patientName = (patientId) => {
    const p = patients == null ? void 0 : patients.find((x) => x.id === patientId);
    return p ? `${p.firstName} ${p.lastName}` : `#${patientId}`;
  };
  const doctorLabel = (doctorId) => {
    const d = doctors == null ? void 0 : doctors.find((x) => x.id === doctorId);
    return d ? `Dr. ${d.specialization}` : `#${doctorId}`;
  };
  const visibleOrders = isPatient && user ? (orders ?? []).filter((o) => o.patientId === user.userId) : orders ?? [];
  const criticalOrders = visibleOrders.filter((o) => o.isCritical);
  const sampleTrackingOrders = visibleOrders.filter(
    (o) => o.status === LabStatus.Ordered || o.status === LabStatus.SampleCollected
  );
  const completedOrders = visibleOrders.filter(
    (o) => o.status === LabStatus.ResultReady || o.status === LabStatus.Reported
  );
  const filteredPatients = orderForm.patientSearch ? (patients ?? []).filter(
    (p) => `${p.firstName} ${p.lastName}`.toLowerCase().includes(orderForm.patientSearch.toLowerCase()) || String(p.id).includes(orderForm.patientSearch)
  ) : patients ?? [];
  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!orderForm.patientId || !orderForm.doctorId || !orderForm.testName) {
      ue.error("Please fill all required fields");
      return;
    }
    try {
      await createOrder.mutateAsync({
        patientId: BigInt(orderForm.patientId),
        doctorId: BigInt(orderForm.doctorId),
        visitId: null,
        testType: orderForm.testType,
        testName: orderForm.testName
      });
      ue.success("Lab order created successfully");
      setShowForm(false);
      setOrderForm({
        patientId: "",
        patientSearch: "",
        doctorId: "",
        testName: "",
        testType: "Hematology",
        notes: ""
      });
    } catch {
      ue.error("Failed to create lab order");
    }
  };
  const handleResultSubmit = async (e) => {
    e.preventDefault();
    if (!resultModal) return;
    try {
      await updateResult.mutateAsync({
        id: resultModal.id,
        resultValue: resultForm.resultValue || null,
        resultFile: resultForm.resultFile || null,
        isCritical: resultForm.isCritical,
        referenceRange: resultForm.referenceRange || null,
        notes: resultForm.notes || null
      });
      if (resultForm.isCritical) {
        ue.error("⚠️ CRITICAL VALUE — Doctor has been notified", {
          duration: 8e3
        });
      } else {
        ue.success("Result entered successfully");
      }
      setResultModal(null);
      setResultForm({
        resultValue: "",
        referenceRange: "",
        isCritical: false,
        notes: "",
        resultFile: ""
      });
    } catch {
      ue.error("Failed to enter result");
    }
  };
  const handleCollectSample = async (order, position) => {
    try {
      await updateStatus.mutateAsync({
        id: order.id,
        status: LabStatus.SampleCollected
      });
      ue.success(`Sample collected for order #${position}`);
    } catch {
      ue.error("Failed to update status");
    }
  };
  const openResultModal = (order) => {
    setResultModal(order);
    const testOpt = TEST_OPTIONS.find((t) => t.name === order.testName);
    setResultForm({
      resultValue: "",
      referenceRange: (testOpt == null ? void 0 : testOpt.refRange) ?? "",
      isCritical: false,
      notes: "",
      resultFile: ""
    });
  };
  const openViewModal = (order) => {
    setViewModal({
      ...order,
      patientName: patientName(order.patientId),
      doctorName: doctorLabel(order.doctorId)
    });
  };
  const handleTestSelect = (testName) => {
    const opt = TEST_OPTIONS.find((t) => t.name === testName);
    setOrderForm((prev) => ({
      ...prev,
      testName,
      testType: (opt == null ? void 0 : opt.type) ?? prev.testType
    }));
  };
  const ordersColumns = [
    {
      id: "id",
      header: "Order ID",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
        "LAB-",
        String(row.original.id).padStart(4, "0")
      ] })
    },
    {
      id: "patient",
      header: "Patient",
      accessorFn: (r) => patientName(r.patientId),
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: patientName(row.original.patientId) })
    },
    {
      id: "doctor",
      header: "Ordered By",
      accessorFn: (r) => doctorLabel(r.doctorId)
    },
    { accessorKey: "testName", header: "Test" },
    { accessorKey: "testType", header: "Category" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LabStatusBadge, { status: row.original.status }),
        row.original.isCritical && /* @__PURE__ */ jsxRuntimeExports.jsx(CriticalBadge, {})
      ] })
    },
    {
      id: "orderedAt",
      header: "Ordered",
      accessorFn: (r) => formatDate(r.createdAt)
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const o = row.original;
        const pos = row.index + 1;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "ghost",
              onClick: () => openViewModal(o),
              "data-ocid": `lab.view_button.${pos}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
            }
          ),
          canEnterResult && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "outline",
              onClick: () => openResultModal(o),
              disabled: o.status === LabStatus.Reported,
              "data-ocid": `lab.result_button.${pos}`,
              children: "Enter Result"
            }
          ),
          canEnterResult && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "ghost",
              onClick: () => handleCollectSample(o, pos),
              disabled: o.status !== LabStatus.Ordered,
              "data-ocid": `lab.collect_button.${pos}`,
              children: "Collect"
            }
          )
        ] });
      }
    }
  ];
  const sampleColumns = [
    {
      id: "id",
      header: "Order ID",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
        "LAB-",
        String(row.original.id).padStart(4, "0")
      ] })
    },
    {
      id: "patient",
      header: "Patient",
      accessorFn: (r) => patientName(r.patientId),
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: patientName(row.original.patientId) })
    },
    { accessorKey: "testName", header: "Test" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(LabStatusBadge, { status: row.original.status })
    },
    {
      id: "collected",
      header: "Sample Collected At",
      accessorFn: (r) => formatDateTime(r.sampleCollectedAt)
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const o = row.original;
        const pos = row.index + 1;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          canEnterResult && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "sm",
              onClick: () => handleCollectSample(o, pos),
              disabled: o.status !== LabStatus.Ordered,
              "data-ocid": `lab.sample.collect_button.${pos}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TestTube, { className: "h-4 w-4 mr-1" }),
                o.status === LabStatus.SampleCollected ? "Collected" : "Mark Collected"
              ]
            }
          ),
          canEnterResult && o.status === LabStatus.SampleCollected && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "outline",
              onClick: () => openResultModal(o),
              "data-ocid": `lab.sample.result_button.${pos}`,
              children: "Enter Result"
            }
          )
        ] });
      }
    }
  ];
  const resultsColumns = [
    {
      id: "patient",
      header: "Patient",
      accessorFn: (r) => patientName(r.patientId),
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: patientName(row.original.patientId) })
    },
    { accessorKey: "testName", header: "Test" },
    {
      accessorKey: "resultValue",
      header: "Result",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: row.original.isCritical ? "text-red-400 font-bold" : "font-medium",
          children: row.original.resultValue ?? "—"
        }
      )
    },
    {
      id: "refRange",
      header: "Reference Range",
      accessorFn: (r) => r.referenceRange ?? "—"
    },
    {
      id: "normalcy",
      header: "Assessment",
      cell: ({ row }) => row.original.isCritical ? /* @__PURE__ */ jsxRuntimeExports.jsx(CriticalBadge, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: "Normal", variant: "success" })
    },
    {
      id: "doctor",
      header: "Ordered By",
      accessorFn: (r) => doctorLabel(r.doctorId)
    },
    {
      id: "resultDate",
      header: "Result Date",
      accessorFn: (r) => formatDate(r.resultEnteredAt)
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          size: "sm",
          variant: "ghost",
          onClick: () => openViewModal(row.original),
          "data-ocid": `lab.results.view_button.${row.index + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4 mr-1" }),
            " View Report"
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "lab.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Laboratory Management",
        description: "Lab orders, sample collection, result reporting, and critical alerts",
        breadcrumb: ["Clinical", "Laboratory"],
        actions: canOrder ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: () => setShowForm(true),
            "data-ocid": "lab.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
              "New Lab Order"
            ]
          }
        ) : void 0
      }
    ),
    criticalOrders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mb-4 p-4 bg-red-500/10 border border-red-500/40 rounded-lg flex items-center gap-3",
        "data-ocid": "lab.critical_banner",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-red-400 shrink-0 animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-red-400", children: "⚠️ CRITICAL VALUE — Notify doctor immediately" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-red-400/70 mt-0.5", children: [
              criticalOrders.length,
              " critical result",
              criticalOrders.length > 1 ? "s" : "",
              " requiring immediate attention: ",
              criticalOrders.map((o) => o.testName).join(", ")
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "orders", "data-ocid": "lab.orders.tab", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-4 w-4 mr-2" }),
          "Lab Orders (",
          visibleOrders.length,
          ")"
        ] }),
        !isPatient && /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "samples", "data-ocid": "lab.samples.tab", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TestTube, { className: "h-4 w-4 mr-2" }),
          "Sample Tracking (",
          sampleTrackingOrders.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "results", "data-ocid": "lab.results.tab", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 mr-2" }),
          "Results (",
          completedOrders.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "orders", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LabSkeleton, {}) : visibleOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "h-8 w-8" }),
          title: "No lab orders",
          description: canOrder ? "Create the first lab order to get started." : "No lab orders have been placed yet.",
          action: canOrder ? {
            label: "New Lab Order",
            onClick: () => setShowForm(true)
          } : void 0,
          "data-ocid": "lab.orders.empty_state"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        DataTable,
        {
          data: visibleOrders,
          columns: ordersColumns,
          searchPlaceholder: "Search orders by patient, test...",
          isLoading: false
        }
      ) }) }),
      !isPatient && /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "samples", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-6", children: sampleTrackingOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TestTube, { className: "h-8 w-8" }),
          title: "No pending samples",
          description: "All samples have been processed.",
          "data-ocid": "lab.samples.empty_state"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        DataTable,
        {
          data: sampleTrackingOrders,
          columns: sampleColumns,
          searchPlaceholder: "Search samples...",
          isLoading: false
        }
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "results", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-6", children: completedOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "h-8 w-8" }),
          title: "No results yet",
          description: "Results will appear here once samples are processed.",
          "data-ocid": "lab.results.empty_state"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        DataTable,
        {
          data: completedOrders,
          columns: resultsColumns,
          searchPlaceholder: "Search results...",
          isLoading: false
        }
      ) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: showForm,
        onClose: () => setShowForm(false),
        title: "New Lab Order",
        description: "Create a laboratory test order for a patient",
        size: "md",
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => setShowForm(false),
              "data-ocid": "lab.form.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              form: "lab-order-form",
              disabled: createOrder.isPending,
              "data-ocid": "lab.form.submit_button",
              children: createOrder.isPending ? "Creating..." : "Create Order"
            }
          )
        ] }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            id: "lab-order-form",
            onSubmit: handleOrderSubmit,
            className: "space-y-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Search Patient" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: orderForm.patientSearch,
                    onChange: (e) => setOrderForm((prev) => ({
                      ...prev,
                      patientSearch: e.target.value,
                      patientId: ""
                    })),
                    placeholder: "Search by name or ID...",
                    "data-ocid": "lab.form.patient_search"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                  "Patient ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: orderForm.patientId,
                    onChange: (e) => setOrderForm((prev) => ({ ...prev, patientId: e.target.value })),
                    className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                    required: true,
                    "data-ocid": "lab.form.patient_select",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select patient..." }),
                      filteredPatients.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: String(p.id), children: [
                        p.firstName,
                        " ",
                        p.lastName,
                        " — ID #",
                        String(p.id)
                      ] }, String(p.id)))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                  "Ordering Doctor ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: orderForm.doctorId,
                    onChange: (e) => setOrderForm((prev) => ({ ...prev, doctorId: e.target.value })),
                    className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                    required: true,
                    "data-ocid": "lab.form.doctor_select",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select doctor..." }),
                      (doctors ?? []).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: String(d.id), children: [
                        "Dr. ",
                        d.specialization,
                        " — ID #",
                        String(d.id)
                      ] }, String(d.id)))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                  "Test ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: orderForm.testName,
                    onChange: (e) => handleTestSelect(e.target.value),
                    className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                    required: true,
                    "data-ocid": "lab.form.test_select",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select test..." }),
                      TEST_OPTIONS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: t.name, children: [
                        t.name,
                        " (",
                        t.type,
                        ")"
                      ] }, t.name))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Clinical Notes" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    value: orderForm.notes,
                    onChange: (e) => setOrderForm((prev) => ({ ...prev, notes: e.target.value })),
                    className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px] resize-none",
                    placeholder: "Clinical indication or additional notes...",
                    "data-ocid": "lab.form.notes_textarea"
                  }
                )
              ] })
            ]
          }
        )
      }
    ),
    resultModal && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Modal,
      {
        open: !!resultModal,
        onClose: () => setResultModal(null),
        title: `Enter Result: ${resultModal.testName}`,
        description: `Patient: ${patientName(resultModal.patientId)}`,
        size: "md",
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => setResultModal(null),
              "data-ocid": "lab.result.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              form: "result-entry-form",
              disabled: updateResult.isPending,
              className: resultForm.isCritical ? "bg-red-600 hover:bg-red-700" : "",
              "data-ocid": "lab.result.submit_button",
              children: updateResult.isPending ? "Saving..." : "Save Result"
            }
          )
        ] }),
        children: [
          resultForm.isCritical && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 p-3 bg-red-500/10 border border-red-500/40 rounded-lg flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-red-400 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-red-400", children: "CRITICAL VALUE — Notify doctor immediately" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              id: "result-entry-form",
              onSubmit: handleResultSubmit,
              className: "space-y-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                    "Result Value ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: resultForm.resultValue,
                      onChange: (e) => setResultForm((prev) => ({
                        ...prev,
                        resultValue: e.target.value
                      })),
                      required: true,
                      placeholder: "e.g. 12.5 g/dL, Positive, 120/80 mmHg",
                      "data-ocid": "lab.result.value_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Reference Range" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: resultForm.referenceRange,
                      onChange: (e) => setResultForm((prev) => ({
                        ...prev,
                        referenceRange: e.target.value
                      })),
                      placeholder: "e.g. 12.0–16.0 g/dL",
                      "data-ocid": "lab.result.refrange_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `flex items-center justify-between p-3 rounded-lg border ${resultForm.isCritical ? "bg-red-500/10 border-red-500/40" : "bg-muted/20 border-border"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Mark as Critical" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Triggers immediate notification to ordering doctor" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "checkbox",
                            className: "sr-only peer",
                            checked: resultForm.isCritical,
                            onChange: (e) => setResultForm((prev) => ({
                              ...prev,
                              isCritical: e.target.checked
                            })),
                            "data-ocid": "lab.result.critical_checkbox"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-6 bg-muted rounded-full peer peer-checked:bg-red-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-background after:rounded-full after:h-5 after:w-5 after:transition-all" })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Notes / Interpretation" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "textarea",
                    {
                      value: resultForm.notes,
                      onChange: (e) => setResultForm((prev) => ({ ...prev, notes: e.target.value })),
                      className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px] resize-none",
                      placeholder: "Pathologist notes or interpretation...",
                      "data-ocid": "lab.result.notes_textarea"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Result File (URL)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        value: resultForm.resultFile,
                        onChange: (e) => setResultForm((prev) => ({
                          ...prev,
                          resultFile: e.target.value
                        })),
                        placeholder: "https://... or file path",
                        "data-ocid": "lab.result.file_input"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        size: "sm",
                        className: "shrink-0",
                        "data-ocid": "lab.result.upload_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" })
                      }
                    )
                  ] })
                ] })
              ]
            }
          )
        ]
      }
    ),
    viewModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: !!viewModal,
        onClose: () => setViewModal(null),
        title: "Lab Report",
        size: "md",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "lab.report.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ReportField,
              {
                label: "Order ID",
                value: `LAB-${String(viewModal.id).padStart(4, "0")}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ReportField, { label: "Test", value: viewModal.testName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ReportField, { label: "Category", value: viewModal.testType }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ReportField, { label: "Patient", value: viewModal.patientName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ReportField, { label: "Doctor", value: viewModal.doctorName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ReportField,
              {
                label: "Status",
                value: /* @__PURE__ */ jsxRuntimeExports.jsx(LabStatusBadge, { status: viewModal.status })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ReportField,
              {
                label: "Ordered At",
                value: formatDateTime(viewModal.createdAt)
              }
            ),
            viewModal.sampleCollectedAt && /* @__PURE__ */ jsxRuntimeExports.jsx(
              ReportField,
              {
                label: "Sample Collected",
                value: formatDateTime(viewModal.sampleCollectedAt)
              }
            ),
            viewModal.resultEnteredAt && /* @__PURE__ */ jsxRuntimeExports.jsx(
              ReportField,
              {
                label: "Result Entered",
                value: formatDateTime(viewModal.resultEnteredAt)
              }
            )
          ] }),
          (viewModal.resultValue || viewModal.referenceRange) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `p-4 rounded-lg border ${viewModal.isCritical ? "bg-red-500/10 border-red-500/30" : "bg-green-500/10 border-green-500/30"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Result" }),
                  viewModal.isCritical ? /* @__PURE__ */ jsxRuntimeExports.jsx(CriticalBadge, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: "Normal", variant: "success" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `text-2xl font-bold ${viewModal.isCritical ? "text-red-400" : "text-green-400"}`,
                    children: viewModal.resultValue ?? "—"
                  }
                ),
                viewModal.referenceRange && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                  "Reference: ",
                  viewModal.referenceRange
                ] })
              ]
            }
          ),
          viewModal.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-muted/20 border border-border rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1", children: "Notes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: viewModal.notes })
          ] })
        ] })
      }
    )
  ] });
}
function ReportField({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-0.5", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: value })
  ] });
}
function LabSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "lab.loading_state", children: [
    "skeleton-1",
    "skeleton-2",
    "skeleton-3",
    "skeleton-4",
    "skeleton-5"
  ].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg" }, k)) });
}
export {
  LabPage
};
