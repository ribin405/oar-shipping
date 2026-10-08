import { routes } from "@/config/routes";
import { contactContent } from "@/content/contact/page";

export const quotePageContent = {
  hero: {
    eyebrow: "Request a quote",
    title: "Tell us what needs to move, where and when.",
    description:
      "Share the key details of your cargo, vessel and delivery requirement so the Oar team can understand the operation.",
  },
  form: {
    requiredNote: "Fields marked * are required.",
    submitLabel: "Request a Quote",
    groups: {
      contact: "Contact",
      requirement: "Requirement",
      movement: "Movement",
      additional: "Additional information",
    },
    fields: {
      name: { label: "Full name", placeholder: "Your name" },
      company: { label: "Company", placeholder: "Company name" },
      email: { label: "Email", placeholder: "Email address" },
      phone: { label: "Phone", placeholder: "Phone number" },
      country: { label: "Country", placeholder: "Country" },
      service: { label: "Service", placeholder: "Select a service" },
      cargoType: { label: "Cargo type", placeholder: "e.g. spare parts, equipment, marine supplies" },
      cargoDetails: {
        label: "Cargo details",
        placeholder: "Quantity, dimensions, weight, packaging",
        helper: "Include any special handling requirements.",
      },
      pickupLocation: { label: "Pickup / Supplier Location", placeholder: "Where is the cargo being collected?" },
      deliveryPort: { label: "Delivery port", placeholder: "Port where the vessel will receive the cargo" },
      vesselName: { label: "Vessel name", placeholder: "Vessel name" },
      eta: { label: "Vessel ETA", helper: "Expected vessel arrival date and time." },
      requiredDeliveryDate: { label: "Required delivery date", helper: "The date the cargo is needed at the vessel." },
      additionalRequirements: {
        label: "Additional requirements",
        placeholder: "Anything else the operations team should know?",
      },
    },
  },
  confirmation: {
    title: "Your request has been received.",
    description:
      "Thank you for sharing the details of your requirement. The information has been submitted to Oar.",
    resetLabel: "Submit another request",
  },
  failure: {
    generic: "We couldn't submit your request right now. Please try again.",
    validation: "Please check the highlighted fields and try again.",
  },
  aside: {
    title: "What to share",
    description: "The more context you provide, the easier it is to understand the movement requirement.",
    items: contactContent.guidance.items,
  },
  cta: {
    title: "Prefer to talk it through first?",
    description: "Contact Oar to discuss the requirement before you share the details.",
    primaryCta: { label: "Contact Oar", href: routes.contact },
  },
};
