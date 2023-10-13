import Link from "next/link";
import { PrismicRichText } from "@prismicio/react";
import { RichTextField } from "@prismicio/client";
import Audio from "./details/Audio";
import Story from "@/img/icon-story.svg";

export default function ListContent({ description, audio }: { description: RichTextField; audio: string }) {
  return (
    <section className="grid gap-y-5 md:gap-y-6 [&>p]:text-base [&>p]:text-ex-grey">
      {description.length !== 0 && <PrismicRichText field={description} />}
      {audio && <Audio file={audio} />}

      <Link
        href="/"
        className="text-ex-blue hover:bg-ex-blue hover:text-white duration-300 ease-in-out transition-[background-color, color] rounded-full p-2 pl-4 pr-4 border-[1.5px] border-ex-blue flex items-center justify-center md:w-max"
      >
        <Story className="h-5 w-5 inline mr-2" />
        Read the Interview
      </Link>
    </section>
  );
}
