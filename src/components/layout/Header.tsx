import { useEffect, useState } from "react";
import Link from "next/link";
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
    <header className={`fixed w-full h-13 md:h-20 transition-bg duration-500 ${scrollY ? "bg-ex-blue" : "bg-white"}`}>
      {/* Logo */}
      <h1 className="inline-block">
        <Link href="/">
          <Logo
            className={`box-content transition-[fill] duration-500 w-48 md:w-80 p-2 md:p-4 ml-2 mt-2 ${
              scrollY ? "fill-white" : "fill-black"
            }`}
            title="Exceptional ALIEN"
          />
        </Link>
      </h1>
    </header>
  );
}
