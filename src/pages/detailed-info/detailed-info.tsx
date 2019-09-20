import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getType } from 'typesafe-actions';
import { GlobalState } from '../../store/interfaces';
import { MovieItem } from '../../store/movies/reducer';

import { selectCurrentMovie, selectFavorites } from '../../store/movies/selectors';
import { fetchFavoriteMovieSuccess, removeMovieFromFavorites } from '../../store/movies/actions';
import { FavoriteIcon } from '../../components';
import { Rating } from './rating';

import './detailed-info.scss';

const DetailedInfo: FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const favorites = useSelector<GlobalState, MovieItem[]>(selectFavorites);
    const currentMovie = useSelector<GlobalState, MovieItem>(selectCurrentMovie);
    const manageFavorites = (): void => {
        !favorites.some(favorite => favorite.id === currentMovie.id)
            ? dispatch({ type: getType(fetchFavoriteMovieSuccess), payload: currentMovie })
            : dispatch({ type: getType(removeMovieFromFavorites), payload: currentMovie.id!.toString() });
    };

    return (
        <div className='detailed-info'>
            <div className='row'>
                <div className='poster-date-duration'>
                    <img src={ currentMovie.posterPath } className='poster' alt={ currentMovie.title }/>
                    <div className='space-btw'>
                        <span
                            className='date'>{ currentMovie.releaseDate && currentMovie.releaseDate!.slice(0, 4) }</span>
                        <span className='duration'>{ currentMovie.runtime } { t('detailed.min') }</span>
                    </div>
                </div>
                <div className='title-vote column'>
                    <div>
                        <span className='title'>{ currentMovie.title }</span>
                        <FavoriteIcon id={ currentMovie.id }
                                      favorites={ favorites }
                                      manageFavorites={ manageFavorites }/>
                    </div>
                    <Rating voteAverage={ currentMovie.voteAverage }
                            title={ t('detailed.voteCount') }
                            voteCount={ currentMovie.voteCount }/>
                    <span className='tagLine'>{ currentMovie.tagLine }</span>
                </div>
            </div>
            <span className='overview'>{ currentMovie.overview }</span>
        </div>
    );
};

export default DetailedInfo;
