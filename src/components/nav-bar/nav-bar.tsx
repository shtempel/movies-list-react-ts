import cn from 'classnames';
import React, { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Icon } from '..';
import { GlobalState, Tabs } from '../../store/interfaces';
import { MovieItem } from '../../store/movies/reducer';
import {
    selectFavMoviesQuantity,
    selectFavorites,
    selectIsFavMoviesNearRelease,
    selectMoviesQuantity
} from '../../store/movies/selectors';

interface NavBarProps {
    isSearchResultsTab: boolean;

    setActiveTab(e: any): void;
    handleTabs(e: any): void;
}

const NavBar: FC<NavBarProps> = (props: NavBarProps) => {
    const { t } = useTranslation();
    const favorites = useSelector<GlobalState, MovieItem[]>(selectFavorites);
    const isFavoritesAvailable: boolean = favorites.length > 0;
    const favMoviesQuantity = useSelector<GlobalState, number>(selectFavMoviesQuantity);
    const moviesQuantity = useSelector<GlobalState, number>(selectMoviesQuantity);
    const isFavMoviesNearRelease = useSelector<GlobalState, boolean>(selectIsFavMoviesNearRelease);

    const favTab: ReactNode = isFavoritesAvailable && (
        <span className={ cn('btn', { 'active-button': !props.isSearchResultsTab }) }
              id={ Tabs.favorites }
              onClick={ props.handleTabs }>
                    { t('favorites') } { favMoviesQuantity }
            { isFavMoviesNearRelease && <Icon className='fav-bell' iconPrefix='fas' icon='bell'/> }
        </span>
    );

    return (
        <div className='nav-bar'>
                    <span className={ cn('btn', { 'active-button': props.isSearchResultsTab }) }
                          id={ Tabs.movies }
                          onClick={ props.handleTabs }>
                    { t('searchResults') } { moviesQuantity }
                    </span>
            { favTab }
        </div>
    );
};

export default NavBar;
