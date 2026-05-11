import type { RadiologyOrder } from "@/backend";
import { ImagingType, RadiologyStatus } from "@/backend";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { usePatients } from "@/services/patients";
import {
  useCreateRadiologyOrder,
  useRadiologyOrders,
  useUpdateRadiologyReport,
} from "@/services/radiology";
import { useDoctors } from "@/services/staff";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Activity,
  ChevronRight,
  FileImage,
  Monitor,
  Plus,
  Radiation,
  Upload,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// --- Imaging type badge ---------------------------------------------------
const IMAGING_COLORS: Record<string, string> = {
  XRay: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  MRI: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  CT: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  Ultrasound: "bg-teal-500/15 text-teal-400 border-teal-500/30",
  Other: "bg-muted/30 text-muted-foreground border-border",
};
const IMAGING_LABELS: Record<string, string> = {
  XRay: "X-Ray",
  MRI: "MRI",
  CT: "CT Scan",
  Ultrasound: "Ultrasound",
  Other: "Other",
};

function ImagingBadge({ type }: { type: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        IMAGING_COLORS[type] ?? IMAGING_COLORS.Other,
      )}
    >
      {IMAGING_LABELS[type] ?? type}
    </span>
  );
}

// --- Radiology status badge -----------------------------------------------
function RadiologyStatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    Ordered: "bg-muted/30 text-muted-foreground border-border",
    ImagingDone: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    ReportReady: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    Reported: "bg-green-500/15 text-green-400 border-green-500/30",
  };
  const labels: Record<string, string> = {
    Ordered: "Ordered",
    ImagingDone: "Imaging Done",
    ReportReady: "Report Ready",
    Reported: "Reported",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variants[status] ?? variants.Ordered,
      )}
    >
      {labels[status] ?? status}
    </span>
  );
}

const STATUS_NEXT: Partial<Record<RadiologyStatus, RadiologyStatus>> = {
  [RadiologyStatus.Ordered]: RadiologyStatus.ImagingDone,
  [RadiologyStatus.ImagingDone]: RadiologyStatus.ReportReady,
};
const STATUS_NEXT_LABEL: Partial<Record<RadiologyStatus, string>> = {
  [RadiologyStatus.Ordered]: "Mark Imaging Done",
  [RadiologyStatus.ImagingDone]: "Mark Report Ready",
};

