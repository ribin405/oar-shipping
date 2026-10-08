import type { ContactChannel } from "@/lib/contact";
import { cn } from "@/lib/utils";

interface ContactChannelListProps {
  channels: readonly ContactChannel[];
  /** Show each channel's label. When hidden it is still available to screen readers. */
  showLabels?: boolean;
  className?: string;
}

/** Verified contact channels as a list. Renders nothing for an empty list. */
export function ContactChannelList({ channels, showLabels = false, className }: ContactChannelListProps) {
  if (channels.length === 0) return null;

  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {channels.map(({ kind, label, value, href, icon: Icon }) => (
        <li key={`${kind}-${value}`} className="type-body flex items-start gap-3 text-muted">
          <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-link" />
          <span className="flex flex-col">
            <span className={showLabels ? "type-label text-foreground" : "sr-only"}>{label}</span>
            {href ? (
              <a href={href} className="transition-colors duration-200 ease-standard hover:text-foreground">
                {value}
              </a>
            ) : (
              <span>{value}</span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
