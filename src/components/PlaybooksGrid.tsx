import { Content, GroupField } from "@prismicio/client";
import PlaybookThumb from "@/components/PlaybookThumb";
import Playbook from "@/img/icon-playbook.svg";

export default function PlaybooksGrid({
  heading,
  list,
  classes,
}: {
  heading: string;
  list: GroupField;
  classes?: string;
}) {
  return (
    <section className={classes}>
      <h3 className="font-bold text-2xl md:text-4xl mb-2 md:mb-3">
        <Playbook className="h-5 md:h-7 inline mr-2 align-[-1px]" />
        {heading}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-6 gap-y-6 md:gap-y-9">
        {list.map((item, i) => (
          <PlaybookThumb key={i} playbook={item.playbook as Content.PlaybookDocument} />
        ))}
      </div>
    </section>
  );
}
