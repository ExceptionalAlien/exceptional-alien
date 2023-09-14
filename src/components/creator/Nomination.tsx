import Image from "next/image";
import Link from "next/link";
import { ContentRelationshipField } from "@prismicio/client";

export default function Nomination({ nomination }: { nomination: ContentRelationshipField }) {
  const data = (nomination as any).data;

  return (
    <section className="text-right !mt-0 mb-3">
      <Link
        href={"/creators/" + (nomination as any).uid}
        className="[&>*]:inline-block hover:opacity-50 duration-300 ease-in-out transition-opacity"
      >
        <p className="text-sm leading-snug">
          <span className="block text-xs">Nominated by</span>
          {data.first_name} {data.last_name.toUpperCase()}
        </p>

        <Image
          src={data.profile_image.url}
          alt={data.profile_image.alt}
          width={40}
          height={40}
          className="rounded-full ml-2 align-[-7px]"
        />
      </Link>
    </section>
  );
}
