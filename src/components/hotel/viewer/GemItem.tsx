import Image from "next/image";
import Link from "next/link";
import { Content, asText } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import TabButton from "@/components/shared/TabButton";
import GemIcon from "@/components/shared/GemIcon";
import CreatorIcon from "@/components/shared/CreatorIcon";
import { shimmer, toBase64 } from "@/utils/shimmer";
import ShowMoreButton from "@/components/shared/ShowMoreButton";

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
      {gem.data.image && (
        /*<Image
          src={gem.data.image.thumb.url as string}
          alt={gem.data.image.thumb.alt ? (gem.data.image.thumb.alt as string) : (gem.data.title as string)}
          width={gem.data.image.thumb.dimensions?.width}
          height={gem.data.image.thumb.dimensions?.height}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(
              gem.data.image.thumb.dimensions?.width as number,
              gem.data.image.thumb.dimensions?.height as number
            )
          )}`}
          className="w-full mb-5"
        />*/
        <div className="w-full h-[30vh] md:h-[40vh] bg-cover bg-no-repeat bg-center mb-5" style={{
          backgroundImage: `url('${gem.data.image.thumb.url}')`
        }} />
      )}

      <GemIcon category={gem.data.category} classes="left-7 top-7 !h-16 !w-16" />

      <div className="block pr-1 md:mr-12 md:pr-2 [&>*]:leading-tight">
        <h4 className="text-xl font-bold md:text-2xl">{gem.data.title}</h4>
        <h5>{gem.data.description}</h5>
      </div>

      {/* Address */}
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${gem.data.title}&query_place_id=${gem.data.google_maps_id}`}
        target="_blank"
        className="inline-block items-center text-pretty pr-1 text-sm text-ex-grey transition-[color] duration-300 ease-in-out hover:text-ex-light-grey md:mr-12 md:pr-2 md:text-base"
      >
        {gem.data.address}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="ml-1 inline h-4 w-4 align-[-3px]"
        >
          <path
            fillRule="evenodd"
            d="M12.207 2.232a.75.75 0 00.025 1.06l4.146 3.958H6.375a5.375 5.375 0 000 10.75H9.25a.75.75 0 000-1.5H6.375a3.875 3.875 0 010-7.75h10.003l-4.146 3.957a.75.75 0 001.036 1.085l5.5-5.25a.75.75 0 000-1.085l-5.5-5.25a.75.75 0 00-1.06.025z"
            clipRule="evenodd"
          />
        </svg>
      </a>

      {/* Details */}
      <div className="gem-content mt-1 md:mt-2">

        <div className={`gem-text w-full text-justify sm:w-4/5 [&>p]:text-sm [&>p]:!text-black mb-4 sm:mb-2`}>
          <PrismicRichText field={slice.primary.description} />

          {/* !creator.data && asText(slice.primary.description).charAt(0) === '"' ? (
            <p className="mt-2 !text-sm !font-normal md:mt-3 md:!text-base">
              {context.creator.data.first_name} {context.creator.data.last_name?.toUpperCase()}
            </p>
          ) : (
            creator.uid && (
              <Link
                href={`/contributors/${creator.uid}`}
                className="float-right mt-2 transition-[opacity] duration-300 ease-in-out hover:opacity-60 md:mt-3"
              >
                <CreatorIcon
                  firstName={creator.data.first_name as string}
                  lastName={creator.data.last_name as string}
                  image={creator.data.profile_image}
                  classes="[&>p]:text-ex-blue [&>img]:h-10 [&>img]:w-10 [&>img]:border-ex-blue"
                />
              </Link>
            )
          )*/}
        </div>

        <div className="relative w-auto flex justify-end">
          <ShowMoreButton text="Show More" route={"/gems/" + gem.uid} classes="" />
        </div>
      </div>
    </section>
  );
};

export default Gem;
