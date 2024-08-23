import Link from "next/link";

type ShowMoreButtonProps = {
  text: string;
  route: string;
  classes?: string;
};

export default function ShowMoreButton(props: ShowMoreButtonProps) {
  return (
    <Link
      href={props.route}
      className={`tab-button relative block border border-black px-2.5 py-2 text-sm transition-[border-color,color] duration-300 ease-in-out hover:border-ex-blue hover:text-ex-blue ${props.classes}`}
    >
      <span className="mr-5">{props.text}</span>
      <span className="absolute top-[0.255rem] right-[0.755rem] text-lg">&#x2b;</span>
    </Link>
  );
}
