import { createContext } from "react";
import { Content } from "@prismicio/client";

export interface Search {
  destinations: Content.DestinationDocument<string>[];
  playbooks: Content.PlaybookDocument<string>[];
  gems: Content.GemDocument<string>[];
  creators: Content.CreatorDocument<string>[];
  stories: Content.StoryDocument<string>[];
}

export type SearchContextType = {
  search: Search;
  setSearch: (search: Search) => void;
};

export const SearchContext = createContext<SearchContextType>({
  search: { destinations: [], playbooks: [], gems: [], creators: [], stories: [] },
  setSearch: () => null,
});
