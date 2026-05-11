import Common "../types/common";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

module {
  public func getAll(users : List.List<Common.User>) : [Common.User] {
    users.toArray();
  };

  public func getById(users : List.List<Common.User>, id : Common.UserId) : ?Common.User {
    users.find(func(u) { u.id == id });
  };

  public func getByPrincipal(users : List.List<Common.User>, principal : Principal) : ?Common.User {
    users.find(func(u) { Principal.equal(u.principal, principal) });
  };

  public func create(
    users : List.List<Common.User>,
    state : { var nextUserId : Nat },
    principal : Principal,
    name : Text,
    email : Text,
    role : Common.UserRole,
    departmentId : ?Text,
  ) : Common.User {
    let id = state.nextUserId;
    state.nextUserId += 1;
    let user : Common.User = { id; principal; name; email; role; departmentId; status = #Active; createdAt = Time.now() };
    users.add(user);
    user;
  };

  public func updateStatus(
    users : List.List<Common.User>,
    id : Common.UserId,
    status : Common.UserStatus,
  ) : Bool {
    switch (users.findIndex(func(u) { u.id == id })) {
      case null { false };
      case (?idx) {
        let existing = users.at(idx);
        users.put(idx, { existing with status });
        true;
      };
    };
  };
};
