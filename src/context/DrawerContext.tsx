// contexts/DrawerContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

const DrawerContext = createContext<{
  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}>({
  isDrawerOpen: false,
  setDrawerOpen: () => {},
});


export const DrawerProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  useEffect(() => {
    console.log("🟡 Drawer durumu değişti:", isDrawerOpen);
  }, [isDrawerOpen]);
  console.log("📌 DrawerContext Yükleniyor: isDrawerOpen =", isDrawerOpen);
  
  return (
    <DrawerContext.Provider value={{ isDrawerOpen, setDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => useContext(DrawerContext);
