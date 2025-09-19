'use client';
import { useApp } from '@/contexts/AppContext';
import { useRouter, usePathname } from 'next/navigation';
import { LOCALES } from '@/constants/locales';
import styles from './LocaleSwitcher.module.css';

export default function LocaleSwitcher() {
  const { locale, setLocale } = useApp();
  const router = useRouter();
  const pathname = usePathname();

  // Debug logging
  console.log('LocaleSwitcher - locale:', locale);
  console.log('LocaleSwitcher - LOCALES:', LOCALES);

  const handleLocaleChange = (newLocale: keyof typeof LOCALES) => {
    setLocale(LOCALES[newLocale]);

    // Update URL based on locale
    if (newLocale === 'US' && !pathname.startsWith('/us')) {
      router.push('/us');
    } else if (newLocale === 'UK' && pathname.startsWith('/us')) {
      router.push('/');
    }
  };

  return (
    <div className={styles.localeSwitcher}>
      <button
        className={`${styles.localeButton} ${
          locale?.region === 'UK' ? styles.active : ''
        }`}
        onClick={() => handleLocaleChange('UK')}
      >
        UK (£)
      </button>
      <button
        className={`${styles.localeButton} ${
          locale?.region === 'US' ? styles.active : ''
        }`}
        onClick={() => handleLocaleChange('US')}
      >
        US ($)
      </button>
    </div>
  );
}
