import { default as MobileList } from "@/components/hotel/mobile/List";
import { default as MobileMap } from "@/components/hotel/mobile/Map";
import { Content, asLink } from "@prismicio/client";
import { useContext, useEffect, useState } from "react";
import Playbook from "@/img/icon-playbook.svg";
import { ViewModeContext, ViewModeContextType } from "@/components/hotel/mobile/ViewModeContext";
import Globe from "@/img/globe.svg";
import List from "@/img/icon-list.svg";

type ViewerProps = {
  data: Content.PlaybookDocumentData;
  setShowVideo: React.Dispatch<React.SetStateAction<boolean>>;
  viewerRef: HTMLDivElement;
};

export default function Viewer(props: ViewerProps) {
  const [viewMode, setViewMode] = useState('init')
  //const {viewMode, setViewMode} = useContext<ViewModeContextType>(ViewModeContext);

  useEffect(() => {
    let elem = (document.querySelector('#topNavigation') as HTMLElement)
    elem.style.setProperty('display', 'none');
    let splashCover = (document.querySelector('#splashCover') as HTMLElement)
    setTimeout(() => {
      splashCover.style.setProperty('display', 'none');
    }, 500)

    setViewMode('init')
  }, [])

  return (
    <>
      <div className="fixed top-0 bg-ex-blue h-12 z-50 w-full flex justify-between content-center">
        <div className=""><p
          className="text-white text-sm px-3 py-3.5 [&>svg]:h-4 [&>svg]:mr-1 [&>svg]:inline-block">
          <Playbook /> {(props.data.hotel as unknown as Content.HotelDocument).data.title} Playbook</p></div>
        <div className="flex justify-end pr-3">
          {(viewMode == 'map' || viewMode == 'init') && <button onClick={() => { setViewMode('list'); console.log('CLICKED LIST') }}
            className="my-auto grow-0 inline text-sm text-white bg-transparent border border-1 border-white px-2 py-1 [&>svg]:h-4 [&>svg]:mr-2 [&>svg]:inline-block [&>svg]:absolute [&>svg]:top-[16px]">
            <List />
            <span className="ml-6">List View</span>
          </button>}
          {viewMode == 'list' && <button onClick={() => { setViewMode('map'); console.log('CLICKED MAP') } }
            className="my-auto grow-0 inline text-sm text-white bg-transparent border border-1 border-white px-2 py-1 [&>svg]:h-4 [&>svg]:mr-2 [&>svg]:inline-block [&>svg]:absolute [&>svg]:top-[16px] [&>svg]:text-white">
            <Globe />
            <span className="ml-6">Map View</span>
          </button>}
        </div>
      </div>
      <div id="splashCover" className="z-50 bg-ex-blue h-[100vh] w-full"></div>
      <MobileList data={props.data} viewMode={viewMode} setShowVideo={() => { return false; }} />
      <MobileMap gems={props.data.slices} setViewMode={setViewMode} viewMode={viewMode} hotel={props.data.hotel as unknown as Content.HotelDocument} viewerRef={props.viewerRef!} />
    </>
  );
};