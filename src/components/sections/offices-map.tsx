import { contactDetails } from "@/config/contact";
import { getPortMarker } from "@/content/ports/map";

const WIDTH = 420;
const HEIGHT = 420;
const LON0 = 56;
const LAT0 = 25.62;
const SCALE = 520;
const LON_FACTOR = Math.cos((25.2 * Math.PI) / 180);

const x = (lon: number) => (lon - LON0) * LON_FACTOR * SCALE + 40;
const y = (lat: number) => (LAT0 - lat) * SCALE + 30;

/** Simplified east-coast shoreline, north to south (longitude, latitude); land lies to the west. */
const coast: readonly (readonly [number, number])[] = [
  [56.27, 25.62],
  [56.3, 25.52],
  [56.36, 25.4],
  [56.37, 25.3],
  [56.38, 25.16],
  [56.35, 25.04],
  [56.33, 24.92],
];

const land = `M${x(55.9)} ${y(25.62)} L${coast.map(([lon, lat]) => `${x(lon)} ${y(lat)}`).join(" L")} L${x(55.9)} ${y(24.92)} Z`;

/**
 * Schematic map of the UAE east coast with the two offices marked, drawn in
 * code in the same style as the ports map (`.port-map`, `.pm-*` in home.css).
 * Positions come from the listed ports, so an office appears where its port is.
 */
export function OfficesMap() {
  const markers = (contactDetails.offices ?? []).flatMap((office) => {
    const port = getPortMarker(office.port);
    return port ? [{ office, px: x(port.position[0]), py: y(port.position[1]) }] : [];
  });

  return (
    <figure className="port-map">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="Map of the UAE east coast showing the head office and the operational office">
        <path className="pm-land" d={land} />
        <text className="pm-sub pm-sea-name" x={WIDTH - 14} y={HEIGHT - 14} textAnchor="end">
          GULF OF OMAN
        </text>
       
        {markers.map(({ office, px, py }) => {
          const head = office.role === "Head Office";
          return (
            <g key={office.company}>
              <line className="pm-lead" x1={px} y1={py} x2={px + 60} y2={py} />
              {head ? <circle className="pm-ring" cx={px} cy={py} r={13} /> : null}
              <circle className="pm-dot" cx={px} cy={py} r={head ? 7 : 5.5} />
              <text className="pm-name" x={px + 66} y={py - 4}>
                {office.locality}
              </text>
              <text className="pm-sub pm-small" x={px + 66} y={py + 13}>
                {office.role}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
