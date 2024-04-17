import { useState, useEffect } from "react";
import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { createClient } from "@/prismicio";
import { Content, asText } from "@prismicio/client";
import Viewer from "@/components/playbook/Viewer";
import Video from "@/components/playbook/Video";
import Related from "@/components/playbook/Related";
import SearchBox from "@/components/shared/SearchBox";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Playbook({ page, search }: PageProps) {
  const router = useRouter();
  const [showVideo, setShowVideo] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const hasRelated = page.data.related.length > 1 ? true : false;

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
  }, []);

  return (
    <>
      <Head>
        <title>{`${
          page.data.meta_title
            ? page.data.meta_title
            : `${page.data.title} | ${
                (page.data.creator as unknown as Content.CreatorDocument).data.last_name
                  ? `${(page.data.creator as unknown as Content.CreatorDocument).data.first_name} ${
                      (page.data.creator as unknown as Content.CreatorDocument).data.last_name
                    }`
                  : (page.data.creator as unknown as Content.CreatorDocument).data.first_name
              }`
        } | Exceptional ALIEN`}</title>

        <meta
          name="description"
          content={
            page.data.meta_description
              ? page.data.meta_description
              : page.data.description
                ? asText(page.data.description)
                : ""
          }
        />

        <meta property="og:url" content={`https://exceptionalalien.com/travel-playbooks/${page.uid}`} />

        <meta
          property="og:title"
          content={`${
            page.data.meta_title
              ? page.data.meta_title
              : `${page.data.title} | ${
                  (page.data.creator as unknown as Content.CreatorDocument).data.last_name
                    ? `${(page.data.creator as unknown as Content.CreatorDocument).data.first_name} ${
                        (page.data.creator as unknown as Content.CreatorDocument).data.last_name
                      }`
                    : (page.data.creator as unknown as Content.CreatorDocument).data.first_name
                }`
          } | Exceptional ALIEN`}
        />

        <meta
          property="og:description"
          content={
            page.data.meta_description
              ? page.data.meta_description
              : page.data.description
                ? asText(page.data.description)
                : ""
          }
        />

        <meta
          property="og:image"
          content={
            page.data.meta_image.url
              ? page.data.meta_image.url
              : page.data.image.url
                ? page.data.image.url
                : "https://exceptionalalien.com/img/og.png"
          }
        />

        {page.data.locked && <meta name="robots" content="noindex" />}
      </Head>

      <main className={`${!hasRelated && "!pb-0"}`}>
        {(!page.data.locked || hasAccess) && (
          <>
            <Viewer data={page.data} setShowVideo={setShowVideo} />
            {hasRelated && <Related playbooks={page.data.related} />}
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

    const page = await client.getByUID("playbook", params?.uid as string, {
      fetchLinks:
        "creator.first_name,creator.last_name,creator.profile_image,creator.uid,gem.title,gem.location,gem.image,gem.category,gem.creator,gem.address,gem.google_maps_id,gem.description,destination.title,playbook.title,playbook.locked,playbook.image,playbook.destination,playbook.creator",
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
