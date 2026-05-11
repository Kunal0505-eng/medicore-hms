import Common "common";

module {
  public type DiagnosisType = {
    #Primary;
    #Secondary;
  };

  public type PrescriptionStatus = {
    #Pending;
    #Dispensed;
  };

  public type SOAPNotes = {
    subjective : Text;
    objective : Text;
    assessment : Text;
    plan : Text;
  };

  public type Diagnosis = {
    icd10Code : Text;
    description : Text;
    diagnosisType : DiagnosisType;
  };

  public type Prescription = {
    drugId : ?Common.DrugId;
    drugName : Text;
    dose : Text;
    frequency : Text;
    duration : Text;
    dosageForm : Text;
    notes : ?Text;
    status : PrescriptionStatus;
  };

  public type VitalSigns = {
    bp : Text;
    temperature : Text;
    spo2 : Text;
    pulse : Text;
    weight : Text;
    height : Text;
    recordedAt : Common.Timestamp;
  };

  public type Visit = {
    id : Common.VisitId;
    patientId : Common.PatientId;
    doctorId : Common.DoctorId;
    visitDate : Common.Timestamp;
    chiefComplaint : Text;
    soapNotes : SOAPNotes;
    diagnoses : [Diagnosis];
    prescriptions : [Prescription];
    vitals : ?VitalSigns;
    documentUrls : [Text];
    createdAt : Common.Timestamp;
  };
};
