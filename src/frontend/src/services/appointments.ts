import { createActor } from "@/backend";
import type {
  AppointmentId,
  AppointmentType,
  DoctorId,
  PatientId,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAppointments() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAppointments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAppointmentsByPatient(patientId: PatientId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["appointments", "patient", patientId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAppointmentsByPatient(patientId);
    },
    enabled: !!actor && !isFetching && !!patientId,
  });
}

export function useAppointmentsByDoctor(doctorId: DoctorId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["appointments", "doctor", doctorId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAppointmentsByDoctor(doctorId);
    },
    enabled: !!actor && !isFetching && !!doctorId,
  });
}

export function useCreateAppointment() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      patientId: PatientId;
      doctorId: DoctorId;
      date: string;
      timeSlot: string;
      appointmentType: AppointmentType;
      notes: string | null;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createAppointment(
        args.patientId,
        args.doctorId,
        args.date,
        args.timeSlot,
        args.appointmentType,
        args.notes,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["appointments"] }),
  });
}

export function useCancelAppointment() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: { id: AppointmentId; reason: string }) => {
      if (!actor) throw new Error("No actor");
      return actor.cancelAppointment(args.id, args.reason);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["appointments"] }),
  });
}

export function useUpdateAppointment() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      id: AppointmentId;
      date: string;
      timeSlot: string;
      notes: string | null;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateAppointment(
        args.id,
        args.date,
        args.timeSlot,
        args.notes,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["appointments"] }),
  });
}
