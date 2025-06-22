'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function UIProvider({ children }) {

    const [navMenu, setNavMenu] = useState(false);
    const [overlay, setOverlay] = useState(false);

    useEffect(() => {
        setOverlay(navMenu)
    }, [navMenu])


  return (
    <AuthContext.Provider value={{ navMenu, setNavMenu, overlay, setOverlay }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useUI() {
  return useContext(AuthContext);
}
