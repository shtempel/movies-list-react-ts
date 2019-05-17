import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { appHistory, GlobalState } from '../../store/store';
import { selectCurrentMovie, selectFavorites, selectIsLoading, selectMovies } from '../../store/movies/selectors';
import { Common } from '../../constants/constants';
import { MovieItem } from '../../store/movies/reducer';
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
    const { posterPath, title, voteAverage, tagLine, releaseDate, runtime, overview, id } = props.currentMovie;
    const { movies, isLoading, favorites, fetchFavoriteMovieSuccess, removeMovieFromFavorites } = props;
    const isMovieInFavorites: boolean = favorites.some(movie => movie.id === props.currentMovie.id);
    // const iconPrefix: IconPrefix = isMovieInFavorites
    //     ? 'fas'
    //     : 'far';
    const setPaddingForRating = (rating: any) => {
        return Number.isInteger(rating);
    };

    const toSearch = () => {
        appHistory.push(`/`);
    };
    //
    // const searchResult: ReactNode = (
    //     isLoading
    //         ? <Loader/>
    //         : <SearchResult movies={ movies }/>
    // );
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
           detailed
        </>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailedInfo);
