import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { createClient } from "@/prismicio";
import SearchBox from "@/components/shared/SearchBox";
import TabHeading from "@/components/shared/TabHeading";
import Socials from "@/components/shared/Socials";
import Slider from "@/components/shared/Slider";
import Logo from "@/img/logo-alt-x.svg";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function IPW24({ search }: PageProps) {
  return (
    <>
      <Head>
        <title>Exceptional ALIEN - IPW 2024</title>
        <meta name="description" content="IPW 2024" />
        <meta name="robots" content="noindex" />
      </Head>

      <main className="pt-12 md:max-w-3xl md:pt-16 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
        <TabHeading classes="uppercase relative ml-4 mr-4 md:ml-6 md:mr-6">
          <p>IPW 2024</p>
          <Socials classes="absolute top-0 right-0 [&>a]:!text-black" />
        </TabHeading>

        <section>
          <div className="aspect-video w-full [&>iframe]:h-full [&>iframe]:w-full">
            <iframe
              src="https://player.vimeo.com/video/809928936?h=bbad705da6&color=2220C1&title=0&byline=0&portrait=0"
              width="640"
              height="360"
              allow="autoplay; fullscreen; picture-in-picture"
            ></iframe>
          </div>
        </section>

        <section className="m-auto text-2xl font-bold text-ex-blue md:max-w-3xl md:text-4xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl [&>p]:mt-4 [&>p]:md:mt-6">
          <p>Personal recommendations from exceptional people, curated with first party data.</p>
        </section>

        <section className="[&>*]:m-auto [&>*]:flex [&>*]:h-9 [&>*]:max-w-sm [&>*]:items-center [&>*]:justify-center [&>*]:whitespace-nowrap [&>*]:rounded-full [&>*]:border [&>*]:border-ex-blue [&>*]:pl-3 [&>*]:pr-3 [&>*]:text-ex-blue [&>*]:transition-[background-color,color] [&>*]:duration-300 [&>*]:ease-in-out hover:[&>*]:bg-ex-blue hover:[&>*]:text-white">
          <Link href="/destinations/los-angeles">Check out our Los Angeles curation</Link>
        </section>

        <section className="!pl-0 !pr-0">
          <h3 className="p-4 !pt-0 pb-2 text-2xl font-bold md:p-6 md:pb-3 md:text-4xl">Partnership examples</h3>

          <Slider>
            <div className="aspect-video w-4/5 [&>iframe]:h-full [&>iframe]:w-full">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/K2HT6kAJ0BE?si=_G_MCyAWkvQ8RYuk"
                title="YouTube video player"
                allow="accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>

            <div className="aspect-video w-4/5 [&>iframe]:h-full [&>iframe]:w-full">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/1gVce3Vbcyk?si=2hvHeLqIT2ZxrUI3"
                title="YouTube video player"
                allow="accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>

            <div className="aspect-video w-4/5 [&>iframe]:h-full [&>iframe]:w-full">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/9DtR-7k7plU?si=aJ-PrqA9YAuq-mC7"
                title="YouTube video player"
                allow="accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>
          </Slider>
        </section>

        <section className="pb-8 pt-8 md:pb-12 md:pt-12">
          <Logo className="m-auto w-3/4 fill-ex-blue" />
        </section>
      </main>

      <SearchBox recommended={search.data.recommended} hidden={true} />
    </>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });

  const search = await client.getSingle("search", {
    fetch: "search.recommended,search.description",
    fetchLinks: "destination.title",
  });

  return {
    props: {
      search,
    },
  };
}
