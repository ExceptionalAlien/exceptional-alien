import { createContext } from "react";
import { Content } from "@prismicio/client";

export type GemsContextType = {
  gems: Content.GemDocument<string>[];
  setGems: (gems: Content.GemDocument<string>[]) => void;
};

export const GemsContext = createContext<GemsContextType>({ gems: [], setGems: () => null });
