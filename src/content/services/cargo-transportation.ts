import type { ServiceDetailContent } from "@/types/service";

export const cargoTransportation: ServiceDetailContent = {
  metaTitle: "Port Cargo Transportation Coordination",
  metaDescription:
    "Shore-side cargo transportation coordinated from supplier to port and vessel, planned around the vessel's timing. This is not ocean freight.",
  hero: {
    title: "Port cargo transportation, coordinated from supplier to port and vessel.",
    description:
      "Cargo transportation here means the shore-side movement of cargo: from the supplier or a logistics point to the port and on toward the vessel. It is not ocean freight. Oar coordinates each transport leg with the providers involved.",
  },
  problem: {
    title: "Transport has to fit the vessel's timeline.",
    paragraphs: [
      "Cargo may need to move from a supplier to a storage point, from storage to the port, or directly to the vessel. Each leg depends on pickup readiness, documentation and port-side timing.",
      "A transport plan that ignores the vessel requirement can arrive complete but at the wrong moment.",
    ],
  },
  role: {
    title: "Oar coordinates transport around the requirement.",
    paragraphs: [
      "Oar coordinates with transport providers and the other parties involved, planning pickup and movement so transport connects with the documentation and port-side activity on either side of it.",
      "Transport is arranged with providers suited to the cargo and the requirement.",
    ],
  },
  coordinates: [
    { kind: "supplier", description: "Agreeing pickup readiness and access with the supplier." },
    { kind: "cargo", description: "Confirming what is moving, and how it needs to be handled in transit." },
    { kind: "transport", description: "Planning and coordinating each transport leg with the providers involved." },
    { kind: "documentation", description: "Making sure documents travel with, or ahead of, the cargo as needed." },
    { kind: "port", description: "Timing arrival at the port or delivery point to the requirement." },
  ],
  processFocus: ["02", "04"],
  processNote:
    "Transportation links the supplier side of the journey to the port: pickup, movement and arrival timed around the vessel.",
  requirements: [
    "Pickup location",
    "Delivery location or port",
    "Cargo description",
    "Quantity, weight and dimensions",
    "Required delivery date",
    "Vessel name where relevant",
    "Special handling or vehicle requirements",
    "Site access and contact details at pickup and delivery",
  ],
  audiences: ["marine-suppliers", "freight-forwarders", "shipping-agents", "marine-offshore"],
  related: ["vessel-delivery", "port-logistics", "warehousing", "port-coordination"],
  faq: [
    {
      question: "What information is useful when arranging cargo transportation?",
      answer:
        "Where the cargo is collected and where it needs to go, what it is and how much there is, and when it is needed. Handling requirements and site access details also help.",
    },
    {
      question: "How is transportation connected to vessel delivery?",
      answer:
        "Transport is how cargo reaches the port or vessel, so its timing has to match the vessel requirement and the documentation and port-side steps around it. Coordinating them together keeps the delivery connected.",
    },
  ],
};
