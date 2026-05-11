import Common "../types/common";
import BillingTypes "../types/billing";
import BillingLib "../lib/billing";
import List "mo:core/List";

mixin (
  bills : List.List<BillingTypes.Bill>,
  services : List.List<BillingTypes.Service>,
  billingState : { var nextBillId : Nat; var nextServiceId : Nat },
) {
  public query func getBills() : async [BillingTypes.Bill] {
    BillingLib.getAllBills(bills);
  };

  public query func getBillsByPatient(patientId : Common.PatientId) : async [BillingTypes.Bill] {
    BillingLib.getBillByPatient(bills, patientId);
  };

  public query func getBill(id : Common.BillId) : async ?BillingTypes.Bill {
    BillingLib.getBillById(bills, id);
  };

  public shared func createBill(
    patientId : Common.PatientId,
    visitId : ?Common.VisitId,
    billType : BillingTypes.BillType,
    items : [BillingTypes.BillItem],
    discountPercent : Nat,
    paymentMode : ?BillingTypes.PaymentMode,
  ) : async BillingTypes.Bill {
    BillingLib.createBill(bills, billingState, patientId, visitId, billType, items, discountPercent, paymentMode);
  };

  public shared func updateBillPayment(
    id : Common.BillId,
    paidAmount : Nat,
    paymentMode : BillingTypes.PaymentMode,
  ) : async Bool {
    BillingLib.updatePayment(bills, id, paidAmount, paymentMode);
  };

  public query func getServices() : async [BillingTypes.Service] {
    BillingLib.getAllServices(services);
  };

  public shared func createService(
    name : Text,
    category : Text,
    basePrice : Nat,
  ) : async BillingTypes.Service {
    BillingLib.createService(services, billingState, name, category, basePrice);
  };
};
