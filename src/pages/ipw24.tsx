import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { createClient } from "@/prismicio";
import SearchBox from "@/components/shared/SearchBox";
import TabHeading from "@/components/shared/TabHeading";
import Socials from "@/components/shared/Socials";
import Logo from "@/img/logo-alt-x.svg";
import Place from "@/img/icon-place.svg";

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

        <section className="[&>*]:m-auto [&>*]:flex [&>*]:max-w-sm [&>*]:items-center [&>*]:justify-center [&>*]:whitespace-nowrap [&>*]:rounded-full [&>*]:bg-ex-blue [&>*]:p-3 [&>*]:text-lg [&>*]:text-white [&>*]:md:text-xl">
          <Link href="/destinations/los-angeles">
            <Place className="mr-1 h-6 w-6" />
            Explore our LA curation
          </Link>
        </section>

        <section>
          <h3 className="text-2xl font-bold md:text-4xl">Partner with EA</h3>

          <div className="mt-2 aspect-video md:mt-3 [&>iframe]:h-full [&>iframe]:w-full">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/K2HT6kAJ0BE?si=_G_MCyAWkvQ8RYuk"
              title="YouTube video player"
              allow="accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>

          <div className="mt-4 aspect-video md:mt-6 [&>iframe]:h-full [&>iframe]:w-full">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/1gVce3Vbcyk?si=2hvHeLqIT2ZxrUI3"
              title="YouTube video player"
              allow="accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>

          <div className="mt-4 aspect-video md:mt-6 [&>iframe]:h-full [&>iframe]:w-full">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/9DtR-7k7plU?si=aJ-PrqA9YAuq-mC7"
              title="YouTube video player"
              allow="accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold md:text-4xl">What&apos;s a Travel Playbook?</h3>

          <div className="mt-2 aspect-video w-full md:mt-3 [&>iframe]:h-full [&>iframe]:w-full">
            <iframe
              src="https://player.vimeo.com/video/809928936?h=bbad705da6&color=2220C1&title=0&byline=0&portrait=0"
              width="640"
              height="360"
              allow="autoplay; fullscreen; picture-in-picture"
            ></iframe>
          </div>
        </section>

        <section>
          <TabHeading classes="uppercase relative">
            <p>ABOUT US</p>
            <Socials classes="absolute top-0 right-0 [&>a]:!text-black" />
          </TabHeading>

          <div className="text-ex-grey [&>h4]:mt-4 [&>h4]:text-xl [&>h4]:font-bold [&>h4]:md:text-2xl [&>p>a]:underline [&>p>a]:transition-[color] [&>p>a]:duration-300 [&>p>a]:ease-in-out hover:[&>p>a]:text-ex-light-grey [&>p]:mt-4">
            <p>Exceptional ALIEN is a travel platform powered by a global creative community.</p>

            <p>
              We invite audiences to experience travel, creativity and culture through the lens of Exceptional Creators
              and Culture Makers.
            </p>

            <p>
              We share their stories and trusted recommendations via our website, mobile app, and multimedia
              storytelling.
            </p>

            <h4>For more information please get in touch</h4>

            <p>
              <span className="font-bold">Roberta MACDONALD</span>
              <br />
              CEO
              <br />
              <a href="mailto:roberta@exceptionalalien.com">roberta@exceptionalalien.com</a>
            </p>

            <p>
              <span className="font-bold">Justin DRAPE</span>
              <br />
              Co-founder
              <br />
              <a href="mailto:justin@exceptionalalien.com">justin@exceptionalalien.com</a>
            </p>

            <p>
              <span className="font-bold">Joe DALE</span>
              <br />
              Director - Commercial &amp; Strategic Partnerships
              <br />
              <a href="mailto:joedale@exceptionalalien.com">joedale@exceptionalalien.com</a>
            </p>

            <p>
              <span className="font-bold">Guy CHAMBERS</span>
              <br />
              Advisor
              <br />
              <a href="mailto:guy@exceptionalalien.com">guy@exceptionalalien.com</a>
            </p>
          </div>
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
