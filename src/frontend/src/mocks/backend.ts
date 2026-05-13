import type { backendInterface, Appointment, Bed, Bill, Consumable, DoctorProfile, Drug, DutyRoster, ERTriage, EquipmentItem, HospitalProfile, IndentRequest, LabOrder, LeaveRequest, Notification, Patient, PurchaseOrder, RadiologyOrder, Service, Supplier, User, Visit, Ward, AuditLog } from "../backend";
import { AppointmentStatus, AppointmentType, BedStatus, BillStatus, BillType, ERStatus, EquipmentStatus, HousekeepingStatus, ImagingType, IndentStatus, LabStatus, LeaveStatus, NotificationPriority, NotificationType, PatientStatus, PaymentMode, POStatus, PrescriptionStatus, RadiologyStatus, ShiftType, UserRole, UserStatus, WardType } from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);

const samplePatients: Patient[] = [
  { id: BigInt(1), mrn: "MRN-001", firstName: "Aarav", lastName: "Sharma", dob: "1985-03-12", gender: "Male", bloodGroup: "O+", phone: "+91 98765 43210", email: "aarav.sharma@gmail.com", address: "14 Rajpur Road, Civil Lines, Delhi 110054", emergencyContact: "+91 98765 43211", allergies: ["Penicillin"], status: PatientStatus.OPD, createdAt: now },
  { id: BigInt(2), mrn: "MRN-002", firstName: "Priya", lastName: "Iyer", dob: "1990-07-25", gender: "Female", bloodGroup: "A+", phone: "+91 99887 76655", email: "priya.iyer@yahoo.in", address: "22 Bandra West, Mumbai 400050", emergencyContact: "+91 99887 76656", allergies: [], status: PatientStatus.Admitted, createdAt: now, wardId: BigInt(1), admittedBedId: BigInt(1), admissionDate: now },
  { id: BigInt(3), mrn: "MRN-003", firstName: "Suresh", lastName: "Reddy", dob: "1972-11-08", gender: "Male", bloodGroup: "B-", phone: "+91 91234 56789", email: "suresh.reddy@outlook.com", address: "5 Jubilee Hills, Hyderabad 500033", emergencyContact: "+91 91234 56790", allergies: ["Sulfa"], status: PatientStatus.Discharged, createdAt: now },
  { id: BigInt(4), mrn: "MRN-004", firstName: "Kavita", lastName: "Nair", dob: "1995-05-20", gender: "Female", bloodGroup: "AB+", phone: "+91 90011 22334", email: "kavita.nair@gmail.com", address: "8 Koregaon Park, Pune 411001", emergencyContact: "+91 90011 22335", allergies: [], status: PatientStatus.OPD, createdAt: now },
  { id: BigInt(5), mrn: "MRN-005", firstName: "Vikram", lastName: "Singh", dob: "1968-09-14", gender: "Male", bloodGroup: "O-", phone: "+91 87654 32109", email: "vikram.singh@rediffmail.com", address: "45 Hazratganj, Lucknow 226001", emergencyContact: "+91 87654 32110", allergies: ["Aspirin"], status: PatientStatus.Admitted, createdAt: now, wardId: BigInt(2), admittedBedId: BigInt(3), admissionDate: now },
  { id: BigInt(6), mrn: "MRN-006", firstName: "Meera", lastName: "Desai", dob: "1980-01-30", gender: "Female", bloodGroup: "B+", phone: "+91 78901 23456", email: "meera.desai@gmail.com", address: "17 CG Road, Navrangpura, Ahmedabad 380009", emergencyContact: "+91 78901 23457", allergies: [], status: PatientStatus.OPD, createdAt: now },
  { id: BigInt(7), mrn: "MRN-007", firstName: "Arjun", lastName: "Bose", dob: "1988-06-17", gender: "Male", bloodGroup: "A-", phone: "+91 76543 21098", email: "arjun.bose@gmail.com", address: "32 Park Street, Kolkata 700016", emergencyContact: "+91 76543 21099", allergies: ["Codeine"], status: PatientStatus.OPD, createdAt: now },
  { id: BigInt(8), mrn: "MRN-008", firstName: "Sunita", lastName: "Gupta", dob: "1975-12-03", gender: "Female", bloodGroup: "O+", phone: "+91 98123 45678", email: "sunita.gupta@gmail.com", address: "9 MI Road, Jaipur 302001", emergencyContact: "+91 98123 45679", allergies: [], status: PatientStatus.Admitted, createdAt: now, wardId: BigInt(1), admittedBedId: BigInt(2), admissionDate: now },
  { id: BigInt(9), mrn: "MRN-009", firstName: "Ravi", lastName: "Chandran", dob: "1962-04-22", gender: "Male", bloodGroup: "AB-", phone: "+91 94321 09876", email: "ravi.chandran@outlook.com", address: "56 Anna Salai, Chennai 600002", emergencyContact: "+91 94321 09877", allergies: ["NSAIDs"], status: PatientStatus.Discharged, createdAt: now },
  { id: BigInt(10), mrn: "MRN-010", firstName: "Pooja", lastName: "Malhotra", dob: "1992-08-09", gender: "Female", bloodGroup: "A+", phone: "+91 93210 98765", email: "pooja.malhotra@gmail.com", address: "3 Sector 17, Chandigarh 160017", emergencyContact: "+91 93210 98766", allergies: [], status: PatientStatus.OPD, createdAt: now },
];

