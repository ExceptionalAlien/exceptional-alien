import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import CreatorIcon from "@/components/shared/CreatorIcon";
import CreatorThumb from "@/components/shared/CreatorThumb";

export default function Viewer({ data }: { data: Content.StoryDocumentData }) {
  return (
    <>
      <PrismicNextImage field={data.image} />
      <h2>{data.title}</h2>
      <div className="bg-ex-blue">
        <p>Gem in this story</p>
        <CreatorIcon
          firstName={ (data.creator as any).data.first_name}
          lastName={ (data.creator as any).last_name }
          image={(data.creator as any).data.profile_image}
        />
      </div>
    </>
  );
}
