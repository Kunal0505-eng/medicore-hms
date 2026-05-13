import type { UserRole } from "@/backend";
import { useAuth } from "@/context/AuthContext";
import type { AuthUser } from "@/context/AuthContext";
import { useInitSampleData } from "@/services/admin";
import { useNavigate } from "@tanstack/react-router";
import {
  Cross,
  FlaskConical,
  HeartPulse,
  Pill,
  Shield,
  Stethoscope,
  User,
  UserCheck,
} from "lucide-react";
import { toast } from "sonner";

const DEMO_USERS: (AuthUser & {
  color: string;
  description: string;
  icon: React.ElementType;
})[] = [
  {
    id: "admin-001",
    name: "Dr. Admin",
    role: "SuperAdmin" as UserRole,
    email: "admin@lbshospital.in",
    avatar: "A",
    department: "Administration",
    userId: BigInt(1),
    color: "from-purple-500/20 to-purple-600/10 border-purple-500/30",
    description: "Full system access",
    icon: Shield,
  },
  {
    id: "doc-001",
    name: "Dr. Alex Chen",
    role: "Doctor" as UserRole,
    email: "alex.chen@lbshospital.in",
    avatar: "A",
    department: "Cardiology",
    userId: BigInt(2),
    color: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
    description: "Cardiologist, Senior Consultant",
    icon: Stethoscope,
  },
  {
    id: "nur-001",
    name: "Nurse Sarah Wilson",
    role: "Nurse" as UserRole,
    email: "sarah.wilson@lbshospital.in",
    avatar: "S",
    department: "ICU",
    userId: BigInt(3),
    color: "from-green-500/20 to-green-600/10 border-green-500/30",
    description: "ICU Head Nurse",
    icon: HeartPulse,
  },
  {
    id: "rec-001",
    name: "James Carter",
    role: "Receptionist" as UserRole,
    email: "james.carter@lbshospital.in",
    avatar: "J",
    department: "Front Desk",
    userId: BigInt(4),
    color: "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30",
    description: "Front Desk & Appointments",
    icon: UserCheck,
  },
  {
    id: "pharm-001",
    name: "Maria Lopez",
    role: "Pharmacist" as UserRole,
    email: "maria.lopez@lbshospital.in",
    avatar: "M",
    department: "Pharmacy",
    userId: BigInt(5),
    color: "from-teal-500/20 to-teal-600/10 border-teal-500/30",
    description: "Chief Pharmacist",
    icon: Pill,
  },
  {
    id: "lab-001",
    name: "David Kim",
    role: "LabTechnician" as UserRole,
    email: "david.kim@lbshospital.in",
    avatar: "D",
    department: "Laboratory",
    userId: BigInt(6),
    color: "from-orange-500/20 to-orange-600/10 border-orange-500/30",
    description: "Senior Lab Technician",
    icon: FlaskConical,
  },
  {
    id: "pat-001",
    name: "Emily Johnson",
    role: "Patient" as UserRole,
    email: "emily.johnson@gmail.com",
    avatar: "E",
    userId: BigInt(7),
    color: "from-pink-500/20 to-pink-600/10 border-pink-500/30",
    description: "Patient Portal Access",
    icon: User,
  },
];

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const initSampleData = useInitSampleData();

  const handleLogin = async (user: AuthUser) => {
    login(user);
    try {
      await initSampleData.mutateAsync();
    } catch {
      // Sample data may already exist
    }
    toast.success(`Welcome, ${user.name}!`, {
      description: `Logged in as ${user.role}`,
    });
    navigate({ to: "/" as const });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div
        className="hidden lg:flex lg:w-2/5 xl:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.1 0.015 270), oklch(0.16 0.015 240))",
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url(/assets/generated/hms-hero.dim_1200x400.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg">
              <Cross
                className="h-5 w-5 text-[oklch(0.12_0.01_270)]"
                strokeWidth={2.5}
              />
            </div>
            <div>
              <p className="font-bold text-foreground text-xl">LBS Hospital</p>
              <p className="text-xs text-muted-foreground">
                Lal Bahadur Shastri Hospital
              </p>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground font-display leading-tight mb-4">
            Hospital Management
            <br />
            <span className="text-accent">System</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive healthcare operations platform for 14 clinical
            modules, 7 staff roles, and real-time patient management.
          </p>
        </div>
        <div className="relative z-10 grid grid-cols-2 gap-3">
          {["10 Patients", "5 Doctors", "3 Wards", "20 Drugs"].map((stat) => (
            <div
              key={stat}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3"
            >
              <p className="text-foreground font-semibold">{stat}</p>
              <p className="text-xs text-muted-foreground">Pre-loaded</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel: role selection */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center">
              <Cross
                className="h-4 w-4 text-[oklch(0.12_0.01_270)]"
                strokeWidth={2.5}
              />
            </div>
            <div>
              <p className="font-bold text-foreground">LBS Hospital</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-1">
            Select a role to demo
          </h2>
          <p className="text-muted-foreground text-sm mb-8">
            Choose any role to explore the system. Each role has different
            module access.
          </p>

          <div className="space-y-3" data-ocid="login.role_list">
            {DEMO_USERS.map((user, i) => {
              const Icon = user.icon;
              return (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => handleLogin(user)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border bg-gradient-to-r ${user.color} hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 text-left`}
                  data-ocid={`login.role.item.${i + 1}`}
                >
                  <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.description}
                    </p>
                  </div>
                  <span className="shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold bg-foreground/10 text-foreground">
                    {user.role}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-8">
            Demo mode — no real credentials required
          </p>
        </div>
      </div>
    </div>
  );
}
