import Link from "next/link";
import Image from "next/image";
import { ImageField } from "@prismicio/client";
import { shimmer, toBase64 } from "@/utils/shimmer";
import Tab from "./creator-thumb/Tab";

interface PrismicImage {
  mobile: ImageField;
}

export interface DataProps {
  uid: string;
  first_name: string;
  last_name: string;
  hero_image: PrismicImage;
  profile_image: ImageField;
  title: string;
  home_city: string;
  current_city: string;
  home_country: string;
}

export default function CreatorThumb(props: { data: DataProps; uid?: string; size?: string; classes?: string }) {
  const image = props.size === "mobile" ? props.data.hero_image.mobile : props.data.profile_image;

  return (
    <Link
      href={"/creators/" + (props.uid ? props.uid : props.data.uid)}
      className={`group/link ${props.size === "mobile" && "w-10/12 sm:w-5/12 md:w-2/3 max-w-2xl"} ${props.classes}`}
    >
      {/* Image */}
      {image.url && (
        <div className="group-hover/link:bg-ex-blue">
          <Image
            src={image.url as string}
            alt=""
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
          props.size === "mobile" ? "text-xl md:text-3xl" : "text-xl"
        }`}
      >
        {props.data.first_name} {props.data.last_name?.toUpperCase()}
      </p>

      <Tab
        title={props.data.title}
        size={props.size as string}
        homeCity={props.data.home_city}
        currentCity={props.data.current_city}
        firstName={props.data.first_name}
        lastName={props.data.last_name}
        homeCountry={props.data.home_country}
      />
    </Link>
  );
}
