import Creator from "./title/Creator";

export default function Title({ data }: { data: any }) {
  return (
    <div className="absolute h-16 md:h-20 overflow-hidden bottom-0 flex justify-between items-center w-full">
      <h2 className="w-3/5 font-bold pl-3 md:pl-4 max-[320px]:text-lg text-xl md:text-2xl">
        {data.title.substring(0, 50)}
      </h2>

      <Creator data={data.creator} />
    </div>
  );
}
