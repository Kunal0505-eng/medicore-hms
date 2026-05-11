import Common "../types/common";
import LabTypes "../types/lab";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func getAll(orders : List.List<LabTypes.LabOrder>) : [LabTypes.LabOrder] {
    orders.toArray();
  };

  public func getByPatient(orders : List.List<LabTypes.LabOrder>, patientId : Common.PatientId) : [LabTypes.LabOrder] {
    orders.filter(func(o) { o.patientId == patientId }).toArray();
  };

  public func getById(orders : List.List<LabTypes.LabOrder>, id : Common.LabOrderId) : ?LabTypes.LabOrder {
    orders.find(func(o) { o.id == id });
  };

  public func create(
    orders : List.List<LabTypes.LabOrder>,
    state : { var nextLabOrderId : Nat },
    patientId : Common.PatientId,
    doctorId : Common.DoctorId,
    visitId : ?Common.VisitId,
    testType : Text,
    testName : Text,
  ) : LabTypes.LabOrder {
    let id = state.nextLabOrderId;
    state.nextLabOrderId += 1;

    let order : LabTypes.LabOrder = {
      id;
      patientId;
      doctorId;
      visitId;
      testType;
      testName;
      status = #Ordered;
      sampleCollectedAt = null;
      resultEnteredAt = null;
      resultValue = null;
      resultFile = null;
      isCritical = false;
      referenceRange = null;
      notes = null;
      createdAt = Time.now();
    };
    orders.add(order);
    order;
  };

  public func updateResult(
    orders : List.List<LabTypes.LabOrder>,
    id : Common.LabOrderId,
    resultValue : ?Text,
    resultFile : ?Text,
    isCritical : Bool,
    referenceRange : ?Text,
    notes : ?Text,
  ) : Bool {
    switch (orders.findIndex(func(o) { o.id == id })) {
      case null { false };
      case (?idx) {
        let existing = orders.at(idx);
        orders.put(idx, {
          existing with
          resultValue;
          resultFile;
          isCritical;
          referenceRange;
          notes;
          status = #ResultReady;
          resultEnteredAt = ?Time.now();
        });
        true;
      };
    };
  };

  public func updateStatus(
    orders : List.List<LabTypes.LabOrder>,
    id : Common.LabOrderId,
    status : LabTypes.LabStatus,
  ) : Bool {
    switch (orders.findIndex(func(o) { o.id == id })) {
      case null { false };
      case (?idx) {
        let existing = orders.at(idx);
        let sampleTime = if (status == #SampleCollected) { ?Time.now() } else { existing.sampleCollectedAt };
        orders.put(idx, { existing with status; sampleCollectedAt = sampleTime });
        true;
      };
    };
  };
};
