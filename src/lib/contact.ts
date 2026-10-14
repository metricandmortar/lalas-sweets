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
  // Web3Forms honeypot — real visitors never see or tick it.
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

const labelFor = (options: { value: string; label: string }[], value: string) =>
  options.find((option) => option.value === value)?.label ?? value;

// Posts the inquiry straight from the browser to Web3Forms, which emails it
// to the client's inbox. Deliberate exception to the agency "server-only form
// keys" rule: Web3Forms access keys are public by design (scoped to one
// recipient inbox), and their free plan doesn't support server-side posting.
export async function submitContactForm(
  values: ContactFormValues,
  content: ContactFormContent,
): Promise<boolean> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  const endpoint = process.env.NEXT_PUBLIC_WEB3FORMS_ENDPOINT;
  if (!accessKey || !endpoint) {
    console.error(
      "Contact form: NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY or NEXT_PUBLIC_WEB3FORMS_ENDPOINT is not set.",
    );
    return false;
  }

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
        botcheck: values.botcheck,
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
