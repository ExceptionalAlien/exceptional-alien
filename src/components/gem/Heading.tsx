import TabHeading from "@/components/TabHeading";
import Globe from "@/img/globe.svg";

interface HeadingProps {
  title: string;
  placesID: string;
  address: string;
  category: string;
  www: string;
}

export default function Heading(props: HeadingProps) {
  return (
    <section className="!mt-0">
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
            className="w-[14px] h-[14px] inline-block ml-1 align-[-1px]"
          >
            <path
              fillRule="evenodd"
              d="M12.207 2.232a.75.75 0 00.025 1.06l4.146 3.958H6.375a5.375 5.375 0 000 10.75H9.25a.75.75 0 000-1.5H6.375a3.875 3.875 0 010-7.75h10.003l-4.146 3.957a.75.75 0 001.036 1.085l5.5-5.25a.75.75 0 000-1.085l-5.5-5.25a.75.75 0 00-1.06.025z"
              clipRule="evenodd"
            />
          </svg>
        </a>

        <p className="uppercase">{props.category}</p>
      </TabHeading>
    </section>
  );
}
