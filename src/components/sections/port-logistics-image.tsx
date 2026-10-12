import { MediaFrame } from "@/components/media/media-frame";

/** Photo replacement for the former moving-parts diagram in the home problem section. */
export function PortLogisticsImage() {
  return (
    <div className="overflow-hidden rounded-xl border border-border shadow-panel">
      <MediaFrame
        src="/images/home/port-side-logistics.png"
        alt="A forklift moves secured marine supplies along a quay as a logistics worker checks the delivery beside a cargo vessel."
        ratio="landscape"
        overlay="scrim"
        position="object-center"
        sizes="(min-width: 1024px) 42vw, 100vw"
      />
    </div>
  );
}
