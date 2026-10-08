import { useId, type ReactNode } from "react";

import { Label } from "@/components/forms/label";

export interface FieldControlProps {
  id: string;
  required: boolean;
  "aria-describedby": string | undefined;
  "aria-invalid": true | undefined;
}

interface FormFieldProps {
  label: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  /** Receives the accessibility props to spread onto the control. */
  children: (controlProps: FieldControlProps) => ReactNode;
}

/** Label, control, helper text and error message wired together for assistive technology. */
export function FormField({ label, helperText, error, required = false, children }: FormFieldProps) {
  const id = useId();
  const messageId = `${id}-message`;
  const message = error ?? helperText;

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {children({
        id,
        required,
        "aria-describedby": message ? messageId : undefined,
        "aria-invalid": error ? true : undefined,
      })}
      {message ? (
        <p id={messageId} className={error ? "type-body-sm text-error" : "type-body-sm text-muted"}>
          {message}
        </p>
      ) : null}
    </div>
  );
}
