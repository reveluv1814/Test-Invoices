import "./BannerCustom.css";
import type { BannerCustomProps } from "./BannerCustom.types";

export const BannerCustom = ({
  message,
  type = "info",
  icon,
  className = "",
}: BannerCustomProps) => {
  const getDefaultIcon = () => {
    switch (type) {
      case "info":
        return "ri-information-line";
      case "warning":
        return "ri-alert-line";
      case "success":
        return "ri-checkbox-circle-line";
      case "error":
        return "ri-error-warning-line";
      default:
        return "ri-information-line";
    }
  };

  return (
    <div className={`banner-custom banner-${type} ${className}`}>
      <i className={`banner-icon ${icon || getDefaultIcon()}`} />
      <p className="banner-message">{message}</p>
    </div>
  );
};
