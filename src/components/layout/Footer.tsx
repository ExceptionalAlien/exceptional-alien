import { useRouter } from "next/router";
import Link from "next/link";
import Socials from "../shared/Socials";
import LogoIcon from "@/img/logo-icon.svg";

export default function Footer() {
  const router = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative h-72 md:h-80">
      <nav className="absolute m-2 md:m-3 [&>a]:block [&>a]:w-max [&>a]:p-2 [&>a]:text-sm [&>a]:text-white [&>a]:transition-[color] [&>a]:duration-300 [&>a]:ease-in-out hover:[&>a]:text-ex-light-grey [&>a]:md:inline-block [&>a]:md:p-3">
        <Link href="/about" className={router.pathname === "/about" ? "!text-ex-light-grey" : ""}>
          About
        </Link>

        <Link href="/contact" className={router.pathname === "/contact" ? "!text-ex-light-grey" : ""}>
          Contact
        </Link>

        <a href="https://exceptionalalienstudio.com/" target="_blank">
          EA Studio
        </a>

        <Link
          href="/terms-and-privacy"
          className={router.pathname === "/terms-and-privacy" ? "!text-ex-light-grey" : ""}
        >
          Terms &amp; Privacy
        </Link>
      </nav>

      <Socials classes="absolute top-2 md:top-4 right-2 md:right-4" />

      {/* Copyright */}
      <p className="pb-safe absolute bottom-0 m-4 font-mono text-xs text-white md:m-6">
        © {new Date().getFullYear()} Exceptional ALIEN
      </p>

      <LogoIcon
        onClick={scrollToTop}
        className="pb-safe absolute bottom-4 right-4 box-content h-10 text-white md:bottom-6 md:right-6"
      />
    </footer>
  );
}
