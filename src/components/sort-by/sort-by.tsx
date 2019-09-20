import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { Dispatch } from 'redux';
import { getType } from 'typesafe-actions';

import { GlobalState } from '../../store/interfaces';
import { sortByDate, sortByRating } from '../../store/movies/actions';
import { setSortBy } from '../../store/sort-by/actions';
import { SortByEnum } from '../../store/sort-by/reducer';
import { Icon } from '..';
import { selectSortBy } from '../../store/sort-by/selectors';

import './sort-by.scss';

interface SortByProps {
    tab: string;
}

const SortBy: FC<SortByProps> = (props: SortByProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch<Dispatch>();
    const sortBy = useSelector<GlobalState, string>(selectSortBy);
    const onSetSortBy = (e: any) => {
        if ( e.target.id !== sortBy ) {
            e.target.id === SortByEnum.Rating
                ? dispatch({ type: getType(sortByRating), payload: props.tab })
                : dispatch({ type: getType(sortByDate), payload: props.tab });
            dispatch({ type: getType(setSortBy), payload: e.target.id });
        }
    };

    const setActiveLink = (sortByItem: string) => sortByItem === sortBy;

    return (
        <div className='sort-by row'>
            <span>{ t('home.search.sortBy') }</span>
            <Icon className='sort-icon'
                  iconPrefix='fas'
                  icon='sort'/>
            <span id='date'
                  className={ cn('link', { 'active-link': setActiveLink(SortByEnum.Date) }) }
                  onClick={ onSetSortBy }>	&nbsp;{ t('home.search.releaseDate') }</span>
            <span id='rating'
                  className={ cn('link', { 'active-link': setActiveLink(SortByEnum.Rating) }) }
                  onClick={ onSetSortBy }>	&nbsp;{ t('home.search.rating') }</span>
        </div>
    );
};

export default SortBy;
