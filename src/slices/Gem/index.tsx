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
const Gem = ({ slice }: any): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative m-2 md:m-4 mt-4 md:mt-8"
    >
      <GemIcon category={slice.primary.gem.data.category} classes="right-0 w-10 md:w-11" />
      <p className="text-sm text-ex-grey font-bold">{slice.primary.gem.data.category}</p>
      <h4 className="font-bold text-xl md:text-2xl leading-tight mr-11 md:mr-12">{slice.primary.gem.data.title}</h4>

      <div className="mt-1 md:mt-2">
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

          <Credit text={slice.primary.gem.data.image.copyright ? slice.primary.gem.data.image.copyright : ""} />
        </div>

        <div className="float-left pl-2 md:pl-4 w-3/5 [&>p]:text-sm [&>p]:md:text-base [&>p]:leading-snug [&>p]:md:leading-normal">
          <PrismicRichText field={slice.primary.description} />
          <TabButton text="MORE INFO" route="/" classes="mt-2 md:mt-4" />
        </div>

        <div className="clear-both"></div>
      </div>
    </section>
  );
};

export default Gem;
