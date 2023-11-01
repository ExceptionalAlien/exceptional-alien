import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `StoryHighlight`.
 */
export type StoryHighlightProps = SliceComponentProps<Content.StoryHighlightSlice>;

/**
 * Component for "StoryHighlight" Slices.
 */
const StoryHighlight = ({ slice }: StoryHighlightProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      Placeholder component for story_highlight (variation: {slice.variation}) Slices
    </section>
  );
};

export default StoryHighlight;
