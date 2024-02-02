import TabHeading from "@/components/shared/TabHeading";

type ThumbTabProps = {
  title: string;
  location: string;
  classes?: string;
};

export default function ThumbTab(props: ThumbTabProps) {
  return (
    <TabHeading classes={`mt-1 md:mt-2 group-hover/link:text-ex-blue group-hover/link:border-ex-blue ${props.classes}`}>
      <p>{props.title}</p>

      {props.location && (
        <p className="uppercase">
          {"\u2794"} {props.location}
        </p>
      )}
    </TabHeading>
  );
}
