import Common "common";

module {
  public type ImagingType = {
    #XRay;
    #MRI;
    #CT;
    #Ultrasound;
    #Other;
  };

  public type RadiologyStatus = {
    #Ordered;
    #ImagingDone;
    #ReportReady;
    #Reported;
  };

  public type RadiologyOrder = {
    id : Common.RadiologyOrderId;
    patientId : Common.PatientId;
    doctorId : Common.DoctorId;
    imagingType : ImagingType;
    bodyPart : Text;
    clinicalIndication : Text;
    status : RadiologyStatus;
    reportUrl : ?Text;
    findings : ?Text;
    radiologistId : ?Common.UserId;
    createdAt : Common.Timestamp;
  };
};
