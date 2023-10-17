import { createContext } from "react";
import { Content } from "@prismicio/client";

export type PlaybooksContextType = {
  playbooks: Content.PlaybookDocument<string>[];
  setPlaybooks: (playbooks: Content.PlaybookDocument<string>[]) => void;
};

export const PlaybooksContext = createContext<PlaybooksContextType>({ playbooks: [], setPlaybooks: () => null });
