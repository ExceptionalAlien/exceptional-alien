import Link from "next/link";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import Header from "./list/Header";
import Audio from "./list/Audio";
import Story from "@/img/icon-story.svg";

interface ListProps {
  data: Content.PlaybookDocumentData;
}

export default function List(props: ListProps) {
  return (
    <div className="w-1/2 min-[1152px]:w-[576px] portrait:mt-56 portrait:w-full">
      <Header
        image={props.data.image}
        title={props.data.title as string}
        creator={props.data.creator as unknown as Content.CreatorDocument}
        destination={props.data.destination as unknown as Content.DestinationDocument}
      />

      <div className="m-2 my-4 grid gap-y-6 md:m-3 md:my-6 md:gap-y-9">
        <section className="grid gap-y-2 md:gap-y-3 [&>p]:text-ex-grey">
          {props.data.description.length !== 0 && <PrismicRichText field={props.data.description} />}
          {(props.data.audio as any).url && <Audio file={(props.data.audio as any).url as string} />}

          {/* <Link
            href="/"
            className="flex h-9 items-center justify-center rounded-full border border-ex-blue pl-3 pr-3 text-ex-blue transition-[background-color,color] duration-300 ease-in-out hover:bg-ex-blue hover:text-white md:w-max"
          >
            <Story className="mr-[6px] h-5 w-5" />
            Read the Interview
  </Link> */}
        </section>

        <SliceZone slices={props.data.slices} components={components} context={{ creator: props.data.creator }} />
      </div>
    </div>
  );
}
