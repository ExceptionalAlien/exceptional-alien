import { useRef, useState, useEffect } from "react";
import Map from "../Map";
import List from "./viewer/List";

export default function Viewer({ data, center, zoom }: { data: any; center: google.maps.LatLngLiteral; zoom: number }) {
  const [scrollEndLandscape, setScrollEndLandscape] = useState(false);
  const [scrollEndPortrait, setScrollEndPortrait] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const height = ref.current!.offsetTop + ref.current!.clientHeight;
      const scroll = window.scrollY + window.innerHeight;
      const offset = window.scrollY - ref.current!.clientHeight;
      setScrollEndLandscape(scroll >= height ? true : false);
      setScrollEndPortrait(offset >= -256 ? true : false);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="!mt-0 flex justify-end relative" ref={ref}>
      <List data={data} />
      <Map center={center} zoom={zoom} scrollEndLandscape={scrollEndLandscape} scrollEndPortrait={scrollEndPortrait} />
    </section>
  );
}
