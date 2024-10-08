import { useRef, useState, useEffect } from "react";

type SliderProps = {
  children: any;
  minItems?: number;
  classes?: string;
};

export default function Slider({ minItems = 2, ...props }: SliderProps) {
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
    const slider = ref.current!;

    const handleScroll = () => {
      // Detect if scroll at start or end
      setScrollPos(
        slider.scrollLeft === 0
          ? "start"
          : Math.round(slider.scrollLeft) + slider.offsetWidth >= slider.scrollWidth
            ? "end"
            : ""
      );
    };

    handleScroll();
    slider.addEventListener("scroll", handleScroll);
    return () => slider.removeEventListener("scroll", handleScroll); // Fire only if slider is in DOM
  }, []);

  return (
    <div
      className={`relative [&>button]:absolute [&>button]:top-1/2 [&>button]:hidden [&>button]:h-12 [&>button]:w-12 [&>button]:-translate-y-1/2 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-full [&>button]:bg-white [&>button]:bg-opacity-30 [&>button]:text-black [&>button]:backdrop-blur [&>button]:transition-[background-color] [&>button]:duration-300 [&>button]:ease-in-out hover:[&>button]:bg-opacity-50 [&>button]:md:flex ${props.classes}`}
    >
      <div
        className="slider scrolling-touch no-scrollbar flex snap-x snap-mandatory scroll-px-5 overflow-x-scroll pr-5 md:scroll-px-5 md:pr-5 [&>*]:ml-5 [&>*]:flex-none [&>*]:snap-start [&>*]:snap-always [&>*]:md:ml-5"
        ref={ref}
      >
        {props.children}
      </div>

      {/* Left arrow */}
      <button onClick={scrollBack} className={`left-3 ${scrollPos === "start" && "!hidden"}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="mr-1 h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={scrollForward}
        className={`right-3 ${(scrollPos === "end" || props.children.length <= minItems) && "!hidden"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="ml-1 h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}
