import {
  FunctionComponent,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import { getTheme, enableTheme } from '../lib/theme';

/**
 * React context for storing theme-related data and callbacks.
 * `colorMode` is `light` or `dark` and will be consumed by
 * various downstream components, including `EuiProvider`.
 */
export const GlobalProvider = createContext<{
  colorMode?: string;
  setColorMode?: (colorMode: string) => void;
}>({});

type ThemeProps = {
  children: React.ReactNode;
};

export const Theme: FunctionComponent<ThemeProps> = (props) => {
  const [colorMode, setColorMode] = useState('dark');

  // on initial mount in the browser, use any theme from local storage
  useEffect(() => {
    setColorMode(getTheme());
  }, []);

  // enable the correct theme when colorMode changes
  useEffect(() => enableTheme(colorMode), [colorMode]);

  return (
    <GlobalProvider.Provider value={{ colorMode, setColorMode }}>
      {props.children}
    </GlobalProvider.Provider>
  );
};

export const useTheme = () => {
  return useContext(GlobalProvider);
};
