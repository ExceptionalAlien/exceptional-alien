import Image from "next/image";
import Link from "next/link";
import { Content } from "@prismicio/client";

export default function Nomination({ creator }: { creator: Content.CreatorDocument }) {
  return (
    <section className="text-right !mt-0 mb-3">
      <Link
        href={"/creators/" + creator.uid}
        className="[&>*]:inline-block hover:opacity-50 duration-300 ease-in-out transition-opacity"
      >
        <p className="text-sm">
          <span className="block text-xs">Nominated by</span>
          {creator.data.first_name} {creator.data.last_name?.toUpperCase()}
        </p>

        <Image
          src={creator.data.profile_image.url as string}
          alt={creator.data.profile_image.alt as string}
          width={40}
          height={40}
          className="rounded-full ml-2 align-[-7px]"
        />
      </Link>
    </section>
  );
}
