import { createActor } from "@/backend";
import type {
  DoctorId,
  ImagingType,
  PatientId,
  RadiologyOrderId,
  RadiologyStatus,
  UserId,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useRadiologyOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["radiologyOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRadiologyOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateRadiologyOrder() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      patientId: PatientId;
      doctorId: DoctorId;
      imagingType: ImagingType;
      bodyPart: string;
      clinicalIndication: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createRadiologyOrder(
        args.patientId,
        args.doctorId,
        args.imagingType,
        args.bodyPart,
        args.clinicalIndication,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["radiologyOrders"] }),
  });
}

export function useUpdateRadiologyReport() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      id: RadiologyOrderId;
      reportUrl: string | null;
      findings: string | null;
      radiologistId: UserId | null;
      status: RadiologyStatus;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateRadiologyReport(
        args.id,
        args.reportUrl,
        args.findings,
        args.radiologistId,
        args.status,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["radiologyOrders"] }),
  });
}
