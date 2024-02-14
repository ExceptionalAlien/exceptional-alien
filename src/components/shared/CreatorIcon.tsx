import Image from "next/image";
import { ImageField } from "@prismicio/client";

type CreatorIconProps = {
  firstName?: string;
  lastName?: string;
  image: ImageField;
  nomination?: boolean;
  classes?: string;
};

export default function CreatorIcon(props: CreatorIconProps) {
  return (
    <div className={`flex items-center justify-end ${props.classes}`}>
      <p className="text-right text-xs text-white [overflow-wrap:anywhere] md:text-sm">
        {props.nomination && <span className="block text-xs text-ex-grey">Nominated by</span>}
        {props.firstName} {props.lastName?.toUpperCase()}
      </p>

      <div className="ml-2 overflow-hidden rounded-full border border-white bg-ex-blue">
        <Image
          src={props.image.url as string}
          alt={
            props.image.alt
              ? (props.image.alt as string)
              : props.lastName
                ? `${props.firstName} ${props.lastName}`
                : props.firstName
                  ? (props.firstName as string)
                  : ""
          }
          width={48}
          height={48}
          className={`mix-blend-lighten grayscale ${props.firstName ? "h-12 w-12" : "h-10 w-10"}`}
        />
      </div>
    </div>
  );
}
