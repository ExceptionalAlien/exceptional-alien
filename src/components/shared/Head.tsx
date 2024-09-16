import {default as NextHead} from "next/head";
import { asText, KeyTextField, RichTextField, ImageField } from "@prismicio/client";

type SharedProps = {
  page: {
    uid: string,
    data: { // Partial<GemDocumentData>
      title: KeyTextField,
      meta_title: KeyTextField,
      meta_description: KeyTextField,
      about?: RichTextField,
      meta_image: ImageField<never>,
      image: ImageField<any> | ImageField<"mobile" | "thumb" | "seo">,
      [any: string]: any;
    }
  }
}

export default function Head({ page }: SharedProps) {
  return (
    <NextHead>
      <title>{`${page.data.meta_title ? page.data.meta_title : page.data.title} | Exceptional ALIEN`}</title>
      <meta
        name="description"
        content={page.data.meta_description ? page.data.meta_description : page.data.about ? asText(page.data.about) : ''}
      />
      <meta
        property="og:description"
        content={page.data.meta_description ? page.data.meta_description : page.data.about ? asText(page.data.about) : ''}
      />

      <meta property="og:url" content={`https://exceptionalalien.com/gems/${page.uid}`} />
      <meta
        property="og:title"
        content={`${page.data.meta_title ? page.data.meta_title : page.data.title} | Exceptional ALIEN`}
      />
      <meta
        property="og:image"
        content={
          (page.data.meta_image && page.data.meta_image.url)
            ? page.data.meta_image.url
            : (page.data.image && page.data.image.seo && page.data.image.seo.url)
              ? page.data.image.seo.url
              : (page.data.image && page.data.image.url)
                ? page.data.image.url
                : "https://exceptionalalien.com/img/og.png"
        }
      />

    </NextHead>
  );
}