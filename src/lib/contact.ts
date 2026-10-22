import {
  INQUIRY_TYPES,
  PRODUCTS,
  type ContactFormContent,
} from "@/lib/constants";

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  product: string;
  eventDate: string;
  message: string;
  // Honeypot — real visitors never see or tick it.
  botcheck: boolean;
}

export const EMPTY_CONTACT_FORM: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  inquiryType: "",
  product: "",
  eventDate: "",
  message: "",
  botcheck: false,
};

// Max lengths, mirrored as maxLength on the inputs. Enforced again here
// because maxLength is trivially bypassed.
export const FIELD_LIMITS = {
  name: 80,
  email: 254,
  phone: 32,
  message: 2000,
} as const;

const MIN_MESSAGE_LENGTH = 10;

// Minimum time between page load and submit; faster than this is a bot.
export const MIN_FILL_TIME_MS = 3000;
// Client-side cooldown between successful sends.
export const SUBMIT_COOLDOWN_MS = 60_000;

export type ContactFieldErrors = Partial<
  Record<Exclude<keyof ContactFormValues, "botcheck">, string>
>;

// Strips markup and control characters so nothing the visitor types can be
// interpreted as HTML in the notification email. React already escapes
// everything it renders; this protects the downstream inbox.
function sanitizeText(value: string, maxLength: number, multiline = false): string {
  const withoutTags = value.replace(/<[^>]*>?/g, "").replace(/[<>]/g, "");
  const withoutControls = multiline
    ? withoutTags.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    : withoutTags.replace(/[\u0000-\u001F\u007F]/g, " ");
  const collapsed = multiline
    ? withoutControls.replace(/\r\n?/g, "\n").replace(/\n{3,}/g, "\n\n")
    : withoutControls.replace(/\s+/g, " ");
  return collapsed.trim().slice(0, maxLength);
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[0-9+().\-\s]{7,}$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isValidDate(value: string): boolean {
  if (!DATE_PATTERN.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

export function sanitizeContactForm(values: ContactFormValues): ContactFormValues {
  return {
    name: sanitizeText(values.name, FIELD_LIMITS.name),
    email: sanitizeText(values.email, FIELD_LIMITS.email).replace(/\s/g, "").toLowerCase(),
    phone: sanitizeText(values.phone, FIELD_LIMITS.phone),
    inquiryType: values.inquiryType.trim(),
    product: values.product.trim(),
    eventDate: values.eventDate.trim(),
    message: sanitizeText(values.message, FIELD_LIMITS.message, true),
    botcheck: values.botcheck,
  };
}

export function validateContactForm(
  values: ContactFormValues,
  messages: ContactFormContent["validation"],
): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  if (!values.name) errors.name = messages.name;
  if (!EMAIL_PATTERN.test(values.email)) errors.email = messages.email;
  if (values.phone && !PHONE_PATTERN.test(values.phone)) errors.phone = messages.phone;
  if (!INQUIRY_TYPES.some((option) => option.value === values.inquiryType)) {
    errors.inquiryType = messages.inquiryType;
  }
  if (values.product && !PRODUCTS.some((product) => product.slug === values.product)) {
    errors.product = messages.product;
  }
  if (values.eventDate && !isValidDate(values.eventDate)) errors.eventDate = messages.eventDate;
  if (values.message.length < MIN_MESSAGE_LENGTH) errors.message = messages.message;
  return errors;
}

const labelFor = (options: { value: string; label: string }[], value: string) =>
  options.find((option) => option.value === value)?.label ?? value;

// Posts the inquiry straight from the browser to Web3Forms, which emails it
// to the client's inbox. Deliberate exception to the agency "server-only form
// keys" rule: Web3Forms access keys are public by design (scoped to one
// recipient inbox), and their free plan doesn't support server-side posting.
// Expects values that already passed sanitizeContactForm + validateContactForm.
export async function submitContactForm(
  values: ContactFormValues,
  content: ContactFormContent,
): Promise<boolean> {
  // Honeypot tripped: report success so the bot moves on, but send nothing.
  if (values.botcheck) return true;

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  const endpoint = process.env.NEXT_PUBLIC_WEB3FORMS_ENDPOINT;
  if (!accessKey || !endpoint) return false;

  const { fields, notification } = content;
  const inquiryLabel = labelFor(INQUIRY_TYPES, values.inquiryType);
  const productName =
    PRODUCTS.find((product) => product.slug === values.product)?.name ?? "";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `${notification.subjectPrefix}: ${inquiryLabel} — ${values.name}`,
        from_name: notification.fromName,
        replyto: values.email,
        botcheck: false,
        // Human-readable keys become the row labels in the notification email.
        [fields.name.label]: values.name,
        [fields.email.label]: values.email,
        [fields.phone.label]: values.phone || "—",
        [fields.inquiryType.label]: inquiryLabel,
        [fields.product.label]: productName || fields.product.placeholder,
        [fields.eventDate.label]: values.eventDate || "—",
        [fields.message.label]: values.message,
      }),
    });
    const result: { success?: boolean } = await response.json();
    return response.ok && result.success === true;
  } catch {
    return false;
  }
}
