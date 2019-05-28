import React, { FunctionComponent } from 'react';
import cn from 'classnames';
import moment from 'moment';

import { MovieItem } from '../../store/movies/reducer';
import { FavoriteIcon } from '..';

import './film-card.scss';

interface FilmCardProps {
    movie: MovieItem;
    favorites: MovieItem[];
    isFavoritesTab: boolean;

    onPosterClick(e: any): void;
    onStarClick(id: string): void;
}

export const FilmCard: FunctionComponent<FilmCardProps> = (props: FilmCardProps) => {
    const { onStarClick, movie, favorites, onPosterClick, isFavoritesTab } = props;
    const { id, title, genres, posterPath, releaseDate } = movie;

    const isReleaseCurrentYear: boolean =
        moment(releaseDate).toDate().getFullYear() === moment().toDate().getFullYear();
    const releaseWarn: string = isFavoritesTab && isReleaseCurrentYear ? 'release this year' : '';

    return (
        <div className='film-card'>
            <img className='film-card__poster'
                 id={ id!.toString() }
                 src={ posterPath }
                 alt={ title }
                 onClick={ onPosterClick }/>
            <div className='film-card__header'>
                <span className='film-card__header__title'>{ title }</span>
                <span title={ releaseWarn }
                      className={ cn('', { 'release-soon': isFavoritesTab && isReleaseCurrentYear }) }>
                    { releaseDate!.slice(0, 4) }
                </span>
            </div>
            <div className='film-card__footer'>
                <span className='film-card__genres'>{ genres!.join(' & ') }</span>
                <FavoriteIcon id={ movie.id! }
                              favorites={ favorites }
                              manageFavorites={ onStarClick }/>
            </div>
        </div>
    );
};
