import { createActor } from "@/backend";
import type {
  IndentId,
  IndentItem,
  IndentStatus,
  SupplierId,
  UserId,
  WardId,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useEquipment() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["equipment"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEquipment();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useConsumables() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["consumables"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getConsumables();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSuppliers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["suppliers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSuppliers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIndents() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["indents"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getIndentRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateEquipmentItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      name: string;
      category: string;
      serialNumber: string;
      purchaseDate: string;
      cost: bigint;
      wardId: WardId | null;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createEquipmentItem(
        args.name,
        args.category,
        args.serialNumber,
        args.purchaseDate,
        args.cost,
        args.wardId,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["equipment"] }),
  });
}

export function useCreateConsumable() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      name: string;
      quantity: bigint;
      reorderLevel: bigint;
      unitCost: bigint;
      supplierId: SupplierId | null;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createConsumable(
        args.name,
        args.quantity,
        args.reorderLevel,
        args.unitCost,
        args.supplierId,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["consumables"] }),
  });
}

export function useCreateSupplier() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      name: string;
      phone: string;
      email: string;
      address: string;
      categories: string[];
      paymentTerms: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createSupplier(
        args.name,
        args.phone,
        args.email,
        args.address,
        args.categories,
        args.paymentTerms,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["suppliers"] }),
  });
}

export function useCreateIndent() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      requestedById: UserId;
      items: IndentItem[];
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createIndentRequest(args.requestedById, args.items);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["indents"] }),
  });
}

export function useUpdateIndentStatus() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: { id: IndentId; status: IndentStatus }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateIndentStatus(args.id, args.status);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["indents"] }),
  });
}
