import Common "../types/common";
import DoctorTypes "../types/doctor";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func getAllProfiles(doctors : List.List<DoctorTypes.DoctorProfile>) : [DoctorTypes.DoctorProfile] {
    doctors.toArray();
  };

  public func getProfile(doctors : List.List<DoctorTypes.DoctorProfile>, id : Common.DoctorId) : ?DoctorTypes.DoctorProfile {
    doctors.find(func(d) { d.id == id });
  };

  public func createProfile(
    doctors : List.List<DoctorTypes.DoctorProfile>,
    state : { var nextDoctorId : Nat; var nextRosterId : Nat; var nextLeaveId : Nat },
    userId : Common.UserId,
    specialization : Text,
    qualifications : [Text],
    departmentId : ?Text,
    consultationFee : Nat,
    schedule : [DoctorTypes.WorkingHours],
  ) : DoctorTypes.DoctorProfile {
    let id = state.nextDoctorId;
    state.nextDoctorId += 1;

    let profile : DoctorTypes.DoctorProfile = {
      id;
      userId;
      specialization;
      qualifications;
      departmentId;
      wardIds = [];
      consultationFee;
      schedule;
    };
    doctors.add(profile);
    profile;
  };

  public func getRoster(roster : List.List<DoctorTypes.DutyRoster>) : [DoctorTypes.DutyRoster] {
    roster.toArray();
  };

  public func createRosterEntry(
    roster : List.List<DoctorTypes.DutyRoster>,
    state : { var nextRosterId : Nat },
    userId : Common.UserId,
    date : Text,
    shift : DoctorTypes.ShiftType,
    wardId : ?Common.WardId,
  ) : DoctorTypes.DutyRoster {
    let id = state.nextRosterId;
    state.nextRosterId += 1;
    let entry : DoctorTypes.DutyRoster = { id; userId; date; shift; wardId; status = "Scheduled" };
    roster.add(entry);
    entry;
  };

  public func getLeaveRequests(leaves : List.List<DoctorTypes.LeaveRequest>) : [DoctorTypes.LeaveRequest] {
    leaves.toArray();
  };

  public func createLeaveRequest(
    leaves : List.List<DoctorTypes.LeaveRequest>,
    state : { var nextLeaveId : Nat },
    userId : Common.UserId,
    startDate : Text,
    endDate : Text,
    reason : Text,
  ) : DoctorTypes.LeaveRequest {
    let id = state.nextLeaveId;
    state.nextLeaveId += 1;
    let req : DoctorTypes.LeaveRequest = { id; userId; startDate; endDate; reason; status = #Pending; createdAt = Time.now() };
    leaves.add(req);
    req;
  };

  public func updateLeaveStatus(
    leaves : List.List<DoctorTypes.LeaveRequest>,
    id : Common.LeaveRequestId,
    status : DoctorTypes.LeaveStatus,
  ) : Bool {
    switch (leaves.findIndex(func(l) { l.id == id })) {
      case null { false };
      case (?idx) {
        let existing = leaves.at(idx);
        leaves.put(idx, { existing with status });
        true;
      };
    };
  };
};
