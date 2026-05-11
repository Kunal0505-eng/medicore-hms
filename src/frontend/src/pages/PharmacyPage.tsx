import type { Drug, POItem, PurchaseOrder, Visit } from "@/backend";
import { PrescriptionStatus, UserRole } from "@/backend";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { useVisits } from "@/services/emr";
import { usePatients } from "@/services/patients";
import {
  useCreateDrug,
  useCreatePurchaseOrder,
  useDispensePrescription,
  useDrugs,
  useLowStockDrugs,
  usePurchaseOrders,
  useUpdateDrugStock,
} from "@/services/pharmacy";
import type { ColumnDef } from "@tanstack/react-table";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Package,
  Pill,
  Plus,
  RefreshCw,
  ShieldAlert,
  ShoppingCart,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Helpers ────────────────────────────────────────────────────────────────

const TODAY = new Date();
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

function isExpiringSoon(expiryDate: string): boolean {
  const d = new Date(expiryDate);
  return d.getTime() - TODAY.getTime() <= THIRTY_DAYS && d > TODAY;
}

function isExpired(expiryDate: string): boolean {
  return new Date(expiryDate) <= TODAY;
}

interface PrescriptionRow {
  rowKey: string;
  visit: Visit;
  drugName: string;
  dose: string;
  dosageForm: string;
  frequency: string;
  duration: string;
  notes: string;
  status: PrescriptionStatus;
  prescriptionIndex: number;
}

// ─── Dispense Modal ──────────────────────────────────────────────────────────

interface DispenseModalProps {
  open: boolean;
  onClose: () => void;
  row: PrescriptionRow | null;
  getPatientName: (id: bigint) => string;
  getDoctorName: (id: bigint) => string;
  drugs: Drug[];
}

