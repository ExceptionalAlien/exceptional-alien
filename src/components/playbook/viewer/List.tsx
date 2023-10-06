import { Content } from "@prismicio/client";
import Header from "./list/content/Header";
import ListContent from "./list/ListContent";

export default function List({ data }: { data: Content.PlaybookDocumentData }) {
  return (
    <div className="w-1/2 min-[1200px]:w-[600px] portrait:w-full portrait:mt-56">
      <Header
        image={data.image}
        sliceCount={data.slices.length}
        title={data.title as string}
        creator={data.creator as unknown as Content.CreatorDocument}
      />

      <ListContent
        description={data.description}
        audio={data.audio}
        destination={data.destination as unknown as Content.DestinationDocument}
        slices={data.slices}
        creator={data.creator}
      />
    </div>
  );
}
