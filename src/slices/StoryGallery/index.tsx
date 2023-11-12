import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `StoryGallery`.
 */
export type StoryGalleryProps = SliceComponentProps<Content.StoryGallerySlice>;

/**
 * Component for "StoryGallery" Slices.
 */
const StoryGallery = ({ slice }: StoryGalleryProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {slice.items.map((item, i) => (
          <div key={i}>
            <PrismicNextImage className="h-80 max-w-full rounded-lg" field={item.image} alt="" />
          </div>
        ))}
      </div>

      <div className="m-auto text-center mt-10 mb-10 text-ex-grey text-xs">
        {slice.primary.caption}
      </div>
    </section>
  );
};

export default StoryGallery;
