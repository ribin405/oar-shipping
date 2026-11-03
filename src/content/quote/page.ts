/**
 * Request a Quote copy. The form is deliberately short: three required fields
 * (name, company, service), a way to reply (email or phone) and an optional,
 * folded vessel block. The three reasons in the side panel are the client's own
 * claims; no response time is promised until the client supplies one.
 */
export const quotePageContent = {
  panel: {
    eyebrow: "Request a Quote",
    title: "Tell us what you need.",
    reasons: [
      { title: "24/7 operations desk", text: "Urgent orders and after-hours port calls handled." },
      { title: "One point of contact", text: "Supply, clearance and marine services together." },
      { title: "Independent PDA review", text: "Know your port costs are worth it." },
    ],
    whatsappLead: "Prefer to message?",
  },
  form: {
    requiredNote: "Fields marked * are required.",
    replyHint: "Email or phone: add at least one so we can reply. The other is optional.",
    submitLabel: "Send request",
    whatsappAlternative: "or message us on WhatsApp",
    vesselSummary: "Add vessel details",
    vesselOptional: "(optional)",
    notSureLabel: "Not sure yet",
    fields: {
      name: { label: "Full name", placeholder: "Your name" },
      company: { label: "Company", placeholder: "Company name" },
      email: { label: "Email", placeholder: "Email address" },
      phone: { label: "Phone / WhatsApp", placeholder: "Phone number" },
      service: { label: "Service", placeholder: "Choose a service" },
      details: { label: "Service details", placeholder: "What do you need, where, and by when?" },
      vesselName: { label: "Vessel name", placeholder: "Vessel name" },
      eta: { label: "Vessel ETA" },
    },
  },
  confirmation: {
    eyebrow: "Request received",
    title: "Thank you. We have your request.",
    description:
      "Our operations desk will review it and come back to you using the contact details you gave. For anything urgent, message us on WhatsApp.",
    whatsappLabel: "Message us on WhatsApp",
    resetLabel: "Send another request",
  },
  failure: {
    generic: "We couldn't submit your request right now. Please try again.",
    validation: "Please check the highlighted fields and try again.",
  },
};
