import { GeoPointField } from "@prismicio/client";

export default function Title({ text, latLng }: { text: string; latLng: GeoPointField }) {
  return (
    <section>
      <h2 className="font-bold text-3xl md:text-6xl uppercase">{text}</h2>

      <p className="font-mono text-xs md:text-sm md:mt-1">
        {Math.abs(latLng.latitude).toFixed(4)}°{latLng.latitude < 0 ? "S" : "N"}
        <br />
        {Math.abs(latLng.longitude).toFixed(4)}°{latLng.latitude < 0 ? "W" : "E"}
      </p>
    </section>
  );
}
