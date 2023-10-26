import Place from "@/img/icon-place.svg";

export default function Destination({ name, classes }: { name: string; classes?: string }) {
  return (
    <div
      className={`text-white bg-black uppercase p-2 pl-3 pr-4 h-5 box-content absolute top-3 md:top-4 left-3 md:left-4 backdrop-blur bg-opacity-20 rounded-full text-sm font-bold ${classes}`}
    >
      <Place className="h-full aspect-square mr-1 inline-block align-[-5px]" />
      {name}
    </div>
  );
}
