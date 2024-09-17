import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Content, ImageField } from "@prismicio/client";
import Share from "@/components/shared/Share";
import Destination from "@/components/shared/Destination";
import ImageShadow from "@/components/shared/ImageShadow";
import CreatorIcon from "@/components/shared/CreatorIcon";
import { shimmer, toBase64 } from "@/utils/shimmer";

type HeaderProps = {
  image: ImageField;
  title: string;
  creator: Content.CreatorDocument;
  destination: Content.DestinationDocument;
  logo?: ImageField | undefined;
};

export default function Header(props: HeaderProps) {
  const [stickyTop, setStickyTop] = useState(0);
  const [blur, setBlur] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResizeAndScroll = (e?: Event) => {
      const header = ref.current!;
      const isMobile = window.innerWidth >= 768 ? false : true;
      const orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
      const titleHeight = !isMobile ? 80 : 64;
      const globalHeaderheight = !isMobile ? 80 : 48;
      const portraitMapHeight = isMobile ? 240 : 384;
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
    <div className="z-10 overflow-hidden bg-white p-5" style={{ top: stickyTop }} ref={ref}> {/* was `sticky bg-ex-light-grey` */}
      {props.image && (
        <Image
          src={props.image.url as string}
          alt={props.image.alt ? (props.image.alt as string) : props.title}
          width={props.image.dimensions?.width}
          height={props.image.dimensions?.height}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(props.image.dimensions?.width as number, props.image.dimensions?.height as number)
          )}`}
          className="w-full"
          /*style={{
            filter: `blur(${blur}px)`,
            transform: "scale3d(1.1, 1.1, 1.1)",
          }}*/
        />
      )}

      {/* <ImageShadow size={props.logo ? "full" : "bottom"} /> */}

      {/* Destination */}
      {props.destination.uid && !props.logo && (
        <Link
          href={"/destinations/" + props.destination.uid}
          className="[&>div]:transition-[background-color] [&>div]:duration-300 [&>div]:ease-in-out hover:[&>div]:bg-opacity-50"
        >
          <Destination name={props.destination.data.title as string} classes="m-2 md:m-3" />
        </Link>
      )}

      <Share title={props.title} route="travel-playbooks" classes="absolute right-2 top-2 md:right-3 md:top-3" />

      {/* Logo */}
      {false && props.logo && (
        <Image
          src={props.logo?.url as string}
          width={props.logo?.dimensions?.width}
          height={props.logo?.dimensions?.height}
          alt={props.title}
          className="absolute top-0 m-2 h-20 w-20 md:m-3 md:h-24 md:w-24"
          style={{
            objectFit: "contain",
          }}
        />
      )}

      {/* Title todo: show */}
      <div className=" hidden absolute bottom-0 flex h-16 w-full items-center justify-between md:h-20">
        <h2 className="w-3/5 pl-2 pr-2 text-xl font-bold !leading-tight text-white max-[320px]:text-lg max-[320px]:!leading-none md:pl-3 md:pr-3 md:text-2xl landscape:text-lg landscape:md:text-2xl">
          {props.title.substring(0, 50)}
        </h2>

        <Link
          href={"/contributors/" + props.creator.uid}
          className="w-2/5 transition-[opacity] duration-300 ease-in-out hover:opacity-60"
        >
          <h3>
            <CreatorIcon
              firstName={props.creator.data.first_name as string}
              lastName={props.creator.data.last_name as string}
              image={props.creator.data.profile_image}
              classes="mr-2 md:mr-3"
            />
          </h3>
        </Link>
      </div>
    </div>
  );
}
