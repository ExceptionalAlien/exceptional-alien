import Logo from "./footer/Logo";
import Nav from "./footer/Nav";
import Socials from "../Socials";

export default function Footer() {
  return (
    <footer className="bg-ex-blue relative width-full h-64 md:h-80">
      <Nav />
      <Socials classes="absolute top-0 right-0 mr-1 md:mr-3 mt-3" />
      {/* Copyright */}
      <p className="text-white font-mono text-xs absolute bottom-0 mb-6 ml-4 md:ml-6 leading-none">
        © {new Date().getFullYear()} Exceptional ALIEN
      </p>
      <Logo />
    </footer>
  );
}
