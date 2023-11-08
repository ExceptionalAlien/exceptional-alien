import Hero from "@/components/story/header/Hero";
import Overview from "@/components/story/header/Overview";
import { Content } from "@prismicio/client";

interface ShareProps {
  data: Content.StoryDocumentData;
}

export default function Share(props: ShareProps) {
  return(
    <div>
      <p>Explore Playbook</p>
      <a></a>
      <p>Share</p>
      <a></a>
      <a></a>
      <a></a>
      <a></a>
    </div>
  );
}