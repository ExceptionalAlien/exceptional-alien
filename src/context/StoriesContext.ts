import { createContext } from "react";
import { Content } from "@prismicio/client";

export type StoriesContextType = {
  stories: Content.StoryDocument<string>[];
  setStories: (stories: Content.StoryDocument<string>[]) => void;
};

export const StoriesContext = createContext<StoriesContextType>({ stories: [], setStories: () => null });
