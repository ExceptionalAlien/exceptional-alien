import { useEffect, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import { SliceZone, Content } from "@prismicio/client";
import { Wrapper } from "@googlemaps/react-wrapper";
import GemIcon from "@/components/shared/GemIcon";
import Link from "next/link";

function GoogleMap(props: MapProps) {
  const [scrollEndLandscape, setScrollEndLandscape] = useState(false);
  const [scrollEndPortrait, setScrollEndPortrait] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hotel = (props.hotel as unknown as Content.HotelDocument).data;
  let allMarkers = useRef<any[]>(null);

  useEffect(() => {
    const clickFromList = (gemId: string) => {
      let gemMarker = (document.querySelector("#map-gem-" + gemId) as HTMLElement)

      ref.current?.focus()
      setTimeout(() => {
        if (gemMarker) {
          gemMarker?.click(); // todo: markers list sometimes gone..
        } else {
          console.log("%c Markers gone from the map", "color: red;")
        }

      }, 300)
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
    var initCenter: google.maps.LatLng | undefined;
    var focusedGem: string | undefined;
    var clickedGem: string | undefined;
    var clicked = false;
    var animating = false;
    var clickedTimer: NodeJS.Timeout;

    let mapInitialised = false;
    let debugEvents = false;

    initZoom = 15;
    let initLatitudeShift = 0.011; // so the map is centered more to the top

    // @ts-ignore
    let allPopups = [];

    // Create map
    const map = new window.google.maps.Map(ref?.current!, {
      mapId: "a558980281942a22",
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      clickableIcons: false,
      backgroundColor: "#C5C5C5",
      scrollwheel: false,
      gestureHandling: "greedy",
      zoomControl: true, // todo: isMobile ? false : true,
    });

    const mapInit = () => {
      mapInitialised = true;
      initZoom && map.setZoom(initZoom);
      if (hotel.location.latitude) {
        map.setCenter({
          lat: hotel.location.latitude - initLatitudeShift,
          lng: hotel.location.longitude,
        });
      }
      debugEvents && console.log('ufo > initialising the map, zoom: ' + initZoom)
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

      //document.querySelector(`section#gem-${gemId} .gem-icon`)?.classList
      //    .add("selected-gem"); // Select gem icon on the list
      let gemIcon = document.querySelector(`#map-gem-${gemId}`)
      gemIcon?.classList.add("selected-gem"); // highlight map icon
    }

    const setGems = (zoomed?: boolean) => {
      focusedGem = ""; // Reset
      const gems = document.querySelectorAll("section.gem");

      debugEvents && console.log('ufo > setting gems')

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

    //setGems(); // Init for desktop

    const addHotelPin = () => {
      if (hotel && hotel.location.latitude && hotel.logo_icon) {
        const coords = {
          lat: hotel.location.latitude,
          lng: hotel.location.longitude,
        };
        const div = document.createElement("div");
        div.setAttribute("id", "hotel");
        createRoot(div).render(
          <div
            className="absolute shrink-0 overflow-hidden rounded-full border border-white bg-white h-10 w-10 z-[1] -translate-x-1/2 -translate-y-1/2">
            <img src={`${hotel.logo_icon.url}`} className="w-full h-full" alt="Logo" />
          </div>,
        );

        // Add marker to map
        const marker = new window.google.maps.marker.AdvancedMarkerElement({
          map,
          position: coords,
          title: hotel.title,
          content: div,
        });
      } else {
        console.warn('Hotel coordinates missing')
      }
    }

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

      console.log("%c ufo > ATTACHING MARKERS ", "color:green;")

      // Loop playbook gems
      for (let i = 0; i < props.gems.length; i++) {
        const gem = props.gems[i].primary.gem as unknown as Content.GemDocument;

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
            createRoot(div).render(
              <GemIcon
                category={gem.data.category}
                creator={(gem.data.creator as unknown as Content.CreatorDocument)?.data.profile_image.url}
                marker
                classes="-translate-x-1/2 -translate-y-1/2"
              />
            );

            const infoBox = document.createElement("div");
            infoBox.setAttribute('style', 'max-width: 210px');
            /*createRoot(infoBox).render(<p style={{
              display: `block`,
              width: `100px`,
              backgroundColor: `orange`
            }}>HEY DUDE</p>)*/
            createRoot(infoBox).render(
              <>
                <div className="relative p-0 m-0 w-[210px] h-[130px] bg-cover bg-no-repeat bg-center" style={{
                  backgroundImage: `url(${gem.data.image.thumb.url as string})`,
                }} />
                <div className="relative p-3 !w-[210px]">
                  <h6 className="font-bold">{gem.data.title}</h6>
                  <p className="mb-3">{gem.data.description}</p>
                  <div className="relative flex justify-between">
                    <Link onClick={() => { detailsClick("gem-" + gem.uid) }} href="#" className="underline text-xs">More Details</Link>
                    <Link className="underline text-xs"
                          href={`https://www.google.com/maps/search/?api=1&query=${gem.data.title}&query_place_id=${gem.data.google_maps_id}`}
                          target="_blank">Get Directions</Link>
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

              /*
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

                debugEvents && console.log('ufo > centering map from marker')
                map.setCenter({ lat: marker.position?.lat as number, lng: marker.position?.lng as number });
                initZoom && map.setZoom(initZoom + 2);
              }

              clickedGem = gem.uid;*/
            });

            // after event listener attached

            // @ts-ignore
            allMarkers[gem.uid] = marker

          } else {
            alert("Gem coords missing: " + gem.data.title);
          }
        } else {
          alert("Gem place ID missing: " + gem.data.title);
        }
      }

      props.gems.length && map.fitBounds(bounds); // Show all gems on map on init

      google.maps.event.addListener(map, "idle", () => {
        /* if (!initZoom) {
          // Save initial zoom number and center position for map reset
          initZoom = map.getZoom();
          initCenter = map.getCenter();
          console.log('ufo IDLE > SAVING initZoom and center')
        }*/
        debugEvents && console.log('ufo IDLE > triggered')

        if (!mapInitialised) {
          mapInit();
          setGems(true);
        }

        //setGems(true); // Set gems after map zoom or drag # todo: fires every time
      });
    };

    addMarkers();
    addHotelPin();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Clean up
  }, [props.gems]);

  {/* w was -576px todo: change height
  md:top-20 min-[1152px]:w-[calc(100%-576px)] portrait:w-full portrait:min-[768px]:h-96 landscape:h-[calc(100%-48px)] md:landscape:h-[calc(100%-80px)]
  ${scrollEndLandscape && "landscape:!absolute landscape:!top-auto"}
  */}
  return (
    <div ref={ref}
      className={`!fixed left-0 top-12 z-10 h-[calc(100vh-48px)] w-full shadow-none touch-none bg-ex-light-grey
        ${false && scrollEndPortrait && "portrait:!absolute portrait:!top-auto"}
      `}
    />
  );
}

type MapProps = {
  gems: SliceZone<Content.GemSlice>;
  viewMode: string;
  setViewMode: (arg: string) => void;
  selectedGem: string,
  setSelectedGem: (arg: string) => void;
  hotel: Content.HotelDocument;
  viewerRef: HTMLDivElement;
};

export default function Map(props: MapProps) {
  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!} libraries={["marker", "places"]}>
      <GoogleMap {...props} />
    </Wrapper>
  );
}
