import Common "common";

module {
  public type WardType = {
    #ICU;
    #General;
    #Private;
    #Maternity;
    #Emergency;
  };

  public type BedStatus = {
    #Available;
    #Occupied;
    #Maintenance;
    #Reserved;
  };

  public type HousekeepingStatus = {
    #Clean;
    #Dirty;
    #InProgress;
  };

  public type Ward = {
    id : Common.WardId;
    name : Text;
    wardType : WardType;
    totalBeds : Nat;
    inchargeNurseId : ?Common.UserId;
    isActive : Bool;
  };

  public type Bed = {
    id : Common.BedId;
    wardId : Common.WardId;
    bedNumber : Text;
    status : BedStatus;
    patientId : ?Common.PatientId;
    housekeepingStatus : HousekeepingStatus;
    notes : ?Text;
  };
};
