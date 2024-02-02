import Place from "@/img/icon-place.svg";

type DestinationProps = {
  name: string;
  classes?: string;
};

export default function Destination(props: DestinationProps) {
  return (
    <div
      className={`absolute top-0 flex h-9 items-center rounded-full bg-black bg-opacity-20 pl-3 pr-3 text-sm uppercase text-white backdrop-blur ${props.classes}`}
    >
      <Place className="mr-[6px] inline h-5 overflow-visible" />
      <span className="safari-ios-text-hack">{props.name}</span>
    </div>
  );
}
