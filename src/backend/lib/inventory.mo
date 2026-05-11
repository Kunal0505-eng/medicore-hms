import Common "../types/common";
import InventoryTypes "../types/inventory";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func getAllEquipment(equipment : List.List<InventoryTypes.EquipmentItem>) : [InventoryTypes.EquipmentItem] {
    equipment.toArray();
  };

  public func createEquipment(
    equipment : List.List<InventoryTypes.EquipmentItem>,
    state : { var nextEquipmentId : Nat },
    name : Text,
    category : Text,
    serialNumber : Text,
    purchaseDate : Text,
    cost : Nat,
    wardId : ?Common.WardId,
  ) : InventoryTypes.EquipmentItem {
    let id = state.nextEquipmentId;
    state.nextEquipmentId += 1;
    let item : InventoryTypes.EquipmentItem = {
      id;
      name;
      category;
      serialNumber;
      purchaseDate;
      cost;
      status = #Active;
      wardId;
      nextServiceDate = null;
    };
    equipment.add(item);
    item;
  };

  public func getAllConsumables(consumables : List.List<InventoryTypes.Consumable>) : [InventoryTypes.Consumable] {
    consumables.toArray();
  };

  public func createConsumable(
    consumables : List.List<InventoryTypes.Consumable>,
    state : { var nextConsumableId : Nat },
    name : Text,
    quantity : Nat,
    reorderLevel : Nat,
    unitCost : Nat,
    supplierId : ?Common.SupplierId,
  ) : InventoryTypes.Consumable {
    let id = state.nextConsumableId;
    state.nextConsumableId += 1;
    let c : InventoryTypes.Consumable = { id; name; quantity; reorderLevel; unitCost; supplierId };
    consumables.add(c);
    c;
  };

  public func getAllSuppliers(suppliers : List.List<InventoryTypes.Supplier>) : [InventoryTypes.Supplier] {
    suppliers.toArray();
  };

  public func createSupplier(
    suppliers : List.List<InventoryTypes.Supplier>,
    state : { var nextSupplierId : Nat },
    name : Text,
    phone : Text,
    email : Text,
    address : Text,
    categories : [Text],
    paymentTerms : Text,
  ) : InventoryTypes.Supplier {
    let id = state.nextSupplierId;
    state.nextSupplierId += 1;
    let s : InventoryTypes.Supplier = { id; name; phone; email; address; categories; paymentTerms };
    suppliers.add(s);
    s;
  };

  public func getAllIndents(indents : List.List<InventoryTypes.IndentRequest>) : [InventoryTypes.IndentRequest] {
    indents.toArray();
  };

  public func createIndent(
    indents : List.List<InventoryTypes.IndentRequest>,
    state : { var nextIndentId : Nat },
    requestedById : Common.UserId,
    items : [InventoryTypes.IndentItem],
  ) : InventoryTypes.IndentRequest {
    let id = state.nextIndentId;
    state.nextIndentId += 1;
    let indent : InventoryTypes.IndentRequest = { id; requestedById; items; status = #Pending; createdAt = Time.now() };
    indents.add(indent);
    indent;
  };

  public func updateIndentStatus(
    indents : List.List<InventoryTypes.IndentRequest>,
    id : Common.IndentId,
    status : InventoryTypes.IndentStatus,
  ) : Bool {
    switch (indents.findIndex(func(i) { i.id == id })) {
      case null { false };
      case (?idx) {
        let existing = indents.at(idx);
        indents.put(idx, { existing with status });
        true;
      };
    };
  };
};
