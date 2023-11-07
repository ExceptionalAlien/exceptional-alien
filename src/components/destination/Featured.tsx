import { GroupField, Content } from "@prismicio/client";
import Slider from "@/components/shared/Slider";
import PlaybookThumb from "@/components/shared/PlaybookThumb";
import Playbook from "@/img/icon-playbook.svg";

interface FeaturedProps {
  playbooks: GroupField;
}

export default function Featured(props: FeaturedProps) {
  return (
    <section className="!pl-0 !pr-0">
      <h4 className="flex items-center p-4 !pt-0 pb-2 text-2xl font-bold md:p-6 md:pb-3 md:text-4xl">
        <Playbook className="mb-1 mr-1 h-5 overflow-visible md:mr-2 md:h-6" />
        Travel Playbooks
      </h4>

      <Slider>
        {props.playbooks.map((item, i) => (
          <PlaybookThumb
            key={i}
            playbook={item.playbook as Content.PlaybookDocument}
            size="xlg"
            showCreator={true}
            showDescription={true}
          />
        ))}
      </Slider>
    </section>
  );
}
