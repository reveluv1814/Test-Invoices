import "./ConfirmModal.css";
import type { ConfirmModalProps } from "./ConfirmModal.types";

export const ConfirmModal = ({
  isOpen,
  title,
  content,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "default",
  isLoading = false,
  onConfirm,
  onClose,
  children,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };
  const handleConfirmClick = async () => {
    await onConfirm();
  };

  const getIcon = () => {
    switch (variant) {
      case "danger":
        return "ri-error-warning-line";
      case "warning":
        return "ri-alert-line";
      case "success":
        return "ri-checkbox-circle-line";
      default:
        return "ri-information-line";
    }
  };

  return (
    <div className="confirm-modal-overlay" onClick={handleOverlayClick}>
      <div className="confirm-modal-content">
        <div className={`confirm-modal-header confirm-modal-${variant}`}>
          <div className="confirm-modal-title-wrapper">
            <i className={`confirm-modal-icon ${getIcon()}`} />
            <h2>{title}</h2>
          </div>
          <button
            className="confirm-modal-close"
            onClick={onClose}
            disabled={isLoading}
            aria-label="Cerrar"
          >
            <i className="ri-close-line" />
          </button>
        </div>

        <div className="confirm-modal-body">
          <p className="confirm-modal-message">{content}</p>
          {children && <div className="confirm-modal-extra">{children}</div>}
        </div>

        <div className="confirm-modal-footer">
          <button
            id="btn-cancel-confirm"
            className="confirm-btn-cancel"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            id="btn-confirm-confirm"
            className={`confirm-btn-confirm confirm-btn-${variant}`}
            onClick={handleConfirmClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="ri-loader-4-line spinning" />
                Procesando...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
