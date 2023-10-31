import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { createClient } from "@/prismicio";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
export default function Playbooks({ page }: PageProps) {
  return (
    <>
      Stories page
    </>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });

  const page = await client.getSingle("stories", {
    fetchLinks:
      "story.title",
  });

  return {
    props: {
      page,
    },
  };
}
