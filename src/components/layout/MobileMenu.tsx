"use client"; // drawer open state, scroll lock, and Framer Motion transitions

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Menu, Phone, X } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { HEADER_CTA, NAV_LINKS, SITE } from "@/lib/constants";

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0 },
};

const ICON_BUTTON =
  "inline-flex size-11 items-center justify-center rounded-pill text-espresso-700 transition-colors hover:bg-blush-100 hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600";

const CONTACT_LINK =
  "inline-flex min-h-11 items-center gap-2.5 transition-colors hover:text-rose-600";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const close = () => setIsOpen(false);

  // Lock page scroll, focus the close button, and allow Escape to dismiss
  // while the drawer is open.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        className={ICON_BUTTON}
      >
        <Menu className="size-6" strokeWidth={1.75} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-50 bg-espresso-900/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={close}
              aria-hidden="true"
            />

            <motion.div
              key="drawer"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="fixed inset-y-0 right-0 z-50 isolate flex w-[85%] max-w-sm flex-col overflow-y-auto bg-cream-50 shadow-lift"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              {/* Faint leopard wash — its own layer so it never fights the
                  drawer's fixed positioning. */}
              <div
                aria-hidden="true"
                className="bg-leopard pointer-events-none absolute inset-0 -z-10 opacity-25"
              />

              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <BrandMark onClick={close} />
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={close}
                  aria-label="Close menu"
                  className={ICON_BUTTON}
                >
                  <X className="size-6" strokeWidth={1.75} />
                </button>
              </div>

              <motion.nav
                aria-label="Mobile"
                className="flex-1 px-6 py-8"
                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                <ul className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.li key={link.href} variants={itemVariants}>
                        <Link
                          href={link.href}
                          onClick={close}
                          aria-current={isActive ? "page" : undefined}
                          className={`flex min-h-12 items-center rounded-2xl px-4 font-display text-2xl transition-colors hover:bg-blush-100 hover:text-rose-600 ${
                            isActive
                              ? "bg-blush-100 text-rose-600"
                              : "text-espresso-900"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                <motion.div variants={itemVariants} className="mt-8">
                  <ButtonLink href={HEADER_CTA.href} width="full" onClick={close}>
                    {HEADER_CTA.label}
                  </ButtonLink>
                </motion.div>
              </motion.nav>

              <div className="border-t border-border bg-blush-50/80 px-6 py-5">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-espresso-400">
                  Get in touch
                </p>
                <ul className="mt-1 flex flex-col text-sm text-espresso-700">
                  <li>
                    <a href={`tel:${SITE.phoneTel}`} className={CONTACT_LINK}>
                      <Phone className="size-4 text-rose-500" aria-hidden="true" />
                      {SITE.phone}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${SITE.email}`} className={`${CONTACT_LINK} break-all`}>
                      <Mail className="size-4 shrink-0 text-rose-500" aria-hidden="true" />
                      {SITE.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={SITE.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={CONTACT_LINK}
                    >
                      <InstagramIcon className="size-4 text-rose-500" />
                      {SITE.instagram.handle}
                    </a>
                  </li>
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
