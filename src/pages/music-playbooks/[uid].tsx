import { useState, useEffect, useRef } from "react";
import Head from "@/components/shared/Head";
import type { InferGetStaticPropsType, GetStaticPropsContext, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { createClient } from "@/prismicio";
import { Content, asText } from "@prismicio/client";
import Video from "@/components/playbook/Video";
import Related from "@/components/playbook/Related";
import SearchBox from "@/components/shared/SearchBox";
import { element } from "prop-types";
import { default as DesktopList } from "@/components/music/desktop/List";
import { default as DesktopMap } from "@/components/music/desktop/Map";
import { default as MobileViewer } from "@/components/music/mobile/Viewer";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const cityGuides: Map<string, MusicCityObject> = new Map([
  [ 'discover-the-citys-hottest-music-venues', { // New York, Jitwam
      flights: 'https://skyscanner.pxf.io/PyJxPz', // 'https://www.skyscanner.net/flights-to/nyca/',
      hotels: 'https://skyscanner.pxf.io/k0D6xz', // https://www.skyscanner.net/hotels/search?entity_id=27537542'
  }],
  [ 'los-angeles-with-ny-oh', {
      flights: 'https://skyscanner.pxf.io/rQkM7R', // 'https://www.skyscanner.net/flights-to/laxa/',
      hotels: 'https://skyscanner.pxf.io/jrxbv5', // https://www.skyscanner.net/hotels/search?entity_id=27536211'
  }],
  [ 'manchester-with-lusaint', {
      flights: 'https://skyscanner.pxf.io/EKrB4P', // 'https://www.skyscanner.net/flights-to/man/',
      hotels: 'https://skyscanner.pxf.io/ba4Xn9', // https://www.skyscanner.net/hotels/search?entity_id=46432027',
  }],
  [ 'toronto-with-valley', {
      flights: 'https://skyscanner.pxf.io/0ZEqeV', // https://www.skyscanner.net/flights-to/ytoa/',
      hotels: 'https://skyscanner.pxf.io/ba4XEx', // https://www.skyscanner.net/hotels/search?entity_id=27536640'
  }],
  [ 'berlin-with-christian-rich', {
      flights: 'https://skyscanner.pxf.io/y2JM02', // https://www.skyscanner.net/flights-to/ber/',
      hotels: 'https://skyscanner.pxf.io/Kjab1x', // https://www.skyscanner.net/hotels/search?entity_id=27547053',
  }]
])

type MusicCityObject = {
  flights: string,
  hotels: string
}

export default function Playbook({ page, search }: PageProps) {
  const router = useRouter();
  const [showVideo, setShowVideo] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const hasRelated = page.data.related.length > 1;
  const [iframeMode, setIframeMode] = useState<boolean>(false)

  const [viewerRef, setViewerRef] = useState<HTMLDivElement>();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function detectDevice() {
      setMobile(window.innerWidth < 768)
    }
    setViewerRef(ref.current!);

    detectDevice()
    window.addEventListener("resize", detectDevice);
    return () => window.removeEventListener("resize", detectDevice);
  }, [isMobile]);

  useEffect(() => {
    if (router.isReady && router.query.iframe) {
      setIframeMode(true)
    }
  }, [router.isReady]);

  return (
    <>
      <Head page={page} />

      <main className={`${!hasRelated && "!pb-0"}`}>
        <div ref={ref}>
        {isMobile && (
          <div>
            <MobileViewer iframeMode={iframeMode} data={page.data} setShowVideo={() => { return false }} allowedPlaybooks={cityGuides} viewerRef={viewerRef!} pageSlug={page.uid} />
          </div>
        )}
        {!isMobile && (
          <div className="flex items-end justify-end">
            <DesktopList iframeMode={iframeMode} data={page.data} setShowVideo={() => { return false }} allowedPlaybooks={cityGuides} pageSlug={page.uid} />
            <DesktopMap iframeMode={iframeMode} gems={page.data.slices} viewerRef={viewerRef!} />
          </div>
        )}
        </div>
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

    if (cityGuides.get(params?.uid as string) === undefined) {
      return { notFound: true };
    }

    const page = await client.getByUID("playbook", params?.uid as string, {
      fetchLinks:
        "creator.first_name,creator.last_name,creator.profile_image,creator.uid," +
        "gem.title,gem.location,gem.image,gem.category,gem.creator,gem.address,gem.google_maps_id,gem.description,gem.insider_tip,gem.website,gem.about,gem.alternative_text," +
        "destination.title,playbook.title,playbook.locked,playbook.image,playbook.destination,playbook.creator,playbook.music_city_image,playbook.music_city_description",
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
