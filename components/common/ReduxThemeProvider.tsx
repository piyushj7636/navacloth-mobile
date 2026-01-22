import { useSelector } from 'react-redux';
import { ThemeProvider, Theme } from '@react-navigation/native';
import { RootState } from '@/redux/store';
import DefaultTheme from '../ui/DefaultTheme';
import DarkTheme from '../ui/DarkTheme';

export default function ReduxThemeProvider({ children }: { children: React.ReactNode }) {
  const currentTheme = useSelector((state: RootState) => state.theme);
  const themeObject: Theme = (currentTheme === 'dark' ? DarkTheme : DefaultTheme) as unknown as Theme;

  return <ThemeProvider value={themeObject}>{children}</ThemeProvider>;
}