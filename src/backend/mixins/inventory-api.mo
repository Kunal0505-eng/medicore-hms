import Common "../types/common";
import InventoryTypes "../types/inventory";
import InventoryLib "../lib/inventory";
import List "mo:core/List";

mixin (
  equipment : List.List<InventoryTypes.EquipmentItem>,
  consumables : List.List<InventoryTypes.Consumable>,
  suppliers : List.List<InventoryTypes.Supplier>,
  indents : List.List<InventoryTypes.IndentRequest>,
  inventoryState : {
    var nextEquipmentId : Nat;
    var nextConsumableId : Nat;
    var nextSupplierId : Nat;
    var nextIndentId : Nat;
  },
) {
  public query func getEquipment() : async [InventoryTypes.EquipmentItem] {
    InventoryLib.getAllEquipment(equipment);
  };

  public shared func createEquipmentItem(
    name : Text,
    category : Text,
    serialNumber : Text,
    purchaseDate : Text,
    cost : Nat,
    wardId : ?Common.WardId,
  ) : async InventoryTypes.EquipmentItem {
    InventoryLib.createEquipment(equipment, inventoryState, name, category, serialNumber, purchaseDate, cost, wardId);
  };

  public query func getConsumables() : async [InventoryTypes.Consumable] {
    InventoryLib.getAllConsumables(consumables);
  };

  public shared func createConsumable(
    name : Text,
    quantity : Nat,
    reorderLevel : Nat,
    unitCost : Nat,
    supplierId : ?Common.SupplierId,
  ) : async InventoryTypes.Consumable {
    InventoryLib.createConsumable(consumables, inventoryState, name, quantity, reorderLevel, unitCost, supplierId);
  };

  public query func getSuppliers() : async [InventoryTypes.Supplier] {
    InventoryLib.getAllSuppliers(suppliers);
  };

  public shared func createSupplier(
    name : Text,
    phone : Text,
    email : Text,
    address : Text,
    categories : [Text],
    paymentTerms : Text,
  ) : async InventoryTypes.Supplier {
    InventoryLib.createSupplier(suppliers, inventoryState, name, phone, email, address, categories, paymentTerms);
  };

  public query func getIndentRequests() : async [InventoryTypes.IndentRequest] {
    InventoryLib.getAllIndents(indents);
  };

  public shared func createIndentRequest(
    requestedById : Common.UserId,
    items : [InventoryTypes.IndentItem],
  ) : async InventoryTypes.IndentRequest {
    InventoryLib.createIndent(indents, inventoryState, requestedById, items);
  };

  public shared func updateIndentStatus(
    id : Common.IndentId,
    status : InventoryTypes.IndentStatus,
  ) : async Bool {
    InventoryLib.updateIndentStatus(indents, id, status);
  };
};
