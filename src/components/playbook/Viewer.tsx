import { useRef, useState, useEffect } from "react";
import { Content } from "@prismicio/client";
import Map from "./viewer/Map";
import List from "./viewer/List";

type ViewerProps = {
  data: Content.PlaybookDocumentData;
  setShowVideo: React.Dispatch<React.SetStateAction<boolean>>;
  pageUid: string;
};

export default function Viewer(props: ViewerProps) {
  const [viewerRef, setViewerRef] = useState<HTMLDivElement>();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setViewerRef(ref.current!);
  }, []);

  return (
    <div className="flex items-end justify-end" ref={ref}>
      <List data={props.data} setShowVideo={props.setShowVideo} pageUid={props.pageUid} />
      <Map gems={props.data.slices} viewerRef={viewerRef!} />
    </div>
  );
}
