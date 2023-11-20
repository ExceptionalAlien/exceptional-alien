import Link from "next/link";
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
  const more = (slice.primary.more as any).url;

  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="!pl-0 !pr-0">
      <div className="flex items-end justify-between p-4 !pt-0 pb-2 md:p-6 md:pb-3">
        <h3 className="w-4/5 text-2xl font-bold md:text-4xl">{slice.primary.title}</h3>

        {more && (
          <Link
            href={more as string}
            className="whitespace-nowrap text-ex-grey transition-[color] duration-300 ease-in-out hover:text-ex-blue md:text-lg"
          >
            More {"\u2794"}
          </Link>
        )}
      </div>

      <Slider>
        {slice.items.length > 1
          ? /* Playbooks */
            slice.items.map((item, i) => (
              <PlaybookThumb
                key={i}
                playbook={item.playbook as unknown as Content.PlaybookDocument}
                size={slice.primary.size ? "xlg" : "lrg"}
                showDestination={slice.primary.size ? true : false}
                showCreator={true}
                showDescription={slice.primary.size ? true : false}
              />
            ))
          : /* Gems */
            (slice.items[0].playbook as unknown as Content.PlaybookDocument).data.slices.map((item, i) => (
              <GemThumb
                key={i}
                gem={item.primary.gem as unknown as Content.GemDocument}
                size="med"
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
