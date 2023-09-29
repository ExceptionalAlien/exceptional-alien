import Image from "next/image";
import Link from "next/link";
import { Content, ContentRelationshipField } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import TabButton from "@/components/TabButton";
import GemIcon from "@/components/GemIcon";
import { shimmer, toBase64 } from "@/utils/shimmer";

/**
 * Props for `Gem`.
 */
export type GemProps = SliceComponentProps<
  Content.GemSlice,
  {
    creator: Content.CreatorDocument;
  }
>;

/**
 * Component for "Gem" Slices.
 */
const Gem = ({ slice, context }: GemProps): JSX.Element => {
  const gem = slice.primary.gem as unknown as Content.GemDocument;
  const creator = slice.primary.creator as unknown as Content.CreatorDocument;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="gem relative"
      id={`gem-${gem.uid}`}
    >
      <GemIcon category={gem.data.category} classes="right-0 !m-0" />

      <h4 className="font-bold text-xl md:text-2xl !leading-tight mr-10 md:mr-12">{gem.data.title}</h4>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${gem.data.title}&query_place_id=${gem.data.google_maps_id}`}
        target="_blank"
        className="text-ex-grey text-sm md:text-base hover:text-ex-light-grey duration-300 ease-in-out transition-[color]"
      >
        {gem.data.address}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-[14px] md:w-4 h-[14px] md:h-4 inline-block ml-1 md:ml-[6px] align-[-1px] md:align-[-2px]"
        >
          <path
            fillRule="evenodd"
            d="M12.207 2.232a.75.75 0 00.025 1.06l4.146 3.958H6.375a5.375 5.375 0 000 10.75H9.25a.75.75 0 000-1.5H6.375a3.875 3.875 0 010-7.75h10.003l-4.146 3.957a.75.75 0 001.036 1.085l5.5-5.25a.75.75 0 000-1.085l-5.5-5.25a.75.75 0 00-1.06.025z"
            clipRule="evenodd"
          />
        </svg>
      </a>

      <div className="gem-content mt-2 md:mt-3">
        <Image
          src={gem.data.image.url as string}
          alt={gem.data.image.alt as string}
          width={gem.data.image.dimensions!.width}
          height={gem.data.image.dimensions!.height}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(gem.data.image.dimensions!.width, gem.data.image.dimensions!.height)
          )}`}
          className="relative w-2/5 float-left"
        />

        <div className="float-left pb-6 mb-6 md:mb-8 pl-3 md:pl-4 w-3/5 [&>*]:text-ex-blue [&>*]:text-sm [&>*]:md:text-base [&>*]:font-bold [&>*]:leading-snug [&>*]:md:!leading-normal">
          <PrismicRichText field={slice.primary.description} />

          {!creator.data ? (
            <p className="mt-3 md:mt-4">
              {context.creator.data.first_name} {context.creator.data.last_name?.toUpperCase()}
            </p>
          ) : (
            <Link
              href={`/creators/${creator.uid}`}
              className="block max-w-full w-max mt-3 md:mt-4 hover:opacity-50 duration-300 ease-in-out transition-opacity"
            >
              {creator.data.first_name} {creator.data.last_name?.toUpperCase()}
              <Image
                src={creator.data.profile_image.url as string}
                alt={creator.data.profile_image.alt as string}
                width={40}
                height={40}
                className={`inline-block rounded-full ml-2 w-8 md:w-10 align-[-11px] md:align-[-14px] ${
                  !creator.data.last_name && "hidden"
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
