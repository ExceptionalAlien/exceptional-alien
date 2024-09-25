import { useEffect, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import { SliceZone, Content } from "@prismicio/client";
import { Wrapper } from "@googlemaps/react-wrapper";
import GemIcon from "@/components/shared/GemIcon";
import { sendGTMEvent } from "@next/third-parties/google";

function GoogleMap(props: MapProps) {
  const [scrollEndLandscape, setScrollEndLandscape] = useState(false);
  const [scrollEndPortrait, setScrollEndPortrait] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
    const titleHeight = (orientation === "landscape" && !isMobile) || window.innerWidth === 768 ? 80 : 64;
    const portraitMapHeight = isMobile ? 240 : 384;
    const globalHeaderheight = !isMobile ? 80 : 48 + portraitMapHeight;
    const margin = !isMobile ? 24 : 16;
    const top = globalHeaderheight; // + titleHeight;
    const scrollTrigger = isMobile ? 200 : 300;
    const bounds = new window.google.maps.LatLngBounds();
    var scrollTimer: NodeJS.Timeout;
    let initZoom: number | undefined;
    var initCenter: google.maps.LatLng | undefined;
    var focusedGem: string | undefined;
    var clickedGem: string | undefined;
    var clicked = false;
    var animating = false;
    var clickedTimer: NodeJS.Timeout;
    let mapAnimated = false;

    //initZoom = 15; todo: don't set zoom here!
    let initLatitudeShift = 0.011;

    const resetMapGems = () => {
      const mapGems = document.querySelectorAll(".map-gem");

      for (let i = 0; i < mapGems.length; i++) {
        mapGems[i].classList.remove("selected-gem");
        (mapGems[i].parentNode?.parentNode as HTMLElement).style.zIndex = "auto";
      }
    };

    const mapAnimate = () => {
      mapAnimated = true;
      map.setZoom(15); // initialise zoom here..
      // set map center
    };

    const setGems = (zoomed?: boolean) => {
      focusedGem = ""; // Reset
      const gems = document.querySelectorAll("section.gem");

      // Loop gems in list and detect which is currently in view/focus
      for (let i = 0; i < gems.length; i++) {
        const gem = gems[i] as HTMLElement;
        const pos = gem.offsetTop + (gem.querySelector(".gem-content") as HTMLElement).offsetTop - window.scrollY;

        if (pos >= (top+scrollTrigger) && pos < (window.innerHeight + scrollTrigger) && !focusedGem) {
          focusedGem = gems[i].id.replace("gem-", "");
        }
      }

      // Keep clicked gem selected if gem/s above are in view/focus
      if (clicked) {
        focusedGem = clickedGem;
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

      // Reset zoom and center (on scroll only)
      if (!zoomed && clickedGem && clickedGem !== focusedGem) {
        initZoom && map.setZoom(initZoom);
        map.setCenter(initCenter as google.maps.LatLng);
        clickedGem = "";
      }
    };

    const handleScroll = () => {
      const height = props.viewerRef.offsetTop + props.viewerRef.clientHeight;
      const scroll = window.scrollY + window.innerHeight;
      const offset = window.scrollY - props.viewerRef!.clientHeight;
      scrollTimer !== null && clearTimeout(scrollTimer);

      // Let map know when viewer scroll is not longer below fold so it can scroll too
      setScrollEndLandscape(window.scrollY && scroll >= height ? true : false);
      setScrollEndPortrait(offset >= -portraitMapHeight ? true : false);

      // Scroll has ended
      scrollTimer = setTimeout(() => {
        setGems();
      }, 150);
    };

    setGems(); // Init for desktop

    // Create map
    const map = new window.google.maps.Map(ref.current!, {
      mapId: "1cecc1f65b3b89b8",
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      clickableIcons: false,
      backgroundColor: "#62b8e9",
      scrollwheel: false,
      gestureHandling: "greedy",
      zoomControl: isMobile ? false : true,
    });

    const addMarkers = async () => {
      const getCoords = async (placeID: string, uid: string) => {
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
            } else {
              resolve(null);
              console.log(`${status} (${uid})`);
            }
          })
        );
      };

      // Loop playbook gems
      for (let i = 0; i < props.gems.length; i++) {
        const gem = props.gems[i].primary.gem as unknown as Content.GemDocument;
        if (gem.data === undefined) {
          continue // prevents crash if empty gem added in CMS
        }

        if (gem.data.google_maps_id) {
          const div = document.createElement("div");
          //const coords = (await getCoords(gem.data.google_maps_id as string, gem.uid)) as google.maps.LatLng;

          const coords = {
            lat: gem.data.location?.latitude,
            lng: gem.data.location?.longitude,
          };

          if (coords.lat && coords.lat) {
            //console.log(`${gem.uid} - ${coords}`);
            div.setAttribute("id", "map-gem-" + gem.uid);
            div.classList.add("map-gem");
            div.classList.add("[&>div>svg:nth-child(4)]:text-sky-blue");
            div.classList.add("[&>div>svg:nth-child(5)]:text-sky-blue");
            div.classList.add("[&.selected-gem>div>svg:nth-child(2)]:text-sky-blue");
            createRoot(div).render(
              <GemIcon
                category={gem.data.category}
                /*creator={(gem.data.creator as unknown as Content.CreatorDocument)?.data.profile_image.url}*/
                marker
                classes="-translate-x-1/2 -translate-y-1/2 !h-11 !w-11"
              />
            );

            // Add marker to map
            const marker = new window.google.maps.marker.AdvancedMarkerElement({
              map,
              position: coords,
              title: gem.data.title,
              content: div,
            });

            // List gem is already in view
            if (focusedGem === gem.uid) {
              div.classList.add("selected-gem");
              marker.zIndex = 1;
            }

            // Include marker in init map boundary
            bounds.extend(coords);

            marker.addListener("click", () => {
              const viewerHeight = props.viewerRef.offsetTop + props.viewerRef.clientHeight;

              const listGemPos =
                (document.querySelector("section#gem-" + gem.uid) as HTMLElement)?.offsetTop - (top + margin);

              // Keep map in view if gem at bottom of list
              const scrollPos =
                orientation === "landscape" && listGemPos + window.innerHeight > viewerHeight
                  ? viewerHeight - window.innerHeight
                  : listGemPos;

              clicked = true; // Wait until auto scroll and zoom finish
              clickedTimer !== null && clearTimeout(clickedTimer);

              clickedTimer = setTimeout(() => {
                clicked = false;
              }, 1000);

              window.scrollTo({
                top: scrollPos,
                behavior: "smooth",
              });

              // Zoom and center marker
              if (!clickedGem) {
                if (focusedGem !== gem.uid) {
                  resetMapGems(); // Needed because markers can't be styled if not visible on map
                }

                map.setCenter({ lat: marker.position?.lat as number, lng: marker.position?.lng as number });
                initZoom && map.setZoom(initZoom + 2);
              }

              clickedGem = gem.uid;

              // todo: event - playbook
              //sendGTMEvent({ event: 'c_desktop_map_click', campaign: hotel.title, type: 'map_gem_click', source: gem.uid });
            });
          } else {
            alert("Gem coords missing: " + gem.data.title);
          }
        } else {
          alert("Gem place ID missing: " + gem.data.title);
        }
      }

      props.gems.length && map.fitBounds(bounds); // Show all gems on map on init

      google.maps.event.addListener(map, "idle", () => {
        if (!initZoom) {
          // Save initial zoom number and center position for map reset
          initZoom = map.getZoom();
          initCenter = map.getCenter();
        }
        /*if (!mapAnimated) {
          mapAnimate();
        }*/

        setGems(true); // Set gems after map zoom or drag
      });
    };

    addMarkers();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Clean up
  }, [props.gems]);

  {/* w was -576px todo: change height */}
  return (
    <div ref={ref}
      className={`!fixed left-0 ${!props.iframeMode && `md:top-20 top-12 landscape:h-[calc(100%-48px)] md:landscape:h-[calc(100%-80px)]`} ${props.iframeMode && `md:top-0 top-12 landscape:h-[100%] md:landscape:h-[100%]`} z-10 h-[30vh] w-1/2 shadow-xl sm:shadow-none touch-none bg-ex-light-grey min-[1152px]:w-[calc(100%-576px)] portrait:w-full portrait:min-[768px]:h-96 ${
        scrollEndLandscape && "landscape:!absolute landscape:!top-auto"
      } ${scrollEndPortrait && "portrait:!absolute portrait:!top-auto"}`}
    />
  );
}

type MapProps = {
  gems: SliceZone<Content.GemSlice>;
  viewerRef: HTMLDivElement;
  iframeMode: boolean;
};

export default function Map(props: MapProps) {
  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!} libraries={["marker", "places"]}>
      <GoogleMap {...props} />
    </Wrapper>
  );
}
