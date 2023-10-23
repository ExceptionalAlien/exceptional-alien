import { useState } from "react";
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
  const [imageLoaded, setImageLoaded] = useState(false);

  const image =
    size && playbook.data.image ? playbook.data.image.mobile : playbook.data.image ? playbook.data.image.thumb : null;

  const imageLoadComplete = () => {
    setImageLoaded(true);
  };

  return (
    <Link
      href={"/travel-playbooks/" + playbook.uid}
      className={`relative group/link max-w-xl ${size === "featured" && "w-11/12 lg:w-5/12"} ${
        size === "destination" && "w-10/12 lg:w-4/12"
      } ${classes}`}
    >
      {/* Image */}
      {image && (
        <div className="group-hover/link:bg-ex-blue relative">
          <Image
            src={image.url as string}
            alt={image.alt ? (image.alt as string) : (playbook.data.title as string)}
            width={image.dimensions?.width}
            height={image.dimensions?.height}
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(image.dimensions?.width as number, image.dimensions?.height as number)
            )}`}
            onLoad={imageLoadComplete}
            className="group-hover/link:grayscale group-hover/link:mix-blend-lighten"
          />

          {/* Layered shadow */}
          <div
            className={`bg-gradient-to-t from-black/50 from-0% absolute w-full h-full top-0 ${
              !imageLoaded && "hidden"
            } ${size ? "via-black/0 via-50% to-black/50 to-100%" : "to-black/0 to-50%"}`}
          ></div>

          {(size === "featured" || size === "grid") && (
            <Destination
              name={(playbook.data.destination as unknown as Content.DestinationDocument).data.title as string}
            />
          )}

          {size && (
            <CreatorIcon
              firstName={(playbook.data.creator as unknown as Content.CreatorDocument).data.first_name as string}
              lastName={(playbook.data.creator as unknown as Content.CreatorDocument).data.last_name as string}
              image={(playbook.data.creator as unknown as Content.CreatorDocument).data.profile_image}
              classes={`absolute right-0 ${size === "featured" ? "w-2/5 md:w-1/3 bottom-0" : "w-1/2 top-0"}`}
            />
          )}

          {/* Title */}
          <p
            className={`absolute text-white bottom-0 font-bold leading-tight ${
              size === "featured" && "!pr-0 w-3/5 md:w-2/3"
            } ${
              size
                ? `${size === "grid" ? "text-2xl" : "text-xl"} md:text-3xl p-3 md:p-4`
                : "text-base md:text-2xl p-2 md:p-3"
            }`}
          >
            {playbook.data.title}
          </p>
        </div>
      )}

      {/* Description */}
      {size === "featured" && <p className="mt-2">{asText(playbook.data.description)?.substring(0, 160)}</p>}

      {!size && (
        <ThumbTab
          title={
            (playbook.data.creator as unknown as Content.CreatorDocument).data.last_name
              ? `${(playbook.data.creator as unknown as Content.CreatorDocument).data.first_name} ${(
                  playbook.data.creator as unknown as Content.CreatorDocument
                ).data.last_name?.toUpperCase()}`
              : ((playbook.data.creator as unknown as Content.CreatorDocument).data.first_name as string)
          }
          location={(playbook.data.destination as unknown as Content.DestinationDocument).data?.title as string}
          classes="mt-2 md:mt-3"
        />
      )}
    </Link>
  );
}
