import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `StoryTextWithHeading`.
 */
export type StoryTextWithHeadingProps = SliceComponentProps<Content.StoryTextWithHeadingSlice>;

/**
 * Component for "StoryTextWithHeading" Slices.
 */
const StoryTextWithHeading = ({ slice }: StoryTextWithHeadingProps): JSX.Element => {
  return (
    <section className="m-auto text-black md:max-w-3xl md:text-4xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl [&>p]:text-ex-grey [&>p]:mt-4 [&>p]:md:mt-6" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <PrismicRichText field={slice.primary.heading} />
      <PrismicRichText field={slice.primary.text} />
    </section>
  );
};

export default StoryTextWithHeading;
