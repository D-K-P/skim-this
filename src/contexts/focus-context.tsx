"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type FocusContextType = {
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
};

const FocusContext = createContext<FocusContextType | null>(null);

export function FocusProvider({ children }: { children: ReactNode }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <FocusContext.Provider value={{ isFocused, setIsFocused }}>
      {children}
    </FocusContext.Provider>
  );
}

export function useFocus() {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error("useFocus must be used within a FocusProvider");
  }
  return context;
}
