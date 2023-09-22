import Image from "next/image";
import Link from "next/link";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import TabButton from "@/components/TabButton";
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
      <GemIcon category={slice.primary.gem.data.category} classes="right-0 !w-9 md:!w-11" />
      <h4 className="font-bold text-xl md:text-2xl !leading-tight mr-10 md:mr-12">{slice.primary.gem.data.title}</h4>
      <p className="text-ex-grey text-sm md:text-base">{slice.primary.gem.data.address}</p>

      <div className="mt-2 md:mt-3">
        <Image
          src={slice.primary.gem.data.image.url}
          alt={slice.primary.gem.data.image.alt}
          width={slice.primary.gem.data.image.dimensions.width}
          height={slice.primary.gem.data.image.dimensions.height}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(slice.primary.gem.data.image.dimensions.width, slice.primary.gem.data.image.dimensions.height)
          )}`}
          className="relative w-2/5 float-left"
        />

        <div className="float-left pb-6 mb-6 md:mb-8 pl-3 md:pl-4 w-3/5 [&>*]:text-ex-blue [&>*]:text-sm [&>*]:md:text-base [&>*]:font-bold [&>*]:leading-snug [&>*]:md:!leading-normal">
          <PrismicRichText field={slice.primary.description} />

          {!slice.primary.creator.data ? (
            <p className="mt-3 md:mt-4">
              {context.creator.data.first_name} {context.creator.data.last_name?.toUpperCase()}
            </p>
          ) : (
            <Link
              href={`/creators/${slice.primary.creator.data ? slice.primary.creator.uid : context.creator.data.uid}`}
              className="block max-w-full w-max mt-3 md:mt-4 hover:opacity-50 duration-300 ease-in-out transition-opacity"
            >
              {slice.primary.creator.data.first_name} {slice.primary.creator.data.last_name?.toUpperCase()}
              <Image
                src={
                  slice.primary.creator.data
                    ? slice.primary.creator.data.profile_image.url
                    : context.creator.data.profile_image.url
                }
                alt={
                  slice.primary.creator.data
                    ? slice.primary.creator.data.profile_image.alt
                    : context.creator.data.profile_image.alt
                }
                width={40}
                height={40}
                className={`inline-block rounded-full ml-2 w-8 md:w-10 align-[-11px] md:align-[-14px] ${
                  !slice.primary.creator.data.last_name && "hidden"
                }`}
              />
            </Link>
          )}
        </div>

        <div className="clear-both"></div>

        <div className="w-3/5 !absolute bottom-0 right-0">
          <TabButton text="MORE INFO" route="/" classes="ml-3 md:ml-4" />
        </div>
      </div>
    </section>
  );
};

export default Gem;
