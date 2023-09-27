import Image from "next/image";
import Link from "next/link";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import TabButton from "@/components/TabButton";
import GemIcon from "@/components/GemIcon";
import { shimmer, toBase64 } from "@/utils/shimmer";

/**
 * Props for `Gem`.
 */
export type GemProps = SliceComponentProps<Content.GemSlice, any>;

/**
 * Component for "Gem" Slices.
 */
const Gem = ({ slice, context }: GemProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="gem relative"
      id={`gem-${(slice.primary.gem as any).uid}`}
    >
      <GemIcon category={(slice.primary.gem as any).data.category} classes="right-0" />

      <h4 className="font-bold text-xl md:text-2xl !leading-tight mr-10 md:mr-12">
        {(slice.primary.gem as any).data.title}
      </h4>

      <p className="text-ex-grey text-sm md:text-base">{(slice.primary.gem as any).data.address}</p>

      <div className="gem-content mt-2 md:mt-3">
        <Image
          src={(slice.primary.gem as any).data.image.url as string}
          alt={(slice.primary.gem as any).data.image.alt as string}
          width={(slice.primary.gem as any).data.image.dimensions!.width}
          height={(slice.primary.gem as any).data.image.dimensions!.height}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(
              (slice.primary.gem as any).data.image.dimensions!.width,
              (slice.primary.gem as any).data.image.dimensions!.height
            )
          )}`}
          className="relative w-2/5 float-left"
        />

        <div className="float-left pb-6 mb-6 md:mb-8 pl-3 md:pl-4 w-3/5 [&>*]:text-ex-blue [&>*]:text-sm [&>*]:md:text-base [&>*]:font-bold [&>*]:leading-snug [&>*]:md:!leading-normal">
          <PrismicRichText field={slice.primary.description} />

          {!(slice.primary.creator as any).data ? (
            <p className="mt-3 md:mt-4">
              {context.creator.data.first_name} {context.creator.data.last_name?.toUpperCase()}
            </p>
          ) : (
            <Link
              href={`/creators/${
                (slice.primary.creator as any).data ? (slice.primary.creator as any).uid : context.creator.uid
              }`}
              className="block max-w-full w-max mt-3 md:mt-4 hover:opacity-50 duration-300 ease-in-out transition-opacity"
            >
              {(slice.primary.creator as any).data.first_name}{" "}
              {(slice.primary.creator as any).data.last_name?.toUpperCase()}
              <Image
                src={
                  (slice.primary.creator as any).data
                    ? ((slice.primary.creator as any).data.profile_image.url as string)
                    : (context.creator.data.profile_image.url as string)
                }
                alt={
                  (slice.primary.creator as any).data
                    ? ((slice.primary.creator as any).data.profile_image.alt as string)
                    : (context.creator.data.profile_image.alt as string)
                }
                width={40}
                height={40}
                className={`inline-block rounded-full ml-2 w-8 md:w-10 align-[-11px] md:align-[-14px] ${
                  !(slice.primary.creator as any).data.last_name && "hidden"
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
