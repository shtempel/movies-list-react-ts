import React, { Component } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { appHistory, GlobalState } from '../../store/store';
import { fetchMovieById, FetchMovieByIdPayload, MovieItem } from '../../store/actions';
import { getCurrentMovie, getMovies } from '../../store/movies/selectors';
import { SearchResult } from '../home/search-result/search-result';
import { Button, Title } from '../../components';
import { common } from '../../constants/constants';

import './detailed-info.scss';

interface DetailedInfoProps {
    match: any;
    fetchMovieById: (payload: FetchMovieByIdPayload) => any,
    currentMovie: MovieItem,
    movies: MovieItem[]
}

class DetailedInfo extends Component<DetailedInfoProps> {
    componentWillMount(): void {
        this.props.fetchMovieById({ id: this.props.match.params.id });
    }

    setPaddingForRating = (rating: any) => {
        return Number.isInteger(rating);
    };

    getMovie = (event: any): any => {
        this.props.fetchMovieById({ id: event.target.id });
    };

    toSearch = () => {
        appHistory.push(`/`);
    };

    render() {
        const { posterPath, title, voteAverage, tagLine, releaseDate, runtime, overview } = this.props.currentMovie;
        const { movies } = this.props;
        return (
            <>
                <div className='detailed-info column'>
                    <div className='detailed-info__top row'>
                        <Title className='detailed-info__top__title' title={ common.MAIN_TITLE }/>
                        <Button type='button'
                                name={ common.SEARCH }
                                className='btn detailed-info__top__to-search'
                                onClick={ this.toSearch }/>
                    </div>
                    <div className='detailed-info__film row'>
                        <img className='detailed-info__film__poster' src={ posterPath } alt={ title }/>
                        <div className='detailed-info__film__right column'>
                            <div className='detailed-info__film__right__title-rating row'>
                                <span className='detailed-info__film__right__title-rating__title'>{ title }</span>
                                <span className={ cn('detailed-info__film__right__title-rating__rating',
                                    {
                                        'integer-border ': this.setPaddingForRating(voteAverage),
                                        'fractional-border': !this.setPaddingForRating(voteAverage)
                                    }
                                ) }>
                                { voteAverage }
                                </span>
                            </div>
                            <span className='detailed-info__film__right__tagline'>{ tagLine }</span>
                            <div className='detailed-info__film__right__date-runtime row'>
                                <span
                                    className='detailed-info__film__right__date-runtime__date'>
                                    { releaseDate && releaseDate.slice(0, 4) }
                                </span>
                                <span className='detailed-info__film__right__date-runtime__runtime'>
                                    { runtime } min
                                </span>
                            </div>
                            <span className='detailed-info__film__right__overview'>{ overview }</span>
                        </div>
                    </div>
                </div>
                <SearchResult onClick={ this.getMovie } movies={ movies }/>
            </>
        );
    }
}

export default connect(
    (state: GlobalState) => ({
        currentMovie: getCurrentMovie(state),
        movies: getMovies(state)
    }),
    {
        fetchMovieById: fetchMovieById
    }
)(DetailedInfo);
