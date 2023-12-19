import { createContext } from "react";
import { Content } from "@prismicio/client";

export interface SearchResults {
  destinations: Content.DestinationDocument<string>[];
  playbooks: Content.PlaybookDocument<string>[];
  creators: Content.CreatorDocument<string>[];
  gems: Content.GemDocument<string>[];
  query: string;
}

export type SearchContextType = {
  searchResults: SearchResults;
  setSearchResults: (searchResults: SearchResults) => void;
};

export const SearchContext = createContext<SearchContextType>({
  searchResults: { destinations: [], playbooks: [], creators: [], gems: [], query: "" },
  setSearchResults: () => null,
});
