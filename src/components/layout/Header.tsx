import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/img/logo.svg";
import Place from "@/img/icon-place.svg";
import Playbook from "@/img/icon-playbook.svg";
import Person from "@/img/icon-person.svg";

function Nav(props: { scrollY: number }) {
  return (
    <nav
      className={`group h-full absolute top-0 pt-3 right-0 pr-2 [&>*]:inline-flex [&_a]:p-4 [&_a]:transition-[color,border-color] [&_a]:duration-500 ${
        props.scrollY > 0 && "[&>*]:text-white [&>a]:border-white"
      }`}
    >
      <Link href="/" className="border border-black rounded-full !pt-2 !pb-2 mr-4 [&>svg]:mr-1">
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

      <div className="relative -top-7 group-hover:-top-3 transition-[top] duration-300 ease-in-out [&>a]:inline-flex [&>a]:flex-col [&>a]:leading-none [&_svg]:h-6 [&_svg]:mb-2 [&_svg]:opacity-0 group-hover:[&_svg]:opacity-100 [&_svg]:duration-300 [&_svg]:transition-opacity [&_svg]:ease-in-out">
        <Link href="/">
          <Place />
          Destinations
        </Link>
        <Link href="/">
          <Playbook />
          Travel Playbooks
        </Link>
        <Link href="/">
          <Person />
          People
        </Link>
      </div>

      <button className="p-4 transition-[color] duration-500">
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

export default function Header() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed w-full h-12 md:h-20 transition-[background-color] duration-500 ${
        scrollY > 0 ? "bg-ex-blue" : "bg-white"
      }`}
    >
      {/* Logo */}
      <h1 className="inline-block">
        <Link href="/" className={`transition-[color] duration-500 ${scrollY > 0 ? "text-white" : "text-black"}`}>
          <Logo className="box-content w-48 md:w-80 p-2 md:p-4 ml-2 mt-2" title="Exceptional ALIEN" />
        </Link>
      </h1>

      <Nav scrollY={scrollY} />
    </header>
  );
}
