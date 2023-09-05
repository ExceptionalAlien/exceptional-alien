import Link from "next/link";
import Image from "next/image";
import { ImageField } from "@prismicio/client";
import { shimmer, toBase64 } from "@/utils/shimmer";

interface PrismicImage {
  thumb: ImageField;
  mobile: ImageField;
}

export interface DataProps {
  first_name: string;
  last_name: string;
  uid: string;
  image: PrismicImage;
}

export default function Creator(props: { data: DataProps; size: string }) {
  const image = props.size === "mobile" ? props.data.image.mobile : props.data.image.thumb;

  return (
    <Link href={"/people/" + props.data.uid}>
      <Image
        src={image.url as string}
        alt=""
        width={image.dimensions?.width}
        height={image.dimensions?.height}
        placeholder={`data:image/svg+xml;base64,${toBase64(
          shimmer(image.dimensions?.width as number, image.dimensions?.height as number)
        )}`}
      />
    </Link>
  );
}
