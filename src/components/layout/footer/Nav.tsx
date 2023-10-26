import Link from "next/link";
import { useRouter } from "next/router";

export default function Nav() {
  const router = useRouter();

  return (
    <nav className="absolute m-2 md:m-3 text-sm text-white [&>a]:p-2 [&>a]:md:p-3 [&>a]:w-max [&>a]:block [&>a]:md:inline-block hover:[&>a]:text-ex-light-grey [&>a]:duration-300 [&>a]:ease-in-out [&>a]:transition-[color]">
      <Link href="/about" className={router.pathname === "/about" ? "opacity-50" : ""}>
        About
      </Link>

      <Link href="/contact" className={router.pathname === "/contact" ? "opacity-50" : ""}>
        Contact
      </Link>

      <a href="https://exceptionalalienstudio.com/" target="_blank">
        EA Studio
      </a>

      <Link href="/terms-and-privacy" className={router.pathname === "/terms-and-privacy" ? "opacity-50" : ""}>
        Terms &amp; Privacy
      </Link>
    </nav>
  );
}
