import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `StoryTextWithHeading`.
 */
export type StoryTextWithHeadingProps = SliceComponentProps<Content.StoryTextWithHeadingSlice>;

/**
 * Component for "StoryTextWithHeading" Slices.
 */
const StoryTextWithHeading = ({ slice }: StoryTextWithHeadingProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      Placeholder component for story_text_with_heading (variation: {slice.variation}) Slices
    </section>
  );
};

export default StoryTextWithHeading;
