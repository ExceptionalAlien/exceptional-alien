import { Content } from "@prismicio/client";
import Playbook from "@/img/icon-playbook.svg";
import Linkedin from "@/img/social-li.svg";
import Facebook from "@/img/social-fb.svg";

interface ShareProps {
  data: Content.StoryDocumentData;
}

export default function Share(props: ShareProps) {
  const playbookUrl = `https://exceptionalalien.com/travel-playbooks/${ (props.data.playbook as unknown as Content.PlaybookDocument).uid }`;

  return(
    <div className="min-h-screen flex items-center justify-center">
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2">
        <p className="block">Explore</p>
        <p className="block">Playbook</p>
        <a href={ playbookUrl } target={"_blank"}>
          <Playbook className="mb-1 mr-1 h-5 overflow-visible md:mr-2 md:h-6" />
        </a>
        <p className="block">Share</p>
        <a href={ `https://www.linkedin.com/shareArticle?mini=true&url=${ playbookUrl }` } target={"_blank"}>
          <Linkedin className="mb-1 mr-1 h-5 overflow-visible md:mr-2 md:h-6" />
        </a>
        <a href={ `https://www.facebook.com/sharer/sharer.php?u=${ playbookUrl }` } target={"_blank"}>
          <Facebook className="mb-1 mr-1 h-5 overflow-visible md:mr-2 md:h-6" />
        </a>
      </div>
    </div>
  );
}