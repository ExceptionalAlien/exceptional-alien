import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { SliceZone, Content } from "@prismicio/client";
import { Wrapper } from "@googlemaps/react-wrapper";
import GemIcon from "@/components/GemIcon";

interface Gem {
  uid: string;
  data: Content.GemDocumentData;
}

function GoogleMap(props: MapProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth >= 768 ? false : true;
    const orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
    const titleHeight = (orientation === "landscape" && !isMobile) || window.innerWidth === 768 ? 80 : 64;
    const portraitMapHeight = 224;
    const globalHeaderheight = !isMobile ? 80 : 48 + portraitMapHeight;
    const margin = !isMobile ? 16 : 12;
    const top = globalHeaderheight + titleHeight;

    const map = new window.google.maps.Map(ref.current!, {
      mapId: "a558980281942a22",
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      clickableIcons: false,
      backgroundColor: "#C5C5C5",
      scrollwheel: false,
      gestureHandling: "greedy",
      zoomControl: isMobile ? false : true,
    });

    const bounds = new window.google.maps.LatLngBounds();

    // Loop playbook gems and add to map
    for (let i = 0; i < props.gems.length; i++) {
      const gem = props.gems[i].primary.gem as Gem;
      const div = document.createElement("div");
      div.setAttribute("id", "map-gem-" + gem.uid);
      div.classList.add("map-gem");
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
        window.scrollTo({
          top: (document.querySelector("section#gem-" + gem.uid) as HTMLElement)?.offsetTop - (top + margin),
          behavior: "smooth",
        });
      });
    }

    const selectGem = (id: string) => {
      // Reset all gems
      const gems = document.querySelectorAll(".map-gem");

      for (let i = 0; i < gems.length; i++) {
        gems[i].classList.remove("selected-gem");
      }

      document.querySelector("div#map-gem-" + id)?.classList.add("selected-gem"); // Select
    };

    const handleScroll = () => {
      const gems = document.querySelectorAll("section");
      var focusedGem = "";

      // Loop gems in list and detect which is in focus
      for (let i = 0; i < gems.length; i++) {
        const gem = gems[i] as HTMLElement;
        const pos = gem.offsetTop + (gem.querySelector(".gem-content") as HTMLElement).offsetTop - window.scrollY;

        if (pos >= top && pos < window.innerHeight && !focusedGem) {
          focusedGem = gems[i].id.replace("gem-", "");
        }
      }

      focusedGem && selectGem(focusedGem);
    };

    props.gems.length && map.fitBounds(bounds); // All gems visible on map
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
