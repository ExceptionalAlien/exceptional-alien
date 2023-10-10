import Link from "next/link";
import { Content } from "@prismicio/client";
import CreatorIcon from "@/components/shared/CreatorIcon";

export default function Title({ creator, text }: { creator: Content.CreatorDocument; text: string }) {
  return (
    <div className="absolute w-full h-16 md:h-20 overflow-hidden bottom-0 flex justify-between items-center">
      <h2 className="w-3/5 text-white box-content font-bold pl-3 md:pl-4 max-[320px]:text-lg text-xl md:text-2xl landscape:text-lg landscape:md:text-2xl !leading-tight">
        {text.substring(0, 50)}
      </h2>

      <Link
        href={"/creators/" + creator.uid}
        className="w-2/5 hover:opacity-50 duration-300 ease-in-out transition-[opacity]"
      >
        <CreatorIcon
          firstName={creator.data.first_name as string}
          lastName={creator.data.last_name as string}
          image={creator.data.profile_image}
        />
      </Link>
    </div>
  );
}
