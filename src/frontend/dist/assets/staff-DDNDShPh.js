import { Y as useActor, Z as useQuery, _ as useQueryClient, $ as useMutation, a0 as createActor } from "./index-DZPPfMmg.js";
function useDoctors() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDoctors();
    },
    enabled: !!actor && !isFetching
  });
}
function useDutyRoster() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["dutyRoster"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDutyRoster();
    },
    enabled: !!actor && !isFetching
  });
}
function useLeaveRequests() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["leaveRequests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLeaveRequests();
    },
    enabled: !!actor && !isFetching
  });
}
function useCreateDoctorProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args) => {
      if (!actor) throw new Error("No actor");
      return actor.createDoctorProfile(
        args.userId,
        args.specialization,
        args.qualifications,
        args.departmentId,
        args.consultationFee,
        args.schedule
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["doctors"] })
  });
}
function useCreateDutyRoster() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args) => {
      if (!actor) throw new Error("No actor");
      return actor.createDutyRosterEntry(
        args.userId,
        args.date,
        args.shift,
        args.wardId
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["dutyRoster"] })
  });
}
function useCreateLeaveRequest() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args) => {
      if (!actor) throw new Error("No actor");
      return actor.createLeaveRequest(
        args.userId,
        args.startDate,
        args.endDate,
        args.reason
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leaveRequests"] })
  });
}
function useUpdateLeaveStatus() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args) => {
      if (!actor) throw new Error("No actor");
      return actor.updateLeaveStatus(args.id, args.status);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leaveRequests"] })
  });
}
export {
  useDutyRoster as a,
  useLeaveRequests as b,
  useCreateDutyRoster as c,
  useCreateLeaveRequest as d,
  useUpdateLeaveStatus as e,
  useCreateDoctorProfile as f,
  useDoctors as u
};
