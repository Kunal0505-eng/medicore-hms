import SystemTypes "../types/system";
import Common "../types/common";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func getProfile(profile : { var data : ?SystemTypes.HospitalProfile }) : ?SystemTypes.HospitalProfile {
    profile.data;
  };

  public func updateProfile(
    profile : { var data : ?SystemTypes.HospitalProfile },
    name : Text,
    address : Text,
    phone : Text,
    email : Text,
    registrationNo : Text,
    timezone : Text,
    currency : Text,
  ) : SystemTypes.HospitalProfile {
    let existing = switch (profile.data) {
      case (?p) { p };
      case null {
        { id = 1; name = ""; address = ""; phone = ""; email = ""; registrationNo = ""; logoUrl = null; timezone = "UTC"; currency = "USD"; branding = null };
      };
    };
    let updated = { existing with name; address; phone; email; registrationNo; timezone; currency };
    profile.data := ?updated;
    updated;
  };

  public func addAuditLog(
    logs : List.List<SystemTypes.AuditLog>,
    state : { var nextLogId : Nat },
    userId : Common.UserId,
    action : Text,
    entityType : Text,
    entityId : Text,
    details : Text,
  ) : () {
    let id = state.nextLogId;
    state.nextLogId += 1;
    let logEntry : SystemTypes.AuditLog = { id; userId; action; entityType; entityId; details; timestamp = Time.now() };
    logs.add(logEntry);
  };

  public func getAuditLogs(logs : List.List<SystemTypes.AuditLog>) : [SystemTypes.AuditLog] {
    logs.toArray();
  };
};
