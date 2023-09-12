import React, { useEffect, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

function GoogleMap({ center, zoom }: { center: google.maps.LatLngLiteral; zoom: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    new window.google.maps.Map(ref.current!, {
      center,
      zoom,
    });
  }, []);

  return <div ref={ref} className="w-[600px] h-[600px]" />;
}

export default function Map() {
  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 4;

  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}>
      <GoogleMap center={center} zoom={zoom} />
    </Wrapper>
  );
}
