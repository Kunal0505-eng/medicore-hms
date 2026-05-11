import SystemTypes "../types/system";
import Common "../types/common";
import SystemLib "../lib/system";
import List "mo:core/List";

mixin (
  hospitalProfile : { var data : ?SystemTypes.HospitalProfile },
  auditLogs : List.List<SystemTypes.AuditLog>,
  sysState : { var nextLogId : Nat },
) {
  public query func getHospitalProfile() : async ?SystemTypes.HospitalProfile {
    SystemLib.getProfile(hospitalProfile);
  };

  public shared func updateHospitalProfile(
    name : Text,
    address : Text,
    phone : Text,
    email : Text,
    registrationNo : Text,
    timezone : Text,
    currency : Text,
  ) : async SystemTypes.HospitalProfile {
    SystemLib.updateProfile(hospitalProfile, name, address, phone, email, registrationNo, timezone, currency);
  };

  public query func getAuditLogs() : async [SystemTypes.AuditLog] {
    SystemLib.getAuditLogs(auditLogs);
  };
};
