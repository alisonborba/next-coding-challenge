export interface Locale {
    label: string;
    currency: string;
    currencySymbol: string;
    region: string;
    language: string;
    country: string;
    countryCode: string;
    icon: string;
}

export interface LocaleConfig {
    [key: string]: Locale;
}

// Centralized locale configuration - add new locales here
export const LOCALES: LocaleConfig = {
    'en-gb': {
        currency: 'GBP',
        currencySymbol: '£',
        region: 'UK',
        language: 'en-GB',
        country: 'United Kingdom',
        countryCode: 'GB',
        icon: '🇬🇧',
    },
    'en-us': {
        currency: 'USD',
        currencySymbol: '$',
        region: 'US',
        language: 'en-US',
        country: 'United States',
        countryCode: 'US',
        icon: '🇺🇸',
    }
};

// Helper function to get locale by slug
export function getLocaleBySlug(slug: string): Locale | null {
    return LOCALES[slug] || null;
}

// Helper function to get all available locale slugs
export function getAvailableLocaleSlugs(): string[] {
    return Object.keys(LOCALES);
}

// Helper function to get default locale
export function getDefaultLocale(): Locale {
    return LOCALES['en-gb'];
}

// Helper function to check if a locale exists
export function isValidLocale(slug: string): boolean {
    return slug in LOCALES;
}