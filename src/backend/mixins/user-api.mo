import Common "../types/common";
import PatientTypes "../types/patient";
import AppointmentTypes "../types/appointment";
import DoctorTypes "../types/doctor";
import EMRTypes "../types/emr";
import LabTypes "../types/lab";
import PharmacyTypes "../types/pharmacy";
import WardTypes "../types/ward";
import BillingTypes "../types/billing";
import ERTypes "../types/emergency";
import NotificationTypes "../types/notification";
import SystemTypes "../types/system";
import UserLib "../lib/user";
import PatientLib "../lib/patient";
import DoctorLib "../lib/doctor";
import WardLib "../lib/ward";
import PharmacyLib "../lib/pharmacy";
import LabLib "../lib/lab";
import BillingLib "../lib/billing";
import ERLib "../lib/emergency";
import NotificationLib "../lib/notification";
import SystemLib "../lib/system";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import AppointmentLib "../lib/appointment";
import EMRLib "../lib/emr";

mixin (
  users : List.List<Common.User>,
  userState : { var nextUserId : Nat },
  // extra state slices needed for sample data seeding
  patients : List.List<PatientTypes.Patient>,
  patientState : { var nextPatientId : Nat; var nextBedId : Nat; var nextWardId : Nat },
  doctors : List.List<DoctorTypes.DoctorProfile>,
  doctorState : { var nextDoctorId : Nat; var nextRosterId : Nat; var nextLeaveId : Nat },
  wards : List.List<WardTypes.Ward>,
  beds : List.List<WardTypes.Bed>,
  wardState : { var nextWardId : Nat; var nextBedId : Nat },
  drugs : List.List<PharmacyTypes.Drug>,
  pharmacyState : { var nextDrugId : Nat; var nextOrderId : Nat },
  labOrders : List.List<LabTypes.LabOrder>,
  labState : { var nextLabOrderId : Nat },
  bills : List.List<BillingTypes.Bill>,
  services : List.List<BillingTypes.Service>,
  billingState : { var nextBillId : Nat; var nextServiceId : Nat },
  erTriages : List.List<ERTypes.ERTriage>,
  erState : { var nextERTriageId : Nat },
  notifications : List.List<NotificationTypes.Notification>,
  notifState : { var nextNotificationId : Nat },
  hospitalProfile : { var data : ?SystemTypes.HospitalProfile },
  auditLogs : List.List<SystemTypes.AuditLog>,
  sysState : { var nextLogId : Nat },
  visits : List.List<EMRTypes.Visit>,
  visitState : { var nextVisitId : Nat },
  appointments : List.List<AppointmentTypes.Appointment>,
  apptState : { var nextAppointmentId : Nat; var nextToken : Nat },
) {
  public query func getUsers() : async [Common.User] {
    UserLib.getAll(users);
  };

  public query func getUser(id : Common.UserId) : async ?Common.User {
    UserLib.getById(users, id);
  };

  public shared func createUser(
    principal : Principal,
    name : Text,
    email : Text,
    role : Common.UserRole,
    departmentId : ?Text,
  ) : async Common.User {
    UserLib.create(users, userState, principal, name, email, role, departmentId);
  };

  public shared func updateUserStatus(
    id : Common.UserId,
    status : Common.UserStatus,
  ) : async Bool {
    UserLib.updateStatus(users, id, status);
  };

  public shared func initSampleData() : async Text {
    // Idempotency guard
    if (users.size() > 0) {
      return "Sample data already loaded";
    };

    // ── Hospital profile ─────────────────────────────────────────────────────
    ignore SystemLib.updateProfile(hospitalProfile, "Lal Bahadur Shastri Hospital", "Ring Road, New Delhi, Delhi 110044", "+91-11-2300-0100", "info@lbshospital.in", "LBS-2024-001", "Asia/Kolkata", "INR");

    // ── Demo users (7 roles) ─────────────────────────────────────────────────
    let anonP = Principal.fromText("2vxsx-fae");
    let u1 = UserLib.create(users, userState, anonP, "Super Admin", "admin@hms.local", #SuperAdmin, null);
    let u2 = UserLib.create(users, userState, anonP, "Dr. Sarah Connor", "sarah.connor@hms.local", #Doctor, ?"Cardiology");
    let u3 = UserLib.create(users, userState, anonP, "Dr. James Wilson", "james.wilson@hms.local", #Doctor, ?"Cardiology");
    let u4 = UserLib.create(users, userState, anonP, "Dr. Emily Chen", "emily.chen@hms.local", #Doctor, ?"Orthopedics");
    let u5 = UserLib.create(users, userState, anonP, "Dr. Robert Park", "robert.park@hms.local", #Doctor, ?"ENT");
    let u6 = UserLib.create(users, userState, anonP, "Dr. Lisa Martinez", "lisa.martinez@hms.local", #Doctor, ?"Pediatrics");
    let u7 = UserLib.create(users, userState, anonP, "Nurse Anna Smith", "anna.smith@hms.local", #Nurse, ?"ICU");
    let u8 = UserLib.create(users, userState, anonP, "Reception Desk", "reception@hms.local", #Receptionist, null);
    let u9 = UserLib.create(users, userState, anonP, "Pharm. David Lee", "david.lee@hms.local", #Pharmacist, null);
    let u10 = UserLib.create(users, userState, anonP, "Lab Tech Maria", "maria.tech@hms.local", #LabTechnician, null);
    let u11 = UserLib.create(users, userState, anonP, "Patient Demo", "patient@hms.local", #Patient, null);
    ignore u1; ignore u7; ignore u8; ignore u9; ignore u10; ignore u11;

    // ── Doctor profiles ───────────────────────────────────────────────────────
    let schedule5 : [DoctorTypes.WorkingHours] = [
      { dayOfWeek = 1; startTime = "09:00"; endTime = "17:00"; maxPatients = 20 },
      { dayOfWeek = 2; startTime = "09:00"; endTime = "17:00"; maxPatients = 20 },
      { dayOfWeek = 3; startTime = "09:00"; endTime = "17:00"; maxPatients = 20 },
      { dayOfWeek = 4; startTime = "09:00"; endTime = "17:00"; maxPatients = 20 },
      { dayOfWeek = 5; startTime = "09:00"; endTime = "17:00"; maxPatients = 20 },
    ];
    let d1 = DoctorLib.createProfile(doctors, doctorState, u2.id, "Cardiology", ["MBBS", "MD Cardiology", "FACC"], ?"Cardiology", 500, schedule5);
    let d2 = DoctorLib.createProfile(doctors, doctorState, u3.id, "Cardiology", ["MBBS", "DNB Cardiology"], ?"Cardiology", 500, schedule5);
    let d3 = DoctorLib.createProfile(doctors, doctorState, u4.id, "Orthopedics", ["MBBS", "MS Orthopedics"], ?"Orthopedics", 600, schedule5);
    let d4 = DoctorLib.createProfile(doctors, doctorState, u5.id, "ENT", ["MBBS", "MS ENT"], ?"ENT", 450, schedule5);
    let d5 = DoctorLib.createProfile(doctors, doctorState, u6.id, "Pediatrics", ["MBBS", "MD Pediatrics"], ?"Pediatrics", 400, schedule5);
    ignore d2; ignore d4; ignore d5;

    // ── Wards & Beds ─────────────────────────────────────────────────────────
    let w1 = WardLib.createWard(wards, wardState, "ICU", #ICU, 4, ?u7.id);
    let w2 = WardLib.createWard(wards, wardState, "General Ward", #General, 6, ?u7.id);
    let w3 = WardLib.createWard(wards, wardState, "Private Ward", #Private, 3, null);
    let w4 = WardLib.createWard(wards, wardState, "Emergency", #Emergency, 5, null);
    // ICU beds
    let icuB1 = WardLib.createBed(beds, wardState, w1.id, "ICU-01");
    let icuB2 = WardLib.createBed(beds, wardState, w1.id, "ICU-02");
    ignore WardLib.createBed(beds, wardState, w1.id, "ICU-03");
    ignore WardLib.createBed(beds, wardState, w1.id, "ICU-04");
    // General beds
    let genB1 = WardLib.createBed(beds, wardState, w2.id, "GEN-01");
    let genB2 = WardLib.createBed(beds, wardState, w2.id, "GEN-02");
    ignore WardLib.createBed(beds, wardState, w2.id, "GEN-03");
    ignore WardLib.createBed(beds, wardState, w2.id, "GEN-04");
    ignore WardLib.createBed(beds, wardState, w2.id, "GEN-05");
    ignore WardLib.createBed(beds, wardState, w2.id, "GEN-06");
    // Private beds
    ignore WardLib.createBed(beds, wardState, w3.id, "PVT-01");
    ignore WardLib.createBed(beds, wardState, w3.id, "PVT-02");
    ignore WardLib.createBed(beds, wardState, w3.id, "PVT-03");
    // ER beds
    let erB1 = WardLib.createBed(beds, wardState, w4.id, "ER-01");
    let erB2 = WardLib.createBed(beds, wardState, w4.id, "ER-02");
    ignore WardLib.createBed(beds, wardState, w4.id, "ER-03");
    ignore WardLib.createBed(beds, wardState, w4.id, "ER-04");
    ignore WardLib.createBed(beds, wardState, w4.id, "ER-05");
    ignore erB2;

    // ── Patients (10) ─────────────────────────────────────────────────────────
    let p1 = PatientLib.create(patients, patientState, "Rajesh", "Kumar", "1978-03-15", "Male", "A+", "+91-9810001001", "rajesh.kumar@gmail.com", "12 Lajpat Nagar, New Delhi, Delhi 110024", "Sunita Kumar +91-9810001002");
    let p2 = PatientLib.create(patients, patientState, "Sunita", "Devi", "1985-07-22", "Female", "B+", "+91-9415002001", "sunita.devi@gmail.com", "45 Hazratganj, Lucknow, UP 226001", "Rakesh Devi +91-9415002002");
    let p3 = PatientLib.create(patients, patientState, "Amit", "Sharma", "1990-11-05", "Male", "O+", "+91-9415003001", "amit.sharma@gmail.com", "78 Civil Lines, Kanpur, UP 208001", "Rekha Sharma +91-9415003002");
    let p4 = PatientLib.create(patients, patientState, "Priya", "Singh", "1995-02-18", "Female", "AB+", "+91-9557004001", "priya.singh@yahoo.in", "23 Sadar Bazar, Agra, UP 282001", "Vikas Singh +91-9557004002");
    let p5 = PatientLib.create(patients, patientState, "Vikas", "Yadav", "1982-09-30", "Male", "A-", "+91-9415005001", "vikas.yadav@gmail.com", "56 Lanka, Varanasi, UP 221005", "Geeta Yadav +91-9415005002");
    let p6 = PatientLib.create(patients, patientState, "Meena", "Gupta", "1970-04-10", "Female", "B-", "+91-9415006001", "meena.gupta@yahoo.in", "34 Colonelganj, Allahabad, UP 211002", "Suresh Gupta +91-9415006002");
    let p7 = PatientLib.create(patients, patientState, "Suresh", "Patel", "1965-12-25", "Male", "O-", "+91-9456007001", "suresh.patel@gmail.com", "89 Dampier Nagar, Mathura, UP 281001", "Kiran Patel +91-9456007002");
    let p8 = PatientLib.create(patients, patientState, "Kavita", "Mishra", "1988-06-14", "Female", "AB-", "+91-9456008001", "kavita.mishra@gmail.com", "67 Civil Lines, Bareilly, UP 243001", "Ajay Mishra +91-9456008002");
    let p9 = PatientLib.create(patients, patientState, "Rohit", "Verma", "2000-01-20", "Male", "A+", "+91-9456009001", "rohit.verma@gmail.com", "14 Shastri Nagar, Meerut, UP 250002", "Anita Verma +91-9456009002");
    let p10 = PatientLib.create(patients, patientState, "Anita", "Joshi", "1975-08-07", "Female", "B+", "+91-9456010001", "anita.joshi@yahoo.in", "29 Rapti Nagar, Gorakhpur, UP 273015", "Rakesh Joshi +91-9456010002");
    ignore p4; ignore p5; ignore p6; ignore p7; ignore p8; ignore p10;

    // Admit 3 patients
    ignore PatientLib.admit(patients, p1.id, icuB1.id, w1.id);
    ignore PatientLib.admit(patients, p2.id, icuB2.id, w1.id);
    ignore PatientLib.admit(patients, p3.id, genB1.id, w2.id);
    // Mark those beds occupied
    switch (beds.findIndex(func(b) { b.id == icuB1.id })) {
      case (?idx) { let b = beds.at(idx); beds.put(idx, { b with status = #Occupied; patientId = ?p1.id }) };
      case null {};
    };
    switch (beds.findIndex(func(b) { b.id == icuB2.id })) {
      case (?idx) { let b = beds.at(idx); beds.put(idx, { b with status = #Occupied; patientId = ?p2.id }) };
      case null {};
    };
    switch (beds.findIndex(func(b) { b.id == genB1.id })) {
      case (?idx) { let b = beds.at(idx); beds.put(idx, { b with status = #Occupied; patientId = ?p3.id }) };
      case null {};
    };

    // ── Services (5) ─────────────────────────────────────────────────────────
    ignore BillingLib.createService(services, billingState, "Consultation", "Medical", 500);
    ignore BillingLib.createService(services, billingState, "ECG", "Diagnostic", 300);
    ignore BillingLib.createService(services, billingState, "Lab Test", "Diagnostic", 200);
    ignore BillingLib.createService(services, billingState, "Procedure", "Medical", 2000);
    ignore BillingLib.createService(services, billingState, "Room Charge", "Accommodation", 1000);

    // ── Lab Tests (10) ───────────────────────────────────────────────────────
    let labO1 = LabLib.create(labOrders, labState, p1.id, d1.id, null, "Hematology", "Complete Blood Count");
    let labO2 = LabLib.create(labOrders, labState, p2.id, d1.id, null, "Biochemistry", "Thyroid Function Test");
    let labO3 = LabLib.create(labOrders, labState, p3.id, d3.id, null, "Biochemistry", "Lipid Profile");
    ignore LabLib.create(labOrders, labState, p9.id, d1.id, null, "Biochemistry", "Blood Glucose Fasting");
    ignore LabLib.create(labOrders, labState, p1.id, d1.id, null, "Biochemistry", "Kidney Function Test");
    ignore LabLib.create(labOrders, labState, p2.id, d3.id, null, "Hematology", "ESR");
    ignore LabLib.create(labOrders, labState, p3.id, d1.id, null, "Microbiology", "Urine Culture");
    ignore LabLib.create(labOrders, labState, p9.id, d1.id, null, "Cardiology", "Troponin I");
    ignore LabLib.create(labOrders, labState, p1.id, d1.id, null, "Biochemistry", "HbA1c");
    ignore LabLib.create(labOrders, labState, p2.id, d1.id, null, "Biochemistry", "Liver Function Test");
    // Mark some completed
    ignore LabLib.updateStatus(labOrders, labO1.id, #SampleCollected);
    ignore LabLib.updateResult(labOrders, labO1.id, ?"WBC: 6.5, RBC: 4.8, Hgb: 14.2, Plt: 250", null, false, ?"WBC: 4-11K, RBC: 4.5-5.5M, Hgb: 12-17g/dL", null);
    ignore LabLib.updateStatus(labOrders, labO2.id, #SampleCollected);
    ignore LabLib.updateResult(labOrders, labO2.id, ?"TSH: 8.5 mIU/L (HIGH)", null, true, ?"TSH: 0.4-4.0 mIU/L", ?"Critical: thyroid dysfunction suspected");
    ignore LabLib.updateStatus(labOrders, labO3.id, #SampleCollected);
    ignore LabLib.updateResult(labOrders, labO3.id, ?"Total Cholesterol: 220, HDL: 45, LDL: 140, TG: 175", null, false, ?"Total < 200, HDL > 40, LDL < 130", null);

    // ── Drugs (20) ──────────────────────────────────────────────────────────
    ignore PharmacyLib.createDrug(drugs, pharmacyState, "Aspirin", "Acetylsalicylic Acid", "Tablet", "100mg", "Analgesic", 500, 50, "2026-12-31", "ASP-001", 5, 15, null);
    ignore PharmacyLib.createDrug(drugs, pharmacyState, "Amoxicillin", "Amoxicillin", "Capsule", "500mg", "Antibiotic", 300, 30, "2026-06-30", "AMX-001", 20, 60, null);
    ignore PharmacyLib.createDrug(drugs, pharmacyState, "Metformin", "Metformin HCl", "Tablet", "500mg", "Antidiabetic", 200, 20, "2026-09-30", "MET-001", 10, 30, null);
    ignore PharmacyLib.createDrug(drugs, pharmacyState, "Atorvastatin", "Atorvastatin Calcium", "Tablet", "20mg", "Statin", 150, 20, "2026-11-30", "ATV-001", 15, 45, null);
    ignore PharmacyLib.createDrug(drugs, pharmacyState, "Lisinopril", "Lisinopril", "Tablet", "10mg", "ACE Inhibitor", 120, 15, "2026-10-31", "LSN-001", 12, 35, null);
    ignore PharmacyLib.createDrug(drugs, pharmacyState, "Omeprazole", "Omeprazole", "Capsule", "20mg", "PPI", 180, 20, "2026-08-31", "OMP-001", 8, 25, null);
    ignore PharmacyLib.createDrug(drugs, pharmacyState, "Paracetamol", "Acetaminophen", "Tablet", "500mg", "Analgesic", 600, 60, "2026-12-31", "PCM-001", 3, 10, null);
    ignore PharmacyLib.createDrug(drugs, pharmacyState, "Ibuprofen", "Ibuprofen", "Tablet", "400mg", "NSAID", 250, 30, "2026-11-30", "IBP-001", 6, 18, null);
    ignore PharmacyLib.createDrug(drugs, pharmacyState, "Ciprofloxacin", "Ciprofloxacin HCl", "Tablet", "500mg", "Antibiotic", 100, 15, "2026-07-31", "CPF-001", 25, 75, null);
    ignore PharmacyLib.createDrug(drugs, pharmacyState, "Amlodipine", "Amlodipine Besylate", "Tablet", "5mg", "Calcium Channel Blocker", 90, 15, "2026-09-30", "AML-001", 12, 36, null);
    ignore PharmacyLib.createDrug(drugs, pharmacyState, "Losartan", "Losartan Potassium", "Tablet", "50mg", "ARB", 80, 10, "2026-10-31", "LST-001", 18, 55, null);
    ignore PharmacyLib.createDrug(drugs, pharmacyState, "Pantoprazole", "Pantoprazole Sodium", "Tablet", "40mg", "PPI", 160, 20, "2026-08-31", "PNT-001", 12, 35, null);
    ignore PharmacyLib.createDrug(drugs, pharmacyState, "Cetirizine", "Cetirizine HCl", "Tablet", "10mg", "Antihistamine", 200, 25, "2026-12-31", "CTZ-001", 4, 12, null);
    ignore PharmacyLib.createDrug(drugs, pharmacyState, "Azithromycin", "Azithromycin", "Tablet", "500mg", "Antibiotic", 5, 20, "2026-06-30", "AZT-001", 30, 90, null);
    ignore PharmacyLib.createDrug(drugs, pharmacyState, "Metoprolol", "Metoprolol Tartrate", "Tablet", "50mg", "Beta Blocker", 110, 15, "2026-11-30", "MTP-001", 14, 42, null);
    ignore PharmacyLib.createDrug(drugs, pharmacyState, "Warfarin", "Warfarin Sodium", "Tablet", "5mg", "Anticoagulant", 60, 10, "2026-09-30", "WRF-001", 20, 60, null);
    ignore PharmacyLib.createDrug(drugs, pharmacyState, "Insulin Glargine", "Insulin Glargine", "Injection", "100U/mL", "Antidiabetic", 40, 8, "2026-06-30", "INS-001", 80, 250, null);
    ignore PharmacyLib.createDrug(drugs, pharmacyState, "Furosemide", "Furosemide", "Tablet", "40mg", "Diuretic", 140, 20, "2026-10-31", "FRS-001", 8, 24, null);
    ignore PharmacyLib.createDrug(drugs, pharmacyState, "Prednisolone", "Prednisolone", "Tablet", "5mg", "Corticosteroid", 8, 15, "2026-08-31", "PDN-001", 6, 18, null);
    ignore PharmacyLib.createDrug(drugs, pharmacyState, "Salbutamol", "Albuterol Sulfate", "Inhaler", "100mcg", "Bronchodilator", 70, 10, "2026-12-31", "SLB-001", 40, 120, null);

    // ── Sample Visits ────────────────────────────────────────────────────────
    let soap1 : EMRTypes.SOAPNotes = {
      subjective = "Patient complains of chest pain and shortness of breath for 2 days";
      objective = "BP: 140/90, HR: 92, SpO2: 96%, Temp: 37.2C";
      assessment = "Suspected unstable angina, rule out ACS";
      plan = "ECG, Troponin, Echo, start Aspirin and heparin";
    };
    let diag1 : [EMRTypes.Diagnosis] = [{ icd10Code = "I20.0"; description = "Unstable angina"; diagnosisType = #Primary }];
    let rx1 : [EMRTypes.Prescription] = [
      { drugId = null; drugName = "Aspirin"; dose = "100mg"; frequency = "OD"; duration = "30 days"; dosageForm = "Tablet"; notes = ?"After meals"; status = #Pending },
      { drugId = null; drugName = "Metoprolol"; dose = "50mg"; frequency = "BD"; duration = "30 days"; dosageForm = "Tablet"; notes = null; status = #Pending },
    ];
    let v1 = EMRLib.create(visits, visitState, p1.id, d1.id, "Chest pain and shortness of breath", soap1, diag1, rx1, null);
    ignore v1;

    // ── Sample Appointments ──────────────────────────────────────────────────
    ignore AppointmentLib.create(appointments, apptState, p9.id, d1.id, "2026-05-15", "09:00", #OPD, ?"Follow-up for hypertension");
    ignore AppointmentLib.create(appointments, apptState, p10.id, d3.id, "2026-05-15", "10:00", #OPD, ?"Knee pain evaluation");
    ignore AppointmentLib.create(appointments, apptState, p4.id, d4.id, "2026-05-15", "11:00", #OPD, ?"Ear pain");
    ignore AppointmentLib.create(appointments, apptState, p7.id, d5.id, "2026-05-16", "09:00", #OPD, ?"Annual checkup");

    // ── ER Triage cases (3) ──────────────────────────────────────────────────
    ignore ERLib.create(erTriages, erState, ?p8.id, 1, "Cardiac arrest — unresponsive", true, false, ?erB1.id);
    ignore ERLib.create(erTriages, erState, null, 3, "High fever and convulsions — unknown patient", false, true, null);
    ignore ERLib.create(erTriages, erState, ?p9.id, 2, "Severe chest pain with radiation to left arm", false, false, null);

    // ── Sample bills ─────────────────────────────────────────────────────────
    let items1 : [BillingTypes.BillItem] = [
      { serviceId = 1; serviceName = "Consultation"; quantity = 1; unitPrice = 500; total = 500 },
      { serviceId = 3; serviceName = "Lab Test"; quantity = 2; unitPrice = 200; total = 400 },
    ];
    ignore BillingLib.createBill(bills, billingState, p1.id, null, #OPD, items1, 0, ?#Cash);

    // ── Audit log ────────────────────────────────────────────────────────────
    SystemLib.addAuditLog(auditLogs, sysState, 1, "SYSTEM_INIT", "System", "0", "Sample data loaded successfully");

    // ── Low stock notifications to pharmacist ────────────────────────────────
    ignore NotificationLib.create(notifications, notifState, u9.id, #LowStockAlert, "Low Stock Alert", "Azithromycin stock below reorder level (5 units)", #Critical, ?"14");
    ignore NotificationLib.create(notifications, notifState, u9.id, #LowStockAlert, "Low Stock Alert", "Prednisolone stock below reorder level (8 units)", #Normal, ?"19");
    // Critical lab alert to doctor
    ignore NotificationLib.create(notifications, notifState, u2.id, #CriticalLabAlert, "Critical Lab Value", "TSH critically elevated (8.5 mIU/L) for patient Sunita Devi", #Critical, ?"2");

    "Sample data loaded: 10 patients, 5 doctors, 3 wards + Emergency ward, 20 drugs, 10 lab tests, 5 services, demo users for all 7 roles";
  };
};
