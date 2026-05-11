import { createActor } from "@/backend";
import type {
  BedId,
  DoctorId,
  ERStatus,
  ERTriageId,
  PatientId,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useERTriages() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["erTriages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getERTriages();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000,
  });
}

export function useActiveERTriages() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["erTriages", "active"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getActiveERTriages();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000,
  });
}

export function useCreateERTriage() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      patientId: PatientId | null;
      esiLevel: bigint;
      chiefComplaint: string;
      isTraumaCase: boolean;
      isUnknownPatient: boolean;
      bedId: BedId | null;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createERTriage(
        args.patientId,
        args.esiLevel,
        args.chiefComplaint,
        args.isTraumaCase,
        args.isUnknownPatient,
        args.bedId,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["erTriages"] }),
  });
}

export function useUpdateERTriage() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      id: ERTriageId;
      status: ERStatus;
      treatedByDoctorId: DoctorId | null;
      bedId: BedId | null;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateERTriage(
        args.id,
        args.status,
        args.treatedByDoctorId,
        args.bedId,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["erTriages"] }),
  });
}
