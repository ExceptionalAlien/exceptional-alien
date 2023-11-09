import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

interface HeroProps {
  image: ImageField;
}
export default function Hero(props: HeroProps) {
  return(
    <PrismicNextImage className="w-full" field={props.image} alt="" />
  );
}