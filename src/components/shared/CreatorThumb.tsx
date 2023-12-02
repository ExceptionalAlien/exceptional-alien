import Link from "next/link";
import Image from "next/image";
import { Content } from "@prismicio/client";
import ThumbTab from "./ThumbTab";
import { shimmer, toBase64 } from "@/utils/shimmer";

interface CreatorThumbProps {
  creator: Content.CreatorDocument;
  size?: string; // lrg or sml
  classes?: string;
}

export default function CreatorThumb(props: CreatorThumbProps) {
  const image =
    props.creator.data && props.creator.data.hero_image
      ? props.creator.data.hero_image.mobile
      : props.creator.data && props.creator.data.profile_image
      ? props.creator.data.profile_image
      : null; // Prismic image size/crop

  return (
    <Link
      href={"/contributors/" + props.creator.uid}
      className={`group/link max-w-xl ${props.size === "lrg" && "w-10/12 md:w-5/12"} ${props.classes}`}
    >
      {/* Image */}
      {image && (
        <div className="group-hover/link:bg-ex-blue">
          <Image
            src={image.url as string}
            alt={
              image.alt
                ? (image.alt as string)
                : props.creator.data.last_name
                ? `${props.creator.data.first_name} ${props.creator.data.last_name}`
                : (props.creator.data.first_name as string)
            }
            width={image.dimensions?.width}
            height={image.dimensions?.height}
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(image.dimensions?.width as number, image.dimensions?.height as number)
            )}`}
            className="group-hover/link:mix-blend-lighten group-hover/link:grayscale"
          />
        </div>
      )}

      {/* Name */}
      <p
        className={`mt-1 font-bold group-hover/link:text-ex-blue md:mt-2 ${
          props.size === "lrg" ? "text-2xl md:text-4xl" : "text-xl md:text-2xl"
        }`}
      >
        {props.creator.data.first_name} {props.creator.data.last_name?.toUpperCase()}
      </p>

      {!props.size || props.size === "sml" ? (
        <ThumbTab
          title={props.creator.data.title as string}
          location={props.creator.data.current_city as string}
          classes="capitalize"
        />
      ) : (
        <p className="text-ex-grey">
          {props.creator.data.short_description?.substring(0, 160)}
          {props.creator.data.short_description && props.creator.data.short_description.length > 160 && "..."}
        </p>
      )}
    </Link>
  );
}
