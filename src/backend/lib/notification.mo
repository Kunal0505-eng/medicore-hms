import Common "../types/common";
import NotificationTypes "../types/notification";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func getByUser(notifications : List.List<NotificationTypes.Notification>, userId : Common.UserId) : [NotificationTypes.Notification] {
    notifications.filter(func(n) { n.userId == userId }).toArray();
  };

  public func create(
    notifications : List.List<NotificationTypes.Notification>,
    state : { var nextNotificationId : Nat },
    userId : Common.UserId,
    notificationType : NotificationTypes.NotificationType,
    title : Text,
    message : Text,
    priority : NotificationTypes.NotificationPriority,
    relatedId : ?Text,
  ) : NotificationTypes.Notification {
    let id = state.nextNotificationId;
    state.nextNotificationId += 1;

    let notif : NotificationTypes.Notification = {
      id;
      userId;
      notificationType;
      title;
      message;
      isRead = false;
      priority;
      relatedId;
      createdAt = Time.now();
    };
    notifications.add(notif);
    notif;
  };

  public func markRead(
    notifications : List.List<NotificationTypes.Notification>,
    id : Common.NotificationId,
  ) : Bool {
    switch (notifications.findIndex(func(n) { n.id == id })) {
      case null { false };
      case (?idx) {
        let existing = notifications.at(idx);
        notifications.put(idx, { existing with isRead = true });
        true;
      };
    };
  };

  public func markAllRead(
    notifications : List.List<NotificationTypes.Notification>,
    userId : Common.UserId,
  ) : () {
    notifications.mapInPlace(func(n) {
      if (n.userId == userId) { { n with isRead = true } } else { n };
    });
  };
};
