import { useEffect, useState, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import Nav from "./header/Nav";
import { SearchBoxContext, SearchBoxContextType } from "@/context/SearchBoxContext";
import LogoText from "@/img/logo.svg";
import LogoIcon from "@/img/logo-icon.svg";
import Place from "@/img/icon-place.svg";
import Playbook from "@/img/icon-playbook.svg";
import Person from "@/img/icon-person.svg";
import Gem from "@/img/icon-gem.svg";

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showingSearchBox, setShowingSearchBox } = useContext<SearchBoxContextType>(SearchBoxContext);
  const [scrollY, setScrollY] = useState(0);
  const [showingNav, setShowingNav] = useState(false);
  const page = router.pathname.split("/")[1];

  const searchClick = () => {
    if (router.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setShowingSearchBox(!showingSearchBox); // Toggle
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content={scrollY > 1 && !showingNav ? "#2220C1" : "#FFFFFF"} />
        <meta property="og:type" content="website" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
      </Head>

      <header
        className={`p-safe fixed top-0 z-10 flex h-12 w-full items-center md:h-20 md:transition-[background-color] md:duration-300 md:ease-in-out ${
          scrollY <= 1 ? "bg-white" : searchParams?.get("c") ? `bg-black` : "bg-ex-blue"
        }`}
      >
        <h1>
          <Link
            href="/"
            className={`block p-2 transition-[color] duration-300 ease-in-out md:p-4 ${
              scrollY > 1 ? "text-white" : searchParams?.get("c") ? `text-black` : "text-ex-blue"
            } ${router.pathname === "/" ? "m-2" : "m-1 ml-2"}`}
          >
            {router.pathname === "/" || searchParams?.get("c") ? (
              <LogoText className="w-48 md:w-80" title="Exceptional ALIEN" />
            ) : (
              <LogoIcon className="h-6 md:h-10" title="Exceptional ALIEN" />
            )}
          </Link>
        </h1>

        {/* Page title */}
        <Link
          href={"/" + (page === "gems" ? "destinations" : page)}
          className={`flex items-center text-2xl font-bold capitalize transition-[color] duration-300 ease-in-out md:text-4xl [&>svg]:ml-1 [&>svg]:h-5 [&>svg]:md:ml-2 [&>svg]:md:h-6 ${
            scrollY > 1 ? "text-white" : "text-ex-blue"
          } ${
            ((page !== "contributors" && page !== "travel-playbooks" && page !== "destinations" && page !== "gems") ||
              searchParams?.get("c")) &&
            "hidden"
          }`}
        >
          {router.pathname === `/${page}` ? (
            <h2>{page.replace("travel-playbooks", "Playbooks")}</h2>
          ) : (
            page.replace("travel-playbooks", "Playbooks")
          )}

          {page === "destinations" ? (
            <Place />
          ) : page === "travel-playbooks" ? (
            <Playbook />
          ) : page === "contributors" ? (
            <Person />
          ) : (
            <Gem />
          )}
        </Link>

        <Nav scrollY={scrollY} showingNav={showingNav} setShowingNav={setShowingNav} />

        {/* Search */}
        <button
          onClick={searchClick}
          title="Search"
          className={`ml-auto p-3 transition-[color] duration-300 ease-in-out hover:text-ex-light-grey md:ml-0 md:p-6 ${
            (router.pathname === "/" && scrollY === 0) || showingSearchBox
              ? "text-ex-light-grey"
              : scrollY > 1
                ? "text-white"
                : searchParams?.get("c")
                  ? "text-black"
                  : "text-ex-blue"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>

        {/* Burger */}
        <button
          onClick={() => setShowingNav(true)}
          title="Menu"
          className={`p-3 pr-4 transition-[color] duration-300 ease-in-out md:hidden ${
            scrollY > 1 ? "text-white" : searchParams?.get("c") ? "text-black" : "text-ex-blue"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </header>
    </>
  );
}
