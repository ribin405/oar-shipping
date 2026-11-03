import type { ContactDetails } from "@/types/contact";

/** The verified public contact channels used by the Contact page and footer. */
export const contactDetails: ContactDetails = {
  offices: [
    { role: "Head Office", company: "Oar Technologies FZ LLC", locality: "Fujairah", port: "Fujairah" },
    { role: "Operational Office", company: "Al Mejdaf Shipping LLC", locality: "Khor Fakkan", port: "Khor Fakkan" },
  ],
  email: "oar@oarshipping.com",
  whatsapp: "+971 50 629 0690",
};
