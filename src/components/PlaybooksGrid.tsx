import { SliceZone, Content } from "@prismicio/client";
import PlaybookThumb from "@/components/PlaybookThumb";

export default function PlaybooksGrid({
  heading,
  list,
  classes,
}: {
  heading: string;
  list: SliceZone<Content.PlaybookSlice>;
  classes?: string;
}) {
  return (
    <section className={classes}>
      <h3 className="font-bold text-2xl md:text-4xl mb-2 md:mb-3">{heading}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-6 gap-y-6 md:gap-y-9">
        {list.map((item, i) => (
          <PlaybookThumb key={i} playbook={item.primary.playbook as unknown as Content.PlaybookDocument} />
        ))}
      </div>
    </section>
  );
}
