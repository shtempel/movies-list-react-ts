import React, { FunctionComponent } from 'react';
import { Icon, IconPrefix } from '..';
import cn from 'classnames';

import { MovieItem } from '../../store/movies/reducer';

interface FavoriteIconProps {
    id?: number;
    favorites: MovieItem[];

    manageFavorites(e: any): void;
}

export const FavoriteIcon: FunctionComponent<FavoriteIconProps> = (props: FavoriteIconProps) => {
    const { id, manageFavorites, favorites } = props;
    const isMovieInFavorites: boolean = favorites.some(movie => movie.id === props.id);
    const iconPrefix: IconPrefix = isMovieInFavorites
        ? 'fas'
        : 'far';

    return (
        <Icon className={ cn('favorite', { 'fav': isMovieInFavorites }) }
              id={ id!.toString() }
              iconPrefix={ iconPrefix } icon='star'
              onIconClick={ manageFavorites }/>
    );
};
