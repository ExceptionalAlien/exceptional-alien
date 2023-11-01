import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `StoryTextWithHeading`.
 */
export type StoryTextWithHeadingProps = SliceComponentProps<Content.StoryTextWithHeadingSlice>;

/**
 * Component for "StoryTextWithHeading" Slices.
 */
const StoryTextWithHeading = ({ slice }: StoryTextWithHeadingProps): JSX.Element => {
  return (
    <section className="" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <>{slice.primary.heading}</>
      <PrismicRichText field={slice.primary.text} />
    </section>
  );
};

export default StoryTextWithHeading;
