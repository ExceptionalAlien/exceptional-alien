import { createContext } from "react";

export type ViewModeContextType = {
  viewMode: string | null;
  setViewMode: (viewMode: string) => void;
};

export const ViewModeContext = createContext<ViewModeContextType>({ viewMode: 'list', setViewMode: () => null });

// <ViewModeContext.Provider value={{ viewMode, setViewMode }}>