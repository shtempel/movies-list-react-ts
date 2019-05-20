import React, { FunctionComponent, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import cn from 'classnames';

import {
    fetchFavoriteMovie,
    fetchMovieById,
    removeMovieFromFavorites,
    setCurrentMovieId
} from '../../store/movies/actions';
import { MovieItem } from '../../store/movies/reducer';
import { selectFavorites, selectMovies } from '../../store/movies/selectors';
import { FilmCard } from './film-card';
import { GlobalState } from '../../store/interfaces';

import './movies-list.scss';

interface MoviesListProps {
    movies: MovieItem[];
    favorites: MovieItem[];

    fetchMovieById(): void
    setCurrentMovieId(id: string): void;
    fetchFavoriteMovie(): void;
    removeMovieFromFavorites(id: string): void;
}

enum Tabs {
    movies = 'movies',
    favorites = 'favorites'
}

const mapStateToProps = (state: GlobalState) => ({
    movies: selectMovies(state),
    favorites: selectFavorites(state)
});

const mapDispatchToProps = {
    fetchMovieById,
    setCurrentMovieId,
    removeMovieFromFavorites,
    fetchFavoriteMovie
};

const MoviesList: FunctionComponent<MoviesListProps> = (props: MoviesListProps) => {
    const { t } = useTranslation();
    const state: string = Tabs.movies;
    const [tab, setActiveTab] = useState(state);
    const {
        movies,
        favorites,
        fetchMovieById,
        removeMovieFromFavorites,
        setCurrentMovieId,
        fetchFavoriteMovie
    } = props;

    const isSearchResultsTab: boolean = tab === Tabs.movies;
    const isFavoritesTab: boolean = tab === Tabs.favorites;

    const fetchMovie = (e: any) => {
        setCurrentMovieId(e.target.id);
        fetchMovieById();
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

    const searchResultsNode = (): ReactNode => {
        return isSearchResultsTab && (
            <div className='column'>{
                movies.map(
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
        )
    };

    const favoritesNode = (): ReactNode => {
        return isFavoritesTab && (
            <div>
                favorites
            </div>
        )
    };

    return (
        <div className='search-results columns'>
            <div className='nav-bar row'>
                <span className={ cn('btn', { 'active-button': isSearchResultsTab }) }
                      id={ Tabs.movies }
                      onClick={ handleTabs }>{ t('searchResults') }</span>
                <span className={ cn('btn', { 'active-button': isFavoritesTab }) }
                      id={ Tabs.favorites }
                      onClick={ handleTabs }>{ t('favorites') }</span>
            </div>
            { searchResultsNode() }
            { favoritesNode() }
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MoviesList);
