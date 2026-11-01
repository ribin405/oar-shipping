import type { ServiceDetailContent } from "@/types/service";

export const shipChandling: ServiceDetailContent = {
  metaTitle: "Ship Chandling in the UAE: Provisions, Stores, Spares",
  metaDescription:
    "Ship chandling across all UAE ports: provisions, bonded stores, deck, engine and cabin stores, safety equipment, chemicals and spares, with full documents.",
  hero: {
    title: "Ship Chandling in UAE Ports: Provisions, Stores, Spares & Chemicals",
    description:
      "Everything your vessel needs from one supplier, delivered at anchorage or alongside with complete documents.",
  },
  offer: {
    eyebrow: "What We Offer",
    title: "Our services",
    groups: [
      {
        title: "Provisions & Bonded Stores",
        items: [
          "Fresh, frozen and dry provisions",
          "Galley stores and beverages",
          "Bonded stores",
        ],
      },
      {
        title: "Deck, Engine & Cabin Stores",
        items: [
          "Ropes, wires, tools and hardware",
          "Engine consumables and fittings",
          "Cabin and housekeeping stores",
          "IMPA / ISSA coded items on request",
        ],
      },
      {
        title: "Safety, Fire & Life Saving",
        items: [
          "Safety equipment and PPE",
          "Fire fighting equipment",
          "Pyrotechnics and life saving equipment",
        ],
      },
      {
        title: "Electrical, Electronics & Navigation",
        items: [
          "Electrical stores",
          "Electronics and navigational supplies",
          "Charts and publications",
          "Radar and equipment spares",
        ],
      },
      {
        title: "Chemicals & Oils",
        items: [
          "Deck and engine chemicals",
          "Lubricants, oils and gases",
          "Cleaning and water treatment chemicals",
          "SDS / MSDS for all products",
        ],
      },
      {
        title: "Spares, Medical & Construction",
        items: ["Technical and spare parts supply", "Medical stores", "Construction and repair materials"],
      },
    ],
  },
  process: [
    "Send RFQ with vessel, port, ETA and item list",
    "Receive a clear quote",
    "We procure, pack and label",
    "Delivery alongside or at anchorage with documents",
  ],
  related: ["customs-logistics", "marine-services", "pda-review"],
};
