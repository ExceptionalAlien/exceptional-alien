import { useEffect, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

function GoogleMap({ mapProps }: { mapProps: MapProps }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    new window.google.maps.Map(ref.current!, {
      center: mapProps.center,
      zoom: mapProps.zoom,
      mapId: "a558980281942a22",
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      clickableIcons: false,
    });
  }, []);

  return <div ref={ref} className="w-full md:w-2/3 h-2/3 md:h-full" />;
}

export interface MapProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
}

export default function Map({ mapProps }: { mapProps: MapProps }) {
  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}>
      <GoogleMap mapProps={mapProps} />
    </Wrapper>
  );
}
