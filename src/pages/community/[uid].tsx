import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext, GetStaticPaths } from "next";
import Link from "next/link";
import { createClient } from "@/prismicio";
import { Content, asLink } from "@prismicio/client";
import Hero from "@/components/shared/Hero";
import About from "@/components/shared/About";
import PlaybooksGrid from "@/components/shared/PlaybooksGrid";
import SearchBox from "@/components/shared/SearchBox";
import MachineCode from "@/components/shared/MachineCode";
import CreatorIcon from "@/components/shared/CreatorIcon";
import TabHeading from "@/components/shared/TabHeading";
import Socials from "@/components/creator/Socials";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Creator({ page, search }: PageProps) {
  return (
    <>
      <Head>
        <title>{`${
          page.data.meta_title
            ? page.data.meta_title
            : page.data.first_name && page.data.last_name
            ? `${page.data.first_name} ${page.data.last_name}`
            : page.data.first_name && page.data.first_name
        } | Exceptional ALIEN`}</title>

        <meta
          name="description"
          content={
            page.data.meta_description
              ? page.data.meta_description
              : page.data.short_description
              ? page.data.short_description
              : ""
          }
        />

        <meta property="og:url" content={`https://exceptionalalien.com/community/${page.uid}`} />

        <meta
          property="og:title"
          content={`${
            page.data.meta_title
              ? page.data.meta_title
              : page.data.first_name && page.data.last_name
              ? `${page.data.first_name} ${page.data.last_name}`
              : page.data.first_name && page.data.first_name
          } | Exceptional ALIEN`}
        />

        <meta
          property="og:description"
          content={
            page.data.meta_description
              ? page.data.meta_description
              : page.data.short_description
              ? page.data.short_description
              : ""
          }
        />

        <meta
          property="og:image"
          content={
            page.data.meta_image.url
              ? page.data.meta_image.url
              : page.data.hero_image.seo.url
              ? page.data.hero_image.seo.url
              : "https://exceptionalalien.com/img/og.png"
          }
        />
      </Head>

      <main className="md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
        {/* Title */}
        <section className="mb-4 md:mb-6">
          <h2 className="text-3xl font-bold md:float-left md:w-1/2 md:text-6xl">
            {page.data.first_name} {page.data.last_name?.toUpperCase()}
          </h2>

          <MachineCode
            firstName={page.data.first_name as string}
            lastName={page.data.last_name as string}
            country={page.data.home_country as string}
            classes="md:float-right md:w-1/2 md:text-right"
          />

          <div className="clear-both"></div>
        </section>

        {/* Nomination */}
        {(page.data.nomination as unknown as Content.CreatorDocument).data && (
          <section className="!mt-0 mb-2 text-right md:mb-3">
            <Link
              href={`/community/${(page.data.nomination as unknown as Content.CreatorDocument).uid}`}
              className="inline-block transition-[opacity] duration-300 ease-in-out hover:opacity-60"
            >
              <CreatorIcon
                firstName={(page.data.nomination as unknown as Content.CreatorDocument).data.first_name as string}
                lastName={(page.data.nomination as unknown as Content.CreatorDocument).data.last_name as string}
                image={(page.data.nomination as unknown as Content.CreatorDocument).data.profile_image}
                classes="[&>p]:text-black [&>img]:h-10 [&>img]:w-10"
              />
            </Link>
          </section>
        )}

        <Hero
          image={page.data.hero_image}
          alt={
            page.data.last_name ? `${page.data.first_name} ${page.data.last_name}` : (page.data.first_name as string)
          }
          credit={page.data.photo_credit as string}
          classes="!mt-0"
        />

        {/* Heading */}
        <section className="!mt-2 md:!mt-3">
          <TabHeading classes="relative">
            <Socials
              ig={page.data.instagram as string}
              other={asLink(page.data.other_social) as string}
              www={asLink(page.data.website) as string}
            />

            <h3>{page.data.title}</h3>

            <p className="uppercase">
              {page.data.home_city
                ? `${page.data.home_city} ${"\u2794"} ${page.data.current_city}`
                : `${"\u2794"} ${page.data.current_city}`}
            </p>
          </TabHeading>
        </section>

        <About text={page.data.description} />

        {page.data.playbooks.length &&
        (page.data.playbooks[0]?.playbook as unknown as Content.PlaybookDocument).data ? (
          <PlaybooksGrid heading={`${page.data.first_name}'s Playbooks`} list={page.data.playbooks} />
        ) : (
          <></>
        )}
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

    const page = await client.getByUID("creator", params?.uid as string, {
      fetchLinks:
        "creator.first_name,creator.last_name,creator.profile_image,playbook.title,playbook.image,playbook.destination,playbook.description,playbook.creator,destination.title",
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
