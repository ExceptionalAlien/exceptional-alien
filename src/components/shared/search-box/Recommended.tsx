import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { GroupField, Content } from "@prismicio/client";
import Place from "@/img/icon-place.svg";

type Props = {
  destinations: GroupField;
  scrollY: number;
};

export default function Recommended(props: Props) {
  const searchParams = useSearchParams();

  return (
    <div className="mt-2 text-center md:mt-4">
      {props.destinations.map((item, i) => (
        <Link
          href={`/destinations/${(item.destination as unknown as Content.DestinationDocument).uid}`}
          key={i}
          className={`ml-1 mr-1 mt-2 inline-flex h-9 items-center rounded-full border pl-3 pr-3 text-sm uppercase transition-[color,background-color,border-color] duration-300 ease-in-out ${
            props.scrollY > 1
              ? `border-white text-white hover:bg-white ${
                  searchParams?.get("c") ? "hover:text-black" : "hover:text-ex-blue"
                }`
              : searchParams?.get("c")
                ? "border-black text-black hover:bg-black hover:text-white"
                : "border-ex-blue text-ex-blue hover:bg-ex-blue hover:text-white"
          }`}
        >
          <Place className="mr-[6px] inline h-5 overflow-visible" />
          <span className="safari-ios-text-hack">
            {(item.destination as unknown as Content.DestinationDocument).data.title}
          </span>
        </Link>
      ))}
    </div>
  );
}
