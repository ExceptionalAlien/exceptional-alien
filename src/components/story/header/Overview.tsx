import { Content } from "@prismicio/client";
import CreatorIcon from "@/components/shared/CreatorIcon";
import CreatorThumb from "@/components/shared/CreatorThumb";

interface OverviewProps {
  data: Content.StoryDocumentData;
}
export default function Overview(props: OverviewProps) {
  return(
    <div>
      <h2>{ props.data.title }</h2>
      <div>
        <CreatorIcon
          firstName={(props.data.creator as unknown as Content.CreatorDocument).data.first_name as string}
          lastName={(props.data.creator as unknown as Content.CreatorDocument).data.last_name as string}
          image={(props.data.creator as unknown as Content.CreatorDocument).data.profile_image}
        />
      </div>
    </div>
  );
}