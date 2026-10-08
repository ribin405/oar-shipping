import type { ServiceDetailContent } from "@/types/service";

export const portCoordination: ServiceDetailContent = {
  metaTitle: "Port Call Coordination Support in the UAE",
  metaDescription:
    "Port call coordination support: Oar keeps timing, documentation, transport and communication aligned between the parties around a vessel requirement.",
  hero: {
    title: "Port call coordination between suppliers, documents, transport and vessel.",
    description:
      "Port coordination is the alignment of timing, documentation, transport and communication between the parties around a vessel requirement. Oar keeps those parties connected; it does not replace them or act as a port authority.",
  },
  problem: {
    title: "Each party sees only its own part.",
    paragraphs: [
      "A supplier, a transport provider, an agent and the port-side parties each hold part of the picture. A change in one can affect the others before anyone notices.",
      "The vessel requirement is where those gaps eventually show.",
    ],
  },
  role: {
    title: "Oar keeps the parties connected.",
    paragraphs: [
      "Oar coordinates communication and timing between the relevant parties, so supplier, transport, documentation and port-side activity stay aligned around the requirement.",
      "Oar does not act as a port authority. It coordinates with the parties who carry out each activity.",
    ],
  },
  coordinates: [
    { kind: "port", description: "Connecting the port-side activities that surround the vessel's requirement." },
    { kind: "documentation", description: "Keeping the documentation status visible to the parties who need it." },
    { kind: "transport", description: "Aligning transport arrival with the port-side timing." },
    { kind: "supplier", description: "Keeping the supplier informed of timing changes that affect readiness." },
    { kind: "delivery", description: "Coordinating the final handover to the vessel with those involved." },
  ],
  processFocus: ["03", "04", "05"],
  processNote:
    "Port coordination runs across the later steps, keeping documentation, transport and delivery connected as they happen.",
  requirements: [
    "Vessel name and port",
    "ETA or required delivery date",
    "Parties involved and their contacts",
    "Cargo description and quantity",
    "Documentation status",
    "Transport arrangements already in place",
    "Special handling or access requirements",
  ],
  audiences: ["ship-management", "shipping-agents", "marine-suppliers", "marine-offshore"],
  related: ["port-logistics", "vessel-delivery", "customs-clearance", "cargo-transportation"],
  faq: [
    {
      question: "What does port coordination involve?",
      answer:
        "Connecting the activities and parties around a port-side requirement: timing, documentation, transport and communication, so that each stays aligned with the vessel requirement.",
    },
    {
      question: "Why is timing important around a vessel requirement?",
      answer:
        "Cargo has to meet the vessel at a particular point in its schedule. If transport, paperwork or supplier readiness drifts, the requirement is affected, so keeping the timing connected is central to coordination.",
    },
  ],
};
