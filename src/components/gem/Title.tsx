import { GeoPointField } from "@prismicio/client";

export default function Title({ text, latLng }: { text: string; latLng: GeoPointField }) {
  return (
    <section>
      <h2 className="md:float-left md:w-1/2 font-bold text-3xl md:text-6xl">{text}</h2>

      <p className="font-mono text-xs md:text-sm md:float-right md:w-1/2 md:text-right mt-1 md:mt-0">
        {Math.abs(latLng.latitude).toFixed(4)}°{latLng.latitude < 0 ? "S" : "N"}
        <br />
        {Math.abs(latLng.longitude).toFixed(4)}°{latLng.latitude < 0 ? "W" : "E"}
      </p>

      <div className="clear-both"></div>
    </section>
  );
}
