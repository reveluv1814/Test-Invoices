import "./PaymentModal.css";
import type { PaymentModalProps } from "./PaymentModal.types";
import { BannerCustom } from "../BannerCustom";
import { ConfirmModal } from "../ConfirmModal";
import { useState } from "react";
import { formatAmount } from "../../utils/formatters";

export const PaymentModal = ({
  invoice,
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: PaymentModalProps) => {
  const [modalConfirmOpen, setModalConfirmOpen] = useState<boolean>(false);

  if (!isOpen || !invoice) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const hadlerConfirmClick = async () => {
    setModalConfirmOpen(false);
    await onConfirm();
  };

  return (
    <>
      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>Confirmar Pago</h2>
            <button
              className="close-button"
              onClick={onClose}
              disabled={isLoading}
            >
              ✕
            </button>
          </div>

          <div className="modal-body">
            <div className="invoice-details">
              <div className="detail-row">
                <span className="detail-label">Servicio:</span>
                <span className="detail-value">{invoice.servicio}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Período:</span>
                <span className="detail-value">{invoice.periodo}</span>
              </div>
              <div className="detail-row highlight">
                <span className="detail-label">Monto a pagar:</span>
                <span className="detail-value amount">
                  {formatAmount(invoice.monto)}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Factura ID:</span>
                <span className="detail-value">{invoice.id}</span>
              </div>
            </div>

            <BannerCustom
              type="info"
              message="¿Está seguro de que desea procesar el pago de esta factura?"
            />
          </div>

          <div className="modal-footer">
            <button
              id="btn-payment-cancel"
              className="btn-cancel"
              onClick={onClose}
              disabled={isLoading || modalConfirmOpen}
            >
              Cancelar
            </button>
            <button
              id="btn-payment-confirm"
              className="btn-confirm"
              onClick={() => setModalConfirmOpen(true)}
              disabled={isLoading || modalConfirmOpen}
            >
              {isLoading ? "Procesando..." : "Confirmar Pago"}
            </button>
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={modalConfirmOpen}
        onClose={() => setModalConfirmOpen(false)}
        onConfirm={hadlerConfirmClick}
        title="Confirmar Pago"
        content="Está seguro de realizar el pago?"
        isLoading={isLoading}
      />
    </>
  );
};
