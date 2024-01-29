import { useState, useEffect } from "react";
import Socials from "../shared/Socials";
import Nav from "./footer/Nav";
import LogoIcon from "@/img/logo-icon.svg";

export default function Footer() {
  const [year, setyear] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setyear(new Date().getFullYear());
  }, []);

  return (
    <footer className="p-safe relative h-72">
      <Nav />
      <Socials classes="p-safe absolute top-2 md:top-4 right-2 md:right-4" />

      {/* Copyright */}
      <p className="pb-safe absolute bottom-0 m-4 font-mono text-xs text-white md:m-6">© {year} Exceptional ALIEN</p>

      <LogoIcon
        onClick={scrollToTop}
        className="p-safe pb-safe absolute bottom-4 right-4 box-content h-10 text-white md:bottom-6 md:right-6"
      />
    </footer>
  );
}
