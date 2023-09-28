import Header from "./list/Header";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { Content, asLink } from "@prismicio/client";
import { components } from "@/slices";

export default function List({ data }: { data: Content.PlaybookDocumentData }) {
  const audio = (data.audio as any).url as string;

  return (
    <div className="w-1/2 min-[1200px]:w-[600px] portrait:w-full portrait:mt-56">
      <Header
        image={data.image}
        sliceCount={data.slices.length}
        title={data.title as string}
        creator={data.creator as unknown as Content.CreatorDocument}
      />

      <div className="grid grid-cols-1 m-3 md:m-4 mb-6 md:mb-8 gap-y-6 md:gap-y-8">
        <section
          className={`grid grid-cols-1 gap-y-3 [&_p]:font-bold [&>p]:text-md [&>p]:md:text-lg ${
            data.description.length === 0 && !audio && "hidden"
          }`}
        >
          {data.description.length !== 0 && <PrismicRichText field={data.description} />}

          {audio && (
            <div className="bg-ex-grey p-3">
              <p className="text-white text-xl">
                Listen
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 inline-block ml-1 align-[-3px]"
                >
                  <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
                  <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z" />
                </svg>
              </p>

              <audio className="mt-1 md:mt-2 grayscale w-full" controls controlsList="nodownload">
                <source src={audio} type="audio/mpeg" />
                Your browser does not support the audio tag.
              </audio>
            </div>
          )}
        </section>

        <SliceZone slices={data.slices} components={components} context={{ creator: data.creator }} />
      </div>
    </div>
  );
}
