import TabHeading from "@/components/TabHeading";

export default function Tab({ title, currentCity }: { title: string; currentCity: string }) {
  return (
    <TabHeading classes="mt-1 group-hover/link:text-ex-blue group-hover/link:border-ex-blue duration-300 ease-in-out">
      {/* Job title */}
      <p>{title}</p>

      {/* Location */}
      <p className="uppercase">{currentCity}</p>
    </TabHeading>
  );
}
