import Logo from "./footer/Logo";
import Nav from "./footer/Nav";
import Socials from "../shared/Socials";

export default function Footer() {
  return (
    <footer className="bg-ex-blue relative width-full h-72 md:h-80">
      <Nav />
      <Socials classes="absolute top-0 right-0 mr-2 md:mr-4 mt-4" />

      {/* Copyright */}
      <p className="pb-safe text-white font-mono text-xs absolute bottom-0 m-4 md:m-6 leading-none">
        © {new Date().getFullYear()} Exceptional ALIEN
      </p>

      <Logo />
    </footer>
  );
}
