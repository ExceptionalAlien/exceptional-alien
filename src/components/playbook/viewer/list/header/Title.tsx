import Creator from "./title/Creator";

export default function Title({ data }: { data: any }) {
  return (
    <div className="absolute h-[72px] md:h-20 bottom-0 drop-shadow flex justify-between items-center w-full">
      <h2 className="w-3/5 !leading-tight font-bold pl-3 md:pl-4 text-xl md:text-2xl">{data.title.substring(0, 50)}</h2>
      <Creator data={data.creator} />
    </div>
  );
}