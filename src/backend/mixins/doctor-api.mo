import Common "../types/common";
import DoctorTypes "../types/doctor";
import DoctorLib "../lib/doctor";
import List "mo:core/List";

mixin (
  doctors : List.List<DoctorTypes.DoctorProfile>,
  roster : List.List<DoctorTypes.DutyRoster>,
  leaves : List.List<DoctorTypes.LeaveRequest>,
  doctorState : {
    var nextDoctorId : Nat;
    var nextRosterId : Nat;
    var nextLeaveId : Nat;
  },
) {
  public query func getDoctors() : async [DoctorTypes.DoctorProfile] {
    DoctorLib.getAllProfiles(doctors);
  };

  public query func getDoctor(id : Common.DoctorId) : async ?DoctorTypes.DoctorProfile {
    DoctorLib.getProfile(doctors, id);
  };

  public shared func createDoctorProfile(
    userId : Common.UserId,
    specialization : Text,
    qualifications : [Text],
    departmentId : ?Text,
    consultationFee : Nat,
    schedule : [DoctorTypes.WorkingHours],
  ) : async DoctorTypes.DoctorProfile {
    DoctorLib.createProfile(doctors, doctorState, userId, specialization, qualifications, departmentId, consultationFee, schedule);
  };

  public query func getDutyRoster() : async [DoctorTypes.DutyRoster] {
    DoctorLib.getRoster(roster);
  };

  public shared func createDutyRosterEntry(
    userId : Common.UserId,
    date : Text,
    shift : DoctorTypes.ShiftType,
    wardId : ?Common.WardId,
  ) : async DoctorTypes.DutyRoster {
    DoctorLib.createRosterEntry(roster, doctorState, userId, date, shift, wardId);
  };

  public query func getLeaveRequests() : async [DoctorTypes.LeaveRequest] {
    DoctorLib.getLeaveRequests(leaves);
  };

  public shared func createLeaveRequest(
    userId : Common.UserId,
    startDate : Text,
    endDate : Text,
    reason : Text,
  ) : async DoctorTypes.LeaveRequest {
    DoctorLib.createLeaveRequest(leaves, doctorState, userId, startDate, endDate, reason);
  };

  public shared func updateLeaveStatus(
    id : Common.LeaveRequestId,
    status : DoctorTypes.LeaveStatus,
  ) : async Bool {
    DoctorLib.updateLeaveStatus(leaves, id, status);
  };
};
