"use client";
// 1. Create the context (top of file)
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

// 2. Create the provider
export function ThemeProvider({ children }) {

    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? JSON.parse(savedTheme) : true;
      });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
    theme ? document.body.classList.remove("light") : document.body.classList.add("light"); 
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Create the custom hook to use the context
export function useTheme() {
  return useContext(ThemeContext);
}