import type { ServiceDetailContent } from "@/types/service";

export const warehousing: ServiceDetailContent = {
  metaTitle: "Cargo Warehousing & Staging Coordination",
  metaDescription:
    "Cargo warehousing coordination: receiving, storing and staging cargo before onward transport toward the port and the vessel.",
  hero: {
    title: "Cargo warehousing coordination before onward movement to the vessel.",
    description:
      "Warehousing coordination covers the stage where cargo is received, held or staged before it moves on to the port and the vessel. Oar coordinates that stage with the relevant parties as part of the supplier-to-vessel journey.",
  },
  problem: {
    title: "Cargo does not always move straight through.",
    paragraphs: [
      "Items for a vessel may arrive before the vessel does, or before everything in an order is ready. They may need to be received, held, checked or consolidated first.",
      "Without a planned point for that stage, the timing of the whole requirement becomes harder to manage.",
    ],
  },
  role: {
    title: "Oar coordinates the stop between supplier and vessel.",
    paragraphs: [
      "Oar coordinates warehousing arrangements as part of the journey, connecting receiving, storage and preparation with the transport and port-side steps that follow.",
      "Storage arrangements depend on the requirement and the facilities involved, and are confirmed when the requirement is discussed.",
    ],
  },
  coordinates: [
    { kind: "supplier", description: "Coordinating inbound cargo from the supplier to the storage point." },
    { kind: "cargo", description: "Receiving, checking and preparing cargo before it moves on." },
    { kind: "storage", description: "Arranging a place to hold cargo for the period the requirement needs." },
    { kind: "transport", description: "Planning dispatch from storage toward the port." },
    { kind: "delivery", description: "Timing release from storage to suit delivery to the vessel." },
  ],
  processFocus: ["02", "04"],
  processNote:
    "Warehousing sits between supplier readiness and onward movement: receiving and preparing cargo before transport and port steps.",
  requirements: [
    "Cargo description and quantity",
    "Dimensions and weight",
    "Expected arrival date at the storage point",
    "How long the cargo needs to be held",
    "Special handling or storage requirements",
    "Onward dispatch date and destination",
    "Supplier details",
  ],
  audiences: ["marine-suppliers", "ship-management", "freight-forwarders", "marine-offshore"],
  related: ["cargo-transportation", "vessel-delivery", "port-logistics"],
  faq: [
    {
      question: "When might warehousing be part of a marine logistics requirement?",
      answer:
        "When cargo arrives before it is needed, when an order has to be completed or consolidated before it moves, or when items need to be checked or prepared before delivery to the vessel.",
    },
    {
      question: "What cargo information helps with storage planning?",
      answer:
        "A description of the cargo, its quantity, dimensions and weight, when it will arrive, how long it needs to be held and where it is going next. Any special handling needs are also useful.",
    },
  ],
};
