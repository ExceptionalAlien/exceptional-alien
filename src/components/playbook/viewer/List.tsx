import Header from "./list/Header";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";

export default function List({ data }: { data: any }) {
  return (
    <div className="w-1/2 xl:w-[640px] portrait:w-full portrait:mt-56">
      <Header data={data} />

      <div className="grid grid-cols-1 m-2 md:m-4 gap-y-4 md:gap-y-6">
        <SliceZone slices={data.slices} components={components} />
      </div>
    </div>
  );
}
