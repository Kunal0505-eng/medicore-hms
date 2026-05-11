import { IndentStatus } from "@/backend";
import type {
  Consumable,
  EquipmentItem,
  EquipmentStatus,
  IndentRequest,
  Supplier,
  WardId,
} from "@/backend";
import { DataTable } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import {
  useConsumables,
  useCreateConsumable,
  useCreateEquipmentItem,
  useCreateIndent,
  useCreateSupplier,
  useEquipment,
  useIndents,
  useSuppliers,
  useUpdateIndentStatus,
} from "@/services/inventory";
import { useWards } from "@/services/ward";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Building2,
  CheckCircle,
  ClipboardList,
  Package,
  Plus,
  Settings2,
  Truck,
  Wrench,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Equipment Status badge mapping ──────────────────────────────────────────
function EquipmentStatusBadge({ status }: { status: EquipmentStatus }) {
  const map: Record<
    string,
    { label: string; variant: "success" | "warning" | "neutral" }
  > = {
    Active: { label: "Active", variant: "success" },
    InMaintenance: { label: "In Maintenance", variant: "warning" },
    Decommissioned: { label: "Decommissioned", variant: "neutral" },
  };
  const { label, variant } = map[status] ?? {
    label: String(status),
    variant: "neutral" as const,
  };
  return <StatusBadge status={label} variant={variant} />;
}

// ─── Stock Level Indicator ────────────────────────────────────────────────────
function StockIndicator({ qty, reorder }: { qty: bigint; reorder: bigint }) {
  const q = Number(qty);
  const r = Number(reorder);
  const low = q <= r;
  const pct = r === 0 ? 100 : Math.min(100, Math.round((q / (r * 2)) * 100));
  return (
    <div className="flex items-center gap-2 min-w-[100px]">
      <div className="flex-1 h-2 bg-muted/40 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            low ? "bg-destructive" : "bg-green-500"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span
        className={`text-xs font-medium tabular-nums ${low ? "text-destructive" : "text-green-400"}`}
      >
        {q}
      </span>
    </div>
  );
}

// ─── Indent Status badge ──────────────────────────────────────────────────────
function IndentStatusBadge({ status }: { status: string }) {
  const map: Record<
    string,
    { variant: "neutral" | "info" | "success" | "danger" | "warning" }
  > = {
    Pending: { variant: "warning" },
    Approved: { variant: "success" },
    Rejected: { variant: "danger" },
    Fulfilled: { variant: "info" },
  };
  const { variant } = map[status] ?? { variant: "neutral" as const };
  return <StatusBadge status={status} variant={variant} />;
}

// ─── Add Equipment Modal ──────────────────────────────────────────────────────
interface AddEquipmentModalProps {
  open: boolean;
  onClose: () => void;
  wardOptions: { id: WardId; name: string }[];
}

const EQUIPMENT_CATEGORIES = [
  "Monitor",
  "Ventilator",
  "Infusion Pump",
  "Defibrillator",
  "Wheelchair",
  "Other",
];

