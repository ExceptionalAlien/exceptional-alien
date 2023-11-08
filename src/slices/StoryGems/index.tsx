import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

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
      {slice.items.map((item, i) => (
        <div key={i}>
        </div>
      ))}
    </section>
  );
};

export default StoryGems;
