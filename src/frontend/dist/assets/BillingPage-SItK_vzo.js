import { c as createLucideIcon, h as useAuth, ag as useBills, i as usePatients, ah as useServices, r as reactExports, j as jsxRuntimeExports, m as PageHeader, a as Button, ai as Receipt, aj as Settings, ak as ChartColumn, al as BillStatus, am as LoadingSkeleton, a6 as Skeleton, I as FileText, an as PaymentMode, S as StatusBadge, ao as TrendingUp, ap as ResponsiveContainer, aq as CartesianGrid, ar as XAxis, as as YAxis, at as Tooltip, au as Bar, av as PieChart, aw as Pie, ax as Cell, ay as Legend, az as useCreateBill, aA as BillType, aB as useProcessPayment, aC as useCreateService, b as ue } from "./index-DZPPfMmg.js";
import { D as DataTable } from "./DataTable-AcgTuFIu.js";
import { E as EmptyState } from "./EmptyState-kK5PcP6O.js";
import { X, M as Modal } from "./Modal-BHmlK1FU.js";
import { I as Input } from "./input-Clo9Nqqp.js";
import { L as Label } from "./label-DqZ3T788.js";
import { P as Plus } from "./plus-CgeKf2CL.js";
import { C as CircleCheck } from "./circle-check-DBp8JBvS.js";
import { C as CircleAlert } from "./circle-alert-D1OTGC5B.js";
import { B as BarChart, L as LineChart, a as Line } from "./BarChart-ClpkPFoi.js";
import "./chevron-up-Cdh06Vhn.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M6 3h12", key: "ggurg9" }],
  ["path", { d: "M6 8h12", key: "6g4wlu" }],
  ["path", { d: "m6 13 8.5 8", key: "u1kupk" }],
  ["path", { d: "M6 13h3", key: "wdp6ag" }],
  ["path", { d: "M9 13c6.667 0 6.667-10 0-10", key: "1nkvk2" }]
];
const IndianRupee = createLucideIcon("indian-rupee", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
];
const Printer = createLucideIcon("printer", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "14sxne" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16", key: "1hlbsb" }],
  ["path", { d: "M16 16h5v5", key: "ccwih5" }]
];
const RefreshCcw = createLucideIcon("refresh-ccw", __iconNode$1);
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
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
];
const Wallet = createLucideIcon("wallet", __iconNode);
const INR = (paise) => new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
}).format(paise / 100);
const DAY_MS = 864e5;
const today = () => /* @__PURE__ */ new Date();
function daysAgo(n) {
  return new Date(today().getTime() - n * DAY_MS);
}
const STATUS_FILTERS = [
  "All",
  BillStatus.Pending,
  BillStatus.Paid,
  BillStatus.PartiallyPaid,
  BillStatus.Refunded
];
const PAYMENT_COLORS = {
  Cash: "#22d3ee",
  Card: "#818cf8",
  UPI: "#34d399",
  Insurance: "#fb923c"
};
const emptyBillForm = () => ({
  patientId: "",
  billType: BillType.OPD,
  discount: 0,
  items: [],
  paidAmount: 0,
  paymentMode: "",
  insuranceClaimId: ""
});
function ReceiptView({
  bill,
  patient
}) {
  const receiptRef = reactExports.useRef(null);
  const handlePrint = () => {
    var _a;
    const content = (_a = receiptRef.current) == null ? void 0 : _a.innerHTML;
    if (!content) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`<html><head><title>Receipt #${bill.id}</title>
      <style>body{font-family:sans-serif;padding:32px;max-width:560px;margin:auto}
      table{width:100%;border-collapse:collapse}th,td{padding:6px 8px;text-align:left;border-bottom:1px solid #e5e7eb}
      th{background:#f9fafb;font-size:12px;text-transform:uppercase}  
      .total-row{font-weight:700;font-size:16px}.right{text-align:right}
      .header{border-bottom:2px solid #111;padding-bottom:16px;margin-bottom:16px}
      .footer{margin-top:24px;font-size:12px;color:#6b7280;text-align:center}
      </style></head><body>${content}</body></html>`);
    win.document.close();
    win.print();
  };
  const balance = Number(bill.totalAmount) - Number(bill.paidAmount);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: receiptRef, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border pb-4 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold", children: "Lal Bahadur Shastri Hospital" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Hospital Road, New Delhi • +91 11 2345 6789" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Patient" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: patient ? `${patient.firstName} ${patient.lastName}` : `#${bill.patientId}` }),
          patient && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: patient.phone })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Receipt #" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono font-semibold", children: [
            "RCP-",
            String(bill.id).padStart(6, "0")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(Number(bill.createdAt) / 1e6).toLocaleDateString(
            "en-IN"
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full mb-4 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left pb-2 text-xs text-muted-foreground font-medium", children: "Service" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right pb-2 text-xs text-muted-foreground font-medium", children: "Qty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right pb-2 text-xs text-muted-foreground font-medium", children: "Unit Price" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right pb-2 text-xs text-muted-foreground font-medium", children: "Total" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: bill.items.map((item, idx) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: receipt items are indexed
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: item.serviceName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right", children: String(item.quantity) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right", children: INR(Number(item.unitPrice)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right font-medium", children: INR(Number(item.total)) })
          ] }, idx)
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-sm border-t border-border pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: INR(Number(bill.subtotal)) })
        ] }),
        Number(bill.discountPercent) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-green-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Discount (",
            String(bill.discountPercent),
            "%)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "-",
            INR(Number(bill.subtotal) - Number(bill.totalAmount))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-base border-t border-border pt-2 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: INR(Number(bill.totalAmount)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-green-600", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Paid (",
            bill.paymentMode ?? "—",
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: INR(Number(bill.paidAmount)) })
        ] }),
        balance > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-semibold text-red-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Balance Due" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: INR(balance) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 text-center text-xs text-muted-foreground", children: "Thank you for choosing Lal Bahadur Shastri Hospital." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        type: "button",
        onClick: handlePrint,
        "data-ocid": "billing.receipt.print_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-4 w-4 mr-2" }),
          " Print Receipt"
        ]
      }
    ) })
  ] });
}
function NewBillModal({
  open,
  onClose,
  patients,
  services
}) {
  const createBill = useCreateBill();
  const [form, setForm] = reactExports.useState(emptyBillForm());
  const [selectedServiceId, setSelectedServiceId] = reactExports.useState("");
  const [qty, setQty] = reactExports.useState(1);
  const subtotal = form.items.reduce(
    (s, it) => s + Number(it.unitPrice) * it.quantity,
    0
  );
  const discountAmt = Math.round(subtotal * (form.discount / 100));
  const totalAmount = subtotal - discountAmt;
  const balanceDue = totalAmount - form.paidAmount * 100;
  const addItem = () => {
    const svc = services.find((s) => String(s.id) === selectedServiceId);
    if (!svc) return;
    setForm((f) => ({
      ...f,
      items: [
        ...f.items,
        {
          serviceId: svc.id,
          serviceName: svc.name,
          unitPrice: svc.basePrice,
          quantity: qty
        }
      ]
    }));
    setSelectedServiceId("");
    setQty(1);
  };
  const removeItem = (idx) => setForm((f) => ({ ...f, items: f.items.filter((_, i) => i !== idx) }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.patientId || form.items.length === 0) {
      ue.error("Select a patient and add at least one item");
      return;
    }
    try {
      const billItems = form.items.map((it) => ({
        serviceId: it.serviceId,
        serviceName: it.serviceName,
        unitPrice: it.unitPrice,
        quantity: BigInt(it.quantity),
        total: it.unitPrice * BigInt(it.quantity)
      }));
      await createBill.mutateAsync({
        patientId: BigInt(form.patientId),
        visitId: null,
        billType: form.billType,
        items: billItems,
        discountPercent: BigInt(form.discount),
        paymentMode: form.paymentMode ? form.paymentMode : null
      });
      ue.success("Bill created successfully");
      setForm(emptyBillForm());
      onClose();
    } catch {
      ue.error("Failed to create bill");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose: () => {
        setForm(emptyBillForm());
        onClose();
      },
      title: "Create New Bill",
      description: "Add services and process payment",
      size: "xl",
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => {
              setForm(emptyBillForm());
              onClose();
            },
            "data-ocid": "billing.new_bill.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            form: "new-bill-form",
            disabled: createBill.isPending,
            "data-ocid": "billing.new_bill.submit_button",
            children: createBill.isPending ? "Creating…" : "Create Bill"
          }
        )
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { id: "new-bill-form", onSubmit: handleSubmit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "nb-patient", children: "Patient *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "nb-patient",
                value: form.patientId,
                onChange: (e) => setForm((f) => ({ ...f, patientId: e.target.value })),
                className: "w-full h-9 rounded-md border border-input bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                "data-ocid": "billing.new_bill.patient_select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select patient…" }),
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "nb-type", children: "Bill Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "nb-type",
                value: form.billType,
                onChange: (e) => setForm((f) => ({ ...f, billType: e.target.value })),
                className: "w-full h-9 rounded-md border border-input bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                "data-ocid": "billing.new_bill.type_select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: BillType.OPD, children: "OPD — Outpatient" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: BillType.IPD, children: "IPD — Inpatient" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-lg p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Line Items" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: selectedServiceId,
                onChange: (e) => setSelectedServiceId(e.target.value),
                className: "flex-1 h-9 rounded-md border border-input bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                "data-ocid": "billing.new_bill.service_select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Choose service…" }),
                  services.filter((s) => s.isActive).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: String(s.id), children: [
                    s.name,
                    " — ",
                    INR(Number(s.basePrice))
                  ] }, String(s.id)))
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: "1",
                value: qty,
                onChange: (e) => setQty(Number(e.target.value)),
                className: "w-20",
                "data-ocid": "billing.new_bill.qty_input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "secondary",
                onClick: addItem,
                disabled: !selectedServiceId,
                "data-ocid": "billing.new_bill.add_item_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" })
              }
            )
          ] }),
          form.items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground py-2", children: "No items added yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left pb-1 text-xs text-muted-foreground font-medium", children: "Service" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right pb-1 text-xs text-muted-foreground font-medium", children: "Qty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right pb-1 text-xs text-muted-foreground font-medium", children: "Unit" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right pb-1 text-xs text-muted-foreground font-medium", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", {})
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: form.items.map((it, idx) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: bill items use index
              /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/40", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5", children: it.serviceName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 text-right", children: it.quantity }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 text-right", children: INR(Number(it.unitPrice)) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 text-right font-medium", children: INR(Number(it.unitPrice) * it.quantity) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pl-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => removeItem(idx),
                    className: "text-muted-foreground hover:text-destructive transition-colors",
                    "aria-label": "Remove item",
                    "data-ocid": `billing.new_bill.remove_item_button.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
                  }
                ) })
              ] }, idx)
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "nb-discount", children: "Discount (%)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "nb-discount",
                type: "number",
                min: "0",
                max: "100",
                value: form.discount,
                onChange: (e) => setForm((f) => ({ ...f, discount: Number(e.target.value) })),
                "data-ocid": "billing.new_bill.discount_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-lg p-3 text-sm space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: INR(subtotal) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-green-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Discount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "-",
                INR(discountAmt)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold border-t border-border pt-1 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: INR(totalAmount) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-lg p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4 text-accent" }),
            " Payment"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "nb-paid", children: "Amount Paid (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "nb-paid",
                  type: "number",
                  min: "0",
                  value: form.paidAmount,
                  onChange: (e) => setForm((f) => ({ ...f, paidAmount: Number(e.target.value) })),
                  "data-ocid": "billing.new_bill.paid_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "nb-mode", children: "Payment Mode" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  id: "nb-mode",
                  value: form.paymentMode,
                  onChange: (e) => setForm((f) => ({
                    ...f,
                    paymentMode: e.target.value
                  })),
                  className: "w-full h-9 rounded-md border border-input bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                  "data-ocid": "billing.new_bill.payment_mode_select",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select mode…" }),
                    Object.values(PaymentMode).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: m, children: m }, m))
                  ]
                }
              )
            ] })
          ] }),
          form.paymentMode === PaymentMode.Insurance && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "nb-claim", children: "Insurance Claim #" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "nb-claim",
                placeholder: "CLM-2024-XXXXX",
                value: form.insuranceClaimId,
                onChange: (e) => setForm((f) => ({ ...f, insuranceClaimId: e.target.value })),
                "data-ocid": "billing.new_bill.insurance_claim_input"
              }
            )
          ] }),
          totalAmount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `text-sm font-medium flex justify-between pt-1 ${balanceDue > 0 ? "text-red-400" : "text-green-400"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Balance Due" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: INR(Math.max(0, balanceDue)) })
              ]
            }
          )
        ] })
      ] })
    }
  );
}
function ProcessPaymentModal({
  bill,
  onClose
}) {
  const processPayment = useProcessPayment();
  const [amount, setAmount] = reactExports.useState("");
  const [mode, setMode] = reactExports.useState(PaymentMode.Cash);
  if (!bill) return null;
  const balanceDue = Number(bill.totalAmount) - Number(bill.paidAmount);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const paise = Math.round(Number(amount) * 100);
    if (paise <= 0) {
      ue.error("Enter a valid amount");
      return;
    }
    try {
      await processPayment.mutateAsync({
        id: bill.id,
        paidAmount: BigInt(paise),
        paymentMode: mode
      });
      ue.success("Payment recorded");
      onClose();
    } catch {
      ue.error("Payment failed");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open: !!bill,
      onClose,
      title: "Process Payment",
      description: `Bill #${bill.id}`,
      size: "sm",
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "billing.payment.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            form: "process-payment-form",
            disabled: processPayment.isPending,
            "data-ocid": "billing.payment.submit_button",
            children: processPayment.isPending ? "Processing…" : "Record Payment"
          }
        )
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          id: "process-payment-form",
          onSubmit: handleSubmit,
          className: "space-y-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3 text-sm space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Total Amount" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: INR(Number(bill.totalAmount)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Already Paid" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400", children: INR(Number(bill.paidAmount)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-red-400 border-t border-border pt-1 mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Balance Due" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: INR(balanceDue) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pay-amount", children: "Amount to Pay (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "pay-amount",
                  type: "number",
                  min: "1",
                  max: String(balanceDue / 100),
                  value: amount,
                  onChange: (e) => setAmount(e.target.value),
                  placeholder: String(balanceDue / 100),
                  "data-ocid": "billing.payment.amount_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pay-mode", children: "Payment Mode" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "select",
                {
                  id: "pay-mode",
                  value: mode,
                  onChange: (e) => setMode(e.target.value),
                  className: "w-full h-9 rounded-md border border-input bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                  "data-ocid": "billing.payment.mode_select",
                  children: Object.values(PaymentMode).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: m, children: m }, m))
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function AddServiceModal({
  open,
  onClose
}) {
  const createService = useCreateService();
  const [form, setForm] = reactExports.useState({
    name: "",
    category: "",
    basePrice: 0
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.category || form.basePrice <= 0) {
      ue.error("All fields are required");
      return;
    }
    try {
      await createService.mutateAsync({
        name: form.name,
        category: form.category,
        basePrice: BigInt(Math.round(form.basePrice * 100))
      });
      ue.success("Service added");
      setForm({ name: "", category: "", basePrice: 0 });
      onClose();
    } catch {
      ue.error("Failed to add service");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: "Add Service",
      description: "Define a billable service and its price",
      size: "sm",
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "billing.service.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            form: "add-service-form",
            disabled: createService.isPending,
            "data-ocid": "billing.service.submit_button",
            children: createService.isPending ? "Saving…" : "Save Service"
          }
        )
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { id: "add-service-form", onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "svc-name", children: "Service Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "svc-name",
              value: form.name,
              onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
              placeholder: "Consultation – General",
              "data-ocid": "billing.service.name_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "svc-cat", children: "Category *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "svc-cat",
              value: form.category,
              onChange: (e) => setForm((f) => ({ ...f, category: e.target.value })),
              className: "w-full h-9 rounded-md border border-input bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
              "data-ocid": "billing.service.category_select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select category…" }),
                [
                  "Consultation",
                  "Procedure",
                  "Laboratory",
                  "Pharmacy",
                  "Radiology",
                  "Nursing",
                  "Room Charges",
                  "Other"
                ].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "svc-price", children: "Base Price (₹) *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "svc-price",
              type: "number",
              min: "1",
              value: form.basePrice,
              onChange: (e) => setForm((f) => ({ ...f, basePrice: Number(e.target.value) })),
              "data-ocid": "billing.service.price_input"
            }
          )
        ] })
      ] })
    }
  );
}
function BillDetailPanel({
  bill,
  patient,
  onPayment,
  onClose
}) {
  const [showReceipt, setShowReceipt] = reactExports.useState(false);
  const balance = Number(bill.totalAmount) - Number(bill.paidAmount);
  const isInsurance = bill.paymentMode === PaymentMode.Insurance;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl overflow-hidden",
      "data-ocid": "billing.detail.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Bill #",
              String(bill.id).padStart(5, "0")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: patient ? `${patient.firstName} ${patient.lastName}` : `Patient #${bill.patientId}` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "text-muted-foreground hover:text-foreground transition-colors",
              "aria-label": "Close panel",
              "data-ocid": "billing.detail.close_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: bill.status }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: bill.billType }),
            bill.paymentMode && /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: bill.paymentMode })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Line Items" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left pb-1.5 text-xs text-muted-foreground font-medium", children: "Service" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right pb-1.5 text-xs text-muted-foreground font-medium", children: "Qty" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right pb-1.5 text-xs text-muted-foreground font-medium", children: "Unit" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right pb-1.5 text-xs text-muted-foreground font-medium", children: "Total" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: bill.items.map((item, idx) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: bill detail items indexed
                /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/30", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5", children: item.serviceName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 text-right text-muted-foreground", children: String(item.quantity) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 text-right text-muted-foreground", children: INR(Number(item.unitPrice)) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 text-right font-medium", children: INR(Number(item.total)) })
                ] }, idx)
              )) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-lg p-3 space-y-1.5 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: INR(Number(bill.subtotal)) })
            ] }),
            Number(bill.discountPercent) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-green-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Discount (",
                String(bill.discountPercent),
                "%)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "-",
                INR(Number(bill.subtotal) - Number(bill.totalAmount))
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold border-t border-border pt-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: INR(Number(bill.totalAmount)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-green-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Paid" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: INR(Number(bill.paidAmount)) })
            ] }),
            balance > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-semibold text-red-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Balance Due" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: INR(balance) })
            ] })
          ] }),
          isInsurance && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-lg p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Insurance Claim" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatusBadge,
                {
                  status: bill.insuranceClaimId ? "Submitted" : "Not Submitted",
                  variant: bill.insuranceClaimId ? "info" : "neutral"
                }
              )
            ] }),
            bill.insuranceClaimId && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono text-foreground", children: bill.insuranceClaimId })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
            balance > 0 && bill.status !== BillStatus.Refunded && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                onClick: () => onPayment(bill),
                "data-ocid": "billing.detail.payment_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-4 w-4 mr-1.5" }),
                  " Collect Payment"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => setShowReceipt(true),
                "data-ocid": "billing.detail.receipt_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "h-4 w-4 mr-1.5" }),
                  " View Receipt"
                ]
              }
            )
          ] })
        ] }),
        showReceipt && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Modal,
          {
            open: showReceipt,
            onClose: () => setShowReceipt(false),
            title: "Receipt Preview",
            size: "md",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReceiptView, { bill, patient })
          }
        )
      ]
    }
  );
}
function FinancialDashboard({ bills }) {
  const todayStart = today().setHours(0, 0, 0, 0);
  const monthStart = new Date(
    today().getFullYear(),
    today().getMonth(),
    1
  ).getTime();
  const todayRevenue = bills.filter((b) => Number(b.createdAt) / 1e6 >= todayStart).reduce((s, b) => s + Number(b.paidAmount), 0);
  const monthRevenue = bills.filter((b) => Number(b.createdAt) / 1e6 >= monthStart).reduce((s, b) => s + Number(b.paidAmount), 0);
  const pendingCollections = bills.filter(
    (b) => b.status === BillStatus.Pending || b.status === BillStatus.PartiallyPaid
  ).reduce((s, b) => s + (Number(b.totalAmount) - Number(b.paidAmount)), 0);
  const kpiCards = [
    {
      label: "Today's Revenue",
      value: INR(todayRevenue),
      icon: IndianRupee,
      color: "text-accent"
    },
    {
      label: "Month Revenue",
      value: INR(monthRevenue),
      icon: TrendingUp,
      color: "text-green-400"
    },
    {
      label: "Pending Collections",
      value: INR(pendingCollections),
      icon: CircleAlert,
      color: "text-yellow-400"
    },
    {
      label: "Total Bills",
      value: String(bills.length),
      icon: FileText,
      color: "text-foreground"
    }
  ];
  const dailyData = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (let i = 29; i >= 0; i--) {
      const d = daysAgo(i);
      map.set(d.toISOString().slice(0, 10), 0);
    }
    for (const b of bills) {
      const d = new Date(Number(b.createdAt) / 1e6).toISOString().slice(0, 10);
      if (map.has(d))
        map.set(d, (map.get(d) ?? 0) + Number(b.paidAmount) / 100);
    }
    return Array.from(map.entries()).map(([date, revenue]) => ({
      date: date.slice(5),
      // MM-DD
      revenue
    }));
  }, [bills]);
  const modeData = reactExports.useMemo(() => {
    const map = {};
    for (const b of bills) {
      if (!b.paymentMode) continue;
      const modeKey = String(b.paymentMode);
      map[modeKey] = (map[modeKey] ?? 0) + Number(b.paidAmount) / 100;
    }
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [bills]);
  const monthlyData = reactExports.useMemo(() => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today().getFullYear(), today().getMonth() - i, 1);
      const monthStr = d.toLocaleString("en-IN", {
        month: "short",
        year: "2-digit"
      });
      const start = d.getTime();
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 1).getTime();
      const monthBills = bills.filter((b) => {
        const t = Number(b.createdAt) / 1e6;
        return t >= start && t < end;
      });
      months.push({
        month: monthStr,
        revenue: monthBills.reduce((s, b) => s + Number(b.paidAmount) / 100, 0),
        bills: monthBills.length
      });
    }
    return months;
  }, [bills]);
  const chartTooltipStyle = {
    backgroundColor: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    borderRadius: 8,
    fontSize: 12
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "billing.dashboard.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: kpiCards.map(({ label, value, icon: Icon, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${color}` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-bold tabular-nums ${color}`, children: value })
        ]
      },
      label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 bg-card border border-border rounded-xl p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-4 w-4 text-accent" }),
          " Daily Revenue — Last 30 Days"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          BarChart,
          {
            data: dailyData,
            margin: { top: 4, right: 8, left: 0, bottom: 4 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CartesianGrid,
                {
                  strokeDasharray: "3 3",
                  stroke: "hsl(var(--border))"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                XAxis,
                {
                  dataKey: "date",
                  tick: { fontSize: 10, fill: "hsl(var(--muted-foreground))" },
                  tickLine: false,
                  axisLine: false,
                  interval: 4
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  tick: { fontSize: 10, fill: "hsl(var(--muted-foreground))" },
                  tickLine: false,
                  axisLine: false,
                  tickFormatter: (v) => `₹${v}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  contentStyle: chartTooltipStyle,
                  formatter: (v) => [
                    `₹${v.toLocaleString("en-IN")}`,
                    "Revenue"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Bar,
                {
                  dataKey: "revenue",
                  fill: "hsl(var(--accent))",
                  radius: [3, 3, 0, 0]
                }
              )
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4 text-accent" }),
          " By Payment Mode"
        ] }),
        modeData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-[220px] text-muted-foreground text-sm", children: "No payment data" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pie,
            {
              data: modeData,
              cx: "50%",
              cy: "50%",
              innerRadius: 55,
              outerRadius: 85,
              paddingAngle: 3,
              dataKey: "value",
              children: modeData.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Cell,
                {
                  fill: PAYMENT_COLORS[entry.name] ?? "#6b7280"
                },
                entry.name
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              contentStyle: chartTooltipStyle,
              formatter: (v) => [
                `₹${v.toLocaleString("en-IN")}`,
                "Amount"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { iconSize: 8, wrapperStyle: { fontSize: 11 } })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-accent" }),
        " Monthly Revenue Trend"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        LineChart,
        {
          data: monthlyData,
          margin: { top: 4, right: 16, left: 0, bottom: 4 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              XAxis,
              {
                dataKey: "month",
                tick: { fontSize: 11, fill: "hsl(var(--muted-foreground))" },
                tickLine: false,
                axisLine: false
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              YAxis,
              {
                tick: { fontSize: 11, fill: "hsl(var(--muted-foreground))" },
                tickLine: false,
                axisLine: false,
                tickFormatter: (v) => `₹${v}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Tooltip,
              {
                contentStyle: chartTooltipStyle,
                formatter: (v) => [
                  `₹${v.toLocaleString("en-IN")}`,
                  "Revenue"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Line,
              {
                type: "monotone",
                dataKey: "revenue",
                stroke: "hsl(var(--accent))",
                strokeWidth: 2.5,
                dot: { fill: "hsl(var(--accent))", r: 4 },
                activeDot: { r: 6 }
              }
            )
          ]
        }
      ) })
    ] })
  ] });
}
function BillingPage() {
  const { user } = useAuth();
  const { data: bills, isLoading: billsLoading } = useBills();
  const { data: patients } = usePatients();
  const { data: services, isLoading: servicesLoading } = useServices();
  const [activeTab, setActiveTab] = reactExports.useState("bills");
  const [statusFilter, setStatusFilter] = reactExports.useState("All");
  const [dateFrom, setDateFrom] = reactExports.useState("");
  const [dateTo, setDateTo] = reactExports.useState("");
  const [patientSearch, setPatientSearch] = reactExports.useState("");
  const [showNewBill, setShowNewBill] = reactExports.useState(false);
  const [selectedBill, setSelectedBill] = reactExports.useState(null);
  const [paymentBill, setPaymentBill] = reactExports.useState(null);
  const [showAddService, setShowAddService] = reactExports.useState(false);
  const canCreateBill = (user == null ? void 0 : user.role) === "SuperAdmin" || (user == null ? void 0 : user.role) === "Receptionist";
  const getPatientName = reactExports.useCallback(
    (id) => {
      const p = patients == null ? void 0 : patients.find((p2) => p2.id === id);
      return p ? `${p.firstName} ${p.lastName}` : `#${id}`;
    },
    [patients]
  );
  const filteredBills = reactExports.useMemo(() => {
    return (bills ?? []).filter((b) => {
      if (statusFilter !== "All" && b.status !== statusFilter) return false;
      const ts = Number(b.createdAt) / 1e6;
      if (dateFrom && ts < new Date(dateFrom).getTime()) return false;
      if (dateTo && ts > new Date(dateTo).getTime() + DAY_MS) return false;
      if (patientSearch) {
        const name = getPatientName(b.patientId).toLowerCase();
        if (!name.includes(patientSearch.toLowerCase())) return false;
      }
      return true;
    });
  }, [bills, statusFilter, dateFrom, dateTo, patientSearch, getPatientName]);
  const billColumns = [
    {
      id: "billId",
      header: "Bill #",
      accessorFn: (r) => `BILL-${String(r.id).padStart(5, "0")}`,
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: String(getValue()) })
    },
    {
      id: "patient",
      header: "Patient",
      accessorFn: (r) => getPatientName(r.patientId),
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: String(getValue()) })
    },
    {
      accessorKey: "billType",
      header: "Type",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: String(getValue()) })
    },
    {
      accessorKey: "totalAmount",
      header: "Total",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums font-semibold", children: INR(Number(getValue())) })
    },
    {
      accessorKey: "paidAmount",
      header: "Paid",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums text-green-400", children: INR(Number(getValue())) })
    },
    {
      id: "balance",
      header: "Balance",
      accessorFn: (r) => Number(r.totalAmount) - Number(r.paidAmount),
      cell: ({ getValue }) => {
        const bal = Number(getValue());
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `tabular-nums font-medium ${bal > 0 ? "text-red-400" : "text-muted-foreground"}`,
            children: INR(Math.max(0, bal))
          }
        );
      }
    },
    {
      accessorKey: "paymentMode",
      header: "Mode",
      cell: ({ getValue }) => getValue() ? /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: String(getValue()) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "—" })
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: String(getValue()) })
    },
    {
      id: "date",
      header: "Date",
      accessorFn: (r) => new Date(Number(r.createdAt) / 1e6).toLocaleDateString("en-IN"),
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: String(getValue()) })
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "ghost",
            onClick: () => setSelectedBill(row.original),
            "data-ocid": `billing.bills.view_button.${row.index + 1}`,
            children: "View"
          }
        ),
        Number(row.original.totalAmount) - Number(row.original.paidAmount) > 0 && row.original.status !== BillStatus.Refunded && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "ghost",
            className: "text-accent",
            onClick: () => setPaymentBill(row.original),
            "data-ocid": `billing.bills.pay_button.${row.index + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-3.5 w-3.5" })
          }
        )
      ] })
    }
  ];
  const serviceColumns = [
    {
      accessorKey: "name",
      header: "Service Name",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: String(getValue()) })
    },
    { accessorKey: "category", header: "Category" },
    {
      accessorKey: "basePrice",
      header: "Price",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums font-semibold", children: INR(Number(getValue())) })
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: getValue() ? "Active" : "Inactive" })
    }
  ];
  const TABS = [
    { key: "bills", label: "Bills", icon: Receipt },
    { key: "services", label: "Services", icon: Settings },
    { key: "dashboard", label: "Financial Dashboard", icon: ChartColumn }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "billing.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Billing & Finance",
        description: "OPD/IPD bill generation, payments, insurance, and financial overview",
        breadcrumb: ["Finance", "Billing"],
        actions: canCreateBill ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setShowNewBill(true),
            "data-ocid": "billing.new_bill.open_modal_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
              " New Bill"
            ]
          }
        ) : void 0
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-1 mb-6 border-b border-border",
        "data-ocid": "billing.tabs",
        children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setActiveTab(tab.key),
            "data-ocid": `billing.${tab.key}.tab`,
            className: `flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${activeTab === tab.key ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(tab.icon, { className: "h-4 w-4" }),
              tab.label
            ]
          },
          tab.key
        ))
      }
    ),
    activeTab === "bills" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", children: STATUS_FILTERS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setStatusFilter(s),
            "data-ocid": `billing.filter.${s.toLowerCase()}_tab`,
            className: `px-3 py-1 rounded-full text-xs font-medium transition-colors ${statusFilter === s ? "bg-accent text-card" : "bg-muted/30 text-muted-foreground hover:bg-muted/50"}`,
            children: s
          },
          s
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 ml-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search patient…",
              value: patientSearch,
              onChange: (e) => setPatientSearch(e.target.value),
              className: "w-44",
              "data-ocid": "billing.filter.patient_search_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: dateFrom,
              onChange: (e) => setDateFrom(e.target.value),
              className: "w-36",
              "data-ocid": "billing.filter.date_from_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: dateTo,
              onChange: (e) => setDateTo(e.target.value),
              className: "w-36",
              "data-ocid": "billing.filter.date_to_input"
            }
          ),
          (patientSearch || dateFrom || dateTo || statusFilter !== "All") && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => {
                setPatientSearch("");
                setDateFrom("");
                setDateTo("");
                setStatusFilter("All");
              },
              "data-ocid": "billing.filter.clear_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCcw, { className: "h-3.5 w-3.5" })
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: selectedBill ? "grid grid-cols-1 lg:grid-cols-3 gap-4" : "",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: selectedBill ? "lg:col-span-2" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-4", children: billsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, { rows: 6, cols: 7 }) : filteredBills.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              EmptyState,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "h-8 w-8" }),
                title: "No bills found",
                description: statusFilter !== "All" ? `No ${statusFilter} bills match your filters.` : "No bills have been created yet.",
                action: canCreateBill ? {
                  label: "Create First Bill",
                  onClick: () => setShowNewBill(true)
                } : void 0
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                data: filteredBills,
                columns: billColumns,
                searchPlaceholder: "Search bills…",
                isLoading: false
              }
            ) }) }),
            selectedBill && /* @__PURE__ */ jsxRuntimeExports.jsx(
              BillDetailPanel,
              {
                bill: selectedBill,
                patient: patients == null ? void 0 : patients.find((p) => p.id === selectedBill.patientId),
                onPayment: (b) => {
                  setPaymentBill(b);
                },
                onClose: () => setSelectedBill(null)
              }
            )
          ]
        }
      )
    ] }),
    activeTab === "services" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: canCreateBill && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowAddService(true),
          "data-ocid": "billing.services.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
            " Add Service"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-4", children: servicesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, { rows: 5, cols: 4 }) : !services || services.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-8 w-8" }),
          title: "No services configured",
          description: "Add billable services to start generating bills.",
          action: canCreateBill ? {
            label: "Add Service",
            onClick: () => setShowAddService(true)
          } : void 0
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        DataTable,
        {
          data: services,
          columns: serviceColumns,
          searchPlaceholder: "Search services…",
          isLoading: false
        }
      ) })
    ] }),
    activeTab === "dashboard" && (billsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: ["kpi-1", "kpi-2", "kpi-3", "kpi-4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24 mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-32" })
          ]
        },
        k
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 bg-card border border-border rounded-xl p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full" }) })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FinancialDashboard, { bills: bills ?? [] })),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      NewBillModal,
      {
        open: showNewBill,
        onClose: () => setShowNewBill(false),
        patients: patients ?? [],
        services: services ?? []
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProcessPaymentModal,
      {
        bill: paymentBill,
        onClose: () => setPaymentBill(null)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddServiceModal,
      {
        open: showAddService,
        onClose: () => setShowAddService(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex flex-wrap gap-4", children: [
      {
        label: "Total Billed",
        value: INR(
          (bills == null ? void 0 : bills.reduce((s, b) => s + Number(b.totalAmount), 0)) ?? 0
        ),
        icon: IndianRupee,
        color: "text-foreground"
      },
      {
        label: "Total Collected",
        value: INR(
          (bills == null ? void 0 : bills.reduce((s, b) => s + Number(b.paidAmount), 0)) ?? 0
        ),
        icon: CircleCheck,
        color: "text-green-400"
      },
      {
        label: "Insurance Claims",
        value: String(
          (bills == null ? void 0 : bills.filter((b) => b.paymentMode === PaymentMode.Insurance).length) ?? 0
        ),
        icon: FileText,
        color: "text-orange-400"
      }
    ].map(({ label, value, icon: Icon, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-muted/20 border border-border rounded-lg px-4 py-2 flex items-center gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${color}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-base font-bold tabular-nums ${color}`, children: value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
          ] })
        ]
      },
      label
    )) })
  ] });
}
export {
  BillingPage
};
