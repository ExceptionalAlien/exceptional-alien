import LogoIcon from "@/img/logo-icon.svg";

export default function Logo() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return <LogoIcon onClick={scrollToTop} className="pb-safe h-12 fill-white m-4 md:m-6 absolute right-0 bottom-0" />;
}
