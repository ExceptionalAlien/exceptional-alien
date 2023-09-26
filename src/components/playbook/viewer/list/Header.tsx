import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Content } from "@prismicio/client";
import Title from "./header/Title";
import Share from "./header/Share";
import Gems from "./header/Gems";
import { shimmer, toBase64 } from "@/utils/shimmer";

export default function Header({ data }: { data: Content.PlaybookDocumentData }) {
  const [stickyTop, setStickyTop] = useState(0);
  const [blur, setBlur] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResizeAndScroll = (e?: Event) => {
      const header = ref.current!;
      const isMobile = window.innerWidth >= 768 ? false : true;
      const orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
      const titleHeight = (orientation === "landscape" && !isMobile) || window.innerWidth === 768 ? 80 : 64;
      const globalHeaderheight = !isMobile ? 80 : 48;
      const portraitMapHeight = 224;
      const top = orientation === "landscape" ? globalHeaderheight : portraitMapHeight + globalHeaderheight;
      const stickyPos = titleHeight - header.clientHeight + top;

      // Set top position value for sticky header
      if (!e || e.type === "resize") {
        setStickyTop(stickyPos);
      }

      // Set amount of header image blur on scroll
      const blurPixels = ((window.scrollY / Math.abs(stickyPos - top)) * 100) / 10;
      setBlur(blurPixels >= 10 ? 10 : blurPixels);
    };

    handleResizeAndScroll();
    window.addEventListener("resize", handleResizeAndScroll);
    window.addEventListener("scroll", handleResizeAndScroll);

    return () => {
      window.removeEventListener("resize", handleResizeAndScroll);
      window.removeEventListener("scroll", handleResizeAndScroll);
    };
  }, []);

  return (
    <div className="z-10 sticky bg-ex-light-grey text-white overflow-hidden" style={{ top: stickyTop }} ref={ref}>
      <Image
        src={data.image.url as string}
        alt={data.image.alt as string}
        width={data.image.dimensions!.width}
        height={data.image.dimensions!.height}
        placeholder={`data:image/svg+xml;base64,${toBase64(
          shimmer(data.image.dimensions!.width, data.image.dimensions!.height)
        )}`}
        className="w-full"
        style={{
          filter: `blur(${blur}px)`,
          transform: "scale3d(1.1, 1.1, 1.1)",
        }}
      />

      {/* Layered shadow */}
      <div className="bg-gradient-to-t from-black/50 from-0% to-black/0 to-40% absolute w-full h-full top-0"></div>

      <Gems count={data.slices.length} />
      <Share title={data.title} />
      <Title data={data} />
    </div>
  );
}
