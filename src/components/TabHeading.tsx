export default function Module(props: { children: any; classes?: string }) {
  return (
    <section className={`relative text-sm leading-tight p-2 pb-0 border border-b-0 border-black h-10 ${props.classes}`}>
      {props.children}
    </section>
  );
}
