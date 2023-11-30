import Link from "next/link";
import { Content } from "@prismicio/client";
import Place from "@/img/icon-place.svg";

interface DestinationsProps {
  results: Content.DestinationDocument<string>[];
}

export default function Destinations(props: DestinationsProps) {
  return (
    <section>
      <h3 className="flex items-center pb-2 text-2xl font-bold text-ex-blue md:pb-3 md:text-4xl">
        <Place className="mb-1 mr-1 h-5 overflow-visible md:mr-2 md:h-6" />
        Destinations<span className="ml-1 text-base md:ml-2 md:text-xl">({props.results.slice(0, 20).length})</span>
      </h3>

      <div className="grid gap-x-2 md:grid-cols-1 md:gap-x-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {props.results.map((item, i) => (
          <Link
            href={"/destinations/" + item.uid}
            key={i}
            className="flex items-center text-3xl font-bold uppercase transition-[color] duration-300 ease-in-out hover:text-ex-blue md:text-5xl"
          >
            {item.data.title}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-8 w-8 stroke-[0.5] md:h-12 md:w-12"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </Link>
        ))}
      </div>
    </section>
  );
}
