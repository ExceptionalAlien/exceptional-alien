import { Content, asLink } from "@prismicio/client";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import Header from "../list/Header";
import Audio from "../list/Audio";
import Buttons from "../list/Buttons";
import GemItem from "@/components/music/desktop/GemItem";
import Playbook from "@/img/icon-playbook.svg";
import VideoEmbed, { VideoProps } from "@/components/shared/VideoEmbed";
import { EmbedField, SharedSlice, VideoOEmbed } from "@prismicio/types";
import { useEffect, useState } from "react";
import { GemPopup } from "@/components/music/mobile/GemPopup";
import SponsoredButton from "@/components/shared/SponsoredButton";

type ListProps = {
  data: Content.PlaybookDocumentData;
  setShowVideo: React.Dispatch<React.SetStateAction<boolean>>;
  allowedPlaybooks: Map<string, string>;
  pageSlug: string;
};

export default function List(props: ListProps) {
  let slices = props.data.slices;
  const [openedGem, setOpenedGem] = useState()

  return (
  <>
    <div
      className="w-1/2 min-[1152px]:w-[576px] portrait:mt-[30vh] portrait:w-full portrait:min-[768px]:mt-96 p-5 bg-[#62b8e9]">
      {/* bg-[#9c9c9c]  min-[1152px]:w-[576px] portrait:min-[768px]:mt-96 */}
      <div className="bg-white p-5">
        <div className="relative w-full h-[30vh] md:h-[40vh] bg-cover bg-no-repeat bg-center" style={{
          backgroundImage: `url('${props.data.image.url}')`,
        }}>
          <div className="absolute w-full h-full bg-gradient-to-t from-black/50 from-0% via-black/0 via-50% to-black/50 to-100%"></div>
          <div className="absolute top-3 left-3 rounded-full bg-black bg-opacity-20 backdrop-blur">
          <p className="text-white text-sm px-3 py-2.5 [&>svg]:h-4 [&>svg]:mr-1 [&>svg]:inline-block">
            <Playbook /> Music City Guide</p>
          </div>
        </div>
      </div>

      <div className="grid gap-y-6 md:gap-y-6 [&>.gem]:bg-white [&>.gem]:p-5 [&>.gem>.gem-icon]:r-5">
        <section className="grid gap-y-3 md:gap-y-4 bg-white p-5 pt-0 [&>p]:text-black [&>p]:text-base">
          <h1 className="text-2xl sm:text-3xl uppercase font-bold -mb-3">{props.data.title}</h1>
          {props.data.description.length !== 0 && <PrismicRichText field={props.data.description} />}
          {(props.data.audio as any).url && <Audio file={(props.data.audio as any).url as string} />}

          {props.allowedPlaybooks.get(props.pageSlug) === undefined && <Buttons
            video={props.data.video.embed_url}
            story={asLink(props.data.story) as string}
            setShowVideo={props.setShowVideo}
          />}

          {props.allowedPlaybooks.get(props.pageSlug) &&
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div>
                <SponsoredButton link={props.allowedPlaybooks.get(props.pageSlug) as string} source={props.pageSlug}
                                 campaign="skyscanner" title={"Flights to " + (props.data.destination as any).data.title as string} />
              </div>
            </div>}
        </section>

        {slices.map((slice, i) => {
          if ((slice.primary.gem as unknown as Content.GemDocument).data === undefined) {
            return null // prevents crash if empty gem added in CMS
          }

          return <GemItem setOpenedGem={setOpenedGem} key={i} slice={slice} context={{ creator: null }} />
        })}
      </div>
    </div>

    <GemPopup openedGem={openedGem} setOpenedGem={setOpenedGem} contain={true} />
  </>
  );
}
