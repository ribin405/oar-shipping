import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "dark";
type ButtonSize = "md" | "lg";

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors duration-200 ease-standard " +
  "[&_svg]:size-[1.125em] [&_svg]:shrink-0 " +
  "aria-disabled:pointer-events-none aria-disabled:opacity-50 disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover active:bg-deep-navy",
  /* Surface-aware: reads as a bordered button on light and a dark command button on dark. */
  secondary: "border border-border bg-card text-foreground hover:border-muted hover:bg-foreground/5",
  ghost: "text-foreground hover:bg-foreground/8 active:bg-foreground/12",
  /* Always Deep Navy; for emphasis on light surfaces. */
  dark: "border border-white/14 bg-deep-navy text-white hover:bg-primary active:bg-midnight",
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "type-body h-10 px-4",
  lg: "type-body-lg h-12 px-6",
};

export function buttonStyles({ variant = "primary", size = "md", fullWidth = false }: ButtonStyleOptions = {}): string {
  return cn(baseStyles, variantStyles[variant], sizeStyles[size], fullWidth && "w-full");
}

interface ButtonLinkProps extends ButtonStyleOptions {
  href: string;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({ href, variant, size, fullWidth, className, children }: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(buttonStyles({ variant, size, fullWidth }), className)}>
      {children}
    </Link>
  );
}

interface ButtonProps extends ButtonStyleOptions, ComponentProps<"button"> {
  /** Shows a spinner and blocks interaction while keeping the button focusable context intact. */
  loading?: boolean;
}

export function Button({
  variant,
  size,
  fullWidth,
  loading = false,
  className,
  type = "button",
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(buttonStyles({ variant, size, fullWidth }), className)}
      {...props}
    >
      {loading ? <LoaderCircle aria-hidden="true" className="motion-safe:animate-spin" /> : null}
      {children}
    </button>
  );
}
