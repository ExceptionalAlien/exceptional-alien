import Image from "next/image";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { shimmer, toBase64 } from "@/utils/shimmer";

/**
 * Props for `Gem`.
 */
export type GemProps = SliceComponentProps<Content.GemSlice>;

/**
 * Component for "Gem" Slices.
 */
const Gem = ({ slice }: any): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <a href="" className="aspect-video m-3 md:m-4 flex">
        <Image
          src={slice.primary.gem.data.image.url}
          alt={slice.primary.gem.data.image.alt}
          width={slice.primary.gem.data.image.dimensions.width}
          height={slice.primary.gem.data.image.dimensions.height}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(slice.primary.gem.data.image.dimensions.width, slice.primary.gem.data.image.dimensions.height)
          )}`}
          className="h-full w-auto"
        />

        <div className="ml-2 md:ml-3">
          <h4 className="font-bold text-xl md:text-2xl leading-tight">{slice.primary.gem.data.title}</h4>
        </div>
      </a>
    </section>
  );
};

export default Gem;
