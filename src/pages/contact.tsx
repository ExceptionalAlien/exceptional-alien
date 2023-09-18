import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { createClient } from "@/prismicio";
import { SliceZone, PrismicRichText } from "@prismicio/react";
import { components } from "@/slices";
import TabHeading from "@/components/TabHeading";
import Socials from "@/components/Socials";
import Spacer from "@/components/Spacer";
import Logo from "@/img/logo-alt-x.svg";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Contact({ page }: PageProps) {
  return (
    <>
      <Head>
        <title>{`Exceptional ALIEN - ${page.data.meta_title ? page.data.meta_title : "Contact"}`}</title>
        <meta name="description" content={page.data.meta_description ?? ""} />
        <meta property="og:url" content="https://exceptionalalien.com/terms-and-privacy" />

        <meta
          property="og:title"
          content={`Exceptional ALIEN - ${page.data.meta_title ? page.data.meta_title : "Contact"}`}
        />

        <meta property="og:description" content={page.data.meta_description ?? ""} />

        <meta
          property="og:image"
          content={page.data.meta_image.url ? page.data.meta_image.url : "https://exceptionalalien.com/img/og.png"}
        />
      </Head>

      <main className="p-4 md:p-6 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
        <Spacer />

        <TabHeading classes="!mt-12 md:!mt-24 uppercase">
          <PrismicRichText field={page.data.page_heading} />
          <Socials classes="absolute top-0 right-0 [&>a>svg]:!fill-black" />
        </TabHeading>

        <SliceZone slices={page.data.slices} components={components} />

        {/* Alt logo */}
        <section>
          <Logo className="w-3/4 m-auto fill-ex-blue pt-12 md:pt-20 pb-1 md:pb-20 box-content" />
        </section>
      </main>
    </>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });
  const page = await client.getSingle("contact");

  return {
    props: {
      page,
    },
  };
}
