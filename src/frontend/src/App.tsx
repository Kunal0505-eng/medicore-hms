import { Layout } from "@/components/Layout";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { DashboardPage } from "@/pages/DashboardPage";
import { LoginPage } from "@/pages/LoginPage";
import { InternetIdentityProvider } from "@caffeineai/core-infrastructure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const PatientsPage = lazy(() =>
  import("@/pages/PatientsPage").then((m) => ({ default: m.PatientsPage })),
);
const AppointmentsPage = lazy(() =>
  import("@/pages/AppointmentsPage").then((m) => ({
    default: m.AppointmentsPage,
  })),
);
const EmergencyPage = lazy(() =>
  import("@/pages/EmergencyPage").then((m) => ({ default: m.EmergencyPage })),
);
const EMRPage = lazy(() =>
  import("@/pages/EMRPage").then((m) => ({ default: m.EMRPage })),
);
const LabPage = lazy(() =>
  import("@/pages/LabPage").then((m) => ({ default: m.LabPage })),
);
const RadiologyPage = lazy(() =>
  import("@/pages/RadiologyPage").then((m) => ({ default: m.RadiologyPage })),
);
const WardPage = lazy(() =>
  import("@/pages/WardPage").then((m) => ({ default: m.WardPage })),
);
const StaffPage = lazy(() =>
  import("@/pages/StaffPage").then((m) => ({ default: m.StaffPage })),
);
const PharmacyPage = lazy(() =>
  import("@/pages/PharmacyPage").then((m) => ({ default: m.PharmacyPage })),
);
const BillingPage = lazy(() =>
  import("@/pages/BillingPage").then((m) => ({ default: m.BillingPage })),
);
const InventoryPage = lazy(() =>
  import("@/pages/InventoryPage").then((m) => ({ default: m.InventoryPage })),
);
const ReportsPage = lazy(() =>
  import("@/pages/ReportsPage").then((m) => ({ default: m.ReportsPage })),
);
const NotificationsPage = lazy(() =>
  import("@/pages/NotificationsPage").then((m) => ({
    default: m.NotificationsPage,
  })),
);
const AdminPage = lazy(() =>
  import("@/pages/AdminPage").then((m) => ({ default: m.AdminPage })),
);

function PageLoader() {
  return (
    <div className="space-y-4 p-6">
      <LoadingSkeleton rows={3} cols={4} />
    </div>
  );
}

// ProtectedRoute removed — auth is handled in Layout

const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </ThemeProvider>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app",
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/",
  component: DashboardPage,
});

function makeLazyRoute(
  path: string,
  Component: React.LazyExoticComponent<() => React.ReactElement>,
) {
  return createRoute({
    getParentRoute: () => appLayoutRoute,
    path,
    component: () => (
      <Suspense fallback={<PageLoader />}>
        <Component />
      </Suspense>
    ),
  });
}

const patientsRoute = makeLazyRoute("/patients", PatientsPage);
const appointmentsRoute = makeLazyRoute("/appointments", AppointmentsPage);
const emergencyRoute = makeLazyRoute("/emergency", EmergencyPage);
const emrRoute = makeLazyRoute("/emr", EMRPage);
const labRoute = makeLazyRoute("/lab", LabPage);
const radiologyRoute = makeLazyRoute("/radiology", RadiologyPage);
const wardRoute = makeLazyRoute("/ward", WardPage);
const staffRoute = makeLazyRoute("/staff", StaffPage);
const pharmacyRoute = makeLazyRoute("/pharmacy", PharmacyPage);
const billingRoute = makeLazyRoute("/billing", BillingPage);
const inventoryRoute = makeLazyRoute("/inventory", InventoryPage);
const reportsRoute = makeLazyRoute("/reports", ReportsPage);
const notificationsRoute = makeLazyRoute("/notifications", NotificationsPage);
const adminRoute = makeLazyRoute("/admin", AdminPage);

const routeTree = rootRoute.addChildren([
  loginRoute,
  appLayoutRoute.addChildren([
    indexRoute,
    patientsRoute,
    appointmentsRoute,
    emergencyRoute,
    emrRoute,
    labRoute,
    radiologyRoute,
    wardRoute,
    staffRoute,
    pharmacyRoute,
    billingRoute,
    inventoryRoute,
    reportsRoute,
    notificationsRoute,
    adminRoute,
  ]),
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
    },
  },
});

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <InternetIdentityProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </InternetIdentityProvider>
  );
}
