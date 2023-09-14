import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Title from "./header/Title";
import { shimmer, toBase64 } from "@/utils/shimmer";

export default function Header({ data }: { data: any }) {
  const [top, setTop] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth >= 768 ? false : true;
      const orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
      const offset = !mobile || orientation === "landscape" ? 80 : 72;
      const top = orientation === "landscape" ? 80 : mobile ? 304 : 336;

      // Set top position for sticky header
      setTop(offset - ref.current!.clientHeight + top);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`sticky bg-black`} style={{ top: top }} ref={ref}>
      <Image
        src={data.image.url}
        alt={data.image.alt}
        width={data.image.dimensions.width}
        height={data.image.dimensions.height}
        placeholder={`data:image/svg+xml;base64,${toBase64(
          shimmer(data.image.dimensions.width, data.image.dimensions.height)
        )}`}
        className="w-full opacity-90"
      />

      <Title data={data} />
    </div>
  );
}
