import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
    selectCurrentMovie,
    selectFavorites
} from '../../store/movies/selectors';
import { MovieItem } from '../../store/movies/reducer';
import {
    fetchFavoriteMovieSuccess,
    removeMovieFromFavorites
} from '../../store/movies/actions';
import { GlobalState } from '../../store/interfaces';
import { FavoriteIcon } from '../../components';
import { Rating } from './rating';

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
    const currentMovie: MovieItem = props.currentMovie;
    const { favorites, fetchFavoriteMovieSuccess, removeMovieFromFavorites } = props;
    const { t } = useTranslation();

    const manageFavorites = () => {
        !favorites.some(favorite => favorite.id === currentMovie.id)
            ? fetchFavoriteMovieSuccess(props.currentMovie)
            : removeMovieFromFavorites(currentMovie.id!.toString());
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailedInfo);
