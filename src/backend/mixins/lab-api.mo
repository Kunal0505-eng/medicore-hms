import Common "../types/common";
import LabTypes "../types/lab";
import LabLib "../lib/lab";
import List "mo:core/List";

mixin (
  labOrders : List.List<LabTypes.LabOrder>,
  labState : { var nextLabOrderId : Nat },
) {
  public query func getLabOrders() : async [LabTypes.LabOrder] {
    LabLib.getAll(labOrders);
  };

  public query func getLabOrdersByPatient(patientId : Common.PatientId) : async [LabTypes.LabOrder] {
    LabLib.getByPatient(labOrders, patientId);
  };

  public query func getLabOrder(id : Common.LabOrderId) : async ?LabTypes.LabOrder {
    LabLib.getById(labOrders, id);
  };

  public shared func createLabOrder(
    patientId : Common.PatientId,
    doctorId : Common.DoctorId,
    visitId : ?Common.VisitId,
    testType : Text,
    testName : Text,
  ) : async LabTypes.LabOrder {
    LabLib.create(labOrders, labState, patientId, doctorId, visitId, testType, testName);
  };

  public shared func updateLabOrderResult(
    id : Common.LabOrderId,
    resultValue : ?Text,
    resultFile : ?Text,
    isCritical : Bool,
    referenceRange : ?Text,
    notes : ?Text,
  ) : async Bool {
    LabLib.updateResult(labOrders, id, resultValue, resultFile, isCritical, referenceRange, notes);
  };

  public shared func updateLabOrderStatus(
    id : Common.LabOrderId,
    status : LabTypes.LabStatus,
  ) : async Bool {
    LabLib.updateStatus(labOrders, id, status);
  };
};
