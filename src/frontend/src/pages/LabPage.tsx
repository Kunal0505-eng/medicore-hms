import { LabStatus, UserRole } from "@/backend";
import type { LabOrder } from "@/backend";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import {
  useCreateLabOrder,
  useLabOrders,
  useUpdateLabResult,
  useUpdateLabStatus,
} from "@/services/lab";
import { usePatients } from "@/services/patients";
import { useDoctors } from "@/services/staff";
import type { ColumnDef } from "@tanstack/react-table";
import {
  AlertTriangle,
  CheckCircle,
  ClipboardList,
  Eye,
  FlaskConical,
  Plus,
  TestTube,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const TEST_OPTIONS = [
  { name: "Blood Group", type: "Hematology", refRange: "A/B/AB/O" },
  {
    name: "Complete Blood Count (CBC)",
    type: "Hematology",
    refRange: "RBC: 4.5–5.5, WBC: 4–11 K/uL",
  },
  {
    name: "Thyroid Profile (T3/T4/TSH)",
    type: "Biochemistry",
    refRange: "TSH: 0.4–4.0 mIU/L",
  },
  {
    name: "Lipid Panel",
    type: "Biochemistry",
    refRange: "Total Chol: <200, LDL: <130 mg/dL",
  },
  {
    name: "Kidney Function Test (KFT)",
    type: "Biochemistry",
    refRange: "Creatinine: 0.6–1.2 mg/dL",
  },
  {
    name: "Liver Function Test (LFT)",
    type: "Biochemistry",
    refRange: "ALT: 7–56, AST: 10–40 U/L",
  },
  { name: "X-ray Chest", type: "Radiology", refRange: "N/A" },
  { name: "Ultrasound Abdomen", type: "Radiology", refRange: "N/A" },
  { name: "ECG", type: "Cardiology", refRange: "HR: 60–100 bpm" },
  { name: "CT Head", type: "Radiology", refRange: "N/A" },
] as const;

const STATUS_BADGE_MAP: Record<
  string,
  {
    label: string;
    variant: "neutral" | "info" | "warning" | "success" | "danger";
  }
> = {
  [LabStatus.Ordered]: { label: "Ordered", variant: "neutral" },
  [LabStatus.SampleCollected]: { label: "Sample Collected", variant: "info" },
  [LabStatus.Processing]: { label: "Processing", variant: "warning" },
  [LabStatus.ResultReady]: { label: "Result Ready", variant: "success" },
  [LabStatus.Reported]: { label: "Reported", variant: "success" },
};

function LabStatusBadge({ status }: { status: string }) {
  const mapped = STATUS_BADGE_MAP[status];
  if (!mapped) return <StatusBadge status={status} />;
  return <StatusBadge status={mapped.label} variant={mapped.variant} />;
}

function CriticalBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse">
      <AlertTriangle className="h-3 w-3" />
      CRITICAL
    </span>
  );
}

