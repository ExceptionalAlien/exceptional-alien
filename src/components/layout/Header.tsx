import { useEffect, useState } from "react";
import Link from "next/link";
import Nav from "./header/Nav";
import Logo from "@/img/logo.svg";

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
      className={`z-10 top-0 fixed w-full h-12 md:h-20 transition-[background-color] ease-in-out duration-300 ${
        scrollY > 0 ? "bg-ex-blue" : "bg-white"
      }`}
    >
      {/* Logo */}
      <h1 className="inline-block">
        <Link
          href="/"
          className={`transition-[color] ease-in-out duration-300 ${scrollY > 0 ? "text-white" : "text-black"}`}
        >
          <Logo className="box-content w-48 md:w-80 p-2 md:p-4 ml-2 mt-2" title="Exceptional ALIEN" />
        </Link>
      </h1>

      <Nav scrollY={scrollY} />
    </header>
  );
}
