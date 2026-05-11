import { useTheme } from "@/context/ThemeContext";
import { Toaster } from "sonner";

export function ToastProvider() {
  const { theme } = useTheme();
  return (
    <Toaster
      theme={theme}
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast: "border border-border bg-card text-foreground",
          title: "font-semibold",
          description: "text-muted-foreground text-sm",
        },
      }}
    />
  );
}
