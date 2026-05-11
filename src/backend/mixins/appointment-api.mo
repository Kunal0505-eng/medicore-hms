import Common "../types/common";
import AppointmentTypes "../types/appointment";
import AppointmentLib "../lib/appointment";
import List "mo:core/List";

mixin (
  appointments : List.List<AppointmentTypes.Appointment>,
  apptState : { var nextAppointmentId : Nat; var nextToken : Nat },
) {
  public query func getAppointments() : async [AppointmentTypes.Appointment] {
    AppointmentLib.getAll(appointments);
  };

  public query func getAppointmentsByPatient(patientId : Common.PatientId) : async [AppointmentTypes.Appointment] {
    AppointmentLib.getByPatient(appointments, patientId);
  };

  public query func getAppointmentsByDoctor(doctorId : Common.DoctorId) : async [AppointmentTypes.Appointment] {
    AppointmentLib.getByDoctor(appointments, doctorId);
  };

  public query func getOPDQueue(doctorId : Common.DoctorId, date : Text) : async [AppointmentTypes.Appointment] {
    AppointmentLib.getOPDQueue(appointments, doctorId, date);
  };

  public shared func createAppointment(
    patientId : Common.PatientId,
    doctorId : Common.DoctorId,
    date : Text,
    timeSlot : Text,
    appointmentType : AppointmentTypes.AppointmentType,
    notes : ?Text,
  ) : async AppointmentTypes.Appointment {
    AppointmentLib.create(appointments, apptState, patientId, doctorId, date, timeSlot, appointmentType, notes);
  };

  public shared func updateAppointment(
    id : Common.AppointmentId,
    date : Text,
    timeSlot : Text,
    notes : ?Text,
  ) : async Bool {
    AppointmentLib.update(appointments, id, date, timeSlot, notes);
  };

  public shared func cancelAppointment(
    id : Common.AppointmentId,
    reason : Text,
  ) : async Bool {
    AppointmentLib.cancel(appointments, id, reason);
  };
};
