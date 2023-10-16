import Link from "next/link";
import { GroupField, Content } from "@prismicio/client";

export default function Trending({ destinations }: { destinations: GroupField }) {
  return (
    <section className="md:sticky top-[176px] md:w-1/2 md:float-left md:pr-3">
      <h3 className="text-sm">TRENDING</h3>

      {destinations.map((item, i) => (
        <Link
          href={"/destinations/" + (item.destination as Content.DestinationDocument).uid}
          key={i}
          className="text-4xl md:text-6xl font-bold uppercase hover:text-ex-blue duration-300 ease-in-out transition-[color] flex items-center"
        >
          {(item.destination as Content.DestinationDocument).data.title}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 md:w-14 h-10 md:h-14 stroke-[0.5]"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </Link>
      ))}
    </section>
  );
}
