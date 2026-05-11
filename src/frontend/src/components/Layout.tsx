import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { ToastProvider } from "./ui/ToastProvider";

export function Layout() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    navigate({ to: "/login" as "/" });
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-shrink-0">
        <Sidebar collapsed={sidebarCollapsed} />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setMobileSidebarOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
            <Sidebar
              collapsed={false}
              onClose={() => setMobileSidebarOpen(false)}
            />
          </div>
        </>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header
          onMenuToggle={() => {
            if (window.innerWidth >= 1024) {
              setSidebarCollapsed((c) => !c);
            } else {
              setMobileSidebarOpen((o) => !o);
            }
          }}
        />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="p-6 max-w-screen-2xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      <ToastProvider />
    </div>
  );
}
