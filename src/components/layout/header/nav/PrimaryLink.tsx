import Link from "next/link";
import { useRouter } from "next/router";
import Place from "@/img/icon-place.svg";
import Playbook from "@/img/icon-playbook.svg";
import Person from "@/img/icon-person.svg";

export default function PrimaryLink({
  page,
  hideNav,
  scrollY,
}: {
  page: string;
  hideNav: () => void;
  scrollY: number;
}) {
  const router = useRouter();

  return (
    <Link
      href={`/${page}`}
      onClick={hideNav}
      className={`group/primary relative flex items-center justify-center p-6 text-center text-2xl capitalize text-ex-blue md:-mt-8 md:ml-4 md:mr-4 md:h-full md:flex-col md:!p-0 md:text-base md:transition-[margin-top] md:duration-200 md:ease-in-out group-hover/nav:md:mt-0 landscape:p-4 [&>svg]:mr-2 [&>svg]:h-6 [&>svg]:md:mb-2 [&>svg]:md:mr-0 [&>svg]:md:opacity-0 [&>svg]:md:transition-[opacity] [&>svg]:md:duration-300 [&>svg]:md:ease-in-out group-hover/nav:[&>svg]:md:opacity-100 ${
        scrollY > 0 && "md:text-white"
      }`}
    >
      {/* Indicator */}
      <span
        className={`absolute top-0 w-full bg-current transition-[height] duration-200 ease-in-out md:group-hover/primary:h-1 ${
          router.pathname.includes(`/${page}`) ? "md:h-5 group-hover/nav:md:h-1" : "h-0"
        }`}
      ></span>

      {page === "destinations" ? <Place /> : page === "travel-playbooks" ? <Playbook /> : <Person />}
      {page.replace("-", " ")}
    </Link>
  );
}
