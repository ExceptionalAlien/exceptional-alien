import Link from "next/link";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import PrimaryLink from "./nav/PrimaryLink";
import LogoIcon from "@/img/logo-icon.svg";

type Props = {
  scrollY: number;
  showingNav: boolean;
  setShowingNav: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Nav(props: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const hideNav = () => {
    props.setShowingNav(false);
  };

  return (
    <nav
      className={`group/nav fixed top-0 flex w-full flex-col items-center justify-center overflow-hidden bg-white md:static md:ml-auto md:w-auto md:flex-row md:bg-transparent ${
        props.showingNav ? "h-full" : "h-0 md:h-full"
      }`}
    >
      {/* Download app
      <Link
        href="/download"
        onClick={hideNav}
        className={`pointer-events-none absolute bottom-6 left-1/2 flex w-72 -translate-x-1/2 justify-center rounded-full border border-ex-blue p-2 pl-[14px] pr-4 text-ex-blue transition-[color,background-color,border-color] duration-300 ease-in-out md:static md:mr-4 md:hidden md:w-auto md:translate-x-0 landscape:lg:inline-flex ${
          props.scrollY > 1
            ? "md:border-white md:text-white hover:md:bg-white hover:md:text-ex-blue"
            : "hover:md:bg-ex-blue hover:md:text-white"
        } ${
          router.pathname === "/download" &&
          `bg-ex-blue text-white ${props.scrollY > 1 && "md:bg-white md:!text-ex-blue"}`
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="mr-1 h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
          />
        </svg>
        New App Soon!
      </Link> */}

      <PrimaryLink page="destinations" hideNav={hideNav} scrollY={props.scrollY} />
      <PrimaryLink page="travel-playbooks" hideNav={hideNav} scrollY={props.scrollY} />
      <PrimaryLink page="contributors" hideNav={hideNav} scrollY={props.scrollY} />

      {/* Logo */}
      <Link href="/" onClick={hideNav} className="absolute left-6 top-6 md:!hidden" title="Home">
        <LogoIcon className={`h-10 ${searchParams?.get("c") ? "text-black" : "text-ex-blue"}`} />
      </Link>

      {/* Close */}
      <button
        onClick={hideNav}
        title="Close menu"
        className={`absolute right-0 top-0 p-6 md:!hidden ${searchParams?.get("c") ? "text-black" : "text-ex-blue"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>
  );
}
