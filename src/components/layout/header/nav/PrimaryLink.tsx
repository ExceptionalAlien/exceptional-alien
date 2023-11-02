import Link from "next/link";
import { useRouter } from "next/router";
import Place from "@/img/icon-place.svg";
import Playbook from "@/img/icon-playbook.svg";
import Person from "@/img/icon-person.svg";
import Story from "@/img/icon-story.svg";

interface Props {
  page: string;
  hideNav: () => void;
  scrollY: number;
}

export default function PrimaryLink(props: Props) {
  const router = useRouter();

  return (
    <Link
      href={`/${props.page}`}
      onClick={props.hideNav}
      className={`group/primary relative flex items-center justify-center p-6 text-center text-3xl capitalize text-ex-blue md:-mt-8 md:ml-4 md:mr-4 md:h-full md:flex-col md:!p-0 md:text-base md:transition-[margin-top] md:duration-200 md:ease-in-out group-hover/nav:md:mt-0 landscape:p-4 [&>svg]:mb-[3px] [&>svg]:mr-2 [&>svg]:h-6 [&>svg]:md:mb-2 [&>svg]:md:mr-0 [&>svg]:md:opacity-0 [&>svg]:md:transition-[opacity] [&>svg]:md:duration-300 [&>svg]:md:ease-in-out group-hover/nav:[&>svg]:md:opacity-100 ${
        props.scrollY > 0 && "md:text-white"
      }`}
    >
      {/* Indicator */}
      <span
        className={`absolute top-0 w-full bg-current transition-[height] duration-200 ease-in-out md:group-hover/primary:h-1 ${
          router.pathname.includes(`/${props.page}`) ? "md:h-5 group-hover/nav:md:h-1" : "h-0"
        }`}
      ></span>

      {props.page === "destinations" ? <Place /> : props.page === "travel-playbooks" ? <Playbook /> : props.page === "stories" ? <Story/> : <Person />}

      {props.page.replace("-", " ").replace("creators", "Community")}
    </Link>
  );
}
