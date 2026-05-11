import Common "common";

module {
  public type ShiftType = {
    #Morning;
    #Afternoon;
    #Night;
  };

  public type LeaveStatus = {
    #Pending;
    #Approved;
    #Rejected;
  };

  public type WorkingHours = {
    dayOfWeek : Nat;
    startTime : Text;
    endTime : Text;
    maxPatients : Nat;
  };

  public type DoctorProfile = {
    id : Common.DoctorId;
    userId : Common.UserId;
    specialization : Text;
    qualifications : [Text];
    departmentId : ?Text;
    wardIds : [Text];
    consultationFee : Nat;
    schedule : [WorkingHours];
  };

  public type DutyRoster = {
    id : Common.DutyRosterId;
    userId : Common.UserId;
    date : Text;
    shift : ShiftType;
    wardId : ?Common.WardId;
    status : Text;
  };

  public type LeaveRequest = {
    id : Common.LeaveRequestId;
    userId : Common.UserId;
    startDate : Text;
    endDate : Text;
    reason : Text;
    status : LeaveStatus;
    createdAt : Common.Timestamp;
  };
};
