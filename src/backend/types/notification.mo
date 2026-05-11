import Common "common";

module {
  public type NotificationType = {
    #AppointmentReminder;
    #CriticalLabAlert;
    #DrugExpiryAlert;
    #LowStockAlert;
    #ShiftReminder;
    #General;
  };

  public type NotificationPriority = {
    #Normal;
    #Critical;
  };

  public type Notification = {
    id : Common.NotificationId;
    userId : Common.UserId;
    notificationType : NotificationType;
    title : Text;
    message : Text;
    isRead : Bool;
    priority : NotificationPriority;
    relatedId : ?Text;
    createdAt : Common.Timestamp;
  };
};