const sampleDoctors: DoctorProfile[] = [
  { id: BigInt(1), userId: BigInt(2), specialization: "Cardiology", qualifications: ["MBBS", "MD", "DM Cardiology"], consultationFee: BigInt(1000), schedule: [], wardIds: ["1"] },
  { id: BigInt(2), userId: BigInt(3), specialization: "Neurology", qualifications: ["MBBS", "MD", "DM Neurology"], consultationFee: BigInt(1200), schedule: [], wardIds: [] },
];

const sampleWards: Ward[] = [
  { id: BigInt(1), name: "General Ward A", wardType: WardType.General, totalBeds: BigInt(20), isActive: true },
  { id: BigInt(2), name: "ICU", wardType: WardType.ICU, totalBeds: BigInt(10), isActive: true },
  { id: BigInt(3), name: "Emergency", wardType: WardType.Emergency, totalBeds: BigInt(15), isActive: true },
];

const sampleBeds: Bed[] = [
  { id: BigInt(1), wardId: BigInt(1), bedNumber: "G-101", status: BedStatus.Occupied, housekeepingStatus: HousekeepingStatus.Clean, patientId: BigInt(2) },
  { id: BigInt(2), wardId: BigInt(1), bedNumber: "G-102", status: BedStatus.Available, housekeepingStatus: HousekeepingStatus.Clean },
  { id: BigInt(3), wardId: BigInt(2), bedNumber: "ICU-01", status: BedStatus.Available, housekeepingStatus: HousekeepingStatus.Dirty },
  { id: BigInt(4), wardId: BigInt(3), bedNumber: "ER-01", status: BedStatus.Maintenance, housekeepingStatus: HousekeepingStatus.InProgress },
];

const sampleAppointments: Appointment[] = [
  { id: BigInt(1), patientId: BigInt(1), doctorId: BigInt(1), date: "2026-05-12", timeSlot: "09:00", tokenNumber: BigInt(1), status: AppointmentStatus.Scheduled, appointmentType: AppointmentType.OPD, createdAt: now },
  { id: BigInt(2), patientId: BigInt(2), doctorId: BigInt(2), date: "2026-05-12", timeSlot: "10:30", tokenNumber: BigInt(2), status: AppointmentStatus.Confirmed, appointmentType: AppointmentType.OPD, createdAt: now },
  { id: BigInt(3), patientId: BigInt(3), doctorId: BigInt(1), date: "2026-05-11", timeSlot: "14:00", tokenNumber: BigInt(3), status: AppointmentStatus.Completed, appointmentType: AppointmentType.Telemedicine, createdAt: now },
];

