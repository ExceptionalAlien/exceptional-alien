import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import type { InferGetStaticPropsType, GetStaticPropsContext, GetStaticPaths } from "next";
import { createClient } from "@/prismicio";
import { Content, asLink, asText } from "@prismicio/client";
import Hero from "@/components/shared/Hero";
import About from "@/components/shared/About";
import PlaybooksGrid from "@/components/shared/PlaybooksGrid";
import Quotes from "@/components/gem/Quotes";
import Map, { PlaceCoords } from "@/components/gem/Map";
import SearchBox from "@/components/shared/SearchBox";
import TabHeading from "@/components/shared/TabHeading";
import GemIcon from "@/components/shared/GemIcon";
import Globe from "@/img/globe.svg";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Gem({ page, search }: PageProps) {
  const [placeCoords, setPlaceCoords] = useState<PlaceCoords>({ lat: 0, lng: 0 });
  const [openingHours, setOpeningHours] = useState<string[] | undefined>(undefined);
  const [openStatus, setOpenStatus] = useState<string | undefined>();
  var unlockedPBCount = 0;

  // Calculate how many unlocked Playbook's feature Gem
  for (let i = 0; i < page.data.playbooks.length; i++) {
    if (
      (page.data.playbooks[i]?.playbook as unknown as Content.PlaybookDocument).data &&
      !(page.data.playbooks[i]?.playbook as unknown as Content.PlaybookDocument).data.locked
    )
      unlockedPBCount++;
  }

  return (
    <>
      <Head>
        <title>{`${page.data.meta_title ? page.data.meta_title : page.data.title} | Exceptional ALIEN`}</title>

        <meta
          name="description"
          content={page.data.meta_description ? page.data.meta_description : asText(page.data.about)}
        />

        <meta property="og:url" content={`https://exceptionalalien.com/gems/${page.uid}`} />

        <meta
          property="og:title"
          content={`${page.data.meta_title ? page.data.meta_title : page.data.title} | Exceptional ALIEN`}
        />

        <meta
          property="og:description"
          content={page.data.meta_description ? page.data.meta_description : asText(page.data.about)}
        />

        <meta
          property="og:image"
          content={
            page.data.meta_image.url
              ? page.data.meta_image.url
              : page.data.image.seo.url
                ? page.data.image.seo.url
                : "https://exceptionalalien.com/img/og.png"
          }
        />
      </Head>

      <main className="md:max-w-3xl md:pt-16 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
        <Hero
          image={page.data.image}
          alt={page.data.title as string}
          credit={page.data.photo_credit as string}
          classes="!mt-0"
        >
          <div className="absolute top-0 w-full p-4 text-white md:p-6">
            <hgroup className="float-left w-3/5 pr-2 md:pr-3">
              <h2 className="text-3xl font-bold md:text-6xl">{page.data.title}</h2>

              <h3 className="text-lg !leading-tight md:text-2xl">
                {page.data.description?.charAt(0).toUpperCase()}
                {page.data.description?.substring(1).toLowerCase()}
              </h3>
            </hgroup>

            <p className={`float-right w-2/5 text-right font-mono text-xs md:text-sm ${!placeCoords.lat && "hidden"}`}>
              {Math.abs(placeCoords.lat).toFixed(5)}°{placeCoords.lat < 0 ? "S" : "N"}
              <br />
              {Math.abs(placeCoords.lng).toFixed(5)}°{placeCoords.lng < 0 ? "W" : "E"}
            </p>

            <div className="clear-both"></div>
          </div>
        </Hero>

        {/* Heading */}
        <section className="!mt-2 md:!mt-3">
          <TabHeading classes="relative">
            {asLink(page.data.website) && (
              <a
                href={asLink(page.data.website) as string}
                target="_blank"
                rel="nofollow"
                title="Website"
                className="absolute right-0 top-0 p-2 transition-[color] duration-300 ease-in-out hover:text-ex-light-grey [&>svg]:h-6"
              >
                <Globe />
              </a>
            )}

            {/* Address */}
            {openStatus && openStatus !== "OPERATIONAL" ? (
              <p className="mr-8 inline-block text-ex-red">{openStatus.replace("_", " ")}</p>
            ) : (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${page.data.title}&query_place_id=${page.data.google_maps_id}`}
                target="_blank"
                className="mr-8 inline-block text-pretty transition-[color] duration-300 ease-in-out hover:text-ex-light-grey"
              >
                {page.data.address}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="ml-1 inline h-4 w-4 align-[-3px]"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.207 2.232a.75.75 0 00.025 1.06l4.146 3.958H6.375a5.375 5.375 0 000 10.75H9.25a.75.75 0 000-1.5H6.375a3.875 3.875 0 010-7.75h10.003l-4.146 3.957a.75.75 0 001.036 1.085l5.5-5.25a.75.75 0 000-1.085l-5.5-5.25a.75.75 0 00-1.06.025z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            )}

            {/* Category */}
            <Link
              href={`/destinations/${
                (page.data.destination as unknown as Content.DestinationDocument).uid
              }?c=${page.data.category.toLowerCase().replace("&", "%26")}`}
              className="group/link flex w-max items-center uppercase text-ex-blue transition-[color] duration-300 ease-in-out hover:text-ex-light-grey"
            >
              <GemIcon
                category={page.data.category}
                hideBg={true}
                classes="mr-[6px] group-hover/link:text-ex-light-grey"
              />

              <span className="safari-ios-text-hack">
                {page.data.category.replace("Neighbourhoods", "Neighborhoods")}
              </span>
            </Link>
          </TabHeading>
        </section>

        <Quotes playbooks={page.data.playbooks} gem={page.uid} />
        <About text={page.data.about} />

        {/* Opening hours */}
        <section className={`text-ex-grey ${!openingHours && "hidden"}`}>
          <h4 className="text-xl font-bold md:float-left md:w-1/4 md:pr-6 md:text-2xl">Opening hours</h4>

          <p className="mt-4 md:float-right md:mt-0 md:w-3/4">
            {openingHours?.map((item, i) => (
              <span className="block" key={i}>
                {item}
              </span>
            ))}
          </p>

          <div className="clear-both"></div>
        </section>

        {unlockedPBCount ? (
          <PlaybooksGrid heading="Featured In" list={page.data.playbooks} showCreator={true} hideLocked />
        ) : (
          <></>
        )}

        <section>
          <Map
            gem={page}
            setPlaceCoords={setPlaceCoords}
            setOpeningHours={setOpeningHours}
            setOpenStatus={setOpenStatus}
          />
        </section>
      </main>

      <SearchBox recommended={search.data.recommended} hidden={true} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export async function getStaticProps({ params, previewData }: GetStaticPropsContext) {
  try {
    const client = createClient({ previewData });

    const page = await client.getByUID("gem", params?.uid as string, {
      fetchLinks:
        "playbook.title,playbook.image,playbook.locked,playbook.destination,playbook.creator,playbook.slices,creator.first_name,creator.last_name,creator.profile_image,destination.title",
    });

    const search = await client.getSingle("search", {
      fetch: "search.recommended,search.description",
      fetchLinks: "destination.title",
    });

    return {
      props: {
        page,
        search,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
