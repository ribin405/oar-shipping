interface PortCallStage {
  label: string;
  title: string;
  description: string;
  /** The longest stage gets the gold mark. */
  emphasis: boolean;
}

/** One coordinator, one timeline: the four stages of a port call and the activities planned together. */
export const portCallContent = {
  eyebrow: "Coordination",
  title: "One coordinator. One timeline.",
  description:
    "Boats, supply, customs, technical teams and divers planned together so nothing clashes and nothing is missed.",
  stages: [
    { label: "01", title: "Pre-arrival", description: "Requirements, approvals, customs papers and bookings.", emphasis: false },
    { label: "02", title: "Arrival", description: "Boats, agents and authorities aligned to ETA.", emphasis: false },
    {
      label: "03",
      title: "Port stay",
      description: "Supply, technical work, diving, CTM and crew change in sequence.",
      emphasis: true,
    },
    { label: "04", title: "Departure", description: "Closing documents and cost review.", emphasis: false },
  ] satisfies readonly PortCallStage[],
  activitiesLabel: "Planned together",
  activities: [
    "Provisions & Bonded Stores",
    "Deck, Engine & Cabin Stores",
    "Customs Clearance",
    "Sea & Air Freight",
    "Warehouse & Distribution",
    "Boat Services",
    "Technical Arrangements",
    "Cash to Master (CTM)",
  ],
} as const;