function formatDate(ts: bigint | undefined): string {
  if (!ts) return "—";
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(ts: bigint | undefined): string {
  if (!ts) return "—";
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

type ResultFormState = {
  resultValue: string;
  referenceRange: string;
  isCritical: boolean;
  notes: string;
  resultFile: string;
};

type OrderFormState = {
  patientId: string;
  patientSearch: string;
  doctorId: string;
  testName: string;
  testType: string;
  notes: string;
};

type ViewOrder = LabOrder & { patientName: string; doctorName: string };

export function LabPage() {
  const { user } = useAuth();
  const { data: orders, isLoading } = useLabOrders();
  const { data: patients } = usePatients();
  const { data: doctors } = useDoctors();
  const createOrder = useCreateLabOrder();
  const updateResult = useUpdateLabResult();
  const updateStatus = useUpdateLabStatus();

  const [showForm, setShowForm] = useState(false);
  const [resultModal, setResultModal] = useState<LabOrder | null>(null);
  const [viewModal, setViewModal] = useState<ViewOrder | null>(null);
  const [activeTab, setActiveTab] = useState("orders");

  const [orderForm, setOrderForm] = useState<OrderFormState>({
    patientId: "",
    patientSearch: "",
    doctorId: "",
    testName: "",
    testType: "Hematology",
    notes: "",
  });

  const [resultForm, setResultForm] = useState<ResultFormState>({
    resultValue: "",
    referenceRange: "",
    isCritical: false,
    notes: "",
    resultFile: "",
  });

  const role = user?.role ?? UserRole.Patient;
  const isLabTech = role === UserRole.LabTechnician;
  const isDoctor = role === UserRole.Doctor;
  const isPatient = role === UserRole.Patient;
  const isAdmin = role === UserRole.SuperAdmin;
  const canOrder = isDoctor || isAdmin;
  const canEnterResult = isLabTech || isAdmin;

  const patientName = (patientId: bigint) => {
    const p = patients?.find((x) => x.id === patientId);
    return p ? `${p.firstName} ${p.lastName}` : `#${patientId}`;
  };

  const doctorLabel = (doctorId: bigint) => {
    const d = doctors?.find((x) => x.id === doctorId);
    return d ? `Dr. ${d.specialization}` : `#${doctorId}`;
  };

  // Filter orders based on role
  const visibleOrders =
    isPatient && user
      ? (orders ?? []).filter((o) => o.patientId === user.userId)
      : (orders ?? []);

  const criticalOrders = visibleOrders.filter((o) => o.isCritical);
  const sampleTrackingOrders = visibleOrders.filter(
    (o) =>
      o.status === LabStatus.Ordered || o.status === LabStatus.SampleCollected,
  );
  const completedOrders = visibleOrders.filter(
    (o) =>
      o.status === LabStatus.ResultReady || o.status === LabStatus.Reported,
  );

  const filteredPatients = orderForm.patientSearch
    ? (patients ?? []).filter(
        (p) =>
          `${p.firstName} ${p.lastName}`
            .toLowerCase()
            .includes(orderForm.patientSearch.toLowerCase()) ||
          String(p.id).includes(orderForm.patientSearch),
      )
    : (patients ?? []);

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderForm.patientId || !orderForm.doctorId || !orderForm.testName) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      await createOrder.mutateAsync({
        patientId: BigInt(orderForm.patientId),
        doctorId: BigInt(orderForm.doctorId),
        visitId: null,
        testType: orderForm.testType,
        testName: orderForm.testName,
      });
      toast.success("Lab order created successfully");
      setShowForm(false);
      setOrderForm({
        patientId: "",
        patientSearch: "",
        doctorId: "",
        testName: "",
        testType: "Hematology",
        notes: "",
      });
    } catch {
      toast.error("Failed to create lab order");
    }
  };

  const handleResultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resultModal) return;
    try {
      await updateResult.mutateAsync({
        id: resultModal.id,
        resultValue: resultForm.resultValue || null,
        resultFile: resultForm.resultFile || null,
        isCritical: resultForm.isCritical,
        referenceRange: resultForm.referenceRange || null,
        notes: resultForm.notes || null,
      });
      if (resultForm.isCritical) {
        toast.error("⚠️ CRITICAL VALUE — Doctor has been notified", {
          duration: 8000,
        });
      } else {
        toast.success("Result entered successfully");
      }
      setResultModal(null);
      setResultForm({
        resultValue: "",
        referenceRange: "",
        isCritical: false,
        notes: "",
        resultFile: "",
      });
    } catch {
      toast.error("Failed to enter result");
    }
  };

  const handleCollectSample = async (order: LabOrder, position: number) => {
    try {
      await updateStatus.mutateAsync({
        id: order.id,
        status: LabStatus.SampleCollected,
      });
      toast.success(`Sample collected for order #${position}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const openResultModal = (order: LabOrder) => {
    setResultModal(order);
    const testOpt = TEST_OPTIONS.find((t) => t.name === order.testName);
    setResultForm({
      resultValue: "",
      referenceRange: testOpt?.refRange ?? "",
      isCritical: false,
      notes: "",
      resultFile: "",
    });
  };

  const openViewModal = (order: LabOrder) => {
    setViewModal({
      ...order,
      patientName: patientName(order.patientId),
      doctorName: doctorLabel(order.doctorId),
    });
  };

  const handleTestSelect = (testName: string) => {
    const opt = TEST_OPTIONS.find((t) => t.name === testName);
    setOrderForm((prev) => ({
      ...prev,
      testName,
      testType: opt?.type ?? prev.testType,
    }));
  };

  // --- Columns ---
  const ordersColumns: ColumnDef<LabOrder>[] = [
    {
      id: "id",
      header: "Order ID",
      cell: ({ row }) => (
        <span className="font-mono text-xs text-muted-foreground">
          LAB-{String(row.original.id).padStart(4, "0")}
        </span>
      ),
    },
    {
      id: "patient",
      header: "Patient",
      accessorFn: (r) => patientName(r.patientId),
      cell: ({ row }) => (
        <span className="font-medium text-foreground">
          {patientName(row.original.patientId)}
        </span>
      ),
    },
    {
      id: "doctor",
      header: "Ordered By",
      accessorFn: (r) => doctorLabel(r.doctorId),
    },
    { accessorKey: "testName", header: "Test" },
    { accessorKey: "testType", header: "Category" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <LabStatusBadge status={row.original.status} />
          {row.original.isCritical && <CriticalBadge />}
        </div>
      ),
    },
    {
      id: "orderedAt",
      header: "Ordered",
      accessorFn: (r) => formatDate(r.createdAt),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const o = row.original;
        const pos = row.index + 1;
        return (
          <div className="flex gap-1.5">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => openViewModal(o)}
              data-ocid={`lab.view_button.${pos}`}
            >
              <Eye className="h-4 w-4" />
            </Button>
            {canEnterResult && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => openResultModal(o)}
                disabled={o.status === LabStatus.Reported}
                data-ocid={`lab.result_button.${pos}`}
              >
                Enter Result
              </Button>
            )}
            {canEnterResult && (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => handleCollectSample(o, pos)}
                disabled={o.status !== LabStatus.Ordered}
                data-ocid={`lab.collect_button.${pos}`}
              >
                Collect
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const sampleColumns: ColumnDef<LabOrder>[] = [
    {
      id: "id",
      header: "Order ID",
      cell: ({ row }) => (
        <span className="font-mono text-xs text-muted-foreground">
          LAB-{String(row.original.id).padStart(4, "0")}
        </span>
      ),
    },
    {
      id: "patient",
      header: "Patient",
      accessorFn: (r) => patientName(r.patientId),
      cell: ({ row }) => (
        <span className="font-medium">
          {patientName(row.original.patientId)}
        </span>
      ),
    },
    { accessorKey: "testName", header: "Test" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <LabStatusBadge status={row.original.status} />,
    },
    {
      id: "collected",
      header: "Sample Collected At",
      accessorFn: (r) => formatDateTime(r.sampleCollectedAt),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const o = row.original;
        const pos = row.index + 1;
        return (
          <div className="flex gap-2">
            {canEnterResult && (
              <Button
                type="button"
                size="sm"
                onClick={() => handleCollectSample(o, pos)}
                disabled={o.status !== LabStatus.Ordered}
                data-ocid={`lab.sample.collect_button.${pos}`}
              >
                <TestTube className="h-4 w-4 mr-1" />
                {o.status === LabStatus.SampleCollected
                  ? "Collected"
                  : "Mark Collected"}
              </Button>
            )}
            {canEnterResult && o.status === LabStatus.SampleCollected && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => openResultModal(o)}
                data-ocid={`lab.sample.result_button.${pos}`}
              >
                Enter Result
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const resultsColumns: ColumnDef<LabOrder>[] = [
    {
      id: "patient",
      header: "Patient",
      accessorFn: (r) => patientName(r.patientId),
      cell: ({ row }) => (
        <span className="font-medium">
          {patientName(row.original.patientId)}
        </span>
      ),
    },
    { accessorKey: "testName", header: "Test" },
    {
      accessorKey: "resultValue",
      header: "Result",
      cell: ({ row }) => (
        <span
          className={
            row.original.isCritical ? "text-red-400 font-bold" : "font-medium"
          }
        >
          {row.original.resultValue ?? "—"}
        </span>
      ),
    },
    {
      id: "refRange",
      header: "Reference Range",
      accessorFn: (r) => r.referenceRange ?? "—",
    },
    {
      id: "normalcy",
      header: "Assessment",
      cell: ({ row }) =>
        row.original.isCritical ? (
          <CriticalBadge />
        ) : (
          <StatusBadge status="Normal" variant="success" />
        ),
    },
    {
      id: "doctor",
      header: "Ordered By",
      accessorFn: (r) => doctorLabel(r.doctorId),
    },
    {
      id: "resultDate",
      header: "Result Date",
      accessorFn: (r) => formatDate(r.resultEnteredAt),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => openViewModal(row.original)}
          data-ocid={`lab.results.view_button.${row.index + 1}`}
        >
          <Eye className="h-4 w-4 mr-1" /> View Report
        </Button>
      ),
    },
  ];

  return (
    <div data-ocid="lab.page">
      <PageHeader
        title="Laboratory Management"
        description="Lab orders, sample collection, result reporting, and critical alerts"
        breadcrumb={["Clinical", "Laboratory"]}
        actions={
          canOrder ? (
            <Button
              type="button"
              onClick={() => setShowForm(true)}
              data-ocid="lab.add_button"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Lab Order
            </Button>
          ) : undefined
        }
      />

      {/* Critical Alert Banner */}
      {criticalOrders.length > 0 && (
        <div
          className="mb-4 p-4 bg-red-500/10 border border-red-500/40 rounded-lg flex items-center gap-3"
          data-ocid="lab.critical_banner"
        >
          <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 animate-pulse" />
          <div>
            <p className="text-sm font-bold text-red-400">
              ⚠️ CRITICAL VALUE — Notify doctor immediately
            </p>
            <p className="text-xs text-red-400/70 mt-0.5">
              {criticalOrders.length} critical result
              {criticalOrders.length > 1 ? "s" : ""} requiring immediate
              attention: {criticalOrders.map((o) => o.testName).join(", ")}
            </p>
          </div>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="orders" data-ocid="lab.orders.tab">
            <ClipboardList className="h-4 w-4 mr-2" />
            Lab Orders ({visibleOrders.length})
          </TabsTrigger>
          {!isPatient && (
            <TabsTrigger value="samples" data-ocid="lab.samples.tab">
              <TestTube className="h-4 w-4 mr-2" />
              Sample Tracking ({sampleTrackingOrders.length})
            </TabsTrigger>
          )}
          <TabsTrigger value="results" data-ocid="lab.results.tab">
            <CheckCircle className="h-4 w-4 mr-2" />
            Results ({completedOrders.length})
          </TabsTrigger>
        </TabsList>

        {/* Lab Orders Tab */}
        <TabsContent value="orders">
          <div className="bg-card border border-border rounded-xl p-6">
            {isLoading ? (
              <LabSkeleton />
            ) : visibleOrders.length === 0 ? (
              <EmptyState
                icon={<FlaskConical className="h-8 w-8" />}
                title="No lab orders"
                description={
                  canOrder
                    ? "Create the first lab order to get started."
                    : "No lab orders have been placed yet."
                }
                action={
                  canOrder
                    ? {
                        label: "New Lab Order",
                        onClick: () => setShowForm(true),
                      }
                    : undefined
                }
                data-ocid="lab.orders.empty_state"
              />
            ) : (
              <DataTable
                data={visibleOrders}
                columns={ordersColumns as ColumnDef<LabOrder>[]}
                searchPlaceholder="Search orders by patient, test..."
                isLoading={false}
              />
            )}
          </div>
        </TabsContent>

        {/* Sample Tracking Tab */}
        {!isPatient && (
          <TabsContent value="samples">
            <div className="bg-card border border-border rounded-xl p-6">
              {sampleTrackingOrders.length === 0 ? (
                <EmptyState
                  icon={<TestTube className="h-8 w-8" />}
                  title="No pending samples"
                  description="All samples have been processed."
                  data-ocid="lab.samples.empty_state"
                />
              ) : (
                <DataTable
                  data={sampleTrackingOrders}
                  columns={sampleColumns as ColumnDef<LabOrder>[]}
                  searchPlaceholder="Search samples..."
                  isLoading={false}
                />
              )}
            </div>
          </TabsContent>
        )}

        {/* Results Tab */}
        <TabsContent value="results">
          <div className="bg-card border border-border rounded-xl p-6">
            {completedOrders.length === 0 ? (
              <EmptyState
                icon={<FlaskConical className="h-8 w-8" />}
                title="No results yet"
                description="Results will appear here once samples are processed."
                data-ocid="lab.results.empty_state"
              />
            ) : (
              <DataTable
                data={completedOrders}
                columns={resultsColumns as ColumnDef<LabOrder>[]}
                searchPlaceholder="Search results..."
                isLoading={false}
              />
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* New Lab Order Modal */}
      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        title="New Lab Order"
        description="Create a laboratory test order for a patient"
        size="md"
        footer={
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowForm(false)}
              data-ocid="lab.form.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="lab-order-form"
              disabled={createOrder.isPending}
              data-ocid="lab.form.submit_button"
            >
              {createOrder.isPending ? "Creating..." : "Create Order"}
            </Button>
          </div>
        }
      >
        <form
          id="lab-order-form"
          onSubmit={handleOrderSubmit}
          className="space-y-4"
        >
          {/* Patient Search */}
          <div className="space-y-1">
            <Label>Search Patient</Label>
            <Input
              value={orderForm.patientSearch}
              onChange={(e) =>
                setOrderForm((prev) => ({
                  ...prev,
                  patientSearch: e.target.value,
                  patientId: "",
                }))
              }
              placeholder="Search by name or ID..."
              data-ocid="lab.form.patient_search"
            />
          </div>
          <div className="space-y-1">
            <Label>
              Patient <span className="text-destructive">*</span>
            </Label>
            <select
              value={orderForm.patientId}
              onChange={(e) =>
                setOrderForm((prev) => ({ ...prev, patientId: e.target.value }))
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              required
              data-ocid="lab.form.patient_select"
            >
              <option value="">Select patient...</option>
              {filteredPatients.map((p) => (
                <option key={String(p.id)} value={String(p.id)}>
                  {p.firstName} {p.lastName} — ID #{String(p.id)}
                </option>
              ))}
            </select>
          </div>

          {/* Doctor */}
          <div className="space-y-1">
            <Label>
              Ordering Doctor <span className="text-destructive">*</span>
            </Label>
            <select
              value={orderForm.doctorId}
              onChange={(e) =>
                setOrderForm((prev) => ({ ...prev, doctorId: e.target.value }))
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              required
              data-ocid="lab.form.doctor_select"
            >
              <option value="">Select doctor...</option>
              {(doctors ?? []).map((d) => (
                <option key={String(d.id)} value={String(d.id)}>
                  Dr. {d.specialization} — ID #{String(d.id)}
                </option>
              ))}
            </select>
          </div>

          {/* Test Type */}
          <div className="space-y-1">
            <Label>
              Test <span className="text-destructive">*</span>
            </Label>
            <select
              value={orderForm.testName}
              onChange={(e) => handleTestSelect(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              required
              data-ocid="lab.form.test_select"
            >
              <option value="">Select test...</option>
              {TEST_OPTIONS.map((t) => (
                <option key={t.name} value={t.name}>
                  {t.name} ({t.type})
                </option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <Label>Clinical Notes</Label>
            <textarea
              value={orderForm.notes}
              onChange={(e) =>
                setOrderForm((prev) => ({ ...prev, notes: e.target.value }))
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px] resize-none"
              placeholder="Clinical indication or additional notes..."
              data-ocid="lab.form.notes_textarea"
            />
          </div>
        </form>
      </Modal>

      {/* Enter Result Modal */}
      {resultModal && (
        <Modal
          open={!!resultModal}
          onClose={() => setResultModal(null)}
          title={`Enter Result: ${resultModal.testName}`}
          description={`Patient: ${patientName(resultModal.patientId)}`}
          size="md"
          footer={
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setResultModal(null)}
                data-ocid="lab.result.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form="result-entry-form"
                disabled={updateResult.isPending}
                className={
                  resultForm.isCritical ? "bg-red-600 hover:bg-red-700" : ""
                }
                data-ocid="lab.result.submit_button"
              >
                {updateResult.isPending ? "Saving..." : "Save Result"}
              </Button>
            </div>
          }
        >
          {resultForm.isCritical && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/40 rounded-lg flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
              <p className="text-sm font-bold text-red-400">
                CRITICAL VALUE — Notify doctor immediately
              </p>
            </div>
          )}
          <form
            id="result-entry-form"
            onSubmit={handleResultSubmit}
            className="space-y-4"
          >
            {/* Result value */}
            <div className="space-y-1">
              <Label>
                Result Value <span className="text-destructive">*</span>
              </Label>
              <Input
                value={resultForm.resultValue}
                onChange={(e) =>
                  setResultForm((prev) => ({
                    ...prev,
                    resultValue: e.target.value,
                  }))
                }
                required
                placeholder="e.g. 12.5 g/dL, Positive, 120/80 mmHg"
                data-ocid="lab.result.value_input"
              />
            </div>

            {/* Reference Range */}
            <div className="space-y-1">
              <Label>Reference Range</Label>
              <Input
                value={resultForm.referenceRange}
                onChange={(e) =>
                  setResultForm((prev) => ({
                    ...prev,
                    referenceRange: e.target.value,
                  }))
                }
                placeholder="e.g. 12.0–16.0 g/dL"
                data-ocid="lab.result.refrange_input"
              />
            </div>

            {/* Critical toggle */}
            <div
              className={`flex items-center justify-between p-3 rounded-lg border ${
                resultForm.isCritical
                  ? "bg-red-500/10 border-red-500/40"
                  : "bg-muted/20 border-border"
              }`}
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  Mark as Critical
                </p>
                <p className="text-xs text-muted-foreground">
                  Triggers immediate notification to ordering doctor
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={resultForm.isCritical}
                  onChange={(e) =>
                    setResultForm((prev) => ({
                      ...prev,
                      isCritical: e.target.checked,
                    }))
                  }
                  data-ocid="lab.result.critical_checkbox"
                />
                <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-red-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-background after:rounded-full after:h-5 after:w-5 after:transition-all" />
              </label>
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <Label>Notes / Interpretation</Label>
              <textarea
                value={resultForm.notes}
                onChange={(e) =>
                  setResultForm((prev) => ({ ...prev, notes: e.target.value }))
                }
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px] resize-none"
                placeholder="Pathologist notes or interpretation..."
                data-ocid="lab.result.notes_textarea"
              />
            </div>

            {/* File upload (stub) */}
            <div className="space-y-1">
              <Label>Result File (URL)</Label>
              <div className="flex gap-2">
                <Input
                  value={resultForm.resultFile}
                  onChange={(e) =>
                    setResultForm((prev) => ({
                      ...prev,
                      resultFile: e.target.value,
                    }))
                  }
                  placeholder="https://... or file path"
                  data-ocid="lab.result.file_input"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                  data-ocid="lab.result.upload_button"
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>
        </Modal>
      )}

      {/* View Result Report Modal */}
      {viewModal && (
        <Modal
          open={!!viewModal}
          onClose={() => setViewModal(null)}
          title="Lab Report"
          size="md"
        >
          <div className="space-y-4" data-ocid="lab.report.dialog">
            <div className="grid grid-cols-2 gap-4">
              <ReportField
                label="Order ID"
                value={`LAB-${String(viewModal.id).padStart(4, "0")}`}
              />
              <ReportField label="Test" value={viewModal.testName} />
              <ReportField label="Category" value={viewModal.testType} />
              <ReportField label="Patient" value={viewModal.patientName} />
              <ReportField label="Doctor" value={viewModal.doctorName} />
              <ReportField
                label="Status"
                value={<LabStatusBadge status={viewModal.status} />}
              />
              <ReportField
                label="Ordered At"
                value={formatDateTime(viewModal.createdAt)}
              />
              {viewModal.sampleCollectedAt && (
                <ReportField
                  label="Sample Collected"
                  value={formatDateTime(viewModal.sampleCollectedAt)}
                />
              )}
              {viewModal.resultEnteredAt && (
                <ReportField
                  label="Result Entered"
                  value={formatDateTime(viewModal.resultEnteredAt)}
                />
              )}
            </div>

            {(viewModal.resultValue || viewModal.referenceRange) && (
              <div
                className={`p-4 rounded-lg border ${
                  viewModal.isCritical
                    ? "bg-red-500/10 border-red-500/30"
                    : "bg-green-500/10 border-green-500/30"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Result
                  </p>
                  {viewModal.isCritical ? (
                    <CriticalBadge />
                  ) : (
                    <StatusBadge status="Normal" variant="success" />
                  )}
                </div>
                <p
                  className={`text-2xl font-bold ${
                    viewModal.isCritical ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {viewModal.resultValue ?? "—"}
                </p>
                {viewModal.referenceRange && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Reference: {viewModal.referenceRange}
                  </p>
                )}
              </div>
            )}

            {viewModal.notes && (
              <div className="p-3 bg-muted/20 border border-border rounded-lg">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  Notes
                </p>
                <p className="text-sm">{viewModal.notes}</p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

function ReportField({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
        {label}
      </p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

function LabSkeleton() {
  return (
    <div className="space-y-3" data-ocid="lab.loading_state">
      {[
        "skeleton-1",
        "skeleton-2",
        "skeleton-3",
        "skeleton-4",
        "skeleton-5",
      ].map((k) => (
        <Skeleton key={k} className="h-12 w-full rounded-lg" />
      ))}
    </div>
  );
}
