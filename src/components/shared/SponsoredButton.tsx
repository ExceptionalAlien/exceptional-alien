import { sendGTMEvent } from '@next/third-parties/google';
import Link from "next/link";
import ExitIcon from "@/img/icon-exit.svg";

export type SponsoredButtonProps = {
  link: string,
  title: string,
  source: string,
  campaign: string,
  displayAsLink?: boolean,
  classes?: string
}

export default function SponsoredButton(props: SponsoredButtonProps) {
  let dispatched = false; /* prevents from firing multiple events while clicking */

  const clickOut = (e: React.MouseEvent) => {
    e.preventDefault();
    let elem = e.target as any;
    let text = elem.innerHTML;
    if (!dispatched) {
      dispatched = true;
      elem.innerHTML += '...';
      sendGTMEvent({
        event: 'sponsored_click',
        campaign: props.campaign,
        type: 'playbook',
        source: props.source,
      });
      setTimeout(() => { /* for extra control */
        elem.innerHTML = text;
        window.open(elem.dataset.link, '_blank');
        dispatched = false;
      }, 100);
    }
  }

  return (
    <>
      {!props.displayAsLink &&
        <button className={`inline-block py-1.5 px-7 w-full bg-ex-blue text-white border border-ex-blue text-center rounded-full transition-[background-color,color] duration-300 hover:bg-white hover:text-ex-blue whitespace-nowrap ${props?.classes}`}
                tabIndex={0} role="link" data-link={props.link as string} rel="sponsored" onClick={clickOut}>{props.title}
        </button>}
      {props.displayAsLink &&
        <Link className={`inline-block transition-[background-color,color,opacity] duration-300 hover:opacity-70 whitespace-nowrap ${props?.classes}`}
              href="#" tabIndex={0} role="link" data-link={props.link as string} rel="sponsored" onClick={clickOut}>
          <span className="[&>svg]:w-4 [&>svg]:inline [&>svg]:mr-2 [&>svg]:mb-1"><ExitIcon /></span>
          {props.title}
      </Link>}
    </>
  )
}
