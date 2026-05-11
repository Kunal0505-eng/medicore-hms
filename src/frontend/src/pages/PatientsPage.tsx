import type { Patient } from "@/backend";
import { PatientStatus, UserRole } from "@/backend";
import { DataTable } from "@/components/ui/DataTable";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { AdmitPatientModal } from "@/pages/patients/AdmitPatientModal";
import { DischargePatientModal } from "@/pages/patients/DischargePatientModal";
import { PatientProfileDrawer } from "@/pages/patients/PatientProfileDrawer";
import { RegisterPatientModal } from "@/pages/patients/RegisterPatientModal";
import { TransferPatientModal } from "@/pages/patients/TransferPatientModal";
import { usePatients } from "@/services/patients";
import { useBeds, useWards } from "@/services/ward";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Bed as BedIcon,
  ChevronRight,
  LogOut,
  RefreshCw,
  Stethoscope,
  User2,
  UserPlus,
} from "lucide-react";
import { useMemo, useState } from "react";

const STATUS_FILTERS = [
  "All",
  "OPD",
  "Admitted",
  "Discharged",
  "Transferred",
] as const;
type StatusFilter = (typeof STATUS_FILTERS)[number];

function getStatusVariant(status: string) {
  switch (status) {
    case PatientStatus.OPD:
      return "info" as const;
    case PatientStatus.Admitted:
      return "success" as const;
    case PatientStatus.Discharged:
      return "neutral" as const;
    case PatientStatus.Transferred:
      return "reserved" as const;
    default:
      return "neutral" as const;
  }
}

function formatDate(ts: bigint | undefined): string {
  if (!ts) return "—";
  return new Date(Number(ts) / 1_000_000).toLocaleDateString();
}

interface RowActionsProps {
  patient: Patient;
  canAdmitDischarge: boolean;
  onView: () => void;
  onAdmit: () => void;
  onDischarge: () => void;
  onTransfer: () => void;
}

