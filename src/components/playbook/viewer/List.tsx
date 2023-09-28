import Header from "./list/Header";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { Content, asLink } from "@prismicio/client";
import { components } from "@/slices";

export default function List({ data }: { data: Content.PlaybookDocumentData }) {
  return (
    <div className="w-1/2 min-[1200px]:w-[600px] portrait:w-full portrait:mt-56">
      <Header
        image={data.image}
        sliceCount={data.slices.length}
        title={data.title as string}
        creator={data.creator as unknown as Content.CreatorDocument}
      />

      <div className="grid grid-cols-1 m-3 md:m-4 mb-6 md:mb-8 gap-y-6 md:gap-y-8">
        <section className="bg-ex-blue p-2 md:p-3 [&>p]:text-white [&>p]:font-bold [&>p]:text-md [&>p]:md:text-lg">
          <PrismicRichText field={data.description} />

          <audio className="mt-3 md:mt-4 grayscale w-full" controls controlsList="nodownload">
            <source src={(data.audio as any).url as string} type="audio/mpeg" />
            Your browser does not support the audio tag.
          </audio>
        </section>

        <SliceZone slices={data.slices} components={components} context={{ creator: data.creator }} />
      </div>
    </div>
  );
}
