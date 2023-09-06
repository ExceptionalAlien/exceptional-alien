import Link from "next/link";
import { useRouter } from "next/router";

export default function Nav() {
  const router = useRouter();

  return (
    <nav className="pl-1 md:pl-3 pt-3 text-sm [&>*]:leading-none [&>*]:text-white [&>*]:p-3 [&>*]:w-max [&>*]:block [&>*]:md:inline-block hover:[&>*]:opacity-50 [&>*]:duration-300 [&>*]:ease-in-out [&>*]:transition-opacity">
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
