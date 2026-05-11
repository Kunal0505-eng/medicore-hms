import type {
  Appointment,
  Bed,
  Bill,
  DoctorProfile,
  Drug,
  Patient,
  Ward,
} from "@/backend";

export interface SharedReportData {
  patients: Patient[];
  bills: Bill[];
  appointments: Appointment[];
  wards: Ward[];
  beds: Bed[];
  drugs: Drug[];
  doctors: DoctorProfile[];
}

export interface SharedLoading {
  loadingPatients: boolean;
  loadingBills: boolean;
  loadingAppointments: boolean;
  loadingWards: boolean;
  loadingBeds: boolean;
  loadingDrugs: boolean;
  loadingDoctors: boolean;
}

export function exportToCsv(
  filename: string,
  headers: string[],
  rows: (string | number)[][],
) {
  const lines = [headers.join(","), ...rows.map((r) => r.join(","))];
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function calcAge(dob: string): number {
  const birth = new Date(dob);
  const now = new Date();
  return now.getFullYear() - birth.getFullYear();
}

export function ageGroup(age: number): string {
  if (age <= 18) return "0-18";
  if (age <= 35) return "19-35";
  if (age <= 50) return "36-50";
  if (age <= 65) return "51-65";
  return "65+";
}

export const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function formatCurrency(val: number): string {
  return `₹${val.toLocaleString()}`;
}

export function getLast30Days(): string[] {
  const days: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

export function getLast7Days(): string[] {
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}
