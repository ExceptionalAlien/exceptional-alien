import Link from "next/link";
import { GroupField, Content } from "@prismicio/client";

export default function Trending({ destinations }: { destinations: GroupField }) {
  return (
    <section className="bg-red-100 w-1/2">
      <h3 className="text-sm">TRENDING</h3>

      {destinations.map((item, i) => (
        <Link
          href={"/destinations/" + (item.destination as Content.DestinationDocument).uid}
          key={i}
          className="text-6xl font-bold block uppercase hover:text-ex-blue duration-300 ease-in-out transition-[color]"
        >
          {(item.destination as Content.DestinationDocument).data.title}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={0.25}
            stroke="currentColor"
            className="w-16 h-16 inline align-[-10px]"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </Link>
      ))}
    </section>
  );
}
