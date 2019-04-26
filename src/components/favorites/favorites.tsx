import React from 'react';

import {MovieItem} from '../../store/movies/reducer';
import {Link} from "react-router-dom";

import './favorites.scss';

interface FavoritesProps {
    favorites?: MovieItem[];

    fetchFavoriteMovie(e: any): void;
}

export const Favorites = (props: FavoritesProps) => {
    return(
        <div className='favorites'>
            {
                props.favorites && props.favorites.map(favorite => (
                    <div key={favorite.id} className='favorites__item'>
                        <Link to={`/movie/${favorite.id}`}>
                            <img className='favorites__item__poster'
                                 id={favorite.id!.toString()}
                                 src={favorite.posterPath}
                                 alt={favorite.title}
                                 onClick={props.fetchFavoriteMovie}/>
                        </Link>
                    </div>
                ))
            }
        </div>
    );
};