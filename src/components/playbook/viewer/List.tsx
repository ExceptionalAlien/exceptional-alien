import { Content, asLink } from "@prismicio/client";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import Header from "./list/Header";
import Audio from "./list/Audio";
import Buttons from "./list/Buttons";
import SponsoredButton from "@/components/shared/SponsoredButton";

type ListProps = {
  data: Content.PlaybookDocumentData;
  setShowVideo: React.Dispatch<React.SetStateAction<boolean>>;
  pageUid: string;
};

const southAfrica = new Map([
  [ 'cape-town-with-zola-nene', 'https://www.skyscanner.net/flights-to/cpt/' ],
  [ 'western-cape-with-tanika-hoffman', 'https://www.skyscanner.net/flights-to/cpt/' ],
  [ 'gauteng-with-kevin-richardson', 'https://www.skyscanner.net/flights-to/jnb/' ],
]);

export default function List(props: ListProps) {
  const destination = props.data.destination as unknown as Content.DestinationDocument

  return (
    <div className="w-1/2 min-[1152px]:w-[576px] portrait:mt-60 portrait:w-full portrait:min-[768px]:mt-96">
      <Header
        image={props.data.image}
        title={props.data.title as string}
        creator={props.data.creator as unknown as Content.CreatorDocument}
        destination={props.data.destination as unknown as Content.DestinationDocument}
        logo={props.data.logo.url ? props.data.logo : undefined}
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

          {southAfrica.get(props.pageUid) &&
            <div className="grid grid-cols-1 md:grid-cols-2 md:col-span-1 md:gap-3">
              <SponsoredButton link={southAfrica.get(props.pageUid) as string} title={`Flights to ${destination.data?.title}`}
                               source={props.pageUid} campaign='skyscanner-south-africa' />
            </div>}
        </section>

        <SliceZone slices={props.data.slices} components={components} context={{ creator: props.data.creator }} />
      </div>
    </div>
  );
}
