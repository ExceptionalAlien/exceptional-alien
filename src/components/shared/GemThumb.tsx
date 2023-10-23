import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Content } from "@prismicio/client";
import GemIcon from "./GemIcon";
import CreatorIcon from "./CreatorIcon";
import { shimmer, toBase64 } from "@/utils/shimmer";

interface GemThumbProps {
  gem: Content.GemDocument;
  size?: string;
  creator?: Content.CreatorDocument;
  classes?: string;
}

export default function GemThumb(props: GemThumbProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageLoadComplete = () => {
    setImageLoaded(true);
  };

  return (
    <Link
      href={"/gems/" + props.gem.uid}
      className={`group/link max-w-xl ${props.size && "w-3/4 lg:w-1/4"} ${props.classes}`}
    >
      {/* Image */}
      {props.gem.data.image && (
        <div className="group-hover/link:bg-ex-blue relative">
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
            onLoad={imageLoadComplete}
            className="group-hover/link:grayscale group-hover/link:mix-blend-lighten"
          />

          <div
            className={`bg-gradient-to-t from-black/50 from-0% to-black/0 to-50% absolute w-full h-full top-0 ${
              (!imageLoaded || !props.size) && "hidden"
            }`}
          ></div>

          <GemIcon
            category={props.gem.data.category}
            classes={`!m-0 ${props.size ? "w-11 top-3 left-3" : "top-2 left-2"}`}
          />

          {/* Creators */}
          {props.creator ? (
            <CreatorIcon
              firstName={(props.creator as unknown as Content.CreatorDocument).data.first_name as string}
              lastName={(props.creator as unknown as Content.CreatorDocument).data.last_name as string}
              image={(props.creator as unknown as Content.CreatorDocument).data.profile_image}
              classes="absolute right-0 bottom-0 !p-3"
            />
          ) : (
            props.gem.data.playbooks.map(
              (item, i) =>
                (item.playbook as unknown as Content.PlaybookDocument).data && (
                  <CreatorIcon
                    key={i}
                    firstName=""
                    lastName=""
                    image={
                      (
                        (item.playbook as unknown as Content.PlaybookDocument).data
                          .creator as unknown as Content.CreatorDocument
                      ).data.profile_image
                    }
                    classes={`absolute right-0 bottom-0 !p-2 [&>img]:w-8 [&>img]:md:w-10 [&>img]:h-8 [&>img]:md:h-10 mr-${
                      i * 2
                    }`}
                  />
                )
            )
          )}
        </div>
      )}

      {/* Title */}
      <p
        className={`group-hover/link:text-ex-blue transition-[color] duration-300 ease-in-out font-bold mt-2 ${
          props.size ? "text-xl md:text-2xl" : "text-xl"
        }`}
      >
        {props.gem.data.title}
      </p>
    </Link>
  );
}
