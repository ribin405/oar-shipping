import { useId, type InputHTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "id"> {
  label: ReactNode;
  helperText?: string;
  error?: string;
}

export function Checkbox({ label, helperText, error, className, ...props }: CheckboxProps) {
  const id = useId();
  const messageId = `${id}-message`;
  const message = error ?? helperText;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className={cn(
            "mt-0.5 size-4 shrink-0 appearance-none rounded-sm border border-control bg-white bg-center bg-no-repeat transition-colors duration-200 ease-standard",
            "checked:border-marine-blue checked:bg-marine-blue checked:bg-[image:var(--checkbox-mark)]",
            "aria-invalid:border-error disabled:cursor-not-allowed disabled:bg-off-white",
            className,
          )}
          {...props}
        />
        <label htmlFor={id} className="type-body-lg text-foreground">
          {label}
        </label>
      </div>
      {message ? (
        <p id={messageId} className={cn("type-body-sm pl-7", error ? "text-error" : "text-muted")}>
          {message}
        </p>
      ) : null}
    </div>
  );
}
