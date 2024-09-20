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

      {/* props.firstName ? "h-12 w-12" : "box-content h-10 w-10" */}
      <div className={`shrink-0 overflow-hidden rounded-full bg-zinc-500 h-10 w-10 [&>img]:h-10 [&>img]:w-10`}>
        <Image
          src={props.image.url as string}
          alt={`Contributor image`}
          width={40}
          height={40}
        />
      </div>
      <p className="text-left text-xs text-white ml-3 [overflow-wrap:anywhere] md:text-sm font-bold">
        {props.firstName} {props.lastName}
      </p>
    </div>
  );
}
