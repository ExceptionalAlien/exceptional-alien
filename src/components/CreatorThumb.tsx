import Link from "next/link";
import Image from "next/image";
import { ImageField } from "@prismicio/client";
import TabHeading from "@/components/TabHeading";
import MachineCode from "@/components/MachineCode";
import { shimmer, toBase64 } from "@/utils/shimmer";

interface PrismicImage {
  thumb: ImageField;
  mobile: ImageField;
}

export interface DataProps {
  uid: string;
  first_name: string;
  last_name: string;
  image: PrismicImage;
  title: string;
  home_city: string;
  current_city: string;
  home_country: string;
}

export default function CreatorThumb(props: { data: DataProps; uid?: string; size?: string; classes?: string }) {
  const image = props.size === "mobile" ? props.data.image.mobile : props.data.image.thumb;

  return (
    <Link
      href={"/creators/" + (props.uid ? props.uid : props.data.uid)}
      className={`group/link ${props.size === "mobile" && "w-2/3 md:w-5/12 min-w-[320px] md:min-w-[512px] max-w-2xl"} ${
        props.classes
      }`}
    >
      {image.url && (
        <div className="bg-ex-blue">
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

      <p
        className={`group-hover/link:text-ex-blue transition-[color] duration-300 ease-in-out font-bold mt-2 ${
          props.size === "mobile" ? "text-xl md:text-3xl" : "text-xl"
        }`}
      >
        {props.data.first_name} {props.data.last_name?.toUpperCase()}
      </p>

      <TabHeading
        classes={`mt-1 group-hover/link:text-ex-blue group-hover/link:border-ex-blue duration-300 ease-in-out ${
          props.size !== "mobile" && "!pt-1 !pl-[6px] !h-9"
        }`}
      >
        <p>{props.data.title}</p>

        <p className="uppercase">
          {props.data.home_city && props.size === "mobile" && `${props.data.home_city} ${"\u2794"} `}
          {props.data.current_city}
        </p>

        {props.size === "mobile" && (
          <MachineCode
            firstName={props.data.first_name}
            lastName={props.data.last_name}
            country={props.data.home_country}
            classes="absolute right-2 top-[6px] !text-xs hidden md:inline"
          />
        )}
      </TabHeading>
    </Link>
  );
}
