import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import StoryThumb from "@/components/shared/StoryThumb";

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
      {slice.items.map((item, i) => (
        <PrismicNextImage key={i} field={item.image} alt={""} />
      ))}
    </section>
  );
};

export default StoryGallery;
