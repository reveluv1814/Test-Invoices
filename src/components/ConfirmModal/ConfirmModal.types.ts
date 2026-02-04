export type ConfirmModalVariant = "default" | "danger" | "warning" | "success";

export interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmModalVariant;
  isLoading?: boolean;
  onConfirm: () => Promise<void>;
  onClose: () => void;
  children?: React.ReactNode;
}
