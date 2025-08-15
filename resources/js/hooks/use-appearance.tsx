import { useCallback, useEffect, useState } from 'react';

export type Appearance = 'light' | 'dark' | 'system';

const prefersDark = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const setCookie = (name: string, value: string, days = 365) => {
  if (typeof document === 'undefined') return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};

const mediaQuery = () => {
  if (typeof window === 'undefined') return null;
  return window.matchMedia('(prefers-color-scheme: dark)');
};

const applyAppearance = (appearance: Appearance) => {
  const isDark = appearance === 'dark' || (appearance === 'system' && prefersDark());
  document.documentElement.classList.toggle('dark', isDark);
};

const applyThemeClass = (themeKey: string | null) => {
  const root = document.documentElement;

  // Remove existing page-[themeKey] classes
  root.classList.forEach((cls) => {
    if (cls.startsWith('page-')) root.classList.remove(cls);
  });

  if (themeKey) {
    root.classList.add(`page-${themeKey}`);
  }
};

const handleSystemThemeChange = () => {
  const appearance = (localStorage.getItem('appearance') as Appearance) || 'system';
  applyAppearance(appearance);
};

// ⚙️ Initialize on app start
export function initializeThemeWithPageTheme() {
  const savedAppearance = (localStorage.getItem('appearance') as Appearance) || 'system';
  const savedThemeKey = localStorage.getItem('themeKey') || getCookie('themeKey') || null;

  applyAppearance(savedAppearance);
  applyThemeClass(savedThemeKey);

  mediaQuery()?.addEventListener('change', handleSystemThemeChange);
}

// ✅ Hook: useAppearance with theme support
export function useAppearance(initialThemeKey: string | null = null) {
  const [appearance, setAppearance] = useState<Appearance>('system');
  const [themeKey, setThemeKey] = useState<string | null>(initialThemeKey);

  const updateAppearance = useCallback((mode: Appearance) => {
    setAppearance(mode);
    localStorage.setItem('appearance', mode);
    setCookie('appearance', mode);
    applyAppearance(mode);
  }, []);

  const updateTheme = useCallback((key: string | null) => {
    setThemeKey(key);
    if (key) {
      localStorage.setItem('themeKey', key);
      setCookie('themeKey', key);
    } else {
      localStorage.removeItem('themeKey');
    }
    applyThemeClass(key);
  }, []);

  useEffect(() => {
    const savedAppearance = (localStorage.getItem('appearance') as Appearance) || 'system';
    const savedTheme = localStorage.getItem('themeKey') || null;

    setAppearance(savedAppearance);
    setThemeKey(savedTheme);
    applyAppearance(savedAppearance);
    applyThemeClass(savedTheme);

    return () => {
      mediaQuery()?.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  return {
    appearance,
    themeKey,
    updateAppearance,
    updateTheme,
  } as const;
}
