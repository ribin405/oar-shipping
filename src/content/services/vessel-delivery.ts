import type { ServiceDetailContent } from "@/types/service";

export const vesselDelivery: ServiceDetailContent = {
  metaTitle: "Cargo Delivery to Vessels in the UAE",
  metaDescription:
    "Cargo and supplies delivered to a vessel, coordinated from supplier to vessel: cargo preparation, transport and port-side timing around the vessel's requirement.",
  hero: {
    title: "Cargo delivery to the vessel, coordinated from supplier door to vessel deck.",
    description:
      "Vessel delivery here means getting cargo and supplies to a vessel, not delivering a vessel itself. Oar coordinates the final stretch: preparing cargo, arranging transport and aligning port-side activity so the requirement reaches the vessel.",
  },
  problem: {
    title: "A delivery to a vessel has a fixed point to meet.",
    paragraphs: [
      "Unlike a standard delivery, a vessel requirement is tied to the vessel's position and schedule. Cargo, transport and port-side activity all need to line up around it.",
      "If one element is late or incomplete, the effect shows up at the vessel.",
    ],
  },
  role: {
    title: "Oar coordinates the path to the vessel deck.",
    paragraphs: [
      "Oar coordinates with suppliers, transport providers and port-side parties so the cargo is prepared and moves toward the vessel as the requirement needs.",
      "The aim is a coordinated path from supplier door to vessel deck. Timing depends on the cargo, the port and the vessel operation.",
    ],
  },
  coordinates: [
    { kind: "supplier", description: "Confirming what is being supplied, when it is ready and where it is collected." },
    { kind: "cargo", description: "Preparing the cargo so it can be handled and handed over at the vessel." },
    { kind: "transport", description: "Arranging the movement from the supplier side toward the port." },
    { kind: "port", description: "Aligning port-side activity with the vessel's requirement and timing." },
    { kind: "delivery", description: "Coordinating the final movement and handover to the vessel." },
  ],
  processFocus: ["02", "04", "05"],
  processNote:
    "Vessel delivery centres on the later steps: preparing the cargo, moving it and coordinating the final handover to the vessel.",
  requirements: [
    "Vessel name",
    "ETA or required delivery date",
    "Delivery port or location",
    "Cargo description and quantity",
    "Dimensions and weight",
    "Supplier and pickup location",
    "Agent or vessel contact for coordination",
    "Documentation and special handling requirements",
  ],
  audiences: ["ship-management", "marine-suppliers", "shipping-agents", "marine-offshore"],
  related: ["port-logistics", "cargo-transportation", "customs-clearance"],
  faq: [
    {
      question: "What information is needed to coordinate vessel delivery?",
      answer:
        "The vessel name, the delivery port or location, the required delivery date, a description and quantity of the cargo, and where it is being collected. Any documentation or special handling requirements also help.",
    },
    {
      question: "How does vessel delivery relate to port and transport coordination?",
      answer:
        "Delivery to a vessel is the end point of the journey, and it depends on the transport leg and port-side activity before it. Coordinating those together is what lets the cargo reach the vessel as the requirement needs.",
    },
  ],
};
