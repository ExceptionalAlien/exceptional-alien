import { Content, GroupField } from "@prismicio/client";
import PlaybookThumb from "@/components/shared/PlaybookThumb";
import Playbook from "@/img/icon-playbook.svg";

type PlaybooksGridProps = {
  heading: string;
  list: GroupField;
  showCreator?: boolean;
  hideLocked?: boolean;
  classes?: string;
};

export default function PlaybooksGrid(props: PlaybooksGridProps) {
  return (
    <section className={props.classes}>
      <h5 className="flex items-center pb-2 text-2xl font-bold md:pb-3 md:text-4xl">
        <Playbook className="mb-1 mr-1 h-5 overflow-visible md:mr-2 md:h-6" />
        {props.heading}
      </h5>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
        {props.list.map((item, i) => {
          if (
            !props.hideLocked ||
            (props.hideLocked && !(item.playbook as unknown as Content.PlaybookDocument).data.locked)
          ) {
            return (
              <PlaybookThumb
                key={i}
                playbook={item.playbook as unknown as Content.PlaybookDocument}
                size="med"
                showCreator={props.showCreator ? true : false}
                showDestination={true}
              />
            );
          }
        })}
      </div>
    </section>
  );
}
