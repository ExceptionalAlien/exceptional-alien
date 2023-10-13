import Link from "next/link";
import { GroupField, Content } from "@prismicio/client";

export default function Trending({ destinations }: { destinations: GroupField }) {
  return (
    <section className="">
      <h3 className="text-sm">TRENDING</h3>

      {destinations.map((item, i) => (
        <Link
          href={"/destinations/" + (item.destination as Content.DestinationDocument).uid}
          key={i}
          className="text-6xl font-bold block"
        >
          {(item.destination as Content.DestinationDocument).data.title}
        </Link>
      ))}
    </section>
  );
}
