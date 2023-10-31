export default function TabHeading({ children, classes }: { children: any; classes?: string }) {
  return (
    <div className={`min-h-[46px] border border-b-0 border-black p-2 pb-0 pt-1 text-sm ${classes}`}>{children}</div>
  );
}