const sampleDrugs: Drug[] = [
  { id: BigInt(1), name: "Amoxicillin 500mg", genericName: "Amoxicillin", dosageForm: "Capsule", strength: "500mg", category: "Antibiotic", quantityOnHand: BigInt(200), reorderLevel: BigInt(50), expiryDate: "2027-06-30", batchNo: "B001", costPrice: BigInt(5), sellingPrice: BigInt(12), isActive: true },
  { id: BigInt(2), name: "Paracetamol 500mg", genericName: "Paracetamol", dosageForm: "Tablet", strength: "500mg", category: "Analgesic", quantityOnHand: BigInt(500), reorderLevel: BigInt(100), expiryDate: "2026-12-31", batchNo: "B002", costPrice: BigInt(2), sellingPrice: BigInt(5), isActive: true },
  { id: BigInt(3), name: "Metformin 850mg", genericName: "Metformin", dosageForm: "Tablet", strength: "850mg", category: "Antidiabetic", quantityOnHand: BigInt(30), reorderLevel: BigInt(50), expiryDate: "2026-08-15", batchNo: "B003", costPrice: BigInt(8), sellingPrice: BigInt(18), isActive: true },
];

const sampleLabOrders: LabOrder[] = [
  { id: BigInt(1), patientId: BigInt(1), doctorId: BigInt(1), testName: "Complete Blood Count", testType: "Hematology", status: LabStatus.ResultReady, isCritical: false, createdAt: now, resultValue: "WBC: 7.2, RBC: 4.8, Hb: 13.5" },
  { id: BigInt(2), patientId: BigInt(2), doctorId: BigInt(2), testName: "MRI Brain", testType: "Imaging", status: LabStatus.Processing, isCritical: true, createdAt: now },
];

const sampleBills: Bill[] = [
  { id: BigInt(1), patientId: BigInt(1), billType: BillType.OPD, status: BillStatus.Paid, totalAmount: BigInt(1500), subtotal: BigInt(1500), paidAmount: BigInt(1500), discountPercent: BigInt(0), paymentMode: PaymentMode.Cash, items: [{ serviceId: BigInt(1), serviceName: "Consultation", quantity: BigInt(1), unitPrice: BigInt(1000), total: BigInt(1000) }, { serviceId: BigInt(2), serviceName: "Lab CBC", quantity: BigInt(1), unitPrice: BigInt(500), total: BigInt(500) }], createdAt: now },
  { id: BigInt(2), patientId: BigInt(2), billType: BillType.IPD, status: BillStatus.Pending, totalAmount: BigInt(25000), subtotal: BigInt(25000), paidAmount: BigInt(10000), discountPercent: BigInt(0), items: [], createdAt: now },
];

const sampleERTriages: ERTriage[] = [
  { id: BigInt(1), esiLevel: BigInt(1), chiefComplaint: "Chest pain, shortness of breath", isTraumaCase: false, isUnknownPatient: false, patientId: BigInt(1), status: ERStatus.InTreatment, arrivalTime: now },
  { id: BigInt(2), esiLevel: BigInt(3), chiefComplaint: "Head injury from fall", isTraumaCase: true, isUnknownPatient: true, status: ERStatus.Waiting, arrivalTime: now, bedId: BigInt(4) },
];

const sampleUsers: User[] = [
  { id: BigInt(1), name: "Super Admin", email: "admin@medcare.com", role: UserRole.SuperAdmin, status: UserStatus.Active, createdAt: now, principal: { _arr: new Uint8Array(), toText: () => "admin-principal", isAnonymous: () => false, toUint8Array: () => new Uint8Array(), compareTo: () => "eq" } as any },
  { id: BigInt(2), name: "Dr. Rajesh Kumar", email: "doctor@medcare.com", role: UserRole.Doctor, status: UserStatus.Active, createdAt: now, principal: { _arr: new Uint8Array(), toText: () => "doctor-principal", isAnonymous: () => false, toUint8Array: () => new Uint8Array(), compareTo: () => "eq" } as any },
  { id: BigInt(3), name: "Nurse Sunita", email: "nurse@medcare.com", role: UserRole.Nurse, status: UserStatus.Active, createdAt: now, principal: { _arr: new Uint8Array(), toText: () => "nurse-principal", isAnonymous: () => false, toUint8Array: () => new Uint8Array(), compareTo: () => "eq" } as any },
];

const sampleNotifications: Notification[] = [
  { id: BigInt(1), userId: BigInt(1), title: "Low Stock Alert", message: "Metformin 850mg is below reorder level", notificationType: NotificationType.LowStockAlert, priority: NotificationPriority.Critical, isRead: false, createdAt: now },
  { id: BigInt(2), userId: BigInt(2), title: "Appointment Reminder", message: "You have 3 appointments tomorrow", notificationType: NotificationType.AppointmentReminder, priority: NotificationPriority.Normal, isRead: true, createdAt: now },
];

