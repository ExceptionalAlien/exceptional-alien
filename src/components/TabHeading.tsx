export default function Module(props: { children: any; classes?: string }) {
  return (
    <section
      className={`overflow-hidden relative text-sm leading-tight p-2 pt-[6px] pb-0 border border-b-0 border-black h-[38px] ${props.classes}`}
    >
      {props.children}
    </section>
  );
}
