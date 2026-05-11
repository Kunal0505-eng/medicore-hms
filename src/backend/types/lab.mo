import Common "common";

module {
  public type LabStatus = {
    #Ordered;
    #SampleCollected;
    #Processing;
    #ResultReady;
    #Reported;
  };

  public type LabOrder = {
    id : Common.LabOrderId;
    patientId : Common.PatientId;
    doctorId : Common.DoctorId;
    visitId : ?Common.VisitId;
    testType : Text;
    testName : Text;
    status : LabStatus;
    sampleCollectedAt : ?Common.Timestamp;
    resultEnteredAt : ?Common.Timestamp;
    resultValue : ?Text;
    resultFile : ?Text;
    isCritical : Bool;
    referenceRange : ?Text;
    notes : ?Text;
    createdAt : Common.Timestamp;
  };
};
