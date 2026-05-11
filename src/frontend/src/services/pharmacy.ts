import { createActor } from "@/backend";
import type { DrugId, POItem, SupplierId, VisitId } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useDrugs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["drugs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDrugs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useLowStockDrugs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["drugs", "lowStock"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLowStockDrugs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePurchaseOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["purchaseOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPurchaseOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateDrug() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      name: string;
      genericName: string;
      dosageForm: string;
      strength: string;
      category: string;
      quantityOnHand: bigint;
      reorderLevel: bigint;
      expiryDate: string;
      batchNo: string;
      costPrice: bigint;
      sellingPrice: bigint;
      supplierId: SupplierId | null;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createDrug(
        args.name,
        args.genericName,
        args.dosageForm,
        args.strength,
        args.category,
        args.quantityOnHand,
        args.reorderLevel,
        args.expiryDate,
        args.batchNo,
        args.costPrice,
        args.sellingPrice,
        args.supplierId,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["drugs"] }),
  });
}

export function useUpdateDrugStock() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: { drugId: DrugId; quantityChange: bigint }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateDrugStock(args.drugId, args.quantityChange);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["drugs"] }),
  });
}

export function useCreatePurchaseOrder() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      supplierId: SupplierId;
      items: POItem[];
      expectedDelivery: string | null;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createPurchaseOrder(
        args.supplierId,
        args.items,
        args.expectedDelivery,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["purchaseOrders"] }),
  });
}

export function useDispensePrescription() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: { visitId: VisitId; drugName: string }) => {
      if (!actor) throw new Error("No actor");
      return actor.dispensePrescription(args.visitId, args.drugName);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["drugs"] }),
  });
}
