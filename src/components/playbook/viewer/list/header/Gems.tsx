import Gem from "@/img/icon-gem.svg";

export default function Gems({ count }: { count: number }) {
  return (
    <div className="flex absolute top-3 md:top-4 left-3 md:left-4 bg-black backdrop-blur bg-opacity-20 rounded-full p-2 pl-3 pr-3">
      <Gem className="h-5 w-5" />
      <p className="whitespace-nowrap ml-2 text-sm font-bold">{count} Gems</p>
    </div>
  );
}
