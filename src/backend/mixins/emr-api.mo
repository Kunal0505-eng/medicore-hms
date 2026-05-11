import Common "../types/common";
import EMRTypes "../types/emr";
import EMRLib "../lib/emr";
import List "mo:core/List";

mixin (
  visits : List.List<EMRTypes.Visit>,
  visitState : { var nextVisitId : Nat },
) {
  public query func getVisits() : async [EMRTypes.Visit] {
    EMRLib.getAll(visits);
  };

  public query func getVisitsByPatient(patientId : Common.PatientId) : async [EMRTypes.Visit] {
    EMRLib.getByPatient(visits, patientId);
  };

  public query func getVisit(id : Common.VisitId) : async ?EMRTypes.Visit {
    EMRLib.getById(visits, id);
  };

  public shared func createVisit(
    patientId : Common.PatientId,
    doctorId : Common.DoctorId,
    chiefComplaint : Text,
    soapNotes : EMRTypes.SOAPNotes,
    diagnoses : [EMRTypes.Diagnosis],
    prescriptions : [EMRTypes.Prescription],
    vitals : ?EMRTypes.VitalSigns,
  ) : async EMRTypes.Visit {
    EMRLib.create(visits, visitState, patientId, doctorId, chiefComplaint, soapNotes, diagnoses, prescriptions, vitals);
  };

  public shared func updateVisit(
    id : Common.VisitId,
    soapNotes : EMRTypes.SOAPNotes,
    diagnoses : [EMRTypes.Diagnosis],
    prescriptions : [EMRTypes.Prescription],
    vitals : ?EMRTypes.VitalSigns,
  ) : async Bool {
    EMRLib.update(visits, id, soapNotes, diagnoses, prescriptions, vitals);
  };

  public query func getPrescriptionsByPatient(patientId : Common.PatientId) : async [EMRTypes.Prescription] {
    EMRLib.getPrescriptions(visits, patientId);
  };
};
