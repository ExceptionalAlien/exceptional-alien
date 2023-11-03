import { useState, useEffect } from "react";

interface AudioProps {
  file: string;
}

export default function Audio(props: AudioProps) {
  const [mounted, setMounted] = useState(false);
  const isChrome = typeof window !== "undefined" ? navigator.userAgent.indexOf("Chrome") >= 0 : false;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center bg-ex-blue p-2">
      <p className="flex items-center text-xl font-bold text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="mb-[2px] mr-1 h-5 w-5"
        >
          <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
          <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z" />
        </svg>
        Listen
      </p>

      {mounted && (
        <audio className={`ml-2 w-full ${isChrome && "h-8 invert"}`} controls controlsList="nodownload noplaybackrate">
          <source src={props.file} type="audio/mpeg" />
          Your browser does not support the audio tag.
        </audio>
      )}
    </div>
  );
}
