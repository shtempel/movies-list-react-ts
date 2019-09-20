import React, { FC, ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { GlobalState, Tabs } from '../../store/interfaces';
import { selectSortBy } from '../../store/sort-by/selectors';
import NavBar from '../nav-bar/nav-bar';
import SortBy from '../sort-by/sort-by';
import { selectCurrentPath } from '../../store/router/selectors';
import { List } from './list';

import './movies-list.scss';

const MoviesList: FC = () => {
    const state: string = Tabs.movies;
    const [ tab, setActiveTab ] = useState<string>(state);

    const sortByItem = useSelector<GlobalState, string>(selectSortBy);
    const pathname = useSelector<GlobalState, string>(selectCurrentPath);
    const isSearchResultsTab: boolean = tab === Tabs.movies;

    const isDetailedPage: boolean = pathname.includes('movie');
    const sortBy: ReactNode = !isDetailedPage && sortByItem && <SortBy tab={ tab }/>;

    const handleTabs = (e: any) => setActiveTab(e.target.id);

    return (
        <>
            <>
                <NavBar setActiveTab={ handleTabs }
                        handleTabs={ handleTabs }
                        isSearchResultsTab={ isSearchResultsTab }/>
                { sortBy }
            </>
            <div className={ cn('search-results columns', { 'search-results-detailed': isDetailedPage }) }>
                <List isSearchResultsTab={ isSearchResultsTab }/>
            </div>
        </>
    );
};

export default MoviesList
