import { useState } from "react";
import { EnumInvoiceStatus } from "../../types";
import "./InvoiceTable.css";
import type { InvoiceTableProps } from "./InvoiceTable.types";
import { ChipStatus } from "./ui/ChipStatus";
import ButtonPDF from "../PdfComponents/ButtonPDF";
import { formatAmount } from "../../utils/formatters";

export const InvoiceTable = ({
  invoices,
  isLoading,
  pagination,
  filterComponent,
  onAction,
  setPage,
  onRefresh,
}: InvoiceTableProps) => {
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);

  const handlePage = (page: number) => {
    setPage(page);
  };

  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      setPage(pagination.page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pagination.page > 1) {
      setPage(pagination.page - 1);
    }
  };

  const onFilterChange = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <div className="invoice-table-container">
      <div className="table-header">
        <h2>Facturas Encontradas </h2>
        <div className="table-actionsHeader">
          <button
            id="update-button"
            className="actionHeader-button"
            onClick={onRefresh}
            disabled={isLoading}
            aria-label="Actualizar facturas"
          >
            <i className="ri-refresh-line" />
            Actualizar
          </button>
          <button
            id="filter-button"
            className="actionHeader-button"
            onClick={onFilterChange}
            disabled={isLoading}
            style={
              isFilterVisible
                ? {
                    backgroundColor: "var(--color-primary)",
                    color: "white",
                  }
                : {}
            }
            aria-label="Filtrar facturas"
          >
            <i className="ri-filter-line" />
            Filtrar
          </button>
        </div>
      </div>

      {isFilterVisible && <div>{filterComponent}</div>}

      <div className="table-responsive">
        <div className="table-wrapper">
          {isLoading ? (
            <div className="table-loading-overlay">
              <div className="table-spinner"></div>
            </div>
          ) : invoices.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No hay facturas</h3>
              <p>No se encontraron facturas para este cliente</p>
            </div>
          ) : (
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Servicio</th>
                  <th>Período</th>
                  <th>Monto</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td data-label="Servicio">{invoice.servicio}</td>
                    <td data-label="Período">{invoice.periodo}</td>
                    <td data-label="Monto" className="amount">
                      {formatAmount(invoice.monto)}
                    </td>
                    <td data-label="Estado">
                      <ChipStatus status={invoice.estado} />
                    </td>
                    <td data-label="Acciones">
                      {invoice.estado === EnumInvoiceStatus.PENDING ? (
                        <button
                          className="btn-pay"
                          onClick={() => onAction(invoice)}
                          disabled={isLoading}
                        >
                          <i className="ri-wallet-3-line" />
                          Pagar
                        </button>
                      ) : (
                        <span className="paid-label">
                          <ButtonPDF data={invoice} />
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {pagination.totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={handlePreviousPage}
            disabled={pagination.page === 1}
          >
            <i className="ri-arrow-left-line" /> Anterior
          </button>

          <div className="pagination-info">
            <span className="page-numbers">
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1,
              ).map((page) => (
                <button
                  key={page}
                  className={`page-number ${pagination.page === page ? "active" : ""}`}
                  onClick={() => handlePage(page)}
                >
                  {page}
                </button>
              ))}
            </span>
            <span className="page-info">
              Página {pagination.page} de {pagination.totalPages}
            </span>
          </div>

          <button
            className="pagination-btn"
            onClick={handleNextPage}
            disabled={pagination.page === pagination.totalPages}
          >
            Siguiente <i className="ri-arrow-right-line" />
          </button>
        </div>
      )}
    </div>
  );
};
