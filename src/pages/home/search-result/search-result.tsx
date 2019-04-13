import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {MovieItem} from '../../../store/movies/reducer';
import {fetchMovieById, setCurrentMovieId} from '../../../store/movies/actions';

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
    fetchMovie = (e: any) => {
        this.props.setCurrentMovieId(e.target.id);
        this.props.fetchMovieById();
    };

    render() {
        const {movies} = this.props;

        return (
            <div className='search-result row'>
                {
                    movies.map(
                        movie => (
                            <div className='search-result__movie-card column' key={movie.id}>
                                <Link to={`/movie/${movie.id}`}>
                                    <img className='search-result__movie-card__poster'
                                         id={movie.id ? movie.id.toString() : undefined}
                                         src={movie.posterPath}
                                         alt={movie.title}
                                         onClick={this.fetchMovie}/>
                                </Link>
                                <div className='search-result__movie-card__header row'>
                                    <span className='search-result__movie-card__title'>{movie.title}</span>
                                    <span
                                        className='search-result__movie-card__date'>
                                    {movie.releaseDate && movie.releaseDate.slice(0, 4)}
                                    </span>
                                </div>
                                <span
                                    className='search-result__movie-card__genres'>
                                {movie.genres && movie.genres.join(' & ')}
                            </span>
                            </div>
                        )
                    )
                }
            </div>
        );
    }
}

export default connect(
    null,
    mapDispatchToProps
)(SearchResult);