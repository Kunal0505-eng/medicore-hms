import { createActor } from "@/backend";
import type { UserId, UserRole, UserStatus } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useUsers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUsers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useHospitalProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["hospitalProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getHospitalProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAuditLogs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["auditLogs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAuditLogs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateUser() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      principal: Principal;
      name: string;
      email: string;
      role: UserRole;
      departmentId: string | null;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createUser(
        args.principal,
        args.name,
        args.email,
        args.role,
        args.departmentId,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useUpdateUserStatus() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: { id: UserId; status: UserStatus }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateUserStatus(args.id, args.status);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useUpdateHospitalProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      name: string;
      address: string;
      phone: string;
      email: string;
      registrationNo: string;
      timezone: string;
      currency: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateHospitalProfile(
        args.name,
        args.address,
        args.phone,
        args.email,
        args.registrationNo,
        args.timezone,
        args.currency,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["hospitalProfile"] }),
  });
}

export function useInitSampleData() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.initSampleData();
    },
    onSuccess: () => qc.invalidateQueries(),
  });
}
