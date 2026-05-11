import List "mo:core/List";

import PatientTypes "types/patient";
import AppointmentTypes "types/appointment";
import DoctorTypes "types/doctor";
import EMRTypes "types/emr";
import LabTypes "types/lab";
import PharmacyTypes "types/pharmacy";
import WardTypes "types/ward";
import BillingTypes "types/billing";
import RadiologyTypes "types/radiology";
import ERTypes "types/emergency";
import InventoryTypes "types/inventory";
import NotificationTypes "types/notification";
import SystemTypes "types/system";
import Common "types/common";

import PatientApi "mixins/patient-api";
import AppointmentApi "mixins/appointment-api";
import DoctorApi "mixins/doctor-api";
import EMRApi "mixins/emr-api";
import LabApi "mixins/lab-api";
import PharmacyApi "mixins/pharmacy-api";
import WardApi "mixins/ward-api";
import BillingApi "mixins/billing-api";
import RadiologyApi "mixins/radiology-api";
import EmergencyApi "mixins/emergency-api";
import InventoryApi "mixins/inventory-api";
import NotificationApi "mixins/notification-api";
import SystemApi "mixins/system-api";
import UserApi "mixins/user-api";

actor {
  // ── Patients ────────────────────────────────────────────────────────────────
  let patients = List.empty<PatientTypes.Patient>();

  // ── Appointments ────────────────────────────────────────────────────────────
  let appointments = List.empty<AppointmentTypes.Appointment>();

  // ── Doctors / Staff ─────────────────────────────────────────────────────────
  let doctors = List.empty<DoctorTypes.DoctorProfile>();
  let roster = List.empty<DoctorTypes.DutyRoster>();
  let leaves = List.empty<DoctorTypes.LeaveRequest>();

  // ── EMR ─────────────────────────────────────────────────────────────────────
  let visits = List.empty<EMRTypes.Visit>();

  // ── Laboratory ──────────────────────────────────────────────────────────────
  let labOrders = List.empty<LabTypes.LabOrder>();

  // ── Pharmacy ────────────────────────────────────────────────────────────────
  let drugs = List.empty<PharmacyTypes.Drug>();
  let purchaseOrders = List.empty<PharmacyTypes.PurchaseOrder>();

  // ── Ward / Bed ──────────────────────────────────────────────────────────────
  let wards = List.empty<WardTypes.Ward>();
  let beds = List.empty<WardTypes.Bed>();

  // ── Billing ─────────────────────────────────────────────────────────────────
  let bills = List.empty<BillingTypes.Bill>();
  let services = List.empty<BillingTypes.Service>();

  // ── Radiology ───────────────────────────────────────────────────────────────
  let radiologyOrders = List.empty<RadiologyTypes.RadiologyOrder>();

  // ── Emergency ───────────────────────────────────────────────────────────────
  let erTriages = List.empty<ERTypes.ERTriage>();

  // ── Inventory ───────────────────────────────────────────────────────────────
  let equipment = List.empty<InventoryTypes.EquipmentItem>();
  let consumables = List.empty<InventoryTypes.Consumable>();
  let suppliers = List.empty<InventoryTypes.Supplier>();
  let indents = List.empty<InventoryTypes.IndentRequest>();

  // ── Notifications ───────────────────────────────────────────────────────────
  let notifications = List.empty<NotificationTypes.Notification>();

  // ── Users ───────────────────────────────────────────────────────────────────
  let users = List.empty<Common.User>();

  // ── Hospital profile & audit ─────────────────────────────────────────────────
  let hospitalProfile = { var data : ?SystemTypes.HospitalProfile = null };
  let auditLogs = List.empty<SystemTypes.AuditLog>();

  // ── Shared ID/counter state ──────────────────────────────────────────────────
  let state = {
    var nextPatientId   : Nat = 1;
    var nextBedId       : Nat = 1;
    var nextWardId      : Nat = 1;
    var nextUserId      : Nat = 1;
  };
  let apptState = { var nextAppointmentId : Nat = 1; var nextToken : Nat = 1 };
  let doctorState = { var nextDoctorId : Nat = 1; var nextRosterId : Nat = 1; var nextLeaveId : Nat = 1 };
  let visitState = { var nextVisitId : Nat = 1 };
  let labState = { var nextLabOrderId : Nat = 1 };
  let pharmacyState = { var nextDrugId : Nat = 1; var nextOrderId : Nat = 1 };
  let wardState = { var nextWardId : Nat = 1; var nextBedId : Nat = 1 };
  let billingState = { var nextBillId : Nat = 1; var nextServiceId : Nat = 1 };
  let radiologyState = { var nextRadiologyOrderId : Nat = 1 };
  let erState = { var nextERTriageId : Nat = 1 };
  let inventoryState = {
    var nextEquipmentId  : Nat = 1;
    var nextConsumableId : Nat = 1;
    var nextSupplierId   : Nat = 1;
    var nextIndentId     : Nat = 1;
  };
  let notifState = { var nextNotificationId : Nat = 1 };
  let sysState = { var nextLogId : Nat = 1 };
  let userState = { var nextUserId : Nat = 1 };

  // ── Mixin includes ───────────────────────────────────────────────────────────
  include PatientApi(patients, beds, state);
  include AppointmentApi(appointments, apptState);
  include DoctorApi(doctors, roster, leaves, doctorState);
  include EMRApi(visits, visitState);
  include LabApi(labOrders, labState);
  include PharmacyApi(drugs, purchaseOrders, visits, pharmacyState);
  include WardApi(wards, beds, wardState);
  include BillingApi(bills, services, billingState);
  include RadiologyApi(radiologyOrders, radiologyState);
  include EmergencyApi(erTriages, erState);
  include InventoryApi(equipment, consumables, suppliers, indents, inventoryState);
  include NotificationApi(notifications, notifState);
  include SystemApi(hospitalProfile, auditLogs, sysState);
  include UserApi(
    users,
    userState,
    patients,
    state,
    doctors,
    doctorState,
    wards,
    beds,
    wardState,
    drugs,
    pharmacyState,
    labOrders,
    labState,
    bills,
    services,
    billingState,
    erTriages,
    erState,
    notifications,
    notifState,
    hospitalProfile,
    auditLogs,
    sysState,
    visits,
    visitState,
    appointments,
    apptState,
  );
};
