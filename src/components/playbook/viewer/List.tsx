import Header from "./list/Header";

export default function List({ data }: { data: any }) {
  return (
    <div className="w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4 portrait:w-full portrait:mt-64">
      <Header data={data} />

      <div className="m-4 md:m-4 h-48 border-2 border-black p-2">
        <p>Gem</p>
      </div>
      <div className="m-4 md:m-4 h-48 border-2 border-black p-2">
        <p>Gem</p>
      </div>
      <div className="m-4 md:m-4 h-48 border-2 border-black p-2">
        <p>Gem</p>
      </div>
      <div className="m-4 md:m-4 h-48 border-2 border-black p-2">
        <p>Gem</p>
      </div>
      <div className="m-4 md:m-4 h-48 border-2 border-black p-2">
        <p>Gem</p>
      </div>
    </div>
  );
}
