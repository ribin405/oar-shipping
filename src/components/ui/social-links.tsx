import type { ReactElement, SVGProps } from "react";

import { cn } from "@/lib/utils";

type IconProps = SVGProps<SVGSVGElement>;

const base = { viewBox: "0 0 24 24", "aria-hidden": true, focusable: false } as const;

function FacebookIcon(props: IconProps) {
  return (
    <svg {...base} fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.52l.48-3h-3V8.6c0-.87.3-1.6 1.62-1.6H16.6V4.3A17 17 0 0 0 14.3 4.2c-2.3 0-3.8 1.4-3.8 3.9v2.4H8v3h2.5V21h3Z" />
    </svg>
  );
}

function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon(props: IconProps) {
  return (
    <svg {...base} fill="currentColor" {...props}>
      <path d="M5.2 9.2h3v9.6h-3V9.2ZM6.7 4.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5ZM10.1 9.2H13v1.3h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6v5.26h-3v-4.66c0-1.1-.02-2.54-1.55-2.54-1.55 0-1.79 1.2-1.79 2.46v4.74h-3V9.2Z" />
    </svg>
  );
}

function YouTubeIcon(props: IconProps) {
  return (
    <svg {...base} fill="currentColor" {...props}>
      <path d="M21.6 7.7a2.5 2.5 0 0 0-1.76-1.77C18.3 5.5 12 5.5 12 5.5s-6.3 0-7.84.43A2.5 2.5 0 0 0 2.4 7.7C2 9.25 2 12 2 12s0 2.75.4 4.3a2.5 2.5 0 0 0 1.76 1.77c1.54.43 7.84.43 7.84.43s6.3 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77C22 14.75 22 12 22 12s0-2.75-.4-4.3ZM10 15V9l5.2 3L10 15Z" />
    </svg>
  );
}

const icons: Record<string, (props: IconProps) => ReactElement> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
};

interface SocialLinksProps {
  profiles: readonly { label: string; url: string }[] | undefined;
  className?: string;
}

/** Round, icon-only links to Oar's verified social profiles. Renders nothing when there are none. */
export function SocialLinks({ profiles, className }: SocialLinksProps) {
  const items = (profiles ?? []).filter(({ label }) => icons[label.toLowerCase()]);
  if (items.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap items-center gap-3", className)}>
      {items.map(({ label, url }) => {
        const Icon = icons[label.toLowerCase()];
        return (
          <li key={label}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Oar Shipping on ${label} (opens in a new tab)`}
              title={label}
              className="group flex size-11 items-center justify-center rounded-full border border-border bg-card text-link shadow-sm transition-all duration-200 ease-standard hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              <Icon className="size-5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
