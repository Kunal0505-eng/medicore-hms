import { c as createLucideIcon, r as reactExports, b1 as useNotifications, b2 as useMarkNotificationRead, b3 as useMarkAllRead, j as jsxRuntimeExports, b4 as Bell, a as Button, T as TriangleAlert, q as Clock, M as Pill, X as FlaskConical } from "./index-BGDDM1OA.js";
import { B as Badge } from "./badge-Csm36_q_.js";
import { S as Skeleton } from "./skeleton-CFckeZuy.js";
import { S as ShieldAlert } from "./shield-alert-CldeMz_M.js";
import { P as Package } from "./package-CFnXNIV-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 7 17l-5-5", key: "116fxf" }],
  ["path", { d: "m22 10-7.5 7.5L13 16", key: "ke71qq" }]
];
const CheckCheck = createLucideIcon("check-check", __iconNode);
const FILTER_TABS = [
  { id: "All", label: "All" },
  { id: "Unread", label: "Unread" },
  { id: "Critical", label: "Critical" },
  { id: "Appointment", label: "Appointment" },
  { id: "Lab", label: "Lab" },
  { id: "Pharmacy", label: "Pharmacy" },
  { id: "Shift", label: "Shift" }
];
function timeAgo(ts) {
  const ms = Number(ts) / 1e6;
  const diff = Date.now() - ms;
  const m = Math.floor(diff / 6e4);
  if (m < 1) return "Just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}
function matchesFilter(n, filter) {
  switch (filter) {
    case "All":
      return true;
    case "Unread":
      return !n.isRead;
    case "Critical":
      return n.priority === "Critical";
    case "Appointment":
      return n.notificationType === "AppointmentReminder";
    case "Lab":
      return n.notificationType === "CriticalLabAlert";
    case "Pharmacy":
      return n.notificationType === "DrugExpiryAlert" || n.notificationType === "LowStockAlert";
    case "Shift":
      return n.notificationType === "ShiftReminder";
  }
}
function getNotificationConfig(n) {
  const isCritical = n.priority === "Critical";
  switch (n.notificationType) {
    case "AppointmentReminder":
      return {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4 text-blue-400" }),
        typeLabelText: "Appointment",
        typeLabelClass: "bg-blue-500/15 text-blue-400 border-blue-500/30"
      };
    case "CriticalLabAlert":
      return {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "h-4 w-4 text-destructive" }),
        typeLabelText: "Lab",
        typeLabelClass: "bg-destructive/15 text-destructive border-destructive/30"
      };
    case "DrugExpiryAlert":
      return {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { className: "h-4 w-4 text-orange-400" }),
        typeLabelText: "Drug Expiry",
        typeLabelClass: "bg-orange-500/15 text-orange-400 border-orange-500/30"
      };
    case "LowStockAlert":
      return {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 text-amber-400" }),
        typeLabelText: "Low Stock",
        typeLabelClass: "bg-amber-500/15 text-amber-400 border-amber-500/30"
      };
    case "ShiftReminder":
      return {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-violet-400" }),
        typeLabelText: "Shift",
        typeLabelClass: "bg-violet-500/15 text-violet-400 border-violet-500/30"
      };
    default:
      return {
        icon: isCritical ? /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-destructive" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4 text-muted-foreground" }),
        typeLabelText: "General",
        typeLabelClass: "bg-secondary text-foreground border-border"
      };
  }
}
function NotificationItem({
  notification,
  onRead
}) {
  const isCritical = notification.priority === "Critical";
  const isUnread = !notification.isRead;
  const config = getNotificationConfig(notification);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: () => !notification.isRead && onRead(notification.id),
      "data-ocid": `notification.item.${notification.id}`,
      className: [
        "w-full text-left flex gap-3 p-4 rounded-lg border transition-colors duration-200",
        isCritical ? "border-l-[3px] border-l-destructive border-border bg-destructive/5 hover:bg-destructive/10" : "border-border bg-card hover:bg-muted/40",
        isUnread ? "" : "opacity-70"
      ].join(" "),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: [
              "flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center mt-0.5",
              isCritical ? "bg-destructive/15" : "bg-muted"
            ].join(" "),
            children: config.icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              isUnread && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: [
                    "text-sm leading-snug",
                    isUnread ? "font-semibold text-foreground" : "font-normal text-muted-foreground"
                  ].join(" "),
                  children: notification.title
                }
              ),
              isCritical && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "destructive",
                  className: "text-[10px] px-1.5 py-0 h-4 font-bold tracking-wide",
                  "data-ocid": `notification.critical_badge.${notification.id}`,
                  children: "CRITICAL"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: `text-[10px] px-1.5 py-0 h-4 border ${config.typeLabelClass}`,
                  children: config.typeLabelText
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground flex-shrink-0", children: timeAgo(notification.createdAt) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: [
                "mt-1 text-[13px] leading-relaxed break-words",
                isUnread ? "text-foreground/80" : "text-muted-foreground"
              ].join(" "),
              children: notification.message
            }
          )
        ] })
      ]
    }
  );
}
const SKELETON_KEYS = ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5"];
function NotificationSkeletonItem() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 p-4 rounded-lg border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-9 h-9 rounded-full flex-shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-2/3" })
    ] })
  ] });
}
function NotificationsPage() {
  const [activeFilter, setActiveFilter] = reactExports.useState("All");
  const { data: notifications, isLoading } = useNotifications();
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllRead();
  const allNotifs = notifications ?? [];
  const unreadCount = allNotifs.filter((n) => !n.isRead).length;
  const sorted = [...allNotifs].sort((a, b) => {
    const aCrit = a.priority === "Critical" ? 1 : 0;
    const bCrit = b.priority === "Critical" ? 1 : 0;
    if (bCrit !== aCrit) return bCrit - aCrit;
    const aU = !a.isRead ? 1 : 0;
    const bU = !b.isRead ? 1 : 0;
    if (bU !== aU) return bU - aU;
    return Number(b.createdAt - a.createdAt);
  });
  const filtered = sorted.filter((n) => matchesFilter(n, activeFilter));
  const filterCounts = {
    Unread: unreadCount,
    Critical: allNotifs.filter((n) => n.priority === "Critical").length
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col h-full bg-background",
      "data-ocid": "notifications.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border bg-card px-6 py-4 flex items-center justify-between gap-4 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-semibold text-foreground leading-none", children: "Notifications" }),
                unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold",
                    "data-ocid": "notifications.unread_count",
                    children: unreadCount > 99 ? "99+" : unreadCount
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: unreadCount > 0 ? `${unreadCount} unread · ${allNotifs.length} total` : "All caught up — no unread notifications" })
            ] })
          ] }),
          unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: () => markAllRead.mutate(),
              disabled: markAllRead.isPending,
              className: "flex items-center gap-2",
              "data-ocid": "notifications.mark_all_read.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "h-3.5 w-3.5" }),
                "Mark all as read"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-card/50 px-6 py-2.5 flex items-center gap-2 overflow-x-auto", children: FILTER_TABS.map((tab) => {
          const count = filterCounts[tab.id];
          const isActive = activeFilter === tab.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setActiveFilter(tab.id),
              "data-ocid": `notifications.filter.${tab.id.toLowerCase()}`,
              className: [
                "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-150 border",
                isActive ? "bg-accent text-accent-foreground border-accent" : "bg-transparent text-muted-foreground border-border hover:border-accent/50 hover:text-foreground"
              ].join(" "),
              children: [
                tab.label,
                count != null && count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: [
                      "flex items-center justify-center h-4 min-w-4 px-1 rounded-full text-[10px] font-bold",
                      isActive ? "bg-accent-foreground/20 text-accent-foreground" : "bg-destructive text-destructive-foreground"
                    ].join(" "),
                    children: count
                  }
                )
              ]
            },
            tab.id
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto px-6 py-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: SKELETON_KEYS.map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationSkeletonItem, {}, key)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-20 text-center",
            "data-ocid": "notifications.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-7 w-7 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-foreground mb-1", children: activeFilter === "All" ? "No notifications yet" : `No ${activeFilter.toLowerCase()} notifications` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: activeFilter === "Unread" ? "You're all caught up! Every notification has been read." : "There are no notifications matching this filter right now." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", "data-ocid": "notifications.list", children: filtered.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          NotificationItem,
          {
            notification: n,
            onRead: (id) => markRead.mutate(id)
          },
          n.id.toString()
        )) }) })
      ]
    }
  );
}
export {
  NotificationsPage
};
