import { createContext } from "react";

export type SearchBoxContextType = {
  showingSearchBox: boolean;
  setShowingSearchBox: (showingSearchBox: boolean) => void;
};

export const SearchBoxContext = createContext<SearchBoxContextType>({
  showingSearchBox: false,
  setShowingSearchBox: () => null,
});
