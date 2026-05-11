import Common "common";

module {
  public type POStatus = {
    #Draft;
    #Submitted;
    #Received;
    #Cancelled;
  };

  public type Drug = {
    id : Common.DrugId;
    name : Text;
    genericName : Text;
    dosageForm : Text;
    strength : Text;
    category : Text;
    quantityOnHand : Nat;
    reorderLevel : Nat;
    expiryDate : Text;
    batchNo : Text;
    costPrice : Nat;
    sellingPrice : Nat;
    supplierId : ?Common.SupplierId;
    isActive : Bool;
  };

  public type POItem = {
    drugId : Common.DrugId;
    quantity : Nat;
    unitCost : Nat;
  };

  public type PurchaseOrder = {
    id : Common.PurchaseOrderId;
    supplierId : Common.SupplierId;
    items : [POItem];
    status : POStatus;
    expectedDelivery : ?Text;
    createdAt : Common.Timestamp;
  };
};
