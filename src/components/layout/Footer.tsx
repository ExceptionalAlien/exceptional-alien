import Link from "next/link";
import Logo from "./footer/Logo";
import IG from "@/img/social-ig.svg";
import FB from "@/img/social-fb.svg";
import LI from "@/img/social-li.svg";

function Socials() {
  return (
    <div className="[&>a]:inline-block absolute top-0 right-0 mr-1 md:mr-3 mt-3">
      {/* Instagram */}
      <a href="https://www.instagram.com/exceptionalalien/" target="_blank" title="Instagram">
        <IG className="fill-ex-light-grey hover:fill-white transition-[fill] duration-300 h-6 box-content p-3" />
      </a>
      {/* Facebook */}
      <a href="https://www.facebook.com/exceptionalalien" target="_blank" title="Facebook">
        <FB className="fill-ex-light-grey hover:fill-white transition-[fill] duration-300 h-6 box-content p-3" />
      </a>
      {/* LinkedIn */}
      <a href="https://www.linkedin.com/company/exceptional-alien" target="_blank" title="LinkedIn">
        <LI className="fill-ex-light-grey hover:fill-white transition-[fill] duration-300 h-6 box-content p-3" />
      </a>
    </div>
  );
}

function Nav() {
  return (
    <div className="pl-1 md:pl-2 pt-3 md:pt-2 [&>*]:text-base [&>*]:leading-none [&>*]:text-ex-light-grey hover:[&>*]:text-white [&>*]:transition-[color] [&>*]:duration-300 [&>*]:p-3 [&>*]:md:p-4 [&>*]:block [&>*]:md:inline-block">
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
