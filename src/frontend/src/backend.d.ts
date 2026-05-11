import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface POItem {
    quantity: bigint;
    drugId: DrugId;
    unitCost: bigint;
}
export type EquipmentId = bigint;
export type PurchaseOrderId = bigint;
export type BillId = bigint;
export type AppointmentId = bigint;
export interface WorkingHours {
    startTime: string;
    endTime: string;
    dayOfWeek: bigint;
    maxPatients: bigint;
}
export type PatientId = bigint;
export type ERTriageId = bigint;
export interface IndentRequest {
    id: IndentId;
    status: IndentStatus;
    createdAt: Timestamp;
    requestedById: UserId;
    items: Array<IndentItem>;
}
export type SupplierId = bigint;
export interface ERTriage {
    id: ERTriageId;
    status: ERStatus;
    isTraumaCase: boolean;
    arrivalTime: Timestamp;
    patientId?: PatientId;
    esiLevel: bigint;
    treatedByDoctorId?: DoctorId;
    dischargedAt?: Timestamp;
    bedId?: BedId;
    isUnknownPatient: boolean;
    chiefComplaint: string;
}
export interface SOAPNotes {
    assessment: string;
    objective: string;
    plan: string;
    subjective: string;
}
export interface Drug {
    id: DrugId;
    expiryDate: string;
    name: string;
    sellingPrice: bigint;
    quantityOnHand: bigint;
    isActive: boolean;
    dosageForm: string;
    strength: string;
    genericName: string;
    category: string;
    batchNo: string;
    reorderLevel: bigint;
    costPrice: bigint;
    supplierId?: SupplierId;
}
export type BedId = bigint;
export interface Service {
    id: ServiceId;
    name: string;
    isActive: boolean;
    category: string;
    basePrice: bigint;
}
export type LabOrderId = bigint;
export type LeaveRequestId = bigint;
export type UserId = bigint;
export interface DutyRoster {
    id: DutyRosterId;
    status: string;
    userId: UserId;
    date: string;
    shift: ShiftType;
    wardId?: WardId;
}
export type NotificationId = bigint;
export interface Notification {
    id: NotificationId;
    title: string;
    userId: UserId;
    notificationType: NotificationType;
    createdAt: Timestamp;
    isRead: boolean;
    message: string;
    priority: NotificationPriority;
    relatedId?: string;
}
export type IndentId = bigint;
export interface Bill {
    id: BillId;
    status: BillStatus;
    insuranceClaimId?: string;
    patientId: PatientId;
    createdAt: Timestamp;
    discountPercent: bigint;
    billType: BillType;
    totalAmount: bigint;
    visitId?: VisitId;
    paymentMode?: PaymentMode;
    items: Array<BillItem>;
    paidAmount: bigint;
    subtotal: bigint;
}
export interface Bed {
    id: BedId;
    status: BedStatus;
    housekeepingStatus: HousekeepingStatus;
    patientId?: PatientId;
    bedNumber: string;
    notes?: string;
    wardId: WardId;
}
export interface Supplier {
    id: SupplierId;
    categories: Array<string>;
    name: string;
    email: string;
    address: string;
    paymentTerms: string;
    phone: string;
}
export interface Appointment {
    id: AppointmentId;
    status: AppointmentStatus;
    doctorId: DoctorId;
    tokenNumber: bigint;
    patientId: PatientId;
    cancellationReason?: string;
    date: string;
    createdAt: Timestamp;
    appointmentType: AppointmentType;
    notes?: string;
    timeSlot: string;
}
export type WardId = bigint;
export type Timestamp = bigint;
export type DutyRosterId = bigint;
export type DrugId = bigint;
export interface DoctorProfile {
    id: DoctorId;
    wardIds: Array<string>;
    userId: UserId;
    qualifications: Array<string>;
    specialization: string;
    schedule: Array<WorkingHours>;
    consultationFee: bigint;
    departmentId?: string;
}
export interface AuditLog {
    id: bigint;
    action: string;
    userId: UserId;
    entityId: string;
    timestamp: Timestamp;
    details: string;
    entityType: string;
}
export interface Patient {
    id: PatientId;
    dob: string;
    mrn: string;
    admittedBedId?: BedId;
    status: PatientStatus;
    insuranceProvider?: string;
    admissionDate?: Timestamp;
    insuranceId?: string;
    createdAt: Timestamp;
    emergencyContact: string;
    photoUrl?: string;
    email: string;
    bloodGroup: string;
    address: string;
    gender: string;
    wardId?: WardId;
    phone: string;
    lastName: string;
    dischargeDate?: Timestamp;
    allergies: Array<string>;
    firstName: string;
}
export interface LeaveRequest {
    id: LeaveRequestId;
    status: LeaveStatus;
    endDate: string;
    userId: UserId;
    createdAt: Timestamp;
    startDate: string;
    reason: string;
}
export interface IndentItem {
    itemId: bigint;
    itemName: string;
    quantity: bigint;
}
export type RadiologyOrderId = bigint;
export interface PurchaseOrder {
    id: PurchaseOrderId;
    status: POStatus;
    createdAt: Timestamp;
    expectedDelivery?: string;
    items: Array<POItem>;
    supplierId: SupplierId;
}
export interface Ward {
    id: WardId;
    name: string;
    totalBeds: bigint;
    isActive: boolean;
    wardType: WardType;
    inchargeNurseId?: UserId;
}
export interface VitalSigns {
    bp: string;
    weight: string;
    height: string;
    temperature: string;
    spo2: string;
    recordedAt: Timestamp;
    pulse: string;
}
export interface Visit {
    id: VisitId;
    doctorId: DoctorId;
    documentUrls: Array<string>;
    patientId: PatientId;
    createdAt: Timestamp;
    soapNotes: SOAPNotes;
    visitDate: Timestamp;
    diagnoses: Array<Diagnosis>;
    vitals?: VitalSigns;
    prescriptions: Array<Prescription>;
    chiefComplaint: string;
}
export type ServiceId = bigint;
export type VisitId = bigint;
export interface HospitalProfile {
    id: bigint;
    timezone: string;
    name: string;
    email: string;
    logoUrl?: string;
    currency: string;
    address: string;
    phone: string;
    branding?: string;
    registrationNo: string;
}
export type DoctorId = bigint;
export interface User {
    id: UserId;
    status: UserStatus;
    principal: Principal;
    name: string;
    createdAt: Timestamp;
    role: UserRole;
    email: string;
    departmentId?: string;
}
export interface Diagnosis {
    icd10Code: string;
    description: string;
    diagnosisType: DiagnosisType;
}
export type ConsumableId = bigint;
export interface BillItem {
    serviceName: string;
    total: bigint;
    quantity: bigint;
    serviceId: ServiceId;
    unitPrice: bigint;
}
export interface LabOrder {
    id: LabOrderId;
    status: LabStatus;
    doctorId: DoctorId;
    isCritical: boolean;
    patientId: PatientId;
    createdAt: Timestamp;
    testName: string;
    testType: string;
    sampleCollectedAt?: Timestamp;
    resultEnteredAt?: Timestamp;
    referenceRange?: string;
    notes?: string;
    visitId?: VisitId;
    resultFile?: string;
    resultValue?: string;
}
export interface EquipmentItem {
    id: EquipmentId;
    status: EquipmentStatus;
    purchaseDate: string;
    nextServiceDate?: string;
    cost: bigint;
    name: string;
    serialNumber: string;
    category: string;
    wardId?: WardId;
}
export interface RadiologyOrder {
    id: RadiologyOrderId;
    reportUrl?: string;
    status: RadiologyStatus;
    doctorId: DoctorId;
    patientId: PatientId;
    imagingType: ImagingType;
    createdAt: Timestamp;
    findings?: string;
    radiologistId?: UserId;
    clinicalIndication: string;
    bodyPart: string;
}
export interface Prescription {
    status: PrescriptionStatus;
    duration: string;
    drugName: string;
    dose: string;
    dosageForm: string;
    notes?: string;
    frequency: string;
    drugId?: DrugId;
}
export interface Consumable {
    id: ConsumableId;
    name: string;
    quantity: bigint;
    reorderLevel: bigint;
    supplierId?: SupplierId;
    unitCost: bigint;
}
export enum AppointmentStatus {
    Confirmed = "Confirmed",
    Scheduled = "Scheduled",
    Cancelled = "Cancelled",
    InProgress = "InProgress",
    Completed = "Completed"
}
export enum AppointmentType {
    OPD = "OPD",
    Telemedicine = "Telemedicine"
}
export enum BedStatus {
    Available = "Available",
    Reserved = "Reserved",
    Maintenance = "Maintenance",
    Occupied = "Occupied"
}
export enum BillStatus {
    PartiallyPaid = "PartiallyPaid",
    Refunded = "Refunded",
    Paid = "Paid",
    Pending = "Pending"
}
export enum BillType {
    IPD = "IPD",
    OPD = "OPD"
}
export enum DiagnosisType {
    Secondary = "Secondary",
    Primary = "Primary"
}
export enum ERStatus {
    Discharged = "Discharged",
    InTreatment = "InTreatment",
    Waiting = "Waiting"
}
export enum EquipmentStatus {
    Decommissioned = "Decommissioned",
    Active = "Active",
    InMaintenance = "InMaintenance"
}
export enum HousekeepingStatus {
    Dirty = "Dirty",
    InProgress = "InProgress",
    Clean = "Clean"
}
export enum ImagingType {
    CT = "CT",
    MRI = "MRI",
    XRay = "XRay",
    Ultrasound = "Ultrasound",
    Other = "Other"
}
export enum IndentStatus {
    Approved = "Approved",
    Rejected = "Rejected",
    Fulfilled = "Fulfilled",
    Pending = "Pending"
}
export enum LabStatus {
    Ordered = "Ordered",
    ResultReady = "ResultReady",
    Reported = "Reported",
    Processing = "Processing",
    SampleCollected = "SampleCollected"
}
export enum LeaveStatus {
    Approved = "Approved",
    Rejected = "Rejected",
    Pending = "Pending"
}
export enum NotificationPriority {
    Normal = "Normal",
    Critical = "Critical"
}
export enum NotificationType {
    CriticalLabAlert = "CriticalLabAlert",
    LowStockAlert = "LowStockAlert",
    ShiftReminder = "ShiftReminder",
    AppointmentReminder = "AppointmentReminder",
    General = "General",
    DrugExpiryAlert = "DrugExpiryAlert"
}
export enum POStatus {
    Draft = "Draft",
    Received = "Received",
    Cancelled = "Cancelled",
    Submitted = "Submitted"
}
export enum PatientStatus {
    OPD = "OPD",
    Discharged = "Discharged",
    Admitted = "Admitted",
    Transferred = "Transferred"
}
export enum PaymentMode {
    UPI = "UPI",
    Insurance = "Insurance",
    Card = "Card",
    Cash = "Cash"
}
export enum PrescriptionStatus {
    Dispensed = "Dispensed",
    Pending = "Pending"
}
export enum RadiologyStatus {
    ImagingDone = "ImagingDone",
    Ordered = "Ordered",
    ReportReady = "ReportReady",
    Reported = "Reported"
}
export enum ShiftType {
    Night = "Night",
    Afternoon = "Afternoon",
    Morning = "Morning"
}
export enum UserRole {
    Nurse = "Nurse",
    Doctor = "Doctor",
    SuperAdmin = "SuperAdmin",
    Receptionist = "Receptionist",
    Pharmacist = "Pharmacist",
    Patient = "Patient",
    LabTechnician = "LabTechnician"
}
export enum UserStatus {
    Inactive = "Inactive",
    Active = "Active",
    Suspended = "Suspended"
}
export enum WardType {
    ICU = "ICU",
    Maternity = "Maternity",
    Private = "Private",
    General = "General",
    Emergency = "Emergency"
}
export interface backendInterface {
    admitPatient(patientId: PatientId, bedId: BedId, wardId: WardId): Promise<boolean>;
    cancelAppointment(id: AppointmentId, reason: string): Promise<boolean>;
    createAppointment(patientId: PatientId, doctorId: DoctorId, date: string, timeSlot: string, appointmentType: AppointmentType, notes: string | null): Promise<Appointment>;
    createBed(wardId: WardId, bedNumber: string): Promise<Bed>;
    createBill(patientId: PatientId, visitId: VisitId | null, billType: BillType, items: Array<BillItem>, discountPercent: bigint, paymentMode: PaymentMode | null): Promise<Bill>;
    createConsumable(name: string, quantity: bigint, reorderLevel: bigint, unitCost: bigint, supplierId: SupplierId | null): Promise<Consumable>;
    createDoctorProfile(userId: UserId, specialization: string, qualifications: Array<string>, departmentId: string | null, consultationFee: bigint, schedule: Array<WorkingHours>): Promise<DoctorProfile>;
    createDrug(name: string, genericName: string, dosageForm: string, strength: string, category: string, quantityOnHand: bigint, reorderLevel: bigint, expiryDate: string, batchNo: string, costPrice: bigint, sellingPrice: bigint, supplierId: SupplierId | null): Promise<Drug>;
    createDutyRosterEntry(userId: UserId, date: string, shift: ShiftType, wardId: WardId | null): Promise<DutyRoster>;
    createERTriage(patientId: PatientId | null, esiLevel: bigint, chiefComplaint: string, isTraumaCase: boolean, isUnknownPatient: boolean, bedId: BedId | null): Promise<ERTriage>;
    createEquipmentItem(name: string, category: string, serialNumber: string, purchaseDate: string, cost: bigint, wardId: WardId | null): Promise<EquipmentItem>;
    createIndentRequest(requestedById: UserId, items: Array<IndentItem>): Promise<IndentRequest>;
    createLabOrder(patientId: PatientId, doctorId: DoctorId, visitId: VisitId | null, testType: string, testName: string): Promise<LabOrder>;
    createLeaveRequest(userId: UserId, startDate: string, endDate: string, reason: string): Promise<LeaveRequest>;
    createNotification(userId: UserId, notificationType: NotificationType, title: string, message: string, priority: NotificationPriority, relatedId: string | null): Promise<Notification>;
    createPatient(firstName: string, lastName: string, dob: string, gender: string, bloodGroup: string, phone: string, email: string, address: string, emergencyContact: string): Promise<Patient>;
    createPurchaseOrder(supplierId: SupplierId, items: Array<POItem>, expectedDelivery: string | null): Promise<PurchaseOrder>;
    createRadiologyOrder(patientId: PatientId, doctorId: DoctorId, imagingType: ImagingType, bodyPart: string, clinicalIndication: string): Promise<RadiologyOrder>;
    createService(name: string, category: string, basePrice: bigint): Promise<Service>;
    createSupplier(name: string, phone: string, email: string, address: string, categories: Array<string>, paymentTerms: string): Promise<Supplier>;
    createUser(principal: Principal, name: string, email: string, role: UserRole, departmentId: string | null): Promise<User>;
    createVisit(patientId: PatientId, doctorId: DoctorId, chiefComplaint: string, soapNotes: SOAPNotes, diagnoses: Array<Diagnosis>, prescriptions: Array<Prescription>, vitals: VitalSigns | null): Promise<Visit>;
    createWard(name: string, wardType: WardType, totalBeds: bigint, inchargeNurseId: UserId | null): Promise<Ward>;
    dischargePatient(patientId: PatientId): Promise<boolean>;
    dispensePrescription(visitId: VisitId, drugName: string): Promise<boolean>;
    getActiveERTriages(): Promise<Array<ERTriage>>;
    getAppointments(): Promise<Array<Appointment>>;
    getAppointmentsByDoctor(doctorId: DoctorId): Promise<Array<Appointment>>;
    getAppointmentsByPatient(patientId: PatientId): Promise<Array<Appointment>>;
    getAuditLogs(): Promise<Array<AuditLog>>;
    getBeds(): Promise<Array<Bed>>;
    getBedsByWard(wardId: WardId): Promise<Array<Bed>>;
    getBill(id: BillId): Promise<Bill | null>;
    getBills(): Promise<Array<Bill>>;
    getBillsByPatient(patientId: PatientId): Promise<Array<Bill>>;
    getConsumables(): Promise<Array<Consumable>>;
    getDoctor(id: DoctorId): Promise<DoctorProfile | null>;
    getDoctors(): Promise<Array<DoctorProfile>>;
    getDrug(id: DrugId): Promise<Drug | null>;
    getDrugs(): Promise<Array<Drug>>;
    getDutyRoster(): Promise<Array<DutyRoster>>;
    getERTriages(): Promise<Array<ERTriage>>;
    getEquipment(): Promise<Array<EquipmentItem>>;
    getHospitalProfile(): Promise<HospitalProfile | null>;
    getIndentRequests(): Promise<Array<IndentRequest>>;
    getLabOrder(id: LabOrderId): Promise<LabOrder | null>;
    getLabOrders(): Promise<Array<LabOrder>>;
    getLabOrdersByPatient(patientId: PatientId): Promise<Array<LabOrder>>;
    getLeaveRequests(): Promise<Array<LeaveRequest>>;
    getLowStockDrugs(): Promise<Array<Drug>>;
    getNotifications(userId: UserId): Promise<Array<Notification>>;
    getOPDQueue(doctorId: DoctorId, date: string): Promise<Array<Appointment>>;
    getPatient(id: PatientId): Promise<Patient | null>;
    getPatients(): Promise<Array<Patient>>;
    getPrescriptions(patientId: PatientId): Promise<Array<Prescription>>;
    getPrescriptionsByPatient(patientId: PatientId): Promise<Array<Prescription>>;
    getPurchaseOrders(): Promise<Array<PurchaseOrder>>;
    getRadiologyOrders(): Promise<Array<RadiologyOrder>>;
    getRadiologyOrdersByPatient(patientId: PatientId): Promise<Array<RadiologyOrder>>;
    getServices(): Promise<Array<Service>>;
    getSuppliers(): Promise<Array<Supplier>>;
    getUser(id: UserId): Promise<User | null>;
    getUsers(): Promise<Array<User>>;
    getVisit(id: VisitId): Promise<Visit | null>;
    getVisits(): Promise<Array<Visit>>;
    getVisitsByPatient(patientId: PatientId): Promise<Array<Visit>>;
    getWard(id: WardId): Promise<Ward | null>;
    getWards(): Promise<Array<Ward>>;
    initSampleData(): Promise<string>;
    markAllNotificationsRead(userId: UserId): Promise<void>;
    markNotificationRead(id: NotificationId): Promise<boolean>;
    transferPatient(patientId: PatientId, newWardId: WardId, newBedId: BedId): Promise<boolean>;
    updateAppointment(id: AppointmentId, date: string, timeSlot: string, notes: string | null): Promise<boolean>;
    updateBedStatus(bedId: BedId, status: BedStatus, housekeepingStatus: HousekeepingStatus, notes: string | null): Promise<boolean>;
    updateBillPayment(id: BillId, paidAmount: bigint, paymentMode: PaymentMode): Promise<boolean>;
    updateDrugStock(drugId: DrugId, quantityChange: bigint): Promise<boolean>;
    updateERTriage(id: ERTriageId, status: ERStatus, treatedByDoctorId: DoctorId | null, bedId: BedId | null): Promise<boolean>;
    updateHospitalProfile(name: string, address: string, phone: string, email: string, registrationNo: string, timezone: string, currency: string): Promise<HospitalProfile>;
    updateIndentStatus(id: IndentId, status: IndentStatus): Promise<boolean>;
    updateLabOrderResult(id: LabOrderId, resultValue: string | null, resultFile: string | null, isCritical: boolean, referenceRange: string | null, notes: string | null): Promise<boolean>;
    updateLabOrderStatus(id: LabOrderId, status: LabStatus): Promise<boolean>;
    updateLeaveStatus(id: LeaveRequestId, status: LeaveStatus): Promise<boolean>;
    updatePatient(id: PatientId, firstName: string, lastName: string, phone: string, email: string, address: string, allergies: Array<string>, bloodGroup: string, insuranceId: string | null, insuranceProvider: string | null): Promise<boolean>;
    updateRadiologyReport(id: RadiologyOrderId, reportUrl: string | null, findings: string | null, radiologistId: UserId | null, status: RadiologyStatus): Promise<boolean>;
    updateUserStatus(id: UserId, status: UserStatus): Promise<boolean>;
    updateVisit(id: VisitId, soapNotes: SOAPNotes, diagnoses: Array<Diagnosis>, prescriptions: Array<Prescription>, vitals: VitalSigns | null): Promise<boolean>;
}
