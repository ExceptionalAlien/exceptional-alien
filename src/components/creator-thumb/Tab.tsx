import TabHeading from "@/components/TabHeading";

interface TabProps {
  title: string;
  homeCity: string;
  currentCity: string;
  firstName: string;
  lastName: string;
  homeCountry: string;
}

export default function Tab(props: TabProps) {
  return (
    <TabHeading classes="mt-1 group-hover/link:text-ex-blue group-hover/link:border-ex-blue duration-300 ease-in-out">
      {/* Job title */}
      <p>{props.title}</p>

      {/* Location */}
      <p className="uppercase">{props.currentCity}</p>
    </TabHeading>
  );
}
