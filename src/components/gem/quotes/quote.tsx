import Link from "next/link";
import { ImageField, RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import CreatorIcon from "@/components/shared/CreatorIcon";

export interface QuoteProps {
  uid: string;
  firstName: string;
  lastName: string;
  image: ImageField;
  text: RichTextField;
}

export default function Quote(props: QuoteProps) {
  return (
    <div className="w-4/5 md:w-[calc((100%/3)-24px)]">
      <div className="aspect-square relative border border-ex-blue p-3 md:p-4 [&_p]:text-ex-blue [&>p]:font-bold text-base [&>p]:mb-3 [&>p]:md:mb-4 [&>p]:pb-10 [&>p]:md:pb-12">
        <PrismicRichText field={props.text} />

        <Link href={`/creators/${props.uid}`}>
          <CreatorIcon
            firstName={props.firstName}
            lastName={props.lastName}
            image={props.image}
            classes="!p-0 absolute bottom-3 md:bottom-4 right-3 md:right-4"
          />
        </Link>
      </div>
    </div>
  );
}
