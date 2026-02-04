export type BannerType = "info" | "warning" | "success" | "error";

export interface BannerCustomProps {
  message: string;
  type?: BannerType;
  icon?: string;
  className?: string;
}
