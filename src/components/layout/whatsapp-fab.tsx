import { contactDetails } from "@/config/contact";

/** Fixed, brand-colored shortcut to Oar's verified WhatsApp contact. */
export function WhatsAppFab() {
  const number = contactDetails.whatsapp?.replace(/\D/g, "");
  if (!number) return null;

  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Oar Shipping on WhatsApp"
      className="fixed right-5 bottom-5 z-30 flex size-14 items-center justify-center rounded-full border border-signal-cyan/50 bg-marine-blue text-white shadow-overlay transition-colors duration-200 ease-standard hover:bg-ocean focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-cyan sm:right-7 sm:bottom-7"
    >
      <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="size-7">
        <path
          d="M26.7 15.6a10.7 10.7 0 0 1-15.8 9.3L5 26.5l1.7-5.7a10.7 10.7 0 1 1 20-5.2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M11.5 10.7c.3-.7.6-.7 1-.7h.7c.3 0 .5.1.7.6l1 2.4c.1.3.1.5-.1.8l-.7.9c-.2.2-.3.4-.1.7.3.6 1.1 1.6 2.1 2.4 1.1.9 2 1.2 2.5 1.4.3.1.5 0 .7-.2l1-1.2c.2-.3.5-.3.8-.2l2.2 1.1c.3.2.5.3.5.5 0 .3-.2 1.6-1.1 2.2-.7.6-1.7.8-2.7.6-1-.2-2.3-.7-3.9-1.7-2.3-1.4-3.8-3.7-4.2-4.2-.4-.6-1.1-1.7-1.1-2.9s.6-2.1.8-2.5Z"
          fill="currentColor"
        />
      </svg>
    </a>
  );
}
