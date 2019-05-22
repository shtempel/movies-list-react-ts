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
import { selectFavorites, selectIsLoading, selectMovies } from '../../store/movies/selectors';
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
    pathname: selectCurrentPath(state)
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
        pathname
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
            <div className='column'>
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

    return (
        <div className={ cn('mobile-detailed-hide-list', { 'column': !isDetailedPage }) }>
            <div className='column'>
                <div className='row nav-bar'>
                    <span className={ cn('btn', { 'active-button': isSearchResultsTab }) }
                          id={ Tabs.movies }
                          onClick={ handleTabs }>
                    { t('searchResults') }
                    </span>
                    <span className={ cn('btn', { 'active-button': isFavoritesTab }) }
                          id={ Tabs.favorites }
                          onClick={ handleTabs }>
                    { t('favorites') }
                </span>
                </div>
                <SortBy tab={ tab }/>
            </div>
            <div className='search-results columns'>
                { isSearchResultsTab && getList(movies) }
                { isFavoritesTab && getList(favorites) }
            </div>
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MoviesList);
