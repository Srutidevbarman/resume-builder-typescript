"use client";

import {
  AlertCircle,
  CheckCircle2,
  Info,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import clsx from "clsx";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const toastStyles: Record<
  ToastType,
  { icon: LucideIcon; className: string; iconClassName: string }
> = {
  success: {
    icon: CheckCircle2,
    className: "border-emerald-400/25 bg-emerald-950/90 text-emerald-50",
    iconClassName: "text-emerald-300",
  },
  error: {
    icon: AlertCircle,
    className: "border-red-400/25 bg-red-950/90 text-red-50",
    iconClassName: "text-red-300",
  },
  info: {
    icon: Info,
    className: "border-sky-400/25 bg-sky-950/90 text-sky-50",
    iconClassName: "text-sky-300",
  },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback(
    (type: ToastType, message: string) => {
      const id = crypto.randomUUID();

      setToasts((current) => [
        ...current.filter(
          (toast) => toast.type !== type || toast.message !== message,
        ),
        { id, type, message },
      ].slice(-4));
      window.setTimeout(() => dismiss(id), 4500);
    },
    [dismiss],
  );

  const value = useMemo(
    () => ({
      success: (message: string) => show("success", message),
      error: (message: string) => show("error", message),
      info: (message: string) => show("info", message),
    }),
    [show],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-6">
        {toasts.map((toast) => {
          const style = toastStyles[toast.type];
          const Icon = style.icon;

          return (
            <div
              key={toast.id}
              role="status"
              className={clsx(
                "pointer-events-auto flex items-start gap-3 rounded-lg border p-4 shadow-2xl backdrop-blur-xl fade",
                style.className,
              )}
            >
              <Icon
                size={20}
                className={clsx("mt-0.5 shrink-0", style.iconClassName)}
              />

              <p className="min-w-0 flex-1 text-sm leading-5">
                {toast.message}
              </p>

              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                className="shrink-0 rounded-md p-1 text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label="Dismiss notification"
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}
