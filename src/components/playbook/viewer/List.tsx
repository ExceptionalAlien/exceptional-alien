import Link from "next/link";
import { Content, asLink } from "@prismicio/client";
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

          {props.data.video.embed_url || asLink(props.data.story) ? (
            <div
              className={`grid gap-2 md:gap-3 [&>a]:flex [&>a]:h-9 [&>a]:items-center [&>a]:justify-center [&>a]:whitespace-nowrap [&>a]:rounded-full [&>a]:border [&>a]:border-ex-blue [&>a]:pl-3 [&>a]:pr-3 [&>a]:text-ex-blue [&>a]:transition-[background-color,color] [&>a]:duration-300 [&>a]:ease-in-out hover:[&>a]:bg-ex-blue hover:[&>a]:text-white ${
                (props.data.video.embed_url && !asLink(props.data.story)) ||
                (!props.data.video.embed_url && asLink(props.data.story) ? "[&>a]:md:w-max" : "grid-cols-2")
              }`}
            >
              {props.data.video.embed_url && (
                <Link href={props.data.video.embed_url as string} target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="mr-[6px] h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                  Watch the video
                </Link>
              )}

              {asLink(props.data.story) && (
                <Link href={asLink(props.data.story) as string} target="_blank">
                  <Story className="mr-[6px] h-5 w-5" />
                  Read the Interview
                </Link>
              )}
            </div>
          ) : (
            <></>
          )}
        </section>

        <SliceZone slices={props.data.slices} components={components} context={{ creator: props.data.creator }} />
      </div>
    </div>
  );
}
