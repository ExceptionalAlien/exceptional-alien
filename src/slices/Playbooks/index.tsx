import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Slider from "@/components/shared/Slider";
import PlaybookThumb from "@/components/shared/PlaybookThumb";
import GemThumb from "@/components/shared/GemThumb";

/**
 * Props for `Playbooks`.
 */
export type PlaybooksProps = SliceComponentProps<Content.PlaybooksSlice>;

/**
 * Component for "Playbooks" Slices.
 */
const Playbooks = ({ slice }: PlaybooksProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="!pl-0 !pr-0">
      <h3 className="ml-4 md:ml-6">{slice.primary.title}</h3>

      <Slider>
        {slice.items.length > 1
          ? /* Playbooks list */
            slice.items.map((item, i) => (
              <PlaybookThumb
                key={i}
                playbook={item.playbook as unknown as Content.PlaybookDocument}
                size={slice.primary.size ? "featured" : "destination"}
              />
            ))
          : /* Single playbook */
            (slice.items[0].playbook as unknown as Content.PlaybookDocument).data.slices.map((item, i) => (
              <GemThumb
                key={i}
                gem={item.primary.gem as unknown as Content.GemDocument}
                size="featured"
                creator={
                  (slice.items[0].playbook as unknown as Content.PlaybookDocument).data
                    .creator as unknown as Content.CreatorDocument
                }
              />
            ))}
      </Slider>
    </section>
  );
};

export default Playbooks;
