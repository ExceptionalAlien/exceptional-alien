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
  pageId: string;
  pageSlug: string;
};

const skyscannerPlaybooks = new Map([
  [ 'ZTsYORAAACIA_0LL', 'https://www.skyscanner.net/flights-to/nyca/' ], // New York, Jitwam
  [ 'ZThx4BAAACMAeMyN', 'https://www.skyscanner.net/flights-to/laxa/' ], // Los Angeles, Ny Oh
  [ 'ZVyBdBAAACYA66E2', 'https://www.skyscanner.net/flights-to/ytoa/' ], // Toronto, Valley
  [ 'ZcGpVBEAAL6WoOku', 'https://www.skyscanner.net/flights-to/man/' ],  // Manchester, Lusaint
  [ 'ZXWK1xAAACQAQSSj', 'https://www.skyscanner.net/flights-to/ber/' ],  // Berlin, Christian Rich
])

export default function List(props: ListProps) {
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

          {/* todo revert */}
          {skyscannerPlaybooks.get(props.pageId) === undefined && <Buttons
            video={props.data.video.embed_url}
            story={asLink(props.data.story) as string}
            setShowVideo={props.setShowVideo}
          />}

          {/* todo hide link after the campaign */}
          {skyscannerPlaybooks.get(props.pageId) &&
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <SponsoredButton link={skyscannerPlaybooks.get(props.pageId) as string} source={props.pageSlug}
               campaign="skyscanner" title={"Flights to " + (props.data.destination as any).data.title as string} />
            </div>
          </div>}
        </section>

        <SliceZone slices={props.data.slices} components={components} context={{ creator: props.data.creator }} />
      </div>
    </div>
  );
}
