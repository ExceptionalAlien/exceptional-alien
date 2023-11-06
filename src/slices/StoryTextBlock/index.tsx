import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `StoryTextBlock`.
 */
export type StoryTextBlockProps = SliceComponentProps<Content.StoryTextBlockSlice>;

/**
 * Component for "StoryTextBlock" Slices.
 */
const StoryTextBlock = ({ slice }: StoryTextBlockProps): JSX.Element => {
  return (
    <section className="m-auto text-black md:max-w-3xl md:text-4xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl [&>p]:mt-4 [&>p]:md:mt-6" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <PrismicRichText field={slice.primary.text} />
    </section>
  );
};

export default StoryTextBlock;
