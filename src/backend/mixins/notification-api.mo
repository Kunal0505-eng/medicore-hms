import Common "../types/common";
import NotificationTypes "../types/notification";
import NotificationLib "../lib/notification";
import List "mo:core/List";

mixin (
  notifications : List.List<NotificationTypes.Notification>,
  notifState : { var nextNotificationId : Nat },
) {
  public query func getNotifications(userId : Common.UserId) : async [NotificationTypes.Notification] {
    NotificationLib.getByUser(notifications, userId);
  };

  public shared func markNotificationRead(id : Common.NotificationId) : async Bool {
    NotificationLib.markRead(notifications, id);
  };

  public shared func markAllNotificationsRead(userId : Common.UserId) : async () {
    NotificationLib.markAllRead(notifications, userId);
  };

  public shared func createNotification(
    userId : Common.UserId,
    notificationType : NotificationTypes.NotificationType,
    title : Text,
    message : Text,
    priority : NotificationTypes.NotificationPriority,
    relatedId : ?Text,
  ) : async NotificationTypes.Notification {
    NotificationLib.create(notifications, notifState, userId, notificationType, title, message, priority, relatedId);
  };
};
