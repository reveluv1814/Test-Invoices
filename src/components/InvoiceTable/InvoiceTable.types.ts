import type { Invoice } from "../../types";

export interface InvoiceTableProps {
  invoices: Invoice[];
  isLoading: boolean;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filterComponent?: React.ReactNode;
  onAction: (invoice: Invoice) => void;
  setPage: (page: number) => void;
  onRefresh: () => void;
}
