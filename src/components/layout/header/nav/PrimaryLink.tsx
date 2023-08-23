import Link from "next/link";
import { useRouter } from "next/router";
import Place from "@/img/icon-place.svg";
import Playbook from "@/img/icon-playbook.svg";
import Person from "@/img/icon-person.svg";

export default function PrimaryLink(props: { page: string }) {
  const router = useRouter();

  return (
    <Link
      href={`/${props.page}`}
      className={`group/${props.page} inline-flex md:flex-col items-center relative capitalize text-2xl md:text-base font-bold md:font-normal !leading-none p-6 md:p-4 [&>svg]:h-6 [&>svg]:mr-3 [&>svg]:md:mr-0 [&>svg]:md:mb-2 [&>svg]:md:opacity-0 group-hover/nav:[&>svg]:opacity-100 [&>svg]:duration-300 [&>svg]:transition-opacity [&>svg]:ease-in-out [&>svg]:-mt-1 [&>svg]:md:mt-0`}
    >
      <span
        className={`absolute w-[calc(100%-32px)] bg-black top-0 duration-200 ease-in-out transition-[height] ${
          router.pathname === "/" + props.page ? "h-5 md:group-hover/nav:h-1" : `h-0 md:group-hover/${props.page}:h-1`
        }`}
      ></span>
      {props.page === "destinations" ? <Place /> : props.page === "playbooks" ? <Playbook /> : <Person />}
      {props.page === "playbooks" ? "Travel Playbooks" : props.page}
    </Link>
  );
}