function PatientRowActions({
  patient,
  canAdmitDischarge,
  onView,
  onAdmit,
  onDischarge,
  onTransfer,
}: RowActionsProps) {
  return (
    <div className="flex items-center gap-1 justify-end">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onView}
        data-ocid="patients.view_button"
        className="text-xs gap-1"
      >
        View <ChevronRight className="h-3 w-3" />
      </Button>
      {canAdmitDischarge && (
        <>
          {patient.status === PatientStatus.OPD && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onAdmit}
              data-ocid="patients.admit_button"
              className="text-xs gap-1 text-green-400 border-green-500/30 hover:bg-green-500/10"
            >
              <BedIcon className="h-3 w-3" /> Admit
            </Button>
          )}
          {patient.status === PatientStatus.Admitted && (
            <>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onTransfer}
                data-ocid="patients.transfer_button"
                className="text-xs gap-1 text-accent border-accent/30 hover:bg-accent/10"
              >
                <RefreshCw className="h-3 w-3" /> Transfer
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onDischarge}
                data-ocid="patients.discharge_button"
                className="text-xs gap-1 text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-3 w-3" /> Discharge
              </Button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export function PatientsPage() {
  const { user } = useAuth();
  const { data: patients = [], isLoading } = usePatients();
  const { data: wards = [] } = useWards();
  const { data: beds = [] } = useBeds();

  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showRegister, setShowRegister] = useState(false);
  const [admitTarget, setAdmitTarget] = useState<Patient | null>(null);
  const [dischargeTarget, setDischargeTarget] = useState<Patient | null>(null);
  const [transferTarget, setTransferTarget] = useState<Patient | null>(null);

  const canAdmitDischarge =
    user?.role === UserRole.SuperAdmin ||
    user?.role === UserRole.Receptionist ||
    user?.role === UserRole.Nurse;

  const canRegister =
    user?.role === UserRole.SuperAdmin || user?.role === UserRole.Receptionist;

  const filteredData = useMemo(() => {
    if (statusFilter === "All") return patients;
    const map: Record<Exclude<StatusFilter, "All">, PatientStatus> = {
      OPD: PatientStatus.OPD,
      Admitted: PatientStatus.Admitted,
      Discharged: PatientStatus.Discharged,
      Transferred: PatientStatus.Transferred,
    };
    return patients.filter(
      (p) => p.status === map[statusFilter as Exclude<StatusFilter, "All">],
    );
  }, [patients, statusFilter]);

  const wardMap = useMemo(() => {
    const m = new Map<string, string>();
    for (const w of wards) m.set(w.id.toString(), w.name);
    return m;
  }, [wards]);

  const columns: ColumnDef<Patient>[] = useMemo(
    () => [
      {
        accessorKey: "mrn",
        header: "MRN",
        cell: ({ row }) => (
          <span className="font-mono text-xs text-accent font-medium">
            {row.original.mrn}
          </span>
        ),
      },
      {
        id: "name",
        header: "Patient Name",
        accessorFn: (r) => `${r.firstName} ${r.lastName}`,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <User2 className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-medium text-foreground text-sm truncate">
                {row.original.firstName} {row.original.lastName}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {row.original.phone}
              </p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "gender",
        header: "Gender",
        cell: ({ getValue }) => (
          <span className="text-sm text-foreground">
            {getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "bloodGroup",
        header: "Blood",
        cell: ({ getValue }) => (
          <span className="font-semibold text-sm text-accent">
            {getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const s = getValue() as string;
          return <StatusBadge status={s} variant={getStatusVariant(s)} />;
        },
      },
      {
        id: "ward",
        header: "Ward",
        cell: ({ row }) => {
          const wid = row.original.wardId;
          if (!wid)
            return <span className="text-muted-foreground text-xs">—</span>;
          return (
            <span className="text-sm text-foreground">
              {wardMap.get(wid.toString()) ?? "—"}
            </span>
          );
        },
      },
      {
        id: "admitted",
        header: "Admitted",
        cell: ({ row }) => (
          <span className="text-xs text-muted-foreground">
            {formatDate(row.original.admissionDate)}
          </span>
        ),
      },
      {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => (
          <PatientRowActions
            patient={row.original}
            canAdmitDischarge={canAdmitDischarge}
            onView={() => setSelectedPatient(row.original)}
            onAdmit={() => setAdmitTarget(row.original)}
            onDischarge={() => setDischargeTarget(row.original)}
            onTransfer={() => setTransferTarget(row.original)}
          />
        ),
      },
    ],
    [wardMap, canAdmitDischarge],
  );

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { All: patients.length };
    for (const p of patients) {
      counts[p.status] = (counts[p.status] ?? 0) + 1;
    }
    return counts;
  }, [patients]);

  return (
    <div className="p-6 space-y-6" data-ocid="patients.page">
      <PageHeader
        title="Patients"
        description="Register, admit, discharge and manage all patients"
        breadcrumb={["HMS", "Patients"]}
        actions={
          canRegister ? (
            <Button
              type="button"
              onClick={() => setShowRegister(true)}
              className="gap-2"
              data-ocid="patients.add_button"
            >
              <UserPlus className="h-4 w-4" />
              Register Patient
            </Button>
          ) : undefined
        }
      />

      {/* Status summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(
          [
            {
              label: "Total",
              key: "All",
              icon: User2,
              color: "text-foreground",
            },
            {
              label: "OPD",
              key: PatientStatus.OPD,
              icon: Stethoscope,
              color: "text-accent",
            },
            {
              label: "Admitted",
              key: PatientStatus.Admitted,
              icon: BedIcon,
              color: "text-green-400",
            },
            {
              label: "Discharged",
              key: PatientStatus.Discharged,
              icon: LogOut,
              color: "text-muted-foreground",
            },
          ] as const
        ).map(({ label, key, icon: Icon, color }) => (
          <div
            key={key}
            className="bg-card border border-border rounded-xl p-4 flex items-center gap-3"
          >
            <div className="h-10 w-10 rounded-lg bg-muted/30 flex items-center justify-center shrink-0">
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {statusCounts[key] ?? 0}
              </p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter tabs + table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex items-center gap-1 px-4 pt-4 border-b border-border overflow-x-auto">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setStatusFilter(f)}
              data-ocid={`patients.filter.${f.toLowerCase()}_tab`}
              className={`px-4 py-2 text-sm font-medium rounded-t-md whitespace-nowrap transition-colors ${
                statusFilter === f
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
              }`}
            >
              {f}
              {f !== "All" && (
                <span className="ml-1.5 text-xs opacity-70">
                  (
                  {statusCounts[
                    f === "OPD"
                      ? PatientStatus.OPD
                      : f === "Admitted"
                        ? PatientStatus.Admitted
                        : f === "Discharged"
                          ? PatientStatus.Discharged
                          : PatientStatus.Transferred
                  ] ?? 0}
                  )
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="p-4">
          <DataTable
            data={filteredData}
            columns={columns}
            searchPlaceholder="Search by name, MRN, or phone…"
            isLoading={isLoading}
            pageSize={10}
          />
        </div>
      </div>

      {/* Modals */}
      {showRegister && (
        <RegisterPatientModal
          open={showRegister}
          onClose={() => setShowRegister(false)}
        />
      )}
      {admitTarget && (
        <AdmitPatientModal
          patient={admitTarget}
          wards={wards}
          beds={beds}
          onClose={() => setAdmitTarget(null)}
        />
      )}
      {dischargeTarget && (
        <DischargePatientModal
          patient={dischargeTarget}
          onClose={() => setDischargeTarget(null)}
        />
      )}
      {transferTarget && (
        <TransferPatientModal
          patient={transferTarget}
          wards={wards}
          beds={beds}
          onClose={() => setTransferTarget(null)}
        />
      )}
      {selectedPatient && (
        <PatientProfileDrawer
          patient={selectedPatient}
          wards={wards}
          beds={beds}
          onClose={() => setSelectedPatient(null)}
          onAdmit={() => {
            setSelectedPatient(null);
            setAdmitTarget(selectedPatient);
          }}
          onDischarge={() => {
            setSelectedPatient(null);
            setDischargeTarget(selectedPatient);
          }}
          onTransfer={() => {
            setSelectedPatient(null);
            setTransferTarget(selectedPatient);
          }}
        />
      )}
    </div>
  );
}
