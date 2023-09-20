import BG from "@/img/icon-gem-bg.svg";
import Border from "@/img/icon-gem-border.svg";
import Food from "@/img/icon-gem-food.svg";
import Nature from "@/img/icon-gem-nature.svg";
import Accomm from "@/img/icon-gem-accommodation.svg";
import Culture from "@/img/icon-gem-culture.svg";
import Events from "@/img/icon-gem-events.svg";
import Retail from "@/img/icon-gem-retail.svg";
import Wellness from "@/img/icon-gem-wellness.svg";
import Neighbourhoods from "@/img/icon-gem-neighbourhoods.svg";

export default function GemIcon({ category, classes }: { category: string; classes?: string }) {
  return (
    <div className={`absolute [&>svg]:absolute [&>svg]:fill-ex-blue ${classes}`}>
      <BG className="!fill-white" />
      <Border />
      {category === "Food & Drink" && <Food />}
      {category === "Nature" && <Nature />}
      {category === "Accomm" && <Accomm />}
      {category === "Culture" && <Culture />}
      {category === "Events" && <Events />}
      {category === "Retail" && <Retail />}
      {category === "Wellness" && <Wellness />}
      {category === "Neighbourhoods" && <Neighbourhoods />}
    </div>
  );
}
