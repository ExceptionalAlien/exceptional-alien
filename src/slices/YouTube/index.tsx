import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `YouTube`.
 */
export type YouTubeProps = SliceComponentProps<Content.YouTubeSlice>;

/**
 * Component for "YouTube" Slices.
 */
const YouTube = ({ slice }: YouTubeProps): JSX.Element => {
  return (
    <section
      className="[&>iframe]:w-full [&>iframe]:aspect-video"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <iframe
        src={
          slice.primary.embed.embed_url.replace("youtube.com", "youtube-nocookie.com").replace("/watch?v=", "/embed/") +
          "?color=white&controls=0&rel=0"
        }
        title={slice.primary.embed.title!}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </section>
  );
};

export default YouTube;
