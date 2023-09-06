export default function Module(props: { children: any; classes?: string }) {
  return (
    <section
      className={`overflow-hidden relative text-sm leading-tight p-[6px] pt-1 pb-0 border border-b-0 border-black h-9 ${props.classes}`}
    >
      {props.children}
    </section>
  );
}
