import Link from "next/link";
import { GroupField, Content } from "@prismicio/client";

type TrendingProps = {
  destinations: GroupField;
};

export default function Trending(props: TrendingProps) {
  return (
    <section className="!mt-0 md:sticky md:top-[176px] md:float-left md:w-1/2 md:!pr-3">
      <h3 className="mb-1 text-sm text-ex-blue md:mb-2">TRENDING</h3>

      {/* List */}
      {props.destinations.map((item, i) => (
        <Link
          href={"/destinations/" + (item.destination as unknown as Content.DestinationDocument).uid}
          key={i}
          className="flex items-center text-4xl font-bold uppercase transition-[color] duration-300 ease-in-out hover:text-ex-blue md:text-6xl"
        >
          {(item.destination as unknown as Content.DestinationDocument).data.title}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-10 w-10 stroke-[0.5] md:h-14 md:w-14"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </Link>
      ))}
    </section>
  );
}
