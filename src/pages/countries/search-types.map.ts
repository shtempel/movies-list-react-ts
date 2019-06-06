import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
const T_KEY_PREFIX = 'countries.search.filters';

export const searchFilterMap = [
	{ title: t(`${ T_KEY_PREFIX }.country`) },
	{ title: t(`${ T_KEY_PREFIX }.countryCode`) },
	{ title: t(`${ T_KEY_PREFIX }.callingCode`) },
	{ title: t(`${ T_KEY_PREFIX }.capital`) },
	{ title: t(`${ T_KEY_PREFIX }.currency`) },
	{ title: t(`${ T_KEY_PREFIX }.language`) },
	{ title: t(`${ T_KEY_PREFIX }.region`) },
	{ title: t(`${ T_KEY_PREFIX }.subregion`) }
];

