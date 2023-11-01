import { Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import Header from "@/components/story/Header";
import StoryThumb from "@/components/shared/StoryThumb";
import PlaybookThumb from "@/components/shared/PlaybookThumb";

export default function Viewer({ data }: { data: Content.StoryDocumentData }) {
  return (
    <section>
      <Header
        image={data.image}
        title={data.title as string}
        creator={data.creator as unknown as Content.CreatorDocument}
      />
      <h6>Feature by Interview: Michael Canning; Words: Marley Ng</h6>
      <SliceZone slices={data.slices} components={components} />
      <PlaybookThumb playbook={data.playbook as unknown as Content.PlaybookDocument} size="featured" />
      {/** Related items  **/}
    </section>
  );
}
