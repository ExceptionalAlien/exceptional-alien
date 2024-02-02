import Link from "next/link";
import { ImageField, RichTextField, asText } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import CreatorIcon from "@/components/shared/CreatorIcon";

export type QuoteProps = {
  uid: string;
  firstName: string;
  lastName: string;
  image: ImageField;
  text: RichTextField;
};

export default function Quote(props: QuoteProps) {
  return (
    <div className="w-4/5 md:w-[calc((100%/3)-24px)]">
      <div
        className={`relative aspect-square border border-ex-blue p-2 md:p-3 [&>p]:mb-2 [&>p]:pb-10 [&>p]:font-bold [&>p]:md:mb-3 [&>p]:md:pb-12 [&_p]:text-ex-blue ${
          asText(props.text).length > 140 ? "[&>p]:text-base" : "[&>p]:text-lg"
        }`}
      >
        <PrismicRichText field={props.text} />

        <Link
          href={`/contributors/${props.uid}`}
          className="absolute bottom-0 right-0 p-2 transition-[opacity] duration-300 ease-in-out hover:opacity-60 md:p-3"
        >
          <CreatorIcon
            firstName={props.firstName}
            lastName={props.lastName}
            image={props.image}
            classes="[&>img]:border-ex-blue [&>img]:bg-ex-blue"
          />
        </Link>
      </div>
    </div>
  );
}
