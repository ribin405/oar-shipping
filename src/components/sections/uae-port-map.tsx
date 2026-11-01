import { headOfficePort, portMarkers, seaCoastPoints, uaeOutline } from "@/content/ports/map";

const WIDTH = 860;
const HEIGHT = 700;
const LON0 = 51.4;
const LAT0 = 27;
const SCALE = 150;
const LON_FACTOR = Math.cos((24.5 * Math.PI) / 180);
/** Vertical gap between stacked labels. */
const LABEL_GAP = 26;
const GULF_LABEL_X = 53.3;
const OMAN_LABEL_X = 56.75;

const x = (lon: number) => (lon - LON0) * LON_FACTOR * SCALE + 20;
const y = (lat: number) => (LAT0 - lat) * SCALE + 14;
const path = (points: readonly (readonly [number, number])[]) =>
  `M${points.map(([lon, lat]) => `${x(lon).toFixed(1)} ${y(lat).toFixed(1)}`).join(" L")}`;

const landPath = `${path(uaeOutline)} Z`;
const coastPath = path(uaeOutline.slice(0, seaCoastPoints));

/** Label slots: each side stacks its labels near their ports, never closer than the gap, so none overlap. */
const markers = (() => {
  const place = (side: "gulf" | "oman") => {
    let previous = -Infinity;
    return portMarkers
      .filter((port) => port.side === side)
      .map((port) => {
        const py = y(port.position[1]);
        const slot = Math.max(side === "gulf" ? py - 40 : py, previous + (side === "gulf" ? LABEL_GAP : 30));
        previous = slot;
        return { port, px: x(port.position[0]), py, slot };
      });
  };
  return [...place("gulf"), ...place("oman")];
})();

/**
 * Night-chart map of the UAE coast with the ports Oar covers. Drawn in code,
 * so it needs no image file or map tiles. Labels sit beside the coast with
 * leader lines; on phones they are hidden and the port list beside the map
 * names the ports instead. Colours and strokes live in `.port-map` (home.css).
 */
export function UaePortMap() {
  const gulfX = x(GULF_LABEL_X);
  const omanX = x(OMAN_LABEL_X);

  return (
    <figure className="port-map">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="Schematic map of the UAE coast showing the ports Oar covers">
        {[23, 24, 25, 26].map((lat) => (
          <g key={lat}>
            <line className="pm-grat" x1={0} x2={WIDTH} y1={y(lat)} y2={y(lat)} />
            <text className="pm-sub pm-small" x={8} y={y(lat) - 5}>{`${lat}°N`}</text>
          </g>
        ))}
        {[52, 53, 54, 55, 56].map((lon) => (
          <g key={lon}>
            <line className="pm-grat" x1={x(lon)} x2={x(lon)} y1={0} y2={HEIGHT} />
            <text className="pm-sub pm-small" x={x(lon) + 5} y={692}>{`${lon}°E`}</text>
          </g>
        ))}

        {[5, 4, 3, 2, 1].map((n) => (
          <path key={n} className="pm-glow" d={coastPath} strokeWidth={n * 9} />
        ))}
        <path className="pm-land" d={landPath} />

        <text className="pm-sub pm-title" x={x(54)} y={y(23.5)} textAnchor="middle">UNITED ARAB EMIRATES</text>
        <text className="pm-sub pm-sea-name" x={x(52.9)} y={y(26.2)} textAnchor="middle">ARABIAN GULF</text>
        <text
          className="pm-sub pm-sea-name"
          x={x(57.05)}
          y={y(24.3)}
          textAnchor="middle"
          transform={`rotate(-90 ${x(57.05)} ${y(24.3)})`}
        >
          GULF OF OMAN
        </text>

        {markers.map(({ port, px, py, slot }) => {
          const gulf = port.side === "gulf";
          const labelX = gulf ? gulfX : omanX;
          const elbow = gulf ? labelX + 12 : labelX - 14;
          const base = port.name === headOfficePort;
          return (
            <g key={port.name}>
              <polyline
                className="pm-lead pm-label"
                points={`${gulf ? labelX + 6 : labelX - 6},${slot} ${elbow},${slot} ${px},${py}`}
              />
              {base ? <circle className="pm-ring" cx={px} cy={py} r={13} /> : null}
              <circle className="pm-dot" cx={px} cy={py} r={base ? 7 : 5.5} />
              <text className="pm-name pm-label" x={labelX} y={slot + 4} textAnchor={gulf ? "end" : "start"}>
                {port.name}
              </text>
              {base ? (
                <text className="pm-sub pm-label pm-small" x={labelX} y={slot + 19} textAnchor={gulf ? "end" : "start"}>
                  Head office
                </text>
              ) : null}
            </g>
          );
        })}

        <circle className="pm-compass" cx={800} cy={70} r={26} />
        <path className="pm-dot" d="M800 48 L807 78 L800 73 L793 78 Z" />
        <text className="pm-name pm-small" x={800} y={38} textAnchor="middle">N</text>
        <text className="pm-sub pm-small" x={852} y={692} textAnchor="end">Schematic, not for navigation</text>
      </svg>
    </figure>
  );
}
