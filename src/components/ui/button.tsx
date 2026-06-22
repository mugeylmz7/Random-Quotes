import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";
import { text } from "stream/consumers";

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // "Create Quote" gibi ana aksiyonlar için:
        default:
          "bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:scale-105 hover:shadow-lg dark:hover:shadow-blue-950/50",

        // "Clear" veya diğer ikincil butonlar için:
        outline:
          "active:scale-95 bg-gray-200 hover:bg-slate-100 text-gray-800 hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-black/40 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400",

        // "Home, Logout" gibi menü linkleri için:
        ghost:
          "hover:bg-slate-100 hover:text-blue-600 hover:scale-105 hover:shadow-md dark:hover:bg-slate-800 dark:hover:text-blue-400",
        secondary:
          "bg-blue-200 dark:bg-slate-800 text-slate-700 hover:text-white hover:bg-blue-400 dark:hover:bg-blue-950/50, hover:scale-105 transition-all duration-200 hover:shadow-lg dark:hover:shadow-black/40 hover:border-slate-400 dark:hover:border-slate-600",
        // "Delete" gibi tehlikeli aksiyonlar için:
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors hover:bg-red-600 hover:scale-105 hover:shadow-md dark:hover:bg-red-600",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
        icon: "hover:scale-110 hover:text-red-500 hover:shadow-md transition-all duration-200 dark:hover:text-red-400",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
