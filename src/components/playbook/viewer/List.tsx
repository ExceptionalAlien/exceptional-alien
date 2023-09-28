import Header from "./list/Header";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { Content } from "@prismicio/client";
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
        <section>
          <PrismicRichText field={data.description} />
        </section>

        <SliceZone slices={data.slices} components={components} context={{ creator: data.creator }} />
      </div>
    </div>
  );
}
