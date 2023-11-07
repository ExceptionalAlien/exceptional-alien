interface ImageShadowProps {
  size?: string; // full, top, bottom
}

export default function ImageShadow(props: ImageShadowProps) {
  return (
    <div
      className={`absolute top-0 h-full w-full ${
        props.size === "full"
          ? "bg-gradient-to-t from-black/50 from-0% via-black/0 via-50% to-black/50 to-100%"
          : props.size === "top"
          ? "bg-gradient-to-b from-black/50 from-0% to-black/0 to-50%"
          : "bg-gradient-to-t from-black/50 from-0% to-black/0 to-50%"
      }`}
    ></div>
  );
}
