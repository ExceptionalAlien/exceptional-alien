import Link from "next/link";
import Place from "@/img/icon-place.svg";
import Playbook from "@/img/icon-playbook.svg";
import Person from "@/img/icon-person.svg";

function Buttons(props: { scrollY: number }) {
  return (
    <div
      className={`absolute h-full right-0 top-0 [&>*]:p-3 [&>*]:md:p-4 [&>*]:transition-[color] [&>*]:duration-300 [&>*]:ease-in-out [&>*]:h-full ${
        props.scrollY > 0 ? "[&>*]:text-white" : "hover:[&>*]:text-ex-light-grey"
      }`}
    >
      {/* Search */}
      <button title="Search" className="md:!pr-6">
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

      {/* Burger */}
      <button title="Menu" className="!pr-4 md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </div>
  );
}

function Primary() {
  return (
    <div className="justify-center items-center flex-col md:flex-row relative w-full md:w-auto h-full md:h-auto md:-top-7 md:group-hover/nav:-top-3 transition-[top] duration-200 ease-in-out [&>a]:inline-flex [&>a]:md:flex-col [&>a]:items-center [&>a]:relative [&>a]:text-2xl [&>a]:md:text-base [&>a]:font-bold [&>a]:md:font-normal [&>a]:!leading-none [&>a]:p-6 [&>a]:md:p-4 [&_span]:absolute [&_span]:h-0 [&_span]:w-[calc(100%-32px)] [&_span]:bg-black [&_span]:top-0 [&_span]:duration-200 [&_span]:ease-in-out [&_span]:transition-[height] [&_svg]:h-6 [&_svg]:mr-3 [&_svg]:md:mr-0 [&_svg]:md:mb-2 [&_svg]:md:opacity-0 group-hover/nav:[&_svg]:opacity-100 [&_svg]:duration-300 [&_svg]:transition-opacity [&_svg]:ease-in-out">
      <Link href="/destinations" className="group/destinations">
        <span className="md:group-hover/destinations:h-2"></span>
        <Place />
        Destinations
      </Link>

      <Link href="/playbooks" className="group/playbooks">
        <span className="md:group-hover/playbooks:h-2"></span>
        <Playbook />
        Travel Playbooks
      </Link>

      <Link href="/people" className="group/people">
        <span className="md:group-hover/people:h-2"></span>
        <Person />
        People
      </Link>
    </div>
  );
}

export default function Nav(props: { scrollY: number }) {
  return (
    <>
      <nav
        className={`bg-white md:bg-transparent z-10 group/nav w-full md:w-auto h-full overflow-hidden fixed md:absolute top-0 md:pt-3 md:right-16 [&>*]:inline-flex [&_a]:transition-[color,border-color,background-color] [&_a]:duration-300 [&_a]:ease-in-out ${
          props.scrollY > 0 && "[&>*]:md:text-white [&_span]:md:bg-white"
        }`}
      >
        <Link
          href="/download"
          className={`md:!hidden lg:!inline-flex box-content z-10 absolute md:static left-1/2 -translate-x-1/2 md:translate-x-0 w-[calc(100%-80px)] md:w-auto max-w-xs bottom-6 justify-center border border-black rounded-full p-4 md:pl-3 pt-2 pb-2 md:ml-4 mr-4 [&>svg]:mr-1 hover:bg-black hover:text-white ${
            props.scrollY > 0 && "hover:md:bg-white md:border-white hover:md:text-ex-blue"
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
      </nav>

      <Buttons scrollY={props.scrollY} />
    </>
  );
}
