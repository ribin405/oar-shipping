export const flowContent = {
  eyebrow: "From supplier to vessel",
  title: "One coordinated path from supplier door to vessel deck.",
  description:
    "Oar coordinates the shore-side activities that connect suppliers, cargo and vessels across UAE port operations.",
  caption: "The activities shown describe the journey. Each requirement uses the steps it needs.",
  supplier: {
    label: "Supplier",
    title: "Supplier Door",
    description: "The starting point: supplier cargo ready for onward movement.",
  },
  oar: {
    label: "Oar",
    title: "Coordination & Execution",
    description: "Shore-side activities brought together into one path.",
    activities: ["Coordinate", "Clear", "Store", "Transport", "Deliver"],
  },
  vessel: {
    label: "Vessel",
    title: "Vessel Deck",
    description: "The destination: cargo delivered to the vessel.",
  },
} as const;
