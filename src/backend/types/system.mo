import Common "common";

module {
  public type HospitalProfile = {
    id : Nat;
    name : Text;
    address : Text;
    phone : Text;
    email : Text;
    registrationNo : Text;
    logoUrl : ?Text;
    timezone : Text;
    currency : Text;
    branding : ?Text;
  };

  public type AuditLog = {
    id : Nat;
    userId : Common.UserId;
    action : Text;
    entityType : Text;
    entityId : Text;
    details : Text;
    timestamp : Common.Timestamp;
  };
};
