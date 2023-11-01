import Place from "@/img/icon-place.svg";

interface DestinationProps {
  name: string;
  classes?: string;
}

export default function Destination(props: DestinationProps) {
  return (
    <div
      className={`absolute top-0 flex h-9 items-center rounded-full bg-black bg-opacity-20 pl-2 pr-3 text-sm uppercase text-white backdrop-blur ${props.classes}`}
    >
      <Place className="mr-1 inline h-5 w-5" />
      <span className="safari-ios-text-hack">{props.name}</span>
    </div>
  );
}
