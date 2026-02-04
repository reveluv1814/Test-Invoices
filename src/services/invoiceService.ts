import type {
  Invoice,
  PaymentResponse,
  PaginatedResponse,
  InvoiceFilters,
  CustomerResponse,
} from "../types";
import { httpClient } from "./httpWrapper";

export const invoiceService = {
  async verifyCustomer(customerId: string): Promise<CustomerResponse> {
    return httpClient.get<CustomerResponse>(`/customers/${customerId}`);
  },

  async getInvoicesByCustomer(
    customerId: string,
    page: number = 1,
    limit: number = 5,
    filters?: InvoiceFilters,
  ): Promise<PaginatedResponse<Invoice>> {
    const params: Record<string, string> = {
      customerId,
      page: page.toString(),
      limit: limit.toString(),
      ...(filters?.estado && { estado: filters.estado }),
      ...(filters?.servicio && { servicio: filters.servicio }),
    };

    return httpClient.get<PaginatedResponse<Invoice>>("/invoices", {
      params,
    });
  },

  async payInvoice(invoiceId: string): Promise<PaymentResponse> {
    return httpClient.post<PaymentResponse>(`/invoices/${invoiceId}/pay`);
  },

  async getInvoiceById(invoiceId: string): Promise<Invoice> {
    return httpClient.get<Invoice>(`/invoices/${invoiceId}`);
  },
};
