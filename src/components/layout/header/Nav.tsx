import Link from "next/link";
import Place from "@/img/icon-place.svg";
import Playbook from "@/img/icon-playbook.svg";
import Person from "@/img/icon-person.svg";

function Primary() {
  return (
    <div className="relative -top-7 group-hover/nav:-top-3 transition-[top] duration-200 ease-in-out [&>a]:inline-flex [&>a]:flex-col [&>a]:leading-none [&>a]:relative [&_span]:absolute [&_span]:h-0 [&_span]:w-[calc(100%-32px)] [&_span]:bg-black [&_span]:top-0 [&_span]:duration-200 [&_span]:ease-in-out [&_span]:transition-[height] [&_svg]:h-6 [&_svg]:mb-2 [&_svg]:opacity-0 group-hover/nav:[&_svg]:opacity-100 [&_svg]:duration-300 [&_svg]:transition-opacity [&_svg]:ease-in-out">
      <Link href="/destinations" className="group/destinations">
        <span className="group-hover/destinations:h-2"></span>
        <Place />
        Destinations
      </Link>

      <Link href="/playbooks" className="group/playbooks">
        <span className="group-hover/playbooks:h-2"></span>
        <Playbook />
        Travel Playbooks
      </Link>

      <Link href="/people" className="group/people">
        <span className="group-hover/people:h-2"></span>
        <Person />
        People
      </Link>
    </div>
  );
}

export default function Nav(props: { scrollY: number }) {
  return (
    <nav
      className={`group/nav h-full overflow-hidden absolute top-0 pt-3 right-0 pr-2 [&>*]:inline-flex [&_a]:p-4 [&_a]:transition-[color,border-color,background-color] [&_a]:duration-300 [&_a]:ease-in-out ${
        props.scrollY > 0 && "[&>*]:text-white [&>a]:border-white [&_span]:bg-white"
      }`}
    >
      <Link
        href="/download"
        className={`border border-black rounded-full !pt-2 !pb-2 ml-4 mr-4 [&>svg]:mr-1 ${
          props.scrollY > 0 ? "hover:bg-white hover:text-ex-blue" : "hover:bg-black hover:text-white"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
          />
        </svg>
        Download App
      </Link>

      <Primary />

      <button className="p-4 transition-[color] duration-300 ease-in-out">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </nav>
  );
}
