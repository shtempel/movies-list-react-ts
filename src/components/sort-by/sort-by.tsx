import React from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';

import {common} from '../../constants/constants';
import {GlobalState} from '../../store/store';
import {selectMoviesQuantity} from '../../store/movies/selectors';
import {setSortBy, sortByDate, sortByRating} from '../../store/actions';

import './sort-by.scss';

interface SortByProps {
    moviesCount: number;
    sortBy: string;

    setSortBy(payload: string): void;
    sortByRating(): void;
    sortByDate(): void;
}

const mapStateToProps = (state: GlobalState) => ({
    moviesCount: selectMoviesQuantity(state),
    sortBy: state.sortBy
});

const mapDispatchToProps = {
    setSortBy,
    sortByRating,
    sortByDate
};

const SortBy = (props: SortByProps) => {
    const {moviesCount, setSortBy, sortByDate, sortByRating} = props;

    const onSetSortBy = (e: any) => {
        e.target.id === 'rating'
            ? sortByRating()
            : sortByDate();

        setSortBy(e.target.id);
    };

    const setActiveLink = (sortBy: string) => {
        return sortBy === props.sortBy;
    };

    return (
        <div className='sort-by row'>
            <span>{moviesCount}{common.MOVIES_FOUND}</span>
            <div className='row sort-by__buttons'>
                <span>{common.SORT_BY}</span>
                <span id='date'
                      className={cn('link', {'active-link': setActiveLink('date')})}
                      onClick={onSetSortBy}>{common.RELEASE_DATE}</span>
                <span id='rating'
                      className={cn('link', {'active-link': setActiveLink('rating')})}
                      onClick={onSetSortBy}>{common.RATING}</span>
            </div>
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SortBy);
