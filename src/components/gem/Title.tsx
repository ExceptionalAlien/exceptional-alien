import { GeoPointField } from "@prismicio/client";

export default function Title({
  text,
  description,
  latLng,
}: {
  text: string;
  description: string;
  latLng: GeoPointField;
}) {
  return (
    <section>
      <hgroup className="md:float-left md:w-1/2 ">
        <h2 className="font-bold text-3xl md:text-6xl">{text}</h2>
        <h3 className="text-lg md:text-xl">
          {description?.charAt(0).toUpperCase()}
          {description?.substring(1).toLowerCase()}
        </h3>
      </hgroup>

      <p className="font-mono text-sm float-right w-1/2 text-right hidden md:inline">
        {Math.abs(latLng.latitude).toFixed(4)}°{latLng.latitude < 0 ? "S" : "N"}
        <br />
        {Math.abs(latLng.longitude).toFixed(4)}°{latLng.latitude < 0 ? "W" : "E"}
      </p>

      <div className="clear-both"></div>
    </section>
  );
}
