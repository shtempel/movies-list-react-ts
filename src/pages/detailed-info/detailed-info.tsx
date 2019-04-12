import React, { Component } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { appHistory, GlobalState } from '../../store/store';
import { fetchMovieById } from '../../store/actions';
import { selectCurrentMovie, selectMovies } from '../../store/movies/selectors';
import { SearchResult } from '../home/search-result/search-result';
import { Button, Title } from '../../components';
import { common } from '../../constants/constants';
import { MovieItem } from '../../store/movies/reducer';

import './detailed-info.scss';

interface DetailedInfoProps {
    match: any;
    currentMovie: MovieItem,
    movies: MovieItem[],

    fetchMovieById(id: number): void
}

class DetailedInfo extends Component<DetailedInfoProps> {
    componentWillMount() {
        this.props.fetchMovieById(this.props.match.params.id);
    }

    setPaddingForRating = (rating: any) => {
        return Number.isInteger(rating);
    };

    getMovie = (event: any) => {
        this.props.fetchMovieById(event.target.id);
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
        currentMovie: selectCurrentMovie(state),
        movies: selectMovies(state)
    }),
    {
        fetchMovieById: fetchMovieById
    }
)(DetailedInfo);
