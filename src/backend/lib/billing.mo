import Common "../types/common";
import BillingTypes "../types/billing";
import List "mo:core/List";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Nat "mo:core/Nat";

module {
  public func getAllBills(bills : List.List<BillingTypes.Bill>) : [BillingTypes.Bill] {
    bills.toArray();
  };

  public func getBillByPatient(bills : List.List<BillingTypes.Bill>, patientId : Common.PatientId) : [BillingTypes.Bill] {
    bills.filter(func(b) { b.patientId == patientId }).toArray();
  };

  public func getBillById(bills : List.List<BillingTypes.Bill>, id : Common.BillId) : ?BillingTypes.Bill {
    bills.find(func(b) { b.id == id });
  };

  public func createBill(
    bills : List.List<BillingTypes.Bill>,
    state : { var nextBillId : Nat; var nextServiceId : Nat },
    patientId : Common.PatientId,
    visitId : ?Common.VisitId,
    billType : BillingTypes.BillType,
    items : [BillingTypes.BillItem],
    discountPercent : Nat,
    paymentMode : ?BillingTypes.PaymentMode,
  ) : BillingTypes.Bill {
    let id = state.nextBillId;
    state.nextBillId += 1;

    let subtotal = items.foldLeft(0, func(acc, item) { acc + item.total });
    let pct = if (discountPercent > 100) { 100 } else { discountPercent };
    let totalAmount = subtotal * Nat.sub(100, pct) / 100;
    let status : BillingTypes.BillStatus = switch (paymentMode) {
      case null { #Pending };
      case (?_) { #Paid };
    };
    let bill : BillingTypes.Bill = {
      id;
      patientId;
      visitId;
      billType;
      items;
      subtotal;
      discountPercent;
      totalAmount;
      paidAmount = if (status == #Paid) { totalAmount } else { 0 };
      paymentMode;
      status;
      insuranceClaimId = null;
      createdAt = Time.now();
    };
    bills.add(bill);
    bill;
  };

  public func updatePayment(
    bills : List.List<BillingTypes.Bill>,
    id : Common.BillId,
    paidAmount : Nat,
    paymentMode : BillingTypes.PaymentMode,
  ) : Bool {
    switch (bills.findIndex(func(b) { b.id == id })) {
      case null { false };
      case (?idx) {
        let existing = bills.at(idx);
        let newPaid = existing.paidAmount + paidAmount;
        let status : BillingTypes.BillStatus = if (newPaid >= existing.totalAmount) { #Paid } else { #PartiallyPaid };
        bills.put(idx, { existing with paidAmount = newPaid; paymentMode = ?paymentMode; status });
        true;
      };
    };
  };

  public func getAllServices(services : List.List<BillingTypes.Service>) : [BillingTypes.Service] {
    services.toArray();
  };

  public func createService(
    services : List.List<BillingTypes.Service>,
    serviceState : { var nextServiceId : Nat },
    name : Text,
    category : Text,
    basePrice : Nat,
  ) : BillingTypes.Service {
    let id = serviceState.nextServiceId;
    serviceState.nextServiceId += 1;

    let svc : BillingTypes.Service = { id; name; category; basePrice; isActive = true };
    services.add(svc);
    svc;
  };
};
