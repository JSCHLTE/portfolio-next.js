'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth } from '../firebase';
import checkIfAdmin from '../utils/check-if-admin/checkIfAdmin';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [admin, setAdmin] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      let finalUser = user;
  
      if (!user) {
        const anonResult = await signInAnonymously(auth);
        finalUser = anonResult.user;
      }
  
      setUser(finalUser);
  
      const isAdmin = await checkIfAdmin(finalUser.uid);
      isAdmin ? setAdmin(true) : setAdmin(false)
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, admin, loading, setAdmin, auth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
