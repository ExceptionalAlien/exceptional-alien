import Link from "next/link";
import Story from "@/img/icon-story.svg";

interface ButtonsProps {
  video: string;
  story: string;
  setShowVideo: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function List(props: ButtonsProps) {
  const videoClick = () => {
    props.setShowVideo(true);
  };

  return (
    <div
      className={`grid gap-2 md:gap-3 [&>*>svg]:max-[320px]:hidden [&>*]:flex [&>*]:h-9 [&>*]:items-center [&>*]:justify-center [&>*]:whitespace-nowrap [&>*]:rounded-full [&>*]:border [&>*]:border-ex-blue [&>*]:pl-3 [&>*]:pr-3 [&>*]:text-ex-blue [&>*]:transition-[background-color,color] [&>*]:duration-300 [&>*]:ease-in-out hover:[&>*]:bg-ex-blue hover:[&>*]:text-white ${
        !props.video && !props.story
          ? "hidden"
          : (props.video && !props.story) || (!props.video && props.story)
            ? "[&>*]:md:w-max"
            : "grid-cols-2"
      }`}
    >
      {props.video && (
        <button onClick={videoClick}>
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
        </button>
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
