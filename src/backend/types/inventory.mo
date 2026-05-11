import Common "common";

module {
  public type EquipmentStatus = {
    #Active;
    #InMaintenance;
    #Decommissioned;
  };

  public type IndentStatus = {
    #Pending;
    #Approved;
    #Fulfilled;
    #Rejected;
  };

  public type EquipmentItem = {
    id : Common.EquipmentId;
    name : Text;
    category : Text;
    serialNumber : Text;
    purchaseDate : Text;
    cost : Nat;
    status : EquipmentStatus;
    wardId : ?Common.WardId;
    nextServiceDate : ?Text;
  };

  public type Consumable = {
    id : Common.ConsumableId;
    name : Text;
    quantity : Nat;
    reorderLevel : Nat;
    unitCost : Nat;
    supplierId : ?Common.SupplierId;
  };

  public type IndentItem = {
    itemId : Nat;
    itemName : Text;
    quantity : Nat;
  };

  public type IndentRequest = {
    id : Common.IndentId;
    requestedById : Common.UserId;
    items : [IndentItem];
    status : IndentStatus;
    createdAt : Common.Timestamp;
  };

  public type Supplier = {
    id : Common.SupplierId;
    name : Text;
    phone : Text;
    email : Text;
    address : Text;
    categories : [Text];
    paymentTerms : Text;
  };
};
