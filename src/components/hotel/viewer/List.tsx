import { Content, asLink } from "@prismicio/client";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import Header from "./list/Header";
import Audio from "./list/Audio";
import Buttons from "./list/Buttons";
import GemThumb from "@/components/shared/GemThumb";
import GemItem from "@/components/hotel/viewer/GemItem";

type ListProps = {
  data: Content.PlaybookDocumentData;
  setShowVideo: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function List(props: ListProps) {
  return (
    <div
      className="w-1/2 min-[1152px]:w-[576px] portrait:mt-[45vh] portrait:w-full portrait:min-[768px]:mt-96 p-5 bg-[#9c9c9c]">
      {/* bg-[#9c9c9c]  min-[1152px]:w-[576px] portrait:min-[768px]:mt-96 */}
      <div className="bg-white p-5">
        <div className="w-full h-[30vh] md:h-[40vh] bg-cover bg-no-repeat bg-center" style={{
          backgroundImage: `url('${props.data.image.url}')`
        }} />
      </div>

      <div className="grid gap-y-6 md:gap-y-6 [&>.gem]:bg-white [&>.gem]:p-5 [&>.gem>.gem-icon]:r-5">
        <section className="grid gap-y-3 md:gap-y-4 bg-white p-5 pt-0 [&>p]:text-black [&>p]:text-sm">
          <h1 className="text-2xl sm:text-3xl uppercase font-bold">{props.data.title}</h1>
          {props.data.description.length !== 0 && <PrismicRichText field={props.data.description} />}
          {(props.data.audio as any).url && <Audio file={(props.data.audio as any).url as string} />}

          <Buttons
            video={props.data.video.embed_url}
            story={asLink(props.data.story) as string}
            setShowVideo={props.setShowVideo}
          />
        </section>

        {props.data.slices.map((slice, i) => {
          return <GemItem key={i} slice={slice} context={{ creator: null }} />;
        })}

        {/* <SliceZone slices={props.data.slices} components={components} context={{ creator: props.data.creator }} /> */}
      </div>
    </div>
  );
}
