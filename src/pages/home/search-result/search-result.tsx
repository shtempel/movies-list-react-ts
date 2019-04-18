import React from 'react';
import {connect} from 'react-redux';

import {MovieItem} from '../../../store/movies/reducer';
import {FilmCard} from './film-card';
import {ResultsAmountController} from '../../../components';
import {fetchMovieById, setCurrentMovieId} from '../../../store/movies/actions';

import './search-result.scss';

interface SearchResultProps {
    movies: MovieItem[];

    fetchMovieById(): void
    setCurrentMovieId(id: string): void;
}

const mapDispatchToProps = {
    fetchMovieById,
    setCurrentMovieId
};

const SearchResult = (props: SearchResultProps) => {
    const {setCurrentMovieId, fetchMovieById, movies} = props;

    const fetchMovie = (e: any) => {
        setCurrentMovieId(e.target.id);
        fetchMovieById();
    };

    return (
        <>
            <div className='search-result row'> {
                movies.map(
                    movie => (
                        <FilmCard
                            key={movie.id}
                            movie={movie}
                            onImgClick={fetchMovie}/>
                    )
                )
            }
            </div>
            <ResultsAmountController/>
        </>
    );


};

export default connect(
    null,
    mapDispatchToProps
)(SearchResult);
