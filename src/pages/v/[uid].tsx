import { useState, useEffect } from "react";
import type { InferGetStaticPropsType, GetStaticPropsContext, GetStaticPaths } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { createClient } from "@/prismicio";
import { createSupabaseClient } from "@/utils/supabase";
import SearchBox from "@/components/shared/SearchBox";
import Loading from "@/components/shared/Loading";

type Data = {
  code: string;
  playbook_uid: string;
  use_count: number;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Verify({ params, search }: PageProps) {
  const router = useRouter();
  const supabase = createSupabaseClient();
  const [invalidCode, setInvalidCode] = useState(false);

  const verify = async () => {
    // Read Supabase
    const { data, error } = await supabase
      .from("pb_access_codes")
      .select()
      .match({ code: params?.uid });

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }

    // Check if user already has access
    const playbooks = window.localStorage.getItem("eapbs");

    if (playbooks && JSON.parse(playbooks).includes(data[0].playbook_uid)) {
      // Already has access
      router.push(`/travel-playbooks/${data[0].playbook_uid}`);
    } else if (data[0].reusable || !data[0].use_count) {
      // Code valid
      confirm(data[0]);
    } else {
      // Code invalid
      setInvalidCode(true);
    }
  };

  const confirm = async (data: Data) => {
    // Update Supabase
    const { error } = await supabase
      .from("pb_access_codes")
      .update({ use_count: data.use_count + 1 })
      .eq("code", data.code);

    if (error) {
      console.error("Error updating data:", error);
      return;
    }

    // Add to local storage and redirect
    const playbooks = window.localStorage.getItem("eapbs");
    var pbArray = [];
    if (playbooks) pbArray = JSON.parse(playbooks); // Local storage item alrady exists
    if (!pbArray.includes(data.playbook_uid)) pbArray.push(data.playbook_uid); // Only add if item doesn't already include Playbook
    window.localStorage.setItem("eapbs", JSON.stringify(pbArray));
    router.push(`/travel-playbooks/${data.playbook_uid}`);
  };

  useEffect(() => {
    //localStorage.clear();
    verify();
  }, []);

  return (
    <>
      <Head>
        <title>Exceptional ALIEN - Playbook Access</title>
        <meta name="description" content="Page not found" />
        <meta name="robots" content="noindex" />
      </Head>

      <main className="pt-12 md:max-w-3xl md:pt-16 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
        <section className="!mt-0">
          <h2 className="text-4xl font-bold md:text-6xl">Playbook Access</h2>

          <h3 className={`text-ex-grey ${invalidCode && "text-ex-red"}`}>
            {!invalidCode
              ? "You are attempting to access an exclusive Travel Playbook"
              : "Sorry, your access code is already used or invalid"}
          </h3>
        </section>

        {!invalidCode && (
          <section>
            <Loading text="Verifying access code" />
          </section>
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
  const client = createClient({ previewData });

  const search = await client.getSingle("search", {
    fetch: "search.recommended,search.description",
    fetchLinks: "destination.title",
  });

  return {
    props: {
      search,
      params,
    },
  };
}
