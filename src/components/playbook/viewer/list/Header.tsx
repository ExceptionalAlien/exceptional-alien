import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Title from "./header/Title";
import Share from "./header/Share";
import Gems from "./header/Gems";
import { shimmer, toBase64 } from "@/utils/shimmer";

export default function Header({ data }: { data: any }) {
  const [stickyTop, setStickyTop] = useState(0);
  const [blur, setBlur] = useState(0);
  const [sticking, setSticking] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResizeAndScroll = () => {
      const header = ref.current!;
      const isMobile = window.innerWidth >= 768 ? false : true;
      const orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
      const titleHeight = (orientation === "landscape" && !isMobile) || window.innerWidth === 768 ? 80 : 64;
      const globalHeaderheight = !isMobile ? 80 : 48;
      const portraitMapHeight = 224;
      const top = orientation === "landscape" ? globalHeaderheight : portraitMapHeight + globalHeaderheight;
      const stickyPos = titleHeight - header.clientHeight + top;
      setStickyTop(stickyPos); // Set top position value for sticky header
      const offset = 0 - window.scrollY + header.offsetTop;
      setSticking(Math.floor(offset) === stickyPos ? true : false); // Show shadow when header is sticking
      const blurPixels = ((offset - header.offsetTop) / (stickyPos - header.offsetTop)) * 10;
      setBlur(parseFloat(blurPixels.toFixed(1))); // Set amount of header image blur on scroll
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
    <div
      className={`z-10 bg-white sticky text-white overflow-hidden ${sticking && "shadow-md shadow-black/20"}`}
      style={{ top: stickyTop }}
      ref={ref}
    >
      <Image
        src={data.image.url}
        alt={data.image.alt}
        width={data.image.dimensions.width}
        height={data.image.dimensions.height}
        placeholder={`data:image/svg+xml;base64,${toBase64(
          shimmer(data.image.dimensions.width, data.image.dimensions.height)
        )}`}
        className="w-full scale-110"
        style={{ filter: `blur(${blur}px)` }}
      />

      {/* Layered shadow */}
      <div className="bg-gradient-to-t from-black/50 from-0% to-black/0 to-40% absolute w-full h-full top-0"></div>

      <Gems count={data.slices.length} />
      <Share title={data.title} />
      <Title data={data} />
    </div>
  );
}
