import { useEffect } from "react";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { createClient } from "@/prismicio";
import Slider from "@/components/shared/Slider";
import SearchBox from "@/components/shared/SearchBox";
import Place from "@/img/icon-place.svg";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function IPW24({ search }: PageProps) {
  useEffect(() => {
    window.localStorage.setItem("ipw24", "true"); // Use this to show IPW link in main nav
  }, []);

  return (
    <>
      <Head>
        <title>Exceptional ALIEN - IPW 2024</title>
        <meta name="description" content="Exceptional ALIEN at IPW 2024" />
        <meta name="robots" content="noindex" />
      </Head>

      <main className="pt-12 text-ex-blue md:max-w-2xl md:pt-16 lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
        <section className="m-auto text-xl md:max-w-3xl md:text-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
          <p className="text-center">Welcome to Exceptional Alien. Your ally for a new era of travel.</p>
        </section>

        <section>
          <div className="aspect-video w-full">
            <iframe
              src="https://player.vimeo.com/video/809928936?h=bbad705da6&color=2220C1&title=0&byline=0&portrait=0"
              width="640"
              height="360"
              allow="autoplay; fullscreen; picture-in-picture"
              className="h-full w-full"
            ></iframe>
          </div>
        </section>

        <section className="m-auto text-lg md:max-w-3xl md:text-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
          <p className="text-center">
            Personal recommendations from exceptional people, curated with first-party data.
          </p>
        </section>

        <section>
          <h3 className="text-xl md:text-3xl">What&apos;s a Travel Playbook?</h3>

          <div className="mt-2 aspect-video w-full md:mt-3">
            <iframe
              src="https://player.vimeo.com/video/809928936?h=bbad705da6&color=2220C1&title=0&byline=0&portrait=0"
              width="640"
              height="360"
              allow="autoplay; fullscreen; picture-in-picture"
              className="h-full w-full"
            ></iframe>
          </div>
        </section>

        <section>
          <Link
            href="/destinations/los-angeles"
            className="m-auto flex max-w-max items-center justify-center rounded-full bg-ex-blue px-6 py-3 text-lg text-white md:text-xl"
          >
            <Place className="mr-1 h-6 w-6" />
            Explore our LA curation
          </Link>
        </section>

        <section className="!pl-0 !pr-0">
          <h3 className="px-4 text-xl md:px-6 md:text-3xl">Case Studies</h3>

          <Slider classes="mt-2 md:mt-3">
            <div className="aspect-video w-4/5">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/K2HT6kAJ0BE?si=_G_MCyAWkvQ8RYuk"
                title="YouTube video player"
                allow="accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="h-full w-full"
              ></iframe>
            </div>

            <div className="aspect-video w-4/5">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/9DtR-7k7plU?si=hYQ0UV2oetRhT7YW"
                title="YouTube video player"
                allow="accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="h-full w-full"
              ></iframe>
            </div>

            <div className="aspect-video w-4/5">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/1gVce3Vbcyk?si=nPWVZDDLsltTG4z0"
                title="YouTube video player"
                allow="accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="h-full w-full"
              ></iframe>
            </div>
          </Slider>
        </section>

        <section className="text-sm [&>*]:mt-4 [&>*]:leading-snug [&>p>a]:underline [&>p>a]:transition-[color] [&>p>a]:duration-300 [&>p>a]:ease-in-out hover:[&>p>a]:text-ex-light-grey">
          <h4 className="text-base">For more information please get in touch:</h4>

          <p>
            Roberta MACDONALD
            <br />
            CEO
            <br />
            <a href="mailto:roberta@exceptionalalien.com">roberta@exceptionalalien.com</a>
          </p>

          <p>
            Justin DRAPE
            <br />
            Co-founder
            <br />
            <a href="mailto:justin@exceptionalalien.com">justin@exceptionalalien.com</a>
          </p>

          <p>
            Joe DALE
            <br />
            Director - Commercial &amp; Strategic Partnerships
            <br />
            <a href="mailto:joe@exceptionalalien.com">joe@exceptionalalien.com</a>
          </p>

          <p>
            Guy CHAMBERS
            <br />
            Advisor
            <br />
            <a href="mailto:guy@exceptionalalien.com">guy@exceptionalalien.com</a>
          </p>
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
