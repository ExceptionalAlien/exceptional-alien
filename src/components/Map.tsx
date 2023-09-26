import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { useRouter } from "next/router";
import { SliceZone, Content } from "@prismicio/client";
import { Wrapper } from "@googlemaps/react-wrapper";
import GemIcon from "@/components/GemIcon";

interface Gem {
  uid: string;
  data: Content.GemDocumentData;
}

function GoogleMap(props: MapProps) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset all gems
    const gems = document.querySelectorAll(".gem");

    for (let i = 0; i < gems.length; i++) {
      gems[i].classList.remove("selectedGem");
    }

    // Set selected gem
    document.querySelector("div#" + router.query.gem)?.classList.add("selectedGem"); // Map icon
    const isMobile = window.innerWidth >= 768 ? false : true;
    const orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
    const titleHeight = (orientation === "landscape" && !isMobile) || window.innerWidth === 768 ? 80 : 64;
    const globalHeaderheight = !isMobile ? 80 : 48;
    const portraitMapHeight = 224;
    const margin = !isMobile ? 16 : 12 + portraitMapHeight;
    const pos =
      (document.querySelector("section#" + router.query.gem) as HTMLElement)?.offsetTop -
      (globalHeaderheight + titleHeight + margin);
    window.scrollTo({ top: pos, behavior: "smooth" });
  }, [router.query.gem]);

  useEffect(() => {
    const isMobile = window.innerWidth >= 768 ? false : true;

    const map = new window.google.maps.Map(ref.current!, {
      mapId: "a558980281942a22",
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      clickableIcons: false,
      backgroundColor: "#C5C5C5",
      zoomControl: isMobile ? false : true,
    });

    const bounds = new window.google.maps.LatLngBounds();

    // Loop playbook gems and add to map
    for (let i = 0; i < props.gems.length; i++) {
      const gem = props.gems[i].primary.gem as Gem;
      const div = document.createElement("div");
      div.setAttribute("id", gem.uid);
      div.classList.add("gem");
      createRoot(div).render(<GemIcon category={gem.data.category} />);

      const marker = new window.google.maps.marker.AdvancedMarkerElement({
        map,
        position: {
          lat: gem.data.location.latitude,
          lng: gem.data.location.longitude,
        },
        title: gem.data.title,
        content: div,
      });

      bounds.extend({
        lat: gem.data.location.latitude,
        lng: gem.data.location.longitude,
      });

      marker.addListener("click", () => {
        // Set gem URL param
        router.push(
          {
            pathname: router.pathname,
            query: { ...router.query, gem: gem.uid },
          },
          undefined,
          { scroll: false }
        );
      });

      if (router.query.gem === gem.uid) {
        div.classList.add("selectedGem"); // Gem selected on load
      }
    }

    if (props.gems.length) {
      map.fitBounds(bounds); // All gems visible on map
    }
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
  gems: SliceZone<Content.GemSlice>;
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
