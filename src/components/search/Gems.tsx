import { Content } from "@prismicio/client";
import Slider from "@/components/shared/Slider";
import GemThumb from "../shared/GemThumb";
import Gem from "@/img/icon-gem.svg";

interface GemsProps {
  results: Content.GemDocument<string>[];
}

export default function Gems(props: GemsProps) {
  return (
    <section className="!pl-0 !pr-0">
      <h3 className="flex items-center p-4 !pt-0 pb-2 text-2xl font-bold text-ex-blue md:p-6 md:pb-3 md:text-4xl">
        <Gem className="mb-1 mr-1 h-5 overflow-visible md:mr-2 md:h-6" />
        Gems<span className="ml-1 text-base md:ml-2 md:text-xl">({props.results.slice(0, 20).length})</span>
      </h3>

      <Slider minItems={4}>
        {props.results.slice(0, 20).map((item, i) => (
          <GemThumb key={i} gem={item} size="med" />
        ))}
      </Slider>
    </section>
  );
}
