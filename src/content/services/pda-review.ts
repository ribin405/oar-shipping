import { contactDetails } from "@/config/contact";
import { routes } from "@/config/routes";
import type { ServiceDetailContent } from "@/types/service";

export const pdaReview: ServiceDetailContent = {
  metaTitle: "PDA Review for Ship Owners",
  metaDescription:
    "Independent line-by-line review of the agent's Proforma Disbursement Account for ship owners and managers, with fair, high or review flags before you pay.",
  hero: {
    title: "Know your port costs are worth it.",
    description:
      "Independent review of the agent's Proforma Disbursement Account for ship owners and managers, before you pay.",
  },
  heroAction: contactDetails.departments?.pda
    ? { label: "Send your PDA", href: `mailto:${contactDetails.departments.pda}?subject=PDA%20review%20request` }
    : { label: "Ask about pricing", href: routes.contact },
  offer: {
    eyebrow: "What We Offer",
    title: "What a PDA review covers",
    groups: [
      {
        title: "Line-by-line check",
        description:
          "Port dues, pilotage, towage, launch hire, supplies, customs and agency fees against market rates.",
      },
      {
        title: "Flags and savings",
        description: "Inflated items, duplicates, lump sums and unnecessary services highlighted.",
      },
      {
        title: "Clear owner report",
        description: "Each line marked fair, high or review, with suggested actions.",
      },
      {
        title: "FDA comparison",
        description: "Final invoices compared with the PDA, variances explained.",
      },
    ],
  },
  process: ["Send the PDA", "We review each line", "Receive owner report", "Optional FDA comparison"],
  related: ["marine-services", "customs-logistics", "ship-chandling"],
};
