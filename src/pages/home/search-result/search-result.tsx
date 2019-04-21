import React from 'react';
import {connect} from 'react-redux';

import {MovieItem} from '../../../store/movies/reducer';
import {FilmCard} from './film-card';
import {ResultsAmountController} from '../../../components';
import {
    fetchFavoriteMovie,
    fetchMovieById,
    removeMovieFromFavorites,
    setCurrentMovieId
} from '../../../store/movies/actions';
import {GlobalState} from "../../../store/store";
import {selectFavorites} from "../../../store/movies/selectors";

import './search-result.scss';

interface SearchResultProps {
    movies: MovieItem[];
    favorites: MovieItem[];

    fetchMovieById(): void
    setCurrentMovieId(id: string): void;
    fetchFavoriteMovie(): void;
    removeMovieFromFavorites(id: string): void;
}

const mapStateToProps = (state: GlobalState) => ({
    favorites: selectFavorites(state)
});

const mapDispatchToProps = {
    fetchMovieById,
    setCurrentMovieId,
    fetchFavoriteMovie,
    removeMovieFromFavorites
};

const SearchResult = (props: SearchResultProps) => {
    const {
        setCurrentMovieId,
        fetchMovieById,
        movies, favorites,
        removeMovieFromFavorites,
        fetchFavoriteMovie,
    } = props;

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

    return (
        <>
            <div className='search-result row'> {
                movies.map(
                    movie => (
                        <FilmCard
                            key={movie.id}
                            movie={movie}
                            onPosterClick={fetchMovie}
                            onStarClick={manageFavorites}
                            favorites={favorites}/>
                    )
                )
            }
            </div>
            <ResultsAmountController/>
        </>
    );


};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResult);
