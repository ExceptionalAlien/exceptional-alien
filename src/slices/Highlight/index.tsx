import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";

/**
 * Props for `Highlight`.
 */
export type HighlightProps = SliceComponentProps<Content.HighlightSlice>;

/**
 * Component for "Highlight" Slices.
 */
const Highlight = ({ slice }: HighlightProps): JSX.Element => {
  return (
    <section
      className="m-auto text-2xl font-bold text-ex-blue md:max-w-3xl md:text-4xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl [&>p]:mt-4 [&>p]:md:mt-6"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.text} />
    </section>
  );
};

export default Highlight;
