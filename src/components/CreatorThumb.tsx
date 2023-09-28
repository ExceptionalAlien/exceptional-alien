import Link from "next/link";
import Image from "next/image";
import { Content } from "@prismicio/client";
import Tab from "./creator-thumb/Tab";
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
  const image = size === "mobile" ? creator.data.hero_image.mobile : creator.data.profile_image;

  return (
    <Link
      href={"/creators/" + creator.uid}
      className={`group/link ${size === "mobile" && "w-10/12 md:w-5/12 max-w-xl"} ${classes}`}
    >
      {/* Image */}
      {image.url && (
        <div className="group-hover/link:bg-ex-blue">
          <Image
            src={image.url}
            alt={image.alt as string}
            width={image.dimensions.width}
            height={image.dimensions.height}
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(image.dimensions.width, image.dimensions.height)
            )}`}
            className="group-hover/link:grayscale group-hover/link:mix-blend-lighten"
          />
        </div>
      )}

      {/* Name */}
      <p
        className={`group-hover/link:text-ex-blue transition-[color] duration-300 ease-in-out font-bold mt-2 ${
          size === "mobile" ? "text-2xl md:text-3xl" : "text-xl"
        }`}
      >
        {creator.data.first_name} {creator.data.last_name?.toUpperCase()}
      </p>

      {size !== "mobile" ? (
        <Tab title={creator.data.title as string} currentCity={creator.data.current_city as string} />
      ) : (
        <p>{creator.data.short_description?.substring(0, 160)}</p>
      )}
    </Link>
  );
}
