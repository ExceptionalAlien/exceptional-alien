import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `VideoEmbed`.
 */
export type VideoEmbedProps = SliceComponentProps<Content.VideoEmbedSlice>;

/**
 * Component for "VideoEmbed" Slices.
 */
const VideoEmbed = ({ slice }: VideoEmbedProps): JSX.Element => {
  return (
    <section
      className="[&>div>iframe]:w-full [&>div>iframe]:h-full"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div
        className="w-full aspect-video"
        dangerouslySetInnerHTML={{ __html: slice.primary.embed.html as TrustedHTML }}
      />
    </section>
  );
};

export default VideoEmbed;
