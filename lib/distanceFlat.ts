export default function DistanceFlat(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
) {
  const dx = (lng2 - lng1) * Math.cos((((lat1 + lat2) / 2) * Math.PI) / 180);
  const dy = lat2 - lat1;
  return Math.sqrt(dx * dx + dy * dy) * 111;
}
