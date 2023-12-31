import { useRef, useState, useEffect } from "react";
import { Content } from "@prismicio/client";
import Map from "./viewer/Map";
import List from "./viewer/List";

interface ViewerProps {
  data: Content.PlaybookDocumentData;
  setShowVideo: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Viewer(props: ViewerProps) {
  const [scrollEndLandscape, setScrollEndLandscape] = useState(false);
  const [scrollEndPortrait, setScrollEndPortrait] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
    <div className="flex items-end justify-end" ref={ref}>
      <List data={props.data} setShowVideo={props.setShowVideo} />
      <Map gems={props.data.slices} scrollEndLandscape={scrollEndLandscape} scrollEndPortrait={scrollEndPortrait} />
    </div>
  );
}
