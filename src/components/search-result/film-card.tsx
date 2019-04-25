import React from 'react';
import {Link} from 'react-router-dom';
import cn from 'classnames';

import {MovieItem} from '../../store/movies/reducer';
import {Icon} from "..";
import {IconPrefix} from "../icon/icon";

interface FilmCardProps {
    movie: MovieItem;
    favorites: MovieItem[];

    onPosterClick(e: any): void;
    onStarClick(id: string): void;
}

export const FilmCard = (props: FilmCardProps) => {
    const isMovieInFavorites: boolean = props.favorites.some(movie => movie.id === props.movie.id);
    const iconPrefix: IconPrefix = isMovieInFavorites
        ? 'fas'
        : 'far';

    return (
        <div className='search-result__movie-card column'>
            <Link to={`/movie/${props.movie.id}`}>
                <img className='search-result__movie-card__poster'
                     id={props.movie.id!.toString()}
                     src={props.movie.posterPath}
                     alt={props.movie.title}
                     onClick={props.onPosterClick}/>
            </Link>
            <div className='search-result__movie-card__header row'>
                <span className='search-result__movie-card__title'>{props.movie.title}</span>
                <span className='search-result__movie-card__date'>{props.movie.releaseDate!.slice(0, 4)}</span>
            </div>
            <div className='search-result__movie-card__header row'>
                <span className='search-result__movie-card__genres'>{props.movie.genres!.join(' & ')}</span>
                <Icon className={cn('search-result__movie-card__favorite', {'fav': isMovieInFavorites})}
                      id={props.movie.id!.toString()}
                      iconPrefix={iconPrefix} icon='star'
                      onIconClick={props.onStarClick}/>
            </div>
        </div>
    );
};
