import { c as createLucideIcon, Y as useActor, Z as useQuery, _ as useQueryClient, $ as useMutation, a0 as createActor, h as useAuth, k as useWards, j as jsxRuntimeExports, m as PageHeader, r as reactExports, a as Button, b as ue, S as StatusBadge, aD as IndentStatus } from "./index-DZPPfMmg.js";
import { D as DataTable } from "./DataTable-AcgTuFIu.js";
import { M as Modal } from "./Modal-BHmlK1FU.js";
import { I as Input } from "./input-Clo9Nqqp.js";
import { L as Label } from "./label-DqZ3T788.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BTTMIgyw.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-9iSmyv76.js";
import { P as Package } from "./package-C6LuIuBZ.js";
import { C as ClipboardList } from "./clipboard-list-B5KKi9nP.js";
import { B as Building2 } from "./building-2-DnjvQNRq.js";
import { P as Plus } from "./plus-CgeKf2CL.js";
import { W as Wrench } from "./wrench-L7jRLAAA.js";
import { C as CircleCheckBig } from "./circle-check-big-D_Mpxmxn.js";
import { C as CircleX } from "./circle-x-B6ektVcc.js";
import "./chevron-up-Cdh06Vhn.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M20 7h-9", key: "3s1dr2" }],
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
];
const Settings2 = createLucideIcon("settings-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
const Truck = createLucideIcon("truck", __iconNode);
function useEquipment() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["equipment"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEquipment();
    },
    enabled: !!actor && !isFetching
  });
}
function useConsumables() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["consumables"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getConsumables();
    },
    enabled: !!actor && !isFetching
  });
}
function useSuppliers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["suppliers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSuppliers();
    },
    enabled: !!actor && !isFetching
  });
}
function useIndents() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["indents"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getIndentRequests();
    },
    enabled: !!actor && !isFetching
  });
}
function useCreateEquipmentItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args) => {
      if (!actor) throw new Error("No actor");
      return actor.createEquipmentItem(
        args.name,
        args.category,
        args.serialNumber,
        args.purchaseDate,
        args.cost,
        args.wardId
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["equipment"] })
  });
}
function useCreateConsumable() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args) => {
      if (!actor) throw new Error("No actor");
      return actor.createConsumable(
        args.name,
        args.quantity,
        args.reorderLevel,
        args.unitCost,
        args.supplierId
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["consumables"] })
  });
}
function useCreateSupplier() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args) => {
      if (!actor) throw new Error("No actor");
      return actor.createSupplier(
        args.name,
        args.phone,
        args.email,
        args.address,
        args.categories,
        args.paymentTerms
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["suppliers"] })
  });
}
function useCreateIndent() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args) => {
      if (!actor) throw new Error("No actor");
      return actor.createIndentRequest(args.requestedById, args.items);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["indents"] })
  });
}
function useUpdateIndentStatus() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args) => {
      if (!actor) throw new Error("No actor");
      return actor.updateIndentStatus(args.id, args.status);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["indents"] })
  });
}
function EquipmentStatusBadge({ status }) {
  const map = {
    Active: { label: "Active", variant: "success" },
    InMaintenance: { label: "In Maintenance", variant: "warning" },
    Decommissioned: { label: "Decommissioned", variant: "neutral" }
  };
  const { label, variant } = map[status] ?? {
    label: String(status),
    variant: "neutral"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: label, variant });
}
function StockIndicator({ qty, reorder }) {
  const q = Number(qty);
  const r = Number(reorder);
  const low = q <= r;
  const pct = r === 0 ? 100 : Math.min(100, Math.round(q / (r * 2) * 100));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-[100px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 bg-muted/40 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `h-full rounded-full transition-all ${low ? "bg-destructive" : "bg-green-500"}`,
        style: { width: `${pct}%` }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `text-xs font-medium tabular-nums ${low ? "text-destructive" : "text-green-400"}`,
        children: q
      }
    )
  ] });
}
function IndentStatusBadge({ status }) {
  const map = {
    Pending: { variant: "warning" },
    Approved: { variant: "success" },
    Rejected: { variant: "danger" },
    Fulfilled: { variant: "info" }
  };
  const { variant } = map[status] ?? { variant: "neutral" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status, variant });
}
const EQUIPMENT_CATEGORIES = [
  "Monitor",
  "Ventilator",
  "Infusion Pump",
  "Defibrillator",
  "Wheelchair",
  "Other"
];
function AddEquipmentModal({
  open,
  onClose,
  wardOptions
}) {
  const createEquipment = useCreateEquipmentItem();
  const [form, setForm] = reactExports.useState({
    name: "",
    category: "Monitor",
    serialNumber: "",
    purchaseDate: "",
    cost: "",
    wardId: "",
    nextServiceDate: ""
  });
  const f = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const handleSubmit = async () => {
    if (!form.name || !form.serialNumber || !form.purchaseDate || !form.cost) {
      ue.error("Please fill all required fields");
      return;
    }
    try {
      await createEquipment.mutateAsync({
        name: form.name,
        category: form.category,
        serialNumber: form.serialNumber,
        purchaseDate: form.purchaseDate,
        cost: BigInt(Math.round(Number(form.cost) * 100)),
        wardId: form.wardId && form.wardId !== "none" ? BigInt(form.wardId) : null
      });
      ue.success("Equipment added successfully");
      onClose();
      setForm({
        name: "",
        category: "Monitor",
        serialNumber: "",
        purchaseDate: "",
        cost: "",
        wardId: "",
        nextServiceDate: ""
      });
    } catch {
      ue.error("Failed to add equipment");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: "Add Equipment",
      description: "Register a new medical equipment item",
      size: "lg",
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "equipment.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: handleSubmit,
            disabled: createEquipment.isPending,
            "data-ocid": "equipment.submit_button",
            children: createEquipment.isPending ? "Adding..." : "Add Equipment"
          }
        )
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Equipment Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.name,
              onChange: (e) => f("name", e.target.value),
              placeholder: "e.g. Cardiac Monitor",
              "data-ocid": "equipment.name_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.category, onValueChange: (v) => f("category", v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "equipment.category_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: EQUIPMENT_CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Serial Number *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.serialNumber,
              onChange: (e) => f("serialNumber", e.target.value),
              placeholder: "SN-XXXX",
              "data-ocid": "equipment.serial_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Purchase Date *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: form.purchaseDate,
              onChange: (e) => f("purchaseDate", e.target.value),
              "data-ocid": "equipment.purchase_date_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Cost (₹) *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: "0",
              value: form.cost,
              onChange: (e) => f("cost", e.target.value),
              placeholder: "0.00",
              "data-ocid": "equipment.cost_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Ward Assignment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.wardId, onValueChange: (v) => f("wardId", v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "equipment.ward_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select ward" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "None" }),
              wardOptions.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(w.id), children: w.name }, String(w.id)))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Next Service Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: form.nextServiceDate,
              onChange: (e) => f("nextServiceDate", e.target.value),
              "data-ocid": "equipment.service_date_input"
            }
          )
        ] })
      ] })
    }
  );
}
function AddConsumableModal({
  open,
  onClose,
  suppliers
}) {
  const createConsumable = useCreateConsumable();
  const [form, setForm] = reactExports.useState({
    name: "",
    quantity: "",
    reorderLevel: "",
    unitCost: "",
    supplierId: ""
  });
  const f = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const handleSubmit = async () => {
    if (!form.name || !form.quantity || !form.reorderLevel || !form.unitCost) {
      ue.error("Please fill all required fields");
      return;
    }
    try {
      await createConsumable.mutateAsync({
        name: form.name,
        quantity: BigInt(form.quantity),
        reorderLevel: BigInt(form.reorderLevel),
        unitCost: BigInt(Math.round(Number(form.unitCost) * 100)),
        supplierId: form.supplierId && form.supplierId !== "none" ? BigInt(form.supplierId) : null
      });
      ue.success("Consumable added successfully");
      onClose();
      setForm({
        name: "",
        quantity: "",
        reorderLevel: "",
        unitCost: "",
        supplierId: ""
      });
    } catch {
      ue.error("Failed to add consumable");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: "Add Consumable",
      description: "Add a new consumable stock item",
      size: "md",
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "consumable.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: handleSubmit,
            disabled: createConsumable.isPending,
            "data-ocid": "consumable.submit_button",
            children: createConsumable.isPending ? "Saving..." : "Add Consumable"
          }
        )
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Item Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.name,
              onChange: (e) => f("name", e.target.value),
              placeholder: "e.g. Surgical Gloves (L)",
              "data-ocid": "consumable.name_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Quantity on Hand *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: "0",
              value: form.quantity,
              onChange: (e) => f("quantity", e.target.value),
              placeholder: "100",
              "data-ocid": "consumable.quantity_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Reorder Level *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: "0",
              value: form.reorderLevel,
              onChange: (e) => f("reorderLevel", e.target.value),
              placeholder: "20",
              "data-ocid": "consumable.reorder_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Unit Cost (₹) *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: "0",
              step: "0.01",
              value: form.unitCost,
              onChange: (e) => f("unitCost", e.target.value),
              placeholder: "0.00",
              "data-ocid": "consumable.cost_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Supplier" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.supplierId,
              onValueChange: (v) => f("supplierId", v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "consumable.supplier_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select supplier" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "None" }),
                  suppliers.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(s.id), children: s.name }, String(s.id)))
                ] })
              ]
            }
          )
        ] })
      ] })
    }
  );
}
const SUPPLY_CATEGORIES = [
  "Pharmaceuticals",
  "Surgical Supplies",
  "Diagnostic Equipment",
  "Consumables",
  "Medical Gases",
  "Linen & Textiles",
  "IT Equipment"
];
function AddVendorModal({ open, onClose }) {
  const createSupplier = useCreateSupplier();
  const [form, setForm] = reactExports.useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    paymentTerms: "Net 30"
  });
  const [selectedCategories, setSelectedCategories] = reactExports.useState([]);
  const f = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const toggleCat = (cat) => setSelectedCategories(
    (prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
  );
  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email) {
      ue.error("Name, phone and email are required");
      return;
    }
    try {
      await createSupplier.mutateAsync({
        name: form.name,
        phone: form.phone,
        email: form.email,
        address: form.address,
        categories: selectedCategories,
        paymentTerms: form.paymentTerms
      });
      ue.success("Vendor added successfully");
      onClose();
      setForm({
        name: "",
        phone: "",
        email: "",
        address: "",
        paymentTerms: "Net 30"
      });
      setSelectedCategories([]);
    } catch {
      ue.error("Failed to add vendor");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: "Add Vendor",
      description: "Register a new supplier / vendor",
      size: "lg",
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "vendor.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: handleSubmit,
            disabled: createSupplier.isPending,
            "data-ocid": "vendor.submit_button",
            children: createSupplier.isPending ? "Saving..." : "Add Vendor"
          }
        )
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Vendor Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.name,
              onChange: (e) => f("name", e.target.value),
              placeholder: "MedSupply Corp",
              "data-ocid": "vendor.name_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.phone,
              onChange: (e) => f("phone", e.target.value),
              placeholder: "+91 98765 43210",
              "data-ocid": "vendor.phone_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "email",
              value: form.email,
              onChange: (e) => f("email", e.target.value),
              placeholder: "contact@vendor.com",
              "data-ocid": "vendor.email_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.address,
              onChange: (e) => f("address", e.target.value),
              placeholder: "123 Supply Street, Mumbai",
              "data-ocid": "vendor.address_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Payment Terms" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.paymentTerms,
              onValueChange: (v) => f("paymentTerms", v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "vendor.payment_terms_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ["Net 15", "Net 30", "Net 45", "Net 60", "COD", "Advance"].map(
                  (t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t, children: t }, t)
                ) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Supply Categories" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mt-1", children: SUPPLY_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => toggleCat(cat),
              className: `px-3 py-1 rounded-full text-xs font-medium border transition-colors ${selectedCategories.includes(cat) ? "bg-primary text-primary-foreground border-primary" : "bg-muted/30 text-muted-foreground border-border hover:bg-muted/50"}`,
              children: cat
            },
            cat
          )) })
        ] })
      ] })
    }
  );
}
function CreateRequisitionModal({
  open,
  onClose,
  userId
}) {
  const createIndent = useCreateIndent();
  const [lines, setLines] = reactExports.useState([
    { itemName: "", quantity: "1" }
  ]);
  const addLine = () => setLines((p) => [...p, { itemName: "", quantity: "1" }]);
  const removeLine = (idx) => setLines((p) => p.filter((_, i) => i !== idx));
  const updateLine = (idx, k, v) => setLines((p) => p.map((l, i) => i === idx ? { ...l, [k]: v } : l));
  const handleSubmit = async () => {
    const validLines = lines.filter((l) => l.itemName.trim());
    if (validLines.length === 0) {
      ue.error("Add at least one item");
      return;
    }
    try {
      await createIndent.mutateAsync({
        requestedById: userId,
        items: validLines.map((l, i) => ({
          itemId: BigInt(i + 1),
          itemName: l.itemName.trim(),
          quantity: BigInt(Number(l.quantity) || 1)
        }))
      });
      ue.success("Requisition submitted for review");
      onClose();
      setLines([{ itemName: "", quantity: "1" }]);
    } catch {
      ue.error("Failed to create requisition");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: "Create Indent Request",
      description: "List items needed and submit for admin approval",
      size: "lg",
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "requisition.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: handleSubmit,
            disabled: createIndent.isPending,
            "data-ocid": "requisition.submit_button",
            children: createIndent.isPending ? "Submitting..." : "Submit for Review"
          }
        )
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        lines.map((line, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Item name e.g. Surgical Gloves (M)",
                  value: line.itemName,
                  onChange: (e) => updateLine(idx, "itemName", e.target.value),
                  className: "flex-1",
                  "data-ocid": `requisition.item_name.${idx + 1}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  min: "1",
                  value: line.quantity,
                  onChange: (e) => updateLine(idx, "quantity", e.target.value),
                  className: "w-20",
                  placeholder: "Qty",
                  "data-ocid": `requisition.item_qty.${idx + 1}`
                }
              ),
              lines.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => removeLine(idx),
                  className: "p-1.5 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors",
                  "aria-label": "Remove item",
                  "data-ocid": `requisition.remove_item.${idx + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4" })
                }
              )
            ]
          },
          `indent-line-${line.itemName || idx}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: addLine,
            className: "mt-1",
            "data-ocid": "requisition.add_item_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5 mr-1" }),
              " Add Item"
            ]
          }
        )
      ] })
    }
  );
}
function VendorDetailModal({
  vendor,
  open,
  onClose
}) {
  if (!vendor) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: vendor.name,
      description: "Vendor details",
      size: "md",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-lg p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm", children: vendor.phone })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-lg p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm truncate", children: vendor.email })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-lg p-3 col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm", children: vendor.address || "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-lg p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Payment Terms" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm", children: vendor.paymentTerms })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Supply Categories" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: vendor.categories.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "None specified" }) : vendor.categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "px-2.5 py-0.5 rounded-full text-xs bg-accent/15 text-accent border border-accent/30",
              children: c
            },
            c
          )) })
        ] })
      ] })
    }
  );
}
function EquipmentTab({ wards }) {
  const { data: equipment, isLoading } = useEquipment();
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const wardMap = new Map(wards.map((w) => [String(w.id), w.name]));
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: String(getValue()) })
    },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "serialNumber", header: "Serial #" },
    { accessorKey: "purchaseDate", header: "Purchase Date" },
    {
      accessorKey: "cost",
      header: "Cost",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums", children: [
        "₹",
        (Number(getValue()) / 100).toLocaleString()
      ] })
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(EquipmentStatusBadge, { status: row.original.status })
    },
    {
      id: "ward",
      header: "Ward",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: row.original.wardId ? wardMap.get(String(row.original.wardId)) ?? "—" : "—" })
    },
    {
      accessorKey: "nextServiceDate",
      header: "Next Service",
      cell: ({ getValue }) => {
        const v = getValue();
        return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: v ? String(v) : "—" });
      }
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded hover:bg-muted/30 transition-colors",
          "aria-label": "Maintenance log",
          onClick: () => ue.info(`Maintenance log for ${row.original.name} — coming soon`),
          "data-ocid": "equipment.maintenance_log_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-3.5 w-3.5" }),
            "Log"
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        data: equipment ?? [],
        columns,
        searchPlaceholder: "Search equipment...",
        isLoading,
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            onClick: () => setShowAdd(true),
            "data-ocid": "equipment.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
              " Add Equipment"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddEquipmentModal,
      {
        open: showAdd,
        onClose: () => setShowAdd(false),
        wardOptions: wards
      }
    )
  ] });
}
function ConsumablesTab({ suppliers }) {
  const { data: consumables, isLoading } = useConsumables();
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const supplierMap = new Map(suppliers.map((s) => [String(s.id), s.name]));
  const columns = [
    {
      accessorKey: "name",
      header: "Item Name",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: String(getValue()) })
    },
    {
      id: "stockLevel",
      header: "Stock Level",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        StockIndicator,
        {
          qty: row.original.quantity,
          reorder: row.original.reorderLevel
        }
      )
    },
    {
      accessorKey: "quantity",
      header: "Qty on Hand",
      cell: ({ row }) => {
        const low = row.original.quantity <= row.original.reorderLevel;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `font-semibold tabular-nums ${low ? "text-destructive" : "text-foreground"}`,
            children: String(row.original.quantity)
          }
        );
      }
    },
    {
      accessorKey: "reorderLevel",
      header: "Reorder Level",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums", children: String(getValue()) })
    },
    {
      accessorKey: "unitCost",
      header: "Unit Cost",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums", children: [
        "₹",
        (Number(getValue()) / 100).toFixed(2)
      ] })
    },
    {
      id: "supplier",
      header: "Supplier",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: row.original.supplierId ? supplierMap.get(String(row.original.supplierId)) ?? "—" : "—" })
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        data: consumables ?? [],
        columns,
        searchPlaceholder: "Search consumables...",
        isLoading,
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            onClick: () => setShowAdd(true),
            "data-ocid": "consumables.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
              " Add Consumable"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddConsumableModal,
      {
        open: showAdd,
        onClose: () => setShowAdd(false),
        suppliers
      }
    )
  ] });
}
function RequisitionsTab({ userId, canApprove }) {
  const { data: indents, isLoading } = useIndents();
  const updateStatus = useUpdateIndentStatus();
  const [showCreate, setShowCreate] = reactExports.useState(false);
  const handleApprove = async (indent) => {
    try {
      await updateStatus.mutateAsync({
        id: indent.id,
        status: IndentStatus.Approved
      });
      ue.success("Requisition approved");
    } catch {
      ue.error("Failed to update status");
    }
  };
  const handleReject = async (indent) => {
    try {
      await updateStatus.mutateAsync({
        id: indent.id,
        status: IndentStatus.Rejected
      });
      ue.success("Requisition rejected");
    } catch {
      ue.error("Failed to update status");
    }
  };
  const columns = [
    {
      id: "id",
      header: "Req #",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
        "#",
        String(row.original.id).padStart(4, "0")
      ] })
    },
    {
      id: "requester",
      header: "Requested By",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm", children: [
        "User #",
        String(row.original.requestedById)
      ] })
    },
    {
      id: "items",
      header: "Items",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm tabular-nums", children: [
        row.original.items.length,
        " item",
        row.original.items.length !== 1 ? "s" : ""
      ] })
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(IndentStatusBadge, { status: String(row.original.status) })
    },
    {
      id: "createdAt",
      header: "Date",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: new Date(
        Number(row.original.createdAt) / 1e6
      ).toLocaleDateString() })
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const indent = row.original;
        const isPending = String(indent.status) === "Pending";
        if (!canApprove || !isPending) return null;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => handleApprove(indent),
              className: "flex items-center gap-1 text-xs text-green-400 hover:text-green-300 px-2 py-1 rounded hover:bg-green-500/10 transition-colors",
              "aria-label": "Approve requisition",
              "data-ocid": `requisition.approve_button.${row.index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3.5 w-3.5" }),
                " Approve"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => handleReject(indent),
              className: "flex items-center gap-1 text-xs text-destructive hover:text-red-400 px-2 py-1 rounded hover:bg-destructive/10 transition-colors",
              "aria-label": "Reject requisition",
              "data-ocid": `requisition.reject_button.${row.index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5" }),
                " Reject"
              ]
            }
          )
        ] });
      }
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        data: indents ?? [],
        columns,
        searchPlaceholder: "Search requisitions...",
        isLoading,
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            onClick: () => setShowCreate(true),
            "data-ocid": "requisition.create_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
              " New Requisition"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateRequisitionModal,
      {
        open: showCreate,
        onClose: () => setShowCreate(false),
        userId
      }
    )
  ] });
}
function VendorsTab() {
  const { data: suppliers, isLoading } = useSuppliers();
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [selectedVendor, setSelectedVendor] = reactExports.useState(null);
  const columns = [
    {
      accessorKey: "name",
      header: "Vendor Name",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "font-medium text-foreground hover:text-primary transition-colors text-left",
          onClick: () => setSelectedVendor(row.original),
          "data-ocid": `vendors.row.${row.index + 1}`,
          children: row.original.name
        }
      )
    },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "email", header: "Email" },
    {
      id: "categories",
      header: "Supply Categories",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
        row.original.categories.slice(0, 2).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-xs px-1.5 py-0.5 rounded bg-muted/30 text-muted-foreground",
            children: c
          },
          c
        )),
        row.original.categories.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs px-1.5 py-0.5 rounded bg-muted/30 text-muted-foreground", children: [
          "+",
          row.original.categories.length - 2
        ] })
      ] })
    },
    { accessorKey: "paymentTerms", header: "Payment Terms" },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: () => setSelectedVendor(row.original),
          "data-ocid": `vendors.view_button.${row.index + 1}`,
          children: "View Details"
        }
      )
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        data: suppliers ?? [],
        columns,
        searchPlaceholder: "Search vendors...",
        isLoading,
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            onClick: () => setShowAdd(true),
            "data-ocid": "vendors.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
              " Add Vendor"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddVendorModal, { open: showAdd, onClose: () => setShowAdd(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      VendorDetailModal,
      {
        vendor: selectedVendor,
        open: !!selectedVendor,
        onClose: () => setSelectedVendor(null)
      }
    )
  ] });
}
function SummaryCard({
  icon,
  label,
  queryHook,
  color,
  filterFn
}) {
  const { data, isLoading } = queryHook();
  const count = filterFn ? (data ?? []).filter(filterFn).length : (data ?? []).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${color} bg-muted/20 p-2.5 rounded-lg shrink-0`, children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: label }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-8 bg-muted/40 rounded animate-pulse mt-0.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground tabular-nums", children: count })
    ] })
  ] });
}
function InventoryPage() {
  const { user } = useAuth();
  const { data: wards } = useWards();
  const { data: suppliers } = useSuppliers();
  const wardOptions = (wards ?? []).map((w) => ({ id: w.id, name: w.name }));
  const canApprove = (user == null ? void 0 : user.role) === "SuperAdmin" || (user == null ? void 0 : user.role) === "Receptionist";
  const userId = (user == null ? void 0 : user.userId) ?? BigInt(1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", "data-ocid": "inventory.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Inventory & Supplies",
        description: "Medical equipment, consumables, indent requests and vendor management",
        breadcrumb: ["HMS", "Inventory"]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SummaryCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { className: "h-5 w-5" }),
          label: "Equipment Items",
          queryHook: useEquipment,
          color: "text-blue-400"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SummaryCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-5 w-5" }),
          label: "Consumable Types",
          queryHook: useConsumables,
          color: "text-teal-400"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SummaryCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-5 w-5" }),
          label: "Open Requisitions",
          queryHook: useIndents,
          color: "text-yellow-400",
          filterFn: (d) => String(d.status) === "Pending"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SummaryCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-5 w-5" }),
          label: "Vendors",
          queryHook: useSuppliers,
          color: "text-purple-400"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "equipment", className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-muted/20 border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "equipment",
            className: "gap-1.5",
            "data-ocid": "inventory.equipment_tab",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { className: "h-4 w-4" }),
              " Equipment"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "consumables",
            className: "gap-1.5",
            "data-ocid": "inventory.consumables_tab",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4" }),
              " Consumables"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "requisitions",
            className: "gap-1.5",
            "data-ocid": "inventory.requisitions_tab",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-4 w-4" }),
              " Requisitions"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "vendors",
            className: "gap-1.5",
            "data-ocid": "inventory.vendors_tab",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4" }),
              " Vendors"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "equipment", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EquipmentTab, { wards: wardOptions }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "consumables", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ConsumablesTab, { suppliers: suppliers ?? [] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "requisitions", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RequisitionsTab, { userId, canApprove }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "vendors", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(VendorsTab, {}) })
    ] })
  ] });
}
export {
  InventoryPage
};
