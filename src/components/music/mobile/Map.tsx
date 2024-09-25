import { useEffect, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import { SliceZone, Content } from "@prismicio/client";
import { Wrapper } from "@googlemaps/react-wrapper";
import GemIcon from "@/components/shared/GemIcon";
import Link from "next/link";
import { sendGTMEvent } from '@next/third-parties/google';

function GoogleMap(props: MapProps) {
  const [scrollEndLandscape, setScrollEndLandscape] = useState(false);
  const [scrollEndPortrait, setScrollEndPortrait] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickFromList = (gemId: string) => {
      let gemMarker = (document.querySelector("#map-gem-" + gemId) as HTMLElement)

      ref.current?.focus()
      setTimeout(() => {
        if (gemMarker) {
          gemMarker?.click();
        } else {
          console.log("%c Markers gone from the map", "color: red;")
        }
      }, 300)
      props.setSelectedGem('')
    }

    props.selectedGem && clickFromList(props.selectedGem)

  }, [props.selectedGem]);

  useEffect(() => {
    const isMobile = true;
    const orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
    const titleHeight = (orientation === "landscape" && !isMobile) || window.innerWidth === 768 ? 80 : 64;
    // todo: obsolete
    const portraitMapHeight = isMobile ? 240 : 384;
    const globalHeaderheight = !isMobile ? 80 : 48 + portraitMapHeight;
    const margin = !isMobile ? 24 : 16;
    const top = globalHeaderheight; // + titleHeight;
    //const scrollTrigger = -300;
    const bounds = new window.google.maps.LatLngBounds();
    var scrollTimer: NodeJS.Timeout;
    let initZoom: number | undefined;
    var initCenter: google.maps.LatLng | google.maps.LatLngLiteral | undefined;
    var focusedGem: string | undefined;
    var clickedGem: string | undefined;
    var clicked = false;
    var clickedTimer: NodeJS.Timeout;

    let mapAnimated = false;
    let debugEvents = false;

    //initZoom = 15;
    let initLatitudeShift = 0.011; // so the map is centered more to the top

    // @ts-ignore
    let allPopups = [];

    // Create map
    const map = new window.google.maps.Map(ref?.current!, {
      mapId: "1cecc1f65b3b89b8",
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      clickableIcons: false,
      backgroundColor: "#62b8e9",
      scrollwheel: false,
      gestureHandling: "greedy",
      zoomControl: true,
    });

    const mapAnimate = () => {
      mapAnimated = true;
      map.setZoom(15);
    };

    const closeAllPopups = () => {
      // @ts-ignore
      allPopups.forEach((popup) => {
        popup.close()
      })
    }

    const detailsClick = (gemId: string) => {
      let gem = (document.querySelector("#" + gemId) as HTMLElement)
      const gemPosition = gem?.offsetTop + (innerHeight * 0.35);

      props.setViewMode('list')
      setTimeout(() => {
        window.scrollTo({
          top: gemPosition,
          behavior: "smooth",
        });
      }, 500)
    }

    const clearGemSelections = () => {
      const mapGems = document.querySelectorAll(".map-gem");

      for (let i = 0; i < mapGems.length; i++) {
        mapGems[i].classList.remove("selected-gem");
        (mapGems[i].parentNode?.parentNode as HTMLElement).style.zIndex = "auto";
      }
    };

    const clearListGemSelections = () => {
      const listGems = document.querySelectorAll(".gem-icon");
      // Reset all list gem icons
      for (let i = 0; i < listGems.length; i++) {
        listGems[i].classList.remove("selected-gem");
      }
    }

    const selectMapGem = (gemId: string) => {
      debugEvents && console.log('ufo > selecting gem ' + gemId)
      clearGemSelections()
      clearListGemSelections()
      let gemIcon = document.querySelector(`#map-gem-${gemId}`)
      gemIcon?.classList.add("selected-gem"); // highlight map icon
    }

    const lightUpGems = (zoomed?: boolean) => {
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

      // Keep clicked gem selected if gem/s above are in view/focus
      if (clicked) {
        focusedGem = clickedGem;
      }

      clearGemSelections();

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
        debugEvents && console.log('ufo > resetting zoom')
        map.setZoom(initZoom!);
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
      /*scrollTimer = setTimeout(() => {
        lightUpGems();
      }, 150);*/
    };

    const addMarkers = async () => {
      debugEvents && console.log("%c ufo > ATTACHING MARKERS ", "color:green;")

      // Loop playbook gems
      for (let i = 0; i < props.gems.length; i++) {
        const gem = props.gems[i].primary.gem as unknown as Content.GemDocument;
        if (gem.data === undefined) {
          continue // prevents crash if empty gem added in CMS
        }

        if (gem.data.google_maps_id) {
          const div = document.createElement("div");
          const coords = {
            lat: gem.data.location?.latitude,
            lng: gem.data.location?.longitude,
          };

          if (coords.lat && coords.lat) {
            div.setAttribute("id", "map-gem-" + gem.uid);
            div.classList.add("map-gem");
            createRoot(div).render(
              <GemIcon
                category={gem.data.category}
                /*creator={(gem.data.creator as unknown as Content.CreatorDocument)?.data.profile_image.url}*/
                marker
                classes="-translate-x-1/2 -translate-y-1/2"
              />
            );

            const infoBox = document.createElement("div");
            infoBox.setAttribute('style', 'max-width: 230px');
            createRoot(infoBox).render(
              <>
                <div className="relative p-0 m-0 w-[230px] h-[130px] bg-cover bg-no-repeat bg-center" style={{
                  backgroundImage: `url(${gem.data.image.thumb.url as string})`,
                }} />
                <div className="relative p-3 !w-[230px]">
                  <h6 className="font-bold text-base leading-tight">{gem.data.title}</h6>
                  <p className="mb-3 text-sm">{gem.data.description}</p>
                  <div className="relative flex justify-between">
                    {!props.iframeMode && <Link className="underline text-sm" onClick={() => { sendGTMEvent({ event: 'c_map_click', campaign: 'music_city', type: 'directions', source: gem.uid }) }}
                          href={`https://www.google.com/maps/search/?api=1&query=${gem.data.title}&query_place_id=${gem.data.google_maps_id}`}
                          target="_blank">Get Directions</Link>}
                    <Link onClick={() => { sendGTMEvent({ event: 'c_map_click', campaign: 'music_city', type: 'details_list', source: gem.uid }); detailsClick("gem-" + gem.uid) }} href="#" className="underline text-sm">More Details</Link>
                  </div>
                </div>
              </>
            );

            const infoWindow = new google.maps.InfoWindow({
              content: infoBox,
            });
            allPopups.push(infoWindow)

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
              // close all
              closeAllPopups();
              infoWindow.open(map, marker)

              clickedGem = gem.uid;
              focusedGem = gem.uid;
              selectMapGem(gem.uid)
            });

            // after event listener attached

          } else {
            alert("Gem coords missing: " + gem.data.title);
          }
        } else {
          alert("Gem place ID missing: " + gem.data.title);
        }
      }

      props.gems.length && map.fitBounds(bounds); // Show all gems on map on init

      google.maps.event.addListener(map, "idle", () => {
        // triggers after markers are set
        if (!initZoom) {
          // Save initial zoom number and center position for map reset
          initZoom = map.getZoom();
          initCenter = map.getCenter();
        }
        /*if (!mapAnimated) {
          //mapAnimate();
          let center = map.getCenter()
          if (center) {
            let shiftedLat = center.lat() - initLatitudeShift
            initCenter = { lat: shiftedLat, lng: center.lng() }
            //map.setCenter(initCenter)
            initZoom = map.getZoom();
          }
        }*/
      });

      google.maps.event.addListenerOnce(map,'bounds_changed', function() {
        let center = map.getCenter()
        if (center && !mapAnimated) {
          let shiftedLat = center.lat() - initLatitudeShift
          initCenter = { lat: shiftedLat, lng: center.lng() }
          map.setCenter(initCenter)
          initZoom = map.getZoom();
          mapAnimated = true
        }
      });
    };

    addMarkers();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Clean up
  }, [props.gems]);

  return (
    <div ref={ref}
      className={`!fixed left-0 top-12 z-10 h-[calc(100vh-48px)] w-full shadow-none touch-none bg-ex-light-grey`}
    />
  );
}

type MapProps = {
  gems: SliceZone<Content.GemSlice>;
  viewMode: string;
  setViewMode: (arg: string) => void;
  selectedGem: string,
  setSelectedGem: (arg: string) => void;
  openedGem: string | undefined,
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
