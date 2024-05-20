import Link from "next/link";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import Place from "@/img/icon-place.svg";
import Playbook from "@/img/icon-playbook.svg";
import Person from "@/img/icon-person.svg";
import Globe from "@/img/globe.svg";

type PrimaryLinkProps = {
  page: string;
  hideNav: () => void;
  scrollY: number;
};

export default function PrimaryLink(props: PrimaryLinkProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Link
      href={`/${props.page}`}
      onClick={props.hideNav}
      className={`group/primary relative flex items-center justify-center p-6 text-center text-3xl capitalize md:-mt-8 md:ml-3 md:mr-3 md:h-full md:flex-col md:!p-0 md:text-base md:transition-[margin-top] md:duration-200 md:ease-in-out group-hover/nav:md:mt-0 lg:ml-4 lg:mr-4 landscape:p-4 [&>svg]:mb-[3px] [&>svg]:mr-2 [&>svg]:h-6 [&>svg]:overflow-visible [&>svg]:md:mb-2 [&>svg]:md:mr-0 [&>svg]:md:opacity-0 [&>svg]:md:transition-[opacity] [&>svg]:md:duration-300 [&>svg]:md:ease-in-out group-hover/nav:[&>svg]:md:opacity-100 ${
        searchParams?.get("c") ? "text-black" : "text-ex-blue"
      } ${props.scrollY > 1 && "md:text-white"}`}
    >
      {/* Indicator */}
      <span
        className={`absolute top-0 w-full bg-current transition-[height] duration-200 ease-in-out md:group-hover/primary:h-1 ${
          router.pathname.includes(`/${props.page}`) ? "md:h-5 group-hover/nav:md:h-1" : "h-0"
        }`}
      ></span>

      {props.page === "destinations" ? (
        <Place />
      ) : props.page === "travel-playbooks" ? (
        <Playbook />
      ) : props.page === "contributors" ? (
        <Person />
      ) : (
        <Globe />
      )}

      {props.page.replace("-", " ")}
    </Link>
  );
}
