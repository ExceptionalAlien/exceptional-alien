import Link from "next/link";
import TabHeading from "@/components/TabHeading";
import GemIcon from "../GemIcon";
import Globe from "@/img/globe.svg";

interface HeadingProps {
  title: string;
  placesID: string;
  address: string;
  category: string;
  destination: string;
  www: string;
}

export default function Heading(props: HeadingProps) {
  return (
    <section>
      <TabHeading>
        {props.www && (
          <a
            href={props.www}
            target="_blank"
            title="Website"
            className="absolute top-0 right-0 hover:opacity-50 duration-300 ease-in-out transition-opacity [&>svg]:h-6 [&>svg]:box-content [&>svg]:p-2"
          >
            <Globe />
          </a>
        )}

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${props.title}&query_place_id=${props.placesID}`}
          target="_blank"
          className="hover:text-ex-light-grey duration-300 ease-in-out transition-[color] pr-8 block"
        >
          {props.address}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-[14px] inline-block ml-1 align-[-1px]"
          >
            <path
              fillRule="evenodd"
              d="M12.207 2.232a.75.75 0 00.025 1.06l4.146 3.958H6.375a5.375 5.375 0 000 10.75H9.25a.75.75 0 000-1.5H6.375a3.875 3.875 0 010-7.75h10.003l-4.146 3.957a.75.75 0 001.036 1.085l5.5-5.25a.75.75 0 000-1.085l-5.5-5.25a.75.75 0 00-1.06.025z"
              clipRule="evenodd"
            />
          </svg>
        </a>

        <Link
          href={`/destinations/${props.destination}?filter=${props.category.toLowerCase()}`}
          className="hover:opacity-50 duration-300 ease-in-out transition-opacity block"
        >
          <GemIcon category={props.category} hideBg={true} classes="box-content pt-[9px] pl-2" />
          <span className="uppercase pl-5 text-ex-blue">{props.category}</span>
        </Link>
      </TabHeading>
    </section>
  );
}
