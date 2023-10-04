import { useEffect, useState } from "react";
import Image from "next/image";
import { EmptyImageFieldImage, FilledImageFieldImage, ImageField } from "@prismicio/client";
import Credit from "./Credit";
import { shimmer, toBase64 } from "@/utils/shimmer";

export default function Hero({ image }: { image: ImageField<"mobile"> }) {
  const [crop, setCrop] = useState<FilledImageFieldImage | EmptyImageFieldImage>();

  useEffect(() => {
    const handleResize = () => {
      setCrop(window.innerWidth >= 768 ? image : image.mobile); // Different image crops for mobile and DT
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [image]);

  return (
    <section className="relative !mt-4 md:!mt-6 !pl-0 !pr-0 aspect-[4/3] md:aspect-[2/1]">
      {crop && (
        <Image
          src={crop.url as string}
          alt={crop.alt as string}
          width={crop.dimensions!.width}
          height={crop.dimensions!.height}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(crop.dimensions!.width, crop.dimensions!.height)
          )}`}
        />
      )}

      <Credit text={image.copyright ? image.copyright : "Photo: " + crop?.alt} />
    </section>
  );
}
