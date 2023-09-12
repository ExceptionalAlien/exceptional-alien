export default function Module({ children, classes }: { children: any; classes?: string }) {
  return (
    <section
      className={`relative text-sm leading-tight p-2 pt-[6px] pb-0 border border-b-0 border-black min-h-[38px] ${classes}`}
    >
      {children}
    </section>
  );
}
