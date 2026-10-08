"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
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

type FormStatus = "idle" | "submitting" | "success" | "error";

const { form: copy, failure } = quotePageContent;
const { fields } = copy;

function FormGroup({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-5 border-t border-border pt-6">
      <legend className="type-h4 float-left mb-1 w-full text-foreground">{legend}</legend>
      <div className="grid w-full gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

/**
 * Quote request form. Validates with Zod through React Hook Form and hands the
 * validated data to `submitQuote`. Nothing is stored or sent from here.
 */
export function QuoteForm({ serviceOptions }: { serviceOptions: readonly ServiceOption[] }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>();
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
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      country: "",
      cargoType: "",
      pickupLocation: "",
      deliveryPort: "",
      vesselName: "",
      eta: "",
      cargoDetails: "",
      requiredDeliveryDate: "",
      additionalRequirements: "",
    },
  });

  useEffect(() => {
    if (status === "success") confirmationRef.current?.focus();
  }, [status]);

  const onSubmit = handleSubmit(async (data) => {
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
  });

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
        onReset={() => {
          reset();
          setStatus("idle");
        }}
      />
    );
  }

  return (
    <form onSubmit={handleFormSubmit} method="post" noValidate aria-label="Request a quote" className="flex flex-col gap-8">
      <p className="type-body text-muted">{copy.requiredNote}</p>

      <FormGroup legend={copy.groups.contact}>
        <FormField label={fields.name.label} error={errors.name?.message} required>
          {(control) => (
            <Input {...register("name")} {...control} placeholder={fields.name.placeholder} autoComplete="name" />
          )}
        </FormField>
        <FormField label={fields.company.label} error={errors.company?.message} required>
          {(control) => (
            <Input
              {...register("company")}
              {...control}
              placeholder={fields.company.placeholder}
              autoComplete="organization"
            />
          )}
        </FormField>
        <FormField label={fields.email.label} error={errors.email?.message} required>
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
        <FormField label={fields.phone.label} error={errors.phone?.message} required>
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
        <FormField label={fields.country.label} error={errors.country?.message} required>
          {(control) => (
            <Input
              {...register("country")}
              {...control}
              placeholder={fields.country.placeholder}
              autoComplete="country-name"
            />
          )}
        </FormField>
      </FormGroup>

      <FormGroup legend={copy.groups.requirement}>
        <FormField label={fields.service.label} error={errors.service?.message} required>
          {(control) => (
            <Select {...register("service")} {...control} defaultValue="">
              <option value="" disabled>
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
        <FormField label={fields.cargoType.label} error={errors.cargoType?.message} required>
          {(control) => <Input {...register("cargoType")} {...control} placeholder={fields.cargoType.placeholder} />}
        </FormField>
        <div className="sm:col-span-2">
          <FormField
            label={fields.cargoDetails.label}
            helperText={fields.cargoDetails.helper}
            error={errors.cargoDetails?.message}
          >
            {(control) => (
              <Textarea {...register("cargoDetails")} {...control} placeholder={fields.cargoDetails.placeholder} />
            )}
          </FormField>
        </div>
      </FormGroup>

      <FormGroup legend={copy.groups.movement}>
        <FormField label={fields.pickupLocation.label} error={errors.pickupLocation?.message} required>
          {(control) => (
            <Input {...register("pickupLocation")} {...control} placeholder={fields.pickupLocation.placeholder} />
          )}
        </FormField>
        <FormField label={fields.deliveryPort.label} error={errors.deliveryPort?.message} required>
          {(control) => (
            <Input {...register("deliveryPort")} {...control} placeholder={fields.deliveryPort.placeholder} />
          )}
        </FormField>
        <FormField label={fields.vesselName.label} error={errors.vesselName?.message} required>
          {(control) => <Input {...register("vesselName")} {...control} placeholder={fields.vesselName.placeholder} />}
        </FormField>
        <FormField label={fields.eta.label} helperText={fields.eta.helper} error={errors.eta?.message}>
          {(control) => <Input {...register("eta")} {...control} type="datetime-local" />}
        </FormField>
        <FormField
          label={fields.requiredDeliveryDate.label}
          helperText={fields.requiredDeliveryDate.helper}
          error={errors.requiredDeliveryDate?.message}
        >
          {(control) => <Input {...register("requiredDeliveryDate")} {...control} type="date" />}
        </FormField>
      </FormGroup>

      <FormGroup legend={copy.groups.additional}>
        <div className="sm:col-span-2">
          <FormField label={fields.additionalRequirements.label} error={errors.additionalRequirements?.message}>
            {(control) => (
              <Textarea
                {...register("additionalRequirements")}
                {...control}
                placeholder={fields.additionalRequirements.placeholder}
              />
            )}
          </FormField>
        </div>
      </FormGroup>

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

      <Button type="submit" size="lg" loading={status === "submitting"} className="w-full sm:w-auto sm:self-start">
        {copy.submitLabel}
      </Button>
    </form>
  );
}
