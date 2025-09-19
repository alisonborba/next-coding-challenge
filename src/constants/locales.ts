import { Locale } from '@/types/product';

export const LOCALES: Record<string, Locale> = {
    'en-gb': {
        currency: 'GBP',
        currencySymbol: '£',
        language: 'en-GB',
        country: 'United Kingdom',
        countryCode: 'GB',
        icon: '🇬🇧',
    },
    'en-us': {
        currency: 'USD',
        currencySymbol: '$',
        language: 'en-US',
        country: 'United States',
        countryCode: 'US',
        icon: '🇺🇸',
    }
};

export const getLocaleBySlug = (slug: string) => LOCALES[slug] || null;
export const getAvailableLocaleSlugs = () => Object.keys(LOCALES);
export const getDefaultLocale = () => LOCALES['en-gb'];
export const isValidLocale = (slug: string) => slug in LOCALES;