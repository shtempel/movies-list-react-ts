import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { getType } from 'typesafe-actions';

import { fetchMovies } from '../../store/movies/actions';
import { selectMovies } from '../../store/selectors';
import SearchComponent from './search-component';

const Home: FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const movies = useSelector(selectMovies);

    useEffect(() => {
        dispatch({ type: getType(fetchMovies) });
    }, [ !movies ]);

    return <SearchComponent/>;

};

export default Home;

