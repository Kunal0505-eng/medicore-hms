import { c as createLucideIcon, h as useAuth, i as usePatients, r as reactExports, U as UserRole, N as PrescriptionStatus, j as jsxRuntimeExports, m as PageHeader, a as Button, T as TriangleAlert, M as Pill, S as StatusBadge, b as ue } from "./index-BGDDM1OA.js";
import { D as DataTable } from "./DataTable-DahQsLG7.js";
import { E as EmptyState } from "./EmptyState-DazVss1g.js";
import { M as Modal } from "./Modal-aMXHwIme.js";
import { B as Badge } from "./badge-Csm36_q_.js";
import { I as Input } from "./input-BH-6abi_.js";
import { L as Label } from "./label-CCf7a3mP.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-6WdRcw5_.js";
import { d as useVisits } from "./emr-CpFc9EiL.js";
import { u as useDrugs, a as useLowStockDrugs, b as usePurchaseOrders, c as useCreateDrug, d as useUpdateDrugStock, e as useDispensePrescription, f as useCreatePurchaseOrder } from "./pharmacy-DU9YKEfD.js";
import { S as ShieldAlert } from "./shield-alert-CldeMz_M.js";
import { P as Plus } from "./plus-BoQXLqEP.js";
import { C as CircleAlert } from "./circle-alert-DhzSXamA.js";
import { C as ClipboardList } from "./clipboard-list-DwlInZro.js";
import { C as CircleCheck } from "./circle-check-Cdumymmt.js";
import { Z as Zap } from "./zap-D2difd31.js";
import { R as RefreshCw } from "./refresh-cw-nljMAkcK.js";
import { P as Package } from "./package-CFnXNIV-.js";
import "./chevron-up-AHw6P28i.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "8", cy: "21", r: "1", key: "jimo8o" }],
  ["circle", { cx: "19", cy: "21", r: "1", key: "13723u" }],
  [
    "path",
    {
      d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
      key: "9zh506"
    }
  ]
];
const ShoppingCart = createLucideIcon("shopping-cart", __iconNode);
const TODAY = /* @__PURE__ */ new Date();
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1e3;
function isExpiringSoon(expiryDate) {
  const d = new Date(expiryDate);
  return d.getTime() - TODAY.getTime() <= THIRTY_DAYS && d > TODAY;
}
function isExpired(expiryDate) {
  return new Date(expiryDate) <= TODAY;
}
function DispenseModal({
  open,
  onClose,
  row,
  getPatientName,
  getDoctorName,
  drugs
}) {
  const dispense = useDispensePrescription();
  const [batchNo, setBatchNo] = reactExports.useState("");
  const [qty, setQty] = reactExports.useState("1");
  const [dispNotes, setDispNotes] = reactExports.useState("");
  const matchedDrug = drugs.find(
    (d) => d.name.toLowerCase() === (row == null ? void 0 : row.drugName.toLowerCase()) || d.genericName.toLowerCase() === (row == null ? void 0 : row.drugName.toLowerCase())
  );
  const handleDispense = async () => {
    if (!row) return;
    try {
      await dispense.mutateAsync({
        visitId: row.visit.id,
        drugName: row.drugName
      });
      ue.success(`Dispensed ${row.drugName} successfully`);
      onClose();
    } catch {
      ue.error("Failed to dispense prescription");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: "Dispense Prescription",
      description: "Confirm dispensing details before marking as dispensed",
      size: "md",
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "dispense.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: handleDispense,
            disabled: dispense.isPending,
            className: "bg-primary",
            "data-ocid": "dispense.confirm_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 mr-2" }),
              dispense.isPending ? "Dispensing..." : "Confirm Dispense"
            ]
          }
        )
      ] }),
      children: row && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-4 space-y-2 border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Patient" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: getPatientName(row.visit.patientId) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Prescribed by" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: getDoctorName(row.visit.doctorId) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Drug" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-accent", children: row.drugName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Dose / Frequency" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm", children: [
              row.dose,
              " · ",
              row.frequency
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Duration" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: row.duration })
          ] })
        ] }),
        matchedDrug && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Stock on hand:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: Number(matchedDrug.quantityOnHand) <= Number(matchedDrug.reorderLevel) ? "text-destructive font-bold" : "font-medium",
              children: [
                String(matchedDrug.quantityOnHand),
                " units"
              ]
            }
          ),
          Number(matchedDrug.quantityOnHand) <= Number(matchedDrug.reorderLevel) && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", className: "text-xs", children: "Low Stock" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Batch Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: batchNo,
                onChange: (e) => setBatchNo(e.target.value),
                placeholder: (matchedDrug == null ? void 0 : matchedDrug.batchNo) || "Enter batch number",
                "data-ocid": "dispense.batch_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Quantity to Dispense" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: "1",
                value: qty,
                onChange: (e) => setQty(e.target.value),
                "data-ocid": "dispense.qty_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Notes (optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: dispNotes,
                onChange: (e) => setDispNotes(e.target.value),
                placeholder: "e.g. Take with food",
                "data-ocid": "dispense.notes_input"
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
const DOSAGE_FORMS = [
  "Tablet",
  "Capsule",
  "Syrup",
  "Injection",
  "Cream",
  "Drops",
  "Powder",
  "Inhaler"
];
const DRUG_CATEGORIES = [
  "Antibiotic",
  "Analgesic",
  "Antihypertensive",
  "Antidiabetic",
  "Antihistamine",
  "Antifungal",
  "Antiviral",
  "Vitamin",
  "Steroid",
  "Other"
];
const EMPTY_DRUG_FORM = {
  name: "",
  genericName: "",
  dosageForm: "Tablet",
  strength: "",
  category: "Antibiotic",
  quantityOnHand: "100",
  reorderLevel: "20",
  expiryDate: "",
  batchNo: "",
  costPrice: "0",
  sellingPrice: "0",
  supplier: ""
};
function AddDrugModal({ open, onClose }) {
  const createDrug = useCreateDrug();
  const [form, setForm] = reactExports.useState({ ...EMPTY_DRUG_FORM });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDrug.mutateAsync({
        name: form.name,
        genericName: form.genericName,
        dosageForm: form.dosageForm,
        strength: form.strength,
        category: form.category,
        quantityOnHand: BigInt(form.quantityOnHand || "0"),
        reorderLevel: BigInt(form.reorderLevel || "0"),
        expiryDate: form.expiryDate,
        batchNo: form.batchNo,
        costPrice: BigInt(form.costPrice || "0"),
        sellingPrice: BigInt(form.sellingPrice || "0"),
        supplierId: null
      });
      ue.success(`${form.name} added to inventory`);
      setForm({ ...EMPTY_DRUG_FORM });
      onClose();
    } catch {
      ue.error("Failed to add drug");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: "Add Drug to Inventory",
      description: "Enter complete drug information including pricing and stock levels",
      size: "lg",
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "add_drug.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            form: "add-drug-form",
            disabled: createDrug.isPending,
            "data-ocid": "add_drug.submit_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
              createDrug.isPending ? "Adding..." : "Add Drug"
            ]
          }
        )
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          id: "add-drug-form",
          onSubmit: handleSubmit,
          className: "grid grid-cols-2 gap-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Drug Name *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.name,
                  onChange: set("name"),
                  required: true,
                  placeholder: "e.g. Amoxicillin",
                  "data-ocid": "add_drug.name_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Generic Name *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.genericName,
                  onChange: set("genericName"),
                  required: true,
                  placeholder: "e.g. Amoxicillin",
                  "data-ocid": "add_drug.generic_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Dosage Form" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "select",
                {
                  value: form.dosageForm,
                  onChange: set("dosageForm"),
                  className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                  "data-ocid": "add_drug.form_select",
                  children: DOSAGE_FORMS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: f }, f))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Strength" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.strength,
                  onChange: set("strength"),
                  placeholder: "e.g. 500mg",
                  "data-ocid": "add_drug.strength_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "select",
                {
                  value: form.category,
                  onChange: set("category"),
                  className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                  "data-ocid": "add_drug.category_select",
                  children: DRUG_CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: c }, c))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Batch Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.batchNo,
                  onChange: set("batchNo"),
                  placeholder: "e.g. BT-2024-001",
                  "data-ocid": "add_drug.batch_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Quantity on Hand" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  min: "0",
                  value: form.quantityOnHand,
                  onChange: set("quantityOnHand"),
                  "data-ocid": "add_drug.qty_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Reorder Level" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  min: "0",
                  value: form.reorderLevel,
                  onChange: set("reorderLevel"),
                  "data-ocid": "add_drug.reorder_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Expiry Date *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "date",
                  value: form.expiryDate,
                  onChange: set("expiryDate"),
                  required: true,
                  "data-ocid": "add_drug.expiry_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Supplier (name)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.supplier,
                  onChange: set("supplier"),
                  placeholder: "e.g. MedSupplies Ltd",
                  "data-ocid": "add_drug.supplier_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Cost Price (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  min: "0",
                  value: form.costPrice,
                  onChange: set("costPrice"),
                  "data-ocid": "add_drug.cost_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Selling Price (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  min: "0",
                  value: form.sellingPrice,
                  onChange: set("sellingPrice"),
                  "data-ocid": "add_drug.sell_input"
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function UpdateStockModal({ open, onClose, drug }) {
  const updateStock = useUpdateDrugStock();
  const [qty, setQty] = reactExports.useState("0");
  const [reason, setReason] = reactExports.useState("Purchase");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!drug) return;
    const change = reason === "Dispense" ? -BigInt(qty) : BigInt(qty);
    try {
      await updateStock.mutateAsync({
        drugId: drug.id,
        quantityChange: change
      });
      ue.success(`Stock updated for ${drug.name}`);
      setQty("0");
      onClose();
    } catch {
      ue.error("Failed to update stock");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: "Update Stock",
      description: drug ? `Adjust stock for ${drug.name}` : "",
      size: "sm",
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "stock.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            form: "stock-form",
            disabled: updateStock.isPending,
            "data-ocid": "stock.submit_button",
            children: updateStock.isPending ? "Updating..." : "Update Stock"
          }
        )
      ] }),
      children: drug && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { id: "stock-form", onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3 border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Current Stock" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: String(drug.quantityOnHand) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            "Reorder level: ",
            String(drug.reorderLevel)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Reason" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: reason,
              onChange: (e) => setReason(e.target.value),
              className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
              "data-ocid": "stock.reason_select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Purchase", children: "Purchase (add stock)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Dispense", children: "Dispense (subtract stock)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Adjustment", children: "Manual Adjustment (add)" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Quantity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: "0",
              value: qty,
              onChange: (e) => setQty(e.target.value),
              "data-ocid": "stock.qty_input"
            }
          )
        ] })
      ] })
    }
  );
}
function DrugInteractionModal({
  open,
  onClose
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: "Drug Interaction Check",
      size: "sm",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 py-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-full bg-yellow-500/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-7 w-7 text-yellow-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: "Interaction Check Not Available" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Interaction check not yet integrated — verify manually using clinical pharmacology references before dispensing." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "interaction.close_button",
            children: "Close"
          }
        )
      ] })
    }
  );
}
function CreatePOModal({ open, onClose, drugs }) {
  const createPO = useCreatePurchaseOrder();
  const [supplier, setSupplier] = reactExports.useState("");
  const [delivery, setDelivery] = reactExports.useState("");
  const [items, setItems] = reactExports.useState([{ drugId: "", qty: "1", unitCost: "0" }]);
  const addItem = () => setItems((prev) => [...prev, { drugId: "", qty: "1", unitCost: "0" }]);
  const removeItem = (i) => setItems((prev) => prev.filter((_, idx) => idx !== i));
  const updateItem = (i, k, v) => setItems(
    (prev) => prev.map((item, idx) => idx === i ? { ...item, [k]: v } : item)
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validItems = items.filter((it) => it.drugId).map((it) => ({
      drugId: BigInt(it.drugId),
      quantity: BigInt(it.qty || "1"),
      unitCost: BigInt(it.unitCost || "0")
    }));
    if (validItems.length === 0) {
      ue.error("Add at least one drug item");
      return;
    }
    try {
      await createPO.mutateAsync({
        supplierId: BigInt(1),
        items: validItems,
        expectedDelivery: delivery || null
      });
      ue.success("Purchase order created");
      setSupplier("");
      setDelivery("");
      setItems([{ drugId: "", qty: "1", unitCost: "0" }]);
      onClose();
    } catch {
      ue.error("Failed to create purchase order");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: "Create Purchase Order",
      size: "lg",
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "po.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            form: "po-form",
            disabled: createPO.isPending,
            "data-ocid": "po.submit_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-4 w-4 mr-2" }),
              createPO.isPending ? "Creating..." : "Create PO"
            ]
          }
        )
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { id: "po-form", onSubmit: handleSubmit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Supplier Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: supplier,
                onChange: (e) => setSupplier(e.target.value),
                placeholder: "e.g. MedSupplies Ltd",
                "data-ocid": "po.supplier_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Expected Delivery" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: delivery,
                onChange: (e) => setDelivery(e.target.value),
                "data-ocid": "po.delivery_input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Order Items" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: addItem,
                "data-ocid": "po.add_item_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3 mr-1" }),
                  " Add Item"
                ]
              }
            )
          ] }),
          items.map((item, i) => {
            var _a;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "grid grid-cols-[1fr_80px_90px_32px] gap-2 items-end",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    i === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Drug" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        value: item.drugId,
                        onChange: (e) => updateItem(i, "drugId", e.target.value),
                        className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                        "data-ocid": `po.drug_select.${i + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select drug..." }),
                          drugs.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: String(d.id), children: d.name }, String(d.id)))
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    i === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Qty" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "number",
                        min: "1",
                        value: item.qty,
                        onChange: (e) => updateItem(i, "qty", e.target.value),
                        "data-ocid": `po.qty_input.${i + 1}`
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    i === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Unit Cost" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "number",
                        min: "0",
                        value: item.unitCost,
                        onChange: (e) => updateItem(i, "unitCost", e.target.value),
                        "data-ocid": `po.cost_input.${i + 1}`
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "ghost",
                      size: "sm",
                      onClick: () => removeItem(i),
                      disabled: items.length === 1,
                      className: "text-destructive hover:text-destructive px-2",
                      "data-ocid": `po.remove_item.${i + 1}`,
                      children: "×"
                    }
                  )
                ]
              },
              `po-item-${((_a = item.drugId) == null ? void 0 : _a.toString()) ?? i}`
            );
          })
        ] })
      ] })
    }
  );
}
function PharmacyPage() {
  const { user } = useAuth();
  const { data: drugs = [], isLoading: drugsLoading } = useDrugs();
  const { data: lowStock = [] } = useLowStockDrugs();
  const { data: purchaseOrders = [], isLoading: poLoading } = usePurchaseOrders();
  const { data: visits = [], isLoading: visitsLoading } = useVisits();
  const { data: patients = [] } = usePatients();
  const [addDrugOpen, setAddDrugOpen] = reactExports.useState(false);
  const [stockModal, setStockModal] = reactExports.useState(null);
  const [dispenseRow, setDispenseRow] = reactExports.useState(null);
  const [interactionOpen, setInteractionOpen] = reactExports.useState(false);
  const [createPOOpen, setCreatePOOpen] = reactExports.useState(false);
  const [activeTab, setActiveTab] = reactExports.useState("prescriptions");
  const [lowStockFilter, setLowStockFilter] = reactExports.useState(false);
  const isPharmacist = (user == null ? void 0 : user.role) === UserRole.Pharmacist || (user == null ? void 0 : user.role) === UserRole.SuperAdmin;
  const prescriptionRows = reactExports.useMemo(() => {
    const rows = [];
    for (const visit of visits) {
      visit.prescriptions.forEach((rx, idx) => {
        rows.push({
          rowKey: `${String(visit.id)}-${idx}`,
          visit,
          drugName: rx.drugName,
          dose: rx.dose,
          dosageForm: rx.dosageForm,
          frequency: rx.frequency,
          duration: rx.duration,
          notes: rx.notes ?? "",
          status: rx.status,
          prescriptionIndex: idx
        });
      });
    }
    return rows;
  }, [visits]);
  const pendingRx = prescriptionRows.filter(
    (r) => r.status === PrescriptionStatus.Pending
  );
  const dispensedRx = prescriptionRows.filter(
    (r) => r.status === PrescriptionStatus.Dispensed
  );
  const expiringDrugs = drugs.filter((d) => isExpiringSoon(d.expiryDate));
  const expiredDrugs = drugs.filter((d) => isExpired(d.expiryDate));
  const getPatientName = (id) => {
    const p = patients.find((p2) => p2.id === id);
    return p ? `${p.firstName} ${p.lastName}` : `Patient #${id}`;
  };
  const getDoctorName = (id) => `Dr. Staff #${id}`;
  const filteredDrugs = lowStockFilter ? lowStock : drugs;
  const drugColumns = [
    {
      accessorKey: "name",
      header: "Drug Name",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { className: "h-3.5 w-3.5 text-accent shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: row.original.name })
      ] })
    },
    { accessorKey: "genericName", header: "Generic" },
    { accessorKey: "dosageForm", header: "Form" },
    { accessorKey: "strength", header: "Strength" },
    {
      id: "qty",
      header: "Qty on Hand",
      accessorFn: (r) => Number(r.quantityOnHand),
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: Number(row.original.quantityOnHand) <= Number(row.original.reorderLevel) ? "font-bold text-destructive" : "font-medium",
          children: String(row.original.quantityOnHand)
        }
      )
    },
    {
      id: "reorder",
      header: "Reorder Lvl",
      accessorFn: (r) => Number(r.reorderLevel),
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: String(row.original.reorderLevel) })
    },
    {
      accessorKey: "expiryDate",
      header: "Expiry",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: isExpired(row.original.expiryDate) ? "text-destructive font-medium" : isExpiringSoon(row.original.expiryDate) ? "text-yellow-400 font-medium" : "",
          children: row.original.expiryDate
        }
      )
    },
    {
      id: "cost",
      header: "Cost/Sell (₹)",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
        String(row.original.costPrice),
        " / ",
        String(row.original.sellingPrice)
      ] })
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        const d = row.original;
        if (!d.isActive) return /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: "Inactive" });
        if (isExpired(d.expiryDate))
          return /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: "Expired", variant: "danger" });
        if (isExpiringSoon(d.expiryDate))
          return /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: "Expiring Soon", variant: "warning" });
        if (Number(d.quantityOnHand) <= Number(d.reorderLevel))
          return /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: "Low Stock", variant: "warning" });
        return /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: "In Stock", variant: "success" });
      }
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => isPharmacist ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: () => setStockModal(row.original),
          "data-ocid": `inventory.update_button.${row.index + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3.5 w-3.5 mr-1" }),
            " Update"
          ]
        }
      ) }) : null
    }
  ];
  const rxColumns = [
    {
      id: "patient",
      header: "Patient",
      accessorFn: (r) => getPatientName(r.visit.patientId),
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: String(getValue()) })
    },
    { accessorKey: "drugName", header: "Drug" },
    {
      id: "doseFreq",
      header: "Dose / Frequency",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm", children: [
        row.original.dose,
        " · ",
        row.original.frequency
      ] })
    },
    { accessorKey: "duration", header: "Duration" },
    {
      id: "doctor",
      header: "Prescribed By",
      accessorFn: (r) => getDoctorName(r.visit.doctorId),
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: String(getValue()) })
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => row.original.status === PrescriptionStatus.Dispensed ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-green-500/15 text-green-400 border border-green-500/30 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3 mr-1" }),
        " Dispensed"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: "Pending", variant: "warning" })
    },
    {
      id: "action",
      header: "",
      cell: ({ row }) => row.original.status === PrescriptionStatus.Pending && isPharmacist ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          size: "sm",
          onClick: () => setDispenseRow(row.original),
          "data-ocid": `rx.dispense_button.${row.index + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3.5 w-3.5 mr-1" }),
            " Dispense"
          ]
        }
      ) : null
    }
  ];
  const poColumns = [
    {
      id: "poNo",
      header: "PO Number",
      accessorFn: (r) => `PO-${String(r.id).padStart(4, "0")}`,
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-medium text-accent", children: String(getValue()) })
    },
    {
      id: "supplier",
      header: "Supplier",
      accessorFn: (r) => `Supplier #${r.supplierId}`,
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: String(getValue()) })
    },
    {
      id: "items",
      header: "Items",
      accessorFn: (r) => r.items.length,
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
        String(getValue()),
        " items"
      ] })
    },
    {
      id: "total",
      header: "Total (₹)",
      accessorFn: (r) => r.items.reduce(
        (s, it) => s + Number(it.quantity) * Number(it.unitCost),
        0
      ),
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
        "₹",
        Number(getValue()).toLocaleString()
      ] })
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: row.original.status })
    },
    {
      accessorKey: "expectedDelivery",
      header: "Expected Delivery",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: row.original.expectedDelivery ?? "—" })
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "pharmacy.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Pharmacy",
        description: "Prescription dispensing, drug inventory, and purchase orders",
        breadcrumb: ["Pharmacy"],
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => setInteractionOpen(true),
              "data-ocid": "pharmacy.interaction_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-4 w-4 mr-2" }),
                "Check Interactions"
              ]
            }
          ),
          isPharmacist && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              onClick: () => setAddDrugOpen(true),
              "data-ocid": "pharmacy.add_drug_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
                "Add Drug"
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mb-6", children: [
      lowStock.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            setLowStockFilter(true);
            setActiveTab("inventory");
          },
          className: "w-full text-left p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-center gap-3 hover:bg-yellow-500/15 transition-colors",
          "data-ocid": "pharmacy.low_stock_banner",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-yellow-400 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-yellow-400 font-medium", children: [
              "⚠️ ",
              lowStock.length,
              " drug",
              lowStock.length !== 1 ? "s" : "",
              " below reorder level — click to filter"
            ] })
          ]
        }
      ),
      expiringDrugs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg flex items-center gap-3",
          "data-ocid": "pharmacy.expiry_banner",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-5 w-5 text-orange-400 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-orange-400 font-medium", children: [
              "🕐 ",
              expiringDrugs.length,
              " drug",
              expiringDrugs.length !== 1 ? "s" : "",
              " expiring within 30 days",
              expiredDrugs.length > 0 && ` · ${expiredDrugs.length} already expired`
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Tabs,
      {
        value: activeTab,
        onValueChange: (v) => {
          setActiveTab(v);
          if (v !== "inventory") setLowStockFilter(false);
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "prescriptions",
                "data-ocid": "pharmacy.prescriptions.tab",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-4 w-4 mr-2" }),
                  "Prescriptions",
                  pendingRx.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-2 bg-primary/20 text-primary border-primary/30 text-xs px-1.5 py-0", children: pendingRx.length })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "inventory", "data-ocid": "pharmacy.inventory.tab", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { className: "h-4 w-4 mr-2" }),
              "Drug Inventory",
              lowStock.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "ml-2 bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs px-1.5 py-0", children: [
                lowStock.length,
                " low"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "orders", "data-ocid": "pharmacy.orders.tab", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-4 w-4 mr-2" }),
              "Purchase Orders"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "prescriptions", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-yellow-400" }),
                "Pending Dispensing"
              ] }),
              pendingRx.length === 0 && !visitsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                EmptyState,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-8 w-8" }),
                  title: "No pending prescriptions",
                  description: "All prescriptions have been dispensed."
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                DataTable,
                {
                  data: pendingRx,
                  columns: rxColumns,
                  searchPlaceholder: "Search prescriptions...",
                  isLoading: visitsLoading
                }
              )
            ] }),
            dispensedRx.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-green-400" }),
                "Recently Dispensed"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                DataTable,
                {
                  data: dispensedRx,
                  columns: rxColumns,
                  searchPlaceholder: "Search dispensed..."
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "inventory", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6", children: [
            lowStockFilter && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-yellow-400 font-medium", children: "Showing low-stock items only" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => setLowStockFilter(false),
                  "data-ocid": "pharmacy.clear_filter_button",
                  children: "Clear filter"
                }
              )
            ] }),
            filteredDrugs.length === 0 && !drugsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              EmptyState,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { className: "h-8 w-8" }),
                title: "No drugs in inventory",
                description: lowStockFilter ? "No low-stock items found." : "Add drugs to get started.",
                action: {
                  label: "Add Drug",
                  onClick: () => setAddDrugOpen(true)
                }
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                data: filteredDrugs,
                columns: drugColumns,
                searchPlaceholder: "Search drug inventory...",
                isLoading: drugsLoading
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "orders", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mb-4", children: isPharmacist && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                onClick: () => setCreatePOOpen(true),
                "data-ocid": "pharmacy.create_po_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
                  "Create Purchase Order"
                ]
              }
            ) }),
            purchaseOrders.length === 0 && !poLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              EmptyState,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-8 w-8" }),
                title: "No purchase orders",
                description: "Create a purchase order to restock your inventory.",
                action: {
                  label: "Create PO",
                  onClick: () => setCreatePOOpen(true)
                }
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                data: purchaseOrders,
                columns: poColumns,
                searchPlaceholder: "Search purchase orders...",
                isLoading: poLoading
              }
            )
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddDrugModal, { open: addDrugOpen, onClose: () => setAddDrugOpen(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      UpdateStockModal,
      {
        open: !!stockModal,
        onClose: () => setStockModal(null),
        drug: stockModal
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DispenseModal,
      {
        open: !!dispenseRow,
        onClose: () => setDispenseRow(null),
        row: dispenseRow,
        getPatientName,
        getDoctorName,
        drugs
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DrugInteractionModal,
      {
        open: interactionOpen,
        onClose: () => setInteractionOpen(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreatePOModal,
      {
        open: createPOOpen,
        onClose: () => setCreatePOOpen(false),
        drugs
      }
    )
  ] });
}
export {
  PharmacyPage
};
