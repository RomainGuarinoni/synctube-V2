import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

export type ThemeContext = {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

const ThemeContext = createContext<ThemeContext>({
  theme: 'light',
  setTheme: () => {
    return;
  },
});

const { Provider } = ThemeContext;

function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setTheme('dark');
    }
  }, []);

  return (
    <Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </Provider>
  );
}

function useTheme() {
  return useContext(ThemeContext);
}

export { ThemeContext, ThemeProvider, useTheme };
