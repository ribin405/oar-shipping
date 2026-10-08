export const processContent = {
  eyebrow: "How it works",
  title: "From requirement to vessel, step by step.",
  description: "A high-level view of how Oar moves a requirement through the operation.",
  disclaimer: "The exact sequence and requirements vary by cargo, port and vessel operation.",
  steps: [
    {
      label: "01",
      title: "Requirement",
      description: "Understand the vessel, cargo, timing and delivery requirement.",
    },
    {
      label: "02",
      title: "Supplier & Cargo Coordination",
      description: "Coordinate with the relevant supplier and prepare the cargo for movement.",
    },
    {
      label: "03",
      title: "Documentation & Clearance",
      description: "Coordinate the documentation and customs-related requirements applicable to the movement.",
    },
    {
      label: "04",
      title: "Transport & Port Coordination",
      description: "Coordinate transportation and the port-side activities required for delivery.",
    },
    {
      label: "05",
      title: "Delivery to Vessel",
      description: "Coordinate the final movement toward the vessel and the delivery requirement.",
    },
  ],
} as const;
