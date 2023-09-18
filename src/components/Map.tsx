import { useEffect, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

function GoogleMap(props: MapProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth >= 768 ? false : true;

    new window.google.maps.Map(ref.current!, {
      center: props.center,
      zoom: props.zoom,
      mapId: "a558980281942a22",
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      clickableIcons: false,
      backgroundColor: "#FFFFFF",
      gestureHandling: "none",
      zoomControl: isMobile ? false : true,
    });
  }, []);

  return (
    <div
      ref={ref}
      className={`!fixed z-20 top-12 md:top-20 left-0 w-1/2 xl:w-[calc(100%-640px)] portrait:w-full h-56 landscape:h-[calc(100%-48px)] md:landscape:h-[calc(100%-80px)] ${
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
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}>
      <GoogleMap {...props} />
    </Wrapper>
  );
}
