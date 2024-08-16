import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "@/components/shared/Head";
import Hero from "@/components/shared/Hero";
import { createClient } from "@/prismicio";
import { useState } from "react";
import Map, { PlaceCoords } from "@/components/gem/Map";
import { ImageField, KeyTextField, RichTextField } from "@prismicio/client";
import Image from "next/image";
import { shimmer, toBase64 } from "@/utils/shimmer";
import Link from "next/link";
import LogoIcon from "@/img/logo-icon.svg";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Hotel({ page }: PageProps) {
  const [placeCoords, setPlaceCoords] = useState<PlaceCoords>({ lat: 0, lng: 0 });
  const [openingHours, setOpeningHours] = useState<string[] | undefined>(undefined);
  const [openStatus, setOpenStatus] = useState<string | undefined>();

  const crop = page.data.image;

  return (
    <>
    <Head page={page} />
      
    <main className="">
      <section className="relative !pl-0 !pr-0">
        <div className="h-[calc(100vh-80px)]">
          <div className="absolute top-20 w-full h-[80vh] bg-ex-blue"> {/* clipped blue bg */}
            <p className="inline-block absolute bottom-12 uppercase w-full pl-5 [writing-mode:sideways-lr] text-white font-semibold [letter-spacing: tracking-widest">In partnership with {page.data.title}</p>
            <LogoIcon
              onClick={() => {return false}}
              className="p-safe absolute top-4 left-4 box-content h-10 text-white opacity-35"
            />
            <div className="absolute right-0 bottom-0 h-14 md:h-24 bg-white w-4/6 [clip-path:polygon(25%_0,100%_0,100%_100%,0%_100%)] md:[clip-path:polygon(13%_0,100%_0,100%_100%,0%_100%)]"></div>
          </div>
          {/* page.data.image.url */}
          <div className={`relative bg-[url('/img/sydney_hero_mockup.png')] bg-cover bg-no-repeat bg-center md:h-[calc(100vh-160px)] h-[87vh] md:w-[calc(100%-130px)] w-auto ml-10 mr-4 md:mx-auto`}> {/* ${page.data.image.url} '/img/sydney_hero_mockup.png' */}
            <div className="absolute bottom-0 w-inherit p-4 text-white md:p-20 md:pt-10">
              <hgroup className="float-left w-2/5 pr-2 md:pr-3">
                <h1 className="text-3xl font-bold md:text-5xl">{page.data.title}</h1>
                <h3 className="text-lg !leading-tight md:text-2xl">{page.data.description}</h3>

                <Link className="hidden sm:inline-block px-7 py-3 mt-9 bg-ex-blue text-white w-auto text-center"
                      href="/travel-playbooks/sydney-with-g-flip">View Full Playbook</Link>
              </hgroup>

              <p
                className={`float-right w-2/5 text-right font-mono text-xs md:text-sm ${!placeCoords.lat && "hidden"}`}>
                {Math.abs(placeCoords.lat).toFixed(5)}°{placeCoords.lat < 0 ? "S" : "N"}
                <br />
                {Math.abs(placeCoords.lng).toFixed(5)}°{placeCoords.lng < 0 ? "W" : "E"}
              </p>

              <div className="clear-both"></div>
            </div>
          </div>

          {/* <Image
            src={crop.url as string}
            alt={crop.alt ? (crop.alt as string) : ""}
            width={crop.dimensions?.width}
            height={crop.dimensions?.height}
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(crop.dimensions?.width as number, crop.dimensions?.height as number),
            )}`}
          />*/}
        </div>
      </section>

      <section className="relative !pl-0 !pr-0 mb-24">
        <div className="px-[65px]">
          <h2 className="text-2xl font-bold md:text-5xl text-ex-blue mb-9">Follow Your Passion</h2>
          <div className="grid grid-cols-4 gap-9">
            <div className="md:col-span-2 md:row-span-2 min-h-[50vh] bg-green-200">
            </div>
            <div className="md:row-span-2 min-h-[50vh] bg-red-200">
            </div>
            <div className="col-span-1 bg-orange-200 min-h-[22vh]">
              <div className="bg-orange-200">
              </div>
              <div className="bg-orange-200">
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative !pl-0 !pr-0">
        <div className="h-[calc(100vh-80px)]">
          <div className="absolute top-20 w-full h-[80vh] bg-ex-blue"> {/* clipped blue bg */}
            <div
              className="absolute right-0 bottom-0 h-24 bg-white w-2/5 [clip-path:polygon(13%_0,100%_0,100%_100%,0%_100%)]"></div>
          </div>
          <div className="relative grid grid-cols-5 gap-9 h-[calc(100vh-160px)] w-[calc(100%-130px)] mx-auto">
            <div className="md:col-span-3">
              <img src="/img/g-flip-video-thumb.png" className="w-full max-h-[80vh]" alt="G Flip" />
            </div>
            <div className="md:col-span-2 md:w-3/5">
              <img src="/img/g-flip-singing.png" className="w-full h-auto mb-9" alt="G Flip" />
              <p className="text-white text-1xl">
                G Flip, born Georgia Flipo, is an Australian singer, songwriter, and multi-instrumentalist from Melbourne.
                Known for their energetic performances, they gained international recognition with their debut single "About You" in 2018.
                Their music blends pop and rock, often exploring themes of love and identity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative !pl-0 !pr-0">
      </section>

      <section className="!p-16">
        <Map
          // @ts-ignore
          gem={page}
          setPlaceCoords={setPlaceCoords}
          setOpeningHours={setOpeningHours}
          setOpenStatus={setOpenStatus}
        />
      </section>
    </main>
    <div className="hidden sm:hidden fixed bottom-0 z-[1000] w-full">
      <Link className="block py-7 bg-ex-blue text-white text-center"
            href={page.playbook.link}>View Full Playbook</Link>
    </div>
    </>
  )

};

