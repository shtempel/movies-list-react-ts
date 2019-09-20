import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { getType } from 'typesafe-actions'
    ;
import { Loader } from '..';
import { GlobalState } from '../../store/interfaces';
import {
    fetchFavoriteMovie,
    fetchMovieById,
    removeMovieFromFavorites,
    setCurrentMovieId
} from '../../store/movies/actions';
import { MovieItem } from '../../store/movies/reducer';
import { selectFavorites, selectIsLoading, selectMovies } from '../../store/movies/selectors';
import { FilmCard } from './film-card';

interface ListProps {
    isSearchResultsTab: boolean;
}

export const List: FC<ListProps> = (props: ListProps) => {
    const dispatch = useDispatch<Dispatch>();
    const movies = useSelector<GlobalState, MovieItem[]>(selectMovies);
    const favorites = useSelector<GlobalState, MovieItem[]>(selectFavorites);
    const moviesList = props.isSearchResultsTab ? movies : favorites;
    const isLoading = useSelector<GlobalState, boolean>(selectIsLoading);

    const manageFavorites = (e: any) => {
        const movieID = e.target.id;
        const isFavoritesExist: boolean = favorites.some(
            favorite => favorite.id === parseInt(movieID, 10)
        );

        dispatch({ type: getType(setCurrentMovieId), payload: e.target.id });
        !isFavoritesExist
            ? dispatch({ type: getType(fetchFavoriteMovie) })
            : dispatch({ type: getType(removeMovieFromFavorites), payload: movieID });
    };

    const fetchMovie = (e: any) => {
        dispatch({ type: getType(setCurrentMovieId), payload: e.target.id });
        dispatch({ type: getType(fetchMovieById) });
        dispatch({
            type: '@@router/LOCATION_CHANGE',
            payload: { location: { pathname: `/movie/:${ e.target.id }` } }
        });
    };

    return (
        <div className='list'>
            {
                isLoading
                    ? <Loader/>
                    : moviesList.map(
                    movie => (
                        <FilmCard
                            key={ movie.id }
                            isFavoritesTab={ props.isSearchResultsTab }
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
