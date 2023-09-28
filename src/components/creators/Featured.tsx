import { GroupField, Content } from "@prismicio/client";
import Slider from "@/components/Slider";
import CreatorThumb from "@/components/CreatorThumb";

export default function Featured({ featured }: { featured: GroupField }) {
  return (
    <section className="!pl-0 !pr-0">
      <h3 className="ml-4 md:ml-6">Featured Creators</h3>

      <Slider>
        {featured.map((item, i) => (
          <CreatorThumb key={i} creator={item.creator as Content.CreatorDocument} size="mobile" />
        ))}
      </Slider>
    </section>
  );
}
