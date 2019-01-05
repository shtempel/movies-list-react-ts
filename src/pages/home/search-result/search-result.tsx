import React from 'react';
import { Link } from 'react-router-dom';

import './search-result.scss';
import { MovieItem } from '../../../store/movies/actions';

interface SearchResultProps {
    movies: MovieItem[];
}

export const SearchResult = (props: SearchResultProps) => {
    return (
        <div className='search-result' { ...props }>
            {
                props.movies && props.movies.map(
                    movie => (
                        <div className='search-result__movie-card column' key={ movie.id }>
                            <Link to={ `/movie/${ movie.id }` }>
                                <img className='search-result__movie-card__poster'
                                     src={ movie.posterPath }
                                     alt={ movie.title }/>
                            </Link>
                            <div className='search-result__movie-card__header row'>
                                <span className='search-result__movie-card__title'>{ movie.title }</span>
                                <span
                                    className='search-result__movie-card__date'>
                                    { movie.releaseDate && movie.releaseDate.slice(0, 4) }
                                </span>
                            </div>
                            <span
                                className='search-result__movie-card__genres'>
                                { movie.genres && movie.genres.join(' & ') }
                            </span>
                        </div>
                    )
                )
            }
        </div>
    );
};