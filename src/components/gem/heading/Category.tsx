import Link from "next/link";
import GemIcon from "@/components/GemIcon";

export default function Heading({ category, destination }: { category: string; destination: string }) {
  return (
    <Link
      href={`/destinations/${destination}?filter=${category.toLowerCase()}`}
      className="hover:opacity-50 duration-300 ease-in-out transition-opacity block"
    >
      <GemIcon category={category} hideBg={true} classes="box-content [&>svg]:w-10 pt-[11px] pl-2" />
      <span className="uppercase pl-5 text-ex-blue">{category}</span>
    </Link>
  );
}
