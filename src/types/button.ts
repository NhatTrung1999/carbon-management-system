import { type ReactNode } from "react";

export interface ButtonProps {
  label: string | ReactNode;
  type: "submit" | "reset" | "button";
  className: string;
  onClick?: () => void;
  imgSrc?: string;
}
