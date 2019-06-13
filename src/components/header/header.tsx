import React, { FunctionComponent, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, LangPanel } from '../index';

import './header.scss';

interface HeaderProps {
    pathname: string;

    push(path: string): void;
}

export const Header: FunctionComponent<HeaderProps> = (props: HeaderProps) => {
    const { t } = useTranslation();
    const toMainPage = () => props.push('/');
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
