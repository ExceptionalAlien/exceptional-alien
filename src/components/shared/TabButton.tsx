import Link from "next/link";

type TabButtonProps = {
  text: string;
  route: string;
  classes?: string;
};

export default function TabButton(props: TabButtonProps) {
  return (
    <Link
      href={props.route}
      className={`tab-button relative block border border-b-0 border-black p-2 pb-0 pt-1 text-sm transition-[border-color,color] duration-300 ease-in-out hover:border-ex-blue hover:text-ex-blue ${props.classes}`}
    >
      {props.text}
      <p className="absolute right-2 top-0 text-lg">{"\u2794"}</p>
    </Link>
  );
}
