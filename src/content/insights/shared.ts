import { routes } from "@/config/routes";
import { servicePageContent } from "@/content/services/shared";
import type { InsightKind } from "@/types/insight";

export const insightKindLabels: Record<InsightKind, string> = {
  article: "Article",
  "case-study": "Case study",
  guide: "Guide",
  "company-update": "Company update",
};

/** Copy shared by every insight page. Article-specific copy lives in the insight entry. */
export const insightPageContent = {
  heroEyebrow: "Insights",
  services: {
    eyebrow: "Related services",
    title: "Services connected to this topic.",
    action: { label: "View all services", href: routes.services },
  },
  industries: {
    eyebrow: "Relevant audiences",
    title: "Who this is relevant to.",
    action: { label: "All industries", href: routes.industries },
  },
  related: { eyebrow: "Keep reading", title: "Related insights." },
  /** Same closing call to action as the service pages. */
  cta: servicePageContent.cta,
  cardLinkLabel: "Read insight",
};
