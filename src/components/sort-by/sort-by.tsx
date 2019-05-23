import React, { FunctionComponent, ReactNode } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { GlobalState } from '../../store/interfaces';
import { sortByDate, sortByRating } from '../../store/movies/actions';
import { setSortBy } from '../../store/sort-by/actions';
import { SortByEnum } from '../../store/sort-by/reducer';

import './sort-by.scss';

interface SortByProps {
    sortBy: string;
    tab: string;

    setSortBy(payload: string): void;
    sortByRating(tab: string): void;
    sortByDate(tab: string): void;
}

const mapStateToProps = (state: GlobalState) => ({
    sortBy: state.sortBy
});

const mapDispatchToProps = {
    setSortBy,
    sortByRating,
    sortByDate
};

const SortBy: FunctionComponent<SortByProps> = (props: SortByProps) => {
    const { t } = useTranslation();
    const { setSortBy, sortByRating, sortByDate, tab } = props;

    const onSetSortBy = (e: any) => {
        if (e.target.id !== props.sortBy) {
            e.target.id === SortByEnum.Rating
                ? sortByRating(tab)
                : sortByDate(tab);
            setSortBy(e.target.id);
        }
    };

    const setActiveLink = (sortBy: string) => sortBy === props.sortBy;

    return (
        <div className='sort-by row'>
            <span>{ t('home.search.sortBy') }</span>
            <span id='date'
                  className={ cn('link', { 'active-link': setActiveLink(SortByEnum.Date) }) }
                  onClick={ onSetSortBy }>	&nbsp;{ t('home.search.releaseDate') }</span>
            <span id='rating'
                  className={ cn('link', { 'active-link': setActiveLink(SortByEnum.Rating) }) }
                  onClick={ onSetSortBy }>	&nbsp;{ t('home.search.rating') }</span>
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SortBy);
