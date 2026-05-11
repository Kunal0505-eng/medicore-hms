import Common "common";

module {
  public type BillType = {
    #OPD;
    #IPD;
  };

  public type PaymentMode = {
    #Cash;
    #Card;
    #UPI;
    #Insurance;
  };

  public type BillStatus = {
    #Pending;
    #Paid;
    #PartiallyPaid;
    #Refunded;
  };

  public type BillItem = {
    serviceId : Common.ServiceId;
    serviceName : Text;
    quantity : Nat;
    unitPrice : Nat;
    total : Nat;
  };

  public type Bill = {
    id : Common.BillId;
    patientId : Common.PatientId;
    visitId : ?Common.VisitId;
    billType : BillType;
    items : [BillItem];
    subtotal : Nat;
    discountPercent : Nat;
    totalAmount : Nat;
    paidAmount : Nat;
    paymentMode : ?PaymentMode;
    status : BillStatus;
    insuranceClaimId : ?Text;
    createdAt : Common.Timestamp;
  };

  public type Service = {
    id : Common.ServiceId;
    name : Text;
    category : Text;
    basePrice : Nat;
    isActive : Bool;
  };
};