function DispenseModal({
  open,
  onClose,
  row,
  getPatientName,
  getDoctorName,
  drugs,
}: DispenseModalProps) {
  const dispense = useDispensePrescription();
  const [batchNo, setBatchNo] = useState("");
  const [qty, setQty] = useState("1");
  const [dispNotes, setDispNotes] = useState("");

  const matchedDrug = drugs.find(
    (d) =>
      d.name.toLowerCase() === row?.drugName.toLowerCase() ||
      d.genericName.toLowerCase() === row?.drugName.toLowerCase(),
  );

  const handleDispense = async () => {
    if (!row) return;
    try {
      await dispense.mutateAsync({
        visitId: row.visit.id,
        drugName: row.drugName,
      });
      toast.success(`Dispensed ${row.drugName} successfully`);
      onClose();
    } catch {
      toast.error("Failed to dispense prescription");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Dispense Prescription"
      description="Confirm dispensing details before marking as dispensed"
      size="md"
      footer={
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-ocid="dispense.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleDispense}
            disabled={dispense.isPending}
            className="bg-primary"
            data-ocid="dispense.confirm_button"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            {dispense.isPending ? "Dispensing..." : "Confirm Dispense"}
          </Button>
        </div>
      }
    >
      {row && (
        <div className="space-y-5">
          {/* Drug summary */}
          <div className="bg-muted/30 rounded-lg p-4 space-y-2 border border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Patient</span>
              <span className="font-medium text-sm">
                {getPatientName(row.visit.patientId)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Prescribed by
              </span>
              <span className="text-sm">
                {getDoctorName(row.visit.doctorId)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Drug</span>
              <span className="font-semibold text-accent">{row.drugName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Dose / Frequency
              </span>
              <span className="text-sm">
                {row.dose} · {row.frequency}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Duration</span>
              <span className="text-sm">{row.duration}</span>
            </div>
          </div>

          {/* Stock info */}
          {matchedDrug && (
            <div className="flex items-center gap-2 text-sm">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Stock on hand:</span>
              <span
                className={
                  Number(matchedDrug.quantityOnHand) <=
                  Number(matchedDrug.reorderLevel)
                    ? "text-destructive font-bold"
                    : "font-medium"
                }
              >
                {String(matchedDrug.quantityOnHand)} units
              </span>
              {Number(matchedDrug.quantityOnHand) <=
                Number(matchedDrug.reorderLevel) && (
                <Badge variant="destructive" className="text-xs">
                  Low Stock
                </Badge>
              )}
            </div>
          )}

          {/* Dispense fields */}
          <div className="space-y-4">
            <div className="space-y-1">
              <Label>Batch Number</Label>
              <Input
                value={batchNo}
                onChange={(e) => setBatchNo(e.target.value)}
                placeholder={matchedDrug?.batchNo || "Enter batch number"}
                data-ocid="dispense.batch_input"
              />
            </div>
            <div className="space-y-1">
              <Label>Quantity to Dispense</Label>
              <Input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                data-ocid="dispense.qty_input"
              />
            </div>
            <div className="space-y-1">
              <Label>Notes (optional)</Label>
              <Input
                value={dispNotes}
                onChange={(e) => setDispNotes(e.target.value)}
                placeholder="e.g. Take with food"
                data-ocid="dispense.notes_input"
              />
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

// ─── Add Drug Modal ──────────────────────────────────────────────────────────

const DOSAGE_FORMS = [
  "Tablet",
  "Capsule",
  "Syrup",
  "Injection",
  "Cream",
  "Drops",
  "Powder",
  "Inhaler",
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
  "Other",
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
  supplier: "",
};

interface AddDrugModalProps {
  open: boolean;
  onClose: () => void;
}

function AddDrugModal({ open, onClose }: AddDrugModalProps) {
  const createDrug = useCreateDrug();
  const [form, setForm] = useState({ ...EMPTY_DRUG_FORM });

  const set =
    (k: keyof typeof EMPTY_DRUG_FORM) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
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
        supplierId: null,
      });
      toast.success(`${form.name} added to inventory`);
      setForm({ ...EMPTY_DRUG_FORM });
      onClose();
    } catch {
      toast.error("Failed to add drug");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Drug to Inventory"
      description="Enter complete drug information including pricing and stock levels"
      size="lg"
      footer={
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-ocid="add_drug.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="add-drug-form"
            disabled={createDrug.isPending}
            data-ocid="add_drug.submit_button"
          >
            <Plus className="h-4 w-4 mr-2" />
            {createDrug.isPending ? "Adding..." : "Add Drug"}
          </Button>
        </div>
      }
    >
      <form
        id="add-drug-form"
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4"
      >
        <div className="space-y-1">
          <Label>Drug Name *</Label>
          <Input
            value={form.name}
            onChange={set("name")}
            required
            placeholder="e.g. Amoxicillin"
            data-ocid="add_drug.name_input"
          />
        </div>
        <div className="space-y-1">
          <Label>Generic Name *</Label>
          <Input
            value={form.genericName}
            onChange={set("genericName")}
            required
            placeholder="e.g. Amoxicillin"
            data-ocid="add_drug.generic_input"
          />
        </div>
        <div className="space-y-1">
          <Label>Dosage Form</Label>
          <select
            value={form.dosageForm}
            onChange={set("dosageForm")}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            data-ocid="add_drug.form_select"
          >
            {DOSAGE_FORMS.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <Label>Strength</Label>
          <Input
            value={form.strength}
            onChange={set("strength")}
            placeholder="e.g. 500mg"
            data-ocid="add_drug.strength_input"
          />
        </div>
        <div className="space-y-1">
          <Label>Category</Label>
          <select
            value={form.category}
            onChange={set("category")}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            data-ocid="add_drug.category_select"
          >
            {DRUG_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <Label>Batch Number</Label>
          <Input
            value={form.batchNo}
            onChange={set("batchNo")}
            placeholder="e.g. BT-2024-001"
            data-ocid="add_drug.batch_input"
          />
        </div>
        <div className="space-y-1">
          <Label>Quantity on Hand</Label>
          <Input
            type="number"
            min="0"
            value={form.quantityOnHand}
            onChange={set("quantityOnHand")}
            data-ocid="add_drug.qty_input"
          />
        </div>
        <div className="space-y-1">
          <Label>Reorder Level</Label>
          <Input
            type="number"
            min="0"
            value={form.reorderLevel}
            onChange={set("reorderLevel")}
            data-ocid="add_drug.reorder_input"
          />
        </div>
        <div className="space-y-1">
          <Label>Expiry Date *</Label>
          <Input
            type="date"
            value={form.expiryDate}
            onChange={set("expiryDate")}
            required
            data-ocid="add_drug.expiry_input"
          />
        </div>
        <div className="space-y-1">
          <Label>Supplier (name)</Label>
          <Input
            value={form.supplier}
            onChange={set("supplier")}
            placeholder="e.g. MedSupplies Ltd"
            data-ocid="add_drug.supplier_input"
          />
        </div>
        <div className="space-y-1">
          <Label>Cost Price (₹)</Label>
          <Input
            type="number"
            min="0"
            value={form.costPrice}
            onChange={set("costPrice")}
            data-ocid="add_drug.cost_input"
          />
        </div>
        <div className="space-y-1">
          <Label>Selling Price (₹)</Label>
          <Input
            type="number"
            min="0"
            value={form.sellingPrice}
            onChange={set("sellingPrice")}
            data-ocid="add_drug.sell_input"
          />
        </div>
      </form>
    </Modal>
  );
}

// ─── Update Stock Modal ──────────────────────────────────────────────────────

type StockReason = "Purchase" | "Dispense" | "Adjustment";

interface UpdateStockModalProps {
  open: boolean;
  onClose: () => void;
  drug: Drug | null;
}

function UpdateStockModal({ open, onClose, drug }: UpdateStockModalProps) {
  const updateStock = useUpdateDrugStock();
  const [qty, setQty] = useState("0");
  const [reason, setReason] = useState<StockReason>("Purchase");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!drug) return;
    const change = reason === "Dispense" ? -BigInt(qty) : BigInt(qty);
    try {
      await updateStock.mutateAsync({
        drugId: drug.id,
        quantityChange: change,
      });
      toast.success(`Stock updated for ${drug.name}`);
      setQty("0");
      onClose();
    } catch {
      toast.error("Failed to update stock");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Update Stock"
      description={drug ? `Adjust stock for ${drug.name}` : ""}
      size="sm"
      footer={
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-ocid="stock.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="stock-form"
            disabled={updateStock.isPending}
            data-ocid="stock.submit_button"
          >
            {updateStock.isPending ? "Updating..." : "Update Stock"}
          </Button>
        </div>
      }
    >
      {drug && (
        <form id="stock-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-muted/30 rounded-lg p-3 border border-border">
            <p className="text-xs text-muted-foreground">Current Stock</p>
            <p className="text-2xl font-bold text-foreground">
              {String(drug.quantityOnHand)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Reorder level: {String(drug.reorderLevel)}
            </p>
          </div>
          <div className="space-y-1">
            <Label>Reason</Label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value as StockReason)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              data-ocid="stock.reason_select"
            >
              <option value="Purchase">Purchase (add stock)</option>
              <option value="Dispense">Dispense (subtract stock)</option>
              <option value="Adjustment">Manual Adjustment (add)</option>
            </select>
          </div>
          <div className="space-y-1">
            <Label>Quantity</Label>
            <Input
              type="number"
              min="0"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              data-ocid="stock.qty_input"
            />
          </div>
        </form>
      )}
    </Modal>
  );
}

// ─── Drug Interaction Stub ───────────────────────────────────────────────────

function DrugInteractionModal({
  open,
  onClose,
}: { open: boolean; onClose: () => void }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Drug Interaction Check"
      size="sm"
    >
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <div className="h-14 w-14 rounded-full bg-yellow-500/15 flex items-center justify-center">
          <ShieldAlert className="h-7 w-7 text-yellow-400" />
        </div>
        <p className="text-foreground font-medium">
          Interaction Check Not Available
        </p>
        <p className="text-sm text-muted-foreground max-w-xs">
          Interaction check not yet integrated — verify manually using clinical
          pharmacology references before dispensing.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          data-ocid="interaction.close_button"
        >
          Close
        </Button>
      </div>
    </Modal>
  );
}

// ─── Create PO Modal ─────────────────────────────────────────────────────────

interface CreatePOModalProps {
  open: boolean;
  onClose: () => void;
  drugs: Drug[];
}

function CreatePOModal({ open, onClose, drugs }: CreatePOModalProps) {
  const createPO = useCreatePurchaseOrder();
  const [supplier, setSupplier] = useState("");
  const [delivery, setDelivery] = useState("");
  const [items, setItems] = useState<
    { drugId: string; qty: string; unitCost: string }[]
  >([{ drugId: "", qty: "1", unitCost: "0" }]);

  const addItem = () =>
    setItems((prev) => [...prev, { drugId: "", qty: "1", unitCost: "0" }]);
  const removeItem = (i: number) =>
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  const updateItem = (i: number, k: "drugId" | "qty" | "unitCost", v: string) =>
    setItems((prev) =>
      prev.map((item, idx) => (idx === i ? { ...item, [k]: v } : item)),
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validItems: POItem[] = items
      .filter((it) => it.drugId)
      .map((it) => ({
        drugId: BigInt(it.drugId),
        quantity: BigInt(it.qty || "1"),
        unitCost: BigInt(it.unitCost || "0"),
      }));
    if (validItems.length === 0) {
      toast.error("Add at least one drug item");
      return;
    }
    try {
      await createPO.mutateAsync({
        supplierId: BigInt(1),
        items: validItems,
        expectedDelivery: delivery || null,
      });
      toast.success("Purchase order created");
      setSupplier("");
      setDelivery("");
      setItems([{ drugId: "", qty: "1", unitCost: "0" }]);
      onClose();
    } catch {
      toast.error("Failed to create purchase order");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create Purchase Order"
      size="lg"
      footer={
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-ocid="po.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="po-form"
            disabled={createPO.isPending}
            data-ocid="po.submit_button"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {createPO.isPending ? "Creating..." : "Create PO"}
          </Button>
        </div>
      }
    >
      <form id="po-form" onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label>Supplier Name</Label>
            <Input
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              placeholder="e.g. MedSupplies Ltd"
              data-ocid="po.supplier_input"
            />
          </div>
          <div className="space-y-1">
            <Label>Expected Delivery</Label>
            <Input
              type="date"
              value={delivery}
              onChange={(e) => setDelivery(e.target.value)}
              data-ocid="po.delivery_input"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Order Items</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addItem}
              data-ocid="po.add_item_button"
            >
              <Plus className="h-3 w-3 mr-1" /> Add Item
            </Button>
          </div>
          {items.map((item, i) => (
            <div
              key={`po-item-${item.drugId?.toString() ?? i}`}
              className="grid grid-cols-[1fr_80px_90px_32px] gap-2 items-end"
            >
              <div className="space-y-1">
                {i === 0 && (
                  <Label className="text-xs text-muted-foreground">Drug</Label>
                )}
                <select
                  value={item.drugId}
                  onChange={(e) => updateItem(i, "drugId", e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  data-ocid={`po.drug_select.${i + 1}`}
                >
                  <option value="">Select drug...</option>
                  {drugs.map((d) => (
                    <option key={String(d.id)} value={String(d.id)}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                {i === 0 && (
                  <Label className="text-xs text-muted-foreground">Qty</Label>
                )}
                <Input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) => updateItem(i, "qty", e.target.value)}
                  data-ocid={`po.qty_input.${i + 1}`}
                />
              </div>
              <div className="space-y-1">
                {i === 0 && (
                  <Label className="text-xs text-muted-foreground">
                    Unit Cost
                  </Label>
                )}
                <Input
                  type="number"
                  min="0"
                  value={item.unitCost}
                  onChange={(e) => updateItem(i, "unitCost", e.target.value)}
                  data-ocid={`po.cost_input.${i + 1}`}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeItem(i)}
                disabled={items.length === 1}
                className="text-destructive hover:text-destructive px-2"
                data-ocid={`po.remove_item.${i + 1}`}
              >
                ×
              </Button>
            </div>
          ))}
        </div>
      </form>
    </Modal>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export function PharmacyPage() {
  const { user } = useAuth();
  const { data: drugs = [], isLoading: drugsLoading } = useDrugs();
  const { data: lowStock = [] } = useLowStockDrugs();
  const { data: purchaseOrders = [], isLoading: poLoading } =
    usePurchaseOrders();
  const { data: visits = [], isLoading: visitsLoading } = useVisits();
  const { data: patients = [] } = usePatients();

  // Modals state
  const [addDrugOpen, setAddDrugOpen] = useState(false);
  const [stockModal, setStockModal] = useState<Drug | null>(null);
  const [dispenseRow, setDispenseRow] = useState<PrescriptionRow | null>(null);
  const [interactionOpen, setInteractionOpen] = useState(false);
  const [createPOOpen, setCreatePOOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("prescriptions");
  const [lowStockFilter, setLowStockFilter] = useState(false);

  const isPharmacist =
    user?.role === UserRole.Pharmacist || user?.role === UserRole.SuperAdmin;

  // Build prescription rows from all visits
  const prescriptionRows = useMemo<PrescriptionRow[]>(() => {
    const rows: PrescriptionRow[] = [];
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
          prescriptionIndex: idx,
        });
      });
    }
    return rows;
  }, [visits]);

  const pendingRx = prescriptionRows.filter(
    (r) => r.status === PrescriptionStatus.Pending,
  );
  const dispensedRx = prescriptionRows.filter(
    (r) => r.status === PrescriptionStatus.Dispensed,
  );

  // Expiry alerts
  const expiringDrugs = drugs.filter((d) => isExpiringSoon(d.expiryDate));
  const expiredDrugs = drugs.filter((d) => isExpired(d.expiryDate));

  const getPatientName = (id: bigint) => {
    const p = patients.find((p) => p.id === id);
    return p ? `${p.firstName} ${p.lastName}` : `Patient #${id}`;
  };

  // Mock doctor name from visit doctorId
  const getDoctorName = (id: bigint) => `Dr. Staff #${id}`;

  // Drug inventory with row highlighting
  const filteredDrugs = lowStockFilter ? lowStock : drugs;

  const drugColumns: ColumnDef<Drug>[] = [
    {
      accessorKey: "name",
      header: "Drug Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Pill className="h-3.5 w-3.5 text-accent shrink-0" />
          <span className="font-medium text-foreground">
            {row.original.name}
          </span>
        </div>
      ),
    },
    { accessorKey: "genericName", header: "Generic" },
    { accessorKey: "dosageForm", header: "Form" },
    { accessorKey: "strength", header: "Strength" },
    {
      id: "qty",
      header: "Qty on Hand",
      accessorFn: (r) => Number(r.quantityOnHand),
      cell: ({ row }) => (
        <span
          className={
            Number(row.original.quantityOnHand) <=
            Number(row.original.reorderLevel)
              ? "font-bold text-destructive"
              : "font-medium"
          }
        >
          {String(row.original.quantityOnHand)}
        </span>
      ),
    },
    {
      id: "reorder",
      header: "Reorder Lvl",
      accessorFn: (r) => Number(r.reorderLevel),
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">
          {String(row.original.reorderLevel)}
        </span>
      ),
    },
    {
      accessorKey: "expiryDate",
      header: "Expiry",
      cell: ({ row }) => (
        <span
          className={
            isExpired(row.original.expiryDate)
              ? "text-destructive font-medium"
              : isExpiringSoon(row.original.expiryDate)
                ? "text-yellow-400 font-medium"
                : ""
          }
        >
          {row.original.expiryDate}
        </span>
      ),
    },
    {
      id: "cost",
      header: "Cost/Sell (₹)",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {String(row.original.costPrice)} / {String(row.original.sellingPrice)}
        </span>
      ),
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        const d = row.original;
        if (!d.isActive) return <StatusBadge status="Inactive" />;
        if (isExpired(d.expiryDate))
          return <StatusBadge status="Expired" variant="danger" />;
        if (isExpiringSoon(d.expiryDate))
          return <StatusBadge status="Expiring Soon" variant="warning" />;
        if (Number(d.quantityOnHand) <= Number(d.reorderLevel))
          return <StatusBadge status="Low Stock" variant="warning" />;
        return <StatusBadge status="In Stock" variant="success" />;
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) =>
        isPharmacist ? (
          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setStockModal(row.original)}
              data-ocid={`inventory.update_button.${row.index + 1}`}
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1" /> Update
            </Button>
          </div>
        ) : null,
    },
  ];

  const rxColumns: ColumnDef<PrescriptionRow>[] = [
    {
      id: "patient",
      header: "Patient",
      accessorFn: (r) => getPatientName(r.visit.patientId),
      cell: ({ getValue }) => (
        <span className="font-medium text-foreground">
          {String(getValue())}
        </span>
      ),
    },
    { accessorKey: "drugName", header: "Drug" },
    {
      id: "doseFreq",
      header: "Dose / Frequency",
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.dose} · {row.original.frequency}
        </span>
      ),
    },
    { accessorKey: "duration", header: "Duration" },
    {
      id: "doctor",
      header: "Prescribed By",
      accessorFn: (r) => getDoctorName(r.visit.doctorId),
      cell: ({ getValue }) => (
        <span className="text-sm text-muted-foreground">
          {String(getValue())}
        </span>
      ),
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) =>
        row.original.status === PrescriptionStatus.Dispensed ? (
          <Badge className="bg-green-500/15 text-green-400 border border-green-500/30 text-xs">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Dispensed
          </Badge>
        ) : (
          <StatusBadge status="Pending" variant="warning" />
        ),
    },
    {
      id: "action",
      header: "",
      cell: ({ row }) =>
        row.original.status === PrescriptionStatus.Pending && isPharmacist ? (
          <Button
            type="button"
            size="sm"
            onClick={() => setDispenseRow(row.original)}
            data-ocid={`rx.dispense_button.${row.index + 1}`}
          >
            <Zap className="h-3.5 w-3.5 mr-1" /> Dispense
          </Button>
        ) : null,
    },
  ];

  const poColumns: ColumnDef<PurchaseOrder>[] = [
    {
      id: "poNo",
      header: "PO Number",
      accessorFn: (r) => `PO-${String(r.id).padStart(4, "0")}`,
      cell: ({ getValue }) => (
        <span className="font-mono font-medium text-accent">
          {String(getValue())}
        </span>
      ),
    },
    {
      id: "supplier",
      header: "Supplier",
      accessorFn: (r) => `Supplier #${r.supplierId}`,
      cell: ({ getValue }) => (
        <span className="text-sm">{String(getValue())}</span>
      ),
    },
    {
      id: "items",
      header: "Items",
      accessorFn: (r) => r.items.length,
      cell: ({ getValue }) => (
        <Badge variant="outline" className="text-xs">
          {String(getValue())} items
        </Badge>
      ),
    },
    {
      id: "total",
      header: "Total (₹)",
      accessorFn: (r) =>
        r.items.reduce(
          (s, it) => s + Number(it.quantity) * Number(it.unitCost),
          0,
        ),
      cell: ({ getValue }) => (
        <span className="font-medium">
          ₹{Number(getValue()).toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "expectedDelivery",
      header: "Expected Delivery",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.expectedDelivery ?? "—"}
        </span>
      ),
    },
  ];

  return (
    <div data-ocid="pharmacy.page">
      <PageHeader
        title="Pharmacy"
        description="Prescription dispensing, drug inventory, and purchase orders"
        breadcrumb={["Pharmacy"]}
        actions={
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setInteractionOpen(true)}
              data-ocid="pharmacy.interaction_button"
            >
              <ShieldAlert className="h-4 w-4 mr-2" />
              Check Interactions
            </Button>
            {isPharmacist && (
              <Button
                type="button"
                onClick={() => setAddDrugOpen(true)}
                data-ocid="pharmacy.add_drug_button"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Drug
              </Button>
            )}
          </div>
        }
      />

      {/* Alert banners */}
      <div className="space-y-2 mb-6">
        {lowStock.length > 0 && (
          <button
            type="button"
            onClick={() => {
              setLowStockFilter(true);
              setActiveTab("inventory");
            }}
            className="w-full text-left p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-center gap-3 hover:bg-yellow-500/15 transition-colors"
            data-ocid="pharmacy.low_stock_banner"
          >
            <AlertTriangle className="h-5 w-5 text-yellow-400 shrink-0" />
            <p className="text-sm text-yellow-400 font-medium">
              ⚠️ {lowStock.length} drug{lowStock.length !== 1 ? "s" : ""} below
              reorder level — click to filter
            </p>
          </button>
        )}
        {expiringDrugs.length > 0 && (
          <div
            className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg flex items-center gap-3"
            data-ocid="pharmacy.expiry_banner"
          >
            <AlertCircle className="h-5 w-5 text-orange-400 shrink-0" />
            <p className="text-sm text-orange-400 font-medium">
              🕐 {expiringDrugs.length} drug
              {expiringDrugs.length !== 1 ? "s" : ""} expiring within 30 days
              {expiredDrugs.length > 0 &&
                ` · ${expiredDrugs.length} already expired`}
            </p>
          </div>
        )}
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(v) => {
          setActiveTab(v);
          if (v !== "inventory") setLowStockFilter(false);
        }}
      >
        <TabsList className="mb-6">
          <TabsTrigger
            value="prescriptions"
            data-ocid="pharmacy.prescriptions.tab"
          >
            <ClipboardList className="h-4 w-4 mr-2" />
            Prescriptions
            {pendingRx.length > 0 && (
              <Badge className="ml-2 bg-primary/20 text-primary border-primary/30 text-xs px-1.5 py-0">
                {pendingRx.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="inventory" data-ocid="pharmacy.inventory.tab">
            <Pill className="h-4 w-4 mr-2" />
            Drug Inventory
            {lowStock.length > 0 && (
              <Badge className="ml-2 bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs px-1.5 py-0">
                {lowStock.length} low
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="orders" data-ocid="pharmacy.orders.tab">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Purchase Orders
          </TabsTrigger>
        </TabsList>

        {/* Prescriptions Tab */}
        <TabsContent value="prescriptions">
          <div className="bg-card border border-border rounded-xl p-6">
            {/* Pending Prescriptions */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-yellow-400" />
                Pending Dispensing
              </h3>
              {pendingRx.length === 0 && !visitsLoading ? (
                <EmptyState
                  icon={<ClipboardList className="h-8 w-8" />}
                  title="No pending prescriptions"
                  description="All prescriptions have been dispensed."
                />
              ) : (
                <DataTable
                  data={pendingRx}
                  columns={rxColumns}
                  searchPlaceholder="Search prescriptions..."
                  isLoading={visitsLoading}
                />
              )}
            </div>

            {/* Dispensed */}
            {dispensedRx.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                  Recently Dispensed
                </h3>
                <DataTable
                  data={dispensedRx}
                  columns={rxColumns}
                  searchPlaceholder="Search dispensed..."
                />
              </div>
            )}
          </div>
        </TabsContent>

        {/* Inventory Tab */}
        <TabsContent value="inventory">
          <div className="bg-card border border-border rounded-xl p-6">
            {lowStockFilter && (
              <div className="flex items-center justify-between mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <span className="text-sm text-yellow-400 font-medium">
                  Showing low-stock items only
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setLowStockFilter(false)}
                  data-ocid="pharmacy.clear_filter_button"
                >
                  Clear filter
                </Button>
              </div>
            )}
            {filteredDrugs.length === 0 && !drugsLoading ? (
              <EmptyState
                icon={<Pill className="h-8 w-8" />}
                title="No drugs in inventory"
                description={
                  lowStockFilter
                    ? "No low-stock items found."
                    : "Add drugs to get started."
                }
                action={{
                  label: "Add Drug",
                  onClick: () => setAddDrugOpen(true),
                }}
              />
            ) : (
              <DataTable
                data={filteredDrugs}
                columns={drugColumns}
                searchPlaceholder="Search drug inventory..."
                isLoading={drugsLoading}
              />
            )}
          </div>
        </TabsContent>

        {/* Purchase Orders Tab */}
        <TabsContent value="orders">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex justify-end mb-4">
              {isPharmacist && (
                <Button
                  type="button"
                  onClick={() => setCreatePOOpen(true)}
                  data-ocid="pharmacy.create_po_button"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Purchase Order
                </Button>
              )}
            </div>
            {purchaseOrders.length === 0 && !poLoading ? (
              <EmptyState
                icon={<ShoppingCart className="h-8 w-8" />}
                title="No purchase orders"
                description="Create a purchase order to restock your inventory."
                action={{
                  label: "Create PO",
                  onClick: () => setCreatePOOpen(true),
                }}
              />
            ) : (
              <DataTable
                data={purchaseOrders}
                columns={poColumns}
                searchPlaceholder="Search purchase orders..."
                isLoading={poLoading}
              />
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <AddDrugModal open={addDrugOpen} onClose={() => setAddDrugOpen(false)} />
      <UpdateStockModal
        open={!!stockModal}
        onClose={() => setStockModal(null)}
        drug={stockModal}
      />
      <DispenseModal
        open={!!dispenseRow}
        onClose={() => setDispenseRow(null)}
        row={dispenseRow}
        getPatientName={getPatientName}
        getDoctorName={getDoctorName}
        drugs={drugs}
      />
      <DrugInteractionModal
        open={interactionOpen}
        onClose={() => setInteractionOpen(false)}
      />
      <CreatePOModal
        open={createPOOpen}
        onClose={() => setCreatePOOpen(false)}
        drugs={drugs}
      />
    </div>
  );
}
