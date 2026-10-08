import { Clock, Globe, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";

import type { ContactDetails } from "@/types/contact";

export interface ContactChannel {
  kind: "email" | "phone" | "whatsapp" | "address" | "hours" | "social";
  label: string;
  value: string;
  /** Present for channels the visitor can act on directly. */
  href?: string;
  icon: LucideIcon;
}

/** Turns the verified details into display channels. Fields that are not set produce no channel. */
export function getContactChannels({ email, phone, whatsapp, address, hours, social }: ContactDetails): ContactChannel[] {
  const channels: ContactChannel[] = [];

  if (email) channels.push({ kind: "email", label: "Email", value: email, href: `mailto:${email}`, icon: Mail });
  if (phone) {
    channels.push({ kind: "phone", label: "Phone", value: phone, href: `tel:${phone.replace(/[^\d+]/g, "")}`, icon: Phone });
  }
  if (whatsapp) {
    channels.push({
      kind: "whatsapp",
      label: "WhatsApp",
      value: whatsapp,
      href: `https://wa.me/${whatsapp.replace(/\D/g, "")}`,
      icon: MessageCircle,
    });
  }
  if (address) channels.push({ kind: "address", label: "Office", value: address, icon: MapPin });
  if (hours) channels.push({ kind: "hours", label: "Operating hours", value: hours, icon: Clock });

  for (const profile of social ?? []) {
    channels.push({ kind: "social", label: profile.label, value: profile.url, href: profile.url, icon: Globe });
  }

  return channels;
}
