import Link from "next/link";
import Image from "next/image";
import { shimmer, toBase64 } from "@/utils/shimmer";
import Tab from "./creator-thumb/Tab";

export default function CreatorThumb({
  data,
  uid,
  size,
  classes,
}: {
  data: Record<string, any>;
  uid?: string;
  size?: string;
  classes?: string;
}) {
  const image = size === "mobile" ? data.hero_image.mobile : data.profile_image;

  return (
    <Link
      href={"/creators/" + (uid ? uid : data.uid)}
      className={`group/link ${size === "mobile" && "w-10/12 md:w-5/12 max-w-xl"} ${classes}`}
    >
      {/* Image */}
      {image.url && (
        <div className="group-hover/link:bg-ex-blue">
          <Image
            src={image.url}
            alt={image.alt}
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
        {data.first_name} {data.last_name?.toUpperCase()}
      </p>

      {size !== "mobile" ? (
        <Tab
          title={data.title}
          homeCity={data.home_city}
          currentCity={data.current_city}
          firstName={data.first_name}
          lastName={data.last_name}
          homeCountry={data.home_country}
        />
      ) : (
        <p>{data.short_description.substring(0, 160)}</p>
      )}
    </Link>
  );
}
