import Link from "next/link";
import Image from "next/image";
import { Content } from "@prismicio/client";
import ThumbTab from "./ThumbTab";
import { shimmer, toBase64 } from "@/utils/shimmer";

export default function CreatorThumb({
  creator,
  size,
  classes,
}: {
  creator: Content.CreatorDocument;
  size?: string;
  classes?: string;
}) {
  const image =
    size === "featured" && creator.data.hero_image
      ? creator.data.hero_image.mobile
      : creator.data.profile_image
      ? creator.data.profile_image
      : null;

  return (
    <Link
      href={"/creators/" + creator.uid}
      className={`group/link ${size === "featured" && "w-10/12 md:w-5/12 max-w-xl"} ${classes}`}
    >
      {/* Image */}
      {image && (
        <div className="group-hover/link:bg-ex-blue">
          <Image
            src={image.url as string}
            alt={
              image.alt
                ? (image.alt as string)
                : creator.data.last_name
                ? `${creator.data.first_name} ${creator.data.last_name}`
                : (creator.data.first_name as string)
            }
            width={image.dimensions?.width}
            height={image.dimensions?.height}
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(image.dimensions?.width as number, image.dimensions?.height as number)
            )}`}
            className="group-hover/link:grayscale group-hover/link:mix-blend-lighten"
          />
        </div>
      )}

      {/* Name */}
      <p
        className={`group-hover/link:text-ex-blue transition-[color] duration-300 ease-in-out font-bold mt-2 ${
          size === "featured" ? "text-2xl md:text-3xl" : "text-xl"
        }`}
      >
        {creator.data.first_name} {creator.data.last_name?.toUpperCase()}
      </p>

      {size !== "featured" ? (
        <ThumbTab title={creator.data.title as string} location={creator.data.current_city as string} />
      ) : (
        <p>{creator.data.short_description?.substring(0, 160)}</p>
      )}
    </Link>
  );
}
