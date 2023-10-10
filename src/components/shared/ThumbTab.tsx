import TabHeading from "@/components/shared/TabHeading";

export default function Tab({ title, location, classes }: { title: string; location: string; classes?: string }) {
  return (
    <TabHeading
      classes={`mt-1 group-hover/link:text-ex-blue group-hover/link:border-ex-blue duration-300 ease-in-out transition-[color,border-color] ${classes}`}
    >
      <p>{title}</p>
      <p className="uppercase">{location}</p>
    </TabHeading>
  );
}
