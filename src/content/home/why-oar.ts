import { Link2, MapPin, Timer, Waypoints } from "lucide-react";

import { routes } from "@/config/routes";
import type { Principle } from "@/types/principle";

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

/** Positioning statements only; none is a quantitative promise. */
export const principles: readonly Principle[] = [
  {
    title: "Operational Coordination",
    description: "Bring the moving parts of a port-side requirement together around one operational flow.",
    icon: Waypoints,
  },
  {
    title: "Local Understanding",
    description: "Work with an understanding of the UAE maritime and port environment.",
    icon: MapPin,
  },
  {
    title: "Responsive Execution",
    description: "Stay focused on the requirement, timing and coordination needed to move cargo toward the vessel.",
    icon: Timer,
  },
  {
    title: "Controlled Delivery",
    description: "Keep supplier, cargo, transport and port-side activities connected through execution.",
    icon: Link2,
  },
];