function AddEquipmentModal({
  open,
  onClose,
  wardOptions,
}: AddEquipmentModalProps) {
  const createEquipment = useCreateEquipmentItem();
  const [form, setForm] = useState({
    name: "",
    category: "Monitor",
    serialNumber: "",
    purchaseDate: "",
    cost: "",
    wardId: "",
    nextServiceDate: "",
  });

  const f = (k: keyof typeof form, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name || !form.serialNumber || !form.purchaseDate || !form.cost) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      await createEquipment.mutateAsync({
        name: form.name,
        category: form.category,
        serialNumber: form.serialNumber,
        purchaseDate: form.purchaseDate,
        cost: BigInt(Math.round(Number(form.cost) * 100)),
        wardId:
          form.wardId && form.wardId !== "none" ? BigInt(form.wardId) : null,
      });
      toast.success("Equipment added successfully");
      onClose();
      setForm({
        name: "",
        category: "Monitor",
        serialNumber: "",
        purchaseDate: "",
        cost: "",
        wardId: "",
        nextServiceDate: "",
      });
    } catch {
      toast.error("Failed to add equipment");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Equipment"
      description="Register a new medical equipment item"
      size="lg"
      footer={
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-ocid="equipment.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={createEquipment.isPending}
            data-ocid="equipment.submit_button"
          >
            {createEquipment.isPending ? "Adding..." : "Add Equipment"}
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5 sm:col-span-2">
          <Label>Equipment Name *</Label>
          <Input
            value={form.name}
            onChange={(e) => f("name", e.target.value)}
            placeholder="e.g. Cardiac Monitor"
            data-ocid="equipment.name_input"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Category *</Label>
          <Select value={form.category} onValueChange={(v) => f("category", v)}>
            <SelectTrigger data-ocid="equipment.category_select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {EQUIPMENT_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Serial Number *</Label>
          <Input
            value={form.serialNumber}
            onChange={(e) => f("serialNumber", e.target.value)}
            placeholder="SN-XXXX"
            data-ocid="equipment.serial_input"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Purchase Date *</Label>
          <Input
            type="date"
            value={form.purchaseDate}
            onChange={(e) => f("purchaseDate", e.target.value)}
            data-ocid="equipment.purchase_date_input"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Cost (₹) *</Label>
          <Input
            type="number"
            min="0"
            value={form.cost}
            onChange={(e) => f("cost", e.target.value)}
            placeholder="0.00"
            data-ocid="equipment.cost_input"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Ward Assignment</Label>
          <Select value={form.wardId} onValueChange={(v) => f("wardId", v)}>
            <SelectTrigger data-ocid="equipment.ward_select">
              <SelectValue placeholder="Select ward" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {wardOptions.map((w) => (
                <SelectItem key={String(w.id)} value={String(w.id)}>
                  {w.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Next Service Date</Label>
          <Input
            type="date"
            value={form.nextServiceDate}
            onChange={(e) => f("nextServiceDate", e.target.value)}
            data-ocid="equipment.service_date_input"
          />
        </div>
      </div>
    </Modal>
  );
}

// ─── Add Consumable Modal ─────────────────────────────────────────────────────
interface AddConsumableModalProps {
  open: boolean;
  onClose: () => void;
  suppliers: Supplier[];
}

function AddConsumableModal({
  open,
  onClose,
  suppliers,
}: AddConsumableModalProps) {
  const createConsumable = useCreateConsumable();
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    reorderLevel: "",
    unitCost: "",
    supplierId: "",
  });

  const f = (k: keyof typeof form, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name || !form.quantity || !form.reorderLevel || !form.unitCost) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      await createConsumable.mutateAsync({
        name: form.name,
        quantity: BigInt(form.quantity),
        reorderLevel: BigInt(form.reorderLevel),
        unitCost: BigInt(Math.round(Number(form.unitCost) * 100)),
        supplierId:
          form.supplierId && form.supplierId !== "none"
            ? BigInt(form.supplierId)
            : null,
      });
      toast.success("Consumable added successfully");
      onClose();
      setForm({
        name: "",
        quantity: "",
        reorderLevel: "",
        unitCost: "",
        supplierId: "",
      });
    } catch {
      toast.error("Failed to add consumable");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Consumable"
      description="Add a new consumable stock item"
      size="md"
      footer={
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-ocid="consumable.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={createConsumable.isPending}
            data-ocid="consumable.submit_button"
          >
            {createConsumable.isPending ? "Saving..." : "Add Consumable"}
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5 sm:col-span-2">
          <Label>Item Name *</Label>
          <Input
            value={form.name}
            onChange={(e) => f("name", e.target.value)}
            placeholder="e.g. Surgical Gloves (L)"
            data-ocid="consumable.name_input"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Quantity on Hand *</Label>
          <Input
            type="number"
            min="0"
            value={form.quantity}
            onChange={(e) => f("quantity", e.target.value)}
            placeholder="100"
            data-ocid="consumable.quantity_input"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Reorder Level *</Label>
          <Input
            type="number"
            min="0"
            value={form.reorderLevel}
            onChange={(e) => f("reorderLevel", e.target.value)}
            placeholder="20"
            data-ocid="consumable.reorder_input"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Unit Cost (₹) *</Label>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={form.unitCost}
            onChange={(e) => f("unitCost", e.target.value)}
            placeholder="0.00"
            data-ocid="consumable.cost_input"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Supplier</Label>
          <Select
            value={form.supplierId}
            onValueChange={(v) => f("supplierId", v)}
          >
            <SelectTrigger data-ocid="consumable.supplier_select">
              <SelectValue placeholder="Select supplier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {suppliers.map((s) => (
                <SelectItem key={String(s.id)} value={String(s.id)}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Modal>
  );
}

// ─── Add Vendor Modal ─────────────────────────────────────────────────────────
const SUPPLY_CATEGORIES = [
  "Pharmaceuticals",
  "Surgical Supplies",
  "Diagnostic Equipment",
  "Consumables",
  "Medical Gases",
  "Linen & Textiles",
  "IT Equipment",
];

interface AddVendorModalProps {
  open: boolean;
  onClose: () => void;
}

function AddVendorModal({ open, onClose }: AddVendorModalProps) {
  const createSupplier = useCreateSupplier();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    paymentTerms: "Net 30",
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const f = (k: keyof typeof form, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));
  const toggleCat = (cat: string) =>
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email) {
      toast.error("Name, phone and email are required");
      return;
    }
    try {
      await createSupplier.mutateAsync({
        name: form.name,
        phone: form.phone,
        email: form.email,
        address: form.address,
        categories: selectedCategories,
        paymentTerms: form.paymentTerms,
      });
      toast.success("Vendor added successfully");
      onClose();
      setForm({
        name: "",
        phone: "",
        email: "",
        address: "",
        paymentTerms: "Net 30",
      });
      setSelectedCategories([]);
    } catch {
      toast.error("Failed to add vendor");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Vendor"
      description="Register a new supplier / vendor"
      size="lg"
      footer={
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-ocid="vendor.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={createSupplier.isPending}
            data-ocid="vendor.submit_button"
          >
            {createSupplier.isPending ? "Saving..." : "Add Vendor"}
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5 sm:col-span-2">
          <Label>Vendor Name *</Label>
          <Input
            value={form.name}
            onChange={(e) => f("name", e.target.value)}
            placeholder="MedSupply Corp"
            data-ocid="vendor.name_input"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Phone *</Label>
          <Input
            value={form.phone}
            onChange={(e) => f("phone", e.target.value)}
            placeholder="+91 98765 43210"
            data-ocid="vendor.phone_input"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Email *</Label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => f("email", e.target.value)}
            placeholder="contact@vendor.com"
            data-ocid="vendor.email_input"
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label>Address</Label>
          <Input
            value={form.address}
            onChange={(e) => f("address", e.target.value)}
            placeholder="123 Supply Street, Mumbai"
            data-ocid="vendor.address_input"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Payment Terms</Label>
          <Select
            value={form.paymentTerms}
            onValueChange={(v) => f("paymentTerms", v)}
          >
            <SelectTrigger data-ocid="vendor.payment_terms_select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["Net 15", "Net 30", "Net 45", "Net 60", "COD", "Advance"].map(
                (t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label>Supply Categories</Label>
          <div className="flex flex-wrap gap-2 mt-1">
            {SUPPLY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCat(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  selectedCategories.includes(cat)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted/30 text-muted-foreground border-border hover:bg-muted/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

// ─── Create Requisition Modal ─────────────────────────────────────────────────
interface CreateRequisitionModalProps {
  open: boolean;
  onClose: () => void;
  userId: bigint;
}

interface RequisitionLine {
  itemName: string;
  quantity: string;
}

function CreateRequisitionModal({
  open,
  onClose,
  userId,
}: CreateRequisitionModalProps) {
  const createIndent = useCreateIndent();
  const [lines, setLines] = useState<RequisitionLine[]>([
    { itemName: "", quantity: "1" },
  ]);

  const addLine = () =>
    setLines((p) => [...p, { itemName: "", quantity: "1" }]);
  const removeLine = (idx: number) =>
    setLines((p) => p.filter((_, i) => i !== idx));
  const updateLine = (idx: number, k: keyof RequisitionLine, v: string) =>
    setLines((p) => p.map((l, i) => (i === idx ? { ...l, [k]: v } : l)));

  const handleSubmit = async () => {
    const validLines = lines.filter((l) => l.itemName.trim());
    if (validLines.length === 0) {
      toast.error("Add at least one item");
      return;
    }
    try {
      await createIndent.mutateAsync({
        requestedById: userId,
        items: validLines.map((l, i) => ({
          itemId: BigInt(i + 1),
          itemName: l.itemName.trim(),
          quantity: BigInt(Number(l.quantity) || 1),
        })),
      });
      toast.success("Requisition submitted for review");
      onClose();
      setLines([{ itemName: "", quantity: "1" }]);
    } catch {
      toast.error("Failed to create requisition");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create Indent Request"
      description="List items needed and submit for admin approval"
      size="lg"
      footer={
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-ocid="requisition.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={createIndent.isPending}
            data-ocid="requisition.submit_button"
          >
            {createIndent.isPending ? "Submitting..." : "Submit for Review"}
          </Button>
        </div>
      }
    >
      <div className="space-y-3">
        {lines.map((line, idx) => (
          <div
            key={`indent-line-${line.itemName || idx}`}
            className="flex items-center gap-2"
          >
            <Input
              placeholder="Item name e.g. Surgical Gloves (M)"
              value={line.itemName}
              onChange={(e) => updateLine(idx, "itemName", e.target.value)}
              className="flex-1"
              data-ocid={`requisition.item_name.${idx + 1}`}
            />
            <Input
              type="number"
              min="1"
              value={line.quantity}
              onChange={(e) => updateLine(idx, "quantity", e.target.value)}
              className="w-20"
              placeholder="Qty"
              data-ocid={`requisition.item_qty.${idx + 1}`}
            />
            {lines.length > 1 && (
              <button
                type="button"
                onClick={() => removeLine(idx)}
                className="p-1.5 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                aria-label="Remove item"
                data-ocid={`requisition.remove_item.${idx + 1}`}
              >
                <XCircle className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addLine}
          className="mt-1"
          data-ocid="requisition.add_item_button"
        >
          <Plus className="h-3.5 w-3.5 mr-1" /> Add Item
        </Button>
      </div>
    </Modal>
  );
}

// ─── Vendor Detail Panel ──────────────────────────────────────────────────────
function VendorDetailModal({
  vendor,
  open,
  onClose,
}: { vendor: Supplier | null; open: boolean; onClose: () => void }) {
  if (!vendor) return null;
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={vendor.name}
      description="Vendor details"
      size="md"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/20 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
            <p className="font-medium text-foreground text-sm">
              {vendor.phone}
            </p>
          </div>
          <div className="bg-muted/20 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-0.5">Email</p>
            <p className="font-medium text-foreground text-sm truncate">
              {vendor.email}
            </p>
          </div>
          <div className="bg-muted/20 rounded-lg p-3 col-span-2">
            <p className="text-xs text-muted-foreground mb-0.5">Address</p>
            <p className="font-medium text-foreground text-sm">
              {vendor.address || "—"}
            </p>
          </div>
          <div className="bg-muted/20 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-0.5">
              Payment Terms
            </p>
            <p className="font-medium text-foreground text-sm">
              {vendor.paymentTerms}
            </p>
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2">
            Supply Categories
          </p>
          <div className="flex flex-wrap gap-1.5">
            {vendor.categories.length === 0 ? (
              <span className="text-sm text-muted-foreground">
                None specified
              </span>
            ) : (
              vendor.categories.map((c) => (
                <span
                  key={c}
                  className="px-2.5 py-0.5 rounded-full text-xs bg-accent/15 text-accent border border-accent/30"
                >
                  {c}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

// ─── Equipment Tab ────────────────────────────────────────────────────────────
function EquipmentTab({ wards }: { wards: { id: WardId; name: string }[] }) {
  const { data: equipment, isLoading } = useEquipment();
  const [showAdd, setShowAdd] = useState(false);

  const wardMap = new Map(wards.map((w) => [String(w.id), w.name]));

  const columns: ColumnDef<EquipmentItem>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ getValue }) => (
        <span className="font-medium text-foreground">
          {String(getValue())}
        </span>
      ),
    },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "serialNumber", header: "Serial #" },
    { accessorKey: "purchaseDate", header: "Purchase Date" },
    {
      accessorKey: "cost",
      header: "Cost",
      cell: ({ getValue }) => (
        <span className="tabular-nums">
          ₹{(Number(getValue()) / 100).toLocaleString()}
        </span>
      ),
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => <EquipmentStatusBadge status={row.original.status} />,
    },
    {
      id: "ward",
      header: "Ward",
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.wardId
            ? (wardMap.get(String(row.original.wardId)) ?? "—")
            : "—"}
        </span>
      ),
    },
    {
      accessorKey: "nextServiceDate",
      header: "Next Service",
      cell: ({ getValue }) => {
        const v = getValue();
        return <span className="text-sm">{v ? String(v) : "—"}</span>;
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <button
          type="button"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded hover:bg-muted/30 transition-colors"
          aria-label="Maintenance log"
          onClick={() =>
            toast.info(`Maintenance log for ${row.original.name} — coming soon`)
          }
          data-ocid="equipment.maintenance_log_button"
        >
          <Wrench className="h-3.5 w-3.5" />
          Log
        </button>
      ),
    },
  ];

  return (
    <>
      <DataTable
        data={equipment ?? []}
        columns={columns}
        searchPlaceholder="Search equipment..."
        isLoading={isLoading}
        actions={
          <Button
            type="button"
            size="sm"
            onClick={() => setShowAdd(true)}
            data-ocid="equipment.add_button"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Equipment
          </Button>
        }
      />
      <AddEquipmentModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        wardOptions={wards}
      />
    </>
  );
}

// ─── Consumables Tab ──────────────────────────────────────────────────────────
function ConsumablesTab({ suppliers }: { suppliers: Supplier[] }) {
  const { data: consumables, isLoading } = useConsumables();
  const [showAdd, setShowAdd] = useState(false);

  const supplierMap = new Map(suppliers.map((s) => [String(s.id), s.name]));

  const columns: ColumnDef<Consumable>[] = [
    {
      accessorKey: "name",
      header: "Item Name",
      cell: ({ getValue }) => (
        <span className="font-medium text-foreground">
          {String(getValue())}
        </span>
      ),
    },
    {
      id: "stockLevel",
      header: "Stock Level",
      cell: ({ row }) => (
        <StockIndicator
          qty={row.original.quantity}
          reorder={row.original.reorderLevel}
        />
      ),
    },
    {
      accessorKey: "quantity",
      header: "Qty on Hand",
      cell: ({ row }) => {
        const low = row.original.quantity <= row.original.reorderLevel;
        return (
          <span
            className={`font-semibold tabular-nums ${low ? "text-destructive" : "text-foreground"}`}
          >
            {String(row.original.quantity)}
          </span>
        );
      },
    },
    {
      accessorKey: "reorderLevel",
      header: "Reorder Level",
      cell: ({ getValue }) => (
        <span className="tabular-nums">{String(getValue())}</span>
      ),
    },
    {
      accessorKey: "unitCost",
      header: "Unit Cost",
      cell: ({ getValue }) => (
        <span className="tabular-nums">
          ₹{(Number(getValue()) / 100).toFixed(2)}
        </span>
      ),
    },
    {
      id: "supplier",
      header: "Supplier",
      cell: ({ row }) => (
        <span>
          {row.original.supplierId
            ? (supplierMap.get(String(row.original.supplierId)) ?? "—")
            : "—"}
        </span>
      ),
    },
  ];

  return (
    <>
      <DataTable
        data={consumables ?? []}
        columns={columns}
        searchPlaceholder="Search consumables..."
        isLoading={isLoading}
        actions={
          <Button
            type="button"
            size="sm"
            onClick={() => setShowAdd(true)}
            data-ocid="consumables.add_button"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Consumable
          </Button>
        }
      />
      <AddConsumableModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        suppliers={suppliers}
      />
    </>
  );
}

// ─── Requisitions Tab ─────────────────────────────────────────────────────────
interface RequisitionsTabProps {
  userId: bigint;
  canApprove: boolean;
}

function RequisitionsTab({ userId, canApprove }: RequisitionsTabProps) {
  const { data: indents, isLoading } = useIndents();
  const updateStatus = useUpdateIndentStatus();
  const [showCreate, setShowCreate] = useState(false);

  const handleApprove = async (indent: IndentRequest) => {
    try {
      await updateStatus.mutateAsync({
        id: indent.id,
        status: IndentStatus.Approved,
      });
      toast.success("Requisition approved");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleReject = async (indent: IndentRequest) => {
    try {
      await updateStatus.mutateAsync({
        id: indent.id,
        status: IndentStatus.Rejected,
      });
      toast.success("Requisition rejected");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const columns: ColumnDef<IndentRequest>[] = [
    {
      id: "id",
      header: "Req #",
      cell: ({ row }) => (
        <span className="font-mono text-xs text-muted-foreground">
          #{String(row.original.id).padStart(4, "0")}
        </span>
      ),
    },
    {
      id: "requester",
      header: "Requested By",
      cell: ({ row }) => (
        <span className="text-sm">
          User #{String(row.original.requestedById)}
        </span>
      ),
    },
    {
      id: "items",
      header: "Items",
      cell: ({ row }) => (
        <span className="text-sm tabular-nums">
          {row.original.items.length} item
          {row.original.items.length !== 1 ? "s" : ""}
        </span>
      ),
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => (
        <IndentStatusBadge status={String(row.original.status)} />
      ),
    },
    {
      id: "createdAt",
      header: "Date",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {new Date(
            Number(row.original.createdAt) / 1_000_000,
          ).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const indent = row.original;
        const isPending = String(indent.status) === "Pending";
        if (!canApprove || !isPending) return null;
        return (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleApprove(indent)}
              className="flex items-center gap-1 text-xs text-green-400 hover:text-green-300 px-2 py-1 rounded hover:bg-green-500/10 transition-colors"
              aria-label="Approve requisition"
              data-ocid={`requisition.approve_button.${row.index + 1}`}
            >
              <CheckCircle className="h-3.5 w-3.5" /> Approve
            </button>
            <button
              type="button"
              onClick={() => handleReject(indent)}
              className="flex items-center gap-1 text-xs text-destructive hover:text-red-400 px-2 py-1 rounded hover:bg-destructive/10 transition-colors"
              aria-label="Reject requisition"
              data-ocid={`requisition.reject_button.${row.index + 1}`}
            >
              <XCircle className="h-3.5 w-3.5" /> Reject
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <DataTable
        data={indents ?? []}
        columns={columns}
        searchPlaceholder="Search requisitions..."
        isLoading={isLoading}
        actions={
          <Button
            type="button"
            size="sm"
            onClick={() => setShowCreate(true)}
            data-ocid="requisition.create_button"
          >
            <Plus className="h-4 w-4 mr-1" /> New Requisition
          </Button>
        }
      />
      <CreateRequisitionModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        userId={userId}
      />
    </>
  );
}

// ─── Vendors Tab ──────────────────────────────────────────────────────────────
function VendorsTab() {
  const { data: suppliers, isLoading } = useSuppliers();
  const [showAdd, setShowAdd] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Supplier | null>(null);

  const columns: ColumnDef<Supplier>[] = [
    {
      accessorKey: "name",
      header: "Vendor Name",
      cell: ({ row }) => (
        <button
          type="button"
          className="font-medium text-foreground hover:text-primary transition-colors text-left"
          onClick={() => setSelectedVendor(row.original)}
          data-ocid={`vendors.row.${row.index + 1}`}
        >
          {row.original.name}
        </button>
      ),
    },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "email", header: "Email" },
    {
      id: "categories",
      header: "Supply Categories",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.categories.slice(0, 2).map((c) => (
            <span
              key={c}
              className="text-xs px-1.5 py-0.5 rounded bg-muted/30 text-muted-foreground"
            >
              {c}
            </span>
          ))}
          {row.original.categories.length > 2 && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-muted/30 text-muted-foreground">
              +{row.original.categories.length - 2}
            </span>
          )}
        </div>
      ),
    },
    { accessorKey: "paymentTerms", header: "Payment Terms" },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setSelectedVendor(row.original)}
          data-ocid={`vendors.view_button.${row.index + 1}`}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <>
      <DataTable
        data={suppliers ?? []}
        columns={columns}
        searchPlaceholder="Search vendors..."
        isLoading={isLoading}
        actions={
          <Button
            type="button"
            size="sm"
            onClick={() => setShowAdd(true)}
            data-ocid="vendors.add_button"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Vendor
          </Button>
        }
      />
      <AddVendorModal open={showAdd} onClose={() => setShowAdd(false)} />
      <VendorDetailModal
        vendor={selectedVendor}
        open={!!selectedVendor}
        onClose={() => setSelectedVendor(null)}
      />
    </>
  );
}

// ─── Summary Card helper ──────────────────────────────────────────────────────
function SummaryCard<T>({
  icon,
  label,
  queryHook,
  color,
  filterFn,
}: {
  icon: React.ReactNode;
  label: string;
  queryHook: () => { data: T[] | undefined; isLoading?: boolean };
  color: string;
  filterFn?: (item: T) => boolean;
}) {
  const { data, isLoading } = queryHook();
  const count = filterFn
    ? (data ?? []).filter(filterFn).length
    : (data ?? []).length;
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
      <div className={`${color} bg-muted/20 p-2.5 rounded-lg shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground truncate">{label}</p>
        {isLoading ? (
          <div className="h-6 w-8 bg-muted/40 rounded animate-pulse mt-0.5" />
        ) : (
          <p className="text-2xl font-bold text-foreground tabular-nums">
            {count}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function InventoryPage() {
  const { user } = useAuth();
  const { data: wards } = useWards();
  const { data: suppliers } = useSuppliers();

  const wardOptions = (wards ?? []).map((w) => ({ id: w.id, name: w.name }));
  const canApprove =
    user?.role === "SuperAdmin" || user?.role === "Receptionist";
  const userId = user?.userId ?? BigInt(1);

  return (
    <div className="p-6 space-y-6" data-ocid="inventory.page">
      <PageHeader
        title="Inventory & Supplies"
        description="Medical equipment, consumables, indent requests and vendor management"
        breadcrumb={["HMS", "Inventory"]}
      />

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <SummaryCard
          icon={<Settings2 className="h-5 w-5" />}
          label="Equipment Items"
          queryHook={useEquipment}
          color="text-blue-400"
        />
        <SummaryCard
          icon={<Package className="h-5 w-5" />}
          label="Consumable Types"
          queryHook={useConsumables}
          color="text-teal-400"
        />
        <SummaryCard
          icon={<ClipboardList className="h-5 w-5" />}
          label="Open Requisitions"
          queryHook={useIndents}
          color="text-yellow-400"
          filterFn={(d: IndentRequest) => String(d.status) === "Pending"}
        />
        <SummaryCard
          icon={<Truck className="h-5 w-5" />}
          label="Vendors"
          queryHook={useSuppliers}
          color="text-purple-400"
        />
      </div>

      <Tabs defaultValue="equipment" className="space-y-4">
        <TabsList className="bg-muted/20 border border-border">
          <TabsTrigger
            value="equipment"
            className="gap-1.5"
            data-ocid="inventory.equipment_tab"
          >
            <Settings2 className="h-4 w-4" /> Equipment
          </TabsTrigger>
          <TabsTrigger
            value="consumables"
            className="gap-1.5"
            data-ocid="inventory.consumables_tab"
          >
            <Package className="h-4 w-4" /> Consumables
          </TabsTrigger>
          <TabsTrigger
            value="requisitions"
            className="gap-1.5"
            data-ocid="inventory.requisitions_tab"
          >
            <ClipboardList className="h-4 w-4" /> Requisitions
          </TabsTrigger>
          <TabsTrigger
            value="vendors"
            className="gap-1.5"
            data-ocid="inventory.vendors_tab"
          >
            <Building2 className="h-4 w-4" /> Vendors
          </TabsTrigger>
        </TabsList>

        <TabsContent value="equipment" className="mt-0">
          <EquipmentTab wards={wardOptions} />
        </TabsContent>

        <TabsContent value="consumables" className="mt-0">
          <ConsumablesTab suppliers={suppliers ?? []} />
        </TabsContent>

        <TabsContent value="requisitions" className="mt-0">
          <RequisitionsTab userId={userId} canApprove={canApprove} />
        </TabsContent>

        <TabsContent value="vendors" className="mt-0">
          <VendorsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
