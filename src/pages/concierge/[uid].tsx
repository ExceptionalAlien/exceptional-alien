import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "@/components/shared/Head";
import Hero from "@/components/shared/Hero";
import { createClient } from "@/prismicio";
import { useEffect, useState } from "react";
import Map, { PlaceCoords } from "@/components/gem/Map";
import {
  asText,
  EmptyImageFieldImage,
  FilledImageFieldImage,
  ImageField,
  KeyTextField,
  RichTextField,
  Content,
} from "@prismicio/client";
import Image from "next/image";
import { shimmer, toBase64 } from "@/utils/shimmer";
import Link from "next/link";
import LogoIcon from "@/img/logo-icon.svg";
import { AsSeen } from "@/components/shared/AsSeen";
import Place from "@/img/icon-place.svg";
import Playbook from "@/img/icon-playbook.svg";
import GemIcon from "@/components/shared/GemIcon";
import Destination from "@/components/shared/Destination";
import Video from "@/components/playbook/Video";
import CreatorIcon from "@/components/shared/CreatorIcon";
import VideoEmbed from "@/components/shared/VideoEmbed";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Hotel({ page }: PageProps) {
  //const [placeCoords, setPlaceCoords] = useState<PlaceCoords>({ lat: 0, lng: 0 });
  const [openingHours, setOpeningHours] = useState<string[] | undefined>(undefined);
  const [openStatus, setOpenStatus] = useState<string | undefined>();
  const [crop, setCrop] = useState<FilledImageFieldImage | EmptyImageFieldImage>();
  const [breakpoint, setBreakpoint] = useState(-1);
  const [factor, setFactor] = useState(0);

  const influencer = page.data.creator as unknown as Content.CreatorDocument
  const playbook = page.data.hotel_playbook as unknown as Content.PlaybookDocument
  const playbookLink = '/hotel-playbooks/' + (playbook ? playbook.uid : '')

  useEffect(() => {
    const handleResize = () => {
      // @ts-ignore
      setCrop(window.innerWidth >= 768 ? page.data.image : page.data.image.mobile);
    };

    //handleResize();
    //window.addEventListener("resize", handleResize);
    //return () => window.removeEventListener("resize", handleResize);
  }, [page.data.image]);

  useEffect(() => {
    const isMobile= window.innerWidth < 768
    const playbookFooter = document.getElementById('playbookFooter');
    const playbookFloatingButtonBox = document.getElementById('playbookFloatingButtonBox');

    const footerTop = playbookFooter?.getBoundingClientRect().top ?? 3000;
    const buttonTop = playbookFloatingButtonBox?.getBoundingClientRect().top ?? 3500;
    const diff = buttonTop - footerTop

    const onScroll = () => {
      if (isMobile) {

        let bottomScroll = window.scrollY + window.innerHeight
        if (bottomScroll > buttonTop) {
          setBreakpoint(2)
          setFactor(0)
        } else if (bottomScroll > footerTop) {
          setBreakpoint(1)
          let normalisedDiff = (1 - Math.abs(bottomScroll - footerTop) / 1200);
          let factor= parseFloat((Math.min(1, Math.max(0.75, (normalisedDiff)))).toFixed(3))
          setFactor(factor)
        } else {
          setFactor(0)
          setBreakpoint(0)
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroImage = page.data.image;
  const footerImage = page.data.footer_image;
  /*const src = "";
  useEffect(() => {
    let img = document.createElement("img");
    img.src = heroImage.url;
    img.onload = (e) => {
    };
  }, [src]);*/

  return (
    <>
    <Head page={page} />

    <main className="!pb-0">
      <section className="relative block overflow-auto !pl-0 !pr-0">
        <div className="h-[calc(100vh-80px)] md:h-[calc(100vh-80px)]">
          <div className="absolute top-[48px] md:top-[80px] w-full h-[80vh] bg-ex-blue">
            <p className="inline-block absolute bottom-9 md:bottom-12 uppercase text-xs md:text-base w-full -mb-11 md:-mb-9 pt-3 md:pt-5 text-white font-semibold tracking-widest"
              style={{
                transform: `rotate(-90deg)`,
                transformOrigin: `0 0`,
              }}
            >
              In partnership with {page.data.title}</p>
            <LogoIcon onClick={() => { return false; }}
              className="p-safe absolute top-4 left-3 md:top-4 md:left-4 box-content h-6 md:h-10 text-white opacity-35"
            />
            <div
              className="absolute right-0 bottom-0 h-14 md:h-24 bg-white w-4/6 md:w-2/5 [clip-path:polygon(25%_0,100%_0,100%_100%,0%_100%)] md:[clip-path:polygon(13%_0,100%_0,100%_100%,0%_100%)]"></div>
          </div>

          <div
            className={`relative bg-cover bg-no-repeat bg-center md:h-[calc(100vh-160px)] h-[84vh] md:w-[calc(100%-130px)] w-auto ml-10 mr-4 md:mx-auto`}
            style={{
              backgroundImage: `url('${heroImage.url}')`
            }}
          >
            <div className="absolute bottom-0 w-full p-4 text-white md:p-20 text-gradient">
              <hgroup className="float-left w-full md:w-2/3 2xl:w-2/6 pr-2 md:pr-3">
                {!page.data.logo && <h1 className="text-3xl font-bold md:text-5xl mb-3">{page.data.title}</h1>}
                {page.data.logo && <img src={`${page.data.logo.url}`} className="mb-3 max-w-[60%] h-auto" alt="Logo" />}
                <hr className="border-gray-300 opacity-40 mb-3" />
                <p className="w-auto text-left text-white text-sm md:text-base font-bold mb-5">
                  {(page.data.destination as unknown as Content.DestinationDocument).data.country}</p>
                <h3 className="!leading-tight text-base md:text-xl md:pr-9">{page.data.description}</h3>

                <Link className="hidden sm:inline-block px-7 py-3 mt-9 bg-ex-blue text-white w-auto text-center"
                      href={playbookLink}>View Full Playbook</Link>
              </hgroup>
            </div>

            <div className="absolute top-0 left-0 p-4 md:p-16">
              <p
                className="w-auto text-left text-white font-mono text-xs md:text-sm uppercase [&>svg]:h-5 [&>svg]:mr-1 [&>svg]:float-left">
              <Place />{(page.data.destination as unknown as Content.DestinationDocument).data.title}</p>
            </div>

            <div className="absolute top-0 right-0 p-4 md:p-16">
              <p
                className={`w-auto text-right text-white font-mono text-xs md:text-sm ${!page.data.location.latitude && "hidden"}`}>
                {Math.abs(page.data.location.latitude).toFixed(5)}°{page.data.location.latitude < 0 ? "S" : "N"}
                <br />
                {Math.abs(page.data.location.longitude).toFixed(5)}°{page.data.location.longitude < 0 ? "W" : "E"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative block overflow-auto !pl-0 !pr-0 md:pb-24 pb-12">
        <div className="px-5 md:px-[65px]">
          <h2 className="text-2xl font-bold md:text-5xl mb-9">
            Discover Local Gems</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-9">
            <Link href={playbookLink} className="group hover:drop-shadow-[5px_5px_5px_rgba(0,0,0,0.55)] cursor-pointer ease-out duration-300 transition-[transform, shadow, drop-shadow] relative md:col-span-2 md:row-span-2 min-h-[50vh] bg-green-200 bg-[url('/img/categories/food.jpeg')] bg-cover bg-no-repeat bg-center">
              <div>
                <div className="absolute top-7 left-7">
                  <GemIcon category="Food & Drink" classes={`!h-16 !w-16`}></GemIcon>
                </div>
                <div className="absolute bottom-0 text-gradient flex p-7 pt-12 w-full">
                  <h3 className="text-white text-2xl font-bold">Food & Drink</h3>
                </div>
              </div>
            </Link>

            <Link href={playbookLink} className="group hover:drop-shadow-[5px_5px_5px_rgba(0,0,0,0.55)] cursor-pointer ease-out duration-300 transition-[transform, shadow, drop-shadow] relative md:row-span-2 min-h-[50vh] bg-red-200 bg-[url('/img/categories/outdoor.jpeg')] bg-cover bg-no-repeat bg-cente">
              <div>
                <div className="absolute top-7 left-7">
                  <GemIcon category="Neighbourhoods" classes={`!h-16 !w-16`}></GemIcon>
                </div>
                <div className="absolute bottom-0 text-gradient flex p-7 pt-12 w-full">
                  <h3 className="text-white text-2xl font-bold">Neighbourhoods</h3>
                </div>
              </div>
            </Link>

            <Link href={playbookLink} className="group hover:drop-shadow-[5px_5px_5px_rgba(0,0,0,0.55)] cursor-pointer ease-out duration-300 transition-[transform, shadow, drop-shadow] relative col-span-1 bg-orange-200 min-h-[30vh] bg-[url('/img/categories/retail.jpeg')] bg-cover bg-no-repeat bg-cente">
              <div>
                <div className="absolute top-7 left-7">
                  <GemIcon category="Retail" classes={`!h-16 !w-16`}></GemIcon>
                </div>
                <div className="bg-orange-200">
                  <div className="absolute bottom-0 text-gradient flex p-7 pt-12 w-full">
                    <h3 className="text-white text-2xl font-bold">Retail</h3>
                  </div>
                </div>
              </div>
            </Link>

            <Link href={playbookLink} className="group hover:drop-shadow-[5px_5px_5px_rgba(0,0,0,0.55)] cursor-pointer ease-out duration-300 transition-[transform, shadow, drop-shadow] relative col-span-1 bg-orange-200 min-h-[30vh] bg-[url('/img/categories/events.jpeg')] bg-cover bg-no-repeat bg-cente">
              <div>
                <div className="absolute top-7 left-7">
                  <GemIcon category="Events" classes={`!h-16 !w-16`}></GemIcon>
                </div>
                <div className="bg-orange-200">
                  <div className="absolute bottom-0 text-gradient flex p-7 pt-12 w-full">
                    <h3 className="text-white text-2xl font-bold">Events</h3>
                  </div>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      <section className="relative block !pl-0 !pr-0">
        <div className="h-auto min-h-[calc(100vh-70px)] md:min-h-[calc(100vh-70px)]">
          <div className="relative block w-full h-auto min-h-[70vh] bg-ex-blue">
            <div
              className="absolute left-0 top-0 h-14 md:h-20 bg-white w-full">
            </div>
            <div
              className="absolute right-0 bottom-0 h-14 md:h-24 bg-white w-4/6 md:w-2/5 [clip-path:polygon(25%_0,100%_0,100%_100%,0%_100%)] md:[clip-path:polygon(13%_0,100%_0,100%_100%,0%_100%)]">
            </div>
            <div
              className="relative grid grid-cols-1 md:grid-cols-11 gap-9 h-auto min-h-[90vh] w-auto md:w-[calc(100%-130px)] ml-4 mr-4 md:mx-auto">
              <div className="relative col-span-1 md:col-span-6">
                {(page.data.video) && <div className="relative aspect-video [&>iframe]:h-[75vh] [&>iframe]:w-full [&>iframe]:rounded-bl-[50px]">
                  <VideoEmbed embed={page.data.video} />
                </div>}
                {(!page.data.video && (influencer.data?.hero_image as unknown as boolean)) && <div className={`w-full h-[75vh] rounded-bl-[50px] min-h-[20vh] bg-gray-100 bg-[url('${influencer.data?.hero_image?.url as string}')] bg-cover bg-no-repeat bg-center`} />}
              </div>
              <div className="relative block col-span-1 md:col-span-3">
                <img src={influencer.data?.profile_image?.url as string} className="block w-full h-auto min-h-[30vh] mb-9 bg-gray-100" alt="Profile Image" />
                <p className="block text-white text-1xl mb-9">{influencer.data?.short_description}</p>
                <div className="relative inline-block mb-12 md:mb-9">
                  <Link href={"/contributors/" + influencer.uid}
                    className="w-auto transition-[opacity] duration-300 ease-in-out hover:opacity-60"
                  >
                    <div className={`flex align-center`}>
                      <div
                        className={`shrink-0 overflow-hidden rounded-full border border-white bg-white h-12 w-12`}>
                        <img src={influencer.data?.profile_image?.url as string} alt="Profile Image"
                             className="grayscale6" />
                      </div>
                      <p
                        className="pl-3 pr-5 pt-3 text-left text-sm text-white [overflow-wrap:anywhere] md:text-sm underline">
                        {influencer.data.first_name} {influencer.data.last_name?.toUpperCase()}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="md:col-span-2">
                <LogoIcon
                  onClick={() => {
                    return false;
                  }}
                  className="hidden md:block relative mx-auto mt-36 box-content h-6 md:h-36 text-white opacity-35"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="playbookFooter" className="relative block overflow-auto !pl-0 !pr-0">
        <div
          className={`relative flex justify-center items-center h-[calc(100vh-17vh-80px)] bg-cover bg-no-repeat bg-center`}
          style={{
            backgroundImage: `url('${footerImage.url}')`
          }}
        >
          <div className="absolute w-full h-full opacity-50 bg-black"></div>
          <div className="relative block text-center w-full md:w-1/2 m-auto p-5 md:p-0">
            <p className="text-3xl font-bold text-white mb-5 [&>svg]:h-9 [&>svg]:mr-1 [&>svg]:inline-block">
              <Playbook /> Travel Playbook<span className="text-xl mx-3">+</span>{page.data.title}</p>
            <h2 className="text-white text-5xl font-bold uppercase leading-snug">Explore the <br />{page.data.title} Playbook</h2>
            <div id="playbookFloatingButtonBox" className="relative mt-9 h-12 w-2/3 flex justify-center mx-auto">
              <Link className={`fixed md:relative inline-block bottom-0 left-0 z-[1000] py-5 w-full sm:w-auto px-7 sm:py-3 bg-ex-blue text-white text-center ${((breakpoint >= 0) && ((breakpoint == 2) ? `!relative !z-10 !py-3 !scale-100`: `!fixed`))}`}
                    style={{
                      transform: `scale(${(breakpoint == 1) ? factor : 1.0})`,
                    }}
                    href={playbookLink}>View Full Playbook</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative block overflow-auto !pl-0 !pr-0 !mt-14 md:!mt-0 pb-14 md:pb-0">
        <div className="flex flex-wrap md:flex-nowrap h-auto md:h-[18vh] gap-9 px-5 md:px-[65px] w-full
                        items-center justify-around md:justify-between [&>a>img]:h-auto">
          <AsSeen />
        </div>
      </section>

    </main>
    </>
)
};

export async function getStaticProps({ params, previewData }: GetStaticPropsContext) {
  try {
    const client = createClient({ previewData });
    const page = await client.getByUID("hotel", params?.uid as string, {
      fetchLinks:
        "hotel.title,hotel.image,hotel.footer_image,hotel.address,hotel.location,hotel.description,hotel.address," +
        "hotel.video,hotel.logo,hotel.logo_icon," +
        "destination.title,destination.country," +
        "creator.title,creator.profile_image,creator.hero_image,creator.description,creator.short_description,creator.first_name,creator.last_name," +
        "playbook.uid"
    });

    return {
      props: {
        page,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
