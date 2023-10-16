import { useRef, useState, useEffect } from "react";

export default function Slider({
  children,
  itemCount,
  classes,
}: {
  children: any;
  itemCount?: number;
  classes?: string;
}) {
  const [scrollPos, setScrollPos] = useState("start");
  const ref = useRef<HTMLDivElement>(null);

  const scrollBack = () => {
    ref.current!.scrollTo({
      left: ref.current!.scrollLeft - ref.current!.offsetWidth / 2,
      behavior: "smooth",
    }); // Move half of slider width
  };

  const scrollForward = () => {
    ref.current!.scrollTo({
      left: ref.current!.scrollLeft + ref.current!.offsetWidth / 2,
      behavior: "smooth",
    }); // Move half of slider width
  };

  useEffect(() => {
    const handleScroll = () => {
      const slider = ref.current!;

      // Detect if scroll at start or end
      setScrollPos(
        slider.scrollLeft === 0 ? "start" : slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth ? "end" : ""
      );
    };

    handleScroll();
    ref.current!.addEventListener("scroll", handleScroll);
    return () => ref.current! && ref.current!.removeEventListener("scroll", handleScroll); // Fire only if slider is in DOM
  }, []);

  return (
    <div className="relative [&>button]:absolute [&>button]:text-white [&>button]:hidden [&>button]:md:flex [&>button]:w-12 [&>button]:h-12 [&>button]:justify-center [&>button]:items-center [&>button]:top-1/2 [&>button]:-translate-y-1/2 [&>button]:rounded-full [&>button]:bg-black hover:[&>button]:bg-opacity-50 [&>button]:transition-[background-color] [&>button]:duration-300 &>button]:ease-in-out [&>button]:bg-opacity-20 [&>button]:backdrop-blur [&>button>svg]:w-6 [&>button>svg]:h-6 [&>button>svg]:box-content">
      {/* Slider */}
      <div
        className={`slider flex overflow-x-scroll scrolling-touch no-scrollbar snap-x snap-mandatory pr-4 md:pr-6 [&>a]:flex-none [&>a]:snap-start [&>a]:snap-always [&>a]:box-content [&>a]:pl-4 [&>a]:md:pl-6 ${classes}`}
        ref={ref}
      >
        {children}
      </div>

      {/* Left arrow */}
      <button onClick={scrollBack} className={`left-3 ${scrollPos === "start" && "!hidden"}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="pr-1"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={scrollForward}
        className={`right-3 ${(scrollPos === "end" || (itemCount && itemCount <= 2)) && "!hidden"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="pl-1"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}
