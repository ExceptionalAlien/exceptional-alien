import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext, GetStaticPaths } from "next";
import { createClient } from "@/prismicio";
import Viewer from "@/components/playbook/Viewer";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Creator({ page }: PageProps) {
  return (
    <>
      <Head>
        <title>{`Exceptional ALIEN - ${page.data.meta_title ? page.data.meta_title : page.data.title}`}</title>
        <meta name="description" content={page.data.meta_description ?? ""} />
        <meta property="og:url" content={`https://exceptionalalien.com/playbooks/${page.uid}`} />

        <meta
          property="og:title"
          content={`Exceptional ALIEN - ${page.data.meta_title ? page.data.meta_title : page.data.title}`}
        />

        <meta
          property="og:description"
          content={
            page.data.meta_description
              ? page.data.meta_description
              : page.data.description[0]
              ? (page.data.description[0] as any).text
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

        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </Head>

      <main>
        <Viewer data={page.data} center={{ lat: -33.865143, lng: 151.2099 }} zoom={15} />

        <section>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam laoreet libero id magna varius, nec vehicula
            urna sagittis. Donec enim dui, gravida ac risus at, pharetra gravida ex. Phasellus vel lacus accumsan metus
            tincidunt cursus. Proin vel accumsan lectus. Sed pulvinar et velit a porttitor. Cras gravida, turpis nec
            pharetra convallis, urna lectus porta augue, et molestie purus dolor id dui. Fusce condimentum quis nisl at
            blandit. Pellentesque fermentum, dolor sed tempor mattis, felis augue blandit ligula, non congue tellus
            sapien eu nisi. Fusce fermentum velit nibh, a aliquam orci hendrerit in. Aliquam quis libero pretium,
            lobortis ipsum ac, bibendum quam. Proin nunc erat, hendrerit quis leo molestie, tempor dapibus dui.
            Pellentesque rutrum gravida mollis. Duis leo ex, rhoncus sit amet convallis at, auctor at tellus.
          </p>
        </section>
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
    const page = await client.getByUID("playbook", params?.uid as string, {
      fetchLinks: "creator.first_name,creator.last_name,creator.profile_image,gem.title,gem.image",
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
