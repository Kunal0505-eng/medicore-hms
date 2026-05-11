import Time "mo:core/Time";

module {
  public type Timestamp = Time.Time;
  public type UserId = Nat;
  public type PatientId = Nat;
  public type DoctorId = Nat;
  public type AppointmentId = Nat;
  public type VisitId = Nat;
  public type LabOrderId = Nat;
  public type DrugId = Nat;
  public type WardId = Nat;
  public type BedId = Nat;
  public type BillId = Nat;
  public type ServiceId = Nat;
  public type RadiologyOrderId = Nat;
  public type ERTriageId = Nat;
  public type EquipmentId = Nat;
  public type ConsumableId = Nat;
  public type IndentId = Nat;
  public type SupplierId = Nat;
  public type NotificationId = Nat;
  public type PurchaseOrderId = Nat;
  public type DutyRosterId = Nat;
  public type LeaveRequestId = Nat;

  public type UserRole = {
    #SuperAdmin;
    #Doctor;
    #Nurse;
    #Receptionist;
    #Pharmacist;
    #LabTechnician;
    #Patient;
  };

  public type UserStatus = {
    #Active;
    #Inactive;
    #Suspended;
  };

  public type User = {
    id : UserId;
    principal : Principal;
    name : Text;
    email : Text;
    role : UserRole;
    departmentId : ?Text;
    status : UserStatus;
    createdAt : Timestamp;
  };
};