const sampleHospitalProfile: HospitalProfile = {
  id: BigInt(1),
  name: "Lal Bahadur Shastri Hospital",
  email: "info@lbshospital.in",
  phone: "+91-11-2345-6789",
  address: "Hospital Road, GTB Nagar, New Delhi 110009",
  registrationNo: "DL-HOSP-2024-001",
  timezone: "Asia/Kolkata",
  currency: "INR",
};

const sampleServices: Service[] = [
  { id: BigInt(1), name: "General Consultation", category: "Consultation", basePrice: BigInt(500), isActive: true },
  { id: BigInt(2), name: "CBC Test", category: "Laboratory", basePrice: BigInt(300), isActive: true },
  { id: BigInt(3), name: "X-Ray Chest", category: "Radiology", basePrice: BigInt(800), isActive: true },
];

const sampleSuppliers: Supplier[] = [
  { id: BigInt(1), name: "PharmaCo Supplies", phone: "9898989898", email: "supply@pharmaco.com", address: "Industrial Area, Pune", categories: ["Drugs", "Consumables"], paymentTerms: "Net 30" },
];

const sampleRadiologyOrders: RadiologyOrder[] = [
  { id: BigInt(1), patientId: BigInt(2), doctorId: BigInt(2), imagingType: ImagingType.MRI, bodyPart: "Brain", clinicalIndication: "Headache with vision changes", status: RadiologyStatus.Ordered, createdAt: now },
];

const sampleEquipment: EquipmentItem[] = [
  { id: BigInt(1), name: "ECG Machine", category: "Diagnostic", serialNumber: "ECG-001", purchaseDate: "2023-01-15", cost: BigInt(50000), status: EquipmentStatus.Active, wardId: BigInt(1) },
];

const sampleConsumables: Consumable[] = [
  { id: BigInt(1), name: "Surgical Gloves (Box)", quantity: BigInt(50), reorderLevel: BigInt(20), unitCost: BigInt(300) },
  { id: BigInt(2), name: "IV Cannula 20G", quantity: BigInt(5), reorderLevel: BigInt(30), unitCost: BigInt(15) },
];

const samplePurchaseOrders: PurchaseOrder[] = [
  { id: BigInt(1), supplierId: BigInt(1), status: POStatus.Submitted, items: [{ drugId: BigInt(3), quantity: BigInt(200), unitCost: BigInt(8) }], createdAt: now, expectedDelivery: "2026-05-20" },
];

const sampleIndentRequests: IndentRequest[] = [
  { id: BigInt(1), requestedById: BigInt(3), status: IndentStatus.Pending, items: [{ itemId: BigInt(1), itemName: "Surgical Gloves", quantity: BigInt(10) }], createdAt: now },
];

const sampleLeaveRequests: LeaveRequest[] = [
  { id: BigInt(1), userId: BigInt(2), startDate: "2026-05-15", endDate: "2026-05-17", reason: "Personal", status: LeaveStatus.Pending, createdAt: now },
];

const sampleDutyRoster: DutyRoster[] = [
  { id: BigInt(1), userId: BigInt(2), date: "2026-05-12", shift: ShiftType.Morning, status: "active", wardId: BigInt(1) },
  { id: BigInt(3), userId: BigInt(3), date: "2026-05-12", shift: ShiftType.Night, status: "active", wardId: BigInt(2) },
];

const sampleAuditLogs: AuditLog[] = [
  { id: BigInt(1), userId: BigInt(1), action: "CREATE", entityType: "Patient", entityId: "1", details: "Registered new patient: Aarav Sharma", timestamp: now },
  { id: BigInt(2), userId: BigInt(2), action: "UPDATE", entityType: "Visit", entityId: "1", details: "Updated SOAP notes for patient", timestamp: now },
];

const sampleVisit: Visit = {
  id: BigInt(1),
  patientId: BigInt(1),
  doctorId: BigInt(1),
  chiefComplaint: "Chest discomfort and fatigue",
  soapNotes: { subjective: "Patient reports chest discomfort for 2 days", objective: "BP 140/90, HR 88 bpm", assessment: "Hypertension, rule out ACS", plan: "ECG, CBC, refer cardiology" },
  diagnoses: [{ icd10Code: "I10", description: "Essential hypertension", diagnosisType: "Primary" as any }],
  prescriptions: [{ drugName: "Amlodipine 5mg", dose: "5mg", dosageForm: "Tablet", frequency: "Once daily", duration: "30 days", status: PrescriptionStatus.Pending }],
  documentUrls: [],
  createdAt: now,
  visitDate: now,
};

