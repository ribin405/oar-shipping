"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";

import { FormField } from "@/components/forms/form-field";
import { Input } from "@/components/forms/input";
import { QuoteConfirmation } from "@/components/forms/quote-confirmation";
import { Select } from "@/components/forms/select";
import { Textarea } from "@/components/forms/textarea";
import { Button } from "@/components/ui/button";
import { quotePageContent } from "@/content/quote/page";
import { HONEYPOT_FIELD } from "@/lib/quote/honeypot";
import { submitQuote } from "@/lib/quote/submit-quote";
import { quoteSchema } from "@/lib/validation/quote";
import type { QuoteFormData } from "@/types/quote";

interface ServiceOption {
  value: string;
  label: string;
}

interface QuoteFormProps {
  serviceOptions: readonly ServiceOption[];
  /** Click-to-chat link for the verified WhatsApp number, when there is one. */
  whatsappHref?: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const { form: copy, failure } = quotePageContent;
const { fields } = copy;

/**
 * The quote request form: six fields on one screen and an optional vessel
 * block that stays folded until opened. Validates with Zod through React Hook
 * Form and hands the validated data to `submitQuote`. Nothing is stored or
 * sent from here.
 */
export function QuoteForm({ serviceOptions, whatsappHref }: QuoteFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>();
  const [vesselOpen, setVesselOpen] = useState(false);
  const confirmationRef = useRef<HTMLHeadingElement>(null);
  const [honeypot, setHoneypot] = useState("");
  const submittingRef = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setFocus,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { name: "", company: "", email: "", phone: "", details: "", vesselName: "", eta: "" },
  });

  useEffect(() => {
    if (status === "success") confirmationRef.current?.focus();
  }, [status]);

  const onSubmit = handleSubmit(
    async (data) => {
      setStatus("submitting");
      setErrorMessage(undefined);

      try {
        const result = await submitQuote({ ...data, [HONEYPOT_FIELD]: honeypot });

        if (result.success) {
          setStatus("success");
          return;
        }

        setStatus("error");
        if (result.code === "VALIDATION_ERROR") {
          const entries = Object.entries(result.fieldErrors) as [keyof QuoteFormData, string][];
          for (const [field, message] of entries) setError(field, { message });
          if (entries[0]) setFocus(entries[0][0]);
          setErrorMessage(failure.validation);
        } else {
          setErrorMessage(failure.generic);
        }
      } catch {
        setStatus("error");
        setErrorMessage(failure.generic);
      }
    },
    // A problem inside the folded vessel block would be invisible, so open it.
    (invalid) => {
      if (invalid.vesselName || invalid.eta) setVesselOpen(true);
    },
  );

  // A ref (not state) guards against a second submit landing before the first re-render.
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (submittingRef.current) {
      event.preventDefault();
      return;
    }
    submittingRef.current = true;
    try {
      await onSubmit(event);
    } finally {
      submittingRef.current = false;
    }
  };

  if (status === "success") {
    return (
      <QuoteConfirmation
        headingRef={confirmationRef}
        whatsappHref={whatsappHref}
        onReset={() => {
          reset();
          setVesselOpen(false);
          setStatus("idle");
        }}
      />
    );
  }

  return (
    <form onSubmit={handleFormSubmit} method="post" noValidate aria-label="Request a quote" className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label={fields.name.label} error={errors.name?.message}>
          {(control) => (
            <Input {...register("name")} {...control} placeholder={fields.name.placeholder} autoComplete="name" />
          )}
        </FormField>
        <FormField label={fields.company.label} error={errors.company?.message}>
          {(control) => (
            <Input
              {...register("company")}
              {...control}
              placeholder={fields.company.placeholder}
              autoComplete="organization"
            />
          )}
        </FormField>
        <FormField label={fields.email.label} error={errors.email?.message}>
          {(control) => (
            <Input
              {...register("email")}
              {...control}
              type="email"
              inputMode="email"
              placeholder={fields.email.placeholder}
              autoComplete="email"
            />
          )}
        </FormField>
        <FormField label={fields.phone.label} error={errors.phone?.message}>
          {(control) => (
            <Input
              {...register("phone")}
              {...control}
              type="tel"
              inputMode="tel"
              placeholder={fields.phone.placeholder}
              autoComplete="tel"
            />
          )}
        </FormField>
      </div>
      <p className="type-body-sm -mt-2 text-muted">{copy.replyHint}</p>

      <FormField label={fields.service.label} error={errors.service?.message}>
        {(control) => (
          <Select {...register("service")} {...control} defaultValue="">
            <option value="">
              {fields.service.placeholder}
            </option>
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        )}
      </FormField>

      <FormField label={fields.details.label} error={errors.details?.message}>
        {(control) => <Textarea {...register("details")} {...control} placeholder={fields.details.placeholder} />}
      </FormField>

      <details
        className="quote-optional"
        open={vesselOpen}
        onToggle={(event) => setVesselOpen(event.currentTarget.open)}
      >
        <summary>
          {copy.vesselSummary} <span className="type-body-sm text-muted">{copy.vesselOptional}</span>
        </summary>
        <div className="grid gap-5 pt-4 sm:grid-cols-2">
          <FormField label={fields.vesselName.label} error={errors.vesselName?.message}>
            {(control) => (
              <Input {...register("vesselName")} {...control} placeholder={fields.vesselName.placeholder} autoComplete="off" />
            )}
          </FormField>
          <FormField label={fields.eta.label} error={errors.eta?.message}>
            {(control) => <Input {...register("eta")} {...control} type="date" />}
          </FormField>
        </div>
      </details>

      <div aria-hidden="true" inert className="sr-only">
        <label>
          Leave this field empty
          <input
            type="text"
            name={HONEYPOT_FIELD}
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </label>
      </div>

      {status === "error" && errorMessage ? (
        <p role="alert" className="type-body rounded-md border border-error px-4 py-3 text-error">
          {errorMessage}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button type="submit" size="lg" loading={status === "submitting"} className="w-full sm:w-auto">
          {copy.submitLabel}
        </Button>
        {whatsappHref ? (
          <a href={whatsappHref} className="type-body text-link underline underline-offset-4">
            {copy.whatsappAlternative}
          </a>
        ) : null}
      </div>
    </form>
  );
}
