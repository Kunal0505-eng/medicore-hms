import Common "common";

module {
  public type AppointmentStatus = {
    #Scheduled;
    #Confirmed;
    #InProgress;
    #Completed;
    #Cancelled;
  };

  public type AppointmentType = {
    #OPD;
    #Telemedicine;
  };

  public type Appointment = {
    id : Common.AppointmentId;
    patientId : Common.PatientId;
    doctorId : Common.DoctorId;
    date : Text;
    timeSlot : Text;
    status : AppointmentStatus;
    appointmentType : AppointmentType;
    tokenNumber : Nat;
    notes : ?Text;
    cancellationReason : ?Text;
    createdAt : Common.Timestamp;
  };
};
