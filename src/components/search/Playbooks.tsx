import { Content } from "@prismicio/client";
import Slider from "@/components/shared/Slider";
import PlaybookThumb from "@/components/shared/PlaybookThumb";
import Playbook from "@/img/icon-playbook.svg";

type PlaybooksProps = {
  results: Content.PlaybookDocument<string>[];
};

export default function Playbooks(props: PlaybooksProps) {
  return (
    <section className="!pl-0 !pr-0">
      <h3 className="flex items-center p-4 !pt-0 pb-2 text-2xl font-bold text-ex-blue md:p-6 md:pb-3 md:text-4xl">
        <Playbook className="mb-1 mr-1 h-5 overflow-visible md:mr-2 md:h-6" />
        Travel Playbooks<span className="ml-1 text-base md:ml-2 md:text-xl">({props.results.slice(0, 20).length})</span>
      </h3>

      <Slider>
        {props.results.slice(0, 20).map((item, i) => (
          <PlaybookThumb key={i} playbook={item} size="lrg" showCreator={true} showDestination={true} />
        ))}
      </Slider>
    </section>
  );
}
