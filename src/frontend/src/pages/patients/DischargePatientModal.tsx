import type { Patient } from "@/backend";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDischargePatient } from "@/services/patients";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  patient: Patient;
  onClose: () => void;
}

export function DischargePatientModal({ patient, onClose }: Props) {
  const [summary, setSummary] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const dischargePatient = useDischargePatient();

  const handleDischarge = async () => {
    if (!confirmed) {
      toast.error("Please confirm the discharge.");
      return;
    }
    try {
      await dischargePatient.mutateAsync(patient.id);
      toast.success(
        `${patient.firstName} ${patient.lastName} has been discharged.`,
      );
      onClose();
    } catch (_err) {
      toast.error("Failed to discharge patient.");
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      title="Discharge Patient"
      description="This action will free the assigned bed and update patient status"
      size="md"
      footer={
        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-ocid="discharge_patient.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDischarge}
            disabled={dischargePatient.isPending || !confirmed}
            data-ocid="discharge_patient.confirm_button"
          >
            {dischargePatient.isPending ? "Discharging…" : "Confirm Discharge"}
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border">
          <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
            <LogOut className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <p className="font-medium text-foreground">
              {patient.firstName} {patient.lastName}
            </p>
            <p className="text-xs text-muted-foreground">
              MRN: {patient.mrn} · Status: {patient.status}
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">
            Discharge Summary (optional)
          </Label>
          <Textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Brief summary of the patient's treatment, condition at discharge, follow-up instructions…"
            rows={4}
            data-ocid="discharge_patient.summary_textarea"
          />
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-0.5 accent-destructive"
            data-ocid="discharge_patient.confirm_checkbox"
          />
          <span className="text-sm text-foreground">
            I confirm that{" "}
            <strong>
              {patient.firstName} {patient.lastName}
            </strong>{" "}
            is ready for discharge and the assigned bed should be freed.
          </span>
        </label>

        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs">
          ⚠ This action cannot be undone. The bed will become available for new
          admissions.
        </div>
      </div>
    </Modal>
  );
}
