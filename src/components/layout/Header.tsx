import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Nav from "./header/Nav";
import Title from "./header/Title";
import Logo from "@/img/logo.svg";
import LogoIcon from "@/img/logo-icon.svg";

export default function Header() {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);

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
        <meta name="theme-color" content={scrollY > 0 ? "#2220C1" : "#FFFFFF"} />
        <meta name="robots" content="noindex" />
        <meta property="og:type" content="website" />
      </Head>

      <header
        className={`z-30 top-0 fixed w-full h-12 md:h-20 md:transition-[background-color,color] md:ease-in-out md:duration-300 ${
          scrollY > 0 ? "bg-ex-blue text-white" : "bg-white"
        }`}
      >
        {/* Logo */}
        <h1 className="inline-block align-middle">
          <Link
            href="/"
            className={`transition-[color] ease-in-out duration-300 ${scrollY > 0 ? "text-white" : "text-black"}`}
          >
            {router.pathname === "/" ? (
              <Logo className="box-content w-48 md:w-80 p-2 md:p-4 ml-2 mt-2" title="Exceptional ALIEN" />
            ) : (
              <LogoIcon className="box-content h-6 md:h-10 p-3 md:p-5 pl-4 md:pl-6 !pr-0" title="Exceptional ALIEN" />
            )}
          </Link>
        </h1>

        <Title scrollY={scrollY} />
        <Nav scrollY={scrollY} />
      </header>
    </>
  );
}
