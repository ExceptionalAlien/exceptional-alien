import { Content } from "@prismicio/client";
import CreatorIcon from "@/components/shared/CreatorIcon";
import CreatorThumb from "@/components/shared/CreatorThumb";

interface OverviewProps {
  data: Content.StoryDocumentData;
}
export default function Overview(props: OverviewProps) {
  return(
    <div className="relative m-auto md:max-w-3xl md:text-4xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl [&>p]:mt-4 [&>p]:md:mt-6">
      <h2 className="text-2xl text-center font-bold text-black">{ props.data.title }</h2>
      <div className="bg-ex-blue p-5">
        <CreatorIcon
          firstName={(props.data.creator as unknown as Content.CreatorDocument).data.first_name as string}
          lastName={(props.data.creator as unknown as Content.CreatorDocument).data.last_name as string}
          image={(props.data.creator as unknown as Content.CreatorDocument).data.profile_image}
        />
      </div>
    </div>
  );
}