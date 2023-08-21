import Link from "next/link";

export default function Nav() {
  return (
    <nav className="pl-1 md:pl-3 pt-3 [&>*]:leading-none [&>*]:text-white [&>*]:p-3 [&>*]:block [&>*]:md:inline-block">
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/terms-and-privacy">Terms &amp; Privacy</Link>
    </nav>
  );
}
