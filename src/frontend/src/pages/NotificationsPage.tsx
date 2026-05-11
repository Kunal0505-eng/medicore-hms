import type { Notification } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useMarkAllRead,
  useMarkNotificationRead,
  useNotifications,
} from "@/hooks/useNotifications";
import {
  AlertTriangle,
  Bell,
  CheckCheck,
  Clock,
  FlaskConical,
  Package,
  Pill,
  ShieldAlert,
} from "lucide-react";
import { useState } from "react";

type FilterTab =
  | "All"
  | "Unread"
  | "Critical"
  | "Appointment"
  | "Lab"
  | "Pharmacy"
  | "Shift";

const FILTER_TABS: { id: FilterTab; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Unread", label: "Unread" },
  { id: "Critical", label: "Critical" },
  { id: "Appointment", label: "Appointment" },
  { id: "Lab", label: "Lab" },
  { id: "Pharmacy", label: "Pharmacy" },
  { id: "Shift", label: "Shift" },
];

function timeAgo(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  const diff = Date.now() - ms;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

function matchesFilter(n: Notification, filter: FilterTab): boolean {
  switch (filter) {
    case "All":
      return true;
    case "Unread":
      return !n.isRead;
    case "Critical":
      return (n.priority as string) === "Critical";
    case "Appointment":
      return (n.notificationType as string) === "AppointmentReminder";
    case "Lab":
      return (n.notificationType as string) === "CriticalLabAlert";
    case "Pharmacy":
      return (
        (n.notificationType as string) === "DrugExpiryAlert" ||
        (n.notificationType as string) === "LowStockAlert"
      );
    case "Shift":
      return (n.notificationType as string) === "ShiftReminder";
  }
}

type NotificationConfig = {
  icon: React.ReactNode;
  typeLabelText: string;
  typeLabelClass: string;
};

function getNotificationConfig(n: Notification): NotificationConfig {
  const isCritical = (n.priority as string) === "Critical";
  switch (n.notificationType as string) {
    case "AppointmentReminder":
      return {
        icon: <Bell className="h-4 w-4 text-blue-400" />,
        typeLabelText: "Appointment",
        typeLabelClass: "bg-blue-500/15 text-blue-400 border-blue-500/30",
      };
    case "CriticalLabAlert":
      return {
        icon: <FlaskConical className="h-4 w-4 text-destructive" />,
        typeLabelText: "Lab",
        typeLabelClass:
          "bg-destructive/15 text-destructive border-destructive/30",
      };
    case "DrugExpiryAlert":
      return {
        icon: <Pill className="h-4 w-4 text-orange-400" />,
        typeLabelText: "Drug Expiry",
        typeLabelClass: "bg-orange-500/15 text-orange-400 border-orange-500/30",
      };
    case "LowStockAlert":
      return {
        icon: <Package className="h-4 w-4 text-amber-400" />,
        typeLabelText: "Low Stock",
        typeLabelClass: "bg-amber-500/15 text-amber-400 border-amber-500/30",
      };
    case "ShiftReminder":
      return {
        icon: <Clock className="h-4 w-4 text-violet-400" />,
        typeLabelText: "Shift",
        typeLabelClass: "bg-violet-500/15 text-violet-400 border-violet-500/30",
      };
    default:
      return {
        icon: isCritical ? (
          <AlertTriangle className="h-4 w-4 text-destructive" />
        ) : (
          <Bell className="h-4 w-4 text-muted-foreground" />
        ),
        typeLabelText: "General",
        typeLabelClass: "bg-secondary text-foreground border-border",
      };
  }
}

function NotificationItem({
  notification,
  onRead,
}: {
  notification: Notification;
  onRead: (id: bigint) => void;
}) {
  const isCritical = (notification.priority as string) === "Critical";
  const isUnread = !notification.isRead;
  const config = getNotificationConfig(notification);

  return (
    <button
      type="button"
      onClick={() => !notification.isRead && onRead(notification.id)}
      data-ocid={`notification.item.${notification.id}`}
      className={[
        "w-full text-left flex gap-3 p-4 rounded-lg border transition-colors duration-200",
        isCritical
          ? "border-l-[3px] border-l-destructive border-border bg-destructive/5 hover:bg-destructive/10"
          : "border-border bg-card hover:bg-muted/40",
        isUnread ? "" : "opacity-70",
      ].join(" ")}
    >
      <div
        className={[
          "flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center mt-0.5",
          isCritical ? "bg-destructive/15" : "bg-muted",
        ].join(" ")}
      >
        {config.icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {isUnread && (
              <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-0.5" />
            )}
            <span
              className={[
                "text-sm leading-snug",
                isUnread
                  ? "font-semibold text-foreground"
                  : "font-normal text-muted-foreground",
              ].join(" ")}
            >
              {notification.title}
            </span>
            {isCritical && (
              <Badge
                variant="destructive"
                className="text-[10px] px-1.5 py-0 h-4 font-bold tracking-wide"
                data-ocid={`notification.critical_badge.${notification.id}`}
              >
                CRITICAL
              </Badge>
            )}
            <Badge
              variant="outline"
              className={`text-[10px] px-1.5 py-0 h-4 border ${config.typeLabelClass}`}
            >
              {config.typeLabelText}
            </Badge>
          </div>
          <span className="text-[11px] text-muted-foreground flex-shrink-0">
            {timeAgo(notification.createdAt)}
          </span>
        </div>
        <p
          className={[
            "mt-1 text-[13px] leading-relaxed break-words",
            isUnread ? "text-foreground/80" : "text-muted-foreground",
          ].join(" ")}
        >
          {notification.message}
        </p>
      </div>
    </button>
  );
}

const SKELETON_KEYS = ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5"] as const;

function NotificationSkeletonItem() {
  return (
    <div className="flex gap-3 p-4 rounded-lg border border-border bg-card">
      <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="flex gap-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}

export function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");
  const { data: notifications, isLoading } = useNotifications();
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllRead();

  const allNotifs = notifications ?? [];
  const unreadCount = allNotifs.filter((n) => !n.isRead).length;

  const sorted = [...allNotifs].sort((a, b) => {
    const aCrit = (a.priority as string) === "Critical" ? 1 : 0;
    const bCrit = (b.priority as string) === "Critical" ? 1 : 0;
    if (bCrit !== aCrit) return bCrit - aCrit;
    const aU = !a.isRead ? 1 : 0;
    const bU = !b.isRead ? 1 : 0;
    if (bU !== aU) return bU - aU;
    return Number(b.createdAt - a.createdAt);
  });

  const filtered = sorted.filter((n) => matchesFilter(n, activeFilter));

  const filterCounts: Partial<Record<FilterTab, number>> = {
    Unread: unreadCount,
    Critical: allNotifs.filter((n) => (n.priority as string) === "Critical")
      .length,
  };

  return (
    <div
      className="flex flex-col h-full bg-background"
      data-ocid="notifications.page"
    >
      {/* Page header */}
      <div className="border-b border-border bg-card px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center">
            <Bell className="h-4 w-4 text-accent" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-foreground leading-none">
                Notifications
              </h1>
              {unreadCount > 0 && (
                <span
                  className="flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold"
                  data-ocid="notifications.unread_count"
                >
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {unreadCount > 0
                ? `${unreadCount} unread \u00b7 ${allNotifs.length} total`
                : "All caught up \u2014 no unread notifications"}
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => markAllRead.mutate()}
            disabled={markAllRead.isPending}
            className="flex items-center gap-2"
            data-ocid="notifications.mark_all_read.button"
          >
            <CheckCheck className="h-3.5 w-3.5" />
            Mark all as read
          </Button>
        )}
      </div>

      {/* Filter chips */}
      <div className="border-b border-border bg-card/50 px-6 py-2.5 flex items-center gap-2 overflow-x-auto">
        {FILTER_TABS.map((tab) => {
          const count = filterCounts[tab.id];
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              data-ocid={`notifications.filter.${tab.id.toLowerCase()}`}
              className={[
                "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-150 border",
                isActive
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-transparent text-muted-foreground border-border hover:border-accent/50 hover:text-foreground",
              ].join(" ")}
            >
              {tab.label}
              {count != null && count > 0 && (
                <span
                  className={[
                    "flex items-center justify-center h-4 min-w-4 px-1 rounded-full text-[10px] font-bold",
                    isActive
                      ? "bg-accent-foreground/20 text-accent-foreground"
                      : "bg-destructive text-destructive-foreground",
                  ].join(" ")}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Notification list */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {isLoading ? (
          <div className="space-y-3">
            {SKELETON_KEYS.map((key) => (
              <NotificationSkeletonItem key={key} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-20 text-center"
            data-ocid="notifications.empty_state"
          >
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <ShieldAlert className="h-7 w-7 text-muted-foreground" />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-1">
              {activeFilter === "All"
                ? "No notifications yet"
                : `No ${activeFilter.toLowerCase()} notifications`}
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              {activeFilter === "Unread"
                ? "You're all caught up! Every notification has been read."
                : "There are no notifications matching this filter right now."}
            </p>
          </div>
        ) : (
          <div className="space-y-2.5" data-ocid="notifications.list">
            {filtered.map((n) => (
              <NotificationItem
                key={n.id.toString()}
                notification={n}
                onRead={(id) => markRead.mutate(id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
