import { sendGTMEvent } from '@next/third-parties/google';
import Link from "next/link";

export type SponsoredButtonProps = {
  link: string,
  title: string,
  source: string,
  campaign: string,
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
    <button className="inline-block py-1.5 px-7 w-full bg-ex-blue text-white border border-ex-blue text-center rounded-full transition-[background-color,color] duration-300 hover:bg-white hover:text-ex-blue whitespace-nowrap"
            tabIndex={0} role="link" data-link={props.link as string} rel="sponsored" onClick={clickOut}>{props.title}
    </button>
  )
}
