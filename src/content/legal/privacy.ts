import { contactDetails } from "@/config/contact";

/** A paragraph or a bulleted list inside a policy section. */
export type PolicyBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: readonly string[] };

export interface PolicySection {
  /** Anchor id, used by the "On this page" index. Lowercase letters, numbers and hyphens. */
  id: string;
  title: string;
  body: readonly PolicyBlock[];
}

const email = contactDetails.email ?? "oar@oarshipping.com";
const [headOffice, operationalOffice] = contactDetails.offices ?? [];

/**
 * Privacy Policy copy. It describes only what this website actually does today:
 * the quote form is validated on the server and delivered by email through
 * Resend, nothing is stored in a database, and the site sets no analytics or
 * advertising cookies. If any of that changes (analytics, a CRM, a new
 * processor), update this file in the same change and bump `updatedAt`.
 *
 * Have the client's legal adviser review this text before launch: retention
 * periods and the exact governing data-protection regime are theirs to confirm.
 */
export const privacyContent = {
  /** ISO date of the last substantive change. */
  updatedAt: "2026-11-05",
  hero: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    description:
      "How Oar Shipping collects, uses and protects personal information when you visit this website, request a quote or contact our team.",
  },
  summary: {
    title: "The short version",
    points: [
      "We collect only what you choose to send us: through the quote form, by email or on WhatsApp.",
      "We use it to answer your enquiry and run the service you ask for. We never sell personal information.",
      "This website does not use advertising or tracking cookies.",
      "You can ask us to access, correct or delete your information at any time.",
    ],
  },
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      body: [
        {
          type: "paragraph",
          text: `This website, oarshipping.com, is operated by Oar Shipping, a UAE marine services group. The personal information described in this policy is controlled by ${headOffice?.company ?? "Oar Technologies FZ LLC"} (head office, ${headOffice?.locality ?? "Fujairah"}, UAE)${operationalOffice ? `, together with ${operationalOffice.company} (operational office, ${operationalOffice.locality}, UAE)` : ""}. In this policy, "Oar", "we", "us" and "our" mean these companies.`,
        },
        {
          type: "paragraph",
          text: `For any privacy question or request, write to ${email}.`,
        },
      ],
    },
    {
      id: "information-we-collect",
      title: "Information we collect",
      body: [
        { type: "paragraph", text: "We collect information in three ways." },
        {
          type: "list",
          items: [
            "Information you give us in the quote form: your name, company, email address, phone or WhatsApp number, the service you are interested in, the details of your request, and, if you add them, your vessel name and expected arrival date. Only an email address or a phone number is required, so we can reply.",
            "Information you send us directly: by email, by phone or on WhatsApp, including anything you attach or write in a message.",
            "Technical information: like most websites, our hosting provider records basic request data, such as IP address, browser type, pages requested and the time of the request, in server logs. We use this to keep the site secure and working.",
          ],
        },
        {
          type: "paragraph",
          text: "We do not ask for payment card details, passwords or government identification numbers through this website, and we ask that you do not send them to us through the quote form.",
        },
      ],
    },
    {
      id: "how-we-use-information",
      title: "How we use your information",
      body: [
        { type: "paragraph", text: "We use personal information to:" },
        {
          type: "list",
          items: [
            "respond to your enquiry and prepare a quotation for ship chandling, customs and logistics, marine services or port disbursement account (PDA) review;",
            "deliver, coordinate and invoice the services you request, including working with agents, suppliers and port authorities on your behalf;",
            "keep our website secure, prevent abuse and fix technical problems;",
            "meet our legal, regulatory, accounting and customs obligations.",
          ],
        },
        {
          type: "paragraph",
          text: "Our legal bases are your request to us (steps taken at your request before and during a service), our legitimate interest in running and securing a marine services business, and compliance with the law. We do not use your information for automated decision-making or profiling, and we do not sell it.",
        },
      ],
    },
    {
      id: "how-the-quote-form-works",
      title: "How the quote form works",
      body: [
        {
          type: "paragraph",
          text: "When you submit the quote form, your details are checked on our server and sent to our team as a single email through our email delivery provider, Resend. The website does not store quote requests in a database, and your browser never contacts the email provider directly. Once the email reaches our mailbox, it is handled like any other business correspondence.",
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies and analytics",
      body: [
        {
          type: "paragraph",
          text: "This website does not set advertising, tracking or analytics cookies, and it does not embed third-party trackers. Fonts and images are served from our own domain.",
        },
        {
          type: "paragraph",
          text: "If we later add analytics or any other non-essential technology, we will update this policy first and ask for your consent where the law requires it.",
        },
      ],
    },
    {
      id: "sharing",
      title: "Who we share information with",
      body: [
        { type: "paragraph", text: "We share personal information only when it is needed to serve you or when the law requires it:" },
        {
          type: "list",
          items: [
            "Service providers that run the website for us: our hosting provider, and Resend for email delivery. They process information on our instructions and only to provide those services.",
            "Port agents, suppliers, customs brokers, authorities and other parties involved in delivering a service you have requested, limited to what the job requires.",
            "Professional advisers, auditors and insurers, under duties of confidentiality.",
            "Courts, regulators and law enforcement, where we are legally required to disclose information.",
          ],
        },
        {
          type: "paragraph",
          text: "If you choose to message us on WhatsApp, that conversation is also governed by WhatsApp's own terms and privacy policy. The same applies to our pages on Facebook, Instagram, LinkedIn and YouTube, which are linked from this website but run by those platforms.",
        },
      ],
    },
    {
      id: "international-transfers",
      title: "International transfers",
      body: [
        {
          type: "paragraph",
          text: "Our email and hosting providers operate globally, so your information may be processed outside the UAE. Where that happens, we rely on providers that apply appropriate safeguards, and we share only what is needed to deliver their service.",
        },
      ],
    },
    {
      id: "retention",
      title: "How long we keep it",
      body: [
        {
          type: "paragraph",
          text: "We keep personal information only as long as we need it for the purpose it was collected: to handle your enquiry, deliver and document a service, and meet legal, tax and customs record-keeping requirements. Enquiries that do not lead to work are removed once they are no longer needed. Server logs are kept by our hosting provider for a limited period.",
        },
      ],
    },
    {
      id: "security",
      title: "How we protect it",
      body: [
        {
          type: "paragraph",
          text: "This website is served over HTTPS, validates every form submission on the server, sends security headers that limit what the pages can load or do, and keeps its software dependencies patched. No online service is completely secure, so please avoid sending sensitive documents through the quote form; ask us for a secure way to share them instead.",
        },
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      body: [
        {
          type: "paragraph",
          text: "Under applicable UAE data protection law, including Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data, you may have the right to:",
        },
        {
          type: "list",
          items: [
            "ask what personal information we hold about you and receive a copy;",
            "ask us to correct information that is inaccurate or incomplete;",
            "ask us to delete your information or restrict how we use it;",
            "object to processing, or withdraw consent where we rely on it;",
            "complain to the competent data protection authority.",
          ],
        },
        {
          type: "paragraph",
          text: `To use any of these rights, email ${email}. We may need to confirm your identity first, and we will reply within a reasonable time.`,
        },
      ],
    },
    {
      id: "children",
      title: "Children",
      body: [
        {
          type: "paragraph",
          text: "Our services are for businesses in the shipping industry. This website is not directed at children, and we do not knowingly collect their personal information.",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      body: [
        {
          type: "paragraph",
          text: "We may update this policy as our website or services change. The date at the top of this page shows when it was last updated. Material changes will be reflected here before they take effect.",
        },
      ],
    },
    {
      id: "contact-us",
      title: "Contact us",
      body: [
        {
          type: "paragraph",
          text: `Questions about this policy or about your personal information? Email ${email}${contactDetails.whatsapp ? ` or message us on WhatsApp at ${contactDetails.whatsapp}` : ""}.`,
        },
      ],
    },
  ],
} as const satisfies {
  updatedAt: string;
  hero: { eyebrow: string; title: string; description: string };
  summary: { title: string; points: readonly string[] };
  sections: readonly PolicySection[];
};
