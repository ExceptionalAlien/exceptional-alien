import Link from "next/link";

export default function TabButton({ text, route, classes }: { text: string; route: string; classes?: string }) {
  return (
    <Link
      href={route}
      className={`relative block text-sm p-2 pt-1 pb-0 border border-b-0 border-black hover:border-ex-blue hover:text-ex-blue transition-[border-color,color] duration-300 ease-in-out ${classes}`}
    >
      {text}
      <p className="absolute right-2 top-0 text-lg">{"\u2794"}</p>
    </Link>
  );
}
