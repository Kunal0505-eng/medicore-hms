import Common "../types/common";
import PharmacyTypes "../types/pharmacy";
import EMRTypes "../types/emr";
import PharmacyLib "../lib/pharmacy";
import EMRLib "../lib/emr";
import List "mo:core/List";

mixin (
  drugs : List.List<PharmacyTypes.Drug>,
  purchaseOrders : List.List<PharmacyTypes.PurchaseOrder>,
  visits : List.List<EMRTypes.Visit>,
  pharmacyState : { var nextDrugId : Nat; var nextOrderId : Nat },
) {
  public query func getDrugs() : async [PharmacyTypes.Drug] {
    PharmacyLib.getAllDrugs(drugs);
  };

  public query func getDrug(id : Common.DrugId) : async ?PharmacyTypes.Drug {
    PharmacyLib.getDrugById(drugs, id);
  };

  public shared func createDrug(
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
  ) : async PharmacyTypes.Drug {
    PharmacyLib.createDrug(drugs, pharmacyState, name, genericName, dosageForm, strength, category, quantityOnHand, reorderLevel, expiryDate, batchNo, costPrice, sellingPrice, supplierId);
  };

  public shared func updateDrugStock(
    drugId : Common.DrugId,
    quantityChange : Int,
  ) : async Bool {
    PharmacyLib.updateStock(drugs, drugId, quantityChange);
  };

  public query func getPrescriptions(patientId : Common.PatientId) : async [EMRTypes.Prescription] {
    EMRLib.getPrescriptions(visits, patientId);
  };

  public shared func dispensePrescription(
    visitId : Common.VisitId,
    drugName : Text,
  ) : async Bool {
    PharmacyLib.dispensePrescription(drugs, visits, visitId, drugName);
  };

  public query func getLowStockDrugs() : async [PharmacyTypes.Drug] {
    PharmacyLib.getLowStockDrugs(drugs);
  };

  public query func getPurchaseOrders() : async [PharmacyTypes.PurchaseOrder] {
    PharmacyLib.getAllOrders(purchaseOrders);
  };

  public shared func createPurchaseOrder(
    supplierId : Common.SupplierId,
    items : [PharmacyTypes.POItem],
    expectedDelivery : ?Text,
  ) : async PharmacyTypes.PurchaseOrder {
    PharmacyLib.createOrder(purchaseOrders, pharmacyState, supplierId, items, expectedDelivery);
  };
};
