import type { InvoiceStatus } from "../../types";

export interface FilterFormProps {
  setEstado: (estado: InvoiceStatus | undefined) => void;
  setServicio: (servicio: string | undefined) => void;
  isLoading?: boolean;
}
