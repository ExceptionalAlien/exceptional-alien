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
      className="[&>*]:text-ex-grey [&>h4]:text-xl [&>p]:mt-4 [&_li]:mt-4 [&>ul]:list-disc [&>ul]:pl-8 [&>ol]:list-decimal [&>ol]:pl-8 [&_a]:underline"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.heading} />
      <PrismicRichText field={slice.primary.text} />
    </section>
  );
};

export default TextWithHeading;
