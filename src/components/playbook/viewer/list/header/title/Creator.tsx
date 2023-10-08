import Image from "next/image";
import Link from "next/link";
import { ImageField } from "@prismicio/client";

interface CreatorProps {
  uid: string;
  firstName: string;
  lastName: string;
  image: ImageField;
}

export default function Creator(props: CreatorProps) {
  return (
    <Link
      href={"/creators/" + props.uid}
      className="flex w-2/5 items-center justify-end p-3 md:p-4 hover:opacity-50 duration-300 ease-in-out transition-[opacity]"
    >
      <p className="text-sm md:text-base text-right max-[320px]:!hidden landscape:!hidden md:landscape:!inline">
        {props.firstName} {props.lastName.toUpperCase()}
      </p>

      <Image
        src={props.image.url as string}
        alt={props.image.alt as string}
        width={48}
        height={48}
        className="rounded-full ml-2 border-[1.5px] border-white w-10 md:w-auto"
      />
    </Link>
  );
}
