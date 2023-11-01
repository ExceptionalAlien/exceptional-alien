interface TabHeadingProps {
  children: any;
  classes?: string;
}

export default function TabHeading(props: TabHeadingProps) {
  return (
    <div className={`min-h-[50px] border border-b-0 border-black p-2 pb-0 text-sm ${props.classes}`}>
      {props.children}
    </div>
  );
}
