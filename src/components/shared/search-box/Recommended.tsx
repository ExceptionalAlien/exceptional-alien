import { GroupField, Content } from "@prismicio/client";
import Link from "next/link";
import Place from "@/img/icon-place.svg";

interface Props {
  destinations: GroupField;
}

export default function Recommended(props: Props) {
  return (
    <div className="mt-2 text-center md:mt-4">
      {props.destinations.map((item, i) => (
        <Link
          href={`/destinations/${(item.destination as Content.DestinationDocument).uid}`}
          key={i}
          className="ml-1 mr-1 mt-2 inline-flex h-9 items-center rounded-full border border-ex-blue pl-2 pr-3 text-sm uppercase text-ex-blue transition-[color,background-color] duration-300 ease-in-out hover:bg-ex-blue hover:text-white"
        >
          <Place className="mr-1 inline h-5 w-5" />
          {(item.destination as Content.DestinationDocument).data.title}
        </Link>
      ))}
    </div>
  );
}
