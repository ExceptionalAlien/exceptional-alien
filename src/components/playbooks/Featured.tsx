import { GroupField, Content } from "@prismicio/client";
import Slider from "@/components/shared/Slider";
import PlaybookThumb from "@/components/shared/PlaybookThumb";

interface FeaturedProps {
  playbooks: GroupField;
}

export default function Featured(props: FeaturedProps) {
  return (
    <section className="!pl-0 !pr-0">
      <h3 className="p-4 !pt-0 pb-2 text-2xl font-bold md:p-6 md:pb-3 md:text-4xl">Featured Travel Playbooks</h3>

      <Slider>
        {props.playbooks.map((item, i) => (
          <PlaybookThumb
            key={i}
            playbook={item.playbook as Content.PlaybookDocument}
            size="xlg"
            showCreator={true}
            showDestination={true}
            showDescription={true}
          />
        ))}
      </Slider>
    </section>
  );
}
