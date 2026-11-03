import type { coveragePorts } from "@/content/ports/coverage";

type Coordinate = readonly [longitude: number, latitude: number];

/**
 * Simplified outline of the UAE for the coverage map, from approximate
 * coordinates. The first 20 points follow the sea coast from the Qatar border
 * round to the Oman border on the Gulf of Oman; the rest is the land border.
 * It is a schematic, not a survey, and is labelled as such on the map.
 */
export const uaeOutline: readonly Coordinate[] = [
  [51.58, 24.25], [52.2, 24.12], [52.9, 24.2], [53.6, 24.22], [54.1, 24.4], [54.4, 24.55], [54.75, 24.75],
  [55.06, 25.02], [55.28, 25.27], [55.42, 25.42], [55.6, 25.6], [55.82, 25.74], [55.96, 25.82], [56.06, 26.05],
  [56.12, 25.96], [56.2, 25.7], [56.27, 25.6], [56.36, 25.34], [56.37, 25.1], [56.34, 24.98],
  [56.1, 24.85], [55.96, 24.6], [55.82, 24.25], [55.7, 24.05], [55.45, 23.95], [55.25, 23.2], [55.2, 22.7],
  [52.7, 22.95], [52.0, 23.0], [51.7, 23.6],
];

/** Number of leading outline points that make up the sea coast. */
export const seaCoastPoints = 20;

interface PortMarker {
  name: (typeof coveragePorts)[number];
  /** Approximate harbour position. */
  position: Coordinate;
  /** Which side of the map the label sits on. */
  side: "gulf" | "oman";
}

/** The ten ports Oar lists, in label order from north to south on each coast. */
export const portMarkers: readonly PortMarker[] = [
  { name: "Ras Al Khaimah", position: [55.97, 25.78], side: "gulf" },
  { name: "Umm Al Quwain", position: [55.55, 25.58], side: "gulf" },
  { name: "Hamriyah", position: [55.47, 25.47], side: "gulf" },
  { name: "Ajman", position: [55.44, 25.41], side: "gulf" },
  { name: "Sharjah", position: [55.39, 25.36], side: "gulf" },
  { name: "Dubai", position: [55.28, 25.27], side: "gulf" },
  { name: "Jebel Ali", position: [55.06, 25.01], side: "gulf" },
  { name: "Abu Dhabi", position: [54.37, 24.47], side: "gulf" },
  { name: "Khor Fakkan", position: [56.36, 25.34], side: "oman" },
  { name: "Fujairah", position: [56.34, 25.12], side: "oman" },
];

/** The port marked as Oar's head office. */
export const headOfficePort: PortMarker["name"] = "Fujairah";

/** A listed port's marker (with its approximate position), by name. */
export function getPortMarker(name: PortMarker["name"]): PortMarker | undefined {
  return portMarkers.find((marker) => marker.name === name);
}
