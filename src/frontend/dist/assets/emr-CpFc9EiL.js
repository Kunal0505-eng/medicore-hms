import { Y as useActor, Z as useQuery, _ as useQueryClient, $ as useMutation, a0 as createActor } from "./index-BGDDM1OA.js";
function useVisits() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["visits"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getVisits();
    },
    enabled: !!actor && !isFetching
  });
}
function useVisitsByPatient(patientId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["visits", "patient", patientId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getVisitsByPatient(patientId);
    },
    enabled: !!actor && !isFetching && !!patientId
  });
}
function useCreateVisit() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args) => {
      if (!actor) throw new Error("No actor");
      return actor.createVisit(
        args.patientId,
        args.doctorId,
        args.chiefComplaint,
        args.soapNotes,
        args.diagnoses,
        args.prescriptions,
        args.vitals
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["visits"] })
  });
}
function useUpdateVisit() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args) => {
      if (!actor) throw new Error("No actor");
      return actor.updateVisit(
        args.id,
        args.soapNotes,
        args.diagnoses,
        args.prescriptions,
        args.vitals
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["visits"] })
  });
}
function usePrescriptionsByPatient(patientId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["prescriptions", patientId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPrescriptionsByPatient(patientId);
    },
    enabled: !!actor && !isFetching && !!patientId
  });
}
export {
  usePrescriptionsByPatient as a,
  useCreateVisit as b,
  useUpdateVisit as c,
  useVisits as d,
  useVisitsByPatient as u
};
