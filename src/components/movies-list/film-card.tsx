import React, { FunctionComponent } from 'react';

import { MovieItem } from '../../store/movies/reducer';
import { FavoriteIcon } from '..';

import './film-card.scss';

interface FilmCardProps {
    movie: MovieItem;
    favorites: MovieItem[];

    onPosterClick(e: any): void;
    onStarClick(id: string): void;
}

export const FilmCard: FunctionComponent<FilmCardProps> = (props: FilmCardProps) => {
    const { onStarClick, movie, favorites, onPosterClick } = props;
    const { id, title, genres, posterPath, releaseDate } = movie;

    return (
        <div className='film-card'>
            <img className='film-card__poster'
                 id={ id!.toString() }
                 src={ posterPath }
                 alt={ title }
                 onClick={ onPosterClick }/>
            <div className='film-card__header row'>
                <span>{ title }</span>
                <span>{ releaseDate }</span>
            </div>
            <div className='film-card__footer row'>
                <span className='film-card__genres'>{ genres!.join(' & ') }</span>
                <FavoriteIcon id={ movie.id! }
                              favorites={ favorites }
                              manageFavorites={ onStarClick }/>
            </div>
        </div>
    );
};
