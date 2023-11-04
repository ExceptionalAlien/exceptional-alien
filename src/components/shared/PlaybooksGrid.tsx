import { Content, GroupField } from "@prismicio/client";
import PlaybookThumb from "@/components/shared/PlaybookThumb";
import Playbook from "@/img/icon-playbook.svg";

interface PlaybooksGridProps {
  heading: string;
  list: GroupField;
  classes?: string;
}

export default function PlaybooksGrid(props: PlaybooksGridProps) {
  return (
    <section className={props.classes}>
      <h4 className="flex items-center pb-2 text-2xl font-bold md:pb-3 md:text-4xl">
        <Playbook className="mb-1 mr-1 h-5 overflow-visible md:mr-2 md:h-6" />
        {props.heading}
      </h4>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {props.list.map((item, i) => (
          <PlaybookThumb
            key={i}
            playbook={item.playbook as Content.PlaybookDocument}
            size="med"
            showDestination={true}
          />
        ))}
      </div>
    </section>
  );
}
