interface VideoProps {
  iframe: string | null;
  showVideo: boolean;
  setShowVideo: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Video(props: VideoProps) {
  const closeVideo = () => {
    props.setShowVideo(false);
  };

  return (
    <div
      className={`bg-ex-blue/95 fixed top-0 z-20 flex items-center justify-center transition-[opacity] duration-300 ease-in ${
        !props.showVideo ? "h-0 w-0 overflow-hidden opacity-0" : "h-full w-full"
      }`}
    >
      <div onClick={closeVideo} className="absolute h-full w-full" />

      <div
        className="absolute aspect-video w-11/12 md:w-2/3 [&>iframe]:h-full [&>iframe]:w-full"
        dangerouslySetInnerHTML={{ __html: props.iframe as TrustedHTML }}
      />

      <button
        onClick={closeVideo}
        className="fixed right-0 top-0 p-4 text-white transition-[color] duration-300 ease-in-out hover:text-ex-light-grey md:p-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-8 w-8 md:h-12 md:w-12"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
