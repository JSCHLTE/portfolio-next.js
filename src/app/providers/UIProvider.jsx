'use client';

import { usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function UIProvider({ children }) {

    const [navMenu, setNavMenu] = useState(false);
    const [deleteWarn, setDeleteWarn] = useState(false);
    const [overlay, setOverlay] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
      if(navMenu) setOverlay(true);
      if(deleteWarn) setOverlay(true);
      if(!deleteWarn && !navMenu) setOverlay(false);
    }, [navMenu, deleteWarn])

    useEffect(() => {
      setOverlay(false)
      setDeleteWarn(false)
    }, [pathname])

  return (
    <AuthContext.Provider value={{ navMenu, setNavMenu, overlay, setOverlay, deleteWarn, setDeleteWarn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useUI() {
  return useContext(AuthContext);
}
