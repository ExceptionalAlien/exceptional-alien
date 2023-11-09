import { Content, ImageField } from "@prismicio/client";
import Hero from "@/components/story/header/Hero";
import Overview from "@/components/story/header/Overview";

interface HeaderProps {
  data: Content.StoryDocumentData;
}

export default function Header(props: HeaderProps) {
  return(
    <div className="relative">
      <Hero image={props.data.image} />
      <Overview data={props.data} />
    </div>
  );
}