import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

export default function Overview({ text }: { text: RichTextField }) {
  return (
    <section className="text-ex-blue font-bold text-2xl md:text-4xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl m-auto [&>p]:mt-4 [&>p]:md:mt-6">
      <PrismicRichText field={text} />
    </section>
  );
}
