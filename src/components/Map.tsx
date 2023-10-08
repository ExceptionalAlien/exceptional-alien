import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { SliceZone, Content } from "@prismicio/client";
import { Wrapper } from "@googlemaps/react-wrapper";
import GemIcon from "@/components/GemIcon";

function GoogleMap(props: MapProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth >= 768 ? false : true;
    const orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
    const titleHeight = (orientation === "landscape" && !isMobile) || window.innerWidth === 768 ? 80 : 64;
    const portraitMapHeight = 224;
    const globalHeaderheight = !isMobile ? 80 : 48 + portraitMapHeight;
    const margin = !isMobile ? 24 : 20;
    const top = globalHeaderheight + titleHeight;
    var initZoom: number | undefined;
    var initCenter: google.maps.LatLng | undefined;
    var focusedGem: string | undefined;
    var clickedGem: string | undefined;

    const resetMapGems = () => {
      const mapGems = document.querySelectorAll(".map-gem");

      for (let i = 0; i < mapGems.length; i++) {
        mapGems[i].classList.remove("selected-gem");
        (mapGems[i].parentNode?.parentNode as HTMLElement).style.zIndex = "auto";
      }
    };

    const setGems = () => {
      focusedGem = ""; // Reset
      const gems = document.querySelectorAll("section.gem");

      // Loop gems in list and detect which is currently in view/focus
      for (let i = 0; i < gems.length; i++) {
        const gem = gems[i] as HTMLElement;
        const pos = gem.offsetTop + (gem.querySelector(".gem-content") as HTMLElement).offsetTop - window.scrollY;

        if (pos >= top && pos < window.innerHeight && !focusedGem) {
          focusedGem = gems[i].id.replace("gem-", "");
        }
      }

      resetMapGems();

      // Select map gem
      const mapGem = document.querySelector("div#map-gem-" + focusedGem);
      mapGem?.classList.add("selected-gem");

      if (mapGem?.parentNode?.parentNode) {
        (mapGem.parentNode.parentNode as HTMLElement).style.zIndex = "1";
      }

      // Reset all list gem icons
      const listGems = document.querySelectorAll(".gem-icon");

      for (let i = 0; i < listGems.length; i++) {
        listGems[i].classList.remove("selected-gem");
      }

      document.querySelector(`section#gem-${focusedGem} .gem-icon`)?.classList.add("selected-gem"); // Select list gem icon

      // Reset zoom and center
      if (clickedGem && clickedGem !== focusedGem) {
        initZoom && map.setZoom(initZoom);
        map.setCenter(initCenter as google.maps.LatLng);
        clickedGem = "";
      }
    };

    var scrollTimer: NodeJS.Timeout;

    const handleScroll = () => {
      scrollTimer !== null && clearTimeout(scrollTimer);

      // Scroll has ended
      scrollTimer = setTimeout(() => {
        setGems();
      }, 150);
    };

    setGems(); // Init

    // Create map
    const map = new window.google.maps.Map(ref.current!, {
      mapId: "a558980281942a22",
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      clickableIcons: false,
      backgroundColor: "#CCCCCC",
      scrollwheel: false,
      gestureHandling: "greedy",
      zoomControl: isMobile ? false : true,
    });

    const bounds = new window.google.maps.LatLngBounds();

    // Loop playbook gems
    for (let i = 0; i < props.gems.length; i++) {
      const gem = props.gems[i].primary.gem as any;
      const div = document.createElement("div");
      div.setAttribute("id", "map-gem-" + gem.uid);
      div.classList.add("map-gem");
      createRoot(div).render(<GemIcon category={gem.data.category} />);

      // Add marker to map
      const marker = new window.google.maps.marker.AdvancedMarkerElement({
        map,
        position: {
          lat: gem.data.location.latitude,
          lng: gem.data.location.longitude,
        },
        title: gem.data.title,
        content: div,
      });

      // List gem is already in view
      if (focusedGem === gem.uid) {
        div.classList.add("selected-gem");
        marker.zIndex = 1;
      }

      // Include marker in init map boundary
      bounds.extend({
        lat: gem.data.location.latitude,
        lng: gem.data.location.longitude,
      });

      marker.addListener("click", () => {
        window.scrollTo({
          top: (document.querySelector("section#gem-" + gem.uid) as HTMLElement)?.offsetTop - (top + margin),
          behavior: "smooth",
        });

        // Zoom and center marker
        if (!clickedGem) {
          resetMapGems(); // Needed because markers can't be styled if not visible on map
          map.setCenter({ lat: marker.position?.lat as number, lng: marker.position?.lng as number });
          initZoom && map.setZoom(initZoom + 2);
        }

        clickedGem = gem.uid;
      });
    }

    props.gems.length && map.fitBounds(bounds); // Show all gems on map on init

    google.maps.event.addListener(map, "idle", () => {
      if (!initZoom) {
        // Save initial zoom number and center position for map reset
        initZoom = map.getZoom();
        initCenter = map.getCenter();
      }

      setGems(); // Set gems after map zoom
    });

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Clean up
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
