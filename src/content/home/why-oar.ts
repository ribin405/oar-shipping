import { routes } from "@/config/routes";

/** Homepage "Why Oar" block: two sets of reasons, shown beside the local-execution offer. */
export const homeWhyOar = {
  action: { label: "Why Oar in detail", href: routes.whyOar },
  primary: {
    eyebrow: "Why Oar Shipping",
    title: "Built for speed, compliance and clarity.",
    points: [
      { title: "One point of contact", text: "Supply, clearance and marine services coordinated together." },
      { title: "24/7 operations", text: "Urgent orders and after-hours port calls handled." },
      { title: "Transparent costs", text: "Clear quotes and disbursement accounts, plus PDA review." },
      { title: "Proper documents", text: "Delivery, customs and SDS paperwork on every job." },
    ],
  },
  secondary: {
    eyebrow: "Our Advantage",
    title: "Why clients choose us",
    points: [
      { title: "Port relationships", text: "Strong links with authorities, agents and suppliers." },
      { title: "Fast communication", text: "Digital RFQs and WhatsApp support." },
      { title: "Owner-side transparency", text: "Independent PDA review." },
    ],
  },
} as const;
