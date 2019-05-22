import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { appHistory } from '../../store/store';
import {
    selectCurrentMovie,
    selectFavorites,
    selectIsLoading,
    selectMovies
} from '../../store/movies/selectors';
import { MovieItem } from '../../store/movies/reducer';
import {
    fetchFavoriteMovieSuccess,
    removeMovieFromFavorites
} from '../../store/movies/actions';
import { GlobalState } from '../../store/interfaces';
import { Icon } from '../../components';
import { IconPrefix } from '../../components';

import './detailed-info.scss';

interface DetailedInfoProps {
    favorites: MovieItem[];
    currentMovie: MovieItem,

    fetchFavoriteMovieSuccess(movie: MovieItem): void,
    removeMovieFromFavorites(id: string): void
}

const mapStateToProps = (state: GlobalState) => ({
    currentMovie: selectCurrentMovie(state),
    favorites: selectFavorites(state)
});

const mapDispatchToProps = {
    fetchFavoriteMovieSuccess,
    removeMovieFromFavorites
};

const DetailedInfo = (props: DetailedInfoProps) => {
    const { posterPath, title, voteAverage, tagLine, releaseDate, runtime, overview, id } = props.currentMovie;
    const { favorites, fetchFavoriteMovieSuccess, removeMovieFromFavorites } = props;
    const isMovieInFavorites: boolean = favorites.some(movie => movie.id === props.currentMovie.id);
    const { t } = useTranslation();
    const iconPrefix: IconPrefix = isMovieInFavorites
        ? 'fas'
        : 'far';
    const setPaddingForRating = (rating: any) => {
        return Number.isInteger(rating);
    };

    const toSearch = () => {
        appHistory.push(`/`);
    };

    const manageFavorites = () => {
        const isFavoritesExist: boolean = favorites.some(
            favorite => favorite.id === id
        );
        !isFavoritesExist
            ? fetchFavoriteMovieSuccess(props.currentMovie)
            : removeMovieFromFavorites(id!.toString());
    };
    const voteElement: ReactNode = (
        <span className={ cn('rating',
            {
                'integer-border ': setPaddingForRating(voteAverage),
                'fractional-border': !setPaddingForRating(voteAverage)
            }
        ) }>
                                { voteAverage }
        </span>
    );

    return (
        <div className='detailed-info'>
            <div className='row'>
                <div className='poster-date-duration'>
                    <img src={ posterPath } className='poster' alt={ title }/>
                    <div className='space-btw'>
                        <span className='date'>{ releaseDate && releaseDate!.slice(0, 4) }</span>
                        <span className='duration'>{ runtime } { t('detailed.min') }</span>
                    </div>
                </div>
                <div className='title-vote column'>
                    <div>
                        <span className='title'>{ title }</span>
                        <Icon className={ cn('favorite', { 'fav': isMovieInFavorites }) }
                              id={ id!.toString() }
                              iconPrefix={ iconPrefix } icon='star'
                              onIconClick={ manageFavorites }/>
                    </div>

                        { voteElement }

                </div>
            </div>
            <span className='overview'>{ overview }</span>
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailedInfo);
