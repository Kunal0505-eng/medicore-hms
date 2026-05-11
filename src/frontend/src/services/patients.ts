import { createActor } from "@/backend";
import type { BedId, PatientId, WardId } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function usePatients() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPatients();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePatient(id: PatientId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["patient", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPatient(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useCreatePatient() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      firstName: string;
      lastName: string;
      dob: string;
      gender: string;
      bloodGroup: string;
      phone: string;
      email: string;
      address: string;
      emergencyContact: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createPatient(
        args.firstName,
        args.lastName,
        args.dob,
        args.gender,
        args.bloodGroup,
        args.phone,
        args.email,
        args.address,
        args.emergencyContact,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["patients"] }),
  });
}

export function useUpdatePatient() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      id: PatientId;
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
      address: string;
      allergies: string[];
      bloodGroup: string;
      insuranceId: string | null;
      insuranceProvider: string | null;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.updatePatient(
        args.id,
        args.firstName,
        args.lastName,
        args.phone,
        args.email,
        args.address,
        args.allergies,
        args.bloodGroup,
        args.insuranceId,
        args.insuranceProvider,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["patients"] }),
  });
}

export function useAdmitPatient() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      patientId: PatientId;
      bedId: BedId;
      wardId: WardId;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.admitPatient(args.patientId, args.bedId, args.wardId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["patients"] });
      qc.invalidateQueries({ queryKey: ["beds"] });
    },
  });
}

export function useDischargePatient() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (patientId: PatientId) => {
      if (!actor) throw new Error("No actor");
      return actor.dischargePatient(patientId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["patients"] });
      qc.invalidateQueries({ queryKey: ["beds"] });
    },
  });
}

export function useTransferPatient() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      patientId: PatientId;
      newWardId: WardId;
      newBedId: BedId;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.transferPatient(
        args.patientId,
        args.newWardId,
        args.newBedId,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["patients"] }),
  });
}
