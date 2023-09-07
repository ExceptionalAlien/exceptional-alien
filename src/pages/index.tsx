import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Exceptional ALIEN - Travel Inspiration & Guides Curated by Exceptional Creators</title>
        <meta
          name="description"
          content="Explore extraordinary destinations curated by exceptional creators, including London, Tokyo, New York, Sydney, and more."
        />
        <meta property="og:url" content="https://exceptionalalien.com" />
        <meta
          property="og:title"
          content="Exceptional ALIEN - Travel Inspiration & Guides Curated by Exceptional Creators"
        />
        <meta
          property="og:description"
          content="Explore extraordinary destinations curated by exceptional creators, including London, Tokyo, New York, Sydney, and more."
        />
        <meta property="og:image" content="https://exceptionalalien.com/img/og.png" />
      </Head>

      <main className="min-h-full"></main>
    </>
  );
}
