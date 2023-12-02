import { Content } from "@prismicio/client";
import Slider from "@/components/shared/Slider";
import CreatorThumb from "@/components/shared/CreatorThumb";
import Person from "@/img/icon-person.svg";

interface CreatorsProps {
  results: Content.CreatorDocument<string>[];
}

export default function Creators(props: CreatorsProps) {
  return (
    <section className="!pl-0 !pr-0">
      <h3 className="flex items-center p-4 !pt-0 pb-2 text-2xl font-bold text-ex-blue md:p-6 md:pb-3 md:text-4xl">
        <Person className="mb-1 mr-1 h-5 overflow-visible md:mr-2 md:h-6" />
        Contributors<span className="ml-1 text-base md:ml-2 md:text-xl">({props.results.slice(0, 20).length})</span>
      </h3>

      <Slider>
        {props.results.slice(0, 20).map((item, i) => (
          <CreatorThumb key={i} creator={item} size="lrg" />
        ))}
      </Slider>
    </section>
  );
}
