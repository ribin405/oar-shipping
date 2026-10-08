import type { ServiceDetailContent } from "@/types/service";

export const portLogistics: ServiceDetailContent = {
  metaTitle: "Port Logistics Coordination in the UAE",
  metaDescription:
    "Port logistics coordination in the UAE: Oar connects the supplier, cargo, documentation, transport and port-side steps that move a requirement to the vessel.",
  hero: {
    title: "Port logistics, coordinated around your vessel requirement.",
    description:
      "Port logistics is the movement and handling of cargo through the port-side journey. Oar coordinates the supplier, cargo, documentation, transport and port-side steps that carry a requirement toward the vessel.",
  },
  problem: {
    title: "Port-side movement depends on more than one party.",
    paragraphs: [
      "Moving cargo through a port environment typically involves a supplier, a transport leg, documentation and the port-side activities around the vessel. Each depends on the others being ready at the right point.",
      "When those activities are arranged separately, the vessel requirement is what absorbs the mismatch.",
    ],
  },
  role: {
    title: "Oar coordinates the movement around the requirement.",
    paragraphs: [
      "Oar's role is to coordinate with the relevant parties so the port-side activities connect in sequence, from the supplier side of the journey to the vessel.",
      "Oar coordinates and supports the movement. Individual activities are carried out with the relevant parties involved.",
    ],
  },
  coordinates: [
    { kind: "supplier", description: "Aligning with the supplier on readiness and handover of the cargo." },
    { kind: "cargo", description: "Making sure the cargo is ready to move in the form the next step needs." },
    { kind: "documentation", description: "Keeping the paperwork for the movement in step with the cargo." },
    { kind: "transport", description: "Connecting the transport leg with pickup and port-side timing." },
    { kind: "port", description: "Coordinating the activities around the port and the vessel's requirement." },
  ],
  processFocus: ["02", "03", "04"],
  processNote:
    "Port logistics mainly spans the middle of the journey: coordinating the supplier, the paperwork and the transport and port-side steps that follow.",
  requirements: [
    "Vessel name and delivery port",
    "ETA or required delivery date",
    "Cargo description and quantity",
    "Pickup location",
    "Supplier details",
    "Documentation requirements",
    "Special handling requirements",
  ],
  audiences: ["ship-management", "marine-suppliers", "shipping-agents", "freight-forwarders"],
  related: ["vessel-delivery", "cargo-transportation", "port-coordination", "customs-clearance"],
  faq: [
    {
      question: "What information is useful when requesting port logistics support?",
      answer:
        "The vessel and delivery port, the required delivery date, a description and quantity of the cargo, the pickup location, and any documentation or special handling requirements. Not every detail is needed at the start; it helps us assess the requirement.",
    },
    {
      question: "What types of activities can port logistics coordination involve?",
      answer:
        "Depending on the requirement, it can involve coordinating with the supplier, preparing cargo for movement, documentation, transport and the port-side activities leading to the vessel. The activities involved vary by cargo, port and vessel operation.",
    },
  ],
};
