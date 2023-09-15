import { useRouter } from "next/router";

export default function Share({ title }: { title: string }) {
  const router = useRouter();

  const share = () => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: title,
          url: "https://exceptionalalien.com/playbooks/" + router.query.uid,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.log("Share not supported");
      window.location.href = `mailto:?subject=${title}&body=https://exceptionalalien.com/playbooks/${router.query.uid}`;
    }
  };

  return (
    <button
      onClick={share}
      className="absolute top-0 right-0 p-3 md:p-4 drop-shadow hover:opacity-75 duration-300 ease-in-out transition-opacity"
      title="Share"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
        />
      </svg>
    </button>
  );
}
