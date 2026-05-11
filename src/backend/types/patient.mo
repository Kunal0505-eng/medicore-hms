import Common "common";

module {
  public type PatientStatus = {
    #OPD;
    #Admitted;
    #Discharged;
    #Transferred;
  };

  public type Patient = {
    id : Common.PatientId;
    mrn : Text;
    firstName : Text;
    lastName : Text;
    dob : Text;
    gender : Text;
    bloodGroup : Text;
    allergies : [Text];
    phone : Text;
    email : Text;
    insuranceId : ?Text;
    insuranceProvider : ?Text;
    address : Text;
    photoUrl : ?Text;
    status : PatientStatus;
    admittedBedId : ?Common.BedId;
    wardId : ?Common.WardId;
    admissionDate : ?Common.Timestamp;
    dischargeDate : ?Common.Timestamp;
    emergencyContact : Text;
    createdAt : Common.Timestamp;
  };
};
