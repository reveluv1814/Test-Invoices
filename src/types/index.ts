export type InvoiceStatus = "PENDING" | "PAID";

export const EnumInvoiceStatus = {
  PENDING: "PENDING",
  PAID: "PAID",
} as const;

export interface Invoice {
  id: string;
  customerId: string;
  servicio: string;
  periodo: string;
  monto: number;
  estado: InvoiceStatus;
  fechaEmision: string;
}

export interface Customer {
  id: string;
  nombre: string;
  email: string;
}

export interface PaymentRequest {
  invoiceId: string;
  customerId: string;
  metodoPago?: string;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  invoice?: Invoice;
}

export interface ApiError {
  message: string;
  code?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface InvoiceFilters {
  estado?: InvoiceStatus;
  servicio?: string;
}

export interface CustomerResponse {
  success: boolean;
  customer: Customer;
}
