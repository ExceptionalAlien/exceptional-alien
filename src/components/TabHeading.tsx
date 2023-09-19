export default function TabHeading({ children, classes }: { children: any; classes?: string }) {
  return (
    <section className={`relative text-sm p-2 pt-1 pb-0 border border-b-0 border-black min-h-[40px] ${classes}`}>
      {children}
    </section>
  );
}
