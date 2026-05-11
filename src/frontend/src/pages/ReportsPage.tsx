import { BedOccupancySection } from "@/components/reports/BedOccupancySection";
import { DoctorPerformanceSection } from "@/components/reports/DoctorPerformanceSection";
import { OpdIpdSection } from "@/components/reports/OpdIpdSection";
import { OverviewSection } from "@/components/reports/OverviewSection";
import { PatientDemographicsSection } from "@/components/reports/PatientDemographicsSection";
import { PharmacySalesSection } from "@/components/reports/PharmacySalesSection";
import { RevenueSection } from "@/components/reports/RevenueSection";
import { Button } from "@/components/ui/button";
import { useAppointments } from "@/services/appointments";
import { useBills } from "@/services/billing";
import { usePatients } from "@/services/patients";
import { useDrugs } from "@/services/pharmacy";
import { useDoctors } from "@/services/staff";
import { useBeds, useWards } from "@/services/ward";
import {
  BarChart2,
  BedDouble,
  DollarSign,
  LayoutDashboard,
  Pill,
  TrendingUp,
  Users,
} from "lucide-react";
import { Download } from "lucide-react";
import { useState } from "react";

const REPORT_TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "opdipd", label: "OPD/IPD Stats", icon: TrendingUp },
  { id: "revenue", label: "Revenue", icon: DollarSign },
  { id: "doctors", label: "Doctor Performance", icon: Users },
  { id: "demographics", label: "Demographics", icon: BarChart2 },
  { id: "beds", label: "Bed Occupancy", icon: BedDouble },
  { id: "pharmacy", label: "Pharmacy Sales", icon: Pill },
] as const;

type TabId = (typeof REPORT_TABS)[number]["id"];

export function ReportsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const { data: patients = [], isLoading: loadingPatients } = usePatients();
  const { data: bills = [], isLoading: loadingBills } = useBills();
  const { data: appointments = [], isLoading: loadingAppointments } =
    useAppointments();
  const { data: wards = [], isLoading: loadingWards } = useWards();
  const { data: beds = [], isLoading: loadingBeds } = useBeds();
  const { data: drugs = [], isLoading: loadingDrugs } = useDrugs();
  const { data: doctors = [], isLoading: loadingDoctors } = useDoctors();

  const sharedData = {
    patients,
    bills,
    appointments,
    wards,
    beds,
    drugs,
    doctors,
  };
  const loading = {
    loadingPatients,
    loadingBills,
    loadingAppointments,
    loadingWards,
    loadingBeds,
    loadingDrugs,
    loadingDoctors,
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-card border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground font-display">
              Reports &amp; Analytics
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Comprehensive hospital performance insights
            </p>
          </div>
          <div className="text-xs text-muted-foreground bg-muted rounded-md px-3 py-1.5">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          className="flex gap-1 mt-4 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Report sections"
        >
          {REPORT_TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                data-ocid={`reports.${tab.id}.tab`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 p-6 overflow-auto">
        {activeTab === "overview" && (
          <OverviewSection data={sharedData} loading={loading} />
        )}
        {activeTab === "opdipd" && (
          <OpdIpdSection data={sharedData} loading={loading} />
        )}
        {activeTab === "revenue" && (
          <RevenueSection data={sharedData} loading={loading} />
        )}
        {activeTab === "doctors" && (
          <DoctorPerformanceSection data={sharedData} loading={loading} />
        )}
        {activeTab === "demographics" && (
          <PatientDemographicsSection data={sharedData} loading={loading} />
        )}
        {activeTab === "beds" && (
          <BedOccupancySection data={sharedData} loading={loading} />
        )}
        {activeTab === "pharmacy" && (
          <PharmacySalesSection data={sharedData} loading={loading} />
        )}
      </div>
    </div>
  );
}

export function ExportButton({
  label,
  onExport,
}: { label: string; onExport: () => void }) {
  return (
    <Button
      variant="outline"
      size="sm"
      type="button"
      data-ocid="reports.export_button"
      onClick={onExport}
      className="flex items-center gap-1.5"
    >
      <Download className="w-4 h-4" />
      {label}
    </Button>
  );
}
