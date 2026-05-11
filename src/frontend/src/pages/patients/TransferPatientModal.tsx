import type { Bed, Patient, Ward } from "@/backend";
import { BedStatus } from "@/backend";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useTransferPatient } from "@/services/patients";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface Props {
  patient: Patient;
  wards: Ward[];
  beds: Bed[];
  onClose: () => void;
}

export function TransferPatientModal({ patient, wards, beds, onClose }: Props) {
  const [wardId, setWardId] = useState("");
  const [bedId, setBedId] = useState("");
  const transferPatient = useTransferPatient();

  const availableBeds = useMemo(() => {
    if (!wardId) return [];
    return beds.filter(
      (b) =>
        b.wardId.toString() === wardId &&
        b.status === BedStatus.Available &&
        b.id.toString() !== patient.admittedBedId?.toString(),
    );
  }, [beds, wardId, patient.admittedBedId]);

  const selectedWard = wards.find((w) => w.id.toString() === wardId);
  const currentWard = wards.find(
    (w) => w.id.toString() === patient.wardId?.toString(),
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wardId || !bedId) {
      toast.error("Please select a new ward and bed.");
      return;
    }
    const ward = wards.find((w) => w.id.toString() === wardId);
    const bed = beds.find((b) => b.id.toString() === bedId);
    if (!ward || !bed) return;
    try {
      await transferPatient.mutateAsync({
        patientId: patient.id,
        newWardId: ward.id,
        newBedId: bed.id,
      });
      toast.success(
        `${patient.firstName} ${patient.lastName} transferred to ${ward.name} — Bed ${bed.bedNumber}.`,
      );
      onClose();
    } catch (_err) {
      toast.error("Failed to transfer patient.");
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      title="Transfer Patient"
      description={`Move ${patient.firstName} ${patient.lastName} to a new ward`}
      size="md"
      footer={
        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-ocid="transfer_patient.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="transfer-patient-form"
            disabled={transferPatient.isPending || !wardId || !bedId}
            data-ocid="transfer_patient.submit_button"
          >
            {transferPatient.isPending ? "Transferring…" : "Transfer Patient"}
          </Button>
        </div>
      }
    >
      <form
        id="transfer-patient-form"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border">
          <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
            <RefreshCw className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="font-medium text-foreground">
              {patient.firstName} {patient.lastName}
            </p>
            <p className="text-xs text-muted-foreground">
              Currently in: <strong>{currentWard?.name ?? "Unknown"}</strong>
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">New Ward *</Label>
          <select
            value={wardId}
            onChange={(e) => {
              setWardId(e.target.value);
              setBedId("");
            }}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground"
            required
            data-ocid="transfer_patient.ward_select"
          >
            <option value="">Select new ward…</option>
            {wards
              .filter(
                (w) =>
                  w.isActive && w.id.toString() !== patient.wardId?.toString(),
              )
              .map((w) => (
                <option key={w.id.toString()} value={w.id.toString()}>
                  {w.name} ({w.wardType})
                </option>
              ))}
          </select>
        </div>

        {wardId && (
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Available Bed * ({availableBeds.length} available)
            </Label>
            {availableBeds.length === 0 ? (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                No available beds in {selectedWard?.name}. Please select another
                ward.
              </div>
            ) : (
              <select
                value={bedId}
                onChange={(e) => setBedId(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground"
                required
                data-ocid="transfer_patient.bed_select"
              >
                <option value="">Select bed…</option>
                {availableBeds.map((b) => (
                  <option key={b.id.toString()} value={b.id.toString()}>
                    Bed {b.bedNumber}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}
      </form>
    </Modal>
  );
}
