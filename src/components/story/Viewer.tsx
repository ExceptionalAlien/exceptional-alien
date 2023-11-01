import { Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import Header from "@/components/story/Header";

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
      {/** Playbook  **/}
      {/** Related items  **/}
    </section>
  );
}
