import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { GlobalState } from '../../store/interfaces';
import { sortByDate, sortByRating } from '../../store/movies/actions';
import { setSortBy } from '../../store/sort-by/actions';

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
        e.target.id === 'rating'
            ? sortByRating(tab)
            : sortByDate(tab);

        setSortBy(e.target.id);
    };

    return (
        <div className='sort-by'>
            <span>{ t('home.search.sortBy') }</span>
            <span id='date' onClick={ onSetSortBy }>	&nbsp;{ t('home.search.releaseDate') }</span>
            <span id='rating' onClick={ onSetSortBy }>	&nbsp;{ t('home.search.rating') }</span>
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SortBy);
