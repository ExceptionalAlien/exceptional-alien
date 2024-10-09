import { default as MobileList } from "@/components/music/mobile/List";
import { default as MobileMap } from "@/components/music/mobile/Map";
import { Content, asLink } from "@prismicio/client";
import { useContext, useEffect, useState } from "react";
import Playbook from "@/img/icon-playbook.svg";
import Globe from "@/img/globe.svg";
import List from "@/img/icon-list.svg";
import Link from "next/link";
import { sendGTMEvent } from "@next/third-parties/google";
import MusicIcon from "@/img/icon-music.svg";

type ViewerProps = {
  data: Content.PlaybookDocumentData;
  setShowVideo: React.Dispatch<React.SetStateAction<boolean>>;
  viewerRef: HTMLDivElement;
  allowedPlaybooks: Map<string, any>;
  pageSlug: string;
  iframeMode: boolean;
  variant: string;
};

export default function Viewer(props: ViewerProps) {
  const [viewMode, setViewMode] = useState('init')
  const [selectedGem, setSelectedGem] = useState('')
  const [openedGem, setOpenedGem] = useState()

  useEffect(() => {
    let splashCover = (document.querySelector('#splashCover') as HTMLElement)
    setTimeout(() => {
      splashCover.style.setProperty('display', 'none');
    }, 500)

    setViewMode('init')
  }, [])

  return (
    <>
      <div className="fixed top-0 bg-sky-navy h-12 z-50 w-full flex justify-between content-center">
        <p
          className="text-white text-sm px-3 py-3.5 [&>svg]:h-4 [&>svg]:mr-2 [&>svg]:inline-block text-nowrap">
          <MusicIcon /> Music City Guide</p>
        <div className="flex justify-end pr-3">
          {viewMode == 'map' && <button onClick={() => { setViewMode('list'); sendGTMEvent({ event: 'm_map_click', campaign: 'music-city', type: 'list_view', source: 'map' }); }}
            className="my-auto grow-0 inline text-sm text-white bg-transparent border border-1 border-white px-2 py-1 [&>svg]:h-4 [&>svg]:mr-2 [&>svg]:inline-block [&>svg]:absolute [&>svg]:top-[16px]">
            <List />
            <span className="ml-6">List View</span>
          </button>}
          {( viewMode == 'init' || viewMode == 'list') && <button onClick={() => { setViewMode('map'); sendGTMEvent({ event: 'm_list_click', campaign: 'music-city', type: 'map_view', source: 'list' }); } }
            className="my-auto grow-0 inline text-sm text-white bg-transparent border border-1 border-white px-2 py-1 [&>svg]:h-4 [&>svg]:mr-2 [&>svg]:inline-block [&>svg]:absolute [&>svg]:top-[16px] [&>svg]:text-white">
            <Globe />
            <span className="ml-6">Map View</span>
          </button>}
        </div>
      </div>
      <div id="splashCover" className="z-50 bg-[#f3f3f3] h-[100vh] w-full"></div>
      <MobileList variant={props.variant} iframeMode={props.iframeMode} data={props.data} allowedPlaybooks={props.allowedPlaybooks} pageSlug={props.pageSlug} openedGem={openedGem} setOpenedGem={setOpenedGem} selectedGem={selectedGem} setSelectedGem={setSelectedGem} setViewMode={setViewMode} viewMode={viewMode} setShowVideo={() => { return false; }} />
      <MobileMap gems={props.data.slices} iframeMode={props.iframeMode} openedGem={openedGem} selectedGem={selectedGem} setSelectedGem={setSelectedGem} setViewMode={setViewMode} viewMode={viewMode} viewerRef={props.viewerRef!} />
    </>
  );
};