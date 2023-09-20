import { useEffect, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

function GoogleMap(props: MapProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth >= 768 ? false : true;
    console.log(1);

    new window.google.maps.Map(ref.current!, {
      center: props.center,
      zoom: props.zoom,
      mapId: "af32fa6e44e05e0a",
    });
  }, []);

  return (
    <div
      ref={ref}
      className={`z-20 touch-none !fixed top-12 md:top-20 left-0 w-1/2 min-[1200px]:w-[calc(100%-600px)] portrait:w-full h-56 landscape:h-[calc(100%-48px)] md:landscape:h-[calc(100%-80px)] ${
        props.scrollEndLandscape && "landscape:!absolute landscape:!top-auto"
      } ${props.scrollEndPortrait && "portrait:!absolute portrait:!top-auto"}`}
      style={{ transform: "translateZ(0)" }}
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
