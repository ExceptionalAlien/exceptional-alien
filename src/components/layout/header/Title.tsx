import { useRouter } from "next/router";
import Link from "next/link";
import Place from "@/img/icon-place.svg";
import Playbook from "@/img/icon-playbook.svg";
import Person from "@/img/icon-person.svg";
import Gem from "@/img/icon-gem.svg";

export default function Title({ scrollY }: { scrollY: number }) {
  const router = useRouter();
  const page = router.pathname.split("/")[1];
  const showTitle =
    page === "creators" || page === "travel-playbooks" || page === "destinations" || page === "gems" ? true : false;

  return (
    <Link
      href={"/" + (page === "gems" ? "destinations" : page)}
      className={`transition-[color] ease-in-out duration-300 inline-block align-[-4px] md:align-[-6px] font-bold text-2xl md:text-3xl ml-2 md:ml-4 capitalize [&>svg]:h-5 [&>svg]:md:h-6 [&>svg]:inline-block [&>svg]:ml-1 [&>svg]:md:ml-2 [&>svg]:align-[-3px] ${
        scrollY > 0 ? "text-white" : "text-black"
      } ${!showTitle && "hidden"}`}
    >
      {page}
      {page === "destinations" ? (
        <Place />
      ) : page === "travel-playbooks" ? (
        <Playbook />
      ) : page === "creators" ? (
        <Person />
      ) : (
        <Gem />
      )}
    </Link>
  );
}
