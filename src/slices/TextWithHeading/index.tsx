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
      className={`text-ex-grey [&>h4]:text-lg [&>h4]:md:text-2xl [&>ol]:mt-4 [&>ol]:list-decimal [&>ol]:pl-8 [&>p>a]:underline [&>p>a]:transition-[color] [&>p>a]:duration-300 [&>p>a]:ease-in-out hover:[&>p>a]:text-ex-light-grey [&>p]:mt-4 [&>ul]:mt-4 [&>ul]:list-disc [&>ul]:pl-8 ${
        slice.variation === "columns" &&
        "[&>*:nth-child(2)]:md:mt-0 [&>h4]:font-bold [&>h4]:md:float-left [&>h4]:md:w-1/3 [&>h4]:md:pr-6 [&>ol]:md:float-right [&>ol]:md:w-2/3 [&>p]:md:float-right [&>p]:md:w-2/3 [&>ul]:md:float-right [&>ul]:md:w-2/3"
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
