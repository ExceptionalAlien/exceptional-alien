import Link from "next/link";
import Image from "next/image";
import { Content } from "@prismicio/client";
import { shimmer, toBase64 } from "@/utils/shimmer";

export default function CreatorThumb({ playbook, classes }: { playbook: Content.PlaybookDocument; classes?: string }) {
  return (
    <Link href={"/playbooks/" + playbook.uid} className={`group/link ${classes}`}>
      {/* Image */}
      {playbook.data.image.thumb.url && (
        <div className="group-hover/link:bg-ex-blue">
          <Image
            src={playbook.data.image.thumb.url}
            alt={playbook.data.image.thumb.alt as string}
            width={playbook.data.image.thumb.dimensions.width}
            height={playbook.data.image.thumb.dimensions.height}
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(playbook.data.image.thumb.dimensions.width, playbook.data.image.thumb.dimensions.height)
            )}`}
            className="group-hover/link:grayscale group-hover/link:mix-blend-lighten"
          />
        </div>
      )}

      {/* Title */}
      <p
        className={`group-hover/link:text-ex-blue transition-[color] duration-300 ease-in-out font-bold text-xl md:text-2xl mt-2`}
      >
        {playbook.data.title}
      </p>
    </Link>
  );
}
