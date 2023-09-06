export default function Slider(props: { children: any; classes?: string }) {
  return (
    <div
      className={`slider relative flex overflow-x-scroll scrolling-touch no-scrollbar snap-x snap-mandatory pr-4 md:pr-6 [&>a]:flex-none [&>a]:snap-start [&>a]:snap-always [&>a]:pl-4 [&>a]:md:pl-6 ${props.classes}`}
    >
      {props.children}
    </div>
  );
}