// --- Main component -------------------------------------------------------
export function RadiologyPage() {
  const { data: orders, isLoading } = useRadiologyOrders();
  const { data: patients } = usePatients();
  const { data: doctors } = useDoctors();
  const createOrder = useCreateRadiologyOrder();
  const updateReport = useUpdateRadiologyReport();

  const [activeTab, setActiveTab] = useState<"orders" | "reports">("orders");

  // Filters
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");

  // Modals
  const [showForm, setShowForm] = useState(false);
  const [uploadModal, setUploadModal] = useState<RadiologyOrder | null>(null);
  const [dicomModal, setDicomModal] = useState<RadiologyOrder | null>(null);
  const [reportViewModal, setReportViewModal] = useState<RadiologyOrder | null>(
    null,
  );

  // New order form state
  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    imagingType: ImagingType.XRay as string,
    bodyPart: "",
    clinicalIndication: "",
  });

  // Upload report form state
  const [reportForm, setReportForm] = useState({
    findings: "",
    recommendations: "",
    fileName: "",
  });

  const getPatientName = (id: bigint) => {
    const p = patients?.find((pt) => pt.id === id);
    return p ? `${p.firstName} ${p.lastName}` : `#${id}`;
  };
  const getDoctorName = (id: bigint) => {
    const d = doctors?.find((dr) => dr.userId === id);
    return d ? `Dr. ${d.specialization}` : `#${id}`;
  };

  const filteredOrders = useMemo(() => {
    if (!orders) return [];
    return orders.filter((o) => {
      if (filterType !== "all" && o.imagingType !== filterType) return false;
      if (filterStatus !== "all" && o.status !== filterStatus) return false;
      if (filterDateFrom) {
        const d = new Date(Number(o.createdAt) / 1_000_000);
        if (d < new Date(filterDateFrom)) return false;
      }
      if (filterDateTo) {
        const d = new Date(Number(o.createdAt) / 1_000_000);
        if (d > new Date(`${filterDateTo}T23:59:59`)) return false;
      }
      return true;
    });
  }, [orders, filterType, filterStatus, filterDateFrom, filterDateTo]);

  const completedOrders = useMemo(
    () => (orders ?? []).filter((o) => o.status === RadiologyStatus.Reported),
    [orders],
  );

  // --- Columns -----------------------------------------------------------
  const orderColumns: ColumnDef<RadiologyOrder>[] = [
    {
      id: "orderId",
      header: "Order ID",
      accessorFn: (r) => `RAD-${String(r.id).padStart(4, "0")}`,
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
      id: "doctor",
      header: "Ordered By",
      accessorFn: (r) => getDoctorName(r.doctorId),
    },
    {
      accessorKey: "imagingType",
      header: "Imaging Type",
      cell: ({ getValue }) => <ImagingBadge type={String(getValue())} />,
    },
    { accessorKey: "bodyPart", header: "Body Part" },
    {
      accessorKey: "clinicalIndication",
      header: "Indication",
      cell: ({ getValue }) => (
        <span className="text-sm text-muted-foreground line-clamp-1 max-w-[180px] block">
          {String(getValue())}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => (
        <RadiologyStatusBadge status={String(getValue())} />
      ),
    },
    {
      id: "date",
      header: "Date",
      accessorFn: (r) =>
        new Date(Number(r.createdAt) / 1_000_000).toLocaleDateString(),
      cell: ({ getValue }) => (
        <span className="text-sm text-muted-foreground">
          {String(getValue())}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const order = row.original;
        const nextStatus = STATUS_NEXT[order.status];
        const nextLabel = STATUS_NEXT_LABEL[order.status];
        return (
          <div className="flex items-center gap-1.5">
            {nextStatus && nextLabel && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() =>
                  updateReport.mutate(
                    {
                      id: order.id,
                      reportUrl: order.reportUrl ?? null,
                      findings: order.findings ?? null,
                      radiologistId: order.radiologistId ?? null,
                      status: nextStatus,
                    },
                    { onSuccess: () => toast.success("Status updated") },
                  )
                }
                data-ocid={`radiology.advance_button.${row.index + 1}`}
                className="text-xs whitespace-nowrap"
              >
                <ChevronRight className="h-3 w-3 mr-1" />
                {nextLabel}
              </Button>
            )}
            {order.status === RadiologyStatus.ReportReady && (
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  setUploadModal(order);
                  setReportForm({
                    findings: "",
                    recommendations: "",
                    fileName: "",
                  });
                }}
                data-ocid={`radiology.upload_button.${row.index + 1}`}
                className="text-xs"
              >
                <Upload className="h-3 w-3 mr-1" />
                Upload Report
              </Button>
            )}
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => setDicomModal(order)}
              data-ocid={`radiology.dicom_button.${row.index + 1}`}
              className="text-xs"
            >
              <Monitor className="h-3 w-3 mr-1" />
              View Images
            </Button>
          </div>
        );
      },
    },
  ];

  const reportColumns: ColumnDef<RadiologyOrder>[] = [
    {
      id: "patient",
      header: "Patient",
      accessorFn: (r) => getPatientName(r.patientId),
      cell: ({ getValue }) => (
        <span className="font-medium">{String(getValue())}</span>
      ),
    },
    {
      accessorKey: "imagingType",
      header: "Imaging Type",
      cell: ({ getValue }) => <ImagingBadge type={String(getValue())} />,
    },
    { accessorKey: "bodyPart", header: "Body Part" },
    {
      id: "findings",
      header: "Findings (excerpt)",
      accessorFn: (r) => r.findings ?? "—",
      cell: ({ getValue }) => (
        <span className="text-sm text-muted-foreground line-clamp-2 max-w-[220px] block">
          {String(getValue())}
        </span>
      ),
    },
    {
      id: "radiologist",
      header: "Radiologist",
      accessorFn: (r) =>
        r.radiologistId ? getDoctorName(r.radiologistId) : "—",
    },
    {
      id: "date",
      header: "Date",
      accessorFn: (r) =>
        new Date(Number(r.createdAt) / 1_000_000).toLocaleDateString(),
      cell: ({ getValue }) => (
        <span className="text-sm text-muted-foreground">
          {String(getValue())}
        </span>
      ),
    },
    {
      id: "reportActions",
      header: "",
      cell: ({ row }) => (
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setReportViewModal(row.original)}
          data-ocid={`radiology.view_report_button.${row.index + 1}`}
        >
          View Report
        </Button>
      ),
    },
  ];

  // --- Handlers -----------------------------------------------------------
  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createOrder.mutateAsync({
        patientId: BigInt(form.patientId),
        doctorId: BigInt(form.doctorId),
        imagingType: form.imagingType as ImagingType,
        bodyPart: form.bodyPart,
        clinicalIndication: form.clinicalIndication,
      });
      toast.success("Radiology order created");
      setShowForm(false);
      setForm({
        patientId: "",
        doctorId: "",
        imagingType: ImagingType.XRay,
        bodyPart: "",
        clinicalIndication: "",
      });
    } catch {
      toast.error("Failed to create radiology order");
    }
  };

  const handleUploadReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadModal) return;
    const combined = reportForm.recommendations
      ? `${reportForm.findings}\n\nRecommendations: ${reportForm.recommendations}`
      : reportForm.findings;
    try {
      await updateReport.mutateAsync({
        id: uploadModal.id,
        reportUrl: reportForm.fileName
          ? `reports/${reportForm.fileName}`
          : null,
        findings: combined,
        radiologistId: null,
        status: RadiologyStatus.Reported,
      });
      toast.success("Report submitted and marked as Reported");
      setUploadModal(null);
    } catch {
      toast.error("Failed to submit report");
    }
  };

  const hasActiveFilters =
    filterType !== "all" ||
    filterStatus !== "all" ||
    !!filterDateFrom ||
    !!filterDateTo;

  // --- Render -------------------------------------------------------------
  return (
    <div data-ocid="radiology.page">
      <PageHeader
        title="Radiology"
        description="Imaging orders, DICOM viewer, and radiology reports"
        breadcrumb={["Clinical", "Radiology"]}
        actions={
          <Button
            type="button"
            onClick={() => setShowForm(true)}
            data-ocid="radiology.add_button"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>
        }
      />

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-border">
        {(["orders", "reports"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px capitalize",
              activeTab === tab
                ? "border-accent text-accent"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
            data-ocid={`radiology.${tab}_tab`}
          >
            {tab === "orders" ? "Radiology Orders" : "Reports"}
            <span className="ml-2 text-xs bg-muted/60 px-1.5 py-0.5 rounded-full">
              {tab === "orders"
                ? filteredOrders.length
                : completedOrders.length}
            </span>
          </button>
        ))}
      </div>

      {/* Radiology Orders Tab */}
      {activeTab === "orders" && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="bg-card border border-border rounded-xl p-4 flex flex-wrap gap-3 items-end">
            <div className="flex flex-col gap-1">
              <Label className="text-xs">Imaging Type</Label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-1.5 text-sm min-w-[130px]"
                data-ocid="radiology.filter.type_select"
              >
                <option value="all">All Types</option>
                {Object.values(ImagingType).map((t) => (
                  <option key={t} value={t}>
                    {IMAGING_LABELS[t] ?? t}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs">Status</Label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-1.5 text-sm min-w-[140px]"
                data-ocid="radiology.filter.status_select"
              >
                <option value="all">All Statuses</option>
                {Object.values(RadiologyStatus).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs">From</Label>
              <Input
                type="date"
                value={filterDateFrom}
                onChange={(e) => setFilterDateFrom(e.target.value)}
                className="text-sm py-1.5 h-auto"
                data-ocid="radiology.filter.date_from"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs">To</Label>
              <Input
                type="date"
                value={filterDateTo}
                onChange={(e) => setFilterDateTo(e.target.value)}
                className="text-sm py-1.5 h-auto"
                data-ocid="radiology.filter.date_to"
              />
            </div>
            {hasActiveFilters && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFilterType("all");
                  setFilterStatus("all");
                  setFilterDateFrom("");
                  setFilterDateTo("");
                }}
                data-ocid="radiology.filter.clear_button"
              >
                Clear Filters
              </Button>
            )}
          </div>

          {/* Orders Table */}
          <div className="bg-card border border-border rounded-xl p-6">
            {filteredOrders.length === 0 && !isLoading ? (
              <EmptyState
                icon={<Radiation className="h-8 w-8" />}
                title="No radiology orders"
                description="No orders match the current filters. Create a new order to get started."
                action={{
                  label: "New Order",
                  onClick: () => setShowForm(true),
                }}
              />
            ) : (
              <DataTable
                data={filteredOrders}
                columns={orderColumns}
                searchPlaceholder="Search orders by patient, body part..."
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === "reports" && (
        <div className="bg-card border border-border rounded-xl p-6">
          {completedOrders.length === 0 ? (
            <EmptyState
              icon={<FileImage className="h-8 w-8" />}
              title="No completed reports"
              description="Completed radiology reports will appear here once orders reach the Reported status."
            />
          ) : (
            <DataTable
              data={completedOrders}
              columns={reportColumns}
              searchPlaceholder="Search reports by patient..."
              isLoading={isLoading}
            />
          )}
        </div>
      )}

      {/* --- New Order Modal --- */}
      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        title="New Radiology Order"
        description="Order an imaging study for a patient"
        size="md"
        footer={
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowForm(false)}
              data-ocid="radiology.form.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="radiology-order-form"
              disabled={createOrder.isPending}
              data-ocid="radiology.form.submit_button"
            >
              {createOrder.isPending ? "Creating..." : "Create Order"}
            </Button>
          </div>
        }
      >
        <form
          id="radiology-order-form"
          onSubmit={handleCreateOrder}
          className="space-y-4"
        >
          <div className="space-y-1">
            <Label>Patient</Label>
            <select
              value={form.patientId}
              onChange={(e) => setForm({ ...form, patientId: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              required
              data-ocid="radiology.form.patient_select"
            >
              <option value="">Select patient...</option>
              {patients?.map((p) => (
                <option key={String(p.id)} value={String(p.id)}>
                  {p.firstName} {p.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <Label>Ordering Doctor</Label>
            <select
              value={form.doctorId}
              onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              required
              data-ocid="radiology.form.doctor_select"
            >
              <option value="">Select doctor...</option>
              {doctors?.map((d) => (
                <option key={String(d.userId)} value={String(d.userId)}>
                  {d.specialization} — ID #{String(d.userId)}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Imaging Type</Label>
              <select
                value={form.imagingType}
                onChange={(e) =>
                  setForm({ ...form, imagingType: e.target.value })
                }
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                data-ocid="radiology.form.type_select"
              >
                {Object.values(ImagingType).map((t) => (
                  <option key={t} value={t}>
                    {IMAGING_LABELS[t] ?? t}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <Label>Body Part</Label>
              <Input
                value={form.bodyPart}
                onChange={(e) => setForm({ ...form, bodyPart: e.target.value })}
                required
                placeholder="e.g. Chest, Knee, Head"
                data-ocid="radiology.form.bodypart_input"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label>Clinical Indication</Label>
            <Textarea
              value={form.clinicalIndication}
              onChange={(e) =>
                setForm({ ...form, clinicalIndication: e.target.value })
              }
              required
              placeholder="Describe the clinical reason for this imaging study..."
              rows={3}
              data-ocid="radiology.form.indication_textarea"
            />
          </div>
        </form>
      </Modal>

      {/* --- Upload Report Modal --- */}
      {uploadModal && (
        <Modal
          open={!!uploadModal}
          onClose={() => setUploadModal(null)}
          title="Upload Radiology Report"
          description={`${IMAGING_LABELS[uploadModal.imagingType] ?? uploadModal.imagingType} — ${uploadModal.bodyPart}`}
          size="md"
          footer={
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setUploadModal(null)}
                data-ocid="radiology.upload.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form="radiology-report-form"
                disabled={updateReport.isPending}
                data-ocid="radiology.upload.submit_button"
              >
                {updateReport.isPending ? "Saving..." : "Submit Report"}
              </Button>
            </div>
          }
        >
          <form
            id="radiology-report-form"
            onSubmit={handleUploadReport}
            className="space-y-4"
          >
            <div className="p-3 rounded-lg bg-muted/30 border border-border text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Patient: </span>
              {getPatientName(uploadModal.patientId)}
              <span className="mx-2">&middot;</span>
              <span className="font-medium text-foreground">Ordered: </span>
              {new Date(
                Number(uploadModal.createdAt) / 1_000_000,
              ).toLocaleDateString()}
            </div>
            <div className="space-y-1">
              <Label>Findings</Label>
              <Textarea
                value={reportForm.findings}
                onChange={(e) =>
                  setReportForm({ ...reportForm, findings: e.target.value })
                }
                required
                placeholder="Describe imaging findings in detail..."
                rows={4}
                data-ocid="radiology.upload.findings_textarea"
              />
            </div>
            <div className="space-y-1">
              <Label>Recommendations</Label>
              <Textarea
                value={reportForm.recommendations}
                onChange={(e) =>
                  setReportForm({
                    ...reportForm,
                    recommendations: e.target.value,
                  })
                }
                placeholder="Clinical recommendations based on findings..."
                rows={3}
                data-ocid="radiology.upload.recommendations_textarea"
              />
            </div>
            <div className="space-y-1">
              <Label>Report File (PDF / Image)</Label>
              <label
                className="flex flex-col items-center justify-center gap-2 w-full h-24 rounded-lg border-2 border-dashed border-border bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer text-sm text-muted-foreground"
                data-ocid="radiology.upload.dropzone"
              >
                <Upload className="h-5 w-5" />
                {reportForm.fileName ? (
                  <span className="text-foreground font-medium">
                    {reportForm.fileName}
                  </span>
                ) : (
                  <span>Click to select file or drag &amp; drop</span>
                )}
                <input
                  type="file"
                  accept=".pdf,image/*"
                  className="sr-only"
                  onChange={(e) =>
                    setReportForm({
                      ...reportForm,
                      fileName: e.target.files?.[0]?.name ?? "",
                    })
                  }
                  data-ocid="radiology.upload.file_input"
                />
              </label>
            </div>
          </form>
        </Modal>
      )}

      {/* --- DICOM Viewer Stub Modal --- */}
      {dicomModal && (
        <Modal
          open={!!dicomModal}
          onClose={() => setDicomModal(null)}
          title="DICOM Image Viewer"
          description={`${IMAGING_LABELS[dicomModal.imagingType] ?? dicomModal.imagingType} — ${getPatientName(dicomModal.patientId)}`}
          size="lg"
          footer={
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDicomModal(null)}
                data-ocid="radiology.dicom.close_button"
              >
                Close
              </Button>
            </div>
          }
        >
          <div className="space-y-4" data-ocid="radiology.dicom.dialog">
            <div className="w-full aspect-video rounded-xl bg-black/60 border border-border flex flex-col items-center justify-center gap-4">
              <Activity className="h-12 w-12 text-muted-foreground/40" />
              <div className="text-center">
                <p className="text-muted-foreground font-medium">
                  No images loaded
                </p>
                <p className="text-muted-foreground/60 text-sm mt-1">
                  DICOM image frames will appear here
                </p>
              </div>
              <div className="flex gap-2">
                {["W/L", "Zoom", "Pan", "Rotate", "Measure"].map((tool) => (
                  <button
                    key={tool}
                    type="button"
                    className="px-2 py-1 text-xs rounded bg-muted/30 text-muted-foreground border border-border cursor-not-allowed opacity-50"
                  >
                    {tool}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-accent/10 border border-accent/30 flex gap-3">
              <Monitor className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-foreground">
                  DICOM Image Viewer integration coming soon. Images stored in
                  cloud storage.
                </p>
                <p className="text-muted-foreground mt-0.5">
                  Full DICOM viewer with windowing, zoom, annotations, and
                  multi-series support will be enabled in a future release.
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* --- Full Report View Modal --- */}
      {reportViewModal && (
        <Modal
          open={!!reportViewModal}
          onClose={() => setReportViewModal(null)}
          title="Radiology Report"
          description={`${IMAGING_LABELS[reportViewModal.imagingType] ?? reportViewModal.imagingType} — ${reportViewModal.bodyPart}`}
          size="md"
          footer={
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setReportViewModal(null)}
                data-ocid="radiology.report_view.close_button"
              >
                Close
              </Button>
            </div>
          }
        >
          <div className="space-y-5" data-ocid="radiology.report_view.dialog">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-0.5">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Patient
                </p>
                <p className="font-medium">
                  {getPatientName(reportViewModal.patientId)}
                </p>
              </div>
              <div className="space-y-0.5">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Study Date
                </p>
                <p className="font-medium">
                  {new Date(
                    Number(reportViewModal.createdAt) / 1_000_000,
                  ).toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-0.5">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Imaging Type
                </p>
                <ImagingBadge type={reportViewModal.imagingType} />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Status
                </p>
                <RadiologyStatusBadge status={reportViewModal.status} />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Clinical Indication
              </p>
              <p className="text-sm bg-muted/20 rounded-lg p-3 border border-border">
                {reportViewModal.clinicalIndication}
              </p>
            </div>
            {reportViewModal.findings && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Findings &amp; Recommendations
                </p>
                <p className="text-sm bg-muted/20 rounded-lg p-3 border border-border whitespace-pre-line">
                  {reportViewModal.findings}
                </p>
              </div>
            )}
            {reportViewModal.reportUrl && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Report File
                </p>
                <a
                  href={reportViewModal.reportUrl}
                  className="text-accent text-sm hover:underline flex items-center gap-1.5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileImage className="h-4 w-4" />
                  {reportViewModal.reportUrl}
                </a>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
