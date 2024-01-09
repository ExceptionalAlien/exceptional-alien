import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Content } from "@prismicio/client";
import { Wrapper } from "@googlemaps/react-wrapper";
import GemIcon from "@/components/shared/GemIcon";

function GoogleMap(props: MapProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth >= 768 ? false : true;

    // Create map
    const map = new window.google.maps.Map(ref.current!, {
      mapId: "a558980281942a22",
      streetViewControl: false,
      zoom: 18,
      fullscreenControl: false,
      mapTypeControl: false,
      clickableIcons: false,
      backgroundColor: "#C5C5C5",
      scrollwheel: false,
      gestureHandling: "greedy",
      zoomControl: isMobile ? false : true,
    });

    const addMarker = async () => {
      const getCoords = async (placeID: string) => {
        // Return place lat and lng from Google API
        const service = new google.maps.places.PlacesService(map);

        const request = {
          placeId: placeID,
          fields: ["geometry"],
        };

        return new Promise((resolve) =>
          service.getDetails(request, (place, status) => {
            if (
              status === google.maps.places.PlacesServiceStatus.OK &&
              place &&
              place.geometry &&
              place.geometry.location
            ) {
              resolve(place.geometry.location);
            }
          })
        );
      };

      const div = document.createElement("div");
      const coords = (await getCoords(props.gem.data.google_maps_id as string)) as google.maps.LatLng;
      div.classList.add("map-gem");

      createRoot(div).render(
        <GemIcon category={props.gem.data.category} classes="selected-gem -translate-x-1/2 -translate-y-1/2" />
      );

      // Add marker to map
      const marker = new window.google.maps.marker.AdvancedMarkerElement({
        map,
        position: coords,
        content: div,
      });

      map.setCenter({ lat: marker.position?.lat as number, lng: marker.position?.lng as number });
      props.setPlaceCoords({ lat: marker.position?.lat as number, lng: marker.position?.lng as number }); // Visible coordinates
    };

    addMarker(); // Init
  }, []);

  return <div ref={ref} className="h-60 w-full md:h-80" />;
}

export interface PlaceCoords {
  lat: number;
  lng: number;
}

interface MapProps {
  gem: Content.GemDocument;
  setPlaceCoords: React.Dispatch<React.SetStateAction<PlaceCoords>>;
}

export default function Map(props: MapProps) {
  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!} libraries={["marker", "places"]}>
      <GoogleMap {...props} />
    </Wrapper>
  );
}
