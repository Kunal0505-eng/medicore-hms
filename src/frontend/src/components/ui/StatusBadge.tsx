import { cn } from "@/lib/utils";

type StatusVariant =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  | "available"
  | "occupied"
  | "maintenance"
  | "reserved";

const VARIANT_CLASSES: Record<StatusVariant, string> = {
  success: "bg-green-500/15 text-green-400 border-green-500/30",
  warning: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  danger: "bg-red-500/15 text-red-400 border-red-500/30",
  info: "bg-accent/15 text-accent border-accent/30",
  neutral: "bg-muted/30 text-muted-foreground border-border",
  available: "bg-green-500/15 text-green-400 border-green-500/30",
  occupied: "bg-red-500/15 text-red-400 border-red-500/30",
  maintenance: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  reserved: "bg-blue-500/15 text-blue-400 border-blue-500/30",
};

function inferVariant(status: string): StatusVariant {
  const s = status.toLowerCase();
  if (
    [
      "active",
      "available",
      "paid",
      "completed",
      "approved",
      "clean",
      "dispensed",
      "resultready",
      "reported",
    ].some((k) => s.includes(k))
  )
    return "success";
  if (
    [
      "pending",
      "scheduled",
      "ordered",
      "processing",
      "inprogress",
      "draft",
      "submitted",
    ].some((k) => s.includes(k))
  )
    return "warning";
  if (
    [
      "cancelled",
      "inactive",
      "suspended",
      "rejected",
      "decommissioned",
      "discharged",
      "dirty",
    ].some((k) => s.includes(k))
  )
    return "danger";
  if (["admitted", "occupied", "critical", "trauma"].some((k) => s.includes(k)))
    return "danger";
  if (
    ["reserved", "inuse", "inmaintenance", "telemedicine"].some((k) =>
      s.includes(k),
    )
  )
    return "reserved";
  if (["opd", "transferred"].some((k) => s.includes(k))) return "info";
  return "neutral";
}

interface StatusBadgeProps {
  status: string;
  variant?: StatusVariant;
  className?: string;
}

export function StatusBadge({ status, variant, className }: StatusBadgeProps) {
  const v = variant ?? inferVariant(status);
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        VARIANT_CLASSES[v],
        className,
      )}
    >
      {status}
    </span>
  );
}
