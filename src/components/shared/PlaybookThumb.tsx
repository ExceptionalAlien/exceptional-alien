import Link from "next/link";
import Image from "next/image";
import { Content, asText } from "@prismicio/client";
import Destination from "./Destination";
import ThumbTab from "./ThumbTab";
import CreatorIcon from "./CreatorIcon";
import { shimmer, toBase64 } from "@/utils/shimmer";

export default function PlaybookThumb({
  playbook,
  size,
  classes,
}: {
  playbook: Content.PlaybookDocument;
  size?: string;
  classes?: string;
}) {
  return (
    <Link
      href={"/playbooks/" + playbook.uid}
      className={`relative group/link ${size === "featured" && "w-11/12 lg:w-5/12 max-w-xl"} ${classes}`}
    >
      {/* Image */}
      {playbook.data.image.thumb.url && (
        <div className="group-hover/link:bg-ex-blue relative">
          <Image
            src={playbook.data.image.thumb.url}
            alt={
              playbook.data.image.thumb.alt
                ? (playbook.data.image.thumb.alt as string)
                : (playbook.data.title as string)
            }
            width={playbook.data.image.thumb.dimensions.width}
            height={playbook.data.image.thumb.dimensions.height}
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(playbook.data.image.thumb.dimensions.width, playbook.data.image.thumb.dimensions.height)
            )}`}
            className="group-hover/link:grayscale group-hover/link:mix-blend-lighten"
          />

          {/* Layered shadow */}
          <div className="bg-gradient-to-t from-black/50 from-0% to-black/0 to-40% absolute w-full h-full top-0"></div>

          {(size === "featured" || size === "grid") && (
            <Destination
              name={(playbook.data.destination as unknown as Content.DestinationDocument).data.title as string}
            />
          )}

          {size === "featured" && (
            <CreatorIcon
              firstName={(playbook.data.creator as unknown as Content.CreatorDocument).data.first_name as string}
              lastName={(playbook.data.creator as unknown as Content.CreatorDocument).data.last_name as string}
              image={(playbook.data.creator as unknown as Content.CreatorDocument).data.profile_image}
              classes="absolute bottom-0 w-2/5 md:w-1/3 right-0"
            />
          )}

          {/* Title */}
          <p
            className={`absolute text-white bottom-0 font-bold ${size === "featured" && "pr-0 w-3/5 md:w-2/3"} ${
              size === "featured" || size === "grid"
                ? "text-xl md:text-3xl p-3 md:p-4"
                : "text-base md:text-2xl p-2 md:p-3"
            }`}
          >
            {playbook.data.title}
          </p>
        </div>
      )}

      {/* Description */}
      {size === "featured" && <p className="mt-2">{asText(playbook.data.description)?.substring(0, 160)}</p>}

      {size !== "featured" && size !== "grid" && (
        <ThumbTab
          title={`${(playbook.data.creator as unknown as Content.CreatorDocument).data.first_name} ${(
            playbook.data.creator as unknown as Content.CreatorDocument
          ).data.last_name?.toUpperCase()}`}
          location={(playbook.data.destination as unknown as Content.DestinationDocument).data.title as string}
          classes="mt-2 md:mt-3"
        />
      )}
    </Link>
  );
}