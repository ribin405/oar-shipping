import type { ServiceDetailContent } from "@/types/service";

export const customsClearance: ServiceDetailContent = {
  metaTitle: "Marine Customs Clearance Coordination",
  metaDescription:
    "Marine customs clearance coordination: Oar keeps customs-related documentation in step with cargo moving toward a UAE port and the vessel.",
  hero: {
    title: "Marine customs clearance coordination, alongside the cargo.",
    description:
      "Marine customs clearance coordination keeps the documentation and customs-related requirements for vessel-bound cargo in step with its movement. Oar coordinates this with the relevant parties as part of the journey toward the port and the vessel.",
  },
  problem: {
    title: "Documentation has to keep pace with the cargo.",
    paragraphs: [
      "Cargo moving toward a port or vessel comes with documentation and customs-related requirements that depend on what is moving, where it is from and where it is going.",
      "When paperwork and cargo move on different timelines, the movement can be held while one catches up with the other.",
    ],
  },
  role: {
    title: "Oar coordinates the documentation alongside the cargo.",
    paragraphs: [
      "Oar provides clearance support and documentation coordination as part of the wider journey, working with the relevant parties to keep customs-related requirements in step with the movement.",
      "Customs-related requirements are set by the relevant authorities and parties. Oar's role is coordination and support.",
    ],
  },
  coordinates: [
    { kind: "documentation", description: "Gathering and organising the documents the movement calls for." },
    { kind: "customs", description: "Coordinating the customs-related requirements that apply to the cargo." },
    { kind: "supplier", description: "Obtaining the shipment information that sits with the supplier." },
    { kind: "cargo", description: "Keeping cargo descriptions consistent with the documentation." },
    { kind: "port", description: "Aligning clearance timing with port-side activity toward the vessel." },
  ],
  processFocus: ["03"],
  processNote:
    "Customs-related coordination sits in the documentation and clearance step, but depends on the information gathered before it.",
  requirements: [
    "Cargo description",
    "Quantity and weight",
    "Origin and destination",
    "Commercial documents held by the supplier",
    "Vessel name and port",
    "Required delivery date",
    "Details of any restricted or specially handled cargo",
    "References to any documentation already prepared",
  ],
  audiences: ["shipping-agents", "freight-forwarders", "marine-suppliers", "ship-management"],
  related: ["port-logistics", "vessel-delivery", "port-coordination", "cargo-transportation"],
  faq: [
    {
      question: "What information may be required for customs-related coordination?",
      answer:
        "Typically a description of the cargo, quantity and weight, origin and destination, and the commercial documents held by the supplier. The vessel and port details also help. What is needed depends on the cargo and the movement.",
    },
    {
      question: "Does every shipment require the same clearance process?",
      answer:
        "No. Requirements depend on the cargo, its origin and destination, and the relevant authorities and parties. We coordinate around the requirements that apply to your movement.",
    },
  ],
};
