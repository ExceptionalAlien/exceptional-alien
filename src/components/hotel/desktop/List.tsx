import { Content, asLink } from "@prismicio/client";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import Header from "../list/Header";
import Audio from "../list/Audio";
import Buttons from "../list/Buttons";
import GemThumb from "@/components/shared/GemThumb";
import GemItem from "@/components/hotel/desktop/GemItem";
import Playbook from "@/img/icon-playbook.svg";
import VideoEmbed, { VideoProps } from "@/components/shared/VideoEmbed";
import { EmbedField, SharedSlice, VideoOEmbed } from "@prismicio/types";
import { GemSlice } from "../../../../prismicio-types";
import { useEffect } from "react";

type ListProps = {
  data: Content.PlaybookDocumentData;
  setShowVideo: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function List(props: ListProps) {
  const hotel = props.data.hotel as unknown as Content.HotelDocument;
  let slices = props.data.slices;

  return (
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
            <Playbook /> Travel Playbook</p>
          </div>
          {hotel.data.logo_icon && <div className="absolute bottom-3 right-3 shrink-0 overflow-hidden rounded-full border border-white bg-white h-12 w-12">
            <img src={`${hotel.data.logo_icon.url}`} className="block w-full h-auto" alt="Logo" />
          </div>}
        </div>
      </div>

      <div className="grid gap-y-6 md:gap-y-6 [&>.gem]:bg-white [&>.gem]:p-5 [&>.gem>.gem-icon]:r-5">
        <section className="grid gap-y-3 md:gap-y-4 bg-white p-5 pt-0 [&>p]:text-black [&>p]:text-base">
          <h1 className="text-2xl sm:text-3xl uppercase font-bold -mb-3">{props.data.title}</h1>
          {/*<p className="text-base text-black font-bold">Travel experience curated together with {hotel.data.title} concierge</p>*/}
          {props.data.description.length !== 0 && <PrismicRichText field={props.data.description} />}
          {(props.data.audio as any).url && <Audio file={(props.data.audio as any).url as string} />}

          <Buttons
            video={props.data.video.embed_url}
            story={asLink(props.data.story) as string}
            setShowVideo={props.setShowVideo}
          />
        </section>

        {slices.map((slice, i) => {
          if ((slice.primary.gem as unknown as Content.GemDocument).data === undefined) {
            return null // prevents crash if empty gem added in CMS
          }
          let DOMelement = <GemItem key={i} slice={slice} context={{ creator: null }} />
          if (i == 0 && hotel.data.video) {
            return <>
              {DOMelement}
              <section className="relative" key="video">
                <div className="relative [&>iframe]:h-[40vh] [&>iframe]:sm:h-[75vh] [&>iframe]:sm:w-full [&>iframe]:rounded-bl-[50px]">
                  {hotel.data.video && <VideoEmbed embed={hotel.data.video} />}
                </div>
              </section>
            </>
          }

          return DOMelement;
        })}
      </div>
    </div>
  );
}
