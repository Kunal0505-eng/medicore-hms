// Re-export all types from the generated backend bindings
export type {
  Patient,
  PatientId,
  PatientStatus,
  Appointment,
  AppointmentId,
  AppointmentStatus,
  AppointmentType,
  DoctorProfile,
  DoctorId,
  User,
  UserId,
  UserRole,
  UserStatus,
  Visit,
  VisitId,
  SOAPNotes,
  VitalSigns,
  Diagnosis,
  DiagnosisType,
  Prescription,
  PrescriptionStatus,
  LabOrder,
  LabOrderId,
  LabStatus,
  Drug,
  DrugId,
  PurchaseOrder,
  PurchaseOrderId,
  POItem,
  POStatus,
  Ward,
  WardId,
  WardType,
  Bed,
  BedId,
  BedStatus,
  HousekeepingStatus,
  Bill,
  BillId,
  BillItem,
  BillStatus,
  BillType,
  PaymentMode,
  Service,
  ServiceId,
  RadiologyOrder,
  RadiologyOrderId,
  RadiologyStatus,
  ImagingType,
  ERTriage,
  ERTriageId,
  ERStatus,
  EquipmentItem,
  EquipmentId,
  EquipmentStatus,
  Consumable,
  ConsumableId,
  Supplier,
  SupplierId,
  IndentRequest,
  IndentId,
  IndentItem,
  IndentStatus,
  Notification,
  NotificationId,
  NotificationType,
  NotificationPriority,
  HospitalProfile,
  AuditLog,
  DutyRoster,
  DutyRosterId,
  ShiftType,
  LeaveRequest,
  LeaveRequestId,
  LeaveStatus,
  WorkingHours,
  Timestamp,
} from "@/backend";

// App-level types
export interface DemoUser {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  department?: string;
  userId: bigint;
}

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

export interface NavGroup {
  label: string;
  icon: string;
  items: NavItem[];
}

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
  className?: string;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export type SortDirection = "asc" | "desc" | null;

export interface SortState {
  column: string | null;
  direction: SortDirection;
}
