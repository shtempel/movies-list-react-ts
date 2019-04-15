import React from 'react';
import {Link} from "react-router-dom";

import {MovieItem} from "../../../store/movies/reducer";

interface FilmCardProps {
    movie: MovieItem;

    onImgClick(e: any): void
}

export const FilmCard = (props: FilmCardProps) => {
    return (
        <div className='search-result__movie-card column'>
            <Link to={`/movie/${props.movie.id}`}>
                <img className='search-result__movie-card__poster'
                     id={props.movie.id!.toString()}
                     src={props.movie.posterPath}
                     alt={props.movie.title}
                     onClick={props.onImgClick}/>
            </Link>
            <div className='search-result__movie-card__header row'>
                <span className='search-result__movie-card__title'>{props.movie.title}</span>
                <span className='search-result__movie-card__date'>{props.movie.releaseDate!.slice(0, 4)}</span>
            </div>
            <span className='search-result__movie-card__genres'>{props.movie.genres!.join(' & ')}</span>
        </div>
    );
};
