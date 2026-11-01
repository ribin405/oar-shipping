interface LocalExecutionItem {
  title: string;
  description: string;
}

/** Local execution for global suppliers, manufacturers and ship managers; shown as a column of the Why Oar section. */
export const localExecution = {
  eyebrow: "Local Execution Partner",
  description:
    "Global suppliers, manufacturers and ship managers rely on us to execute locally: delivery, clearance, boats and technical support, handled to their standard.",
  items: [
    { title: "Supply & delivery", description: "Local delivery and documentation for global suppliers and OEMs." },
    {
      title: "Clearance & logistics",
      description: "Customs, warehousing and transport for shipments entering or leaving the UAE.",
    },
    { title: "Port call execution", description: "Boats, technical teams, divers and CTM coordinated on arrival." },
    { title: "Clear reporting", description: "Updates and documents sent back to your head office." },
  ] satisfies readonly LocalExecutionItem[],
};
