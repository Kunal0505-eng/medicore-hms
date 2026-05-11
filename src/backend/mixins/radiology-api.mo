import Common "../types/common";
import RadiologyTypes "../types/radiology";
import RadiologyLib "../lib/radiology";
import List "mo:core/List";

mixin (
  radiologyOrders : List.List<RadiologyTypes.RadiologyOrder>,
  radiologyState : { var nextRadiologyOrderId : Nat },
) {
  public query func getRadiologyOrders() : async [RadiologyTypes.RadiologyOrder] {
    RadiologyLib.getAll(radiologyOrders);
  };

  public query func getRadiologyOrdersByPatient(patientId : Common.PatientId) : async [RadiologyTypes.RadiologyOrder] {
    RadiologyLib.getByPatient(radiologyOrders, patientId);
  };

  public shared func createRadiologyOrder(
    patientId : Common.PatientId,
    doctorId : Common.DoctorId,
    imagingType : RadiologyTypes.ImagingType,
    bodyPart : Text,
    clinicalIndication : Text,
  ) : async RadiologyTypes.RadiologyOrder {
    RadiologyLib.create(radiologyOrders, radiologyState, patientId, doctorId, imagingType, bodyPart, clinicalIndication);
  };

  public shared func updateRadiologyReport(
    id : Common.RadiologyOrderId,
    reportUrl : ?Text,
    findings : ?Text,
    radiologistId : ?Common.UserId,
    status : RadiologyTypes.RadiologyStatus,
  ) : async Bool {
    RadiologyLib.updateReport(radiologyOrders, id, reportUrl, findings, radiologistId, status);
  };
};
