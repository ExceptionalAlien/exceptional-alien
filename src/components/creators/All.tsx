import { PrismicDocument } from "@prismicio/client";
import CreatorThumb, { DataProps } from "../CreatorThumb";

export default function All(props: { creators: PrismicDocument[] }) {
  return (
    <section>
      <h3>All Creators</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 md:gap-x-6 gap-y-6 md:gap-y-9">
        {props.creators.map((item, i) => (
          <CreatorThumb key={i} data={item.data as DataProps} uid={item.uid as string} />
        ))}
      </div>
    </section>
  );
}