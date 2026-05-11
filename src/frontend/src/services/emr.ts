import { createActor } from "@/backend";
import type {
  Diagnosis,
  DoctorId,
  PatientId,
  Prescription,
  SOAPNotes,
  VisitId,
  VitalSigns,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useVisits() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["visits"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getVisits();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useVisitsByPatient(patientId: PatientId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["visits", "patient", patientId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getVisitsByPatient(patientId);
    },
    enabled: !!actor && !isFetching && !!patientId,
  });
}

export function useVisit(id: VisitId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["visit", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getVisit(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useCreateVisit() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      patientId: PatientId;
      doctorId: DoctorId;
      chiefComplaint: string;
      soapNotes: SOAPNotes;
      diagnoses: Diagnosis[];
      prescriptions: Prescription[];
      vitals: VitalSigns | null;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createVisit(
        args.patientId,
        args.doctorId,
        args.chiefComplaint,
        args.soapNotes,
        args.diagnoses,
        args.prescriptions,
        args.vitals,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["visits"] }),
  });
}

export function useUpdateVisit() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      id: VisitId;
      soapNotes: SOAPNotes;
      diagnoses: Diagnosis[];
      prescriptions: Prescription[];
      vitals: VitalSigns | null;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateVisit(
        args.id,
        args.soapNotes,
        args.diagnoses,
        args.prescriptions,
        args.vitals,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["visits"] }),
  });
}

export function usePrescriptionsByPatient(patientId: PatientId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["prescriptions", patientId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPrescriptionsByPatient(patientId);
    },
    enabled: !!actor && !isFetching && !!patientId,
  });
}
