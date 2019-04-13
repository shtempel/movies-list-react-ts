import React, {Component} from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';

import './sort-by.scss';
import {common} from '../../constants/constants';
import {GlobalState} from '../../store/store';
import {selectMoviesQuantity} from '../../store/movies/selectors';
import {setSortBy, sortByDate, sortByRating} from '../../store/actions';

interface SortByProps {
    moviesCount: number;
    sortBy: string;
    setSortBy: (payload: string) => any,
    sortByRating: () => any,
    sortByDate: () => any
}

const mapStateToProps = (state: GlobalState) => ({
    moviesCount: selectMoviesQuantity(state),
    sortBy: state.sortBy
});

const mapDispatchToProps = {
    setSortBy: setSortBy,
    sortByRating: sortByRating,
    sortByDate: sortByDate
};

class SortBy extends Component<SortByProps> {
    constructor(props: SortByProps) {
        super(props);
    }

    private setSortBy = (e: any) => {
        if (e.target.id === 'rating') {
            this.props.sortByRating();
        } else {
            this.props.sortByDate();
        }

        this.props.setSortBy(e.target.id);
    };

    private setActiveLink = (sortBy: string) => {
        return sortBy === this.props.sortBy;
    };

    render() {
        const {moviesCount} = this.props;
        return (
            <div className='sort-by row'>
                <span>{moviesCount}{common.MOVIES_FOUND}</span>
                <div className='row sort-by__buttons'>
                    <span>{common.SORT_BY}</span>
                    <span id='date'
                          className={cn('link', {'active-link': this.setActiveLink('date')})}
                          onClick={this.setSortBy}>{common.RELEASE_DATE}</span>
                    <span id='rating'
                          className={cn('link', {'active-link': this.setActiveLink('rating')})}
                          onClick={this.setSortBy}>{common.RATING}</span>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SortBy);
