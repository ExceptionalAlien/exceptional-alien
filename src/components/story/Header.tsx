import { Content, ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import CreatorIcon from "@/components/shared/CreatorIcon";

interface HeaderProps {
  image: ImageField;
  title: string;
  creator: Content.CreatorDocument;
}

export default function Header(props: HeaderProps) {
  return(
    <section>
      <PrismicNextImage field={props.image} alt={ "" }/>
      <h2>{props.title}</h2>
      <div className="bg-ex-blue">
        <p>Gem in this story</p>
        <CreatorIcon
          firstName={ (props.creator as any).data.first_name}
          lastName={ (props.creator as any).last_name }
          image={(props.creator as any).data.profile_image}
        />
      </div>
    </section>
  )
}