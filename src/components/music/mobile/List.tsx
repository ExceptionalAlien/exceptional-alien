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
import PartnershipLogo from "@/img/EAxSS-partnership-logo.svg";

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
  variant: string;
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
          <div className="bg-sky-blue p-5 pt-7">
            <div className="relative w-full block bg-sky-blue">
              {props.variant === "artist"
                ? <img className="block h-auto" src={props.data.image.url as string} alt="City Image" />
                : <img className="block h-auto" src={props.data.music_city_image.url as string} alt="City Image" />}
            </div>

            {props.variant === "artist"
              ? <h1 className="text-2xl sm:text-3xl uppercase font-bold text-white mt-5">{props.data.title}</h1>
              : <div className="mt-7 mb-2 mx-auto [&>svg]:w-full">
                <PartnershipLogo />
              </div>
            }
          </div>

          <div className="relative grid gap-y-6 md:gap-y-6 [&>.gem]:bg-white [&>.gem]:p-5 [&>.gem>.gem-icon]:r-5">
            <section className="p-5 bg-sky-navy [&>p]:text-white [&>p]:text-base [&>p]:mb-3">
              {/*<h1 className="text-2xl sm:text-3xl uppercase font-bold mb-3">{props.data.title}</h1>*/}
              {props.variant === 'artist'
                ? props.data.description.length !== 0 && <PrismicRichText field={props.data.description} />
                : props.data.music_city_description.length !== 0 && <PrismicRichText field={props.data.music_city_description} />
              }
              {(props.data.audio as any).url && <Audio file={(props.data.audio as any).url as string} />}

              {props.allowedPlaybooks.get(props.pageSlug) === undefined && <Buttons
                video={props.data.video.embed_url}
                story={asLink(props.data.story) as string}
                setShowVideo={props.setShowVideo}
              />}

              {props.allowedPlaybooks.get(props.pageSlug) &&
                <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
                    <SponsoredButton link={(props.allowedPlaybooks.get(props.pageSlug) as any).flights as string} source={props.pageSlug}
                                     displayAsLink classes={'font-bold text-white'}
                                     campaign="skyscanner" title={"Flights to " + (props.data.destination as any).data.title as string} />
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

        <GemPopup iframeMode={props.iframeMode} openedGem={props.openedGem} setOpenedGem={props.setOpenedGem}
          ctaLinkData={{destination: (props.data.destination as any).data.title as string, link: (props.allowedPlaybooks.get(props.pageSlug) as any).hotels as string, pageUid: props.pageSlug}}
        />
      </>
  );
}
