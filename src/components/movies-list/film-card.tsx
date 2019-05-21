import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { MovieItem } from '../../store/movies/reducer';
import { Icon } from '..';
import { IconPrefix } from '..';

import './film-card.scss';

interface FilmCardProps {
    movie: MovieItem;
    favorites: MovieItem[];

    onPosterClick(e: any): void;
    onStarClick(id: string): void;
}

export const FilmCard: FunctionComponent<FilmCardProps> = (props: FilmCardProps) => {
    const isMovieInFavorites: boolean = props.favorites.some(movie => movie.id === props.movie.id);
    const iconPrefix: IconPrefix = isMovieInFavorites ? 'fas' : 'far';

    return (
        <div className='film-card'>
            <img className='film-card__poster'
                 id={ props.movie.id!.toString() }
                 src={ props.movie.posterPath }
                 alt={ props.movie.title }
                 onClick={ props.onPosterClick }/>
            <div className='film-card__header row'>
                <span>{ props.movie.title }</span>
                <span>{ props.movie.releaseDate }</span>
            </div>
            <div className='film-card__footer row'>
                <span className='film-card__genres'>{ props.movie.genres!.join(' & ') }</span>
                <Icon className={ cn('film-card__favorite', { 'fav': isMovieInFavorites }) }
                      id={ props.movie.id!.toString() }
                      iconPrefix={ iconPrefix } icon='star'
                      onIconClick={ props.onStarClick }/>
            </div>
        </div>
    );
};
