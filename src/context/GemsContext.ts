import { createContext } from "react";
import { Content } from "@prismicio/client";

export type CreatorsContextType = {
  creators: Content.CreatorDocument<string>[];
  setCreators: (creators: Content.CreatorDocument<string>[]) => void;
};

export const CreatorsContext = createContext<CreatorsContextType>({ creators: [], setCreators: () => null });
