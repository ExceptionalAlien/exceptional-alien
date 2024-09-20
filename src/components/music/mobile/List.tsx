import { Content, asLink } from "@prismicio/client";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import Header from "../list/Header";
import Audio from "../list/Audio";
import Buttons from "../list/Buttons";
import GemThumb from "@/components/shared/GemThumb";
import GemItem from "@/components/music/mobile/GemItem";
import Playbook from "@/img/icon-playbook.svg";
import VideoEmbed, { VideoProps } from "@/components/shared/VideoEmbed";
import { EmbedField, VideoOEmbed } from "@prismicio/types";
import { GemPopup } from "@/components/music/mobile/GemPopup";
import SponsoredButton from "@/components/shared/SponsoredButton";

type ListProps = {
  data: Content.PlaybookDocumentData;
  viewMode: string;
  setViewMode: (arg: string) => void;
  selectedGem: string,
  setSelectedGem: (arg: string) => void;
  openedGem: any,
  setOpenedGem: (arg: any) => void,
  setShowVideo: React.Dispatch<React.SetStateAction<boolean>>;
  allowedPlaybooks: Map<string, string>;
  pageSlug: string;
  iframeMode: boolean;
};

export default function List(props: ListProps) {
    return (
      <>
        <div
          className={`absolute left-0 top-12 w-full h-auto p-5 z-10 transition-background duration-500 ease-in
            ${props.viewMode == 'init' && `top-[55vh] z-20`}
            ${props.viewMode == 'list' && `top-12 z-20 bg-opacity-40 bg-black`} 
            ${props.viewMode == 'map' && `z-0`}
          `}>
          {/* bg-[#9c9c9c]  min-[1152px]:w-[576px] portrait:min-[768px]:mt-96 */}
          <div className="bg-white p-5">
            <div className="relative w-full h-[30vh] md:h-[40vh] bg-cover bg-no-repeat bg-center" style={{
              backgroundImage: `url('${props.data.image.url}')`,
            }}>
              <div className="absolute w-full h-full bg-gradient-to-t from-black/50 from-0% via-black/0 via-50% to-black/50 to-100%" />
              {/*<div className="absolute top-3 left-3 rounded-full bg-black bg-opacity-20 backdrop-blur">
                <p className="text-white text-sm px-3 py-2.5 [&>svg]:h-4 [&>svg]:mr-1 [&>svg]:inline-block">
                <Playbook /> City with Creator</p>
              </div>*/}
              {/* todo: creator's logo here */}
            </div>
          </div>

          <div className="relative grid gap-y-6 md:gap-y-6 [&>.gem]:bg-white [&>.gem]:p-5 [&>.gem>.gem-icon]:r-5">
            <section className="p-5 pt-0 bg-white [&>p]:text-black [&>p]:text-sm [&>p]:mb-3">
              <h1 className="text-2xl sm:text-3xl uppercase font-bold mb-3">{props.data.title}</h1>
              {props.data.description.length !== 0 && <PrismicRichText field={props.data.description} />}
              {(props.data.audio as any).url && <Audio file={(props.data.audio as any).url as string} />}

              {props.allowedPlaybooks.get(props.pageSlug) === undefined && <Buttons
                video={props.data.video.embed_url}
                story={asLink(props.data.story) as string}
                setShowVideo={props.setShowVideo}
              />}

              {props.allowedPlaybooks.get(props.pageSlug) &&
                <div className="grid grid-cols-1 md:grid-cols-2 mt-3">
                  <div>
                    <SponsoredButton link={props.allowedPlaybooks.get(props.pageSlug) as string} source={props.pageSlug}
                                     campaign="skyscanner" title={"Flights to " + (props.data.destination as any).data.title as string} />
                  </div>
                </div>}
            </section>

            {props.data.slices.map((slice, i) => {
              if ((slice.primary.gem as unknown as Content.GemDocument).data === undefined) {
                return null // prevents crash if empty gem added in CMS
              }
              return <GemItem key={i} slice={slice} selectedGem={props.selectedGem} setSelectedGem={props.setSelectedGem} setViewMode={props.setViewMode} context={{ creator: null }} openedGem={props.openedGem} setOpenedGem={props.setOpenedGem} />
            })}
          </div>
        </div>

        <GemPopup iframeMode={props.iframeMode} openedGem={props.openedGem} setOpenedGem={props.setOpenedGem} />
      </>
  );
}
