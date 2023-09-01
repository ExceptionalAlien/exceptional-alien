import { KeyTextField, LinkField, asLink } from "@prismicio/client";
import TabHeading from "@/components/TabHeading";
import Socials from "./heading/Socials";

interface HeadingProps {
  title: KeyTextField;
  homeCity: KeyTextField;
  currentCity: KeyTextField;
  ig: KeyTextField;
  other: LinkField;
  www: LinkField;
}

export default function Heading(props: HeadingProps) {
  return (
    <section>
      <TabHeading>
        <Socials ig={props.ig as string} other={asLink(props.other) as string} www={asLink(props.www) as string} />
        <h3>{props.title}</h3>

        <p>
          {props.homeCity && `${props.homeCity} ${"\u2794"} `}
          {props.currentCity}
        </p>
      </TabHeading>
    </section>
  );
}
