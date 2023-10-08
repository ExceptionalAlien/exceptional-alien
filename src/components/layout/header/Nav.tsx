import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PrimaryLink from "./nav/PrimaryLink";
import LogoIcon from "@/img/logo-icon.svg";

function Buttons({
  setShowingNav,
  scrollY,
}: {
  setShowingNav: React.Dispatch<React.SetStateAction<boolean>>;
  scrollY: number;
}) {
  return (
    <div
      className={`absolute h-full right-0 top-0 [&>button]:p-3 [&>button]:md:p-4 [&>button]:transition-[opacity,color] [&>button]:duration-300 [&>button]:ease-in-out [&>button]:h-full hover:[&>button]:opacity-50 ${
        scrollY > 0 ? "[&>button]:text-white" : "[&>button]:text-black"
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
      <button onClick={() => setShowingNav(true)} title="Menu" className="!pr-4 md:hidden">
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

export default function Nav({ scrollY }: { scrollY: number }) {
  const [showingNav, setShowingNav] = useState(false);
  const router = useRouter();

  const hideNav = () => {
    setShowingNav(false);
  };

  return (
    <>
      <nav
        className={`bg-white md:bg-transparent transition-[opacity] duration-300 ease-in [&>*]:text-ex-blue z-10 group/nav w-full md:w-auto overflow-hidden fixed md:absolute top-0 md:pt-3 md:right-16 [&>*]:inline-flex [&_a]:transition-[color,border-color,background-color] [&_a]:duration-300 [&_a]:ease-in-out ${
          scrollY > 0 ? "[&>*]:md:text-white [&>div>a>span]:md:bg-white" : "[&>*]:md:text-black"
        } ${showingNav ? "h-full opacity-100" : "h-0 md:h-full opacity-0 md:opacity-100"}`}
      >
        {/* <Link
          href="/download"
          onClick={hideNav}
          className={`landscape:!hidden md:!hidden landscape:lg:!inline-flex box-content z-10 absolute md:static left-1/2 -translate-x-1/2 md:translate-x-0 w-[calc(100%-80px)] md:w-auto max-w-xs bottom-6 justify-center border-[1.5px] border-ex-blue rounded-full p-4 pt-2 pb-2 md:ml-4 mr-4 [&>svg]:mr-1 hover:md:text-white ${
            scrollY > 0
              ? "hover:md:bg-white md:border-white hover:md:!text-ex-blue"
              : "hover:md:bg-black md:border-black hover:md:border-black"
          } ${
            router.pathname === "/download" &&
            `bg-ex-blue border-black !text-white ${
              scrollY > 0 ? "md:bg-white md:border-white md:!text-ex-blue" : "md:bg-black"
            }`
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
        </Link> */}

        <div className="justify-center items-center flex-col md:flex-row relative w-full md:w-auto h-full md:h-auto md:-top-7 md:group-hover/nav:-top-3 transition-[top] duration-200 ease-in-out">
          <PrimaryLink page="destinations" hideNav={hideNav} />
          <PrimaryLink page="playbooks" hideNav={hideNav} />
          <PrimaryLink page="creators" hideNav={hideNav} />
        </div>

        {/* Home */}
        <Link href="/" onClick={hideNav} className="absolute left-0 md:!hidden" title="Home">
          <LogoIcon className="h-12 p-6 box-content fill-ex-blue" />
        </Link>

        {/* Close */}
        <button onClick={hideNav} title="Close menu" className="right-0 absolute p-4 md:!hidden text-ex-blue">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>

      <Buttons setShowingNav={setShowingNav} scrollY={scrollY} />
    </>
  );
}
