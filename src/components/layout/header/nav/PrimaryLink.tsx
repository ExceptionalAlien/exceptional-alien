import Link from "next/link";
import { useRouter } from "next/router";
import Place from "@/img/icon-place.svg";
import Playbook from "@/img/icon-playbook.svg";
import Person from "@/img/icon-person.svg";

export default function PrimaryLink({ page, hideNav }: { page: string; hideNav: () => void }) {
  const router = useRouter();

  return (
    <Link
      href={`/${page}`}
      onClick={hideNav}
      className={`group/primary inline-flex md:flex-col items-center relative capitalize text-2xl md:text-base !leading-none p-6 landscape:p-5 md:!p-4 [&>svg]:h-8 [&>svg]:md:h-6 [&>svg]:w-8 [&>svg]:md:w-6 [&>svg]:mr-3 [&>svg]:md:mr-0 [&>svg]:md:mb-2 [&>svg]:md:invisible group-hover/nav:[&>svg]:visible [&>svg]:md:opacity-0 group-hover/nav:[&>svg]:opacity-100 [&>svg]:md:duration-300 [&>svg]:md:transition-[opacity] [&>svg]:ease-in [&>svg]:-mt-1 [&>svg]:md:mt-0 ${
        router.pathname === "/" + page && "text-ex-grey md:text-current"
      }`}
    >
      {/* Indicator */}
      <span
        className={`absolute w-[calc(100%-32px)] bg-black top-0 duration-200 ease-in-out transition-[height] ${
          router.pathname.indexOf("/" + page) !== -1
            ? "md:h-5 md:group-hover/nav:h-1"
            : `h-0 md:group-hover/primary:h-1`
        }`}
      ></span>

      {/* Icon */}
      {page === "destinations" ? (
        <Place className="!mr-2 md:!mr-0" />
      ) : page === "playbooks" ? (
        <Playbook className="!w-10 md:!w-8" />
      ) : (
        <Person />
      )}

      {page.replace("-", " ")}
    </Link>
  );
}
