import type { UserRole } from "@/backend";
import { useAuth } from "@/context/AuthContext";

const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  SuperAdmin: [
    "patients",
    "appointments",
    "emr",
    "lab",
    "pharmacy",
    "ward",
    "billing",
    "radiology",
    "emergency",
    "inventory",
    "reports",
    "notifications",
    "admin",
    "staff",
  ],
  Doctor: [
    "patients",
    "appointments",
    "emr",
    "lab",
    "radiology",
    "emergency",
    "notifications",
  ],
  Nurse: [
    "patients",
    "appointments",
    "emr",
    "ward",
    "emergency",
    "notifications",
  ],
  Receptionist: ["patients", "appointments", "billing", "notifications"],
  Pharmacist: ["pharmacy", "notifications"],
  LabTechnician: ["lab", "notifications"],
  Patient: ["appointments", "emr", "billing", "notifications"],
};

export function useRoleAccess() {
  const { user } = useAuth();

  const permissions = user ? (ROLE_PERMISSIONS[user.role] ?? []) : [];

  const canAccess = (module: string): boolean => {
    return permissions.includes(module);
  };

  const hasRole = (...roles: UserRole[]): boolean => {
    return !!user && roles.includes(user.role);
  };

  return { canAccess, hasRole, permissions, role: user?.role };
}
