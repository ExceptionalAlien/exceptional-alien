import Link from "next/link";
import Image from "next/image";
import { ImageField } from "@prismicio/client";
import { shimmer, toBase64 } from "@/utils/shimmer";

interface PrismicImage {
  thumb: ImageField;
}

export interface DataProps {
  first_name: string;
  last_name: string;
  uid: string;
  image: PrismicImage;
}

export default function Creator(props: { data: DataProps }) {
  return (
    <Link href={"/people/" + props.data.uid} className="flex items-center justify-center bg-red-100">
      <Image
        src={props.data.image.thumb.url as string}
        alt=""
        width={props.data.image.thumb.dimensions?.width}
        height={props.data.image.thumb.dimensions?.height}
        placeholder={`data:image/svg+xml;base64,${toBase64(
          shimmer(
            props.data.image.thumb.dimensions?.width as number,
            props.data.image.thumb.dimensions?.height as number
          )
        )}`}
        className="w-full max-w-xs"
      />
    </Link>
  );
}
