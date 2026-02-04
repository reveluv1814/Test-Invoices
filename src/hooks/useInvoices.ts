import { useState } from "react";
import type { Invoice, InvoiceFilters, PaginatedResponse } from "../types";
import { invoiceService } from "../services/invoiceService";
import { useToast } from "../context/ToastContext";

const ITEMS_PER_PAGE = 5;

export const useInvoices = () => {
  const { showToast } = useToast();

  const [data, setData] = useState<PaginatedResponse<Invoice> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInvoicesLoading, setIsInvoicesLoading] = useState<boolean>(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState<boolean>(false);

  const fetchInvoices = async ({
    customerId,
    page = 1,
    filters,
  }: {
    customerId: string;
    page?: number;
    filters?: InvoiceFilters;
  }) => {
    setError(null);
    setIsInvoicesLoading(true);
    try {
      const response = await invoiceService.getInvoicesByCustomer(
        customerId,
        page,
        ITEMS_PER_PAGE,
        filters,
      );
      setData(response);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al buscar las facturas");
      setData(null);
    } finally {
      setIsInvoicesLoading(false);
    }
  };

  const confirmPayment = async (selectedInvoice: Invoice) => {
    if (!selectedInvoice) return;

    setIsPaymentLoading(true);

    try {
      const result = await invoiceService.payInvoice(selectedInvoice.id);

      if (result.success && result.invoice) {
        showToast("¡Pago procesado exitosamente!", "success");
      }
    } catch (e) {
      showToast(
        e instanceof Error
          ? e.message
          : "Error al procesar el pago. Por favor, intente nuevamente.",
        "error",
      );
    } finally {
      setIsPaymentLoading(false);
    }
  };

  return {
    invoices: data?.data || [],
    pagination: data?.pagination || {
      page: 1,
      limit: ITEMS_PER_PAGE,
      total: 0,
      totalPages: 0,
    },
    error,
    isInvoicesLoading,
    isPaymentLoading,
    fetchInvoices,
    confirmPayment,
  };
};
