import React from 'react';
import { Link } from 'react-router-dom';

import { MovieItem } from '../../../store/movies/reducer';

import './search-result.scss';

interface SearchResultProps {
    movies: MovieItem[];
    onClick?: any;
}

export const SearchResult = (props: SearchResultProps) => {
    return (
        <div className='search-result row' { ...props }>
            {
                props.movies.map(
                    movie => (
                        <div className='search-result__movie-card column' key={ movie.id }>
                            <Link to={ `/movie/${ movie.id }` }>
                                <img className='search-result__movie-card__poster'
                                     id={ movie.id ? movie.id.toString() : undefined }
                                     src={ movie.posterPath }
                                     alt={ movie.title }
                                     onClick={ props.onClick }/>
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
