import React, { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { Icon } from '..';
import LangPanel from '../lang-panel/lang-panel';

import './header.scss';

interface HeaderProps {
    pathname: string;
}

const Header: FC<HeaderProps> = (props: HeaderProps) => {
    const { t } = useTranslation();
    const dispatch: Dispatch = useDispatch();
    const toMainPage = () => dispatch({ type: '@@router/LOCATION_CHANGE', payload: { location: { pathname: '/' } } });
    const isDetailedPage: boolean = props.pathname.includes('movie');

    const backIcon: ReactNode = isDetailedPage && (
        <Icon icon='chevron-circle-left'
              iconPrefix='fa'
              className='back link'
              onIconClick={ toMainPage }/>
    );

    return (
        <div className='header row'>
            <div className='left'>
                { backIcon }
                <span className='title'>{ t('header.title') }</span>
            </div>
            <LangPanel/>
        </div>
    );
};

export default Header;
