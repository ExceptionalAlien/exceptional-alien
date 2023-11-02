import TabHeading from "@/components/shared/TabHeading";

interface ThumbTabProps {
  title: string;
  location: string;
  classes?: string;
}

export default function ThumbTab(props: ThumbTabProps) {
  return (
    <TabHeading classes={`mt-2 md:mt-3 group-hover/link:text-ex-blue group-hover/link:border-ex-blue ${props.classes}`}>
      <p>{props.title}</p>
      <p className="uppercase">
        {"\u2794"} {props.location}
      </p>
    </TabHeading>
  );
}
