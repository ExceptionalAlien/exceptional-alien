import { GroupField, Content } from "@prismicio/client";
import Slider from "@/components/shared/Slider";
import CreatorThumb from "@/components/shared/CreatorThumb";

type FeaturedProps = {
  creators: GroupField;
};

export default function Featured(props: FeaturedProps) {
  return (
    <section className="!mt-0 !pl-0 !pr-0">
      <h3 className="p-4 !pt-0 pb-2 text-2xl font-bold md:p-6 md:pb-3 md:text-4xl">Featured Contributors</h3>

      <Slider>
        {props.creators.map((item, i) => (
          <CreatorThumb key={i} creator={item.creator as unknown as Content.CreatorDocument} size="lrg" />
        ))}
      </Slider>
    </section>
  );
}
