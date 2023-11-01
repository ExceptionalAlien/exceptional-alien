import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `StoryParagraph`.
 */
export type StoryParagraphProps = SliceComponentProps<Content.StoryParagraphSlice>;

/**
 * Component for "StoryParagraph" Slices.
 */
const StoryParagraph = ({ slice }: StoryParagraphProps): JSX.Element => {
  return (
    <section className="" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <PrismicRichText field={slice.primary.text} />
    </section>
  );
};

export default StoryParagraph;
