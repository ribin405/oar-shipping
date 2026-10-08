/** Fields shared by every content entry that has its own page. */
export interface ContentEntry {
  slug: string;
  title: string;
  summary: string;
}

export interface Faq {
  question: string;
  answer: string;
}

/** An approved, brand-free image. Alt text is empty only when the image is purely decorative. */
export interface ContentImage {
  src: string;
  alt: string;
  /** Tailwind object-position class that keeps the focal point visible when the image is cropped, e.g. "object-[50%_30%]". */
  position?: string;
}
