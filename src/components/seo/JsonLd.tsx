interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

// Renders schema.org structured data. Native <script> (not next/script) per
// the Next.js JSON-LD guide; "<" is escaped to prevent script-tag injection.
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
