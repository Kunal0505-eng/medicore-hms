import { createActor } from "@/backend";
import type {
  BillId,
  BillItem,
  BillType,
  PatientId,
  PaymentMode,
  VisitId,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useBills() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["bills"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBills();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBillsByPatient(patientId: PatientId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["bills", "patient", patientId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBillsByPatient(patientId);
    },
    enabled: !!actor && !isFetching && !!patientId,
  });
}

export function useServices() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateBill() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      patientId: PatientId;
      visitId: VisitId | null;
      billType: BillType;
      items: BillItem[];
      discountPercent: bigint;
      paymentMode: PaymentMode | null;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createBill(
        args.patientId,
        args.visitId,
        args.billType,
        args.items,
        args.discountPercent,
        args.paymentMode,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bills"] }),
  });
}

export function useProcessPayment() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      id: BillId;
      paidAmount: bigint;
      paymentMode: PaymentMode;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateBillPayment(
        args.id,
        args.paidAmount,
        args.paymentMode,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bills"] }),
  });
}

export function useCreateService() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      name: string;
      category: string;
      basePrice: bigint;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createService(args.name, args.category, args.basePrice);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}
