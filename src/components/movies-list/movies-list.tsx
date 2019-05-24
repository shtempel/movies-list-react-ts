import React, { FunctionComponent, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import cn from 'classnames';
import { push } from 'connected-react-router';

import {
    fetchFavoriteMovie,
    fetchMovieById,
    removeMovieFromFavorites,
    setCurrentMovieId
} from '../../store/movies/actions';
import { MovieItem } from '../../store/movies/reducer';
import {
    selectFavMoviesQuantity,
    selectFavorites,
    selectIsLoading,
    selectMovies,
    selectMoviesQuantity
} from '../../store/movies/selectors';
import { FilmCard } from './film-card';
import { GlobalState } from '../../store/interfaces';
import { Loader, SortBy } from '..';
import { selectSortBy } from '../../store/sort-by/selectors';
import { selectCurrentPath } from '../../store/router/selectors';

import './movies-list.scss';

interface MoviesListProps {
    movies: MovieItem[];
    favorites: MovieItem[];
    isLoading: boolean;
    sortBy: string;
    pathname: string;
    moviesQuantity: number;
    favMoviesQuantity: number;

    push(path: string): void;
    fetchMovieById(): void
    setCurrentMovieId(id: string): void;
    fetchFavoriteMovie(): void;
    removeMovieFromFavorites(id: string): void;
}

enum Tabs {
    movies = 'movies',
    favorites = 'favMovies'
}

const mapStateToProps = (state: GlobalState) => ({
    movies: selectMovies(state),
    favorites: selectFavorites(state),
    isLoading: selectIsLoading(state),
    sortBy: selectSortBy(state),
    pathname: selectCurrentPath(state),
    moviesQuantity: selectMoviesQuantity(state),
    favMoviesQuantity: selectFavMoviesQuantity(state)
});

const mapDispatchToProps = {
    fetchMovieById,
    setCurrentMovieId,
    removeMovieFromFavorites,
    fetchFavoriteMovie,
    push
};

const MoviesList: FunctionComponent<MoviesListProps> = (props: MoviesListProps) => {
    const { t } = useTranslation();
    const state: string = Tabs.movies;
    const [tab, setActiveTab] = useState(state);
    const {
        movies,
        push,
        favorites,
        fetchMovieById,
        removeMovieFromFavorites,
        setCurrentMovieId,
        isLoading,
        fetchFavoriteMovie,
        pathname,
        favMoviesQuantity,
        moviesQuantity
    } = props;

    const isSearchResultsTab: boolean = tab === Tabs.movies;
    const isFavoritesTab: boolean = tab === Tabs.favorites;
    const isDetailedPage: boolean = pathname.includes('movie');

    const fetchMovie = (e: any) => {
        setCurrentMovieId(e.target.id);
        fetchMovieById();
        push(`/movie/:${ e.target.id }`);
    };

    const manageFavorites = (e: any) => {
        const movieID = e.target.id;
        const isFavoritesExist: boolean = favorites.some(
            favorite => favorite.id === parseInt(movieID, 10)
        );

        setCurrentMovieId(e.target.id);
        !isFavoritesExist
            ? fetchFavoriteMovie()
            : removeMovieFromFavorites(movieID);
    };

    const handleTabs = (e: any) => setActiveTab(e.target.id);

    const getList = (moviesList: MovieItem[]): ReactNode => {
        return (
            <div className='list'>
                {
                    isLoading
                        ? <Loader/>
                        : moviesList.map(
                        movie => (
                            <FilmCard
                                key={ movie.id }
                                movie={ movie }
                                onPosterClick={ fetchMovie }
                                onStarClick={ manageFavorites }
                                favorites={ favorites }/>
                        )
                        )
                }
            </div>
        );
    };

    const sortBy: ReactNode = !isDetailedPage && <SortBy tab={ tab }/>;

    return (
        <>
            <>
                <div className='nav-bar'>
                    <span className={ cn('btn', { 'active-button': isSearchResultsTab }) }
                          id={ Tabs.movies }
                          onClick={ handleTabs }>
                    { t('searchResults') } { moviesQuantity }
                    </span>
                    <span className={ cn('btn', { 'active-button': isFavoritesTab }) }
                          id={ Tabs.favorites }
                          onClick={ handleTabs }>
                    { t('favorites') } { favMoviesQuantity }
                    </span>
                </div>
                { sortBy }
            </>
            <div className={ cn('search-results columns', { 'search-results-detailed': isDetailedPage }) }>
                { isSearchResultsTab && getList(movies) }
                { isFavoritesTab && getList(favorites) }
            </div>
        </>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MoviesList);
