import React, { Component } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import './sort-by.scss';
import { common } from "../../constants/constants";
import { GlobalState } from "../../store/store";
import { getMoviesQuantity } from "../../store/movies/selectors";
import { setSortBy } from "../../store/actions";

interface SortByProps {
    moviesCount: number;
    sortBy: string;
    setSortBy: (payload: string) => any
}

class SortBy extends Component<SortByProps> {
    constructor(props: SortByProps) {
        super(props);
    }

    private setSortBy = (e: any) => {
        this.props.setSortBy(e.target.id);
    };

    private setActiveLink = (sortBy: string) => {
        return sortBy === this.props.sortBy;
    };

    render() {
        const { moviesCount } = this.props;
        return (
            <div className='sort-by row'>
                <span>{ moviesCount }{ common.MOVIES_FOUND }</span>
                <div className='row sort-by__buttons'>
                    <span id='date'
                          className={ cn('link', { 'active-link': this.setActiveLink('date') }) }
                          onClick={ this.setSortBy }>{ common.RELEASE_DATE }</span>
                    <span id='rating'
                          className={ cn('link', { 'active-link': this.setActiveLink('rating') }) }
                          onClick={ this.setSortBy }>{ common.RATING }</span>
                </div>
            </div>
        );
    }
}

export default connect(
    (state: GlobalState) => ({
        moviesCount: getMoviesQuantity(state),
        sortBy: state.sortBy
    }),
    { setSortBy: setSortBy }
)(SortBy);