export const mockBackend: backendInterface = {
  admitPatient: async () => true,
  cancelAppointment: async () => true,
  createAppointment: async (_p, _d, date, timeSlot, appointmentType, notes) => ({ id: BigInt(99), patientId: _p, doctorId: _d, date, timeSlot, appointmentType, tokenNumber: BigInt(99), status: AppointmentStatus.Scheduled, createdAt: now, notes: notes || undefined }),
  createBed: async (wardId, bedNumber) => ({ id: BigInt(99), wardId, bedNumber, status: BedStatus.Available, housekeepingStatus: HousekeepingStatus.Clean }),
  createBill: async (patientId, visitId, billType, items, discountPercent, paymentMode) => ({ id: BigInt(99), patientId, visitId: visitId || undefined, billType, items, discountPercent, paymentMode: paymentMode || undefined, status: BillStatus.Pending, totalAmount: BigInt(0), subtotal: BigInt(0), paidAmount: BigInt(0), createdAt: now }),
  createConsumable: async (name, quantity, reorderLevel, unitCost, supplierId) => ({ id: BigInt(99), name, quantity, reorderLevel, unitCost, supplierId: supplierId || undefined }),
  createDoctorProfile: async (userId, specialization, qualifications, departmentId, consultationFee, schedule) => ({ id: BigInt(99), userId, specialization, qualifications, departmentId: departmentId || undefined, consultationFee, schedule, wardIds: [] }),
  createDrug: async (name, genericName, dosageForm, strength, category, quantityOnHand, reorderLevel, expiryDate, batchNo, costPrice, sellingPrice, supplierId) => ({ id: BigInt(99), name, genericName, dosageForm, strength, category, quantityOnHand, reorderLevel, expiryDate, batchNo, costPrice, sellingPrice, supplierId: supplierId || undefined, isActive: true }),
  createDutyRosterEntry: async (userId, date, shift, wardId) => ({ id: BigInt(99), userId, date, shift, wardId: wardId || undefined, status: "active" }),
  createERTriage: async (patientId, esiLevel, chiefComplaint, isTraumaCase, isUnknownPatient, bedId) => ({ id: BigInt(99), patientId: patientId || undefined, esiLevel, chiefComplaint, isTraumaCase, isUnknownPatient, bedId: bedId || undefined, status: ERStatus.Waiting, arrivalTime: now }),
  createEquipmentItem: async (name, category, serialNumber, purchaseDate, cost, wardId) => ({ id: BigInt(99), name, category, serialNumber, purchaseDate, cost, wardId: wardId || undefined, status: EquipmentStatus.Active }),
  createIndentRequest: async (requestedById, items) => ({ id: BigInt(99), requestedById, items, status: IndentStatus.Pending, createdAt: now }),
  createLabOrder: async (patientId, doctorId, visitId, testType, testName) => ({ id: BigInt(99), patientId, doctorId, visitId: visitId || undefined, testType, testName, status: LabStatus.Ordered, isCritical: false, createdAt: now }),
  createLeaveRequest: async (userId, startDate, endDate, reason) => ({ id: BigInt(99), userId, startDate, endDate, reason, status: LeaveStatus.Pending, createdAt: now }),
  createNotification: async (userId, notificationType, title, message, priority, relatedId) => ({ id: BigInt(99), userId, notificationType, title, message, priority, relatedId: relatedId || undefined, isRead: false, createdAt: now }),
  createPatient: async (firstName, lastName, dob, gender, bloodGroup, phone, email, address, emergencyContact) => ({ id: BigInt(99), firstName, lastName, dob, gender, bloodGroup, phone, email, address, emergencyContact, mrn: "MRN-NEW", allergies: [], status: PatientStatus.OPD, createdAt: now }),
  createPurchaseOrder: async (supplierId, items, expectedDelivery) => ({ id: BigInt(99), supplierId, items, expectedDelivery: expectedDelivery || undefined, status: POStatus.Draft, createdAt: now }),
  createRadiologyOrder: async (patientId, doctorId, imagingType, bodyPart, clinicalIndication) => ({ id: BigInt(99), patientId, doctorId, imagingType, bodyPart, clinicalIndication, status: RadiologyStatus.Ordered, createdAt: now }),
  createService: async (name, category, basePrice) => ({ id: BigInt(99), name, category, basePrice, isActive: true }),
  createSupplier: async (name, phone, email, address, categories, paymentTerms) => ({ id: BigInt(99), name, phone, email, address, categories, paymentTerms }),
  createUser: async (principal, name, email, role, departmentId) => ({ id: BigInt(99), principal, name, email, role, departmentId: departmentId || undefined, status: UserStatus.Active, createdAt: now }),
  createVisit: async () => sampleVisit,
  createWard: async (name, wardType, totalBeds, inchargeNurseId) => ({ id: BigInt(99), name, wardType, totalBeds, inchargeNurseId: inchargeNurseId || undefined, isActive: true }),
  dischargePatient: async () => true,
  dispensePrescription: async () => true,
  getActiveERTriages: async () => sampleERTriages.filter(e => e.status !== ERStatus.Discharged),
  getAppointments: async () => sampleAppointments,
  getAppointmentsByDoctor: async () => sampleAppointments,
  getAppointmentsByPatient: async () => sampleAppointments.slice(0, 1),
  getAuditLogs: async () => sampleAuditLogs,
  getBeds: async () => sampleBeds,
  getBedsByWard: async () => sampleBeds,
  getBill: async () => sampleBills[0],
  getBills: async () => sampleBills,
  getBillsByPatient: async () => sampleBills.slice(0, 1),
  getConsumables: async () => sampleConsumables,
  getDoctor: async () => sampleDoctors[0],
  getDoctors: async () => sampleDoctors,
  getDrug: async () => sampleDrugs[0],
  getDrugs: async () => sampleDrugs,
  getDutyRoster: async () => sampleDutyRoster,
  getERTriages: async () => sampleERTriages,
  getEquipment: async () => sampleEquipment,
  getHospitalProfile: async () => sampleHospitalProfile,
  getIndentRequests: async () => sampleIndentRequests,
  getLabOrder: async () => sampleLabOrders[0],
  getLabOrders: async () => sampleLabOrders,
  getLabOrdersByPatient: async () => sampleLabOrders.slice(0, 1),
  getLeaveRequests: async () => sampleLeaveRequests,
  getLowStockDrugs: async () => sampleDrugs.filter(d => d.quantityOnHand < d.reorderLevel),
  getNotifications: async () => sampleNotifications,
  getOPDQueue: async () => sampleAppointments.filter(a => a.status !== AppointmentStatus.Completed),
  getPatient: async () => samplePatients[0],
  getPatients: async () => samplePatients,
  getPrescriptions: async () => sampleVisit.prescriptions,
  getPrescriptionsByPatient: async () => sampleVisit.prescriptions,
  getPurchaseOrders: async () => samplePurchaseOrders,
  getRadiologyOrders: async () => sampleRadiologyOrders,
  getRadiologyOrdersByPatient: async () => sampleRadiologyOrders,
  getServices: async () => sampleServices,
  getSuppliers: async () => sampleSuppliers,
  getUser: async () => sampleUsers[0],
  getUsers: async () => sampleUsers,
  getVisit: async () => sampleVisit,
  getVisits: async () => [sampleVisit],
  getVisitsByPatient: async () => [sampleVisit],
  getWard: async () => sampleWards[0],
  getWards: async () => sampleWards,
  initSampleData: async () => "Sample data initialized successfully",
  markAllNotificationsRead: async () => undefined,
  markNotificationRead: async () => true,
  transferPatient: async () => true,
  updateAppointment: async () => true,
  updateBedStatus: async () => true,
  updateBillPayment: async () => true,
  updateDrugStock: async () => true,
  updateERTriage: async () => true,
  updateHospitalProfile: async (_n, _a, _p, _e, _r, _tz, _c) => sampleHospitalProfile,
  updateIndentStatus: async () => true,
  updateLabOrderResult: async () => true,
  updateLabOrderStatus: async () => true,
  updateLeaveStatus: async () => true,
  updatePatient: async () => true,
  updateRadiologyReport: async () => true,
  updateUserStatus: async () => true,
  updateVisit: async () => true,
};
