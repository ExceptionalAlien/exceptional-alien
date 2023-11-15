import Link from "next/link";
import { Content } from "@prismicio/client";

interface DestinationsProps {
  results: Content.DestinationDocument<string>[];
}

export default function Destinations(props: DestinationsProps) {
  return (
    <section>
      <div className="grid gap-x-2 md:grid-cols-2 md:gap-x-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {props.results.map((item, i) => (
          <Link
            href={"/destinations/" + item.uid}
            key={i}
            className="flex items-center text-2xl font-bold uppercase transition-[color] duration-300 ease-in-out hover:text-ex-blue md:text-3xl"
          >
            {item.data.title}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 stroke-[0.5] md:h-8 md:w-8"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </Link>
        ))}
      </div>
    </section>
  );
}
