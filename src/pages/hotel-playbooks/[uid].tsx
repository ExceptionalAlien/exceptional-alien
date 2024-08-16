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
      // gems
      // playbook (for the link)
      // creator
    });

    return {
      props: {
        page,
        //search,
      },
    };
  } catch (error) {
    // todo: TEMP
    return {
      props: {
        page: {
          uid: 'pier-one-hotel',
          data: {
            title: 'TEST Hotel',
            meta_title: 'TEST Hotel meta',
            meta_description: 'Description of a test hotel',
            about: null,
            meta_image: null,
            category: 'Accommodation',
            image: {
              url: 'https://images.prismic.io/exceptionalalien/Zhx8FjjCgu4jzzzN_pier-one.jpg?auto=compress%2Cformat&rect=0%2C50%2C1200%2C630&w=1600&h=900&fit=max',
              dimensions: {
                width: 1600,
                height: 900,
              },
              mobile: {
                url: 'https://images.prismic.io/exceptionalalien/Zhx8FjjCgu4jzzzN_pier-one.jpg?auto=compress%2Cformat&rect=0%2C50%2C1200%2C630&w=1600&h=900&fit=max'
              }
            },
            footer_image: {
              url: 'https://images.prismic.io/exceptionalalien/Zh5iikaI3ufuUODM_sydney-harbour-foreshore-walk.jpg?auto=format%2Ccompress&rect=0%2C201%2C3868%2C2031&w=2400&h=1260&w=3840&q=75',
              dimensions: {
                width: 1600,
                height: 900,
              },
              mobile: {
                url: 'https://images.prismic.io/exceptionalalien/Zh5iikaI3ufuUODM_sydney-harbour-foreshore-walk.jpg?auto=format%2Ccompress&rect=0%2C201%2C3868%2C2031&w=2400&h=1260&w=3840&q=75'
              }
            },
            description: 'Set alongside the Harbour Bridge, Pier One Sydney Harbour offers a premier hotel experience with water view accommodations and locally inspired restaurants.',
            google_maps_id: 'ChIJKRVAqFyuEmsRQGlTmkFIVOo',
          }
        }
      }
    }

    return { notFound: true };
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
