import type { Bed, Patient, Ward } from "@/backend";
import { BedStatus } from "@/backend";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdmitPatient } from "@/services/patients";
import { AlertTriangle, Bed as BedIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface Props {
  patient: Patient;
  wards: Ward[];
  beds: Bed[];
  onClose: () => void;
}

export function AdmitPatientModal({ patient, wards, beds, onClose }: Props) {
  const [wardId, setWardId] = useState("");
  const [bedId, setBedId] = useState("");
  const [admissionDate, setAdmissionDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const admitPatient = useAdmitPatient();

  const availableBedsInWard = useMemo(() => {
    if (!wardId) return [];
    return beds.filter(
      (b) => b.wardId.toString() === wardId && b.status === BedStatus.Available,
    );
  }, [beds, wardId]);

  const selectedWard = wards.find((w) => w.id.toString() === wardId);
  const selectedBed = beds.find((b) => b.id.toString() === bedId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wardId || !bedId) {
      toast.error("Please select a ward and bed.");
      return;
    }
    const ward = wards.find((w) => w.id.toString() === wardId);
    const bed = beds.find((b) => b.id.toString() === bedId);
    if (!ward || !bed) return;
    if (bed.status !== BedStatus.Available) {
      toast.error("Selected bed is no longer available.");
      return;
    }
    try {
      await admitPatient.mutateAsync({
        patientId: patient.id,
        bedId: bed.id,
        wardId: ward.id,
      });
      toast.success(
        `${patient.firstName} ${patient.lastName} admitted to ${ward.name} — Bed ${bed.bedNumber}.`,
      );
      onClose();
    } catch (_err) {
      toast.error("Failed to admit patient.");
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      title="Admit Patient"
      description={`Assign ${patient.firstName} ${patient.lastName} to a ward and bed`}
      size="md"
      footer={
        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-ocid="admit_patient.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="admit-patient-form"
            disabled={admitPatient.isPending || !wardId || !bedId}
            data-ocid="admit_patient.submit_button"
          >
            {admitPatient.isPending ? "Admitting…" : "Admit Patient"}
          </Button>
        </div>
      }
    >
      <form
        id="admit-patient-form"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Patient summary */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <BedIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">
              {patient.firstName} {patient.lastName}
            </p>
            <p className="text-xs text-muted-foreground">
              MRN: {patient.mrn} · {patient.bloodGroup} · {patient.gender}
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Ward *</Label>
          <select
            value={wardId}
            onChange={(e) => {
              setWardId(e.target.value);
              setBedId("");
            }}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground"
            required
            data-ocid="admit_patient.ward_select"
          >
            <option value="">Select ward…</option>
            {wards
              .filter((w) => w.isActive)
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
              Available Bed * ({availableBedsInWard.length} available)
            </Label>
            {availableBedsInWard.length === 0 ? (
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
                data-ocid="admit_patient.bed_select"
              >
                <option value="">Select bed…</option>
                {availableBedsInWard.map((b) => (
                  <option key={b.id.toString()} value={b.id.toString()}>
                    Bed {b.bedNumber}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">
            Admission Date
          </Label>
          <Input
            type="date"
            value={admissionDate}
            onChange={(e) => setAdmissionDate(e.target.value)}
            data-ocid="admit_patient.admission_date_input"
          />
        </div>

        {selectedBed && (
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-sm text-green-400">
            ✓ Bed <strong>{selectedBed.bedNumber}</strong> in{" "}
            <strong>{selectedWard?.name}</strong> is available.
          </div>
        )}
      </form>
    </Modal>
  );
}
