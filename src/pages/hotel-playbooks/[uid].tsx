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
import List from "@/components/hotel/viewer/List";
import Map from "@/components/hotel/viewer/Map";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Playbook({ page, search }: PageProps) {
  const router = useRouter();
  const [showVideo, setShowVideo] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const hasRelated = page.data.related.length > 1 ? true : false;

  const [viewerRef, setViewerRef] = useState<HTMLDivElement>();
  const ref = useRef<HTMLDivElement>(null);

  /*
  useEffect(() => {
    // Redirect to home if Playbook locked and user does not have access
    if (page.data.locked) {
      const storedPlaybooks = window.localStorage.getItem("eapbs");

      if (storedPlaybooks && JSON.parse(storedPlaybooks).includes(page.uid)) {
        // Included
        setHasAccess(true);
      } else {
        // Not included
        router.replace("/"); // Redirect
      }
    }
  }, []);*/

  useEffect(() => {
    setViewerRef(ref.current!);
  }, []);

  return (
    <>
      <Head page={page} />

      <main className={`${!hasRelated && "!pb-0"}`}>
        {(true || !page.data.locked || hasAccess) && (
          <>
            {/*<Viewer data={page.data} setShowVideo={setShowVideo} />*/}
            <div className="flex items-end justify-end" ref={ref}>
              <List data={page.data} setShowVideo={() => { return false }} />
              <Map gems={page.data.slices} hotel={page.data.hotel as unknown as Content.HotelDocument} viewerRef={viewerRef!} />
            </div>
          </>
        )}
      </main>

      <SearchBox recommended={search.data.recommended} hidden={true} />
      <Video iframe={page.data.video.html} showVideo={showVideo} setShowVideo={setShowVideo} />
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

    // todo: frozen for now
    if (params?.uid !== 'sydney-with-pier-one') {
      return { notFound: true };
    }

    const page = await client.getByUID("playbook", params?.uid as string, {
      fetchLinks:
        "creator.first_name,creator.last_name,creator.profile_image,creator.uid," +
        "hotel.title,hotel.logo_icon,hotel.location,hotel.video," +
        "gem.title,gem.location,gem.image,gem.category,gem.creator,gem.address,gem.google_maps_id,gem.description," +
        "destination.title,playbook.title,playbook.locked,playbook.image,playbook.destination,playbook.creator",
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

    //console.log(error)

    return { notFound: true };
  }
}
