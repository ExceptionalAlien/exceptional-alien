import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

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
      Placeholder component for story_gallery (variation: {slice.variation}) Slices
    </section>
  );
};

export default StoryGallery;
