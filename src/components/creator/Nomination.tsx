import Image from "next/image";
import Link from "next/link";
import { ImageField, ContentRelationshipField } from "@prismicio/client";

interface Nomination {
  first_name: string;
  last_name: string;
  profile_image: ImageField;
}

// Needed to resolve Prismic missing type for fetchLinks data
export interface FetchLinks {
  data: Nomination;
  uid: string;
}

export default function Nomination(props: { nomination: ContentRelationshipField }) {
  const data = (props.nomination as FetchLinks).data;

  return (
    <section className="text-right !mt-0 mb-3">
      <Link
        href={"/creators/" + (props.nomination as FetchLinks).uid}
        className="[&>*]:inline-block hover:opacity-50 duration-300 ease-in-out transition-opacity"
      >
        <p className="text-sm leading-snug">
          <span className="block text-xs">Nominated by</span>
          {data.first_name} {data.last_name.toUpperCase()}
        </p>

        <Image
          src={data.profile_image.url as string}
          alt={`${data.first_name} ${data.last_name}`}
          width={40}
          height={40}
          className="rounded-full ml-2 align-[-7px]"
        />
      </Link>
    </section>
  );
}
