import { useRouter } from "next/router";
import Link from "next/link";

export default function Nav() {
  const router = useRouter();

  return (
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

      <Link href="/terms-and-privacy" className={router.pathname === "/terms-and-privacy" ? "!text-ex-light-grey" : ""}>
        Terms &amp; Privacy
      </Link>
    </nav>
  );
}
