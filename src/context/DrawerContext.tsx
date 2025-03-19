// contexts/DrawerContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

const DrawerContext = createContext<{
  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}>({
  isDrawerOpen: false,
  setDrawerOpen: () => {},
});


export const DrawerProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);


  return (
    <DrawerContext.Provider value={{ isDrawerOpen, setDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => useContext(DrawerContext);
