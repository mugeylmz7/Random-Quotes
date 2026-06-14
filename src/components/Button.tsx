interface ButtonProps {
  variant: "primary" | "secondary" | "icon";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  "aria-label"?: string; // Tireli olduğu için tırnak içinde
}


export function Button({ variant, children, onClick, className, style, title, "aria-label": ariaLabel }: ButtonProps) {
  let buttonStyles = "";

  switch (variant) {
    case "primary":
      buttonStyles = "bg-slate-400/90 text-slate-900 hover:bg-blue-500";
      break;
    case "secondary":
      buttonStyles = "bg-gray-200/90 text-slate-800 hover:bg-gray-600";
      break;
    case "icon":
      buttonStyles = "bg-transparent text-slate-900 hover:bg-gray-200";
      break;
    default:
      buttonStyles = "bg-gray-400/90 text-slate-900 hover:bg-gray-400";
  }

  return (
    <button
      className={`text-md font-semibold py-2 px-4 rounded-md flex gap-2 text-center justify-center ${buttonStyles} ${className || ""}`}
      onClick={onClick}
      style={style}
      title={title}
      aria-label={ariaLabel} // HTML etiketine yerleştirdik
    >
      {children}
    </button>
  );
}
