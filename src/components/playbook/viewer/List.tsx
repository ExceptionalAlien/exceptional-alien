import { Content, asLink } from "@prismicio/client";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import Header from "./list/Header";
import Audio from "./list/Audio";
import Buttons from "./list/Buttons";

interface ListProps {
  data: Content.PlaybookDocumentData;
  setShowVideo: React.Dispatch<React.SetStateAction<boolean>>;
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
        <section className="grid gap-y-3 md:gap-y-4 [&>p]:text-ex-grey">
          {props.data.description.length !== 0 && <PrismicRichText field={props.data.description} />}
          {(props.data.audio as any).url && <Audio file={(props.data.audio as any).url as string} />}

          <Buttons
            video={props.data.video.embed_url}
            story={asLink(props.data.story) as string}
            setShowVideo={props.setShowVideo}
          />
        </section>

        <SliceZone slices={props.data.slices} components={components} context={{ creator: props.data.creator }} />
      </div>
    </div>
  );
}
