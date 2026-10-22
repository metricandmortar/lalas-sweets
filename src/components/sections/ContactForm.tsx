"use client"; // owns form state, submission, and success/error UI

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { ContactFormFields } from "@/components/sections/ContactFormFields";
import {
  BUTTON_HOVER,
  BUTTON_SPRING,
  BUTTON_TAP,
  buttonClassName,
} from "@/components/ui/ButtonLink";
import {
  CATERING_PAGE_CONTENT,
  INQUIRY_TYPES,
  PRODUCTS,
  type ContactFormContent,
} from "@/lib/constants";
import {
  EMPTY_CONTACT_FORM,
  MIN_FILL_TIME_MS,
  SUBMIT_COOLDOWN_MS,
  sanitizeContactForm,
  submitContactForm,
  validateContactForm,
  type ContactFieldErrors,
  type ContactFormValues,
} from "@/lib/contact";

interface ContactFormProps {
  content: ContactFormContent;
  // Raw ?inquiry= / ?product= / ?package= values from deep links; validated
  // below so arbitrary query strings can't inject options or copy.
  initialInquiry?: string | null;
  initialProduct?: string | null;
  initialPackage?: string | null;
}

type Status = "idle" | "sending" | "success" | "error";

// sessionStorage key for the last successful send, so the cooldown survives
// a reload within the same tab.
const LAST_SENT_KEY = "lalas-sweets:inquiry-sent-at";

function readLastSent(): number {
  try {
    return Number(window.sessionStorage.getItem(LAST_SENT_KEY)) || 0;
  } catch {
    return 0;
  }
}

function writeLastSent(timestamp: number) {
  try {
    window.sessionStorage.setItem(LAST_SENT_KEY, String(timestamp));
  } catch {
    // Storage blocked (private mode, etc.) — the in-memory cooldown still applies.
  }
}

function initialValues(
  content: ContactFormContent,
  inquiry?: string | null,
  product?: string | null,
  packageSlug?: string | null,
): ContactFormValues {
  const validProduct = PRODUCTS.find((item) => item.slug === product)?.slug ?? "";
  const cateringPackage = CATERING_PAGE_CONTENT.packages.items.find(
    (item) => item.slug === packageSlug,
  );
  const validInquiry = INQUIRY_TYPES.some((item) => item.value === inquiry)
    ? inquiry!
    : cateringPackage
      ? "catering"
      : validProduct
        ? "order"
        : "";
  const message = cateringPackage
    ? `${content.packageMessageTemplate.replace("{package}", cateringPackage.name)}\n\n`
    : "";

  return { ...EMPTY_CONTACT_FORM, inquiryType: validInquiry, product: validProduct, message };
}

