import { setNewTheme } from '@/redux/features/common/themeSlice';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useDispatch } from 'react-redux';

export default function ThemeInitializer() {
  const systemTheme = useColorScheme(); // 'light' | 'dark'
  const dispatch = useDispatch();

  useEffect(() => {
    if (systemTheme === 'light' || systemTheme === 'dark') {
      dispatch(setNewTheme(systemTheme));
    }
  }, [systemTheme]);

  return null;
}