import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <PrismicPreview repositoryName={repositoryName} />
    </Layout>
  );
}
