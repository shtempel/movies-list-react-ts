import React, {ReactNode} from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';

import {appHistory, GlobalState} from '../../store/store';
import {selectCurrentMovie, selectFavorites, selectIsLoading, selectMovies} from '../../store/movies/selectors';
import {Button, Icon, Loader, SearchResult, Title} from '../../components';
import {Common} from '../../constants/constants';
import {MovieItem} from '../../store/movies/reducer';
import {IconPrefix} from '../../components/icon/icon';
import {
    fetchFavoriteMovieSuccess,
    removeMovieFromFavorites
} from '../../store/movies/actions';

import './detailed-info.scss';

interface DetailedInfoProps {
    favorites: MovieItem[];
    currentMovie: MovieItem,
    movies: MovieItem[];
    isLoading: boolean;

    fetchFavoriteMovieSuccess(movie: MovieItem): void,
    removeMovieFromFavorites(id: string): void
}

const mapStateToProps = (state: GlobalState) => ({
    currentMovie: selectCurrentMovie(state),
    movies: selectMovies(state),
    favorites: selectFavorites(state),
    isLoading: selectIsLoading(state)
});

const mapDispatchToProps = {
    fetchFavoriteMovieSuccess,
    removeMovieFromFavorites
};

const DetailedInfo = (props: DetailedInfoProps) => {
    const {posterPath, title, voteAverage, tagLine, releaseDate, runtime, overview, id} = props.currentMovie;
    const {movies, isLoading, favorites, fetchFavoriteMovieSuccess, removeMovieFromFavorites} = props;
    const isMovieInFavorites: boolean = favorites.some(movie => movie.id === props.currentMovie.id);
    const iconPrefix: IconPrefix = isMovieInFavorites
        ? 'fas'
        : 'far';
    const setPaddingForRating = (rating: any) => {
        return Number.isInteger(rating);
    };

    const toSearch = () => {
        appHistory.push(`/`);
    };

    const searchResult: ReactNode = (
        isLoading
            ? <Loader/>
            : <SearchResult movies={movies}/>
    );
    const manageFavorites = () => {
        const isFavoritesExist: boolean = favorites.some(
            favorite => favorite.id === id
        );
        !isFavoritesExist
            ? fetchFavoriteMovieSuccess(props.currentMovie)
            : removeMovieFromFavorites(id!.toString());
    };

    return (
        <>
            <div className='detailed-info column'>
                <div className='detailed-info__top row'>
                    <Title className='detailed-info__top__title' title={Common.MainTitle}/>
                    <Button type='button'
                            name={Common.Search}
                            className='btn detailed-info__top__to-search'
                            onClick={toSearch}/>
                </div>
                <div className='detailed-info__film row'>
                    <img className='detailed-info__film__poster' src={posterPath} alt={title}/>
                    <div className='detailed-info__film__right column'>
                        <div className='detailed-info__film__right__title-rating row'>
                            <span className='detailed-info__film__right__title-rating__title'>{title}</span>
                            <Icon className={cn('search-result__movie-card__favorite', {'fav': isMovieInFavorites})}
                                  id={id!.toString()}
                                  iconPrefix={iconPrefix} icon='star'
                                  onIconClick={manageFavorites}/>
                            <span className={cn('detailed-info__film__right__title-rating__rating',
                                {
                                    'integer-border ': setPaddingForRating(voteAverage),
                                    'fractional-border': !setPaddingForRating(voteAverage)
                                }
                            )}>
                                {voteAverage}
                                </span>
                        </div>
                        <span className='detailed-info__film__right__tagline'>{tagLine}</span>
                        <div className='detailed-info__film__right__date-runtime row'>
                                <span
                                    className='detailed-info__film__right__date-runtime__date'>
                                    {releaseDate && releaseDate.slice(0, 4)}
                                </span>
                            <span className='detailed-info__film__right__date-runtime__runtime'>
                                    {runtime} min
                                </span>
                        </div>
                        <span className='detailed-info__film__right__overview'>{overview}</span>
                    </div>
                </div>
            </div>
            {searchResult}
        </>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailedInfo);
