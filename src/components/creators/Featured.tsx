import { GroupField } from "@prismicio/client";
import Slider from "@/components/Slider";
import CreatorThumb, { DataProps } from "@/components/CreatorThumb";

// Needed to resolve Prismic missing type for fetchLinks data
interface FetchLinks {
  data: DataProps;
}

export default function Featured(props: { featured: GroupField }) {
  return (
    <section className="!pl-0 !pr-0">
      <h3 className="ml-4 md:ml-6">Featured Creators</h3>

      <Slider>
        {props.featured.map((item, i) => (
          <CreatorThumb key={i} data={(item.creator as FetchLinks).data} size="mobile" />
        ))}
      </Slider>
    </section>
  );
}