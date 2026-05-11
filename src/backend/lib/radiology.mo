import Common "../types/common";
import RadiologyTypes "../types/radiology";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func getAll(orders : List.List<RadiologyTypes.RadiologyOrder>) : [RadiologyTypes.RadiologyOrder] {
    orders.toArray();
  };

  public func getByPatient(orders : List.List<RadiologyTypes.RadiologyOrder>, patientId : Common.PatientId) : [RadiologyTypes.RadiologyOrder] {
    orders.filter(func(o) { o.patientId == patientId }).toArray();
  };

  public func getById(orders : List.List<RadiologyTypes.RadiologyOrder>, id : Common.RadiologyOrderId) : ?RadiologyTypes.RadiologyOrder {
    orders.find(func(o) { o.id == id });
  };

  public func create(
    orders : List.List<RadiologyTypes.RadiologyOrder>,
    state : { var nextRadiologyOrderId : Nat },
    patientId : Common.PatientId,
    doctorId : Common.DoctorId,
    imagingType : RadiologyTypes.ImagingType,
    bodyPart : Text,
    clinicalIndication : Text,
  ) : RadiologyTypes.RadiologyOrder {
    let id = state.nextRadiologyOrderId;
    state.nextRadiologyOrderId += 1;

    let order : RadiologyTypes.RadiologyOrder = {
      id;
      patientId;
      doctorId;
      imagingType;
      bodyPart;
      clinicalIndication;
      status = #Ordered;
      reportUrl = null;
      findings = null;
      radiologistId = null;
      createdAt = Time.now();
    };
    orders.add(order);
    order;
  };

  public func updateReport(
    orders : List.List<RadiologyTypes.RadiologyOrder>,
    id : Common.RadiologyOrderId,
    reportUrl : ?Text,
    findings : ?Text,
    radiologistId : ?Common.UserId,
    status : RadiologyTypes.RadiologyStatus,
  ) : Bool {
    switch (orders.findIndex(func(o) { o.id == id })) {
      case null { false };
      case (?idx) {
        let existing = orders.at(idx);
        orders.put(idx, { existing with reportUrl; findings; radiologistId; status });
        true;
      };
    };
  };
};
