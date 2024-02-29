import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import Image from "next/image";
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import SearchBox from "@/components/shared/SearchBox";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Home({ page, search }: PageProps) {
  return (
    <>
      <Head>
        <title>{page.data.meta_title ? page.data.meta_title : "Exceptional ALIEN"}</title>
        <meta name="description" content={page.data.meta_description ?? ""} />
        <meta property="og:url" content="https://exceptionalalien.com" />
        <meta property="og:title" content={page.data.meta_title ? page.data.meta_title : "Exceptional ALIEN"} />
        <meta property="og:description" content={page.data.meta_description ?? ""} />

        <meta
          property="og:image"
          content={page.data.meta_image.url ? page.data.meta_image.url : "https://exceptionalalien.com/img/og.png"}
        />
      </Head>

      <SearchBox description={search.data.description} recommended={search.data.recommended} />

      <main className="!mt-0 [&>*:nth-child(1)]:!mt-0 [&>[data-slice-type=highlight]]:mb-12 [&>[data-slice-type=highlight]]:mt-12 [&>[data-slice-type=highlight]]:md:mb-16 [&>[data-slice-type=highlight]]:md:mt-16">
        <SliceZone slices={page.data.slices} components={components} />

        <section>
          <h4 className="text-center text-xl font-bold">As seen in</h4>

          <div className="m-auto mt-8 grid max-w-4xl grid-cols-2 items-center justify-items-center gap-8 md:mt-12 md:grid-cols-3 md:gap-12 [&>a>img]:h-auto [&>a>img]:w-24 md:[&>a>img]:w-40">
            <a
              href="https://www.forbes.com/sites/afdhelaziz/2023/04/25/how-this-exceptional-travel-platform-is-redefining-authentic-storytelling-and-cultural-connection/"
              target="_blank"
            >
              <Image src="/img/as-seen-in/logo-forbes.png" alt="Forbes" width="978" height="256" />
            </a>

            <a
              href="https://www.gq.com.au/lifestyle/travel/budjerah-travel-recommendations-victoria/image-gallery/92c14af7102580e45a2117d8a100f20f"
              target="_blank"
            >
              <Image src="/img/as-seen-in/logo-gq.png" alt="GQ" width="484" height="256" className="!scale-75" />
            </a>

            <a href="https://skift.com/2023/08/03/skift-idea-awards-2023-meet-the-winners/" target="_blank">
              <Image src="/img/as-seen-in/logo-skift.png" alt="Skift" width="688" height="256" />
            </a>

            <a
              href="https://sxswsydney.com/session/the-powerful-intrinsic-connection-between-creativity-travel/"
              target="_blank"
            >
              <Image src="/img/as-seen-in/logo-sxsw.png" alt="SXSW Sydney" width="540" height="256" />
            </a>

            <a href="https://www.youtube.com/watch?v=WOOKcUUkOBk" target="_blank">
              <Image src="/img/as-seen-in/logo-7-news.png" alt="7 News" width="855" height="256" />
            </a>

            <a
              href="https://www.afr.com/companies/media-and-marketing/ad-experts-launch-cultural-guide-exceptional-alien-20210928-p58vdd"
              target="_blank"
            >
              <Image
                src="/img/as-seen-in/logo-fin-review.png"
                alt="Financial Review"
                width="2333"
                height="256"
                className="!scale-150"
              />
            </a>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });

  const page = await client.getSingle("home", {
    fetchLinks:
      "playbook.title,playbook.locked,playbook.image,playbook.destination,playbook.description,playbook.creator,destination.title,creator.first_name,creator.last_name,creator.profile_image",
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
}
