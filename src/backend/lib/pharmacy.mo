import Common "../types/common";
import PharmacyTypes "../types/pharmacy";
import EMRTypes "../types/emr";
import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Array "mo:core/Array";

module {
  public func getAllDrugs(drugs : List.List<PharmacyTypes.Drug>) : [PharmacyTypes.Drug] {
    drugs.toArray();
  };

  public func getDrugById(drugs : List.List<PharmacyTypes.Drug>, id : Common.DrugId) : ?PharmacyTypes.Drug {
    drugs.find(func(d) { d.id == id });
  };

  public func createDrug(
    drugs : List.List<PharmacyTypes.Drug>,
    state : { var nextDrugId : Nat; var nextOrderId : Nat },
    name : Text,
    genericName : Text,
    dosageForm : Text,
    strength : Text,
    category : Text,
    quantityOnHand : Nat,
    reorderLevel : Nat,
    expiryDate : Text,
    batchNo : Text,
    costPrice : Nat,
    sellingPrice : Nat,
    supplierId : ?Common.SupplierId,
  ) : PharmacyTypes.Drug {
    let id = state.nextDrugId;
    state.nextDrugId += 1;

    let drug : PharmacyTypes.Drug = {
      id;
      name;
      genericName;
      dosageForm;
      strength;
      category;
      quantityOnHand;
      reorderLevel;
      expiryDate;
      batchNo;
      costPrice;
      sellingPrice;
      supplierId;
      isActive = true;
    };
    drugs.add(drug);
    drug;
  };

  public func updateStock(
    drugs : List.List<PharmacyTypes.Drug>,
    drugId : Common.DrugId,
    quantityChange : Int,
  ) : Bool {
    switch (drugs.findIndex(func(d) { d.id == drugId })) {
      case null { false };
      case (?idx) {
        let existing = drugs.at(idx);
        let newQty = existing.quantityOnHand.toInt() + quantityChange;
        if (newQty < 0) { return false };
        drugs.put(idx, { existing with quantityOnHand = Int.abs(newQty) });
        true;
      };
    };
  };

  public func dispensePrescription(
    _drugs : List.List<PharmacyTypes.Drug>,
    visits : List.List<EMRTypes.Visit>,
    visitId : Common.VisitId,
    drugName : Text,
  ) : Bool {
    switch (visits.findIndex(func(v) { v.id == visitId })) {
      case null { false };
      case (?vIdx) {
        let visit = visits.at(vIdx);
        let updated = visit.prescriptions.map(
          func(rx) {
            if (rx.drugName == drugName) { { rx with status = #Dispensed } } else { rx };
          },
        );
        visits.put(vIdx, { visit with prescriptions = updated });
        true;
      };
    };
  };

  public func getLowStockDrugs(drugs : List.List<PharmacyTypes.Drug>) : [PharmacyTypes.Drug] {
    drugs.filter(func(d) { d.quantityOnHand <= d.reorderLevel }).toArray();
  };

  public func getExpiringDrugs(drugs : List.List<PharmacyTypes.Drug>, withinDays : Nat) : [PharmacyTypes.Drug] {
    ignore withinDays;
    drugs.filter(func(d) { d.isActive }).toArray();
  };

  public func getAllOrders(orders : List.List<PharmacyTypes.PurchaseOrder>) : [PharmacyTypes.PurchaseOrder] {
    orders.toArray();
  };

  public func createOrder(
    orders : List.List<PharmacyTypes.PurchaseOrder>,
    state : { var nextOrderId : Nat },
    supplierId : Common.SupplierId,
    items : [PharmacyTypes.POItem],
    expectedDelivery : ?Text,
  ) : PharmacyTypes.PurchaseOrder {
    let id = state.nextOrderId;
    state.nextOrderId += 1;
    let order : PharmacyTypes.PurchaseOrder = { id; supplierId; items; status = #Draft; expectedDelivery; createdAt = Time.now() };
    orders.add(order);
    order;
  };
};
