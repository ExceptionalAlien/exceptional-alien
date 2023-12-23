import Link from "next/link";
import Story from "@/img/icon-story.svg";

interface ButtonsProps {
  video: string;
  story: string;
}

export default function List(props: ButtonsProps) {
  return (
    <div
      className={`grid gap-2 md:gap-3 [&>a>svg]:max-[320px]:hidden [&>a]:flex [&>a]:h-9 [&>a]:items-center [&>a]:justify-center [&>a]:whitespace-nowrap [&>a]:rounded-full [&>a]:border [&>a]:border-ex-blue [&>a]:pl-3 [&>a]:pr-3 [&>a]:text-ex-blue [&>a]:transition-[background-color,color] [&>a]:duration-300 [&>a]:ease-in-out hover:[&>a]:bg-ex-blue hover:[&>a]:text-white ${
        !props.video && !props.story
          ? "hidden"
          : (props.video && !props.story) || (!props.video && props.story)
            ? "[&>a]:md:w-max"
            : "grid-cols-2"
      }`}
    >
      {props.video && (
        <Link href={props.video} target="_blank">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="mr-[6px] h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
          Watch the video
        </Link>
      )}

      {props.story && (
        <Link href={props.story as string} target="_blank">
          <Story className="mr-[6px] h-5 w-5" />
          Read the Interview
        </Link>
      )}
    </div>
  );
}
