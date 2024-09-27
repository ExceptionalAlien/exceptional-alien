import Link from "next/link";
import Globe from "@/img/globe.svg";
import DiamondIcon from "@/img/icon-gem.svg";
import CloseIcon from "@/img/icon-close.svg";
import { useEffect, useState } from "react";
import GemIcon from "@/components/shared/GemIcon";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import Footer from "@/components/layout/Footer";
import PlaceIcon from "@/img/icon-place.svg";
import CompassIcon from "@/img/icon-compass.svg";
import CurvedArrowIcon from "@/img/icon-curved-arrow.svg";
import Slider from "@/components/shared/Slider";
import Quote, { QuoteProps } from "@/components/music/Quote";
import { GroupField, RichTextField } from "@prismicio/client";
import { createClient } from "@/prismicio";
import LogoIcon from "@/img/logo-icon.svg";
import SponsoredButton from "@/components/shared/SponsoredButton";

type GemPopupProps = {
  openedGem: any,
  setOpenedGem: (arg: any) => void,
  contain?: boolean,
  iframeMode: boolean,
  ctaLinkData?: {
    destination: string,
    link: string,
    pageUid: string,
  }
}

export const GemPopup = (props: GemPopupProps) => {
  const [object, setObject] = useState<any>()
  const [openingHours, setOpeningHours] = useState<string[] | undefined>();
  const [quotes, setQuotes] = useState<QuoteProps[]>([])

  useEffect(() => {
    setObject(props.openedGem)

    const getPlaceDetails = async (placeId: string) => {
      const service = new google.maps.places.PlacesService(document.createElement('div'));
      const request = {
        placeId: placeId,
        fields: ["opening_hours", "business_status"],
      };

      return new Promise((resolve) =>
        service.getDetails(request, (place, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            place
          ) {
            resolve(place);
          }
        })
      );
    };

    const getPlaceWrapperFunc = async () => {
      if (props.openedGem && props.openedGem.primary.gem.data.google_maps_id) {
        const place = (await getPlaceDetails(props.openedGem.primary.gem.data.google_maps_id as string)) as google.maps.places.PlaceResult;
        setOpeningHours(place.opening_hours?.weekday_text);
      }
    }

    getPlaceWrapperFunc();

    const fetchGemData = async (gemUid: string) => {
      try {
        const client = createClient({});
        return await client.getByUID("gem", gemUid, {
          fetchLinks:
            "playbook.title,playbook.image,playbook.locked,playbook.destination,playbook.creator,playbook.slices,"+
            "creator.first_name,creator.last_name,creator.profile_image,destination.title",
        });

      } catch (error) { console.log(error) }
    }

    const prepareQuotes = async () => {
      const fetchedQuotes: QuoteProps[] = []
      const gemObject = await fetchGemData(props.openedGem.primary.gem.uid)

      gemObject && gemObject.data.playbooks.map((playbookObject: any) => {
        const playbook = playbookObject.playbook
        const creator = playbook.data?.creator
        const playbookCreator = playbook.data?.creator
        const slices = playbook.data?.slices

        slices && slices.map((gemSlice: any, i: number) => {
          if (gemSlice.primary.gem.id === props.openedGem.primary.gem.id) {
            fetchedQuotes.push({
              uid: creator.data ? creator.uid : playbook.uid,
              firstName: creator.data
                ? (creator.data.first_name as string)
                : (playbookCreator.data.first_name as string),
              lastName: creator.data
                ? (creator.data.last_name as string)
                : (playbookCreator.data.last_name as string),
              image: creator.data ? creator.data.profile_image : playbook.data.image,
              quote: gemSlice.primary.description
            })
          }
        })
      })

      if (fetchedQuotes.length > 0) setQuotes(fetchedQuotes)
    }

    if (props.openedGem) {
      prepareQuotes()
    }

  }, [props.openedGem])

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    props.setOpenedGem(null)
    setQuotes([])
    setOpeningHours(undefined)
  }

  return (
    <div className={`!overflow-y-scroll z-50 bg-white transition-all duration-500 ease-in pb-9 ${props.contain ? `fixed right-5 w-[calc(50%-20px)] min-[1152px]:w-[536px]` : `fixed left-0 w-full`}`}
      style={{
        display: props.openedGem ? 'block' : 'none',
        top: props.iframeMode ? '0' :
          props.contain
            ? '80px' : '0',
        height: props.iframeMode ? '100vh' :
          props.contain
            ? 'calc(100vh - 80px)' : '100vh'
      }}
    >
    {object && <>
      <div className="fixed bg-white h-12 z-50 w-[inherit] flex justify-between content-center">
        <div><p className="text-white text-sm px-3 py-3.5 [&>svg]:h-4 [&>svg]:mr-1 [&>svg]:inline-block text-nowrap">
          {/*<DiamondIcon /> {object.primary.gem.data.title}*/}
        </p></div>
        <div className="flex justify-end pr-3">
          <button className="inline-block [&>svg]:text-black [&>svg]:h-4 [&>svg]:w-4 [&>svg]:block" onClick={handleClose}>
            <CloseIcon />
          </button>
        </div>
      </div>
      <div>
        <div className="relative p-5 pt-0 mt-12">
          {object.primary.gem.data.image && (
            <div className="w-full h-[30vh] md:h-[40vh] bg-cover bg-no-repeat bg-center mb-5" style={{
              backgroundImage: `url('${object.primary.gem.data.image.thumb.url}')`,
            }} />
          )}

          <GemIcon category={object.primary.gem.data.category} classes="left-8 top-4 !h-16 !w-16 [&>svg:nth-child(4)]:text-sky-blue [&>svg:nth-child(5)]:text-white [&>svg:nth-child(2)]:text-sky-blue" marker={true} />

          <div className="relative mb-4 sm:mb-2">
            <div className="block pr-1 md:mr-12 md:pr-2 [&>*]:leading-tight w-[calc(100%-40px)]">
              <h4 className="text-xl font-bold md:text-2xl">{object.primary.gem.data.title}</h4>
              <h5 className="text-zinc-500">{object.primary.gem.data.description}</h5>
            </div>
          </div>

          <div className={`gem-text w-full [&>p]:text-base [&>p]:!text-black mb-4 sm:mb-2`}>
            <PrismicRichText field={object.primary.gem.data.about} />
          </div>

          {props?.ctaLinkData?.link && <div className="mt-5 w-full lg:w-1/2">
            <SponsoredButton link={props.ctaLinkData.link as string} source={props.ctaLinkData.pageUid}
                             classes={'!text-sky-blue bg-white border-sky-blue rounded-xl hover:!bg-sky-blue hover:!text-white'}
                             campaign="skyscanner" title={`Find Hotels in ${props.ctaLinkData.destination}`} />
          </div>}
        </div>
      </div>

      {(quotes.length > 0) && <div className="">
        <hr className="mx-5 mb-5" />
        <h4 className="text-xl font-bold md:text-2xl px-5 mb-4">Recommended by</h4>
        <div className="">
          <Slider minItems={1}>
            {quotes.map((item, i) => (
            <Quote
              key={i}
              uid={item.uid}
              firstName={item.firstName}
              lastName={item.lastName}
              image={item.image}
              quote={item.quote}
            />))}
          </Slider>
        </div>
      </div>}

      {object.primary.gem.data?.insider_tip &&
        <div className="p-5 pb-0">
          <hr className="mb-5" />
          <section className="w-full md:w-[calc(80%+16px)] mt-5">
            <div className="p-3 w-auto bg-sky-blue text-white">
              <h6 className="relative font-bold mb-2 [&>svg]:absolute [&>svg]:top-[1px] [&>svg]:w-auto [&>svg]:h-[20px]">
                <LogoIcon />
                <span className="ml-[26px]">EA Tip</span>
              </h6>
              <p>{object.primary.gem.data.insider_tip}</p>
            </div>
          </section>
        </div>
      }

      <div className="p-5 pb-0">
        <hr className="mb-5" />
        <h4 className="text-xl font-bold md:text-2xl mb-4">Location</h4>

        <p className="text-black mb-3">
          <span
            className="relative [&>svg]:h-auto [&>svg]:w-3.5 [&>svg]:absolute [&>svg]:top-[-1px] [&>svg]:left-[2px] mr-2 bg-orange-200"><PlaceIcon /></span>
          <span className="pl-4 text-sky-blue">{object.primary.gem.data.address}</span>
        </p>

        {object.primary.gem.data.location.latitude && <p className="text-black mb-3">
          <span
            className="relative [&>svg]:h-auto [&>svg]:w-5 [&>svg]:absolute [&>svg]:top-[0] mr-2 bg-orange-200"><CompassIcon /></span>
          <span className="pl-4 text-sky-blue">
            {Math.abs(object.primary.gem.data.location.latitude).toFixed(5)}°{object.primary.gem.data.location.latitude < 0 ? "S" : "N"},&nbsp;
            {Math.abs(object.primary.gem.data.location.longitude).toFixed(5)}°{object.primary.gem.data.location.longitude < 0 ? "W" : "E"}
          </span>
        </p>}

        {!props.iframeMode && object.primary.gem.data.website &&
          <Link href={(object.primary.gem.data.website.url as string)} target="_blank" className="block text-black mb-3">
          <span className="relative [&>svg]:h-auto [&>svg]:w-3.5 [&>svg]:absolute [&>svg]:top-[2px] [&>svg]:left-[2px] mr-2 bg-orange-200"><CurvedArrowIcon /></span>
          <span className="pl-4 text-sky-blue underline">Visit website</span>
        </Link>}

        {!props.iframeMode && <a href={`https://www.google.com/maps/search/?api=1&query=${object.primary.gem.data.title}&query_place_id=${object.primary.gem.data.google_maps_id}`} target="_blank" className={`relative mt-2 inline-block rounded-xl border border-sky-blue px-5 py-2 bg-sky-blue text-white text-sm transition-[border-color,color] duration-300 ease-in-out hover:bg-white hover:text-sky-blue`}>
          Get Directions
        </a>}
      </div>

      {openingHours && <div className="p-5">
        <hr className="mb-5" />
        <h4 className="text-xl font-bold md:text-2xl mb-4">Opening hours</h4>
        {openingHours?.map((item, i) => (
          <span className="block text-zinc-500" key={i}>
            {item}
          </span>
        ))}
      </div>}
    </>}

    </div>
  )
};