import { useSelector } from 'react-redux';
import { ThemeProvider } from '@react-navigation/native';
import { RootState } from '@/redux/store';
import DefaultTheme from '../ui/DefaultTheme';
import { DarkTheme } from '@react-navigation/native';

export default function ReduxThemeProvider({ children }: { children: React.ReactNode }) {
  const currentTheme = useSelector((state: RootState) => state.theme);
  const themeObject = currentTheme === 'dark' ? DarkTheme : DefaultTheme;

  return <ThemeProvider value={themeObject}>{children}</ThemeProvider>;
}