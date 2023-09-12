import Image from "next/image";
import { ImageField } from "@prismicio/client";
import { shimmer, toBase64 } from "@/utils/shimmer";
import useWindowDimensions from "@/utils/useWindowDimensions";

export default function Hero({ image }: { image: ImageField<"mobile"> }) {
  const { width } = useWindowDimensions();
  const crop = width && width >= 768 ? image : image.mobile; // Different crops for mobile and DT

  return (
    <section className="relative !mt-4 md:!mt-6 !pl-0 !pr-0 aspect-[4/3] md:aspect-[2/1]">
      {width && (
        <Image
          src={crop.url as string}
          alt={crop.alt as string}
          width={crop.dimensions?.width}
          height={crop.dimensions?.height}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(crop.dimensions?.width as number, crop.dimensions?.height as number)
          )}`}
        />
      )}

      {/* Credit */}
      <p className="absolute bg-black text-white backdrop-blur bg-opacity-20 bottom-0 right-0 p-1 pl-2 pr-2 font-mono text-xs">
        {image.copyright ? image.copyright : "Photo: " + crop.alt}
      </p>
    </section>
  );
}
