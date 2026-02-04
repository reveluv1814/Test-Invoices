import { useState, useEffect } from "react";
import type { Invoice, InvoiceStatus } from "../types";
import "./InvoicesPage.css";
import { useParams } from "react-router-dom";
import { useInvoices } from "../hooks/useInvoices";
import { ErrorMessage } from "../components/ErrorMessage";
import { InvoiceTable } from "../components/InvoiceTable";
import { PaymentModal } from "../components/PaymentModal";
import { Breadcrumb } from "../components/Breadcrumb";
import { FilterForm } from "../components/FilterForm";

export const InvoicesPage = () => {
  const { customerId } = useParams<{ customerId: string }>();

  const [page, setPage] = useState<number>(1);
  const [estado, setEstado] = useState<InvoiceStatus | undefined>(undefined);
  const [servicio, setServicio] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);

  const {
    invoices,
    pagination,
    error,
    isInvoicesLoading,
    isPaymentLoading,
    fetchInvoices,
    confirmPayment,
  } = useInvoices();

  const fetchData = async (): Promise<void> => {
    if (customerId) {
      await fetchInvoices({ customerId, page, filters: { estado, servicio } });
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId, page, estado, servicio]);

  const handleOpenPaymentModal = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    if (!isPaymentLoading) {
      setIsPaymentModalOpen(false);
      setSelectedInvoice(null);
    }
  };

  const handleConfirmPayment = async (): Promise<void> => {
    if (!selectedInvoice) return;
    await confirmPayment(selectedInvoice);
    setIsPaymentModalOpen(false);
    setSelectedInvoice(null);
    await fetchData();
  };

  return (
    <div className="invoices-page">
      <header className="page-header">
        <div className="header-content">
          <Breadcrumb
            items={[
              { label: "Inicio", path: "/" },
              { label: `Cliente: ${customerId}` },
            ]}
          />
          <h1 id="page-title">Gestión de facturas</h1>
        </div>
      </header>

      <div className="page-content">
        {error && !isInvoicesLoading && (
          <ErrorMessage message={error} onRetry={() => fetchData()} />
        )}

        {!error && (
          <InvoiceTable
            invoices={invoices}
            onAction={handleOpenPaymentModal}
            isLoading={isInvoicesLoading}
            pagination={pagination}
            setPage={setPage}
            onRefresh={() => fetchData()}
            filterComponent={
              <FilterForm
                setEstado={(value) => setEstado(value ?? undefined)}
                setServicio={(value) => setServicio(value ?? "")}
                isLoading={isInvoicesLoading}
              />
            }
          />
        )}
      </div>

      <PaymentModal
        invoice={selectedInvoice}
        isOpen={isPaymentModalOpen}
        onClose={handleClosePaymentModal}
        onConfirm={handleConfirmPayment}
        isLoading={isPaymentLoading}
      />
    </div>
  );
};
