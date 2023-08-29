import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock = ({ slice }: TextBlockProps): JSX.Element => {
  return (
    <section
      className="text-ex-grey [&>p]:mt-4 [&_li]:mt-4 [&>ul]:list-disc [&>ul]:pl-8 [&>ol]:list-decimal [&>ol]:pl-8 [&_a]:underline"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.text} />
    </section>
  );
};

export default TextBlock;
