import type { InvoiceStatus } from "../../../types";
import "./ChipStatus.css";

interface ChipStatusProps {
  status: InvoiceStatus;
}

const statusConfig = {
  PENDING: {
    label: "Pendiente",
    className: "chip-pending",
  },
  PAID: {
    label: "Pagada",
    className: "chip-paid",
  },
} as const;

export const ChipStatus = ({ status }: ChipStatusProps) => {
  const config = statusConfig[status];

  return <span className={`chip ${config.className}`}>{config.label}</span>;
};
