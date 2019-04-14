import React, {Component} from 'react';
import {connect} from 'react-redux';

import {MovieItem} from '../../../store/movies/reducer';
import {fetchMovieById, setCurrentMovieId} from '../../../store/movies/actions';
import {FilmCard} from "./film-card";

import './search-result.scss';

interface SearchResultProps {
    movies: MovieItem[];

    fetchMovieById(): void
    setCurrentMovieId(id: string): void;
}

const mapDispatchToProps = {
    fetchMovieById: fetchMovieById,
    setCurrentMovieId: setCurrentMovieId
};

class SearchResult extends Component<SearchResultProps> {
    render() {
        const {movies} = this.props;
        return (
            <div className='search-result row'>
                {
                    movies.map(
                        movie => (
                            <FilmCard
                                key={movie.id}
                                movie={movie}
                                fetchMovieById={this.fetchMovie}/>
                        )
                    )
                }
            </div>
        )
    }

    fetchMovie = (e: any) => {
        this.props.setCurrentMovieId(e.target.id);
        this.props.fetchMovieById();
    };

}

export default connect(
    null,
    mapDispatchToProps
)(SearchResult);