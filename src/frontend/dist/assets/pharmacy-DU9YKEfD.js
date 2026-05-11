import { Y as useActor, Z as useQuery, _ as useQueryClient, $ as useMutation, a0 as createActor } from "./index-BGDDM1OA.js";
function useDrugs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["drugs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDrugs();
    },
    enabled: !!actor && !isFetching
  });
}
function useLowStockDrugs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["drugs", "lowStock"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLowStockDrugs();
    },
    enabled: !!actor && !isFetching
  });
}
function usePurchaseOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["purchaseOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPurchaseOrders();
    },
    enabled: !!actor && !isFetching
  });
}
function useCreateDrug() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args) => {
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
        args.supplierId
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["drugs"] })
  });
}
function useUpdateDrugStock() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args) => {
      if (!actor) throw new Error("No actor");
      return actor.updateDrugStock(args.drugId, args.quantityChange);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["drugs"] })
  });
}
function useCreatePurchaseOrder() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args) => {
      if (!actor) throw new Error("No actor");
      return actor.createPurchaseOrder(
        args.supplierId,
        args.items,
        args.expectedDelivery
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["purchaseOrders"] })
  });
}
function useDispensePrescription() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args) => {
      if (!actor) throw new Error("No actor");
      return actor.dispensePrescription(args.visitId, args.drugName);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["drugs"] })
  });
}
export {
  useLowStockDrugs as a,
  usePurchaseOrders as b,
  useCreateDrug as c,
  useUpdateDrugStock as d,
  useDispensePrescription as e,
  useCreatePurchaseOrder as f,
  useDrugs as u
};
