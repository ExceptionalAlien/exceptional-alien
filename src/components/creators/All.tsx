import { GroupField } from "@prismicio/client";
import CreatorThumb, { DataProps } from "@/components/CreatorThumb";

// Needed to reslove Prismic missing type for data
interface FetchLinks {
  data: DataProps;
}

export default function All(props: { featured: GroupField }) {
  return (
    <section>
      <h3>All Creators</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 md:gap-x-6 gap-y-6 md:gap-y-9">
        {props.featured.map((item, i) => (
          <CreatorThumb key={i} data={(item.creator as FetchLinks).data} />
        ))}
      </div>
    </section>
  );
}
