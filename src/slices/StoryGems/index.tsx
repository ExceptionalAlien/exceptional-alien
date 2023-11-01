import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import GemThumb from "@/components/shared/GemThumb";

/**
 * Props for `StoryGems`.
 */
export type StoryGemsProps = SliceComponentProps<Content.StoryGemsSlice>;

/**
 * Component for "StoryGems" Slices.
 */
const StoryGems = ({ slice }: StoryGemsProps): JSX.Element => {
  console.log(slice)
  return (
    <section className="" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      { slice.items.map((item, i) => (
        <></>
      ))}
    </section>
  );
};

export default StoryGems;
