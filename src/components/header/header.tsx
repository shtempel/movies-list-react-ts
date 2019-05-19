import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import { LangPanel } from '../index';

import './header.scss';

export const Header: FunctionComponent = () => {
    const { t } = useTranslation();

    return (
        <div className='header row'>
            <span className='title'>{ t('header.title') }</span>
            <LangPanel/>
        </div>
    );
};
