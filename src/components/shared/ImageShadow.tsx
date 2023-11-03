interface ImageShadowProps {
  visible: boolean;
  includeTop?: boolean;
}

export default function ImageShadow(props: ImageShadowProps) {
  return (
    <div
      className={`absolute top-0 h-full w-full bg-gradient-to-t from-black/50 from-0% ${!props.visible && "hidden"} ${
        props.includeTop ? "via-black/0 via-50% to-black/50 to-100%" : "to-black/0 to-50%"
      }`}
    ></div>
  );
}
