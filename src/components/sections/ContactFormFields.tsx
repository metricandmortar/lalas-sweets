import type { ReactNode } from "react";
import { PRODUCTS, type ContactFormContent } from "@/lib/constants";
import {
  FIELD_LIMITS,
  type ContactFieldErrors,
  type ContactFormValues,
} from "@/lib/contact";

interface ContactFormFieldsProps {
  content: ContactFormContent;
  values: ContactFormValues;
  errors: ContactFieldErrors;
  onChange: <K extends keyof ContactFormValues>(field: K, value: ContactFormValues[K]) => void;
  disabled: boolean;
}

const CONTROL =
  "mt-2 block min-h-12 w-full rounded-xl border border-blush-200 bg-cream-50 px-4 py-3 text-base text-espresso-900 placeholder:text-espresso-300 transition-colors hover:border-rose-300 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-300/60 disabled:opacity-60 aria-invalid:border-rose-600 aria-invalid:bg-blush-50";

interface FieldProps {
  id: string;
  label: string;
  optionalLabel?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

function Field({ id, label, optionalLabel, error, className = "", children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-semibold text-espresso-700">
        {label}
        {optionalLabel && (
          <span className="ml-1 font-normal text-espresso-400">{optionalLabel}</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-rose-700">
          {error}
        </p>
      )}
    </div>
  );
}

// Wires an input to its error message for assistive tech.
const errorProps = (id: string, error?: string) =>
  error ? { "aria-invalid": true, "aria-describedby": `${id}-error` } : {};

export function ContactFormFields({ content, values, errors, onChange, disabled }: ContactFormFieldsProps) {
  const { fields, optionalLabel } = content;

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field id="contact-name" label={fields.name.label} error={errors.name}>
        <input id="contact-name" name="name" type="text" autoComplete="name" required
          maxLength={FIELD_LIMITS.name} {...errorProps("contact-name", errors.name)}
          disabled={disabled} placeholder={fields.name.placeholder} className={CONTROL}
          value={values.name} onChange={(event) => onChange("name", event.target.value)} />
      </Field>

      <Field id="contact-email" label={fields.email.label} error={errors.email}>
        <input id="contact-email" name="email" type="email" autoComplete="email" required
          maxLength={FIELD_LIMITS.email} {...errorProps("contact-email", errors.email)}
          disabled={disabled} placeholder={fields.email.placeholder} className={CONTROL}
          value={values.email} onChange={(event) => onChange("email", event.target.value)} />
      </Field>

      <Field id="contact-phone" label={fields.phone.label} optionalLabel={optionalLabel} error={errors.phone}>
        <input id="contact-phone" name="phone" type="tel" autoComplete="tel"
          maxLength={FIELD_LIMITS.phone} {...errorProps("contact-phone", errors.phone)}
          disabled={disabled} placeholder={fields.phone.placeholder} className={CONTROL}
          value={values.phone} onChange={(event) => onChange("phone", event.target.value)} />
      </Field>

      <Field id="contact-inquiry" label={fields.inquiryType.label} error={errors.inquiryType}>
        <select id="contact-inquiry" name="inquiryType" required disabled={disabled}
          {...errorProps("contact-inquiry", errors.inquiryType)}
          className={CONTROL} value={values.inquiryType}
          onChange={(event) => onChange("inquiryType", event.target.value)}>
          <option value="" disabled>—</option>
          {fields.inquiryType.options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </Field>

      <Field id="contact-product" label={fields.product.label} optionalLabel={optionalLabel} error={errors.product}>
        <select id="contact-product" name="product" disabled={disabled} className={CONTROL}
          {...errorProps("contact-product", errors.product)}
          value={values.product} onChange={(event) => onChange("product", event.target.value)}>
          <option value="">{fields.product.placeholder}</option>
          {PRODUCTS.map((product) => (
            <option key={product.slug} value={product.slug}>{product.name}</option>
          ))}
        </select>
      </Field>

      <Field id="contact-date" label={fields.eventDate.label} optionalLabel={optionalLabel} error={errors.eventDate}>
        <input id="contact-date" name="eventDate" type="date" disabled={disabled}
          {...errorProps("contact-date", errors.eventDate)}
          className={CONTROL} value={values.eventDate}
          onChange={(event) => onChange("eventDate", event.target.value)} />
      </Field>

      <Field id="contact-message" label={fields.message.label} error={errors.message} className="sm:col-span-2">
        <textarea id="contact-message" name="message" required rows={5} disabled={disabled}
          maxLength={FIELD_LIMITS.message} {...errorProps("contact-message", errors.message)}
          placeholder={fields.message.placeholder} className={`${CONTROL} resize-y`}
          value={values.message} onChange={(event) => onChange("message", event.target.value)} />
      </Field>

      {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
      <input type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true" autoComplete="off"
        className="hidden" checked={values.botcheck}
        onChange={(event) => onChange("botcheck", event.target.checked)} />
    </div>
  );
}
