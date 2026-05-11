import Common "../types/common";
import EMRTypes "../types/emr";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func getAll(visits : List.List<EMRTypes.Visit>) : [EMRTypes.Visit] {
    visits.toArray();
  };

  public func getByPatient(visits : List.List<EMRTypes.Visit>, patientId : Common.PatientId) : [EMRTypes.Visit] {
    visits.filter(func(v) { v.patientId == patientId }).toArray();
  };

  public func getById(visits : List.List<EMRTypes.Visit>, id : Common.VisitId) : ?EMRTypes.Visit {
    visits.find(func(v) { v.id == id });
  };

  public func create(
    visits : List.List<EMRTypes.Visit>,
    state : { var nextVisitId : Nat },
    patientId : Common.PatientId,
    doctorId : Common.DoctorId,
    chiefComplaint : Text,
    soapNotes : EMRTypes.SOAPNotes,
    diagnoses : [EMRTypes.Diagnosis],
    prescriptions : [EMRTypes.Prescription],
    vitals : ?EMRTypes.VitalSigns,
  ) : EMRTypes.Visit {
    let id = state.nextVisitId;
    state.nextVisitId += 1;

    let now = Time.now();
    let visit : EMRTypes.Visit = {
      id;
      patientId;
      doctorId;
      visitDate = now;
      chiefComplaint;
      soapNotes;
      diagnoses;
      prescriptions;
      vitals;
      documentUrls = [];
      createdAt = now;
    };
    visits.add(visit);
    visit;
  };

  public func update(
    visits : List.List<EMRTypes.Visit>,
    id : Common.VisitId,
    soapNotes : EMRTypes.SOAPNotes,
    diagnoses : [EMRTypes.Diagnosis],
    prescriptions : [EMRTypes.Prescription],
    vitals : ?EMRTypes.VitalSigns,
  ) : Bool {
    switch (visits.findIndex(func(v) { v.id == id })) {
      case null { false };
      case (?idx) {
        let existing = visits.at(idx);
        visits.put(idx, { existing with soapNotes; diagnoses; prescriptions; vitals });
        true;
      };
    };
  };

  public func getPrescriptions(visits : List.List<EMRTypes.Visit>, patientId : Common.PatientId) : [EMRTypes.Prescription] {
    let patientVisits = visits.filter(func(v) { v.patientId == patientId });
    patientVisits.flatMap<EMRTypes.Visit, EMRTypes.Prescription>(func(v) { v.prescriptions.values() }).toArray();
  };
};
