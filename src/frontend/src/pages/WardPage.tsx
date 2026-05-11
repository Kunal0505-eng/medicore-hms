import { BedStatus, HousekeepingStatus, WardType } from "@/backend";
import type { Bed, Ward } from "@/backend";
import { Skeleton } from "@/components/ui/LoadingSkeleton";
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
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { useAdmitPatient, usePatients } from "@/services/patients";
import {
  useBedsByWard,
  useCreateBed,
  useCreateWard,
  useUpdateBedStatus,
  useWards,
} from "@/services/ward";
import {
  AlertTriangle,
  BedDouble,
  CheckCircle,
  ChevronRight,
  Cog,
  Plus,
  RefreshCw,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── ESI Triage colour map ────────────────────────────────────────────────────
const ESI_COLORS: Record<number, string> = {
  1: "ring-2 ring-red-500",
  2: "ring-2 ring-orange-500",
  3: "ring-2 ring-yellow-500",
  4: "ring-2 ring-green-500",
  5: "ring-2 ring-blue-500",
};

// ─── Bed background colours ──────────────────────────────────────────────────
const BED_BG: Record<string, string> = {
  Available: "bg-green-500/10 border-green-500/30 hover:bg-green-500/20",
  Occupied: "bg-red-500/10 border-red-500/30 hover:bg-red-500/20",
  Maintenance: "bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20",
  Reserved: "bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20",
};

const BED_STATUS_ICON: Record<string, string> = {
  Available: "text-green-400",
  Occupied: "text-red-400",
  Maintenance: "text-amber-400",
  Reserved: "text-blue-400",
};

const WARD_TYPE_TABS: WardType[] = [
  WardType.ICU,
  WardType.General,
  WardType.Private,
  WardType.Maternity,
  WardType.Emergency,
];

const WARD_TYPE_LABELS: Record<WardType, string> = {
  [WardType.ICU]: "🏥 ICU",
  [WardType.General]: "🛏️ General",
  [WardType.Private]: "🚪 Private",
  [WardType.Maternity]: "👶 Maternity",
  [WardType.Emergency]: "🚑 Emergency",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function BedCard({
  bed,
  patientName,
  esiLevel,
  onClick,
}: {
  bed: Bed;
  patientName?: string;
  esiLevel?: number;
  onClick: () => void;
}) {
  const bgClass = BED_BG[bed.status] ?? "bg-muted/20 border-border";
  const iconClass = BED_STATUS_ICON[bed.status] ?? "text-muted-foreground";
  const esiRing = esiLevel ? (ESI_COLORS[esiLevel] ?? "") : "";

  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={`ward.bed.${bed.bedNumber}`}
      className={cn(
        "relative border rounded-xl p-3 text-left cursor-pointer transition-smooth group min-h-[88px] flex flex-col justify-between",
        bgClass,
        esiRing,
      )}
    >
      <div className="flex items-start justify-between gap-1">
        <span className="text-xs font-bold text-foreground truncate">
          {bed.bedNumber}
        </span>
        <BedDouble className={cn("h-3.5 w-3.5 shrink-0", iconClass)} />
      </div>

      {bed.status === BedStatus.Occupied && patientName && (
        <p className="text-[10px] text-muted-foreground truncate mt-1 leading-tight">
          {patientName}
        </p>
      )}

      <div className="mt-auto pt-1 flex items-center justify-between gap-1">
        <span
          className={cn(
            "text-[9px] font-semibold uppercase tracking-wide",
            iconClass,
          )}
        >
          {bed.status}
        </span>
        {bed.housekeepingStatus === HousekeepingStatus.Dirty && (
          <span className="text-[9px] text-amber-400" title="Dirty">
            🧹
          </span>
        )}
        {esiLevel && (
          <span className="text-[9px] font-bold text-orange-400">
            ESI {esiLevel}
          </span>
        )}
      </div>
    </button>
  );
}

function WardStatsBar({ beds }: { beds: Bed[] }) {
  const stats = [
    { label: "Total", count: beds.length, color: "text-foreground" },
    {
      label: "Occupied",
      count: beds.filter((b) => b.status === BedStatus.Occupied).length,
      color: "text-red-400",
    },
    {
      label: "Available",
      count: beds.filter((b) => b.status === BedStatus.Available).length,
      color: "text-green-400",
    },
    {
      label: "Reserved",
      count: beds.filter((b) => b.status === BedStatus.Reserved).length,
      color: "text-blue-400",
    },
    {
      label: "Maintenance",
      count: beds.filter((b) => b.status === BedStatus.Maintenance).length,
      color: "text-amber-400",
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-3 mb-5" data-ocid="ward.stats_bar">
      {stats.map(({ label, count, color }) => (
        <div
          key={label}
          className="bg-card border border-border rounded-lg px-3 py-2 text-center"
        >
          <p className={cn("text-xl font-bold", color)}>{count}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{label}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Bed Detail Panel ─────────────────────────────────────────────────────────

interface BedDetailPanelProps {
  bed: Bed;
  patientName?: string;
  onClose: () => void;
  onStatusChange: (
    bedId: bigint,
    status: BedStatus,
    hk: HousekeepingStatus,
  ) => void;
  onAssignPatient: (bed: Bed) => void;
  isPending: boolean;
}

function BedDetailPanel({
  bed,
  patientName,
  onClose,
  onStatusChange,
  onAssignPatient,
  isPending,
}: BedDetailPanelProps) {
  const [notes, setNotes] = useState(bed.notes ?? "");

  return (
    <Modal
      open
      onClose={onClose}
      title={`Bed ${bed.bedNumber}`}
      description={`Status: ${bed.status} · Housekeeping: ${bed.housekeepingStatus}`}
      size="md"
      footer={
        <div className="flex flex-wrap gap-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={onClose}
            data-ocid="ward.bed_detail.cancel_button"
          >
            Close
          </Button>
          {bed.status !== BedStatus.Occupied && (
            <Button
              size="sm"
              type="button"
              disabled={isPending}
              onClick={() => onAssignPatient(bed)}
              data-ocid="ward.bed_detail.assign_button"
            >
              <Plus className="h-3.5 w-3.5 mr-1" /> Assign Patient
            </Button>
          )}
          {bed.status !== BedStatus.Available && (
            <Button
              size="sm"
              variant="outline"
              type="button"
              disabled={isPending}
              className="text-green-400 border-green-500/30 hover:bg-green-500/10"
              onClick={() =>
                onStatusChange(
                  bed.id,
                  BedStatus.Available,
                  bed.housekeepingStatus,
                )
              }
              data-ocid="ward.bed_detail.mark_available_button"
            >
              <CheckCircle className="h-3.5 w-3.5 mr-1" /> Mark Available
            </Button>
          )}
          {bed.status !== BedStatus.Maintenance && (
            <Button
              size="sm"
              variant="outline"
              type="button"
              disabled={isPending}
              className="text-amber-400 border-amber-500/30 hover:bg-amber-500/10"
              onClick={() =>
                onStatusChange(
                  bed.id,
                  BedStatus.Maintenance,
                  bed.housekeepingStatus,
                )
              }
              data-ocid="ward.bed_detail.mark_maintenance_button"
            >
              <Wrench className="h-3.5 w-3.5 mr-1" /> Mark Maintenance
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            type="button"
            disabled={isPending}
            className={
              bed.housekeepingStatus === HousekeepingStatus.Clean
                ? "text-amber-400 border-amber-500/30 hover:bg-amber-500/10"
                : "text-green-400 border-green-500/30 hover:bg-green-500/10"
            }
            onClick={() =>
              onStatusChange(
                bed.id,
                bed.status,
                bed.housekeepingStatus === HousekeepingStatus.Clean
                  ? HousekeepingStatus.Dirty
                  : HousekeepingStatus.Clean,
              )
            }
            data-ocid="ward.bed_detail.toggle_hk_button"
          >
            🧹{" "}
            {bed.housekeepingStatus === HousekeepingStatus.Clean
              ? "Mark Dirty"
              : "Mark Clean"}
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/20 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">Bed Number</p>
            <p className="font-semibold text-foreground mt-0.5">
              {bed.bedNumber}
            </p>
          </div>
          <div className="bg-muted/20 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">Status</p>
            <StatusBadge status={bed.status} className="mt-1" />
          </div>
          <div className="bg-muted/20 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">Housekeeping</p>
            <StatusBadge status={bed.housekeepingStatus} className="mt-1" />
          </div>
          {bed.status === BedStatus.Occupied && (
            <div className="bg-muted/20 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Patient</p>
              <p className="font-semibold text-foreground mt-0.5 truncate">
                {patientName ?? "—"}
              </p>
            </div>
          )}
        </div>

        <div>
          <Label className="text-xs text-muted-foreground">Notes</Label>
          <textarea
            className="w-full mt-1 bg-input border border-border rounded-lg p-2 text-sm text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-ring"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about this bed..."
            data-ocid="ward.bed_detail.notes_textarea"
          />
        </div>
      </div>
    </Modal>
  );
}

// ─── Add Bed Modal ────────────────────────────────────────────────────────────

function AddBedModal({
  open,
  onClose,
  wardId,
  wardName,
}: {
  open: boolean;
  onClose: () => void;
  wardId: bigint;
  wardName: string;
}) {
  const [bedNumber, setBedNumber] = useState("");
  const { mutateAsync, isPending } = useCreateBed();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bedNumber.trim()) return;
    try {
      await mutateAsync({ wardId, bedNumber: bedNumber.trim() });
      toast.success(`Bed ${bedNumber} added to ${wardName}`);
      setBedNumber("");
      onClose();
    } catch {
      toast.error("Failed to add bed");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Bed"
      description={`Adding bed to ${wardName}`}
      size="sm"
      footer={
        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={onClose}
            data-ocid="add_bed.cancel_button"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            type="submit"
            form="add-bed-form"
            disabled={isPending}
            data-ocid="add_bed.submit_button"
          >
            {isPending ? "Adding..." : "Add Bed"}
          </Button>
        </div>
      }
    >
      <form id="add-bed-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="bed-number">Bed Number</Label>
          <Input
            id="bed-number"
            className="mt-1"
            placeholder="e.g. ICU-01, G-102"
            value={bedNumber}
            onChange={(e) => setBedNumber(e.target.value)}
            required
            data-ocid="add_bed.bed_number_input"
          />
        </div>
        <div>
          <Label>Ward</Label>
          <div className="mt-1 px-3 py-2 bg-muted/20 border border-border rounded-lg text-sm text-muted-foreground">
            {wardName} (auto-assigned)
          </div>
        </div>
      </form>
    </Modal>
  );
}

// ─── Ward Config Modal ────────────────────────────────────────────────────────

function WardConfigModal({
  open,
  onClose,
  ward,
}: {
  open: boolean;
  onClose: () => void;
  ward: Ward;
}) {
  const [name, setName] = useState(ward.name);
  const { mutateAsync: createWard, isPending } = useCreateWard();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createWard({
        name,
        wardType: ward.wardType,
        totalBeds: ward.totalBeds,
        inchargeNurseId: ward.inchargeNurseId ?? null,
      });
      toast.success(`Ward ${name} updated`);
      onClose();
    } catch {
      toast.error("Failed to update ward");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Ward Configuration"
      description={`Editing: ${ward.name}`}
      size="sm"
      footer={
        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={onClose}
            data-ocid="ward_config.cancel_button"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            type="submit"
            form="ward-config-form"
            disabled={isPending}
            data-ocid="ward_config.save_button"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      }
    >
      <form id="ward-config-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="ward-name">Ward Name</Label>
          <Input
            id="ward-name"
            className="mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            data-ocid="ward_config.name_input"
          />
        </div>
        <div>
          <Label>Ward Type</Label>
          <div className="mt-1 px-3 py-2 bg-muted/20 border border-border rounded-lg text-sm text-muted-foreground">
            {ward.wardType}
          </div>
        </div>
        <div>
          <Label>Total Beds</Label>
          <div className="mt-1 px-3 py-2 bg-muted/20 border border-border rounded-lg text-sm text-muted-foreground">
            {String(ward.totalBeds)}
          </div>
        </div>
        <div>
          <Label>Status</Label>
          <div className="mt-1">
            <StatusBadge status={ward.isActive ? "Active" : "Inactive"} />
          </div>
        </div>
      </form>
    </Modal>
  );
}

// ─── Assign Patient Modal ─────────────────────────────────────────────────────

function AssignPatientModal({
  open,
  onClose,
  bed,
  wardId,
}: {
  open: boolean;
  onClose: () => void;
  bed: Bed;
  wardId: bigint;
}) {
  const { data: patients } = usePatients();
  const { mutateAsync: admitPatient, isPending } = useAdmitPatient();
  const [selectedPatientId, setSelectedPatientId] = useState<string>("");

  const unassignedPatients =
    patients?.filter(
      (p) => p.status !== "Admitted" && p.status !== "Transferred",
    ) ?? [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatientId) return;
    try {
      await admitPatient({
        patientId: BigInt(selectedPatientId),
        bedId: bed.id,
        wardId,
      });
      toast.success(`Patient assigned to Bed ${bed.bedNumber}`);
      onClose();
    } catch {
      toast.error("Failed to assign patient");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Assign Patient to Bed"
      description={`Bed ${bed.bedNumber}`}
      size="sm"
      footer={
        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={onClose}
            data-ocid="assign_patient.cancel_button"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            type="submit"
            form="assign-patient-form"
            disabled={isPending || !selectedPatientId}
            data-ocid="assign_patient.submit_button"
          >
            {isPending ? "Assigning..." : "Assign"}
          </Button>
        </div>
      }
    >
      <form
        id="assign-patient-form"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <Label htmlFor="patient-select">Select Patient</Label>
          <Select
            value={selectedPatientId}
            onValueChange={setSelectedPatientId}
          >
            <SelectTrigger
              id="patient-select"
              className="mt-1"
              data-ocid="assign_patient.patient_select"
            >
              <SelectValue placeholder="Choose a patient..." />
            </SelectTrigger>
            <SelectContent>
              {unassignedPatients.length === 0 ? (
                <SelectItem value="none" disabled>
                  No available patients
                </SelectItem>
              ) : (
                unassignedPatients.map((p) => (
                  <SelectItem key={String(p.id)} value={String(p.id)}>
                    {p.firstName} {p.lastName} — {p.mrn}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
      </form>
    </Modal>
  );
}

// ─── Bed Grid for a single ward ───────────────────────────────────────────────

function BedGrid({
  ward,
  patients,
  erTriages,
}: {
  ward: Ward;
  patients: {
    id: bigint;
    firstName: string;
    lastName: string;
    admittedBedId?: bigint;
  }[];
  erTriages: { bedId?: bigint; esiLevel: bigint }[];
}) {
  const { data: beds, isLoading } = useBedsByWard(ward.id);
  const { mutateAsync: updateBedStatus, isPending } = useUpdateBedStatus();

  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);
  const [addBedOpen, setAddBedOpen] = useState(false);
  const [wardConfigOpen, setWardConfigOpen] = useState(false);
  const [assignPatientBed, setAssignPatientBed] = useState<Bed | null>(null);

  const getPatientForBed = (bed: Bed) => {
    if (!bed.patientId) return undefined;
    const p = patients.find((pt) => pt.id === bed.patientId);
    return p ? `${p.firstName} ${p.lastName}` : undefined;
  };

  const getEsiForBed = (bed: Bed): number | undefined => {
    const triage = erTriages.find(
      (t) => t.bedId !== undefined && t.bedId === bed.id,
    );
    return triage ? Number(triage.esiLevel) : undefined;
  };

  const handleStatusChange = async (
    bedId: bigint,
    status: BedStatus,
    hk: HousekeepingStatus,
  ) => {
    try {
      await updateBedStatus({
        bedId,
        status,
        housekeepingStatus: hk,
        notes: null,
      });
      toast.success(`Bed status updated to ${status}`);
      setSelectedBed(null);
    } catch {
      toast.error("Failed to update bed status");
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
        {["s0", "s1", "s2", "s3", "s4", "s5", "s6", "s7"].map((k) => (
          <Skeleton key={k} className="h-[88px] rounded-xl" />
        ))}
      </div>
    );
  }

  if (!beds || beds.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-10 text-center"
        data-ocid="ward.beds.empty_state"
      >
        <BedDouble className="h-10 w-10 text-muted-foreground/40 mb-3" />
        <p className="text-sm text-muted-foreground">
          No beds in this ward yet.
        </p>
        <Button
          size="sm"
          variant="outline"
          className="mt-3"
          type="button"
          onClick={() => setAddBedOpen(true)}
          data-ocid="ward.beds.add_first_button"
        >
          <Plus className="h-3.5 w-3.5 mr-1" /> Add First Bed
        </Button>
      </div>
    );
  }

  return (
    <>
      <WardStatsBar beds={beds} />

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-muted-foreground">
          {beds.length} beds &mdash; click a bed to manage
        </p>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            type="button"
            onClick={() => setWardConfigOpen(true)}
            data-ocid={`ward.config_button.${ward.wardType}`}
          >
            <Cog className="h-3.5 w-3.5 mr-1" /> Configure
          </Button>
          <Button
            size="sm"
            type="button"
            onClick={() => setAddBedOpen(true)}
            data-ocid={`ward.add_bed_button.${ward.wardType}`}
          >
            <Plus className="h-3.5 w-3.5 mr-1" /> Add Bed
          </Button>
        </div>
      </div>

      {/* Bed grid */}
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-12 gap-2">
        {beds.map((bed) => (
          <BedCard
            key={String(bed.id)}
            bed={bed}
            patientName={getPatientForBed(bed)}
            esiLevel={getEsiForBed(bed)}
            onClick={() => setSelectedBed(bed)}
          />
        ))}
      </div>

      {/* Bed detail panel */}
      {selectedBed && (
        <BedDetailPanel
          bed={selectedBed}
          patientName={getPatientForBed(selectedBed)}
          onClose={() => setSelectedBed(null)}
          onStatusChange={handleStatusChange}
          onAssignPatient={(b) => {
            setSelectedBed(null);
            setAssignPatientBed(b);
          }}
          isPending={isPending}
        />
      )}

      {/* Add bed modal */}
      <AddBedModal
        open={addBedOpen}
        onClose={() => setAddBedOpen(false)}
        wardId={ward.id}
        wardName={ward.name}
      />

      {/* Ward config modal */}
      <WardConfigModal
        open={wardConfigOpen}
        onClose={() => setWardConfigOpen(false)}
        ward={ward}
      />

      {/* Assign patient modal */}
      {assignPatientBed && (
        <AssignPatientModal
          open={!!assignPatientBed}
          onClose={() => setAssignPatientBed(null)}
          bed={assignPatientBed}
          wardId={ward.id}
        />
      )}
    </>
  );
}

// ─── Transfer Requests (mock/static for now) ──────────────────────────────────

const MOCK_TRANSFERS = [
  {
    id: "t1",
    patient: "Arun Mehta",
    from: "G-201",
    to: "ICU-03",
    requester: "Dr. Sharma",
    status: "Pending",
  },
  {
    id: "t2",
    patient: "Priya Kapoor",
    from: "M-101",
    to: "P-02",
    requester: "Dr. Rajan",
    status: "Pending",
  },
];

function TransferRequestsTable() {
  const [transfers, setTransfers] = useState(MOCK_TRANSFERS);
  const { user } = useAuth();
  const isAdmin = user?.role === "SuperAdmin" || user?.role === "Nurse";

  const handleAction = (id: string, action: "approve" | "reject") => {
    setTransfers((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: action === "approve" ? "Approved" : "Rejected" }
          : t,
      ),
    );
    toast.success(
      `Transfer request ${action === "approve" ? "approved" : "rejected"}`,
    );
  };

  return (
    <div
      className="bg-card border border-border rounded-xl p-5"
      data-ocid="ward.transfer_requests.panel"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground">Transfer Requests</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Pending bed transfer approvals
          </p>
        </div>
        <StatusBadge
          status={`${transfers.filter((t) => t.status === "Pending").length} Pending`}
          variant="warning"
        />
      </div>

      {transfers.length === 0 ? (
        <p
          className="text-sm text-muted-foreground text-center py-6"
          data-ocid="ward.transfer_requests.empty_state"
        >
          No pending transfer requests
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {[
                  "Patient",
                  "From Bed",
                  "To Bed",
                  "Requester",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs text-muted-foreground font-medium py-2 px-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transfers.map((t, idx) => (
                <tr
                  key={t.id}
                  className="border-b border-border/50 hover:bg-muted/10 transition-colors"
                  data-ocid={`ward.transfer.item.${idx + 1}`}
                >
                  <td className="py-2.5 px-3 font-medium text-foreground">
                    {t.patient}
                  </td>
                  <td className="py-2.5 px-3 text-muted-foreground">
                    {t.from}
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">{t.from}</span>
                      <ChevronRight className="h-3 w-3 text-muted-foreground" />
                      <span className="text-accent font-medium">{t.to}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-muted-foreground">
                    {t.requester}
                  </td>
                  <td className="py-2.5 px-3">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="py-2.5 px-3">
                    {t.status === "Pending" && isAdmin && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          type="button"
                          className="h-6 text-xs"
                          onClick={() => handleAction(t.id, "approve")}
                          data-ocid={`ward.transfer.approve_button.${idx + 1}`}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          type="button"
                          className="h-6 text-xs text-red-400 border-red-500/30 hover:bg-red-500/10"
                          onClick={() => handleAction(t.id, "reject")}
                          data-ocid={`ward.transfer.reject_button.${idx + 1}`}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Main Ward Page ───────────────────────────────────────────────────────────

export function WardPage() {
  const [activeTab, setActiveTab] = useState<WardType>(WardType.General);
  const { data: wards, isLoading: wardsLoading } = useWards();
  const { data: patients } = usePatients();

  // ER triage data for ESI colouring (polled every 5s via refetchInterval in useBedsByWard)
  // We pass mock ER triage data through — in a real system this comes from useActiveERTriages
  const erTriages: { bedId?: bigint; esiLevel: bigint }[] = [];

  const activeWard = wards?.find((w) => w.wardType === activeTab);

  const patientList = (patients ?? []).map((p) => ({
    id: p.id,
    firstName: p.firstName,
    lastName: p.lastName,
    admittedBedId: p.admittedBedId,
  }));

  return (
    <div data-ocid="ward.page">
      <PageHeader
        title="Ward & Bed Management"
        description="Visual bed map, occupancy tracking, and real-time ER monitoring"
        breadcrumb={["Clinical", "Ward & Beds"]}
        actions={
          activeTab === WardType.Emergency ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/30 rounded-lg">
              <RefreshCw
                className="h-3.5 w-3.5 text-red-400 animate-spin"
                style={{ animationDuration: "3s" }}
              />
              <span className="text-xs text-red-400 font-medium">
                Live · 5s
              </span>
            </div>
          ) : undefined
        }
      />

      {/* Ward type tabs */}
      <div
        className="flex gap-1 bg-muted/30 border border-border rounded-xl p-1 mb-6 overflow-x-auto"
        data-ocid="ward.tab_bar"
      >
        {WARD_TYPE_TABS.map((wt) => {
          const isActive = activeTab === wt;
          const wardExists = wards?.some((w) => w.wardType === wt);
          return (
            <button
              key={wt}
              type="button"
              onClick={() => setActiveTab(wt)}
              data-ocid={`ward.tab.${wt.toLowerCase()}`}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth flex-1 justify-center",
                isActive
                  ? wt === WardType.Emergency
                    ? "bg-red-500/20 text-red-300 shadow-sm"
                    : "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/50",
              )}
            >
              {WARD_TYPE_LABELS[wt]}
              {!wardExists && !wardsLoading && (
                <span className="text-[9px] bg-muted/40 text-muted-foreground px-1 rounded">
                  setup
                </span>
              )}
              {wt === WardType.Emergency && isActive && (
                <AlertTriangle className="h-3 w-3 text-red-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div
        className="bg-card border border-border rounded-xl p-5"
        data-ocid="ward.ward_panel"
      >
        {wardsLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full rounded-lg" />
            <div className="grid grid-cols-5 gap-3">
              {["s0", "s1", "s2", "s3", "s4"].map((k) => (
                <Skeleton key={k} className="h-14 rounded-lg" />
              ))}
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {["b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7"].map((k) => (
                <Skeleton key={k} className="h-[88px] rounded-xl" />
              ))}
            </div>
          </div>
        ) : !activeWard ? (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="ward.no_ward_empty_state"
          >
            <BedDouble className="h-14 w-14 text-muted-foreground/30 mb-4" />
            <h3 className="text-base font-semibold text-foreground mb-1">
              {activeTab} Ward Not Configured
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              This ward type has not been created yet. Use System Administration
              to configure wards.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center text-lg",
                  activeTab === WardType.Emergency
                    ? "bg-red-500/20"
                    : "bg-accent/15",
                )}
              >
                {activeTab === WardType.ICU
                  ? "🏥"
                  : activeTab === WardType.Emergency
                    ? "🚑"
                    : activeTab === WardType.Maternity
                      ? "👶"
                      : activeTab === WardType.Private
                        ? "🚪"
                        : "🛏️"}
              </div>
              <div>
                <h2 className="font-semibold text-foreground">
                  {activeWard.name}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {activeWard.wardType} · Capacity:{" "}
                  {String(activeWard.totalBeds)} beds
                  {activeTab === WardType.Emergency && " · Polling every 5s"}
                </p>
              </div>
              <div className="ml-auto">
                <StatusBadge
                  status={activeWard.isActive ? "Active" : "Inactive"}
                />
              </div>
            </div>

            <BedGrid
              ward={activeWard}
              patients={patientList}
              erTriages={erTriages}
            />
          </div>
        )}
      </div>

      {/* Transfer Requests */}
      <div className="mt-6">
        <TransferRequestsTable />
      </div>
    </div>
  );
}
