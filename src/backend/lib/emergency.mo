import Common "../types/common";
import ERTypes "../types/emergency";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func getAll(triages : List.List<ERTypes.ERTriage>) : [ERTypes.ERTriage] {
    triages.toArray();
  };

  public func getActive(triages : List.List<ERTypes.ERTriage>) : [ERTypes.ERTriage] {
    triages.filter(func(t) { t.status == #Waiting or t.status == #InTreatment }).toArray();
  };

  public func getById(triages : List.List<ERTypes.ERTriage>, id : Common.ERTriageId) : ?ERTypes.ERTriage {
    triages.find(func(t) { t.id == id });
  };

  public func create(
    triages : List.List<ERTypes.ERTriage>,
    state : { var nextERTriageId : Nat },
    patientId : ?Common.PatientId,
    esiLevel : Int,
    chiefComplaint : Text,
    isTraumaCase : Bool,
    isUnknownPatient : Bool,
    bedId : ?Common.BedId,
  ) : ERTypes.ERTriage {
    let id = state.nextERTriageId;
    state.nextERTriageId += 1;

    let triage : ERTypes.ERTriage = {
      id;
      patientId;
      esiLevel;
      arrivalTime = Time.now();
      chiefComplaint;
      isTraumaCase;
      isUnknownPatient;
      bedId;
      status = #Waiting;
      treatedByDoctorId = null;
      dischargedAt = null;
    };
    triages.add(triage);
    triage;
  };

  public func update(
    triages : List.List<ERTypes.ERTriage>,
    id : Common.ERTriageId,
    status : ERTypes.ERStatus,
    treatedByDoctorId : ?Common.DoctorId,
    bedId : ?Common.BedId,
  ) : Bool {
    switch (triages.findIndex(func(t) { t.id == id })) {
      case null { false };
      case (?idx) {
        let existing = triages.at(idx);
        let dischargedAt = if (status == #Discharged) { ?Time.now() } else { existing.dischargedAt };
        triages.put(idx, { existing with status; treatedByDoctorId; bedId; dischargedAt });
        true;
      };
    };
  };
};
