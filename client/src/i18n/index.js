import {createI18n} from "vue-i18n";
import en from "@/i18n/locale/en";
import vi from "@/i18n/locale/vi";

// Load locale form local storage. Default will be `en`
const initialLocale = localStorage.getItem('locale') || 'en';

/**
 * Setup datetime format for each locale
 */
const dateTimeFormats = {
    en: {
        short: {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        },
        'long': {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            hour: 'numeric',
            minute: 'numeric'
        }
    },
    vi: {
        short: {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        },
        'long': {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }
    }
};

export const create = function (messages) {
    const base = {
        locale: initialLocale,
        datetimeFormats: dateTimeFormats,
        fallbackLocale: initialLocale,
        allowComposition: true,
        messages: {
            en: en,
            vi: vi
        }
    };

    ['en', 'vi'].map(locale => {
        if (!!messages && messages.hasOwnProperty(locale)) {
            base.messages[locale] = Object.assign(base.messages[locale], messages[locale]);
        }
    });

    // Setup new I18N instance for the application
    return createI18n(base);
}

export default {}