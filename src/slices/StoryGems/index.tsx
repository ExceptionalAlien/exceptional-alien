import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `StoryGems`.
 */
export type StoryGemsProps = SliceComponentProps<Content.StoryGemsSlice>;

/**
 * Component for "StoryGems" Slices.
 */
const StoryGems = ({ slice }: StoryGemsProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      Placeholder component for story_gems (variation: {slice.variation}) Slices
    </section>
  );
};

export default StoryGems;
