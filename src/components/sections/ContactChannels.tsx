import { Mail, Phone, type LucideIcon } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import type { ContactChannel } from "@/lib/constants";

interface ContactChannelsProps {
  heading: string;
  channels: ContactChannel[];
}

const CHANNEL_ICONS: Record<ContactChannel["id"], LucideIcon | ComponentType<SVGProps<SVGSVGElement>>> = {
  phone: Phone,
  email: Mail,
  instagram: InstagramIcon,
};

export function ContactChannels({ heading, channels }: ContactChannelsProps) {
  return (
    <div>
      <h2 className="font-display text-3xl font-semibold text-espresso-900">{heading}</h2>
      <ul className="mt-6 flex flex-col gap-4">
        {channels.map((channel) => {
          const Icon = CHANNEL_ICONS[channel.id];
          return (
            <li key={channel.id}>
              <a
                href={channel.href}
                {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-start gap-4 rounded-2xl border border-blush-200 bg-surface p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-rose-300 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blush-100 transition-colors group-hover:bg-rose-600">
                  <Icon className="size-5 text-rose-600 transition-colors group-hover:text-white" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">
                    {channel.label}
                  </span>
                  {/* lining-nums: Cormorant's default old-style figures make
                      phone numbers look uneven. */}
                  <span className="mt-1 block break-all font-display text-xl font-semibold lining-nums text-espresso-900">
                    {channel.value}
                  </span>
                  <span className="mt-1 block text-sm text-muted">{channel.description}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
