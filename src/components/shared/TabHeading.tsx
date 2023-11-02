interface TabHeadingProps {
  children: any;
  classes?: string;
}

export default function TabHeading(props: TabHeadingProps) {
  return (
    <div className={`min-h-[48px] border border-b-0 border-black p-2 pb-0 pt-[6px] text-sm ${props.classes}`}>
      {props.children}
    </div>
  );
}
