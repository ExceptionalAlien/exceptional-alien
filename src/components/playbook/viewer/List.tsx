import Header from "./list/Header";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";

export default function List({ data }: { data: any }) {
  return (
    <div className="w-1/2 xl:w-[640px] portrait:w-full portrait:mt-64">
      <Header data={data} />
      <SliceZone slices={data.slices} components={components} />
    </div>
  );
}
