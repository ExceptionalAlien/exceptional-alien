import { Content } from "@prismicio/client";
import Creator from "./title/Creator";

export default function Title({ creator, text }: { creator: Content.CreatorDocument; text: string }) {
  return (
    <div className="absolute w-full h-16 md:h-20 overflow-hidden bottom-0 flex justify-between items-center">
      <h2 className="w-3/5 font-bold pl-3 md:pl-4 max-[320px]:text-lg text-xl md:text-2xl !leading-tight">
        {text.substring(0, 50)}
      </h2>

      <Creator
        uid={creator.uid}
        firstName={creator.data.first_name as string}
        lastName={creator.data.last_name as string}
        image={creator.data.profile_image}
      />
    </div>
  );
}
