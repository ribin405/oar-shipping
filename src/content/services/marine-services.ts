import type { ServiceDetailContent } from "@/types/service";

export const marineServices: ServiceDetailContent = {
  metaTitle: "Marine Services & Port Call Coordination",
  metaDescription:
    "Boat services, technical support, cash to master, diving, crew change and port call coordination, arranged as one port call plan across all UAE ports.",
  hero: {
    title: "Marine Services & Vessel Coordination in the UAE",
    description:
      "Boats, technical support, cash to master and diving arranged and coordinated as one port call plan.",
  },
  offer: {
    eyebrow: "What We Offer",
    title: "Our services",
    groups: [
      {
        title: "Boat Services",
        items: [
          "Launch and utility boat services",
          "Crew transfer and personnel boats",
          "Stores and provisions delivery by boat",
          "Anchorage and alongside support",
        ],
      },
      {
        title: "Technical Arrangements",
        items: [
          "Surveys and inspections",
          "Repairs and technician attendance",
          "Spare parts and yard support",
          "Suppliers and service providers",
        ],
      },
      {
        title: "Cash to Master (CTM)",
        items: [
          "Arrangement of cash delivery to vessel",
          "Coordination with owners and agents",
          "Receipts and documentation",
          "Subject to client authorisation",
        ],
      },
      {
        title: "Diving Arrangements",
        items: [
          "Underwater hull inspection and cleaning",
          "Propeller polishing",
          "Underwater repairs and surveys",
        ],
      },
      {
        title: "Crew Change & Husbandry",
        items: [
          "Crew transport, hotel and flights",
          "Visa and port formalities support",
          "Provisions and cash to master",
          "Local transport and support",
        ],
      },
      {
        title: "Port Call Coordination",
        items: [
          "Berthing and port formalities",
          "Liaison with port and authorities",
          "Port call monitoring and updates",
          "PDA / FDA coordination",
        ],
      },
    ],
  },
  showCoordination: true,
  process: [
    "Tell us vessel, port, ETA and needs",
    "We plan one timeline for all parties",
    "Live updates through the port call",
    "Clean closing documents",
  ],
  related: ["ship-chandling", "customs-logistics", "pda-review"],
};
