import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";

/**
 * Props for `StoryHighlight`.
 */
export type StoryHighlightProps = SliceComponentProps<Content.StoryHighlightSlice>;

/**
 * Component for "StoryHighlight" Slices.
 */
const StoryHighlight = ({ slice }: StoryHighlightProps): JSX.Element => {
  return (
    <section className="" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <PrismicRichText field={slice.primary.text} />
    </section>
  );
};

export default StoryHighlight;
