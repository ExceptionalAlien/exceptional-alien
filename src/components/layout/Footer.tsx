import Logo from "./footer/Logo";
import Nav from "./footer/Nav";
import Socials from "../shared/Socials";

export default function Footer() {
  return (
    <footer className="relative h-72 md:h-80">
      <Nav />
      <Socials classes="absolute top-2 md:top-4 right-2 md:right-4" />

      {/* Copyright */}
      <p className="pb-safe text-white font-mono text-xs absolute bottom-0 m-4 md:m-6">
        © {new Date().getFullYear()} Exceptional ALIEN
      </p>

      <Logo />
    </footer>
  );
}
