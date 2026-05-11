import Common "../types/common";
import PatientTypes "../types/patient";
import WardTypes "../types/ward";
import PatientLib "../lib/patient";
import List "mo:core/List";

mixin (
  patients : List.List<PatientTypes.Patient>,
  beds : List.List<WardTypes.Bed>,
  state : {
    var nextPatientId : Nat;
    var nextBedId : Nat;
    var nextWardId : Nat;
  },
) {
  public shared func createPatient(
    firstName : Text,
    lastName : Text,
    dob : Text,
    gender : Text,
    bloodGroup : Text,
    phone : Text,
    email : Text,
    address : Text,
    emergencyContact : Text,
  ) : async PatientTypes.Patient {
    PatientLib.create(patients, state, firstName, lastName, dob, gender, bloodGroup, phone, email, address, emergencyContact);
  };

  public shared func updatePatient(
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
  ) : async Bool {
    PatientLib.update(patients, id, firstName, lastName, phone, email, address, allergies, bloodGroup, insuranceId, insuranceProvider);
  };

  public query func getPatients() : async [PatientTypes.Patient] {
    PatientLib.getAll(patients);
  };

  public query func getPatient(id : Common.PatientId) : async ?PatientTypes.Patient {
    PatientLib.getById(patients, id);
  };

  public shared func admitPatient(
    patientId : Common.PatientId,
    bedId : Common.BedId,
    wardId : Common.WardId,
  ) : async Bool {
    let ok = PatientLib.admit(patients, patientId, bedId, wardId);
    if (ok) {
      // Mark bed occupied
      switch (beds.findIndex(func(b) { b.id == bedId })) {
        case null {};
        case (?idx) {
          let bed = beds.at(idx);
          beds.put(idx, { bed with status = #Occupied; patientId = ?patientId });
        };
      };
    };
    ok;
  };

  public shared func dischargePatient(patientId : Common.PatientId) : async Bool {
    // Find the patient's current bed and free it
    switch (patients.find(func(p) { p.id == patientId })) {
      case (?p) {
        switch (p.admittedBedId) {
          case (?bedId) {
            switch (beds.findIndex(func(b) { b.id == bedId })) {
              case null {};
              case (?idx) {
                let bed = beds.at(idx);
                beds.put(idx, { bed with status = #Available; patientId = null });
              };
            };
          };
          case null {};
        };
      };
      case null {};
    };
    PatientLib.discharge(patients, patientId);
  };

  public shared func transferPatient(
    patientId : Common.PatientId,
    newWardId : Common.WardId,
    newBedId : Common.BedId,
  ) : async Bool {
    // Free old bed, occupy new bed
    switch (patients.find(func(p) { p.id == patientId })) {
      case (?p) {
        switch (p.admittedBedId) {
          case (?oldBedId) {
            switch (beds.findIndex(func(b) { b.id == oldBedId })) {
              case null {};
              case (?idx) {
                let bed = beds.at(idx);
                beds.put(idx, { bed with status = #Available; patientId = null });
              };
            };
          };
          case null {};
        };
      };
      case null {};
    };
    switch (beds.findIndex(func(b) { b.id == newBedId })) {
      case null {};
      case (?idx) {
        let bed = beds.at(idx);
        beds.put(idx, { bed with status = #Occupied; patientId = ?patientId });
      };
    };
    PatientLib.transfer(patients, patientId, newWardId, newBedId);
  };
};
