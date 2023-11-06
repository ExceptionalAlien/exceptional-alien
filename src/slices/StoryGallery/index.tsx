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
      <div>
        {slice.items.map((item, i) => (
          <div key={i}>
            <PrismicNextImage field={item.image} alt="" />
          </div>
        ))}
      </div>
      <div>
        {slice.primary.caption}
      </div>
    </section>
  );
};

export default StoryGallery;