export async function getStaticProps({ params, previewData }: GetStaticPropsContext) {
  try {

    throw new DOMException();

    const client = createClient({ previewData });
    const page = await client.getByUID("hotel", params?.uid as string, {
      fetchLinks:
        "hotel.name,hotel.hero_image,hotel.footer_image,hotel.address,hotel.location,hotel.description," +
        "hotel.address",
      // gems
      // playbook (for the link)
      // creator
    });

    return {
      props: {
        page,
        //search,
      },
    };
  } catch (error) {
    // todo: TEMP
    return {
      props: {
        page: {
          uid: 'pier-one-hotel',
          playbook: {
            link: '/travel-playbooks/sydney-with-g-flip'
          },
          data: {
            title: 'TEST Hotel',
            meta_title: 'TEST Hotel meta',
            meta_description: 'Description of a test hotel',
            about: null,
            meta_image: null,
            category: 'Accommodation',
            image: {
              //url: 'https://images.prismic.io/exceptionalalien/Zhx8FjjCgu4jzzzN_pier-one.jpg?auto=compress%2Cformat&rect=0%2C50%2C1200%2C630&w=1600&h=900&fit=max',
              url: '/img/sydney_hero_mockup.png',
              dimensions: {
                width: 1600,
                height: 900,
              },
              mobile: {
                url: '/img/sydney_hero_mockup.png',
                //url: 'https://images.prismic.io/exceptionalalien/Zhx8FjjCgu4jzzzN_pier-one.jpg?auto=compress%2Cformat&rect=0%2C50%2C1200%2C630&w=1600&h=900&fit=max'
              }
            },
            footer_image: {
              url: 'https://images.prismic.io/exceptionalalien/Zh5iikaI3ufuUODM_sydney-harbour-foreshore-walk.jpg?auto=format%2Ccompress&rect=0%2C201%2C3868%2C2031&w=2400&h=1260&w=3840&q=75',
              dimensions: {
                width: 1600,
                height: 900,
              },
              mobile: {
                url: 'https://images.prismic.io/exceptionalalien/Zh5iikaI3ufuUODM_sydney-harbour-foreshore-walk.jpg?auto=format%2Ccompress&rect=0%2C201%2C3868%2C2031&w=2400&h=1260&w=3840&q=75'
              }
            },
            description: 'Set alongside the Harbour Bridge, Pier One Sydney Harbour offers a premier hotel experience with water view accommodations and locally inspired restaurants.',
            google_maps_id: 'ChIJKRVAqFyuEmsRQGlTmkFIVOo',
          }
        }
      }
    }

    return { notFound: true };
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
