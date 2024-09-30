import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleTagManager } from "@next/third-parties/google";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  let GTM = process.env.NODE_ENV === "production" ? "GTM-PGM6BHXN" : "GTM-XXX"

  return (
    <Layout>
      <Component {...pageProps} />
      <GoogleTagManager gtmId={GTM} />
      <PrismicPreview repositoryName={repositoryName} />
    </Layout>
  );
}
