import { GroupField, Content } from "@prismicio/client";
import Slider from "@/components/shared/Slider";
import CreatorThumb from "@/components/shared/CreatorThumb";

export default function Featured({ creators }: { creators: GroupField }) {
  return (
    <section className="!pl-0 !pr-0">
      <h3 className="ml-4 md:ml-6">Featured Creators</h3>

      <Slider>
        {creators.map((item, i) => (
          <CreatorThumb key={i} creator={item.creator as Content.CreatorDocument} size="featured" />
        ))}
      </Slider>
    </section>
  );
}
