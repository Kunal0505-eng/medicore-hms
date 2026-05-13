import type {
  Bill,
  BillItem,
  BillType,
  Patient,
  PaymentMode,
  Service,
} from "@/backend";
import {
  BillStatus,
  BillType as BillTypeEnum,
  PaymentMode as PaymentModeEnum,
} from "@/backend";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSkeleton, Skeleton } from "@/components/ui/LoadingSkeleton";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import {
  useBills,
  useCreateBill,
  useCreateService,
  useProcessPayment,
  useServices,
} from "@/services/billing";
import { usePatients } from "@/services/patients";
import type { ColumnDef } from "@tanstack/react-table";
import {
  AlertCircle,
  BarChart3,
  CheckCircle2,
  CreditCard,
  FileText,
  IndianRupee,
  Plus,
  Printer,
  Receipt,
  RefreshCcw,
  Settings,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

// ── helpers ──────────────────────────────────────────────────────────────────

const INR = (paise: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);

const DAY_MS = 86_400_000;
const today = () => new Date();

function daysAgo(n: number) {
  return new Date(today().getTime() - n * DAY_MS);
}

type BillStatusFilter = "All" | BillStatus;
const STATUS_FILTERS: BillStatusFilter[] = [
  "All",
  BillStatus.Pending,
  BillStatus.Paid,
  BillStatus.PartiallyPaid,
  BillStatus.Refunded,
];

const PAYMENT_COLORS: Record<string, string> = {
  Cash: "#22d3ee",
  Card: "#818cf8",
  UPI: "#34d399",
  Insurance: "#fb923c",
};

// ── types ─────────────────────────────────────────────────────────────────────

interface NewBillItem {
  serviceId: bigint;
  serviceName: string;
  unitPrice: bigint;
  quantity: number;
}

interface NewBillForm {
  patientId: string;
  billType: BillType;
  discount: number;
  items: NewBillItem[];
  paidAmount: number;
  paymentMode: PaymentMode | "";
  insuranceClaimId: string;
}

const emptyBillForm = (): NewBillForm => ({
  patientId: "",
  billType: BillTypeEnum.OPD,
  discount: 0,
  items: [],
  paidAmount: 0,
  paymentMode: "",
  insuranceClaimId: "",
});

interface ServiceForm {
  name: string;
  category: string;
  basePrice: number;
}

// ── sub-component: receipt print view ────────────────────────────────────────

function ReceiptView({
  bill,
  patient,
}: {
  bill: Bill;
  patient?: Patient;
}) {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const content = receiptRef.current?.innerHTML;
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

  return (
    <div>
      <div ref={receiptRef}>
        <div className="border-b border-border pb-4 mb-4">
          <h2 className="text-lg font-bold">Lal Bahadur Shastri Hospital</h2>
          <p className="text-xs text-muted-foreground">
            Hospital Road, New Delhi • +91 11 2345 6789
          </p>
        </div>
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-xs text-muted-foreground">Patient</p>
            <p className="font-semibold">
              {patient
                ? `${patient.firstName} ${patient.lastName}`
                : `#${bill.patientId}`}
            </p>
            {patient && (
              <p className="text-xs text-muted-foreground">{patient.phone}</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Receipt #</p>
            <p className="font-mono font-semibold">
              RCP-{String(bill.id).padStart(6, "0")}
            </p>
            <p className="text-xs text-muted-foreground">
              {new Date(Number(bill.createdAt) / 1_000_000).toLocaleDateString(
                "en-IN",
              )}
            </p>
          </div>
        </div>

        <table className="w-full mb-4 text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left pb-2 text-xs text-muted-foreground font-medium">
                Service
              </th>
              <th className="text-right pb-2 text-xs text-muted-foreground font-medium">
                Qty
              </th>
              <th className="text-right pb-2 text-xs text-muted-foreground font-medium">
                Unit Price
              </th>
              <th className="text-right pb-2 text-xs text-muted-foreground font-medium">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {bill.items.map((item, idx) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: receipt items are indexed
              <tr key={idx} className="border-b border-border/50">
                <td className="py-2">{item.serviceName}</td>
                <td className="py-2 text-right">{String(item.quantity)}</td>
                <td className="py-2 text-right">
                  {INR(Number(item.unitPrice))}
                </td>
                <td className="py-2 text-right font-medium">
                  {INR(Number(item.total))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="space-y-1 text-sm border-t border-border pt-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{INR(Number(bill.subtotal))}</span>
          </div>
          {Number(bill.discountPercent) > 0 && (
            <div className="flex justify-between text-green-500">
              <span>Discount ({String(bill.discountPercent)}%)</span>
              <span>
                -{INR(Number(bill.subtotal) - Number(bill.totalAmount))}
              </span>
            </div>
          )}
          <div className="flex justify-between font-bold text-base border-t border-border pt-2 mt-2">
            <span>Total</span>
            <span>{INR(Number(bill.totalAmount))}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Paid ({bill.paymentMode ?? "—"})</span>
            <span>{INR(Number(bill.paidAmount))}</span>
          </div>
          {balance > 0 && (
            <div className="flex justify-between font-semibold text-red-500">
              <span>Balance Due</span>
              <span>{INR(balance)}</span>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          Thank you for choosing Lal Bahadur Shastri Hospital.
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          type="button"
          onClick={handlePrint}
          data-ocid="billing.receipt.print_button"
        >
          <Printer className="h-4 w-4 mr-2" /> Print Receipt
        </Button>
      </div>
    </div>
  );
}

// ── sub-component: new bill modal ─────────────────────────────────────────────

function NewBillModal({
  open,
  onClose,
  patients,
  services,
}: {
  open: boolean;
  onClose: () => void;
  patients: Patient[];
  services: Service[];
}) {
  const createBill = useCreateBill();
  const [form, setForm] = useState<NewBillForm>(emptyBillForm());
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [qty, setQty] = useState(1);

  const subtotal = form.items.reduce(
    (s, it) => s + Number(it.unitPrice) * it.quantity,
    0,
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
          quantity: qty,
        },
      ],
    }));
    setSelectedServiceId("");
    setQty(1);
  };

  const removeItem = (idx: number) =>
    setForm((f) => ({ ...f, items: f.items.filter((_, i) => i !== idx) }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.patientId || form.items.length === 0) {
      toast.error("Select a patient and add at least one item");
      return;
    }
    try {
      const billItems: BillItem[] = form.items.map((it) => ({
        serviceId: it.serviceId,
        serviceName: it.serviceName,
        unitPrice: it.unitPrice,
        quantity: BigInt(it.quantity),
        total: it.unitPrice * BigInt(it.quantity),
      }));
      await createBill.mutateAsync({
        patientId: BigInt(form.patientId),
        visitId: null,
        billType: form.billType,
        items: billItems,
        discountPercent: BigInt(form.discount),
        paymentMode: form.paymentMode
          ? (form.paymentMode as PaymentMode)
          : null,
      });
      toast.success("Bill created successfully");
      setForm(emptyBillForm());
      onClose();
    } catch {
      toast.error("Failed to create bill");
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setForm(emptyBillForm());
        onClose();
      }}
      title="Create New Bill"
      description="Add services and process payment"
      size="xl"
      footer={
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setForm(emptyBillForm());
              onClose();
            }}
            data-ocid="billing.new_bill.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="new-bill-form"
            disabled={createBill.isPending}
            data-ocid="billing.new_bill.submit_button"
          >
            {createBill.isPending ? "Creating…" : "Create Bill"}
          </Button>
        </div>
      }
    >
      <form id="new-bill-form" onSubmit={handleSubmit} className="space-y-5">
        {/* Patient + Bill Type */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="nb-patient">Patient *</Label>
            <select
              id="nb-patient"
              value={form.patientId}
              onChange={(e) =>
                setForm((f) => ({ ...f, patientId: e.target.value }))
              }
              className="w-full h-9 rounded-md border border-input bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="billing.new_bill.patient_select"
            >
              <option value="">Select patient…</option>
              {patients.map((p) => (
                <option key={String(p.id)} value={String(p.id)}>
                  {p.firstName} {p.lastName} ({p.mrn})
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="nb-type">Bill Type</Label>
            <select
              id="nb-type"
              value={form.billType}
              onChange={(e) =>
                setForm((f) => ({ ...f, billType: e.target.value as BillType }))
              }
              className="w-full h-9 rounded-md border border-input bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="billing.new_bill.type_select"
            >
              <option value={BillTypeEnum.OPD}>OPD — Outpatient</option>
              <option value={BillTypeEnum.IPD}>IPD — Inpatient</option>
            </select>
          </div>
        </div>

        {/* Add services */}
        <div className="bg-muted/20 rounded-lg p-4 space-y-3">
          <p className="text-sm font-medium text-foreground">Line Items</p>
          <div className="flex gap-2">
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="flex-1 h-9 rounded-md border border-input bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="billing.new_bill.service_select"
            >
              <option value="">Choose service…</option>
              {services
                .filter((s) => s.isActive)
                .map((s) => (
                  <option key={String(s.id)} value={String(s.id)}>
                    {s.name} — {INR(Number(s.basePrice))}
                  </option>
                ))}
            </select>
            <Input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-20"
              data-ocid="billing.new_bill.qty_input"
            />
            <Button
              type="button"
              variant="secondary"
              onClick={addItem}
              disabled={!selectedServiceId}
              data-ocid="billing.new_bill.add_item_button"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {form.items.length === 0 ? (
            <p className="text-xs text-muted-foreground py-2">
              No items added yet.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left pb-1 text-xs text-muted-foreground font-medium">
                    Service
                  </th>
                  <th className="text-right pb-1 text-xs text-muted-foreground font-medium">
                    Qty
                  </th>
                  <th className="text-right pb-1 text-xs text-muted-foreground font-medium">
                    Unit
                  </th>
                  <th className="text-right pb-1 text-xs text-muted-foreground font-medium">
                    Total
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {form.items.map((it, idx) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: bill items use index
                  <tr key={idx} className="border-b border-border/40">
                    <td className="py-1.5">{it.serviceName}</td>
                    <td className="py-1.5 text-right">{it.quantity}</td>
                    <td className="py-1.5 text-right">
                      {INR(Number(it.unitPrice))}
                    </td>
                    <td className="py-1.5 text-right font-medium">
                      {INR(Number(it.unitPrice) * it.quantity)}
                    </td>
                    <td className="py-1.5 pl-2">
                      <button
                        type="button"
                        onClick={() => removeItem(idx)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove item"
                        data-ocid={`billing.new_bill.remove_item_button.${idx + 1}`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Discount + Totals */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="nb-discount">Discount (%)</Label>
            <Input
              id="nb-discount"
              type="number"
              min="0"
              max="100"
              value={form.discount}
              onChange={(e) =>
                setForm((f) => ({ ...f, discount: Number(e.target.value) }))
              }
              data-ocid="billing.new_bill.discount_input"
            />
          </div>
          <div className="bg-muted/20 rounded-lg p-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{INR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-green-500">
              <span>Discount</span>
              <span>-{INR(discountAmt)}</span>
            </div>
            <div className="flex justify-between font-bold border-t border-border pt-1 mt-1">
              <span>Total</span>
              <span>{INR(totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="border border-border rounded-lg p-4 space-y-3">
          <p className="text-sm font-semibold flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-accent" /> Payment
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="nb-paid">Amount Paid (₹)</Label>
              <Input
                id="nb-paid"
                type="number"
                min="0"
                value={form.paidAmount}
                onChange={(e) =>
                  setForm((f) => ({ ...f, paidAmount: Number(e.target.value) }))
                }
                data-ocid="billing.new_bill.paid_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="nb-mode">Payment Mode</Label>
              <select
                id="nb-mode"
                value={form.paymentMode}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    paymentMode: e.target.value as PaymentMode | "",
                  }))
                }
                className="w-full h-9 rounded-md border border-input bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="billing.new_bill.payment_mode_select"
              >
                <option value="">Select mode…</option>
                {Object.values(PaymentModeEnum).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {form.paymentMode === PaymentModeEnum.Insurance && (
            <div className="space-y-1.5">
              <Label htmlFor="nb-claim">Insurance Claim #</Label>
              <Input
                id="nb-claim"
                placeholder="CLM-2024-XXXXX"
                value={form.insuranceClaimId}
                onChange={(e) =>
                  setForm((f) => ({ ...f, insuranceClaimId: e.target.value }))
                }
                data-ocid="billing.new_bill.insurance_claim_input"
              />
            </div>
          )}
          {totalAmount > 0 && (
            <div
              className={`text-sm font-medium flex justify-between pt-1 ${balanceDue > 0 ? "text-red-400" : "text-green-400"}`}
            >
              <span>Balance Due</span>
              <span>{INR(Math.max(0, balanceDue))}</span>
            </div>
          )}
        </div>
      </form>
    </Modal>
  );
}

// ── sub-component: process payment modal ──────────────────────────────────────

function ProcessPaymentModal({
  bill,
  onClose,
}: {
  bill: Bill | null;
  onClose: () => void;
}) {
  const processPayment = useProcessPayment();
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState<PaymentMode>(PaymentModeEnum.Cash);

  if (!bill) return null;

  const balanceDue = Number(bill.totalAmount) - Number(bill.paidAmount);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const paise = Math.round(Number(amount) * 100);
    if (paise <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    try {
      await processPayment.mutateAsync({
        id: bill.id,
        paidAmount: BigInt(paise),
        paymentMode: mode,
      });
      toast.success("Payment recorded");
      onClose();
    } catch {
      toast.error("Payment failed");
    }
  };

  return (
    <Modal
      open={!!bill}
      onClose={onClose}
      title="Process Payment"
      description={`Bill #${bill.id}`}
      size="sm"
      footer={
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-ocid="billing.payment.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="process-payment-form"
            disabled={processPayment.isPending}
            data-ocid="billing.payment.submit_button"
          >
            {processPayment.isPending ? "Processing…" : "Record Payment"}
          </Button>
        </div>
      }
    >
      <form
        id="process-payment-form"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="bg-muted/30 rounded-lg p-3 text-sm space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Amount</span>
            <span className="font-medium">{INR(Number(bill.totalAmount))}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Already Paid</span>
            <span className="text-green-400">
              {INR(Number(bill.paidAmount))}
            </span>
          </div>
          <div className="flex justify-between font-bold text-red-400 border-t border-border pt-1 mt-1">
            <span>Balance Due</span>
            <span>{INR(balanceDue)}</span>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pay-amount">Amount to Pay (₹)</Label>
          <Input
            id="pay-amount"
            type="number"
            min="1"
            max={String(balanceDue / 100)}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={String(balanceDue / 100)}
            data-ocid="billing.payment.amount_input"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pay-mode">Payment Mode</Label>
          <select
            id="pay-mode"
            value={mode}
            onChange={(e) => setMode(e.target.value as PaymentMode)}
            className="w-full h-9 rounded-md border border-input bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            data-ocid="billing.payment.mode_select"
          >
            {Object.values(PaymentModeEnum).map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </form>
    </Modal>
  );
}

// ── sub-component: add service modal ──────────────────────────────────────────

function AddServiceModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const createService = useCreateService();
  const [form, setForm] = useState<ServiceForm>({
    name: "",
    category: "",
    basePrice: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.category || form.basePrice <= 0) {
      toast.error("All fields are required");
      return;
    }
    try {
      await createService.mutateAsync({
        name: form.name,
        category: form.category,
        basePrice: BigInt(Math.round(form.basePrice * 100)),
      });
      toast.success("Service added");
      setForm({ name: "", category: "", basePrice: 0 });
      onClose();
    } catch {
      toast.error("Failed to add service");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Service"
      description="Define a billable service and its price"
      size="sm"
      footer={
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-ocid="billing.service.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="add-service-form"
            disabled={createService.isPending}
            data-ocid="billing.service.submit_button"
          >
            {createService.isPending ? "Saving…" : "Save Service"}
          </Button>
        </div>
      }
    >
      <form id="add-service-form" onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="svc-name">Service Name *</Label>
          <Input
            id="svc-name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Consultation – General"
            data-ocid="billing.service.name_input"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="svc-cat">Category *</Label>
          <select
            id="svc-cat"
            value={form.category}
            onChange={(e) =>
              setForm((f) => ({ ...f, category: e.target.value }))
            }
            className="w-full h-9 rounded-md border border-input bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            data-ocid="billing.service.category_select"
          >
            <option value="">Select category…</option>
            {[
              "Consultation",
              "Procedure",
              "Laboratory",
              "Pharmacy",
              "Radiology",
              "Nursing",
              "Room Charges",
              "Other",
            ].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="svc-price">Base Price (₹) *</Label>
          <Input
            id="svc-price"
            type="number"
            min="1"
            value={form.basePrice}
            onChange={(e) =>
              setForm((f) => ({ ...f, basePrice: Number(e.target.value) }))
            }
            data-ocid="billing.service.price_input"
          />
        </div>
      </form>
    </Modal>
  );
}

// ── sub-component: bill detail panel ─────────────────────────────────────────

function BillDetailPanel({
  bill,
  patient,
  onPayment,
  onClose,
}: {
  bill: Bill;
  patient?: Patient;
  onPayment: (bill: Bill) => void;
  onClose: () => void;
}) {
  const [showReceipt, setShowReceipt] = useState(false);
  const balance = Number(bill.totalAmount) - Number(bill.paidAmount);
  const isInsurance = bill.paymentMode === PaymentModeEnum.Insurance;

  return (
    <div
      className="bg-card border border-border rounded-xl overflow-hidden"
      data-ocid="billing.detail.panel"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-muted/20">
        <div>
          <p className="text-xs text-muted-foreground">
            Bill #{String(bill.id).padStart(5, "0")}
          </p>
          <p className="font-semibold">
            {patient
              ? `${patient.firstName} ${patient.lastName}`
              : `Patient #${bill.patientId}`}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close panel"
          data-ocid="billing.detail.close_button"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-5 space-y-4">
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={bill.status} />
          <StatusBadge status={bill.billType} />
          {bill.paymentMode && <StatusBadge status={bill.paymentMode} />}
        </div>

        {/* Items */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Line Items
          </p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left pb-1.5 text-xs text-muted-foreground font-medium">
                  Service
                </th>
                <th className="text-right pb-1.5 text-xs text-muted-foreground font-medium">
                  Qty
                </th>
                <th className="text-right pb-1.5 text-xs text-muted-foreground font-medium">
                  Unit
                </th>
                <th className="text-right pb-1.5 text-xs text-muted-foreground font-medium">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {bill.items.map((item, idx) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: bill detail items indexed
                <tr key={idx} className="border-b border-border/30">
                  <td className="py-1.5">{item.serviceName}</td>
                  <td className="py-1.5 text-right text-muted-foreground">
                    {String(item.quantity)}
                  </td>
                  <td className="py-1.5 text-right text-muted-foreground">
                    {INR(Number(item.unitPrice))}
                  </td>
                  <td className="py-1.5 text-right font-medium">
                    {INR(Number(item.total))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="bg-muted/20 rounded-lg p-3 space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{INR(Number(bill.subtotal))}</span>
          </div>
          {Number(bill.discountPercent) > 0 && (
            <div className="flex justify-between text-green-400">
              <span>Discount ({String(bill.discountPercent)}%)</span>
              <span>
                -{INR(Number(bill.subtotal) - Number(bill.totalAmount))}
              </span>
            </div>
          )}
          <div className="flex justify-between font-bold border-t border-border pt-1.5">
            <span>Total</span>
            <span>{INR(Number(bill.totalAmount))}</span>
          </div>
          <div className="flex justify-between text-green-400">
            <span>Paid</span>
            <span>{INR(Number(bill.paidAmount))}</span>
          </div>
          {balance > 0 && (
            <div className="flex justify-between font-semibold text-red-400">
              <span>Balance Due</span>
              <span>{INR(balance)}</span>
            </div>
          )}
        </div>

        {/* Insurance */}
        {isInsurance && (
          <div className="border border-border rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Insurance Claim
              </p>
              <StatusBadge
                status={bill.insuranceClaimId ? "Submitted" : "Not Submitted"}
                variant={bill.insuranceClaimId ? "info" : "neutral"}
              />
            </div>
            {bill.insuranceClaimId && (
              <p className="text-sm font-mono text-foreground">
                {bill.insuranceClaimId}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          {balance > 0 && bill.status !== BillStatus.Refunded && (
            <Button
              size="sm"
              onClick={() => onPayment(bill)}
              data-ocid="billing.detail.payment_button"
            >
              <Wallet className="h-4 w-4 mr-1.5" /> Collect Payment
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowReceipt(true)}
            data-ocid="billing.detail.receipt_button"
          >
            <Receipt className="h-4 w-4 mr-1.5" /> View Receipt
          </Button>
        </div>
      </div>

      {showReceipt && (
        <Modal
          open={showReceipt}
          onClose={() => setShowReceipt(false)}
          title="Receipt Preview"
          size="md"
        >
          <ReceiptView bill={bill} patient={patient} />
        </Modal>
      )}
    </div>
  );
}

// ── sub-component: financial dashboard ──────────────────────────────────────

function FinancialDashboard({ bills }: { bills: Bill[] }) {
  const todayStart = today().setHours(0, 0, 0, 0);
  const monthStart = new Date(
    today().getFullYear(),
    today().getMonth(),
    1,
  ).getTime();

  const todayRevenue = bills
    .filter((b) => Number(b.createdAt) / 1_000_000 >= todayStart)
    .reduce((s, b) => s + Number(b.paidAmount), 0);

  const monthRevenue = bills
    .filter((b) => Number(b.createdAt) / 1_000_000 >= monthStart)
    .reduce((s, b) => s + Number(b.paidAmount), 0);

  const pendingCollections = bills
    .filter(
      (b) =>
        b.status === BillStatus.Pending ||
        b.status === BillStatus.PartiallyPaid,
    )
    .reduce((s, b) => s + (Number(b.totalAmount) - Number(b.paidAmount)), 0);

  const kpiCards = [
    {
      label: "Today's Revenue",
      value: INR(todayRevenue),
      icon: IndianRupee,
      color: "text-accent",
    },
    {
      label: "Month Revenue",
      value: INR(monthRevenue),
      icon: TrendingUp,
      color: "text-green-400",
    },
    {
      label: "Pending Collections",
      value: INR(pendingCollections),
      icon: AlertCircle,
      color: "text-yellow-400",
    },
    {
      label: "Total Bills",
      value: String(bills.length),
      icon: FileText,
      color: "text-foreground",
    },
  ];

  // Daily revenue last 30 days
  const dailyData = useMemo(() => {
    const map = new Map<string, number>();
    for (let i = 29; i >= 0; i--) {
      const d = daysAgo(i);
      map.set(d.toISOString().slice(0, 10), 0);
    }
    for (const b of bills) {
      const d = new Date(Number(b.createdAt) / 1_000_000)
        .toISOString()
        .slice(0, 10);
      if (map.has(d))
        map.set(d, (map.get(d) ?? 0) + Number(b.paidAmount) / 100);
    }
    return Array.from(map.entries()).map(([date, revenue]) => ({
      date: date.slice(5), // MM-DD
      revenue,
    }));
  }, [bills]);

  // Revenue by payment mode
  const modeData = useMemo(() => {
    const map: Record<string, number> = {};
    for (const b of bills) {
      if (!b.paymentMode) continue;
      const modeKey = String(b.paymentMode);
      map[modeKey] = (map[modeKey] ?? 0) + Number(b.paidAmount) / 100;
    }
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [bills]);

  // Monthly trend last 6 months
  const monthlyData = useMemo(() => {
    const months: { month: string; revenue: number; bills: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today().getFullYear(), today().getMonth() - i, 1);
      const monthStr = d.toLocaleString("en-IN", {
        month: "short",
        year: "2-digit",
      });
      const start = d.getTime();
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 1).getTime();
      const monthBills = bills.filter((b) => {
        const t = Number(b.createdAt) / 1_000_000;
        return t >= start && t < end;
      });
      months.push({
        month: monthStr,
        revenue: monthBills.reduce((s, b) => s + Number(b.paidAmount) / 100, 0),
        bills: monthBills.length,
      });
    }
    return months;
  }, [bills]);

  const chartTooltipStyle = {
    backgroundColor: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    borderRadius: 8,
    fontSize: 12,
  };

  return (
    <div className="space-y-6" data-ocid="billing.dashboard.section">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-card border border-border rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">
                {label}
              </p>
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <p className={`text-2xl font-bold tabular-nums ${color}`}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Revenue Bar Chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
          <p className="text-sm font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-accent" /> Daily Revenue — Last
            30 Days
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={dailyData}
              margin={{ top: 4, right: 8, left: 0, bottom: 4 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
                interval={4}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v: number) => `₹${v}`}
              />
              <Tooltip
                contentStyle={chartTooltipStyle}
                formatter={(v: number) => [
                  `₹${v.toLocaleString("en-IN")}`,
                  "Revenue",
                ]}
              />
              <Bar
                dataKey="revenue"
                fill="hsl(var(--accent))"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Mode Pie */}
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-sm font-semibold mb-4 flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-accent" /> By Payment Mode
          </p>
          {modeData.length === 0 ? (
            <div className="flex items-center justify-center h-[220px] text-muted-foreground text-sm">
              No payment data
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={modeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {modeData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={PAYMENT_COLORS[entry.name] ?? "#6b7280"}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={chartTooltipStyle}
                  formatter={(v: number) => [
                    `₹${v.toLocaleString("en-IN")}`,
                    "Amount",
                  ]}
                />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Monthly Trend Line */}
      <div className="bg-card border border-border rounded-xl p-5">
        <p className="text-sm font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-accent" /> Monthly Revenue Trend
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={monthlyData}
            margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => `₹${v}`}
            />
            <Tooltip
              contentStyle={chartTooltipStyle}
              formatter={(v: number) => [
                `₹${v.toLocaleString("en-IN")}`,
                "Revenue",
              ]}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--accent))"
              strokeWidth={2.5}
              dot={{ fill: "hsl(var(--accent))", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── main page ─────────────────────────────────────────────────────────────────

type TabKey = "bills" | "services" | "dashboard";

export function BillingPage() {
  const { user } = useAuth();
  const { data: bills, isLoading: billsLoading } = useBills();
  const { data: patients } = usePatients();
  const { data: services, isLoading: servicesLoading } = useServices();

  const [activeTab, setActiveTab] = useState<TabKey>("bills");
  const [statusFilter, setStatusFilter] = useState<BillStatusFilter>("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [patientSearch, setPatientSearch] = useState("");

  const [showNewBill, setShowNewBill] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [paymentBill, setPaymentBill] = useState<Bill | null>(null);
  const [showAddService, setShowAddService] = useState(false);

  const canCreateBill =
    user?.role === "SuperAdmin" || user?.role === "Receptionist";

  const getPatientName = useCallback(
    (id: bigint) => {
      const p = patients?.find((p) => p.id === id);
      return p ? `${p.firstName} ${p.lastName}` : `#${id}`;
    },
    [patients],
  );

  // Filter bills
  const filteredBills = useMemo(() => {
    return (bills ?? []).filter((b) => {
      if (statusFilter !== "All" && b.status !== statusFilter) return false;
      const ts = Number(b.createdAt) / 1_000_000;
      if (dateFrom && ts < new Date(dateFrom).getTime()) return false;
      if (dateTo && ts > new Date(dateTo).getTime() + DAY_MS) return false;
      if (patientSearch) {
        const name = getPatientName(b.patientId).toLowerCase();
        if (!name.includes(patientSearch.toLowerCase())) return false;
      }
      return true;
    });
  }, [bills, statusFilter, dateFrom, dateTo, patientSearch, getPatientName]);

  // Bills DataTable columns
  const billColumns: ColumnDef<Bill>[] = [
    {
      id: "billId",
      header: "Bill #",
      accessorFn: (r) => `BILL-${String(r.id).padStart(5, "0")}`,
      cell: ({ getValue }) => (
        <span className="font-mono text-xs text-muted-foreground">
          {String(getValue())}
        </span>
      ),
    },
    {
      id: "patient",
      header: "Patient",
      accessorFn: (r) => getPatientName(r.patientId),
      cell: ({ getValue }) => (
        <span className="font-medium">{String(getValue())}</span>
      ),
    },
    {
      accessorKey: "billType",
      header: "Type",
      cell: ({ getValue }) => <StatusBadge status={String(getValue())} />,
    },
    {
      accessorKey: "totalAmount",
      header: "Total",
      cell: ({ getValue }) => (
        <span className="tabular-nums font-semibold">
          {INR(Number(getValue() as bigint))}
        </span>
      ),
    },
    {
      accessorKey: "paidAmount",
      header: "Paid",
      cell: ({ getValue }) => (
        <span className="tabular-nums text-green-400">
          {INR(Number(getValue() as bigint))}
        </span>
      ),
    },
    {
      id: "balance",
      header: "Balance",
      accessorFn: (r) => Number(r.totalAmount) - Number(r.paidAmount),
      cell: ({ getValue }) => {
        const bal = Number(getValue());
        return (
          <span
            className={`tabular-nums font-medium ${bal > 0 ? "text-red-400" : "text-muted-foreground"}`}
          >
            {INR(Math.max(0, bal))}
          </span>
        );
      },
    },
    {
      accessorKey: "paymentMode",
      header: "Mode",
      cell: ({ getValue }) =>
        getValue() ? (
          <StatusBadge status={String(getValue())} />
        ) : (
          <span className="text-muted-foreground text-xs">—</span>
        ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => <StatusBadge status={String(getValue())} />,
    },
    {
      id: "date",
      header: "Date",
      accessorFn: (r) =>
        new Date(Number(r.createdAt) / 1_000_000).toLocaleDateString("en-IN"),
      cell: ({ getValue }) => (
        <span className="text-xs text-muted-foreground">
          {String(getValue())}
        </span>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setSelectedBill(row.original)}
            data-ocid={`billing.bills.view_button.${row.index + 1}`}
          >
            View
          </Button>
          {Number(row.original.totalAmount) - Number(row.original.paidAmount) >
            0 &&
            row.original.status !== BillStatus.Refunded && (
              <Button
                size="sm"
                variant="ghost"
                className="text-accent"
                onClick={() => setPaymentBill(row.original)}
                data-ocid={`billing.bills.pay_button.${row.index + 1}`}
              >
                <CreditCard className="h-3.5 w-3.5" />
              </Button>
            )}
        </div>
      ),
    },
  ];

  // Services DataTable columns
  const serviceColumns: ColumnDef<Service>[] = [
    {
      accessorKey: "name",
      header: "Service Name",
      cell: ({ getValue }) => (
        <span className="font-medium">{String(getValue())}</span>
      ),
    },
    { accessorKey: "category", header: "Category" },
    {
      accessorKey: "basePrice",
      header: "Price",
      cell: ({ getValue }) => (
        <span className="tabular-nums font-semibold">
          {INR(Number(getValue() as bigint))}
        </span>
      ),
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ getValue }) => (
        <StatusBadge status={getValue() ? "Active" : "Inactive"} />
      ),
    },
  ];

  const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
    { key: "bills", label: "Bills", icon: Receipt },
    { key: "services", label: "Services", icon: Settings },
    { key: "dashboard", label: "Financial Dashboard", icon: BarChart3 },
  ];

  return (
    <div data-ocid="billing.page">
      <PageHeader
        title="Billing & Finance"
        description="OPD/IPD bill generation, payments, insurance, and financial overview"
        breadcrumb={["Finance", "Billing"]}
        actions={
          canCreateBill ? (
            <Button
              onClick={() => setShowNewBill(true)}
              data-ocid="billing.new_bill.open_modal_button"
            >
              <Plus className="h-4 w-4 mr-2" /> New Bill
            </Button>
          ) : undefined
        }
      />

      {/* Tabs */}
      <div
        className="flex gap-1 mb-6 border-b border-border"
        data-ocid="billing.tabs"
      >
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            data-ocid={`billing.${tab.key}.tab`}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab.key
                ? "border-accent text-accent"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* BILLS TAB */}
      {activeTab === "bills" && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex flex-wrap gap-3 items-center">
              {/* Status filter pills */}
              <div className="flex gap-1.5">
                {STATUS_FILTERS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatusFilter(s)}
                    data-ocid={`billing.filter.${s.toLowerCase()}_tab`}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      statusFilter === s
                        ? "bg-accent text-card"
                        : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <Input
                  placeholder="Search patient…"
                  value={patientSearch}
                  onChange={(e) => setPatientSearch(e.target.value)}
                  className="w-44"
                  data-ocid="billing.filter.patient_search_input"
                />
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-36"
                  data-ocid="billing.filter.date_from_input"
                />
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-36"
                  data-ocid="billing.filter.date_to_input"
                />
                {(patientSearch ||
                  dateFrom ||
                  dateTo ||
                  statusFilter !== "All") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setPatientSearch("");
                      setDateFrom("");
                      setDateTo("");
                      setStatusFilter("All");
                    }}
                    data-ocid="billing.filter.clear_button"
                  >
                    <RefreshCcw className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Bills table or detail split */}
          <div
            className={
              selectedBill ? "grid grid-cols-1 lg:grid-cols-3 gap-4" : ""
            }
          >
            <div className={selectedBill ? "lg:col-span-2" : ""}>
              <div className="bg-card border border-border rounded-xl p-4">
                {billsLoading ? (
                  <LoadingSkeleton rows={6} cols={7} />
                ) : filteredBills.length === 0 ? (
                  <EmptyState
                    icon={<Receipt className="h-8 w-8" />}
                    title="No bills found"
                    description={
                      statusFilter !== "All"
                        ? `No ${statusFilter} bills match your filters.`
                        : "No bills have been created yet."
                    }
                    action={
                      canCreateBill
                        ? {
                            label: "Create First Bill",
                            onClick: () => setShowNewBill(true),
                          }
                        : undefined
                    }
                  />
                ) : (
                  <DataTable
                    data={filteredBills}
                    columns={billColumns as ColumnDef<Bill>[]}
                    searchPlaceholder="Search bills…"
                    isLoading={false}
                  />
                )}
              </div>
            </div>

            {/* Bill detail panel */}
            {selectedBill && (
              <BillDetailPanel
                bill={selectedBill}
                patient={patients?.find((p) => p.id === selectedBill.patientId)}
                onPayment={(b) => {
                  setPaymentBill(b);
                }}
                onClose={() => setSelectedBill(null)}
              />
            )}
          </div>
        </div>
      )}

      {/* SERVICES TAB */}
      {activeTab === "services" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            {canCreateBill && (
              <Button
                onClick={() => setShowAddService(true)}
                data-ocid="billing.services.add_button"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Service
              </Button>
            )}
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            {servicesLoading ? (
              <LoadingSkeleton rows={5} cols={4} />
            ) : !services || services.length === 0 ? (
              <EmptyState
                icon={<Settings className="h-8 w-8" />}
                title="No services configured"
                description="Add billable services to start generating bills."
                action={
                  canCreateBill
                    ? {
                        label: "Add Service",
                        onClick: () => setShowAddService(true),
                      }
                    : undefined
                }
              />
            ) : (
              <DataTable
                data={services}
                columns={serviceColumns as ColumnDef<Service>[]}
                searchPlaceholder="Search services…"
                isLoading={false}
              />
            )}
          </div>
        </div>
      )}

      {/* DASHBOARD TAB */}
      {activeTab === "dashboard" &&
        (billsLoading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {["kpi-1", "kpi-2", "kpi-3", "kpi-4"].map((k) => (
                <div
                  key={k}
                  className="bg-card border border-border rounded-xl p-4"
                >
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-8 w-32" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
                <Skeleton className="h-48 w-full" />
              </div>
              <div className="bg-card border border-border rounded-xl p-5">
                <Skeleton className="h-48 w-full" />
              </div>
            </div>
          </div>
        ) : (
          <FinancialDashboard bills={bills ?? []} />
        ))}

      {/* Modals */}
      <NewBillModal
        open={showNewBill}
        onClose={() => setShowNewBill(false)}
        patients={patients ?? []}
        services={services ?? []}
      />

      <ProcessPaymentModal
        bill={paymentBill}
        onClose={() => setPaymentBill(null)}
      />

      <AddServiceModal
        open={showAddService}
        onClose={() => setShowAddService(false)}
      />

      {/* Stats summary bar */}
      <div className="mt-6 flex flex-wrap gap-4">
        {[
          {
            label: "Total Billed",
            value: INR(
              bills?.reduce((s, b) => s + Number(b.totalAmount), 0) ?? 0,
            ),
            icon: IndianRupee,
            color: "text-foreground",
          },
          {
            label: "Total Collected",
            value: INR(
              bills?.reduce((s, b) => s + Number(b.paidAmount), 0) ?? 0,
            ),
            icon: CheckCircle2,
            color: "text-green-400",
          },
          {
            label: "Insurance Claims",
            value: String(
              bills?.filter((b) => b.paymentMode === PaymentModeEnum.Insurance)
                .length ?? 0,
            ),
            icon: FileText,
            color: "text-orange-400",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-muted/20 border border-border rounded-lg px-4 py-2 flex items-center gap-3"
          >
            <Icon className={`h-5 w-5 ${color}`} />
            <div>
              <p className={`text-base font-bold tabular-nums ${color}`}>
                {value}
              </p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
