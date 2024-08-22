import { useState } from "react";
import { PlaceCoords } from "@/components/gem/Map";
import Head from "@/components/shared/Head";
import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { createClient } from "@/prismicio";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function HotelPlayBook({ page }: PageProps) {
  const [placeCoords, setPlaceCoords] = useState<PlaceCoords>({ lat: 0, lng: 0 });
  const [openingHours, setOpeningHours] = useState<string[] | undefined>(undefined);
  const [openStatus, setOpenStatus] = useState<string | undefined>();

  return(
    <>
      <Head page={page} />
    </>
  )
}

export async function getStaticProps({ params, previewData }: GetStaticPropsContext) {
  try {
    const client = createClient({ previewData });
    const page = await client.getByUID("hotel", params?.uid as string, {
      fetchLinks:
        "hotel.name,hotel.hero_image,hotel.footer_image,hotel.address,hotel.location,hotel.description," +
        "hotel.address",
    });

    return {
      props: {
        page,
        //search,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
