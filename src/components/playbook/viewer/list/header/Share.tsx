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
      window.location.href = `mailto:?subject=${encodeURIComponent(
        title
      )}&body=https://exceptionalalien.com/playbooks/${router.query.uid}`;
    }
  };

  return (
    <button
      onClick={share}
      className="bg-black hover:bg-black duration-300 ease-in-out transition-[background-color] backdrop-blur bg-opacity-25 rounded-full absolute top-3 md:top-4 right-3 md:right-4 p-2"
      title="Share"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
        <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
      </svg>
    </button>
  );
}
