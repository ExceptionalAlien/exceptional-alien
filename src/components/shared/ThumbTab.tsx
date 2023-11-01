import TabHeading from "@/components/shared/TabHeading";

interface ThumbTabProps {
  title: string;
  location: string;
  classes?: string;
}

export default function ThumbTab(props: ThumbTabProps) {
  return (
    <TabHeading
      classes={`mt-2 md:mt-3 group-hover/link:text-ex-blue group-hover/link:border-ex-blue duration-300 ease-in-out transition-[color,border-color] ${props.classes}`}
    >
      <p>{props.title}</p>
      <p className="uppercase">{props.location}</p>
    </TabHeading>
  );
}
