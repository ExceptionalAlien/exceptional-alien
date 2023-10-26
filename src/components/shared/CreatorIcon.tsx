import Image from "next/image";
import { ImageField } from "@prismicio/client";

interface CreatorIconProps {
  firstName: string;
  lastName: string;
  image: ImageField;
  classes?: string;
}

export default function CreatorIcon(props: CreatorIconProps) {
  return (
    <div className={`flex items-center justify-end p-3 md:p-4 !pl-0 ${props.classes}`}>
      <p className="text-sm md:text-base text-white text-right">
        {props.firstName} {props.lastName?.toUpperCase()}
      </p>

      <Image
        src={props.image.url as string}
        alt={
          props.image.alt
            ? (props.image.alt as string)
            : props.lastName
            ? `${props.firstName} ${props.lastName}`
            : (props.firstName as string)
        }
        width={48}
        height={48}
        className="rounded-full box-content ml-2 border border-white w-10 md:w-12 h-10 md:h-12"
      />
    </div>
  );
}
