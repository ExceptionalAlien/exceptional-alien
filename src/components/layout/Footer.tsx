import Link from "next/link";
import Logo from "./footer/Logo";
import IG from "@/img/social-ig.svg";
import FB from "@/img/social-fb.svg";
import LI from "@/img/social-li.svg";

function Socials() {
  return (
    <div className="absolute top-0 right-0 mr-1 md:mr-3 mt-3 [&>a]:inline-block [&_svg]:fill-white [&_svg]:h-6 [&_svg]:box-content [&_svg]:p-3">
      {/* Instagram */}
      <a href="https://www.instagram.com/exceptionalalien/" target="_blank" title="Instagram">
        <IG />
      </a>
      {/* Facebook */}
      <a href="https://www.facebook.com/exceptionalalien" target="_blank" title="Facebook">
        <FB />
      </a>
      {/* LinkedIn */}
      <a href="https://www.linkedin.com/company/exceptional-alien" target="_blank" title="LinkedIn">
        <LI />
      </a>
    </div>
  );
}

function Nav() {
  return (
    <div className="pl-1 md:pl-3 pt-3 [&>*]:leading-none [&>*]:text-white [&>*]:p-3 [&>*]:block [&>*]:md:inline-block">
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/terms-and-privacy">Terms &amp; Privacy</Link>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ex-blue relative width-full h-64 md:h-80">
      <Nav />
      <Socials />
      {/* Copyright */}
      <p className="text-white font-mono text-xs absolute bottom-0 mb-6 ml-4 md:ml-6 leading-none">
        © {new Date().getFullYear()} Exceptional ALIEN
      </p>
      <Logo />
    </footer>
  );
}
