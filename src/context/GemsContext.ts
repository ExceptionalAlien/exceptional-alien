import { createContext } from "react";
import { Content } from "@prismicio/client";

export interface Gems {
  [key: string]: Content.GemDocument<string>[];
}

export type GemsContextType = {
  gems: Gems;
  setGems: (gems: Gems) => void;
};

export const GemsContext = createContext<GemsContextType>({ gems: {}, setGems: () => null });
