import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

export default function About({ text }: { text: RichTextField }) {
  return (
    <section
      className={`text-ex-grey [&>*:nth-child(2)]:md:mt-0 [&>p>a]:underline [&>p>a]:transition-[color] [&>p>a]:duration-300 [&>p>a]:ease-in-out hover:[&>p>a]:text-ex-light-grey [&>p]:mt-4 [&>p]:md:float-right [&>p]:md:w-3/4 ${
        !text[0] && "hidden"
      }`}
    >
      <h4 className="text-xl font-bold md:float-left md:w-1/4 md:pr-6 md:text-2xl">About</h4>
      <PrismicRichText field={text} />
      <div className="clear-both"></div>
    </section>
  );
}
