import { GroupField, Content } from "@prismicio/client";
import Slider from "@/components/shared/Slider";
import PlaybookThumb from "@/components/shared/PlaybookThumb";

export default function Featured({ playbooks }: { playbooks: GroupField }) {
  return (
    <section className="!pl-0 !pr-0">
      <h3 className="ml-4 md:ml-6">Travel Playbooks</h3>

      <Slider itemCount={playbooks.length}>
        {playbooks.map((item, i) => (
          <PlaybookThumb key={i} playbook={item.playbook as Content.PlaybookDocument} size="destination" />
        ))}
      </Slider>
    </section>
  );
}
