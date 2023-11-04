import { useEffect, useState } from "react";
import Image from "next/image";
import { EmptyImageFieldImage, FilledImageFieldImage, ImageField } from "@prismicio/client";
import { shimmer, toBase64 } from "@/utils/shimmer";
import ImageShadow from "./ImageShadow";

interface HeroProps {
  image: ImageField<"mobile">;
  alt: string;
  credit: string;
  children?: any;
}

export default function Hero(props: HeroProps) {
  const [crop, setCrop] = useState<FilledImageFieldImage | EmptyImageFieldImage>();
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageLoadComplete = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setCrop(window.innerWidth >= 768 ? props.image : props.image.mobile); // Different image crops for mobile and DT
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [props.image]);

  return (
    <section className="relative !mt-0 aspect-[4/3] !pl-0 !pr-0 md:ml-6 md:mr-6 md:aspect-[2/1]">
      {crop && (
        <Image
          src={crop.url as string}
          alt={crop.alt ? (crop.alt as string) : props.alt}
          width={crop.dimensions?.width}
          height={crop.dimensions?.height}
          onLoad={imageLoadComplete}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(crop.dimensions?.width as number, crop.dimensions?.height as number)
          )}`}
        />
      )}

      <ImageShadow visible={props.children && imageLoaded ? true : false} size="top" />

      {/* Credit */}
      <p
        className={`absolute bottom-0 right-0 bg-black bg-opacity-20 p-1 pl-2 pr-2 text-right font-mono text-xs tracking-tight text-white backdrop-blur ${
          !imageLoaded && "hidden"
        }`}
      >
        Photo: {props.credit ? props.credit : props.alt}
      </p>

      <div className={`${!imageLoaded && "opacity-0"}`}>{props.children}</div>
    </section>
  );
}
