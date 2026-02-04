import { useEffect } from "react";
import type { Toast as ToastType } from "./Toast.types";
import "./Toast.css";

interface ToastItemProps {
  toast: ToastType;
  onRemove: (id: string) => void;
}

export const ToastItem = ({ toast, onRemove }: ToastItemProps) => {
  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        onRemove(toast.id);
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onRemove]);

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return "ri-checkbox-circle-line";
      case "error":
        return "ri-error-warning-line";
      case "warning":
        return "ri-alert-line";
      case "info":
      default:
        return "ri-information-line";
    }
  };

  return (
    <div className={`toast-item toast-${toast.type}`}>
      <i className={`toast-icon ${getIcon()}`} />
      <p className="toast-message">{toast.message}</p>
      <button
        className="toast-close"
        onClick={() => onRemove(toast.id)}
        aria-label="Cerrar notificación"
      >
        <i className="ri-close-line" />
      </button>
    </div>
  );
};