export function ContactForm({
  content,
  initialInquiry,
  initialProduct,
  initialPackage,
}: ContactFormProps) {
  const [values, setValues] = useState(() =>
    initialValues(content, initialInquiry, initialProduct, initialPackage),
  );
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [notice, setNotice] = useState<string | null>(null);
  const mountedAt = useRef(0);
  const lastSentAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
    lastSentAt.current = readLastSent();
  }, []);

  const updateField = <K extends keyof ContactFormValues>(field: K, value: ContactFormValues[K]) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    if (field in errors) {
      setErrors((previous) => ({ ...previous, [field]: undefined }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    setNotice(null);

    const now = Date.now();
    const cooldownLeft = lastSentAt.current + SUBMIT_COOLDOWN_MS - now;
    if (cooldownLeft > 0) {
      setNotice(
        content.rateLimit.cooldown.replace("{seconds}", String(Math.ceil(cooldownLeft / 1000))),
      );
      return;
    }
    if (now - mountedAt.current < MIN_FILL_TIME_MS) {
      setNotice(content.rateLimit.tooFast);
      return;
    }

    const clean = sanitizeContactForm(values);
    const fieldErrors = validateContactForm(clean, content.validation);
    if (Object.keys(fieldErrors).length > 0) {
      setValues(clean);
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("sending");
    const ok = await submitContactForm(clean, content);
    if (ok) {
      lastSentAt.current = Date.now();
      writeLastSent(lastSentAt.current);
    }
    setStatus(ok ? "success" : "error");
  };

  const handleReset = () => {
    setValues(EMPTY_CONTACT_FORM);
    setErrors({});
    setNotice(null);
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-center gap-4 py-10 text-center">
        <CheckCircle2 className="size-14 text-rose-600" strokeWidth={1.5} aria-hidden="true" />
        <h3 className="font-display text-3xl font-semibold text-espresso-900">
          {content.success.heading}
        </h3>
        <p className="max-w-md leading-relaxed text-muted">{content.success.description}</p>
        <button
          type="button"
          onClick={handleReset}
          className={buttonClassName("secondary", "sm", "auto", "mt-2")}
        >
          {content.success.resetLabel}
        </button>
      </div>
    );
  }

  const isSending = status === "sending";
  const selectedProduct = PRODUCTS.find((item) => item.slug === values.product);
  const hasFieldErrors = Object.values(errors).some(Boolean);

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Confirms the item the visitor clicked "Inquire" on, and updates
          live if they change the "Interested in" selection. The name wraps
          rather than truncates — the whole point is confirming the item. */}
      {selectedProduct && (
        <div className="mb-6 flex items-center gap-4 rounded-2xl border border-blush-200 bg-blush-50 p-3 pr-5">
          <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-blush-100">
            <Image
              src={selectedProduct.image.src}
              alt=""
              fill
              sizes="56px"
              className="object-cover"
            />
          </span>
          <span className="min-w-0">
            <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">
              {content.selectedProductLabel}
            </span>
            <span className="mt-0.5 block font-display text-xl font-semibold leading-tight text-espresso-900">
              {selectedProduct.name}
            </span>
            {selectedProduct.orderNote && (
              <span className="mt-1 block text-xs text-espresso-700">{selectedProduct.orderNote}</span>
            )}
          </span>
        </div>
      )}

      <ContactFormFields
        content={content}
        values={values}
        errors={errors}
        onChange={updateField}
        disabled={isSending}
      />

      {hasFieldErrors && (
        <p role="alert" className="mt-6 flex gap-3 rounded-2xl border border-rose-300 bg-blush-100 p-4 text-sm font-semibold text-espresso-900">
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-rose-700" aria-hidden="true" />
          {content.validation.heading}
        </p>
      )}

      {notice && (
        <p role="status" className="mt-6 flex gap-3 rounded-2xl border border-blush-200 bg-blush-50 p-4 text-sm text-espresso-700">
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-rose-600" aria-hidden="true" />
          {notice}
        </p>
      )}

      {status === "error" && (
        <div role="alert" className="mt-6 flex gap-3 rounded-2xl border border-rose-300 bg-blush-100 p-4 text-sm text-espresso-900">
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-rose-700" aria-hidden="true" />
          <div>
            <p className="font-semibold">{content.error.heading}</p>
            <p className="mt-1 text-espresso-700 lining-nums">{content.error.description}</p>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-espresso-400 sm:max-w-xs">
          {content.privacyNote.text}{" "}
          <Link href={content.privacyNote.href} className="font-semibold text-rose-700 underline underline-offset-2 hover:text-rose-800">
            {content.privacyNote.linkLabel}
          </Link>
          .
        </p>
        <motion.button
          type="submit"
          disabled={isSending}
          whileHover={isSending ? undefined : BUTTON_HOVER}
          whileTap={isSending ? undefined : BUTTON_TAP}
          transition={BUTTON_SPRING}
          className={buttonClassName("primary", "md", "responsive")}
        >
          {isSending ? content.sendingLabel : content.submitLabel}
          <Send className="size-4" aria-hidden="true" />
        </motion.button>
      </div>
    </form>
  );
}
