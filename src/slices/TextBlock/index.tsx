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
      className="text-ex-grey [&>ol]:mt-4 [&>ol]:list-decimal [&>ol]:pl-8 [&>p>a]:underline [&>p>a]:transition-[color] [&>p>a]:duration-300 [&>p>a]:ease-in-out hover:[&>p>a]:text-ex-light-grey [&>p]:mt-4 [&>ul]:mt-4 [&>ul]:list-disc [&>ul]:pl-8"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.text} />
    </section>
  );
};

export default TextBlock;
