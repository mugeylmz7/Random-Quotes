import { ReactNode } from "react";

interface H3Props {
  element?: "h3" | "p" | "span";
  children: ReactNode;
  className?: string;
}

export function H3({ element, children, className }: H3Props) {
  switch (element) {
    case "p":
      return (
        <p className={`text-2xl font-semibold text-slate-900 ${className || ""}`}>
          {children}
        </p>
      );
    case "span":
      return (
        <span className={`text-2xl font-semibold text-slate-900 ${className || ""}`}>
          {children}
        </span>
      );
    default:
      return (
        <h3 className={`text-2xl font-semibold text-slate-900 ${className || ""}`}>
          {children}
        </h3>
      );
  }
}
