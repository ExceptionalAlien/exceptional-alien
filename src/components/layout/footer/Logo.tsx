import LogoIcon from "@/img/logo-icon.svg";

export default function Logo() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <LogoIcon
      onClick={scrollToTop}
      className="box-content h-12 fill-white mb-2 md:mb-0 p-4 md:p-6 absolute right-0 bottom-0"
    />
  );
}
