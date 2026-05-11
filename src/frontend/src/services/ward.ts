import { createActor } from "@/backend";
import type {
  BedId,
  BedStatus,
  HousekeepingStatus,
  UserId,
  WardId,
  WardType,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useWards() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["wards"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWards();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBeds() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["beds"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBeds();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000,
  });
}

export function useBedsByWard(wardId: WardId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["beds", "ward", wardId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBedsByWard(wardId);
    },
    enabled: !!actor && !isFetching && !!wardId,
    refetchInterval: 5000,
  });
}

export function useCreateWard() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      name: string;
      wardType: WardType;
      totalBeds: bigint;
      inchargeNurseId: UserId | null;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createWard(
        args.name,
        args.wardType,
        args.totalBeds,
        args.inchargeNurseId,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["wards"] }),
  });
}

export function useCreateBed() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: { wardId: WardId; bedNumber: string }) => {
      if (!actor) throw new Error("No actor");
      return actor.createBed(args.wardId, args.bedNumber);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["beds"] }),
  });
}

export function useUpdateBedStatus() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      bedId: BedId;
      status: BedStatus;
      housekeepingStatus: HousekeepingStatus;
      notes: string | null;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateBedStatus(
        args.bedId,
        args.status,
        args.housekeepingStatus,
        args.notes,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["beds"] }),
  });
}
