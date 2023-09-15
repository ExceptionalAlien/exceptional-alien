import { useRef, useState, useEffect } from "react";
import Map from "../Map";
import List from "./viewer/List";

export default function Viewer({ data, center, zoom }: { data: any; center: google.maps.LatLngLiteral; zoom: number }) {
  const [scrollEndLandscape, setScrollEndLandscape] = useState(false);
  const [scrollEndPortrait, setScrollEndPortrait] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const viewer = ref.current!;
      const height = viewer.offsetTop + viewer.clientHeight;
      const scroll = window.scrollY + window.innerHeight;
      const offset = window.scrollY - viewer.clientHeight;
      const portraitMapHeight = 256;

      // Let map know when viewer scroll is not longer below fold so it can scroll too
      setScrollEndLandscape(scroll >= height ? true : false);
      setScrollEndPortrait(offset >= -portraitMapHeight ? true : false);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="!mt-0 flex justify-end items-end" ref={ref}>
      <List data={data} />
      <Map center={center} zoom={zoom} scrollEndLandscape={scrollEndLandscape} scrollEndPortrait={scrollEndPortrait} />
    </section>
  );
}
