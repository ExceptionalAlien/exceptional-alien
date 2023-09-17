import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Title from "./header/Title";
import Share from "./header/Share";
import Gems from "./header/Gems";
import { shimmer, toBase64 } from "@/utils/shimmer";

export default function Header({ data }: { data: any }) {
  const [stickyTop, setStickyTop] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth >= 768 ? false : true;
      const orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
      const titleHeight = (orientation === "landscape" && !isMobile) || window.innerWidth === 768 ? 80 : 72;
      const globalHeaderheight = !isMobile ? 80 : 48;
      const portraitMapHeight = 224;
      const top = orientation === "landscape" ? globalHeaderheight : portraitMapHeight + globalHeaderheight;

      // Set top position value for sticky header
      setStickyTop(titleHeight - ref.current!.clientHeight + top);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="sticky text-white z-10" style={{ top: stickyTop }} ref={ref}>
      <Image
        src={data.image.url}
        alt={data.image.alt}
        width={data.image.dimensions.width}
        height={data.image.dimensions.height}
        placeholder={`data:image/svg+xml;base64,${toBase64(
          shimmer(data.image.dimensions.width, data.image.dimensions.height)
        )}`}
        className="w-full"
      />

      {/* Layered shadow */}
      <div className="bg-gradient-to-t from-black/50 from-0% to-black/0 to-40% absolute w-full h-full top-0"></div>

      <Gems count={data.slices.length} />
      <Share title={data.title} />
      <Title data={data} />
    </div>
  );
}
