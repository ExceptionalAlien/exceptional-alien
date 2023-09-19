export default function Credit({ text }: { text: string }) {
  return (
    <p
      className={`absolute bg-black text-white text-right backdrop-blur bg-opacity-20 bottom-0 right-0 p-1 pl-2 pr-2 font-mono text-xs ${
        !text && "hidden"
      }`}
    >
      {text}
    </p>
  );
}
