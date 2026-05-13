import { c as createLucideIcon, o as useAppointments, i as usePatients, r as reactExports, j as jsxRuntimeExports, m as PageHeader, a as Button, p as CalendarDays, q as Clock, A as AppointmentStatus, C as ChevronRight, S as StatusBadge, s as useCreateAppointment, t as useUpdateAppointment, v as AppointmentType, n as Stethoscope, w as useCancelAppointment, b as ue } from "./index-DZPPfMmg.js";
import { D as DataTable } from "./DataTable-AcgTuFIu.js";
import { E as EmptyState } from "./EmptyState-kK5PcP6O.js";
import { M as Modal } from "./Modal-BHmlK1FU.js";
import { B as Badge } from "./badge-C5LXUByT.js";
import { I as Input } from "./input-Clo9Nqqp.js";
import { L as Label } from "./label-DqZ3T788.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-9iSmyv76.js";
import { T as Textarea } from "./textarea-D_eYIBJX.js";
import { u as useDoctors } from "./staff-DDNDShPh.js";
import { P as Plus } from "./plus-CgeKf2CL.js";
import { R as RefreshCw } from "./refresh-cw-BQBoPnDy.js";
import "./chevron-up-Cdh06Vhn.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "m9 16 2 2 4-4", key: "19s6y9" }]
];
const CalendarCheck = createLucideIcon("calendar-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
];
const Video = createLucideIcon("video", __iconNode);
const ALL_TIME_SLOTS = [
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM"
];
const DAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const EMPTY_FORM = {
  patientId: "",
  doctorId: "",
  date: "",
  timeSlot: "",
  appointmentType: AppointmentType.OPD,
  notes: ""
};
function toDateStr(d) {
  return d.toISOString().split("T")[0];
}
function today() {
  return toDateStr(/* @__PURE__ */ new Date());
}
function startOfWeek(d) {
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const mon = new Date(d);
  mon.setDate(d.getDate() + diff);
  return mon;
}
function addDays(d, n) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}
function formatDisplayDate(iso) {
  if (!iso) return "";
  const [y, m, day] = iso.split("-");
  return `${day}/${m}/${y}`;
}
function TypeBadge({ type }) {
  return type === AppointmentType.OPD ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/15 text-blue-400 border border-blue-500/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "h-3 w-3" }),
    " OPD"
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-500/15 text-purple-400 border border-purple-500/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-3 w-3" }),
    " Telemedicine"
  ] });
}
function TokenBadge({ token }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center w-12 h-8 rounded-lg font-mono font-bold text-sm bg-accent/15 text-accent border border-accent/40", children: String(token).padStart(3, "0") });
}
function DoctorWeeklyCalendar({
  appointments,
  weekStart,
  onPrevWeek,
  onNextWeek
}) {
  const weekDays = reactExports.useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  );
  const bookedMap = reactExports.useMemo(() => {
    const m = {};
    for (const appt of appointments) {
      if (appt.status === AppointmentStatus.Cancelled) continue;
      if (!m[appt.date]) m[appt.date] = /* @__PURE__ */ new Set();
      m[appt.date].add(appt.timeSlot);
    }
    return m;
  }, [appointments]);
  const todayStr = today();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border bg-muted/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground", children: [
        "Week of",
        " ",
        weekDays[0].toLocaleDateString("en-US", {
          month: "short",
          day: "numeric"
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onPrevWeek,
            className: "p-1 rounded hover:bg-muted/40 transition-colors",
            "aria-label": "Previous week",
            "data-ocid": "appointments.calendar.prev_week",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4 text-muted-foreground" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onNextWeek,
            className: "p-1 rounded hover:bg-muted/40 transition-colors",
            "aria-label": "Next week",
            "data-ocid": "appointments.calendar.next_week",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 text-center", children: weekDays.map((d, i) => {
      var _a;
      const iso = toDateStr(d);
      const isToday = iso === todayStr;
      const booked = ((_a = bookedMap[iso]) == null ? void 0 : _a.size) ?? 0;
      const total = ALL_TIME_SLOTS.length;
      const available = total - booked;
      const fillPct = booked / total * 100;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `p-2 border-r border-border last:border-r-0 ${isToday ? "bg-accent/10" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `text-xs font-medium mb-1 ${isToday ? "text-accent" : "text-muted-foreground"}`,
                children: DAYS_SHORT[i]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `text-sm font-bold mb-1.5 ${isToday ? "text-accent" : "text-foreground"}`,
                children: d.getDate()
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-1.5 rounded-full bg-muted/40 overflow-hidden mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute left-0 top-0 h-full rounded-full transition-all",
                style: {
                  width: `${fillPct}%`,
                  backgroundColor: fillPct > 75 ? "oklch(var(--destructive))" : fillPct > 40 ? "oklch(0.74 0.15 85)" : "oklch(var(--accent))"
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground", children: [
              available,
              "av"
            ] })
          ]
        },
        DAYS_SHORT[i]
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2 border-t border-border bg-muted/10 flex items-center gap-4 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-accent inline-block" }),
        " ",
        "Available"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-yellow-500 inline-block" }),
        " ",
        "Partial"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-destructive inline-block" }),
        " ",
        "Near full"
      ] })
    ] })
  ] });
}
function TimeSlotPicker({
  date,
  doctorId,
  appointments,
  selected,
  onSelect,
  excludeAppointmentId
}) {
  const bookedSlots = reactExports.useMemo(() => {
    if (!date || !doctorId) return /* @__PURE__ */ new Set();
    return new Set(
      appointments.filter(
        (a) => a.date === date && String(a.doctorId) === doctorId && a.status !== AppointmentStatus.Cancelled && (!excludeAppointmentId || a.id !== excludeAppointmentId)
      ).map((a) => a.timeSlot)
    );
  }, [date, doctorId, appointments, excludeAppointmentId]);
  if (!date || !doctorId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground italic", children: "Select a doctor and date to see available slots." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: ALL_TIME_SLOTS.map((slot) => {
    const isBooked = bookedSlots.has(slot);
    const isSelected = selected === slot;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        disabled: isBooked,
        onClick: () => onSelect(slot),
        className: `px-2 py-1.5 rounded-md text-xs font-medium border transition-all ${isBooked ? "bg-muted/20 text-muted-foreground/40 border-border/30 cursor-not-allowed line-through" : isSelected ? "bg-accent text-accent-foreground border-accent shadow-sm" : "bg-background text-foreground border-border hover:border-accent hover:bg-accent/10"}`,
        "data-ocid": `appointments.slot.${slot.replace(/[:\s]/g, "_")}`,
        children: slot
      },
      slot
    );
  }) });
}
function BookingModal({
  open,
  onClose,
  patients,
  doctors,
  appointments,
  editAppointment
}) {
  const isReschedule = !!editAppointment;
  const createAppointment = useCreateAppointment();
  const updateAppointment = useUpdateAppointment();
  const [patientSearch, setPatientSearch] = reactExports.useState("");
  const [doctorSearch, setDoctorSearch] = reactExports.useState("");
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  reactExports.useEffect(() => {
    if (editAppointment) {
      setForm({
        patientId: String(editAppointment.patientId),
        doctorId: String(editAppointment.doctorId),
        date: editAppointment.date,
        timeSlot: editAppointment.timeSlot,
        appointmentType: editAppointment.appointmentType,
        notes: editAppointment.notes ?? ""
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [editAppointment]);
  const filteredPatients = reactExports.useMemo(
    () => patients.filter(
      (p) => `${p.firstName} ${p.lastName} ${p.mrn}`.toLowerCase().includes(patientSearch.toLowerCase())
    ),
    [patients, patientSearch]
  );
  const filteredDoctors = reactExports.useMemo(
    () => doctors.filter(
      (d) => d.specialization.toLowerCase().includes(doctorSearch.toLowerCase())
    ),
    [doctors, doctorSearch]
  );
  const selectedPatient = patients.find((p) => String(p.id) === form.patientId);
  const selectedDoctor = doctors.find((d) => String(d.id) === form.doctorId);
  const isPending = createAppointment.isPending || updateAppointment.isPending;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.patientId || !form.doctorId) {
      ue.error("Please select a patient and doctor");
      return;
    }
    if (!form.date) {
      ue.error("Please select a date");
      return;
    }
    if (!form.timeSlot) {
      ue.error("Please select a time slot");
      return;
    }
    try {
      if (isReschedule && editAppointment) {
        await updateAppointment.mutateAsync({
          id: editAppointment.id,
          date: form.date,
          timeSlot: form.timeSlot,
          notes: form.notes || null
        });
        ue.success("Appointment rescheduled successfully");
      } else {
        await createAppointment.mutateAsync({
          patientId: BigInt(form.patientId),
          doctorId: BigInt(form.doctorId),
          date: form.date,
          timeSlot: form.timeSlot,
          appointmentType: form.appointmentType,
          notes: form.notes || null
        });
        ue.success("Appointment booked successfully");
      }
      onClose();
    } catch {
      ue.error(
        isReschedule ? "Failed to reschedule" : "Failed to book appointment"
      );
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: isReschedule ? "Reschedule Appointment" : "Book Appointment",
      description: isReschedule ? "Choose a new date and time slot" : "Schedule a new OPD or telemedicine appointment",
      size: "lg",
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            disabled: isPending,
            "data-ocid": "appointments.form.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            form: "appt-form",
            disabled: isPending || !form.timeSlot,
            "data-ocid": "appointments.form.submit_button",
            children: isPending ? isReschedule ? "Rescheduling..." : "Booking..." : isReschedule ? "Reschedule" : "Book Appointment"
          }
        )
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { id: "appt-form", onSubmit: handleSubmit, className: "space-y-5", children: [
        !isReschedule && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Patient" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search by name or MRN...",
              value: patientSearch,
              onChange: (e) => setPatientSearch(e.target.value),
              className: "bg-muted/30",
              "data-ocid": "appointments.form.patient_search"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-36 overflow-y-auto rounded-md border border-input bg-background divide-y divide-border", children: filteredPatients.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 py-2 text-sm text-muted-foreground", children: "No patients found" }) : filteredPatients.slice(0, 20).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                setForm({ ...form, patientId: String(p.id) });
                setPatientSearch(`${p.firstName} ${p.lastName}`);
              },
              className: `w-full text-left px-3 py-2 text-sm hover:bg-muted/30 transition-colors flex justify-between items-center ${form.patientId === String(p.id) ? "bg-accent/10 text-accent" : "text-foreground"}`,
              "data-ocid": `appointments.form.patient_option.${String(p.id)}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  p.firstName,
                  " ",
                  p.lastName
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: p.mrn })
              ]
            },
            String(p.id)
          )) }),
          selectedPatient && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-accent", children: [
            "✓ Selected: ",
            selectedPatient.firstName,
            " ",
            selectedPatient.lastName,
            " (",
            selectedPatient.mrn,
            ")"
          ] })
        ] }),
        !isReschedule && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Doctor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search by specialization...",
              value: doctorSearch,
              onChange: (e) => setDoctorSearch(e.target.value),
              className: "bg-muted/30",
              "data-ocid": "appointments.form.doctor_search"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-36 overflow-y-auto rounded-md border border-input bg-background divide-y divide-border", children: filteredDoctors.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 py-2 text-sm text-muted-foreground", children: "No doctors found" }) : filteredDoctors.slice(0, 10).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setForm({ ...form, doctorId: String(d.id), timeSlot: "" }),
              className: `w-full text-left px-3 py-2 text-sm hover:bg-muted/30 transition-colors flex justify-between items-center ${form.doctorId === String(d.id) ? "bg-accent/10 text-accent" : "text-foreground"}`,
              "data-ocid": `appointments.form.doctor_option.${String(d.id)}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Dr. ",
                  d.specialization
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "ID: ",
                  String(d.id)
                ] })
              ]
            },
            String(d.id)
          )) }),
          selectedDoctor && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-accent", children: [
            "✓ Selected: Dr. ",
            selectedDoctor.specialization,
            " · Fee: ₹",
            String(selectedDoctor.consultationFee)
          ] })
        ] }),
        !isReschedule && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Appointment Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setForm({ ...form, appointmentType: AppointmentType.OPD }),
                className: `flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-all ${form.appointmentType === AppointmentType.OPD ? "bg-blue-500/15 border-blue-500/40 text-blue-400" : "border-border text-muted-foreground hover:border-blue-500/30"}`,
                "data-ocid": "appointments.form.type_opd",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "h-4 w-4" }),
                  " OPD"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setForm({
                  ...form,
                  appointmentType: AppointmentType.Telemedicine
                }),
                className: `flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-all ${form.appointmentType === AppointmentType.Telemedicine ? "bg-purple-500/15 border-purple-500/40 text-purple-400" : "border-border text-muted-foreground hover:border-purple-500/30"}`,
                "data-ocid": "appointments.form.type_telemedicine",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-4 w-4" }),
                  " Telemedicine"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: form.date,
              min: isReschedule ? void 0 : today(),
              onChange: (e) => setForm({ ...form, date: e.target.value, timeSlot: "" }),
              required: true,
              "data-ocid": "appointments.form.date_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
            "Time Slot",
            form.timeSlot && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-accent font-medium", children: form.timeSlot })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TimeSlotPicker,
            {
              date: form.date,
              doctorId: form.doctorId,
              appointments,
              selected: form.timeSlot,
              onSelect: (slot) => setForm({ ...form, timeSlot: slot }),
              excludeAppointmentId: editAppointment == null ? void 0 : editAppointment.id
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Notes (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              placeholder: "Chief complaint or additional notes...",
              value: form.notes,
              onChange: (e) => setForm({ ...form, notes: e.target.value }),
              rows: 2,
              className: "bg-muted/30 resize-none",
              "data-ocid": "appointments.form.notes_textarea"
            }
          )
        ] })
      ] })
    }
  );
}
function CancelDialog({ open, onClose, appointment }) {
  const cancelAppointment = useCancelAppointment();
  const [reason, setReason] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (open) setReason("");
  }, [open]);
  const handleConfirm = async () => {
    if (!appointment) return;
    try {
      await cancelAppointment.mutateAsync({
        id: appointment.id,
        reason: reason || "Cancelled by user"
      });
      ue.success("Appointment cancelled");
      onClose();
    } catch {
      ue.error("Failed to cancel appointment");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: "Cancel Appointment",
      description: "This action cannot be undone",
      size: "sm",
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            disabled: cancelAppointment.isPending,
            "data-ocid": "appointments.cancel_dialog.cancel_button",
            children: "Keep Appointment"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "destructive",
            onClick: handleConfirm,
            disabled: cancelAppointment.isPending,
            "data-ocid": "appointments.cancel_dialog.confirm_button",
            children: cancelAppointment.isPending ? "Cancelling..." : "Cancel Appointment"
          }
        )
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        appointment && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Date:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: formatDisplayDate(appointment.date) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Time:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: appointment.timeSlot })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Cancellation Reason" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              placeholder: "Provide a reason for cancellation...",
              value: reason,
              onChange: (e) => setReason(e.target.value),
              rows: 3,
              className: "bg-muted/30 resize-none",
              "data-ocid": "appointments.cancel_dialog.reason_textarea"
            }
          )
        ] })
      ] })
    }
  );
}
function OPDQueueTab({
  appointments,
  patients,
  doctors,
  isLoading,
  lastRefreshed,
  onRefresh
}) {
  const todayStr = today();
  const [filterDoctor, setFilterDoctor] = reactExports.useState("all");
  const patientMap = reactExports.useMemo(() => {
    const m = {};
    for (const p of patients) m[String(p.id)] = p;
    return m;
  }, [patients]);
  const doctorMap = reactExports.useMemo(() => {
    const m = {};
    for (const d of doctors) m[String(d.id)] = d;
    return m;
  }, [doctors]);
  const todayQueue = reactExports.useMemo(() => {
    return appointments.filter(
      (a) => a.date === todayStr && a.status !== AppointmentStatus.Cancelled && (filterDoctor === "all" || String(a.doctorId) === filterDoctor)
    ).sort((a, b) => Number(a.tokenNumber) - Number(b.tokenNumber));
  }, [appointments, todayStr, filterDoctor]);
  const queueColumns = [
    {
      id: "token",
      header: "Token",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(TokenBadge, { token: row.original.tokenNumber })
    },
    {
      id: "patient",
      header: "Patient",
      accessorFn: (r) => {
        const p = patientMap[String(r.patientId)];
        return p ? `${p.firstName} ${p.lastName}` : `ID:${r.patientId}`;
      },
      cell: ({ row }) => {
        const p = patientMap[String(row.original.patientId)];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: p ? `${p.firstName} ${p.lastName}` : `ID:${row.original.patientId}` }),
          p && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: p.mrn })
        ] });
      }
    },
    {
      id: "doctor",
      header: "Doctor",
      cell: ({ row }) => {
        const d = doctorMap[String(row.original.doctorId)];
        return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: d ? `Dr. ${d.specialization}` : `ID:${row.original.doctorId}` });
      }
    },
    {
      id: "time",
      header: "Time Slot",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5 text-muted-foreground" }),
        row.original.timeSlot
      ] })
    },
    {
      id: "type",
      header: "Type",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(TypeBadge, { type: row.original.appointmentType })
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: row.original.status })
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground", children: "Today's OPD Queue" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "font-mono", children: [
          todayQueue.length,
          " patients"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: filterDoctor,
            onChange: (e) => setFilterDoctor(e.target.value),
            className: "rounded-md border border-input bg-background px-3 py-1.5 text-sm min-w-[180px]",
            "data-ocid": "appointments.queue.doctor_filter",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Doctors" }),
              doctors.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: String(d.id), children: [
                "Dr. ",
                d.specialization
              ] }, String(d.id)))
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: onRefresh,
            className: "gap-1.5",
            "data-ocid": "appointments.queue.refresh_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                RefreshCw,
                {
                  className: `h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`
                }
              ),
              "Refresh"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "Updated ",
          lastRefreshed.toLocaleTimeString()
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-3", children: [
      {
        label: "Waiting",
        status: AppointmentStatus.Scheduled,
        color: "text-yellow-400"
      },
      {
        label: "Confirmed",
        status: AppointmentStatus.Confirmed,
        color: "text-accent"
      },
      {
        label: "In Progress",
        status: AppointmentStatus.InProgress,
        color: "text-orange-400"
      },
      {
        label: "Completed",
        status: AppointmentStatus.Completed,
        color: "text-green-400"
      }
    ].map(({ label, status, color }) => {
      const count = todayQueue.filter((a) => a.status === status).length;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-lg p-3 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-bold ${color}`, children: count }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: label })
          ]
        },
        label
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-4", children: todayQueue.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "h-8 w-8" }),
        title: "Queue is empty",
        description: `No appointments scheduled for today${filterDoctor !== "all" ? " for this doctor" : ""}.`
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        data: todayQueue,
        columns: queueColumns,
        searchPlaceholder: "Search patients...",
        isLoading,
        pageSize: 15
      }
    ) })
  ] });
}
function AppointmentsPage() {
  const { data: appointments, isLoading, refetch } = useAppointments();
  const { data: patients } = usePatients();
  const { data: doctors } = useDoctors();
  const [activeTab, setActiveTab] = reactExports.useState("list");
  const [showBooking, setShowBooking] = reactExports.useState(false);
  const [editAppointment, setEditAppointment] = reactExports.useState(
    null
  );
  const [cancelTarget, setCancelTarget] = reactExports.useState(null);
  const [filterDoctor, setFilterDoctor] = reactExports.useState("all");
  const [filterStatus, setFilterStatus] = reactExports.useState("all");
  const [filterDateFrom, setFilterDateFrom] = reactExports.useState("");
  const [filterDateTo, setFilterDateTo] = reactExports.useState("");
  const [weekStart, setWeekStart] = reactExports.useState(() => startOfWeek(/* @__PURE__ */ new Date()));
  const [lastRefreshed, setLastRefreshed] = reactExports.useState(/* @__PURE__ */ new Date());
  const patientMap = reactExports.useMemo(() => {
    const m = {};
    for (const p of patients ?? []) m[String(p.id)] = p;
    return m;
  }, [patients]);
  const doctorMap = reactExports.useMemo(() => {
    const m = {};
    for (const d of doctors ?? []) m[String(d.id)] = d;
    return m;
  }, [doctors]);
  const refetchRef = reactExports.useRef(refetch);
  refetchRef.current = refetch;
  reactExports.useEffect(() => {
    if (activeTab !== "queue") return;
    const id = setInterval(() => {
      refetchRef.current();
      setLastRefreshed(/* @__PURE__ */ new Date());
    }, 3e4);
    return () => clearInterval(id);
  }, [activeTab]);
  const handleRefresh = reactExports.useCallback(() => {
    refetch();
    setLastRefreshed(/* @__PURE__ */ new Date());
  }, [refetch]);
  const filteredAppointments = reactExports.useMemo(() => {
    return (appointments ?? []).filter((a) => {
      if (filterDoctor !== "all" && String(a.doctorId) !== filterDoctor)
        return false;
      if (filterStatus !== "all" && a.status !== filterStatus) return false;
      if (filterDateFrom && a.date < filterDateFrom) return false;
      if (filterDateTo && a.date > filterDateTo) return false;
      return true;
    });
  }, [appointments, filterDoctor, filterStatus, filterDateFrom, filterDateTo]);
  const columns = [
    {
      id: "token",
      header: "Token",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(TokenBadge, { token: row.original.tokenNumber })
    },
    {
      id: "patient",
      header: "Patient",
      accessorFn: (r) => {
        const p = patientMap[String(r.patientId)];
        return p ? `${p.firstName} ${p.lastName}` : `ID:${r.patientId}`;
      },
      cell: ({ row }) => {
        const p = patientMap[String(row.original.patientId)];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: p ? `${p.firstName} ${p.lastName}` : `ID:${row.original.patientId}` }),
          p && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: p.mrn })
        ] });
      }
    },
    {
      id: "doctor",
      header: "Doctor",
      accessorFn: (r) => {
        const d = doctorMap[String(r.doctorId)];
        return d ? `Dr. ${d.specialization}` : `ID:${r.doctorId}`;
      },
      cell: ({ row }) => {
        const d = doctorMap[String(row.original.doctorId)];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: d ? `Dr. ${d.specialization}` : `ID:${row.original.doctorId}` }),
          d && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Fee ₹",
            String(d.consultationFee)
          ] })
        ] });
      }
    },
    {
      id: "datetime",
      header: "Date & Time",
      accessorFn: (r) => r.date,
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: formatDisplayDate(row.original.date) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
          row.original.timeSlot
        ] })
      ] })
    },
    {
      id: "type",
      header: "Type",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(TypeBadge, { type: row.original.appointmentType })
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: row.original.status })
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const a = row.original;
        const canAct = a.status !== AppointmentStatus.Cancelled && a.status !== AppointmentStatus.Completed;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          canAct && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              onClick: () => {
                setEditAppointment(a);
                setShowBooking(true);
              },
              className: "text-xs",
              "data-ocid": `appointments.reschedule_button.${row.index + 1}`,
              children: "Reschedule"
            }
          ),
          canAct && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              onClick: () => setCancelTarget(a),
              className: "text-destructive hover:text-destructive text-xs",
              "data-ocid": `appointments.cancel_button.${row.index + 1}`,
              children: "Cancel"
            }
          )
        ] });
      }
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "appointments.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Appointments",
        description: "OPD scheduling, doctor calendar, and queue management",
        breadcrumb: ["Patient Ops", "Appointments"],
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: () => {
              setEditAppointment(null);
              setShowBooking(true);
            },
            "data-ocid": "appointments.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
              "Book Appointment"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Tabs,
      {
        value: activeTab,
        onValueChange: setActiveTab,
        className: "space-y-5",
        "data-ocid": "appointments.tabs",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-muted/30 border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "list",
                className: "gap-2",
                "data-ocid": "appointments.tab.list",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-4 w-4" }),
                  " Appointments"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "queue",
                className: "gap-2",
                "data-ocid": "appointments.tab.queue",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }),
                  " OPD Queue"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "list", className: "space-y-4", children: [
            ((appointments == null ? void 0 : appointments.length) ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              DoctorWeeklyCalendar,
              {
                appointments: appointments ?? [],
                weekStart,
                onPrevWeek: () => setWeekStart((w) => addDays(w, -7)),
                onNextWeek: () => setWeekStart((w) => addDays(w, 7))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs whitespace-nowrap", children: "Doctor" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      value: filterDoctor,
                      onChange: (e) => setFilterDoctor(e.target.value),
                      className: "rounded-md border border-input bg-background px-2 py-1.5 text-sm",
                      "data-ocid": "appointments.filter.doctor_select",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Doctors" }),
                        (doctors ?? []).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: String(d.id), children: [
                          "Dr. ",
                          d.specialization
                        ] }, String(d.id)))
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs whitespace-nowrap", children: "Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      value: filterStatus,
                      onChange: (e) => setFilterStatus(e.target.value),
                      className: "rounded-md border border-input bg-background px-2 py-1.5 text-sm",
                      "data-ocid": "appointments.filter.status_select",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Statuses" }),
                        Object.values(AppointmentStatus).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs whitespace-nowrap", children: "From" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "date",
                      value: filterDateFrom,
                      onChange: (e) => setFilterDateFrom(e.target.value),
                      className: "h-8 text-sm w-36 bg-muted/20",
                      "data-ocid": "appointments.filter.date_from"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs whitespace-nowrap", children: "To" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "date",
                      value: filterDateTo,
                      onChange: (e) => setFilterDateTo(e.target.value),
                      className: "h-8 text-sm w-36 bg-muted/20",
                      "data-ocid": "appointments.filter.date_to"
                    }
                  )
                ] }),
                (filterDoctor !== "all" || filterStatus !== "all" || filterDateFrom || filterDateTo) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onClick: () => {
                      setFilterDoctor("all");
                      setFilterStatus("all");
                      setFilterDateFrom("");
                      setFilterDateTo("");
                    },
                    className: "text-xs text-muted-foreground",
                    "data-ocid": "appointments.filter.clear_button",
                    children: "Clear filters"
                  }
                )
              ] }),
              filteredAppointments.length === 0 && !isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                EmptyState,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-8 w-8" }),
                  title: "No appointments found",
                  description: "Adjust filters or book the first appointment.",
                  action: {
                    label: "Book Appointment",
                    onClick: () => {
                      setEditAppointment(null);
                      setShowBooking(true);
                    }
                  }
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                DataTable,
                {
                  data: filteredAppointments,
                  columns,
                  searchPlaceholder: "Search by patient, doctor, date...",
                  isLoading,
                  pageSize: 10
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "queue", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            OPDQueueTab,
            {
              appointments: appointments ?? [],
              patients: patients ?? [],
              doctors: doctors ?? [],
              isLoading,
              lastRefreshed,
              onRefresh: handleRefresh
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BookingModal,
      {
        open: showBooking,
        onClose: () => {
          setShowBooking(false);
          setEditAppointment(null);
        },
        patients: patients ?? [],
        doctors: doctors ?? [],
        appointments: appointments ?? [],
        editAppointment
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CancelDialog,
      {
        open: !!cancelTarget,
        onClose: () => setCancelTarget(null),
        appointment: cancelTarget
      }
    )
  ] });
}
export {
  AppointmentsPage
};
