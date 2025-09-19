'use client';
import { useApp } from '@/contexts/AppContext';
import { useRouter } from 'next/navigation';
import { LOCALES, getAvailableLocaleSlugs } from '@/constants/locales';

export default function LocaleSwitcher() {
  const router = useRouter();
  const { locale, setLocale } = useApp();

  const handleLocaleChange = (localeSlug: string) => {
    const newLocale = LOCALES[localeSlug];
    if (newLocale) {
      setLocale(newLocale);
      router.push(`/int/${localeSlug}`);
    }
  };

  return (
    <>
      {getAvailableLocaleSlugs().map((localeSlug) => {
        const localeConfig = LOCALES[localeSlug];
        const isActive = locale?.countryCode === localeConfig.countryCode;
        return (
          <button
            key={localeSlug}
            title={localeConfig.country}
            onClick={() => handleLocaleChange(localeSlug)}
            style={{
              cursor: 'pointer',
              background: 'transparent',
              border: 'none',
              fontSize: '2rem',
              marginLeft: '1rem',
              display: isActive ? 'none' : 'block',
            }}
          >
            {localeConfig.icon}
          </button>
        );
      })}
    </>
  );
}
