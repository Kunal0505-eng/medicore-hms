import Common "../types/common";
import WardTypes "../types/ward";
import WardLib "../lib/ward";
import List "mo:core/List";

mixin (
  wards : List.List<WardTypes.Ward>,
  beds : List.List<WardTypes.Bed>,
  wardState : { var nextWardId : Nat; var nextBedId : Nat },
) {
  public query func getWards() : async [WardTypes.Ward] {
    WardLib.getAllWards(wards);
  };

  public query func getWard(id : Common.WardId) : async ?WardTypes.Ward {
    WardLib.getWardById(wards, id);
  };

  public shared func createWard(
    name : Text,
    wardType : WardTypes.WardType,
    totalBeds : Nat,
    inchargeNurseId : ?Common.UserId,
  ) : async WardTypes.Ward {
    WardLib.createWard(wards, wardState, name, wardType, totalBeds, inchargeNurseId);
  };

  public query func getBeds() : async [WardTypes.Bed] {
    WardLib.getAllBeds(beds);
  };

  public query func getBedsByWard(wardId : Common.WardId) : async [WardTypes.Bed] {
    WardLib.getBedsByWard(beds, wardId);
  };

  public shared func createBed(
    wardId : Common.WardId,
    bedNumber : Text,
  ) : async WardTypes.Bed {
    WardLib.createBed(beds, wardState, wardId, bedNumber);
  };

  public shared func updateBedStatus(
    bedId : Common.BedId,
    status : WardTypes.BedStatus,
    housekeepingStatus : WardTypes.HousekeepingStatus,
    notes : ?Text,
  ) : async Bool {
    WardLib.updateBedStatus(beds, bedId, status, housekeepingStatus, notes);
  };
};
