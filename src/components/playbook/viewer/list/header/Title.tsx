import Link from "next/link";
import { Content } from "@prismicio/client";
import CreatorIcon from "@/components/shared/CreatorIcon";

export default function Title({ creator, text }: { creator: Content.CreatorDocument; text: string }) {
  return (
    <div className="absolute bottom-0 flex h-16 w-full items-center justify-between overflow-hidden md:h-20">
      <h2 className="box-content w-3/5 pl-3 text-xl font-bold !leading-tight text-white max-[320px]:text-lg md:pl-4 md:text-2xl landscape:text-lg landscape:md:text-2xl">
        {text.substring(0, 50)}
      </h2>

      <Link
        href={"/creators/" + creator.uid}
        className="w-2/5 transition-[opacity] duration-300 ease-in-out hover:opacity-50"
      >
        <CreatorIcon
          firstName={creator.data.first_name as string}
          lastName={creator.data.last_name as string}
          image={creator.data.profile_image}
          classes="mr-3"
        />
      </Link>
    </div>
  );
}
