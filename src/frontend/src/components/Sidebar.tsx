import { useRoleAccess } from "@/hooks/useRoleAccess";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  AlertTriangle,
  BarChart3,
  BedDouble,
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Cross,
  FileText,
  FlaskConical,
  LayoutDashboard,
  PackageSearch,
  Pill,
  Radiation,
  Receipt,
  Settings,
  UserCog,
  Users,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  module: string;
}

interface NavGroup {
  label: string;
  icon: React.ElementType;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Patient Ops",
    icon: Users,
    items: [
      { label: "Patients", path: "/patients", icon: Users, module: "patients" },
      {
        label: "Appointments",
        path: "/appointments",
        icon: CalendarDays,
        module: "appointments",
      },
      {
        label: "Emergency",
        path: "/emergency",
        icon: AlertTriangle,
        module: "emergency",
      },
    ],
  },
  {
    label: "Clinical",
    icon: FileText,
    items: [
      { label: "EMR", path: "/emr", icon: FileText, module: "emr" },
      { label: "Laboratory", path: "/lab", icon: FlaskConical, module: "lab" },
      {
        label: "Radiology",
        path: "/radiology",
        icon: Radiation,
        module: "radiology",
      },
      { label: "Ward & Beds", path: "/ward", icon: BedDouble, module: "ward" },
    ],
  },
  {
    label: "Staff",
    icon: UserCog,
    items: [
      {
        label: "Doctors & Staff",
        path: "/staff",
        icon: UserCog,
        module: "staff",
      },
    ],
  },
  {
    label: "Pharmacy",
    icon: Pill,
    items: [
      { label: "Pharmacy", path: "/pharmacy", icon: Pill, module: "pharmacy" },
    ],
  },
  {
    label: "Finance",
    icon: Receipt,
    items: [
      { label: "Billing", path: "/billing", icon: Receipt, module: "billing" },
    ],
  },
  {
    label: "Inventory",
    icon: PackageSearch,
    items: [
      {
        label: "Inventory",
        path: "/inventory",
        icon: PackageSearch,
        module: "inventory",
      },
    ],
  },
  {
    label: "Reports",
    icon: BarChart3,
    items: [
      {
        label: "Analytics",
        path: "/reports",
        icon: BarChart3,
        module: "reports",
      },
    ],
  },
  {
    label: "Notifications",
    icon: Bell,
    items: [
      {
        label: "Notifications",
        path: "/notifications",
        icon: Bell,
        module: "notifications",
      },
    ],
  },
  {
    label: "Administration",
    icon: Settings,
    items: [
      {
        label: "Settings & Admin",
        path: "/admin",
        icon: Settings,
        module: "admin",
      },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  onClose?: () => void;
}

export function Sidebar({ collapsed, onClose }: SidebarProps) {
  const { canAccess } = useRoleAccess();
  const routerState = useRouterState();
  const pathname: string = routerState.location.href;
  const [openGroups, setOpenGroups] = useState<string[]>([
    "Patient Ops",
    "Clinical",
  ]);

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) =>
      prev.includes(label) ? prev.filter((g) => g !== label) : [...prev, label],
    );
  };

  const filteredGroups = NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) => canAccess(item.module)),
  })).filter((group) => group.items.length > 0);

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-[oklch(0.12_0.01_270)] border-r border-[oklch(0.22_0.02_270)] transition-smooth",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[oklch(0.22_0.02_270)]">
        <div className="flex-shrink-0 w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
          <Cross
            className="h-4 w-4 text-[oklch(0.12_0.01_270)]"
            strokeWidth={2.5}
          />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="font-bold text-foreground text-sm leading-tight">
              St. Jude
            </p>
            <p className="text-[10px] text-muted-foreground">
              General Hospital
            </p>
          </div>
        )}
      </div>

      {/* Dashboard link */}
      <div className="px-2 pt-3 pb-1">
        <Link
          to="/"
          onClick={onClose}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
            pathname === "/"
              ? "bg-accent/20 text-accent"
              : "text-[oklch(0.7_0.01_270)] hover:bg-white/5 hover:text-foreground",
          )}
          data-ocid="nav.dashboard.link"
        >
          <LayoutDashboard className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span>Dashboard</span>}
        </Link>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5 scrollbar-thin">
        {filteredGroups.map((group) => {
          const isOpen = openGroups.includes(group.label);
          const GroupIcon = group.icon;

          if (group.items.length === 1) {
            const item = group.items[0];
            const ItemIcon = item.icon;
            const isActive =
              pathname === item.path || pathname.startsWith(`${item.path}/`);
            return (
              <Link
                key={item.path}
                to={item.path as "/"}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
                  isActive
                    ? "bg-accent/20 text-accent"
                    : "text-[oklch(0.7_0.01_270)] hover:bg-white/5 hover:text-foreground",
                )}
                data-ocid={`nav.${item.module}.link`}
              >
                <ItemIcon className="h-4 w-4 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          }

          return (
            <div key={group.label}>
              {!collapsed && (
                <button
                  type="button"
                  onClick={() => toggleGroup(group.label)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-[oklch(0.5_0.01_270)] hover:text-[oklch(0.7_0.01_270)] transition-smooth"
                  data-ocid={`nav.group.${group.label.toLowerCase().replace(/ /g, "_")}.toggle`}
                >
                  <GroupIcon className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="flex-1 text-left">{group.label}</span>
                  {isOpen ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </button>
              )}
              {(collapsed || isOpen) && (
                <div className={cn("space-y-0.5", !collapsed && "ml-1")}>
                  {group.items.map((item) => {
                    const ItemIcon = item.icon;
                    const isActive =
                      pathname === item.path ||
                      pathname.startsWith(`${item.path}/`);
                    return (
                      <Link
                        key={item.path}
                        to={item.path as "/"}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-smooth",
                          isActive
                            ? "bg-accent/20 text-accent font-medium"
                            : "text-[oklch(0.65_0.01_270)] hover:bg-white/5 hover:text-foreground",
                        )}
                        data-ocid={`nav.${item.module}.link`}
                      >
                        <ItemIcon className="h-4 w-4 flex-shrink-0" />
                        {!collapsed && <span>{item.label}</span>}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
