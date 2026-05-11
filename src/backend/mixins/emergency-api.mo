import Common "../types/common";
import ERTypes "../types/emergency";
import ERLib "../lib/emergency";
import List "mo:core/List";

mixin (
  erTriages : List.List<ERTypes.ERTriage>,
  erState : { var nextERTriageId : Nat },
) {
  public query func getERTriages() : async [ERTypes.ERTriage] {
    ERLib.getAll(erTriages);
  };

  public query func getActiveERTriages() : async [ERTypes.ERTriage] {
    ERLib.getActive(erTriages);
  };

  public shared func createERTriage(
    patientId : ?Common.PatientId,
    esiLevel : Int,
    chiefComplaint : Text,
    isTraumaCase : Bool,
    isUnknownPatient : Bool,
    bedId : ?Common.BedId,
  ) : async ERTypes.ERTriage {
    ERLib.create(erTriages, erState, patientId, esiLevel, chiefComplaint, isTraumaCase, isUnknownPatient, bedId);
  };

  public shared func updateERTriage(
    id : Common.ERTriageId,
    status : ERTypes.ERStatus,
    treatedByDoctorId : ?Common.DoctorId,
    bedId : ?Common.BedId,
  ) : async Bool {
    ERLib.update(erTriages, id, status, treatedByDoctorId, bedId);
  };
};
