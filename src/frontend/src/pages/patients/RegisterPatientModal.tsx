import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreatePatient, useUpdatePatient } from "@/services/patients";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
}

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const GENDERS = ["Male", "Female", "Other"];

interface FormState {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  phone: string;
  email: string;
  address: string;
  emergencyContact: string;
  allergies: string[];
  allergyInput: string;
  insuranceId: string;
  insuranceProvider: string;
  patientType: "OPD" | "IPD";
  notes: string;
}

const INITIAL: FormState = {
  firstName: "",
  lastName: "",
  dob: "",
  gender: "Male",
  bloodGroup: "O+",
  phone: "",
  email: "",
  address: "",
  emergencyContact: "",
  allergies: [],
  allergyInput: "",
  insuranceId: "",
  insuranceProvider: "",
  patientType: "OPD",
  notes: "",
};

export function RegisterPatientModal({ open, onClose }: Props) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const createPatient = useCreatePatient();
  const updatePatient = useUpdatePatient();

  const set = (k: keyof FormState, v: FormState[keyof FormState]) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const addAllergy = () => {
    const val = form.allergyInput.trim();
    if (val && !form.allergies.includes(val)) {
      setForm((prev) => ({
        ...prev,
        allergies: [...prev.allergies, val],
        allergyInput: "",
      }));
    }
  };

  const removeAllergy = (a: string) =>
    setForm((prev) => ({
      ...prev,
      allergies: prev.allergies.filter((x) => x !== a),
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.phone.trim() ||
      !form.dob
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      const newPatient = await createPatient.mutateAsync({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        dob: form.dob,
        gender: form.gender,
        bloodGroup: form.bloodGroup,
        phone: form.phone.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        emergencyContact: form.emergencyContact.trim(),
      });
      // Persist allergies and insurance via updatePatient
      if (
        form.allergies.length > 0 ||
        form.insuranceProvider ||
        form.insuranceId
      ) {
        await updatePatient.mutateAsync({
          id: newPatient.id,
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          address: form.address.trim(),
          bloodGroup: form.bloodGroup,
          allergies: form.allergies,
          insuranceProvider: form.insuranceProvider.trim() || null,
          insuranceId: form.insuranceId.trim() || null,
        });
      }
      toast.success(
        `Patient ${form.firstName} ${form.lastName} registered successfully.`,
      );
      setForm(INITIAL);
      onClose();
    } catch (_err) {
      toast.error("Failed to register patient. Please try again.");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Register New Patient"
      description="Fill in the patient's personal and medical details"
      size="xl"
      footer={
        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-ocid="register_patient.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="register-patient-form"
            disabled={createPatient.isPending}
            data-ocid="register_patient.submit_button"
          >
            {createPatient.isPending ? "Registering…" : "Register Patient"}
          </Button>
        </div>
      }
    >
      <form
        id="register-patient-form"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Personal Info */}
        <Section title="Personal Information">
          <div className="grid grid-cols-2 gap-4">
            <Field label="First Name *">
              <Input
                value={form.firstName}
                onChange={(e) => set("firstName", e.target.value)}
                placeholder="John"
                required
                data-ocid="register_patient.first_name_input"
              />
            </Field>
            <Field label="Last Name *">
              <Input
                value={form.lastName}
                onChange={(e) => set("lastName", e.target.value)}
                placeholder="Doe"
                required
                data-ocid="register_patient.last_name_input"
              />
            </Field>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Date of Birth *">
              <Input
                type="date"
                value={form.dob}
                onChange={(e) => set("dob", e.target.value)}
                required
                data-ocid="register_patient.dob_input"
              />
            </Field>
            <Field label="Gender">
              <select
                value={form.gender}
                onChange={(e) => set("gender", e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground"
                data-ocid="register_patient.gender_select"
              >
                {GENDERS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Blood Group">
              <select
                value={form.bloodGroup}
                onChange={(e) => set("bloodGroup", e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground"
                data-ocid="register_patient.blood_group_select"
              >
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Patient Type">
            <div className="flex gap-4">
              {(["OPD", "IPD"] as const).map((t) => (
                <label
                  key={t}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="patientType"
                    value={t}
                    checked={form.patientType === t}
                    onChange={() => set("patientType", t)}
                    className="accent-accent"
                    data-ocid={`register_patient.type_${t.toLowerCase()}_radio`}
                  />
                  <span className="text-sm text-foreground">{t}</span>
                </label>
              ))}
            </div>
          </Field>
        </Section>

        {/* Contact Info */}
        <Section title="Contact Details">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Phone *">
              <Input
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+1 555 000 0000"
                required
                data-ocid="register_patient.phone_input"
              />
            </Field>
            <Field label="Email">
              <Input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="patient@example.com"
                data-ocid="register_patient.email_input"
              />
            </Field>
          </div>
          <Field label="Address">
            <Input
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
              placeholder="123 Main St, City, State"
              data-ocid="register_patient.address_input"
            />
          </Field>
          <Field label="Emergency Contact">
            <Input
              value={form.emergencyContact}
              onChange={(e) => set("emergencyContact", e.target.value)}
              placeholder="Name: Jane Doe, Phone: +1 555 111 2222"
              data-ocid="register_patient.emergency_contact_input"
            />
          </Field>
        </Section>

        {/* Medical */}
        <Section title="Medical Information">
          <Field label="Allergies">
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={form.allergyInput}
                  onChange={(e) => set("allergyInput", e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addAllergy();
                    }
                  }}
                  placeholder="Type allergy and press Enter or Add"
                  data-ocid="register_patient.allergy_input"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addAllergy}
                  data-ocid="register_patient.add_allergy_button"
                >
                  Add
                </Button>
              </div>
              {form.allergies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {form.allergies.map((a) => (
                    <span
                      key={a}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-destructive/15 text-destructive border border-destructive/30"
                    >
                      {a}
                      <button
                        type="button"
                        onClick={() => removeAllergy(a)}
                        className="hover:text-foreground transition-colors"
                        aria-label={`Remove ${a}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Field>
          <Field label="Notes">
            <Textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Additional notes about the patient…"
              rows={2}
              data-ocid="register_patient.notes_textarea"
            />
          </Field>
        </Section>

        {/* Insurance */}
        <Section title="Insurance">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Insurance Provider">
              <Input
                value={form.insuranceProvider}
                onChange={(e) => set("insuranceProvider", e.target.value)}
                placeholder="Blue Cross Blue Shield"
                data-ocid="register_patient.insurance_provider_input"
              />
            </Field>
            <Field label="Insurance ID">
              <Input
                value={form.insuranceId}
                onChange={(e) => set("insuranceId", e.target.value)}
                placeholder="INS-0000-0000"
                data-ocid="register_patient.insurance_id_input"
              />
            </Field>
          </div>
        </Section>
      </form>
    </Modal>
  );
}

function Section({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground border-b border-border pb-1">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Field({
  label,
  children,
}: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
