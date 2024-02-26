import Link from "next/link";
import Image from "next/image";
import { Content } from "@prismicio/client";
import GemIcon from "./GemIcon";
import CreatorIcon from "./CreatorIcon";
import ImageShadow from "./ImageShadow";
import { shimmer, toBase64 } from "@/utils/shimmer";

type GemThumbProps = {
  gem: Content.GemDocument;
  size?: string; // med or sml
  creator?: Content.CreatorDocument;
  classes?: string;
};

export default function GemThumb(props: GemThumbProps) {
  return (
    <Link
      href={"/gems/" + props.gem.uid}
      className={`group/link max-w-xl ${props.size === "med" && "w-3/4 lg:w-1/4"} ${props.classes}`}
    >
      {/* Image */}
      {props.gem.data.image && (
        <div className="relative group-hover/link:bg-ex-blue">
          <Image
            src={props.gem.data.image.mobile.url as string}
            alt={
              props.gem.data.image.mobile.alt
                ? (props.gem.data.image.mobile.alt as string)
                : (props.gem.data.title as string)
            }
            width={props.gem.data.image.mobile.dimensions?.width}
            height={props.gem.data.image.mobile.dimensions?.height}
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(
                props.gem.data.image.mobile.dimensions?.width as number,
                props.gem.data.image.mobile.dimensions?.height as number
              )
            )}`}
            className="group-hover/link:mix-blend-lighten group-hover/link:grayscale"
          />

          {props.size && props.size !== "sml" && <ImageShadow />}

          <GemIcon
            category={props.gem.data.category}
            marker
            classes={`top-0 m-[6px] md:m-[10px] ${
              props.size === "med" ? "!h-12 !w-12" : "!h-10 !w-10 md:!h-11 md:!w-11"
            }`}
          />

          {/* Creators */}
          {props.creator ? (
            <CreatorIcon
              firstName={(props.creator as unknown as Content.CreatorDocument).data.first_name as string}
              lastName={(props.creator as unknown as Content.CreatorDocument).data.last_name as string}
              image={(props.creator as unknown as Content.CreatorDocument).data.profile_image}
              classes="absolute right-0 bottom-0 m-2 md:m-3 max-w-[50%]"
            />
          ) : (
            props.gem.data.playbooks
              .slice(0, 6)
              .map(
                (item, i) =>
                  (item.playbook as unknown as Content.PlaybookDocument).data && (
                    <CreatorIcon
                      key={i}
                      image={
                        (
                          (item.playbook as unknown as Content.PlaybookDocument).data
                            .creator as unknown as Content.CreatorDocument
                        ).data.profile_image
                      }
                      classes={`absolute right-0 bottom-0 p-2 md:p-3 ${
                        i === 5
                          ? "mr-10"
                          : i === 4
                            ? "mr-8"
                            : i === 3
                              ? "mr-6"
                              : i === 2
                                ? "mr-4"
                                : i === 1
                                  ? "mr-2"
                                  : "mr-0"
                      }`}
                    />
                  )
              )
          )}
        </div>
      )}

      {/* Title */}
      <p className="mt-1 text-xl font-bold group-hover/link:text-ex-blue md:mt-2 md:text-2xl">{props.gem.data.title}</p>
    </Link>
  );
}
