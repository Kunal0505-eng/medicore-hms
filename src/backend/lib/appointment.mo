import Common "../types/common";
import AppointmentTypes "../types/appointment";
import List "mo:core/List";
import Time "mo:core/Time";
import Nat "mo:core/Nat";

module {
  public func getAll(appointments : List.List<AppointmentTypes.Appointment>) : [AppointmentTypes.Appointment] {
    appointments.toArray();
  };

  public func getByPatient(appointments : List.List<AppointmentTypes.Appointment>, patientId : Common.PatientId) : [AppointmentTypes.Appointment] {
    appointments.filter(func(a) { a.patientId == patientId }).toArray();
  };

  public func getByDoctor(appointments : List.List<AppointmentTypes.Appointment>, doctorId : Common.DoctorId) : [AppointmentTypes.Appointment] {
    appointments.filter(func(a) { a.doctorId == doctorId }).toArray();
  };

  public func getOPDQueue(appointments : List.List<AppointmentTypes.Appointment>, doctorId : Common.DoctorId, date : Text) : [AppointmentTypes.Appointment] {
    let dayAppts = appointments.filter(func(a) {
      a.doctorId == doctorId and a.date == date and a.status != #Cancelled
    });
    let arr = dayAppts.toArray();
    arr.sort(func(a1, a2) { Nat.compare(a1.tokenNumber, a2.tokenNumber) });
  };

  public func create(
    appointments : List.List<AppointmentTypes.Appointment>,
    state : { var nextAppointmentId : Nat; var nextToken : Nat },
    patientId : Common.PatientId,
    doctorId : Common.DoctorId,
    date : Text,
    timeSlot : Text,
    appointmentType : AppointmentTypes.AppointmentType,
    notes : ?Text,
  ) : AppointmentTypes.Appointment {
    let id = state.nextAppointmentId;
    state.nextAppointmentId += 1;

    let doctorDayCount = appointments.filter(func(a) { a.doctorId == doctorId and a.date == date }).size();
    let tokenNumber = doctorDayCount + 1;
    let appt : AppointmentTypes.Appointment = {
      id;
      patientId;
      doctorId;
      date;
      timeSlot;
      status = #Scheduled;
      appointmentType;
      tokenNumber;
      notes;
      cancellationReason = null;
      createdAt = Time.now();
    };
    appointments.add(appt);
    appt;
  };

  public func update(
    appointments : List.List<AppointmentTypes.Appointment>,
    id : Common.AppointmentId,
    date : Text,
    timeSlot : Text,
    notes : ?Text,
  ) : Bool {
    switch (appointments.findIndex(func(a) { a.id == id })) {
      case null { false };
      case (?idx) {
        let existing = appointments.at(idx);
        appointments.put(idx, { existing with date; timeSlot; notes });
        true;
      };
    };
  };

  public func cancel(
    appointments : List.List<AppointmentTypes.Appointment>,
    id : Common.AppointmentId,
    reason : Text,
  ) : Bool {
    switch (appointments.findIndex(func(a) { a.id == id })) {
      case null { false };
      case (?idx) {
        let existing = appointments.at(idx);
        appointments.put(idx, { existing with status = #Cancelled; cancellationReason = ?reason });
        true;
      };
    };
  };

  public func updateStatus(
    appointments : List.List<AppointmentTypes.Appointment>,
    id : Common.AppointmentId,
    status : AppointmentTypes.AppointmentStatus,
  ) : Bool {
    switch (appointments.findIndex(func(a) { a.id == id })) {
      case null { false };
      case (?idx) {
        let existing = appointments.at(idx);
        appointments.put(idx, { existing with status });
        true;
      };
    };
  };
};
