import Common "../types/common";
import WardTypes "../types/ward";
import List "mo:core/List";

module {
  public func getAllWards(wards : List.List<WardTypes.Ward>) : [WardTypes.Ward] {
    wards.toArray();
  };

  public func getWardById(wards : List.List<WardTypes.Ward>, id : Common.WardId) : ?WardTypes.Ward {
    wards.find(func(w) { w.id == id });
  };

  public func createWard(
    wards : List.List<WardTypes.Ward>,
    state : { var nextWardId : Nat; var nextBedId : Nat },
    name : Text,
    wardType : WardTypes.WardType,
    totalBeds : Nat,
    inchargeNurseId : ?Common.UserId,
  ) : WardTypes.Ward {
    let id = state.nextWardId;
    state.nextWardId += 1;

    let ward : WardTypes.Ward = { id; name; wardType; totalBeds; inchargeNurseId; isActive = true };
    wards.add(ward);
    ward;
  };

  public func getAllBeds(beds : List.List<WardTypes.Bed>) : [WardTypes.Bed] {
    beds.toArray();
  };

  public func getBedsByWard(beds : List.List<WardTypes.Bed>, wardId : Common.WardId) : [WardTypes.Bed] {
    beds.filter(func(b) { b.wardId == wardId }).toArray();
  };

  public func getBedById(beds : List.List<WardTypes.Bed>, id : Common.BedId) : ?WardTypes.Bed {
    beds.find(func(b) { b.id == id });
  };

  public func createBed(
    beds : List.List<WardTypes.Bed>,
    state : { var nextWardId : Nat; var nextBedId : Nat },
    wardId : Common.WardId,
    bedNumber : Text,
  ) : WardTypes.Bed {
    let id = state.nextBedId;
    state.nextBedId += 1;
    let bed : WardTypes.Bed = {
      id;
      wardId;
      bedNumber;
      status = #Available;
      patientId = null;
      housekeepingStatus = #Clean;
      notes = null;
    };
    beds.add(bed);
    bed;
  };

  public func updateBedStatus(
    beds : List.List<WardTypes.Bed>,
    bedId : Common.BedId,
    status : WardTypes.BedStatus,
    housekeepingStatus : WardTypes.HousekeepingStatus,
    notes : ?Text,
  ) : Bool {
    switch (beds.findIndex(func(b) { b.id == bedId })) {
      case null { false };
      case (?idx) {
        let existing = beds.at(idx);
        beds.put(idx, { existing with status; housekeepingStatus; notes });
        true;
      };
    };
  };
};
