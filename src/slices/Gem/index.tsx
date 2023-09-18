import Image from "next/image";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import TabHeading from "@/components/TabHeading";
import { shimmer, toBase64 } from "@/utils/shimmer";

/**
 * Props for `Gem`.
 */
export type GemProps = SliceComponentProps<Content.GemSlice>;

/**
 * Component for "Gem" Slices.
 */
const Gem = ({ slice }: any): JSX.Element => {
  console.log(slice.primary.gem.data);
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <div className="aspect-[40/21] flex">
        <div className="relative aspect-[3/4]">
          <Image
            src={slice.primary.gem.data.image.url}
            alt={slice.primary.gem.data.image.alt}
            width={slice.primary.gem.data.image.dimensions.width}
            height={slice.primary.gem.data.image.dimensions.height}
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(slice.primary.gem.data.image.dimensions.width, slice.primary.gem.data.image.dimensions.height)
            )}`}
          />
        </div>

        <div className="ml-2 md:ml-4 w-full relative">
          <p className="text-sm text-ex-grey font-bold">{slice.primary.gem.data.category}</p>
          <h4 className="font-bold text-xl md:text-2xl leading-tight">{slice.primary.gem.data.title}</h4>

          <TabHeading classes="!absolute bottom-0 w-full">
            <p>MORE INFO</p>
          </TabHeading>
        </div>
      </div>
    </section>
  );
};

export default Gem;
