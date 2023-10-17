import Link from "next/link";
import Image from "next/image";
import { Content } from "@prismicio/client";
import { shimmer, toBase64 } from "@/utils/shimmer";

export default function GemThumb({
  gem,
  size,
  classes,
}: {
  gem: Content.GemDocument;
  size?: string;
  classes?: string;
}) {
  return (
    <Link href={"/gems/" + gem.uid} className={`group/link ${classes}`}>
      {/* Image */}
      {gem.data.image && (
        <div className="group-hover/link:bg-ex-blue">
          <Image
            src={gem.data.image.mobile.url as string}
            alt={gem.data.image.mobile.alt ? (gem.data.image.mobile.alt as string) : (gem.data.title as string)}
            width={gem.data.image.mobile.dimensions?.width}
            height={gem.data.image.mobile.dimensions?.height}
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(
                gem.data.image.mobile.dimensions?.width as number,
                gem.data.image.mobile.dimensions?.height as number
              )
            )}`}
            className="group-hover/link:grayscale group-hover/link:mix-blend-lighten"
          />
        </div>
      )}

      {/* Title */}
      <p className="group-hover/link:text-ex-blue transition-[color] duration-300 ease-in-out font-bold mt-2 text-xl">
        {gem.data.title}
      </p>
    </Link>
  );
}
