import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Content, ImageField } from "@prismicio/client";
import Title from "./header/Title";
import Share from "./header/Share";
import Destination from "@/components/shared/Destination";
import { shimmer, toBase64 } from "@/utils/shimmer";

interface HeaderProps {
  image: ImageField;
  title: string;
  creator: Content.CreatorDocument;
  destination: Content.DestinationDocument;
}

export default function Header(props: HeaderProps) {
  const [stickyTop, setStickyTop] = useState(0);
  const [blur, setBlur] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const imageLoadComplete = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    const handleResizeAndScroll = (e?: Event) => {
      const header = ref.current!;
      const isMobile = window.innerWidth >= 768 ? false : true;
      const orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
      const titleHeight = (orientation === "landscape" && !isMobile) || window.innerWidth === 768 ? 80 : 64;
      const globalHeaderheight = !isMobile ? 80 : 48;
      const portraitMapHeight = 224;
      const top = orientation === "landscape" ? globalHeaderheight : portraitMapHeight + globalHeaderheight;
      const stickyPos = titleHeight - header?.clientHeight + top;

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
    <div className="sticky z-10 overflow-hidden bg-ex-light-grey" style={{ top: stickyTop }} ref={ref}>
      <Image
        src={props.image.url as string}
        alt={props.image.alt ? (props.image.alt as string) : props.title}
        width={props.image.dimensions!.width}
        height={props.image.dimensions!.height}
        placeholder={`data:image/svg+xml;base64,${toBase64(
          shimmer(props.image.dimensions!.width, props.image.dimensions!.height)
        )}`}
        onLoad={imageLoadComplete}
        className="w-full"
        style={{
          filter: `blur(${blur}px)`,
          transform: "scale3d(1.1, 1.1, 1.1)",
        }}
      />

      {/* Layered shadow */}
      <div
        className={`absolute top-0 h-full w-full bg-gradient-to-t from-black/50 from-0% to-black/0 to-50% ${
          !imageLoaded && "hidden"
        }`}
      ></div>

      {/* Destination */}
      <Link
        href={"/destinations/" + props.destination.uid}
        className="[&>div]:transition-[background-color] [&>div]:duration-300 [&>div]:ease-in-out hover:[&>div]:bg-opacity-50"
      >
        <Destination name={props.destination.data.title as string} classes="left-3 top-3" />
      </Link>

      <Share title={props.title} />
      <Title creator={props.creator} text={props.title} />
    </div>
  );
}
