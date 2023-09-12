import Map, { MapProps } from "../Map";

export default function Viewer(props: MapProps) {
  return (
    <section className="h-full">
      <Map mapProps={props} />
    </section>
  );
}
