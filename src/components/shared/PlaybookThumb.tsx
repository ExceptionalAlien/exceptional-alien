import Link from "next/link";
import Image from "next/image";
import { Content, asText } from "@prismicio/client";
import ImageShadow from "./ImageShadow";
import Destination from "./Destination";
import ThumbTab from "./ThumbTab";
import CreatorIcon from "./CreatorIcon";
import { shimmer, toBase64 } from "@/utils/shimmer";

interface PlaybookThumbProps {
  playbook: Content.PlaybookDocument;
  size?: string; // xlg, lrg, med or sml
  showDestination?: boolean;
  showCreator?: boolean;
  showDescription?: boolean;
  classes?: string;
}

export default function PlaybookThumb(props: PlaybookThumbProps) {
  const image =
    props.playbook.data && props.playbook.data.image
      ? props.size && props.size !== "sml"
        ? props.playbook.data.image.mobile
        : props.playbook.data.image.thumb
      : null; // Prismic image size/crop

  return (
    <Link
      href={"/travel-playbooks/" + props.playbook.uid}
      className={`group/link relative max-w-xl ${props.size === "xlg" && "w-11/12 lg:w-5/12"} ${
        props.size === "lrg" && "w-10/12 lg:w-4/12"
      } ${props.classes}`}
    >
      {/* Image */}
      {image && (
        <div className="relative group-hover/link:bg-ex-blue">
          <Image
            src={image.url as string}
            alt={image.alt ? (image.alt as string) : (props.playbook.data.title as string)}
            width={image.dimensions?.width}
            height={image.dimensions?.height}
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(image.dimensions?.width as number, image.dimensions?.height as number)
            )}`}
            className="group-hover/link:mix-blend-lighten group-hover/link:grayscale"
          />

          <ImageShadow size={props.showCreator && props.size !== "xlg" ? "full" : "bottom"} />

          {props.showDestination && (
            <Destination
              name={(props.playbook.data.destination as unknown as Content.DestinationDocument).data.title as string}
              classes="m-2 md:m-3"
            />
          )}

          {props.showCreator && (
            <CreatorIcon
              firstName={(props.playbook.data.creator as unknown as Content.CreatorDocument).data.first_name as string}
              lastName={(props.playbook.data.creator as unknown as Content.CreatorDocument).data.last_name as string}
              image={(props.playbook.data.creator as unknown as Content.CreatorDocument).data.profile_image}
              classes={`absolute p-2 md:p-3 !pl-0 right-0 ${props.size === "xlg" ? "w-2/5 bottom-0" : "w-1/2 top-0"}`}
            />
          )}

          {/* Title */}
          <p
            className={`absolute bottom-0 p-2 font-bold leading-tight text-white md:p-3 ${
              !props.size || props.size === "sml" ? "text-xl md:text-3xl" : "text-2xl md:text-4xl"
            } ${props.size === "xlg" && "w-3/5"}`}
          >
            {props.playbook.data.title}
          </p>
        </div>
      )}

      {/* Description */}
      {props.showDescription && (
        <p className="mt-1 text-ex-grey group-hover/link:text-ex-blue md:mt-2">
          {asText(props.playbook.data.description)?.substring(0, 160)}
          {asText(props.playbook.data.description).length > 160 && "..."}
        </p>
      )}

      {!props.size && (
        <ThumbTab
          title={
            (props.playbook.data.creator as unknown as Content.CreatorDocument).data.last_name
              ? `${(props.playbook.data.creator as unknown as Content.CreatorDocument).data.first_name} ${(
                  props.playbook.data.creator as unknown as Content.CreatorDocument
                ).data.last_name?.toUpperCase()}`
              : ((props.playbook.data.creator as unknown as Content.CreatorDocument).data.first_name as string)
          }
          location={(props.playbook.data.destination as unknown as Content.DestinationDocument).data.title as string}
        />
      )}
    </Link>
  );
}
