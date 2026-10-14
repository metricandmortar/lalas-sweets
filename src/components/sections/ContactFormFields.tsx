import type { ReactNode } from "react";
import { PRODUCTS, type ContactFormContent } from "@/lib/constants";
import type { ContactFormValues } from "@/lib/contact";

interface ContactFormFieldsProps {
  content: ContactFormContent;
  values: ContactFormValues;
  onChange: <K extends keyof ContactFormValues>(field: K, value: ContactFormValues[K]) => void;
  disabled: boolean;
}

const CONTROL =
  "mt-2 block min-h-12 w-full rounded-xl border border-blush-200 bg-cream-50 px-4 py-3 text-base text-espresso-900 placeholder:text-espresso-300 transition-colors hover:border-rose-300 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-300/60 disabled:opacity-60";

interface FieldProps {
  id: string;
  label: string;
  optionalLabel?: string;
  className?: string;
  children: ReactNode;
}

function Field({ id, label, optionalLabel, className = "", children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-semibold text-espresso-700">
        {label}
        {optionalLabel && (
          <span className="ml-1 font-normal text-espresso-400">{optionalLabel}</span>
        )}
      </label>
      {children}
    </div>
  );
}

export function ContactFormFields({ content, values, onChange, disabled }: ContactFormFieldsProps) {
  const { fields, optionalLabel } = content;

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field id="contact-name" label={fields.name.label}>
        <input id="contact-name" name="name" type="text" autoComplete="name" required
          disabled={disabled} placeholder={fields.name.placeholder} className={CONTROL}
          value={values.name} onChange={(event) => onChange("name", event.target.value)} />
      </Field>

      <Field id="contact-email" label={fields.email.label}>
        <input id="contact-email" name="email" type="email" autoComplete="email" required
          disabled={disabled} placeholder={fields.email.placeholder} className={CONTROL}
          value={values.email} onChange={(event) => onChange("email", event.target.value)} />
      </Field>

      <Field id="contact-phone" label={fields.phone.label} optionalLabel={optionalLabel}>
        <input id="contact-phone" name="phone" type="tel" autoComplete="tel"
          disabled={disabled} placeholder={fields.phone.placeholder} className={CONTROL}
          value={values.phone} onChange={(event) => onChange("phone", event.target.value)} />
      </Field>

      <Field id="contact-inquiry" label={fields.inquiryType.label}>
        <select id="contact-inquiry" name="inquiryType" required disabled={disabled}
          className={CONTROL} value={values.inquiryType}
          onChange={(event) => onChange("inquiryType", event.target.value)}>
          <option value="" disabled>—</option>
          {fields.inquiryType.options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </Field>

      <Field id="contact-product" label={fields.product.label} optionalLabel={optionalLabel}>
        <select id="contact-product" name="product" disabled={disabled} className={CONTROL}
          value={values.product} onChange={(event) => onChange("product", event.target.value)}>
          <option value="">{fields.product.placeholder}</option>
          {PRODUCTS.map((product) => (
            <option key={product.slug} value={product.slug}>{product.name}</option>
          ))}
        </select>
      </Field>

      <Field id="contact-date" label={fields.eventDate.label} optionalLabel={optionalLabel}>
        <input id="contact-date" name="eventDate" type="date" disabled={disabled}
          className={CONTROL} value={values.eventDate}
          onChange={(event) => onChange("eventDate", event.target.value)} />
      </Field>

      <Field id="contact-message" label={fields.message.label} className="sm:col-span-2">
        <textarea id="contact-message" name="message" required rows={5} disabled={disabled}
          placeholder={fields.message.placeholder} className={`${CONTROL} resize-y`}
          value={values.message} onChange={(event) => onChange("message", event.target.value)} />
      </Field>

      {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
      <input type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true"
        className="hidden" checked={values.botcheck}
        onChange={(event) => onChange("botcheck", event.target.checked)} />
    </div>
  );
}
