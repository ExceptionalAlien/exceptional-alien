import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `StoryParagraph`.
 */
export type StoryParagraphProps = SliceComponentProps<Content.StoryParagraphSlice>;

/**
 * Component for "StoryParagraph" Slices.
 */
const StoryParagraph = ({ slice }: StoryParagraphProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      Placeholder component for story_paragraph (variation: {slice.variation}) Slices
    </section>
  );
};

export default StoryParagraph;
