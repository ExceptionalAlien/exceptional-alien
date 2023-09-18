import BG from "@/img/icon-gem-bg.svg";
import Food from "@/img/icon-gem-food.svg";
import Nature from "@/img/icon-gem-nature.svg";

export default function GemIcon({ category, classes }: { category: string; classes?: string }) {
  return (
    <div className={`relative [&>svg]:absolute ${classes}`}>
      <BG />
      {category === "Food & Drink" && <Food />}
      {category === "Nature" && <Nature />}
    </div>
  );
}
