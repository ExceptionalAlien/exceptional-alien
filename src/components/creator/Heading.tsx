import TabHeading from "@/components/TabHeading";
import Socials from "./heading/Socials";

interface HeadingProps {
  title: string;
  homeCity: string;
  currentCity: string;
  ig: string;
  other: string;
  www: string;
}

export default function Heading(props: HeadingProps) {
  return (
    <section className="!mt-0">
      <TabHeading>
        <Socials ig={props.ig as string} other={props.other} www={props.www} />
        <h3>{props.title}</h3>

        <p className="uppercase">
          {props.homeCity && `${props.homeCity} ${"\u2794"} `}
          {props.currentCity}
        </p>
      </TabHeading>
    </section>
  );
}
