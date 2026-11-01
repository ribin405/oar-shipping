import { cn } from "@/lib/utils";

const CENTER = 200;
const TICKS = 72;

/** Position on the dial for a compass bearing (0 = north, clockwise) at a distance from the centre. */
const coords = (bearing: number, radius: number): [number, number] => {
  const radians = ((bearing - 90) * Math.PI) / 180;
  return [CENTER + radius * Math.cos(radians), CENTER + radius * Math.sin(radians)];
};

const toPoints = (points: readonly (readonly [number, number])[]) =>
  points.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");

/** One star point: tip at `length`, with the base corners `width` out on either side of the centre. */
const starPoint = (bearing: number, length: number, width: number) =>
  toPoints([coords(bearing, length), coords(bearing + 8, width), [CENTER, CENTER], coords(bearing - 8, width)]);

const bearings = (count: number, step: number) => Array.from({ length: count }, (_, index) => index * step);

/**
 * A gold compass rose: a ring of degree ticks (the only part that moves, very
 * slowly), four circles, an eight-point star and a centre mark. Purely
 * decorative, so it is hidden from assistive technology. Colours and the slow
 * turn live in `.compass` (components.css).
 */
export function CompassPattern({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 -28 400 428" className={cn("compass", className)} focusable="false">
      <g className="compass__ring">
        {bearings(TICKS, 360 / TICKS).map((bearing, index) => {
          const major = index % 6 === 0;
          const [x1, y1] = coords(bearing, major ? 160 : 168);
          const [x2, y2] = coords(bearing, 178);
          return (
            <line
              key={bearing}
              className={major ? "compass__tick compass__tick--major" : "compass__tick"}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
            />
          );
        })}
      </g>

      {[190, 178, 128, 78].map((radius, index) => (
        <circle
          key={radius}
          className={index === 0 ? "compass__line" : "compass__line compass__line--soft"}
          cx={CENTER}
          cy={CENTER}
          r={radius}
        />
      ))}

      {bearings(8, 45).map((bearing) => {
        const [x, y] = coords(bearing, 178);
        return <line key={bearing} className="compass__line compass__line--soft" x1={CENTER} y1={CENTER} x2={x} y2={y} />;
      })}

      {bearings(4, 90).map((bearing) => (
        <polygon key={`cardinal-${bearing}`} className="compass__star compass__star--major" points={starPoint(bearing, 150, 28)} />
      ))}
      {bearings(4, 90).map((bearing) => (
        <polygon key={`inter-${bearing}`} className="compass__star" points={starPoint(bearing + 45, 104, 20)} />
      ))}

      <circle className="compass__dot" cx={CENTER} cy={CENTER} r={7} />
      <circle className="compass__line" cx={CENTER} cy={CENTER} r={14} />
      <text className="compass__north" x={CENTER} y={-8} textAnchor="middle">
        N
      </text>
    </svg>
  );
}
