import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

interface OverviewProps {
  text: RichTextField;
}

export default function Overview(props: OverviewProps) {
  return (
    <section className="m-auto !mb-12 !mt-12 text-2xl font-bold text-ex-blue md:!mb-16 md:!mt-16 md:max-w-3xl md:text-4xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl [&>p]:mt-4 [&>p]:md:mt-6">
      <PrismicRichText field={props.text} />
    </section>
  );
}
