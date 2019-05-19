import React, { FunctionComponent, ReactNode } from 'react';
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
    const iconPrefix: IconPrefix = isMovieInFavorites
        ? 'fas'
        : 'far';

    return (
        <div className='film-card column'>
            <img className='poster'
                 id={ props.movie.id!.toString() }
                 src={ props.movie.posterPath }
                 alt={ props.movie.title }
                 onClick={ props.onPosterClick }/>
        </div>
    );
};
