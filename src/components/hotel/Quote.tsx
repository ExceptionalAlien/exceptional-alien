import Link from "next/link";
import { ImageField, RichTextField, asText } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import CreatorIcon from "@/components/hotel/CreatorIcon";

export type QuoteProps = {
  uid: string;
  firstName: string;
  lastName: string;
  image: ImageField;
  quote: RichTextField;
};

export default function Quote(props: QuoteProps) {
  return (
    <div className="w-4/5 md:w-4/5"> {/* sm:w-[calc((100%/3)-24px)] */}
      <div
        className={`relative bg-black p-3 [&>p]:mb-2 [&>p]:pb-16 [&_p]:text-white ${
          asText(props.quote).length > 140 ? "[&>p]:text-base" : "[&>p]:text-base"
        }`}
      >
        <PrismicRichText field={props.quote} />

        <div
          //href={`/contributors/${props.uid}`}
          className="absolute bottom-0 left-0 p-3 transition-[opacity] duration-300 ease-in-out hover:opacity-60"
        >
          <CreatorIcon
            firstName={props.firstName}
            lastName={props.lastName}
            image={props.image}
          />
        </div>
      </div>
    </div>
  );
}
