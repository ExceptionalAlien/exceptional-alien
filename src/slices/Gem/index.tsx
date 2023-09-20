import Image from "next/image";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import TabButton from "@/components/TabButton";
import Credit from "@/components/Credit";
import GemIcon from "@/components/GemIcon";
import { shimmer, toBase64 } from "@/utils/shimmer";

/**
 * Props for `Gem`.
 */
export type GemProps = SliceComponentProps<Content.GemSlice>;

/**
 * Component for "Gem" Slices.
 */
const Gem = ({ slice, context }: any): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="relative">
      <GemIcon category={slice.primary.gem.data.category} classes="right-0 w-9 md:w-11" />

      <h4 className="font-bold text-xl md:text-2xl !leading-tight mr-10 md:mr-12">{slice.primary.gem.data.title}</h4>
      <p className="text-ex-grey text-sm md:text-base">{slice.primary.gem.data.address}</p>

      <div className="mt-2 md:mt-3">
        <div className="relative w-2/5 float-left">
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

        <div className="float-left pl-3 md:pl-4 w-3/5 [&>p]:text-ex-blue text-sm [&>p]:md:text-base [&>p]:leading-snug [&>p]:md:!leading-normal">
          <PrismicRichText field={slice.primary.description} />
          <p className="mt-2 md:mt-3 font-bold">
            {slice.primary.creator.data ? slice.primary.creator.data.first_name : context.creator.first_name}{" "}
            {slice.primary.creator.data ? slice.primary.creator.data.last_name : context.creator.last_name}
          </p>
          {/*<TabButton text="MORE INFO" route="/" classes="mt-3 md:mt-4" />*/}
        </div>

        <div className="clear-both"></div>
      </div>
    </section>
  );
};

export default Gem;
