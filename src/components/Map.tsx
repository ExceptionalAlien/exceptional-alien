import { useEffect, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

function GoogleMap(props: MapProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    new window.google.maps.Map(ref.current!, {
      center: props.center,
      zoom: props.zoom,
      mapId: "a558980281942a22",
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      clickableIcons: false,
      backgroundColor: "#EEEEEE",
    });
  }, []);

  return (
    <div
      ref={ref}
      className={`!fixed top-12 md:top-20 left-0 w-1/2 lg:w-3/5 xl:w-2/3 2xl:w-3/4 portrait:w-full h-64 landscape:h-[calc(100vh-80px)] ${
        props.scrollEndLandscape && "landscape:!absolute landscape:bottom-0 landscape:!top-auto"
      } ${props.scrollEndPortrait && "portrait:!absolute portrait:bottom-0 portrait:!top-auto"}`}
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
