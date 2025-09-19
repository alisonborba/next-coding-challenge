'use client';

import { useApp } from '@/contexts/AppContext';
import { useRouter, usePathname } from 'next/navigation';
import { LOCALES, getAvailableLocaleSlugs } from '@/constants/locales';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale, setLocale } = useApp();

  const handleLocaleChange = (localeSlug: string) => {
    const newLocale = LOCALES[localeSlug];
    if (newLocale) {
      setLocale({ ...newLocale, displayName: localeSlug });

      if (pathname.startsWith('/int/')) {
        router.push(`/int/${localeSlug}`);
      } else if (pathname === '/') {
        router.push(`/int/${localeSlug}`);
      } else {
        router.push(`/int/${localeSlug}`);
      }
    }
  };

  // Get available locale slugs
  const availableLocales = getAvailableLocaleSlugs();

  return (
    <>
      {availableLocales.map((localeSlug) => {
        const localeConfig = LOCALES[localeSlug];
        const isActive = locale?.countryCode === localeConfig.countryCode;

        return (
          <button
            title={localeConfig.country}
            key={localeSlug}
            style={{
              cursor: 'pointer',
              background: 'transparent',
              border: 'none',
              fontSize: '2rem',
              marginLeft: '1rem',
              display: isActive ? 'none' : 'block',
            }}
            onClick={() => handleLocaleChange(localeSlug)}
          >
            {localeConfig.icon}
          </button>
        );
      })}
    </>
  );
}
