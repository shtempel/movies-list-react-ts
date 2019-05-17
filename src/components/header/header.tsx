import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import './header.scss';

export const Header: FunctionComponent = () => {
    const { t } = useTranslation();

    return <span className='header-title'>{ t('header.title') }</span>
};
