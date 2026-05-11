import Common "../types/common";
import PatientTypes "../types/patient";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public type PatientState = {
    patients : List.List<PatientTypes.Patient>;
    state : { var nextId : Nat };
  };

  public func getAll(patients : List.List<PatientTypes.Patient>) : [PatientTypes.Patient] {
    patients.toArray();
  };

  public func getById(patients : List.List<PatientTypes.Patient>, id : Common.PatientId) : ?PatientTypes.Patient {
    patients.find(func(p) { p.id == id });
  };

  public func create(
    patients : List.List<PatientTypes.Patient>,
    state : { var nextPatientId : Nat; var nextBedId : Nat; var nextWardId : Nat },
    firstName : Text,
    lastName : Text,
    dob : Text,
    gender : Text,
    bloodGroup : Text,
    phone : Text,
    email : Text,
    address : Text,
    emergencyContact : Text,
  ) : PatientTypes.Patient {
    let id = state.nextPatientId;
    state.nextPatientId += 1;

    let padded = if (id < 10) { "00" # id.toText() } else if (id < 100) { "0" # id.toText() } else { id.toText() };
    let patient : PatientTypes.Patient = {
      id;
      mrn = "MRN-" # padded;
      firstName;
      lastName;
      dob;
      gender;
      bloodGroup;
      allergies = [];
      phone;
      email;
      insuranceId = null;
      insuranceProvider = null;
      address;
      photoUrl = null;
      status = #OPD;
      admittedBedId = null;
      wardId = null;
      admissionDate = null;
      dischargeDate = null;
      emergencyContact;
      createdAt = Time.now();
    };
    patients.add(patient);
    patient;
  };

  public func update(
    patients : List.List<PatientTypes.Patient>,
    id : Common.PatientId,
    firstName : Text,
    lastName : Text,
    phone : Text,
    email : Text,
    address : Text,
    allergies : [Text],
    bloodGroup : Text,
    insuranceId : ?Text,
    insuranceProvider : ?Text,
  ) : Bool {
    switch (patients.findIndex(func(p) { p.id == id })) {
      case null { false };
      case (?idx) {
        let existing = patients.at(idx);
        patients.put(idx, { existing with firstName; lastName; phone; email; address; allergies; bloodGroup; insuranceId; insuranceProvider });
        true;
      };
    };
  };

  public func admit(
    patients : List.List<PatientTypes.Patient>,
    patientId : Common.PatientId,
    bedId : Common.BedId,
    wardId : Common.WardId,
  ) : Bool {
    switch (patients.findIndex(func(p) { p.id == patientId })) {
      case null { false };
      case (?pIdx) {
        let existing = patients.at(pIdx);
        patients.put(pIdx, { existing with status = #Admitted; admittedBedId = ?bedId; wardId = ?wardId; admissionDate = ?Time.now() });
        true;
      };
    };
  };

  public func discharge(
    patients : List.List<PatientTypes.Patient>,
    patientId : Common.PatientId,
  ) : Bool {
    switch (patients.findIndex(func(p) { p.id == patientId })) {
      case null { false };
      case (?pIdx) {
        let existing = patients.at(pIdx);
        patients.put(pIdx, { existing with status = #Discharged; admittedBedId = null; wardId = null; dischargeDate = ?Time.now() });
        true;
      };
    };
  };

  public func transfer(
    patients : List.List<PatientTypes.Patient>,
    patientId : Common.PatientId,
    newWardId : Common.WardId,
    newBedId : Common.BedId,
  ) : Bool {
    switch (patients.findIndex(func(p) { p.id == patientId })) {
      case null { false };
      case (?pIdx) {
        let existing = patients.at(pIdx);
        patients.put(pIdx, { existing with wardId = ?newWardId; admittedBedId = ?newBedId });
        true;
      };
    };
  };
};
