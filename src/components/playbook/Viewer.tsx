import { useRef, useState, useEffect } from "react";
import { Content } from "@prismicio/client";
import Map from "../Map";
import List from "./viewer/List";

export default function Viewer({ data }: { data: Content.PlaybookDocumentData }) {
  const [scrollEndLandscape, setScrollEndLandscape] = useState(false);
  const [scrollEndPortrait, setScrollEndPortrait] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const viewer = ref.current!;
      const height = viewer?.offsetTop + viewer?.clientHeight;
      const scroll = window.scrollY + window.innerHeight;
      const offset = window.scrollY - viewer?.clientHeight;
      const portraitMapHeight = 224;

      // Let map know when viewer scroll is not longer below fold so it can scroll too
      setScrollEndLandscape(window.scrollY && scroll >= height ? true : false);
      setScrollEndPortrait(offset >= -portraitMapHeight ? true : false);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="!mt-0 flex items-end justify-end !pl-0 !pr-0" ref={ref}>
      <List data={data} />
      <Map gems={data.slices} scrollEndLandscape={scrollEndLandscape} scrollEndPortrait={scrollEndPortrait} />
    </section>
  );
}
