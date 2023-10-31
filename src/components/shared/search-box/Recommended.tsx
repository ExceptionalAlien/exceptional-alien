import { GroupField, Content } from "@prismicio/client";
import Link from "next/link";
import Place from "@/img/icon-place.svg";

interface Props {
  destinations: GroupField;
  scrollY: number;
}

export default function Recommended(props: Props) {
  return (
    <div className="mt-4 text-center">
      {props.destinations.map((item, i) => (
        <Link
          href={`/destinations/${(item.destination as Content.DestinationDocument).uid}`}
          key={i}
          className={`ml-1 mr-1 mt-2 inline-flex h-9 items-center rounded-full border pl-2 pr-3 text-sm uppercase transition-[color,background-color,border-color] duration-300 ease-in-out ${
            props.scrollY > 0
              ? "border-white text-white hover:bg-white hover:text-ex-blue"
              : "border-ex-blue text-ex-blue hover:bg-ex-blue hover:text-white"
          }`}
        >
          <Place className="mr-1 inline h-5 w-5" />
          {(item.destination as Content.DestinationDocument).data.title}
        </Link>
      ))}
    </div>
  );
}
