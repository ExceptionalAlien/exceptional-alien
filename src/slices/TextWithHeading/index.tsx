import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";

/**
 * Props for `TextWithHeading`.
 */
export type TextWithHeadingProps = SliceComponentProps<Content.TextWithHeadingSlice>;

/**
 * Component for "TextWithHeading" Slices.
 */
const TextWithHeading = ({ slice }: TextWithHeadingProps): JSX.Element => {
  return (
    <section
      className={`text-ex-grey [&>p]:mt-4 [&>ul]:mt-4 [&>ul]:list-disc [&>ul]:pl-8 [&>ol]:mt-4 [&>ol]:list-decimal [&>ol]:pl-8 [&_a]:underline hover:[&_a]:text-ex-light-grey [&_a]:transition-[color] [&_a]:ease-in-out [&_a]:duration-300 ${
        slice.variation === "columns"
          ? "[&>h4]:font-bold [&>h4]:text-2xl [&>h4]:sm:float-left [&>h4]:sm:w-1/3 [&>h4]:sm:pr-6 [&>p]:sm:float-right [&>p]:sm:w-2/3 [&>ul]:sm:float-right [&>ul]:sm:w-2/3 [&>ol]:sm:float-right [&>ol]:sm:w-2/3 [&>*:nth-child(2)]:sm:mt-0"
          : "[&>h4]:text-xl"
      }`}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.heading} />
      <PrismicRichText field={slice.primary.text} />
      <div className="clear-both"></div>
    </section>
  );
};

export default TextWithHeading;
