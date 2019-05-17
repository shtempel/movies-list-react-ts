import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';

const DEFAULT_LANGUAGE = 'en-US';

export function initTranslationService() {
    i18n
        .use(Backend)
        .use(initReactI18next) // passes i18n down to react-i18next
        .init({
            lng: DEFAULT_LANGUAGE,

            fallbackLng: DEFAULT_LANGUAGE,

            whitelist: ['en-US', 'ru-RU'],

            load: 'currentOnly',

            debug: !!process.env.REACT_APP_I18N_DEBUG,

            interpolation: {
                escapeValue: false // react already safes from xss
            },

            backend: {
                loadPath: 'locales/{{lng}}.json'
            }
        });
    return i18n;
}

export default i18n;
