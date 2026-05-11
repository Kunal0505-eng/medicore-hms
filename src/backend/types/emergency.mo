import Common "common";

module {
  public type ERStatus = {
    #Waiting;
    #InTreatment;
    #Discharged;
  };

  public type ERTriage = {
    id : Common.ERTriageId;
    patientId : ?Common.PatientId;
    esiLevel : Int;
    arrivalTime : Common.Timestamp;
    chiefComplaint : Text;
    isTraumaCase : Bool;
    isUnknownPatient : Bool;
    bedId : ?Common.BedId;
    status : ERStatus;
    treatedByDoctorId : ?Common.DoctorId;
    dischargedAt : ?Common.Timestamp;
  };
};
