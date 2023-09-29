import { PrismicRichText, SliceZone } from "@prismicio/react";

import {
  LinkField,
  RichTextField,
  Content,
  SliceZone as SliceZoneType,
  ContentRelationshipField,
} from "@prismicio/client";

import { components } from "@/slices";
import Audio from "./content/Audio";

interface ContentProps {
  description: RichTextField;
  audio: LinkField;
  slices: SliceZoneType<Content.GemSlice>;
  creator: ContentRelationshipField<"creator">;
}

export default function Content(props: ContentProps) {
  const audioFile = (props.audio as any).url as string;

  return (
    <div className="grid grid-cols-1 m-3 md:m-4 mb-6 md:mb-8 gap-y-6 md:gap-y-8">
      <section
        className={`grid grid-cols-1 gap-y-3 [&_p]:font-bold [&>p]:text-md [&>p]:md:text-lg ${
          props.description.length === 0 && !audioFile && "hidden"
        }`}
      >
        {props.description.length !== 0 && <PrismicRichText field={props.description} />}
        {audioFile && <Audio file={audioFile} />}
      </section>

      <SliceZone slices={props.slices} components={components} context={{ creator: props.creator }} />
    </div>
  );
}
