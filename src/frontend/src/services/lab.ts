import { createActor } from "@/backend";
import type {
  DoctorId,
  LabOrderId,
  LabStatus,
  PatientId,
  VisitId,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useLabOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["labOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLabOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useLabOrdersByPatient(patientId: PatientId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["labOrders", "patient", patientId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLabOrdersByPatient(patientId);
    },
    enabled: !!actor && !isFetching && !!patientId,
  });
}

export function useCreateLabOrder() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      patientId: PatientId;
      doctorId: DoctorId;
      visitId: VisitId | null;
      testType: string;
      testName: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createLabOrder(
        args.patientId,
        args.doctorId,
        args.visitId,
        args.testType,
        args.testName,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["labOrders"] }),
  });
}

export function useUpdateLabResult() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      id: LabOrderId;
      resultValue: string | null;
      resultFile: string | null;
      isCritical: boolean;
      referenceRange: string | null;
      notes: string | null;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateLabOrderResult(
        args.id,
        args.resultValue,
        args.resultFile,
        args.isCritical,
        args.referenceRange,
        args.notes,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["labOrders"] }),
  });
}

export function useUpdateLabStatus() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: { id: LabOrderId; status: LabStatus }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateLabOrderStatus(args.id, args.status);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["labOrders"] }),
  });
}
