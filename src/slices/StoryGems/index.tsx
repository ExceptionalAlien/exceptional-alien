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
  return (
    <section className="grid grid-cols-2 gap-x-2 gap-y-4 md:grid-cols-3 md:gap-x-3 md:gap-y-6 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      {slice.items.map((item, i) => (
        <GemThumb
          key={i}
          gem={item.gem as unknown as Content.GemDocument}
          size="sml"
          creator={
            slice.primary.creator as unknown as Content.CreatorDocument
          }
        />
      ))}
    </section>
  );
};

export default StoryGems;