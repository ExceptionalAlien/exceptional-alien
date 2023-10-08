import Link from "next/link";
import GemIcon from "@/components/GemIcon";

export default function Heading({ category, destination }: { category: string; destination: string }) {
  return (
    <Link href={`/destinations/${destination}?filter=${category.toLowerCase()}`} className="group/link block w-max">
      <GemIcon
        category={category}
        hideBg={true}
        classes="!-ml-5 !-mt-5 !w-10 pl-2 pt-[9px] box-content group-hover/link:[&>svg]:fill-ex-light-grey"
      />

      <span className="uppercase pl-5 text-ex-blue group-hover/link:text-ex-light-grey duration-300 ease-in-out transition-[color]">
        {category}
      </span>
    </Link>
  );
}
