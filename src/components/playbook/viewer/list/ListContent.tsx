import { SliceZone } from "@prismicio/react";

import {
  LinkField,
  RichTextField,
  Content,
  SliceZone as SliceZoneType,
  ContentRelationshipField,
} from "@prismicio/client";

import { components } from "@/slices";
import Details from "./list-content/Details";

interface ListContentProps {
  description: RichTextField;
  audio: LinkField;
  slices: SliceZoneType<Content.GemSlice>;
  creator: ContentRelationshipField<"creator">;
}

export default function ListContent(props: ListContentProps) {
  const audioFile = (props.audio as any).url as string;

  return (
    <div className="grid grid-cols-1 m-3 md:m-4 my-5 md:my-6 gap-y-10 md:gap-y-12">
      <Details description={props.description} audio={audioFile} />
      <SliceZone slices={props.slices} components={components} context={{ creator: props.creator }} />
    </div>
  );
}
