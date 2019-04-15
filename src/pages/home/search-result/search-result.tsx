import React, {Component} from 'react';
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

class SearchResult extends Component<SearchResultProps> {
    render() {
        const {movies} = this.props;

        return (
            <>
                <div className='search-result row'> {
                    movies.map(
                        movie => (
                            <FilmCard
                                key={movie.id}
                                movie={movie}
                                onImgClick={this.fetchMovie}/>
                        )
                    )
                }

                </div>
                <ResultsAmountController/>
            </>
        );
    }

    fetchMovie = (e: any) => {
        const {setCurrentMovieId, fetchMovieById} = this.props;
        setCurrentMovieId(e.target.id);
        fetchMovieById();
    };

}

export default connect(
    null,
    mapDispatchToProps
)(SearchResult);
