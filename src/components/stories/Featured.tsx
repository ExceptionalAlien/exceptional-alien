import { GroupField, Content } from "@prismicio/client";
import Slider from "@/components/shared/Slider";
import StoryThumb from "@/components/shared/StoryThumb";

export default function Featured({ stories }: { stories: GroupField }) {
  return (
    <section className="!pl-0 !pr-0">
      <h3 className="ml-4 md:ml-6">Featured Stories</h3>

      <Slider>
        {stories.map((item, i) => (
          <StoryThumb key={i} story={item.story as Content.StoryDocument} size="featured" />
        ))}
      </Slider>
    </section>
  );
}
