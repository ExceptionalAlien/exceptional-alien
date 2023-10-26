import LogoIcon from "@/img/logo-icon.svg";

export default function Logo() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <LogoIcon
      onClick={scrollToTop}
      className="pb-safe h-12 text-white absolute right-4 md:right-6 bottom-4 md:bottom-6 box-content"
    />
  );
}
