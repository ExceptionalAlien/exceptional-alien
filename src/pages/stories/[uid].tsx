import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { createClient } from "@/prismicio";
import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import PlaybookThumb from "@/components/shared/PlaybookThumb";
import { Content } from "@prismicio/client";
import Header from "@/components/story/Header";
import Share from "@/components/story/Share";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Story({ page }: PageProps) {
  return (
    <>
      <Head>
        <title>{`${page.data.meta_title ? page.data.meta_title : page.data.title} | Exceptional ALIEN`}</title>

        <meta
          name="description"
          content={page.data.meta_description ? page.data.meta_description : page.data.title as string}
        />

        <meta property="og:url" content={`https://exceptionalalien.com/stories/${page.uid}`} />

        <meta
          property="og:title"
          content={`${page.data.meta_title ? page.data.meta_title : page.data.title} | Exceptional ALIEN`}
        />

        <meta
          property="og:description"
          content={page.data.meta_description ? page.data.meta_description : page.data.title as string}
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
      </Head>
      <main>
        <Header data={page.data} />
        <div>Feature by <span>{page.data.feature}</span></div>
        <SliceZone slices={page.data.slices} components={components} />
        <div className="grid grid-cols-2 gap-x-2 gap-y-4 md:gap-x-3 md:gap-y-6 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5" >
          <PlaybookThumb
            playbook={page.data.playbook as unknown as Content.PlaybookDocument}
            size="med"
            showCreator={true}
            showDestination={true}
          />
        </div>
      </main>
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

    const page = await client.getByUID("story", params?.uid as string, {
      fetchLinks: "playbook.title,playbook.image,playbook.destination,playbook.creator,creator.first_name,creator.last_name,creator.profile_image,destination.title,gem.image,gem.title,gem.category",
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
