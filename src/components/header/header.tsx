import React, { FunctionComponent, ReactNode, useState } from 'react';
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
    const [current, toggleMenu] = useState(false);

    const toggle = () => toggleMenu(!current);

    const navigate = (e: any) => props.push(`/${ e.target.id }`);

    const backIcon: ReactNode = isDetailedPage && (
        <Icon icon='chevron-circle-left'
              iconPrefix='fa'
              className='back link'
              onIconClick={ toMainPage }/>
    );

    const navMenu: ReactNode = current &&
        <div className='nav-menu'>
            <span onClick={ navigate } id='countries' className='link'>{ t('header.toCountries') }
                <Icon icon='arrow-right' iconPrefix='fa'/>
            </span>
        </div>;

    return (
        <div className='header row'>
            <div className='left'>
                { backIcon }
                <span onClick={ toggle } className='title'>{ t('header.title') }</span>
                { navMenu }
            </div>
            <LangPanel/>
        </div>
    );
};
