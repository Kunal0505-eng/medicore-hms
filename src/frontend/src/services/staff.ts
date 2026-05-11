import { createActor } from "@/backend";
import type {
  DoctorId,
  LeaveRequestId,
  LeaveStatus,
  ShiftType,
  UserId,
  WardId,
  WorkingHours,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useDoctors() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDoctors();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDoctor(id: DoctorId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["doctor", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getDoctor(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useDutyRoster() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["dutyRoster"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDutyRoster();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useLeaveRequests() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["leaveRequests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLeaveRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateDoctorProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      userId: UserId;
      specialization: string;
      qualifications: string[];
      departmentId: string | null;
      consultationFee: bigint;
      schedule: WorkingHours[];
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createDoctorProfile(
        args.userId,
        args.specialization,
        args.qualifications,
        args.departmentId,
        args.consultationFee,
        args.schedule,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["doctors"] }),
  });
}

export function useCreateDutyRoster() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      userId: UserId;
      date: string;
      shift: ShiftType;
      wardId: WardId | null;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createDutyRosterEntry(
        args.userId,
        args.date,
        args.shift,
        args.wardId,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["dutyRoster"] }),
  });
}

export function useCreateLeaveRequest() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      userId: UserId;
      startDate: string;
      endDate: string;
      reason: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createLeaveRequest(
        args.userId,
        args.startDate,
        args.endDate,
        args.reason,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leaveRequests"] }),
  });
}

export function useUpdateLeaveStatus() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: { id: LeaveRequestId; status: LeaveStatus }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateLeaveStatus(args.id, args.status);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leaveRequests"] }),
  });
}
