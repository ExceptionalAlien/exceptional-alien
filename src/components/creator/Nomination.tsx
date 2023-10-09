import Image from "next/image";
import Link from "next/link";
import { Content } from "@prismicio/client";

export default function Nomination({ creator }: { creator: Content.CreatorDocument }) {
  return (
    <section className="text-right !mt-0 mb-3">
      <Link href={"/creators/" + creator.uid} className="group/link [&>*]:inline-block">
        <p className="text-sm group-hover/link:text-ex-light-grey duration-300 ease-in-out transition-[color]">
          <span className="block text-xs">Nominated by</span>
          {creator.data.first_name} {creator.data.last_name?.toUpperCase()}
        </p>

        <Image
          src={creator.data.profile_image.url as string}
          alt={
            creator.data.profile_image.alt
              ? (creator.data.profile_image.alt as string)
              : creator.data.last_name
              ? `${creator.data.first_name} ${creator.data.last_name}`
              : (creator.data.first_name as string)
          }
          width={40}
          height={40}
          className="rounded-full ml-2 align-[-7px] group-hover/link:opacity-50 duration-300 ease-in-out transition-[opacity]"
        />
      </Link>
    </section>
  );
}
