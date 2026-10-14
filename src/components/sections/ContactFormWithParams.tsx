"use client"; // reads ?inquiry= / ?product= / ?package= deep-link params

import { useSearchParams } from "next/navigation";
import { ContactForm } from "@/components/sections/ContactForm";
import type { ContactFormContent } from "@/lib/constants";

interface ContactFormWithParamsProps {
  content: ContactFormContent;
}

// Must render inside <Suspense>: search params are request-time data, so the
// static shell shows the un-prefilled form until this resolves.
export function ContactFormWithParams({ content }: ContactFormWithParamsProps) {
  const searchParams = useSearchParams();
  const inquiry = searchParams.get("inquiry");
  const product = searchParams.get("product");
  const packageSlug = searchParams.get("package");

  return (
    <ContactForm
      key={`${inquiry ?? ""}:${product ?? ""}:${packageSlug ?? ""}`}
      content={content}
      initialInquiry={inquiry}
      initialProduct={product}
      initialPackage={packageSlug}
    />
  );
}
