import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Wrapper } from "@googlemaps/react-wrapper";
import GemIcon from "@/components/GemIcon";
import styles from "./gem-icon/styles.module.css";

function GoogleMap(props: MapProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth >= 768 ? false : true;

    const map = new window.google.maps.Map(ref.current!, {
      center: props.center,
      zoom: props.zoom,
      mapId: "a558980281942a22",
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      clickableIcons: false,
      backgroundColor: "#C5C5C5",
      zoomControl: isMobile ? false : true,
    });

    const div = document.createElement("div");
    createRoot(div).render(<GemIcon category="Nature" />);

    const marker = new window.google.maps.marker.AdvancedMarkerElement({
      map,
      position: { lat: -33.865143, lng: 151.2099 },
      content: div,
    });

    marker.addListener("click", () => {
      (marker.content as HTMLElement).firstElementChild?.classList.add(`${styles.selected}`);
    });
  }, []);

  return (
    <div
      ref={ref}
      className={`z-20 touch-none !fixed top-12 md:top-20 left-0 w-1/2 min-[1200px]:w-[calc(100%-600px)] portrait:w-full h-56 landscape:h-[calc(100%-48px)] md:landscape:h-[calc(100%-80px)] ${
        props.scrollEndLandscape && "landscape:!absolute landscape:!top-auto"
      } ${props.scrollEndPortrait && "portrait:!absolute portrait:!top-auto"}`}
    />
  );
}

interface MapProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  scrollEndLandscape: boolean;
  scrollEndPortrait: boolean;
}

export default function Map(props: MapProps) {
  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!} libraries={["marker"]}>
      <GoogleMap {...props} />
    </Wrapper>
  );
}
