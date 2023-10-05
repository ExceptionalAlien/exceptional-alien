import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

export default function About({ text }: { text: RichTextField }) {
  return (
    <section
      className={`text-ex-grey [&>p]:mt-4 [&>p]:md:float-right [&>p]:md:w-3/4 [&>p>a]:underline hover:[&>p>a]:text-ex-light-grey [&>p>a]:transition-[color] [&>p>a]:ease-in-out [&>p>a]:duration-300 [&>*:nth-child(2)]:md:mt-0 ${
        !text[0] && "hidden"
      }`}
    >
      <h4 className="font-bold text-xl md:text-2xl md:float-left md:w-1/4 md:pr-6">About</h4>
      <PrismicRichText field={text} />
      <div className="clear-both"></div>
    </section>
  );
}
