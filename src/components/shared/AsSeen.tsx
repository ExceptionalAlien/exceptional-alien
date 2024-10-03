import Image from "next/image";

type AsSeenProps = {
  title?: string
}

export function AsSeen(props: AsSeenProps) {
  return (
    <>
      <h4 className="text-center text-xl text-nowrap font-bold text-ex-blue w-36 pr-6 md:pr-9">{props.title ?? 'As Seen in'}</h4>

      <a
        href="https://www.forbes.com/sites/afdhelaziz/2023/04/25/how-this-exceptional-travel-platform-is-redefining-authentic-storytelling-and-cultural-connection/"
        target="_blank"
      >
        <Image src="/img/as-seen-in/logo-forbes.png" alt="Forbes" width="978" height="256" className="w-32" />
      </a>

      <a
        href="https://www.gq.com.au/lifestyle/travel/budjerah-travel-recommendations-victoria/image-gallery/92c14af7102580e45a2117d8a100f20f"
        target="_blank"
      >
        <Image src="/img/as-seen-in/logo-gq.png" alt="GQ" width="484" height="256" className="w-24 md:w-28 max-h-24" />
      </a>

      <a href="https://skift.com/2023/08/03/skift-idea-awards-2023-meet-the-winners/" target="_blank">
        <Image src="/img/as-seen-in/logo-skift.png" alt="Skift" width="688" height="256" className="w-24 md:w-36" />
      </a>

      <a
        href="https://sxswsydney.com/session/the-powerful-intrinsic-connection-between-creativity-travel/"
        target="_blank"
      >
        <Image src="/img/as-seen-in/logo-sxsw.png" alt="SXSW Sydney" width="540" height="256"
               className="w-28" />
      </a>

      <a href="https://www.youtube.com/watch?v=WOOKcUUkOBk" target="_blank">
        <Image src="/img/as-seen-in/logo-7-news.png" alt="7 News" width="855" height="256" className="w-32" />
      </a>

      <a
        href="https://www.afr.com/companies/media-and-marketing/ad-experts-launch-cultural-guide-exceptional-alien-20210928-p58vdd"
        target="_blank"
      >
        <Image src="/img/as-seen-in/logo-fin-review.png" alt="Financial Review" width="2333" height="256"
               className="w-42 md:w-48 px-5 md:px-0" />
      </a>
    </>
  );
}